import list from './list'
import update from './update'
import single from './single'

export default {
  list,
  single,
  update,
  permissions: ['Compras'],
  links: [
    { icon: 'supervised_user_circle', txt: 'Proveedores', primary: 'Proveedores', secondary: '', url: '/admin?page=providers&view=list', as: '/admin/providers' },
  ]
}