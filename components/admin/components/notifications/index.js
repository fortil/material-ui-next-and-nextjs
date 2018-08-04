import list from './list'
import create from './create'
import update from './update'

export default {
  list,
  create,
  update,
  permissions: ['Atención Usuario'],
  links: [
    { icon: 'notifications', txt: 'Notificaciones', primary: 'Notificaciones', secondary: '', url: '/admin?page=notifications&view=list', as: '/admin/notifications' },
    { icon: 'add_box', txt: 'Crear', primary: 'Crear', secondary: '', url: '/admin?page=notifications&view=create', as: '/admin/notifications/create' }
  ]
}