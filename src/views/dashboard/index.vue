<template>
  <div class="dashboard-container">
    <component :is="currentPrivilege"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentPrivilege: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'privileges'
    ])
  },
  created() {
    if (!this.privileges.includes('admin')) {
      this.currentPrivilege = 'editorDashboard'
    }
  }
}
</script>
