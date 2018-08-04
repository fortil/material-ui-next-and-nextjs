import list from './list'
import single from './single'
import create from './create'

export default {
  list,
  create,
  single,
  permissions: ['Compras'],
  links: [
    { icon: 'view_list', txt: 'Crear', primary: 'Compras', secondary: '', url: '/admin?page=purchase&view=list', as: '/admin/purchase' },
    { icon: 'card_travel', txt: 'Crear', primary: 'Crear Compra', secondary: '', url: '/admin?page=purchase&view=create', as: '/admin/purchase/create' },
  ]
}