import list from './list'
import create from './create'
import update from './update'

export default {
  list,
  create,
  update,
  permissions: ['Publicador'],
  links: [
    { icon: 'view_list', txt: 'Noticias', primary: 'Noticias', secondary: '', url: '/admin?page=news&view=list', as: '/admin/news' },
    { icon: 'add_box', txt: 'Crear', primary: 'Crear Noticia', secondary: '', url: '/admin?page=news&view=create', as: '/admin/news/create' }
  ]
}