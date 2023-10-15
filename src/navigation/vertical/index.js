const navigation = () => {
  return [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: 'tabler:smart-home'
    },
    {
      title: 'Alerts',
      path: '/alerts',
      icon: 'tabler:align-box-bottom-center'
    },
    {
      title: 'Statistics',
      path: '/statistic',
      icon: 'tabler:alert-square-rounded'
    },
    {
      title: 'Printers',
      icon: 'tabler:printer',
      children: [
        {
          title: 'Client',
          path: '/printers-client'
        },
        {
          title: 'Customer',
          path: '/printers-customer'
        },
        {
          title: 'Site',
          path: '/printers-site'
        }
      ]
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
