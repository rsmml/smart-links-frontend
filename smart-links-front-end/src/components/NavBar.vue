<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light" :key="componentKey">
    <div class="container">
    <img src="../assets/logo.png" class="mr-5">
    <router-link to="/" class="navbar-brand">Smart Links Generator</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Smart Links</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/generator" class="nav-link" v-if="signedIn()">Create Smart Links</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/mylinks" class="nav-link" v-if="signedIn()">My Smart Links</router-link>
        </li>
      </ul>
    </div>

    <div :key="componentKey" class="d-flex">
      <router-link to="/signin" class="nav-link btn nav-link" v-if="!signedIn()">Sign In</router-link>
      <button @click.prevent="logOut" to="/" class="btn nav-link" v-if="signedIn()">Log Out</button>
    </div>

    </div>
  </nav>
</template>

<script >
import { bus } from '../main'
import axios from 'axios'

export default {
  name: 'NavBar',
  data () {
    return {
      componentKey: false
    }
  },
  created () {
    this.signedIn()
    bus.$on('signed_in', (data) => {
      this.componentKey = !data
    })
    bus.$on('signed_up', (data) => {
      this.componentKey = !data
    })
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    forceRerender () {
      this.componentKey += 1
    },
    signedIn () {
      return localStorage.signedIn
    },
    logOut () {
      axios.delete('http://localhost:3000/api/v1/logout')
        .then(response => {
          this.componentKey = false
          delete localStorage.csrf
          delete localStorage.signedIn
          this.$router.replace('/')
          this.$forceUpdate()
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
