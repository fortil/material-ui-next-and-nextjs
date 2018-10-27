import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { actionHttp, getHttp } from '../../../../lib/http';
import { connect } from 'react-redux';
import Form from '../form';
import Table from '../table';
import { INITIAL_STATE_FRCR } from '../../../../redux/reducers/frcr';
import Router from 'next/router';

const inputs = [
	{ icon: '', type: 'text', name: 'name', label: 'Nombre de la circular' },
	{ icon: '', type: 'file', name: 'file', label: 'Archivo' }
];
class Update extends Component {
	render() {
		const fields = [
			{ icon: '', type: 'link', name: 'url', label: 'Url circular', required: false },
			...inputs.map((input) => Object.assign({}, input.type === 'file' ? { required: false } : {}, input))
		];
		const { updateFn, fcr, id } = this.props;
		const element = fcr.filter((f) => f.id === id)[0];
		const inputsElement = fields.map((input) => Object.assign({}, input, { value: element[input.name] }));
		return (
			<Form
				botonlabel="Actualizar Circular"
				title="Actualizar Circular"
				inputs={inputsElement}
				actions={{
					updateFn: (data) => updateFn(Object.assign({}, element, data))
				}}
				redirect={{
					url: '/admin?page=cfr&view=list',
					path: '/admin/circulares'
				}}
			/>
		);
	}
}

Update.propTypes = {
	updateFn: PropTypes.func.isRequired
};

const mapDispatchToPropsUpdate = (dispatch) => ({
	updateFn: (data) => dispatch(actionHttp('fcrmailshot', 'update', data, 'formData'))
});

const mapStateToPropsListUpdate = (state = { frcr: INITIAL_STATE_FRCR }) => ({ fcr: state.frcr.data });

const update = connect(mapStateToPropsListUpdate, mapDispatchToPropsUpdate)(Update);
class Create extends Component {
	render() {
		const { createFn } = this.props;

		return (
			<Form
				botonlabel="Crear Circular"
				title="Crear Circular"
				inputs={inputs}
				actions={{
					createFn: createFn
				}}
				redirect={{
					url: '/admin?page=cfr&view=list',
					path: '/admin/circulares'
				}}
			/>
		);
	}
}

Create.propTypes = {
	createFn: PropTypes.func.isRequired
};

const mapDispatchToPropsCreate = (dispatch) => ({
	createFn: (data) => dispatch(actionHttp('fcrmailshot', 'create', data, 'formData'))
});

const create = connect(null, mapDispatchToPropsCreate)(Create);

const columnData = [
	{ id: 'name', numeric: false, disablePadding: true, label: 'Nombre de la Circular' },
	{ id: 'url', numeric: false, disablePadding: true, label: 'Enlace', type: 'link' },
	{ id: 'creationDate', numeric: false, disablePadding: true, label: 'Creado' }
];
class List extends React.Component {
	goTo = (cfr) => {
		Router.push(
			`/admin?page=cfr&view=update&params=${JSON.stringify({ id: cfr.id })}`,
			`/admin/circulares/update/${cfr.id}`
		);
	};
	render() {
		const { getFrc, fcr, actionFrc } = this.props;
		return (
			<Table
				title="Circulares de Firmas Registradas"
				prelabel="Circulares"
				actions={[
					{
						fn: this.goTo,
						show: true,
						askToAction: false,
						labelActive: 'Editar',
						labelDeActive: 'Editar',
						iconActive: 'edit_icon',
						iconDeActive: 'edit_icon'
					},
					{
						fn: actionFrc,
						show: true,
						labelActive: 'Eliminar',
						labelDeActive: 'Activar',
						iconActive: 'delete_outline',
						iconDeActive: 'publish'
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
	getFrc: () => dispatch(getHttp('fcrmailshot', 'getall')),
	actionFrc: (data, state) => {
		data.active = !state.active;
		return dispatch(actionHttp('fcrmailshot', 'update', data));
	}
});
const mapStateToPropsList = (state = { frcr: INITIAL_STATE_FRCR }) => ({ fcr: state.frcr.data });

const list = connect(mapStateToPropsList, mapDispatchToPropsList)(List);

export default {
	create,
	list,
	update,
	permissions: [ 'FCR' ],
	links: [
		{
			icon: 'view_list',
			txt: 'FCRC',
			primary: 'Circulares',
			secondary: '',
			url: '/admin?page=cfr&view=list',
			as: '/admin/circulares'
		},
		{
			icon: 'add_box',
			txt: 'Crear',
			primary: 'Crear Circular',
			secondary: '',
			url: '/admin?page=cfr&view=create',
			as: '/admin/circular/create'
		}
	]
};
