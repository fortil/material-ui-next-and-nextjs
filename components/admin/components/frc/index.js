import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { actionHttp, getHttp } from '../../../../lib/http';
import { connect } from 'react-redux';
import Form from '../form';
import Table from '../table';
import { INITIAL_STATE_FRC } from '../../../../redux/reducers/frc';
import Router from 'next/router';

const inputs = [
	{ icon: '', type: 'text', name: 'name', label: 'Nombre de la empresa' },
	{ icon: '', type: 'text', name: 'nit', label: 'NIT' },
	{ icon: '', type: 'text', name: 'city', label: 'Ciudad de Domicilio' },
	{ icon: '', type: 'text', name: 'address', label: 'Dirección' },
	{ icon: '', type: 'text', name: 'phone', label: 'Teléfono' },
	{ icon: '', type: 'text', name: 'sicRegistry', label: 'No de registro ante SIC' },
	{ icon: '', type: 'text', name: 'legalRepresentative', label: 'Nombre del representante legal' },
	{ icon: '', type: 'text', name: 'surgasRegistry', label: 'No de registro ante SURGAS' },
	{
		icon: '',
		type: 'select',
		name: 'type',
		label: 'Reparadora o Inspectora',
		choices: [ { value: 'Reparadora', label: 'Reparadora' }, { value: 'Inspectora', label: 'Inspectora' } ]
	}
];

class Update extends Component {
  render() {;
    const { updateFn, fcr, id } = this.props;
    const element = fcr.filter((f) => f.id === id)[0];
    const inputsElement = inputs.map((input) => Object.assign({}, input, { value: element[input.name] }));
    return (
      <Form
        botonlabel="Actualizar Firma"
        title="Actualizar Firma"
        inputs={inputsElement}
        actions={{
          updateFn: (data) => updateFn(Object.assign({}, element, data))
        }}
        redirect={{
          url: '/admin?page=fcr&view=list',
          path: '/admin/fcr'
        }}
      />
    );
  }
}

Update.propTypes = {
  updateFn: PropTypes.func.isRequired
};

const mapDispatchToPropsUpdate = (dispatch) => ({
  updateFn: (data) => dispatch(actionHttp('fcr', 'update', data, 'json'))
});

const mapStateToPropsListUpdate = (state = { frc: INITIAL_STATE_FRC }) => ({ fcr: state.frc.data });

const update = connect(mapStateToPropsListUpdate, mapDispatchToPropsUpdate)(Update);
class Create extends Component {
	render() {
		const { createFn } = this.props;

		return (
			<Form
				botonlabel="Crear Firma"
				title="Crear firma registrada"
				inputs={inputs}
				actions={{
					createFn: createFn
				}}
				redirect={{
					url: '/admin?page=fcr&view=list',
					path: '/admin/fcr'
				}}
			/>
		);
	}
}

Create.propTypes = {
	createFn: PropTypes.func.isRequired
};

const mapDispatchToPropsCreate = (dispatch) => ({
	createFn: (data) => dispatch(actionHttp('fcr', 'create', data, 'json'))
});

// const mapStateToProps = (state = { modal: INITIAL_STATE_MODAL }) => ({
//   modal: state.modal
// })
const create = connect(null, mapDispatchToPropsCreate)(Create);

const columnData = [
	{ id: 'name', numeric: false, disablePadding: true, label: 'Nombre de la empresa' },
	{ id: 'nit', numeric: false, disablePadding: true, label: 'NIT' },
	{ id: 'city', numeric: false, disablePadding: true, label: 'Ciudad de Domicilio' },
	{ id: 'address', numeric: false, disablePadding: true, label: 'Dirección' },
	{ id: 'phone', numeric: false, disablePadding: true, label: 'Teléfono' },
	{ id: 'sicRegistry', numeric: false, disablePadding: true, label: 'No Registro ante la SIC' },
	{ id: 'type', numeric: false, disablePadding: true, label: 'Reparadora o Inspectora' },
	{ id: 'legalRepresentative', numeric: false, disablePadding: true, label: 'Representante Legal' },
	{ id: 'surgasRegistry', numeric: false, disablePadding: true, label: 'No registro SURGAS' }
];
class List extends React.Component {
	goTo = (fcr) => {
		Router.push(
			`/admin?page=fcr&view=update&params=${JSON.stringify({ id: fcr.id })}`,
			`/admin/fcr/update/${fcr.id}`
		);
	};
	render() {
		const { getFrc, fcr, actionFrc } = this.props;
		return (
			<Table
				title="FCR"
				prelabel="FCR"
				actions={[
					{
						fn: actionFrc,
						show: true,
						labelActive: 'Eliminar',
						labelDeActive: 'Activar',
						iconActive: 'delete_outline',
						iconDeActive: 'publish'
					},
					{
						fn: this.goTo,
            show: true,
            askToAction: false,
						labelActive: 'Editar',
						labelDeActive: 'Editar',
						iconActive: 'edit_icon',
						iconDeActive: 'edit_icon'
					}
				]}
				columnData={columnData}
				getInitFn={getFrc}
				filterDate={[ 'creationDate' ]}
				data={fcr}
			/>
		);
	}
}

const mapDispatchToPropsList = (dispatch) => ({
	getFrc: () => dispatch(getHttp('fcr', 'getall')),
	actionFrc: (data, state) => {
		data.active = !state.active;
		return dispatch(actionHttp('fcr', 'update', data));
	}
});
const mapStateToPropsList = (state = { frc: INITIAL_STATE_FRC }) => ({ fcr: state.frc.data });

const list = connect(mapStateToPropsList, mapDispatchToPropsList)(List);

export default {
  create,
  update,
	list,
	permissions: [ 'FCR' ],
	links: [
		{
			icon: 'view_list',
			txt: 'FCR',
			primary: 'FCR',
			secondary: '',
			url: '/admin?page=fcr&view=list',
			as: '/admin/fcr'
		},
		{
			icon: 'add_box',
			txt: 'Crear',
			primary: 'Crear FCR',
			secondary: '',
			url: '/admin?page=fcr&view=create',
			as: '/admin/fcr/create'
		}
	]
};
