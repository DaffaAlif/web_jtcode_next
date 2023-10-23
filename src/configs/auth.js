const apiurl = 'https://dev.iotaroundyou.my.id'
export default {
  meEndpoint: apiurl + '/api/user',
  loginEndpoint: apiurl + '/api/auth/login',
  registerEndpoint: '/jwt/register',
  logoutEndpoint: apiurl + '/api/logout',
  storageTokenKeyName: 'token'
  //   onTokenExpiration: 'refreshToken' // logout | refreshToken
}
