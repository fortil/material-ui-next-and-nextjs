const withImages = require('next-images')
const withCSS = require('@zeit/next-css')

module.exports = Object.assign({
  exportPathMap: (defaultPathMap) => {
    return {
      '/': { page: '/' },
      '/pqrs': { page: '/pqrs' },
      '/rtr': { page: '/rtr' },
      '/notifications': { page: '/notifications' },
      '/nuestros-servicios': { page: '/nuestros-servicios' },
      '/login': { page: '/login' },
      '/noticias': { page: '/noticias' },
      '/proveedores': { page: '/proveedores' },
      '/nosotros': { page: '/nosotros' },
      '/admin': { page: '/admin' },
      '/admin/pqrs': { page: '/admin', query: { page: 'pqrs', view: 'list' } },
      '/admin/pqrs/': { page: '/admin', query: { page: 'pqrs', view: 'list' } },
      '/admin/news': { page: '/admin', query: { page: 'news', view: 'list' } },
      '/admin/news/create': { page: '/admin', query: { page: 'news', view: 'create' } },
      '/admin/users': { page: '/admin', query: { page: 'users', view: 'list' } },
      '/admin/users/create': { page: '/admin', query: { page: 'users', view: 'create' } },
      '/admin/purchase': { page: '/admin', query: { page: 'purchase', view: 'list' } },
      '/admin/purchase/create': { page: '/admin', query: { page: 'purchase', view: 'create' } },
      '/admin/providers': { page: '/admin', query: { page: 'providers', view: 'list' } },
    }
  }
}, withImages(withCSS()))