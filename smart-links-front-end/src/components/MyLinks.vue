<template>
  <div v-if="signedIn()" id="my-links" class="container px-4">
    <div>
      <h1>My Smart Links</h1>
    </div>
    <ul class="p-4">
      <li v-for="link in links" v-bind:key="link.id" :link="link" class="my-3">
        <div class=" d-flex justify-content-between align-items-center">
          <div v-if="link.user_email === email" class="list-link d-flex justify-content-between align-items-center p-2">
            <div class="text-left ml-3">
              <p class="mb-2 link-name">{{ link.name }}</p>
              <p class="link-url">{{ link.url }}</p>
            </div>
            <div class="text-right mr-3">
              <p class="mb-2 link-time">{{ Math.round(Math.abs(new Date() - new Date(link.minutes))/1000/60) }} min ago.</p>
              <p class="link-data">by {{ link.user_email }}</p>
            </div>
          </div>
          <div v-if="link.user_email === email" class="d-flex">
            <button @click.prevent="editSmartLink(link)" class="btn btn-primary mx-3">Edit</button>
            <button @click.prevent="deleteSmartLink(link)" class="btn btn-danger mx-3">Delete</button>
          </div>
        </div>

        <div v-if="link.user_email === email">
          <div v-if="link == editedLink">
            <form action="" @submit.prevent="updateSmartLink(link)">
              <div>
                <label for="text" class="my-3">Name</label>
                <input type="text" v-model="newlink.name" :placeholder="link.name">
              </div>
              <div>
                <label for="">New Url</label>
                <input type="text" v-model="newlink.url" :placeholder="link.url">
              </div>
              <button type="submit" class="btn btn-dark">Update Smart Link</button>
              <button type="submit" @click.prevent="editSmartLink(null)" class="btn btn-warning">Cancel</button>
            </form>
          </div>
        </div>
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
      editedLink: '',
      newlink: {},
      email: '',
      links: {},
      setError: ''
    }
  },
  created () {
    const email = localStorage.getItem('email')
    this.email = email
    axios.get('http://localhost:3000/api/v1/smart_links')
      .then(response => {
        this.links = response.data
      })
      .catch(error => console.log(error))
  },
  methods: {
    signedIn () {
      return localStorage.signedIn
    },
    deleteSmartLink (smartLink) {
      axios.delete(`http://localhost:3000/api/v1/smart_links/${smartLink.id}`)
        .then(response => {
          this.links.splice(this.links.indexOf(smartLink), 1)
        })
        .catch(error => this.setError(error, 'Cannot delete Smart Link'))
    },
    editSmartLink (link) {
      this.editedLink = link
    },
    updateSmartLink (link) {
      this.editedLink = ''
      axios.patch(`http://localhost:3000/api/v1/smart_links/${link.id}`, { name: this.newlink.name, url: this.newlink.url })
        .catch(error => this.setError(error, 'Cannot update link'))
    }
  }
}

</script>

<style scoped>
  button {
    height: 40px;
  }

  ul{
    list-style: none;
    padding: 0;
  }
  .list-link {
    background-color: #3f3f3f;
    color: white;
    border-radius: 4px;
    transition: .25s;
    width: 80%;
  }
  .list-link:hover {
    transform: scale(1.02);
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
