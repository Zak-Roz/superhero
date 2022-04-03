<template>
  <div class="container">
    <div class="card border-0 mt-5" align="center">
      <div class="row align-items-center">
        <div>
          <img src="https://vesti.ua/wp-content/uploads/2021/09/Marvel-Studios-Lawsuit-Phase.jpg" width="100%">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from '../../services/user.service';

export default {
  name: 'Home',
  data() {
    return {
      content: ''
    };
  },
  mounted() {
    UserService.getPublicContent().then(
      response => {
        this.content = response.data;
      },
      error => {
        this.content =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>
<style scoped>
.container {
  margin-top: 1rem;
}
</style>