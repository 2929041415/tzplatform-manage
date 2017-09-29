import Cookies from 'js-cookie'

export const USER_TOKEN ='USER_TOKEN'
export const USER_ACCOUNT ='USER_ACCOUNT'
export const USER_MENU ='USER_MENU'

export function getKey(key) {
  return Cookies.get(key)
}

export function setKey(key, value) {
  return Cookies.set(key, value)
}

export function removeKey(key) {
  return Cookies.remove(key)
}
