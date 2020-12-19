<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
    <img src="../assets/logo.png" class="mr-5">
    <router-link to="/" class="navbar-brand">Smart Links Generator</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link to="/" class="">Smart Links</router-link>
        </li>
          <router-link to="/generator" class="" v-if="signedIn()">Create Smart Links</router-link>
        <li class="nav-item">
        </li>
      </ul>
    </div>

    <div>
      <router-link to="/signin" class="" v-if="!signedIn()">Sign In</router-link>
      <router-link to="/signin" class="" v-if="!signedIn()">Sign Up</router-link>
      <a href="/" @click.prevent="signOut" class="" v-if="signedIn()">Sign Out</a>
    </div>

    </div>
  </nav>
</template>

<script >
export default {
  name: 'NavBar',
  created () {
    this.signedIn()
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    signedIn () {
      return localStorage.signedIn
    },
    signOut () {
      this.$http.secured.delete('/signin')
        .then(response => {
          delete localStorage.csrf
          delete localStorage.signedIn
          this.$router.replace('/')
        })
        .catch(error => this.setError(error, 'Cannot sign out'))
    }
  }
}
</script>

<style scoped>
  img{
    height: 40px;
  }
</style>
