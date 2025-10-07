import Cookies from 'js-cookie';

// token在Cookie中key的名稱
const TokenKey = 'BioBankMgmt';

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
