import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import FormControl from 'material-ui/Form/FormControl';
import FormControlLabel from 'material-ui/Form/FormControlLabel';
import Button from 'material-ui/Button';
import Switch from 'material-ui/Switch';
import Icon from 'material-ui/Icon';
import Card, { CardContent } from 'material-ui/Card';
import { globalStyles, flex } from '../../../../src/styles';
import { updateService } from '../../../../lib/http';
import { connect } from 'react-redux';
// import HtmlField from 'material-ui-html-field'
import green from 'material-ui/colors/green';
import Router from 'next/router';
import swal from 'sweetalert';
import YouTube from 'react-youtube';
import { youtube_parser } from '../../../../lib/utils';

class UpdateEntry extends React.Component {
	constructor(props) {
		super(props);
    const entry = props.news.filter((u) => u.id === props.id)[0];
    console.log('Entrada de youtube entry: ', entry)
		this.state = {
			id: entry.id,
			ispublic: entry.isPublic,
			active: entry.active,
			title: entry.title,
			description: entry.description,
			creationdate: entry.creationDate.split(' ')[0],
			links: entry.links ? entry.links.split(',') : [],
			link: '',
			image: {},
			imageURL: entry.imageUrl,
			html: '',
			htmlError: '',
			important: entry.important,
      youtube: entry.youtube && entry.youtube !== 'false' ? entry.youtube : false,
			youtubeUrl:
				entry.youtube && entry.youtube !== 'false' ? 'https://www.youtube.com/watch?v=' + entry.youtube : ''
		};
	}

	publish = () => {
		let values = [
			'description',
			'title',
			'ispublic',
			'id',
			'creationdate',
			'active',
			'youtube',
			'important'
		].map((e) => ({ val: this.state[e], key: e }));
		if (this.state.image.name) {
			values.push({ val: this.state.image, key: 'image' });
		}
		if (this.state.links) {
			values.push({ val: this.state.links.join(','), key: 'links' });
		}
		if (this.state.link) {
			values = values.map((e) => {
				if (e.key === 'links') {
					return { val: [].concat(this.state.links.split(',')).join(','), key: 'links' };
				} else {
					return e;
				}
			});
		}
		swal({
			title: 'Va a actualizar una entrada',
			text: '¿Está seguro de actualizar esta entrada?',
			type: 'warning',
			buttons: {
				cancel: {
					text: 'Cancelar',
					value: null,
					visible: true,
					closeModal: true
				},
				confirm: {
					text: 'Aceptar',
					value: true,
					visible: true,
					closeModal: false
				}
			}
		})
			.then((result) => {
				if (result) {
					return this.props.updateService(values);
				} else {
					throw null;
				}
			})
			.then(() => {
				return swal('Noticia actualizada con éxito', 'La noticia fue actualizada con éxito', 'success');
			})
			.then(() => {
				Router.push(`/admin?page=news&view=list`, `/admin/news`);
			})
			.catch((error) => {
				if (error) {
					swal(error.message, error.detail, 'error');
				}
				swal.stopLoading();
				swal.close();
			});
	};

	handleChange = (prop) => (event) => {
		if (prop === 'youtubeUrl') {
			const val = youtube_parser(event.target.value);
			this.setState({ [prop]: event.target.value });
			this.setState({ youtube: val });
		} else {
			this.setState({ [prop]: event.target.value });
		}
	};
	_keyHandler = (evt) => {
		if (evt.key === 'Enter') {
			const links = this.state.links.slice();
			links.push(this.state.link);
			this.setState({ links, link: '' });
		}
	};

