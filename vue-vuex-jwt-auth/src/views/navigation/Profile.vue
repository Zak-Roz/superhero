<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        User account <strong>{{currentUser.fullname}}</strong>
      </h3>
    </header>
    <input type="button" style="margin:15px 0 0 0;width: 15%" class="btn btn-success" id="show-modal" @click="showModal = true" value="Change password"/>
    <mdPass v-if="showModal" @close="showModal = false;">
      <h3 slot="header">Change password</h3>
    </mdPass>
    <div style="padding: 10px 0"></div>
    <p>
      <strong>Login:</strong>
      {{currentUser.login}}
    </p>
  </div>
</template>

<script>
import mdPass from './../modals/md-pass.vue';

export default {
  components: {
    mdPass,
  },
  data() {
    return {
      showModal: false,
      user: null,
    };
  },
  name: 'Profile',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  },
};
</script>
<style scoped>
.container {
  margin-top: 1rem;
}
</style>