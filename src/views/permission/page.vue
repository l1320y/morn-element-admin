<template>
  <div class="app-container">
    <switch-privileges @change="handlePrivilegesChange" />
  </div>
</template>

<script>
import SwitchPrivileges from './components/SwitchPrivileges'

export default{
  name: 'PagePermission',
  components: { SwitchPrivileges },
  methods: {
    handlePrivilegesChange() {
      this.$router.push({ path: '/permission/index?' + +new Date() })
    }
  }
}
</script>