	removeLink = (idx) => {
		const links = [ ...this.state.links ];
		links.splice(idx, 1);
		this.setState({ links });
	};
	removeImage = () => {
		this.setState({ image: {}, imageURL: '' });
	};

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<Card className={classes.card70}>
					<CardContent>
						<FormControl fullWidth className={classes.margin}>
							<InputLabel htmlFor="adornment-amount" style={{ fontSize: 14 }}>
								Titulo
							</InputLabel>
							<Input
								id="adornment-amount"
								style={{ fontSize: 14 }}
								value={this.state.title}
								onChange={this.handleChange('title')}
								startAdornment={<InputAdornment position="start" />}
							/>
						</FormControl>
						<FormControl fullWidth className={classes.margin}>
							<InputLabel htmlFor="youtube" style={{ fontSize: 14 }}>
								Enlace de youtube
							</InputLabel>
							<Input
								id="youtube"
								style={{ fontSize: 14 }}
								value={this.state.youtubeUrl}
								onChange={this.handleChange('youtubeUrl')}
								startAdornment={<InputAdornment position="start" />}
							/>
						</FormControl>
						<FormControl fullWidth className={classes.margin}>
							<InputLabel htmlFor="Descripcion" style={{ fontSize: 14 }}>
								Descripción
							</InputLabel>
							<Input
								id="Descripcion"
								multiline
								style={{ fontSize: 14 }}
								rows={6}
								value={this.state.description}
								onChange={this.handleChange('description')}
							/>
						</FormControl>
						<FormControl
							fullWidth
							className={classes.margin}
							style={{ ...(this.state.youtube ? {} : { display: 'none' }) }}
						>
							<YouTube
								videoId={this.state.youtube}
								// opts={opts}
								onReady={(evt) => evt.target.pauseVideo()}
							/>
						</FormControl>
						<FormControl fullWidth className={classes.margin}>
							{/* <HtmlField
              floatingLabelText="Html Editor"
              value={this.state.html}
              errorText={this.state.htmlError}
              {...editorConfig}
            /> */}
						</FormControl>
					</CardContent>
				</Card>
				<Card className={classes.card30}>
					<CardContent>
						<FormControl fullWidth className={classes.margin} autoComplete="off">
							<FormControlLabel
								style={{ fontSize: 14 }}
								control={
									<Switch
										checked={this.state.ispublic}
										style={{ fontSize: 14 }}
										onChange={() => this.setState({ ispublic: !this.state.ispublic })}
										value={`Entrada publica? ${this.state.ispublic ? 'Si' : 'No'}`}
										color="primary"
									/>
								}
								label={`Entrada publica? ${this.state.ispublic ? 'Si' : 'No'}`}
							/>
							<FormControlLabel
								style={{ fontSize: 14 }}
								control={
									<Switch
										checked={this.state.important}
										style={{ fontSize: 14 }}
										onChange={() => this.setState({ important: !this.state.important })}
										value={`Entrada destacada? ${this.state.important ? 'Si' : 'No'}`}
										color="primary"
									/>
								}
								label={`Entrada destacada? ${this.state.important ? 'Si' : 'No'}`}
							/>
						</FormControl>
						<FormControl autoComplete="off" fullWidth className={classes.margin}>
							<input
								accept="image/png,image/jpg,image/jpeg,image/svg"
								style={{ display: 'none' }}
								id="raised-button-file"
								type="file"
								onChange={(evt) => {
									const file = evt.target.files[0];
									if (file) {
										this.setState({ image: file });
										this.setState({ imageURL: URL.createObjectURL(file) });
									}
								}}
							/>
							<label htmlFor="raised-button-file">
								<div style={{ display: 'flex', flexFlow: 'column wrap' }}>
									<Button
										color="primary"
										variant="raised"
										component="span"
										className={classes.button}
										style={{ fontSize: 14 }}
									>
										Adjuntar Imagen
										<Icon>insert_photo</Icon>
									</Button>
								</div>
							</label>
						</FormControl>
						<FormControl fullWidth className={classes.margin} autoComplete="off">
							<img
								className={classes.mb4}
								style={{ maxWidth: '100%', height: 'auto' }}
								src={this.state.imageURL}
								alt="Remover esta imágen"
								onClick={this.removeImage}
							/>
						</FormControl>
						{/* <FormControl fullWidth className={[classes.margin, classes.mt3].join(' ')} style={{ fontSize: 12 }}>
              Links de interés (Enter, para agregar más)
              <ul style={{ paddingLeft: 0, wordWrap: 'break-word' }}>{this.state.links.map((e, i) => <li key={e}
                style={{ listStyle: 'none', display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', fontSize: 11 }}>
                <IconButton onClick={() => this.removeLink(i)} style={{ fontSize: 12 }}>
                  <Icon>clear</Icon>
                </IconButton>{e}
              </li>)}
              </ul>
            </FormControl>
            <FormControl fullWidth className={[classes.margin].join(' ')}>
              <Input
                id="links"
                value={this.state.link}
                style={{ fontSize: 14 }}
                onChange={evt => this.setState({ link: evt.target.value })}
                onKeyPress={this._keyHandler}
                startAdornment={<InputAdornment position="start"><Icon>link</Icon></InputAdornment>}
              />
            </FormControl> */}
						<FormControl fullWidth className={[ classes.margin ].join(' ')}>
							<Button
								color="primary"
								variant="raised"
								component="span"
								className={[ classes.button, classes.cssRoot ].join(' ')}
								style={{ fontSize: 14 }}
								onClick={this.publish}
							>
								Publicar
								<Icon>send</Icon>
							</Button>
						</FormControl>
					</CardContent>
				</Card>
			</div>
		);
	}
}

UpdateEntry.propTypes = {
	classes: PropTypes.object.isRequired
};
const styles = (theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'nowrap',
		marginTop: 20
	},
	margin: {
		margin: theme.spacing.unit
	},
	withoutLabel: {
		marginTop: theme.spacing.unit * 3
	},
	textField: {
		flexBasis: 200
	},
	card70: {
		marginRigth: '1%',
		minWidth: '69%'
	},
	card30: {
		marginLeft: '1%',
		minWidth: '29%'
	},
	button: {
		marginTop: 20,
		width: 'calc(100% - 24px)'
	},
	centerCropped: {
		width: '100%',
		height: 250,
		backgroundPosition: '50% 45%', // center center
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover'
	},
	cssRoot: {
		color: theme.palette.getContrastText(green[500]),
		backgroundColor: green[500],
		'&:hover': {
			backgroundColor: green[700]
		}
	},
	...globalStyles,
	...flex
});

const Entry = withStyles(styles, { name: 'UpdateEntryAdmin' })(UpdateEntry);

const mapDispatchToProps = (dispatch) => ({
	updateService: (d) => dispatch(updateService('/news/update', d))
});
const mapStateToProps = (state = { news: INITIAL_STATE_NEWS }) => ({
	news: state.news.data
});
export default connect(mapStateToProps, mapDispatchToProps)(Entry);
