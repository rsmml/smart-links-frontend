<template>
  <div id="smart-links" class="container px-4">
    <ul class="p-4">
      <li v-for="link in links" v-bind:key="link" class="list-link my-3">
        <div  @click.prevent="getRules(link)" class="d-flex justify-content-between align-items-center p-2">
          <div class="text-left ml-3">
            <p class="mb-2 link-name">{{ link.name }}</p>
            <p class="link-url">{{ link.url }}</p>
          </div>
          <div class="text-right mr-3">
            <p class="mb-2 link-time">{{ Math.round(Math.abs(new Date() - new Date(link.minutes))/1000/60) }} min ago.</p>
            <p class="link-data">by {{ link.user_email }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'SmartLink',
  data () {
    return {
      links: {}
    }
  },
  methods: {
    signedIn () {
      return localStorage.signedIn
    },
    getRules (link) {
      if (navigator.language === 'es' || navigator.language === 'de') {
        axios.get(`http://localhost:3000/api/v1/smart_links/${link.id}/language_rules`)
          .then(response => this.getLinks(response))
          .catch(error => console.log(error))
      } else {
        window.open(link.url, '_blank')
      }
    },
    getLinks (response) {
      const arr = []
      response.data.forEach((el) => {
        arr.push(el)
      })
      if (navigator.language === 'es') {
        window.open(arr[0].url, '_blank')
      } else if (navigator.language === 'de') {
        window.open(arr[1].url, '_blank')
      } else {
        console.log('EN')
      }
    }
  },
  created () {
    axios.get('http://localhost:3000/api/v1/smart_links')
      .then(response => {
        this.links = response.data.smart_links
      })
      .catch(error => console.log(error))
  }
}

</script>

<style scoped>
  ul{
    list-style: none;
    padding: 0;
  }
  .list-link {
    background-color: #3f3f3f;
    color: white;
    border-radius: 4px;
    transition: .25s;
  }
  .list-link:hover {
    transform: scale(1.02);
    cursor: pointer;
  }
  .list-link p{
    margin:0;
  }
  p.link-name{
    font-size: 22px;
    font-weight: bolder;
  }
  p.link-url{
    font-size: 14px;
    font-weight: lighter;
  }
  p.link-time {
    font-size: 14px;
    color: rgba(255,255,255,0.6)
  }
  p.link-data {
    font-size: 18px;
  }
</style>
