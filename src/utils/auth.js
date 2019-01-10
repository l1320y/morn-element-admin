import Cookies from 'js-cookie'
import features from '@/features'
import { AUTH_TOKEN } from '@/features/auth'

const TokenKey = 'Admin-Token'

/**
 * 判断是否使用Token鉴权
 * @return {boolean} 是否使用Token鉴权
 */
export function useToken() {
  return features.auth.mode === AUTH_TOKEN
}

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
