import React from 'react'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Icon from 'material-ui/Icon'
import Router from 'next/router'
import Tooltip from 'material-ui/Tooltip'
import { withStyles } from 'material-ui/styles'
import PropTypes from 'prop-types'

// const styles = {
//   fontSize: 12,
//   paddingRight: 'unset',
//   paddingTop: 'unset',
//   paddingLeft: 8,
//   maxHeight: 24,
//   marginBottom: 5,
//   marginTop: 15,
//   lineHeight: 'unset',
// }

const handlerClick = e => Router.push(e.url, e.as)
const toolbarStyles = theme => ({
  h3: {
    color: 'white',
    '& h3': {
      color: 'white',
      fontSize: 12,
    },
  }
})
const getStyle = (query, entry) => {
  let style = {}
  if (query.page) {
    const page = entry.as.toLowerCase().includes(query.page.toLowerCase())
    const view = entry.as.toLowerCase().includes(query.view.toLowerCase()) || entry.url.toLowerCase().includes(query.view.toLowerCase())
    if (page && view) {
      return { backgroundColor: '#0070b5' }
    }
  }
  return {}
}

const fnGetComponents = (_, items) => query => {
  let Component = props => {
    return (
      <List
        // subheader={<ListSubheader style={styles}>{`${title}`}</ListSubheader>}
      >
        {
          items.map(entry => (
            <ListItem key={entry.icon} button onClick={() => handlerClick(entry)} style={getStyle(query, entry)}>
              <Tooltip title={entry.txt}>
                <ListItemIcon aria-label={entry.txt}>
                  <Icon style={{ color: 'white' }}>{entry.icon}</Icon>
                </ListItemIcon>
              </Tooltip>
              <ListItemText className={props.classes.h3} primary={entry.primary} secondary={entry.secondary} />
            </ListItem>
          ))
        }
      </List>
    )
  }
  Component.propTypes = {
    classes: PropTypes.object.isRequired,
  }
  Component = withStyles(toolbarStyles, { withTheme: true, name: 'BarIconsAdmin' })(Component)
  return <Component />
}

const pqrs = [
  { icon: 'inbox', txt: 'PQRs', primary: 'PQRs', secondary: '', url: '/admin?page=pqrs&view=list', as: '/admin/pqrs' }
]

const frc = [
  { icon: 'view_list', txt: 'FCR', primary: 'FCR', secondary: '', url: '/admin?page=fcr&view=list', as: '/admin/fcr' },
  { icon: 'add_box', txt: 'Crear', primary: 'Crear FCR', secondary: '', url: '/admin?page=fcr&view=create', as: '/admin/fcr/create' }
]

const fcrc = [
  { icon: 'view_list', txt: 'FCRC', primary: 'Circulares', secondary: '', url: '/admin?page=cfr&view=list', as: '/admin/circulares' },
  { icon: 'add_box', txt: 'Crear', primary: 'Crear Circular', secondary: '', url: '/admin?page=cfr&view=create', as: '/admin/circular/create' }
]

const rtrs = [
  { icon: 'done', txt: 'RTR', primary: 'RTRs', secondary: '', url: '/admin?page=rtr&view=list', as: '/admin/rtr' }
]
const notifications = [
  { icon: 'notifications', txt: 'Notificaciones', primary: 'Notificaciones', secondary: '', url: '/admin?page=notifications&view=list', as: '/admin/notifications' },
  { icon: 'add_box', txt: 'Crear', primary: 'Crear', secondary: '', url: '/admin?page=notifications&view=create', as: '/admin/notifications/create' }
]
const news = [
  { icon: 'view_list', txt: 'Noticias', primary: 'Noticias', secondary: '', url: '/admin?page=news&view=list', as: '/admin/news' },
  { icon: 'add_box', txt: 'Crear', primary: 'Crear Noticia', secondary: '', url: '/admin?page=news&view=create', as: '/admin/news/create' }
]
const users = [
  { icon: 'supervisor_account', txt: 'Usuarios', primary: 'Usuarios', secondary: '', url: '/admin?page=users&view=list', as: '/admin/users' },
  { icon: 'person_add', txt: 'Crear', primary: 'Crear Usuario', secondary: '', url: '/admin?page=users&view=create', as: '/admin/users/create' },
]
const providers = [
  { icon: 'supervised_user_circle', txt: 'Proveedores', primary: 'Proveedores', secondary: '', url: '/admin?page=providers&view=list', as: '/admin/providers' },
]
const purchase = [
  { icon: 'view_list', txt: 'Crear', primary: 'Compras', secondary: '', url: '/admin?page=purchase&view=list', as: '/admin/purchase' },
  { icon: 'card_travel', txt: 'Crear', primary: 'Crear Compra', secondary: '', url: '/admin?page=purchase&view=create', as: '/admin/purchase/create' },
]

export const FcrcMenuComponent = fnGetComponents('FCRC', fcrc)

export const FrcMenuComponent = fnGetComponents('FRC', frc)

export const PQRsMenuComponent = fnGetComponents('PQRs', pqrs)

export const RTRsMenuComponent = fnGetComponents('RTRs', rtrs)

export const NotificationsMenuComponent = fnGetComponents('Notifications', notifications)

export const NewsMenuComponent = fnGetComponents('News', news)

export const UsersMenuComponent = fnGetComponents('Usuarios', users)

export const ProvidersMenuComponent = fnGetComponents('Providers', providers)

export const PurchaseMenuComponent = fnGetComponents('Purchase', purchase)
