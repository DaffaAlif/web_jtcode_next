const navigation = () => {
  return [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: 'tabler:smart-home'
    },
    {
      title: 'Statistic',
      path: '/alerts',
      icon: 'tabler:align-box-bottom-center'
    },
    {
      title: 'Alerts Log',
      path: '/statistic',
      icon: 'tabler:alert-square-rounded',
    },
    {
      title: 'Assets',
      icon: 'tabler:printer',
      children: [
        {
          title: 'Client',
          path: '/clients'
        },
        {
          title: 'Customer',
          path: '/customer-page'
        },
        {
          title: 'Site',
          path: '/sites'
        },
        {
          title: 'Printer',
          path: '/printers'
        },
        {
          title: 'Alarm',
          path: '/alarmset'
        }
      ]
    },
    {
      title: 'Devices',
      icon: 'tabler:printer',
      children: [
        {
          title: 'Instrument',
          path: '/instruments'
        },
        {
          title: 'Parameter',
          path: '/parameters'
        },]
    },

    {
      title: 'User Management',
      icon: 'tabler:user-cog',
      children: [
        {
          title: 'Users',
          path: '/users'
        },
        {
          title: 'User Group',
          path: '/user-group'
        },]
    },
    {
      title: 'User Log',
      path: '/user-log',
      icon: 'tabler:album'
    },
  ]
}

export default navigation
