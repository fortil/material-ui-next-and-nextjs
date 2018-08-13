import React, { Component } from 'react'
import Layout from '../layouts/main'
import NotificationsComponent from '../components/notifications'
import GrantImage from '../components/notifications/grantimage'

class Notifications extends Component {
  render() {
    return (
      <Layout title="Notifications" page="Notifications">
        <GrantImage />
        <NotificationsComponent />
      </Layout>
    )
  }
};

export default Notifications
