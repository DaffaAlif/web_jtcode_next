// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

import Cookies from 'universal-cookie'

// ** Config
import authConfig from 'src/configs/auth'

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()
  useEffect(() => {
    const initAuth = async () => {
      const cookies = new Cookies()
      const storedToken = cookies.get(authConfig.storageTokenKeyName)
      if (storedToken) {
        setLoading(true)
        await axios
          .get(authConfig.meEndpoint, {
            headers: {
              Authorization: 'Bearer ' + storedToken
            }
          })
          .then(async response => {
            setLoading(false)
            setUser({ ...response.data })
          })
          .catch(() => {
            // localStorage.removeItem('userData')
            // localStorage.removeItem('refreshToken')
            // localStorage.removeItem('token')
            cookies.remove(authConfig.storageTokenKeyName, { path: '/' })
            setUser(null)
            setLoading(false)
            if (
              // authConfig.onTokenExpiration === 'logout' &&
              !router.pathname.includes('login')
            ) {
              router.replace('/login')
            }
          })
      } else {
        setLoading(false)
      }
    }
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 'https://code.tryoutx.com/api/auth/login'
  // authConfig.loginEndpoint

  //response kalo pake api tryout x
  //         {status: true, message: 'User logged in successfully', token: 'SHX502t18AgmikRyCrkPzDsKRpbteWdp1hEAgNFW139dfc61'}
  // message
  // :
  // "User logged in successfully"
  // status
  // :
  // true
  // token
  // :
  // "SHX502t18AgmikRyCrkPzDsKRpbteWdp1hEAgNFW139dfc61"

  // response kalo pake bawaan vuexy

  //         {accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwia…1MzV9.l-VDw9h8nBGM_0H1ASFPN1s2MDjZx6HUYesAPYWjpkQ', userData: {…}}
  // accessToken
  // :
  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk3NzI1MjM1LCJleHAiOjE2OTc3MjU1MzV9.l-VDw9h8nBGM_0H1ASFPN1s2MDjZx6HUYesAPYWjpkQ"
  // userData
  // :
  // email
  // :
  // "admin@vuexy.com"
  // fullName
  // :
  // "John Doe"
  // id
  // :
  // 1
  // role
  // :
  // "admin"
  // username
  // :
  // "johndoe"

  const handleLogin = (params, errorCallback) => {
    axios
      .post(authConfig.loginEndpoint, params)
      .then(async response => {
        const cookies = new Cookies()
        // params.rememberMe ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.token) : null
        params.rememberMe ? cookies.set(authConfig.storageTokenKeyName, response.data.token, { path: '/' }) : null
        const returnUrl = router.query.returnUrl
        console.log(response.data)

        //accessToken
        console.log(response.data.accessToken)

        setUser({ ...response.data.userData })
        // params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.userData)) : null
        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
        router.replace(redirectURL)
      })
      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    const cookies = new Cookies()
    const storedToken = cookies.get(authConfig.storageTokenKeyName)
    axios.get(authConfig.logoutEndpoint, {
      headers: {
        Authorization: 'Bearer ' + storedToken
      }
    })
    setUser(null)
    // window.localStorage.removeItem('userData')
    // window.localStorage.removeItem(authConfig.storageTokenKeyName)
    cookies.remove(authConfig.storageTokenKeyName, { path: '/' })
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
