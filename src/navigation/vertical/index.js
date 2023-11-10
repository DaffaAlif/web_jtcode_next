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
      children: [
        {
          title: 'Alert List',
          path: '/statistic'
        },
        {
          title: 'Alarm Add',
          path: '/statistic/add'
        },
        {
          title: 'Alarm Edit',
          path: '/statistic/edit'
        }
      ]
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
          path: '/customer'
        },
        {
          title: 'Sites',
          path: '/sites'
        },
        {
          title: 'Printers',
          path: '/printers'
        },
        {
          title: 'Alarm Set',
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
          path: '/instrument'
        },
        {
          title: 'Parameter',
          path: '/parameter'
        },]
    },

    {
      title: 'User Management',
      path: '/manage-users',
      icon: 'tabler:user-cog'
    },
    {
      title: 'User Log',
      path: '/user-log',
      icon: 'tabler:album'
    },
    {
      path: '/acl',
      action: 'read',
      subject: 'acl-page',
      title: 'Access Control',
      icon: 'tabler:shield'
    }
  ]
}

export default navigation
