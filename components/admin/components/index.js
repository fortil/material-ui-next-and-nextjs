import pqrs from './pqrs'
import pqrsSingle from './pqrs/single'
import rtr from './rtr'
import rtrSingle from './rtr/single'
import newsCreate from './news/create'
import newsUpdate from './news/update'
import newsList from './news/list'
import notificationsCreate from './notifications/create'
import notificationsUpdate from './notifications/update'
import notificationsList from './notifications/list'
import proveedoresUpdate from './proveedores/edit'
import proveedoresList from './proveedores/list'
import proveedoreSingle from './proveedores/single'
import usersEdit from './users/edit'
import usersCreate from './users/create'
import usersList from './users/list'
import fcr from './frc'
import cfr from './cfr'
import purchaseCreate from './purchase/create'
import purchaseList from './purchase/list'

export default {
  cfr,
  fcr,
  rtr: {
    list: rtr,
    single: rtrSingle
  },
  pqrs: {
    list: pqrs,
    single: pqrsSingle
  },
  news: {
    list: newsList,
    create: newsCreate,
    update: newsUpdate,
  },
  notifications: {
    list: notificationsList,
    create: notificationsCreate,
    update: notificationsUpdate,
  },
  users: {
    create: usersCreate,
    edit: usersEdit,
    list: usersList
  },
  purchase: {
    create: purchaseCreate,
    list: purchaseList,
  },
  providers: {
    edit: proveedoresUpdate,
    single: proveedoreSingle,
    list: proveedoresList
  },
}