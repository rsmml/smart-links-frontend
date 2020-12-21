<template>
  <div v-if="signedIn()">

    <div class="smart-link-generator-container d-flex">
      <div class="picture-bg-light-gray d-flex justify-content-center align-items-center">
        <img src="../assets/smart-link.png">
      </div>
      <div class="w-100">
        <form class="container create-smart-link py-5 d-flex justify-content-around" @submit.prevent="addSmartLink">

          <div class="w-50 p-3 text-left">
            <div class="pl-3">
              <h3>Time to create some Smart Links! 🎉</h3>
              <p>In order to create a <strong>smart link</strong> please provide some information</p>
              <p>such as a custom name and a real url:</p>
            </div>
            <hr>
            <div class="form-group ">
              <label for="text">Name</label>
              <input class="form-control" id="name" aria-describedby="emailHelp" placeholder="Panda">
            </div>
            <div class="form-group">
              <label for="url">Url</label>
              <input class="form-control" id="url" placeholder="http://www.exaple.com/en/panda">
            </div>
          </div>

          <div class="w-50 p-3">
            <div class="d-flex align-items-center">
              <h4>Language Rules</h4>
              <button class="btn btn-success btn-sm" @click="rules.push({rule_name: ' ', rule_url: ' '})">+</button>
              <button class="btn btn-warning btn-sm" @click="rules.pop()">-</button>
            </div>
            <div v-for="rules in rules" class="text-left">
              <div class="form-group">
                <label for="text">Language Name</label>
                <input class="form-control" v-model="rule_name" placeholder="ES"/>
              </div>
              <div class="form-group">
                <label for="url">Url Variant</label>
                <input class="form-control" v-model="rule_url" placeholder="http://www.exaple.com/es/panda"/>
              </div>
            </div>

          </div>
          <!-- <button type="submit" class="btn btn-dark">Create Smart Link</button> -->
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Generator',
  data () {
    return {
      name: '',
      url: '',
      rules: [
        {
          rule_name: '',
          rule_url: ''
        }
      ]
    }
  },
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
  button{
    margin: 12px;
    align-items: center;
    height: 30px;
    width: 30px;
  }

  h4 {
    margin: 0;
  }
  .picture-bg-light-gray{
    height: 100vh;
    width: 370px;
    background-color: rgba(0,0,0,0.05);
  }
  img {
    width: 85%;
    margin: 0;
  }

  hr {
    width: 15%;
    border: 5px solid #407bd2;
    margin-left: 0;
  }
  p{
    margin: 0;
  }
</style>
