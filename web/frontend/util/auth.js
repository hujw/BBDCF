// import Cookies from 'js-cookie'

// token在Cookie中key的名稱
const TokenKey = 'BioBank';

// export function getToken () {
//   return Cookies.get(TokenKey)
// }

// export function setToken (token) {
//   return Cookies.set(TokenKey, token)
// }

// export function removeToken () {
//   return Cookies.remove(TokenKey)
// }

// cookie-universal-nuxt (目前是使用這裡)
export function getTokenByApp(app) {
  return app.$cookies.get(TokenKey);
}

export function setTokenByApp(app, token) {
  app.$cookies.set(TokenKey, token);
}

export function removeTokenByApp(app) {
  app.$cookies.remove(TokenKey);
}
