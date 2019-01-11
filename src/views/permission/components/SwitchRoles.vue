<template>
  <div>
    <div style="margin-bottom:15px;">{{ $t('permission.privileges') }}： {{ privileges }}</div>
    {{ $t('permission.switchPrivileges') }}：
    <el-radio-group v-model="switchPrivileges">
      <el-radio-button label="editor"/>
      <el-radio-button label="admin"/>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  computed: {
    privileges() {
      return this.$store.getters.privileges
    },
    switchPrivileges: {
      get() {
        return this.privileges[0]
      },
      set(val) {
        this.$store.dispatch('ChangePrivileges', val).then(() => {
          this.$emit('change')
        })
      }
    }
  }
}
</script>
