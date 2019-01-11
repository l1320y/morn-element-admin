import store from '@/store'

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export default function checkPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const privileges = store.getters && store.getters.privileges
    const permissionPrivileges = value

    const hasPermission = privileges.some(privilege => {
      return permissionPrivileges.includes(privilege)
    })

    if (!hasPermission) {
      return false
    }
    return true
  } else {
    console.error(`need privileges! Like v-permission="['admin','editor']"`)
    return false
  }
}
