
import store from '@/store'

export default{
  inserted(el, binding, vnode) {
    const { value } = binding
    const privileges = store.getters && store.getters.privileges

    if (value && value instanceof Array && value.length > 0) {
      const permissionPrivileges = value

      const hasPermission = privileges.some(privilege => {
        return permissionPrivileges.includes(privilege)
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need privileges! Like v-permission="['admin','editor']"`)
    }
  }
}
