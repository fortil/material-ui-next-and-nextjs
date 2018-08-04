import list from './list'
import update from './update'
import create from './create'

export default {
  list,
  create,
  update,
  permissions: ['Admin'],
  links: [
    { icon: 'supervisor_account', txt: 'Usuarios', primary: 'Usuarios', secondary: '', url: '/admin?page=users&view=list', as: '/admin/users' },
    { icon: 'person_add', txt: 'Crear', primary: 'Crear Usuario', secondary: '', url: '/admin?page=users&view=create', as: '/admin/users/create' },
  ]
}