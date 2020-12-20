<template>
  <h1 v-if="signedIn()">Generator</h1>
</template>

<script>
export default {
  name: 'Generator',
  created () {
    this.signedIn()
  },
  methods: {
    signedIn () {
      return localStorage.signedIn
    }
  }
}
</script>

<style scoped>

  h1 {
    margin: 0;
  }

</style>
