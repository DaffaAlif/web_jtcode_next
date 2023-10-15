const navigation = () => [
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
    path: '/printers',
    icon: 'tabler:printer'
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

export default navigation
