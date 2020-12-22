<template>
  <div id="my-links">
    <div v-if="signedIn()">
      <h1>My Smart Links</h1>
    </div>

    <ul>
      <li  class="list-link">
        <div>Holis</div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'MyLinks',
  data () {
    return {
      links: {}
    }
  },
  methods: {
    signedIn () {
      return localStorage.signedIn
    }
  },
  created () {
    axios.get('http://localhost:3000/api/v1/smart_links')
      .then(response => {
        this.links = response.data
      })
      .catch(error => console.log(error))
  }
}

</script>

<style scoped>

  h1 {
    margin: 0;
  }

</style>
