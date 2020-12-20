<template>
  <h1>Smart Links</h1>

 <!--  <ul>
    <li v-for="smartLinks in smartLinks" :key="smart_link.id" :smart_link="smart_link">
      <div>{{ smartLinks.name }}</div>
    </li>
  </ul> -->
</template>

<script>
export default {
  name: 'SmartLink',
  data () {
    return {
      smartLinks: [],
      newSmartLinks: [],
      error: '',
      editedSmartLink: ''
    }
  }
  // created () {
  //   if (!localStorage.signedIn) {
  //     this.$router.replace('/')
  //   } else {
  //     this.$http.secured.get('http://localhost:3000/api/v1/smart_links')
  //       .then(response => { this.smartLinks = response.data })
  //       .catch(error => this.setError(error, 'Something went wrong'))
  //   }
  // }
}

</script>

<style scoped>

  h1 {
    margin: 0;
  }

</style>
