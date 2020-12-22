<template>
  <div v-if="signedIn()">

    <div class="smart-link-generator-container d-flex">
      <div class="picture-bg-light-gray d-flex justify-content-center align-items-center flex-column">
        <img src="../assets/smart-link.png">
        <p class="my-3"><strong>Your Smart Links are ready!</strong></p>
        <p>No need to answer any question, just create as many smart links as you like.</p>
      </div>
      <div class="w-100">
        <form class="container create-smart-link py-5 d-flex justify-content-around">

          <div class="w-50 p-3 text-left">
            <div class="pl-3">
              <h3>Time to create some <strong>Smart Links</strong> 🎉</h3>
              <p>In order to create a <strong>smart link</strong> please provide some information such as a custom name and a real url:</p>
            </div>
            <hr>
            <div class="form-group">
              <label for="text" class="my-3">Name</label>
              <input @blur="validationStatus($v.name)" v-model='$v.name.$model' :class="{ 'is-invalid': validationStatus($v.name) }" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Panda">
              <div v-if="!$v.name.required" class="invalid-feedback">Name is required.</div>
              <small v-if="validationStatus($v.name) === false" class="text-success">Please provide a name</small>
            </div>
            <div class="form-group">
              <label for="url" class="my-3">Url</label>
              <input @blur="validationStatus($v.url)" v-model='$v.url.$model' :class="{ 'is-invalid': validationStatus($v.url) }" class="form-control" id="url" placeholder="http://www.exaple.com/en/panda">
              <div v-if="!$v.url.required" class="invalid-feedback">URL is required.</div>
              <small v-if="validationStatus($v.url) === false" class="text-success">Please provide an url</small>
            </div>
            <button  @click.prevent="addSmartLink" type="submit" class="btn btn-dark w-100 mt-5">Create Smart Link</button>
          </div>

          <div class="w-50 p-3 language-rules">
            <div class="text-left">
              <h3>Language Rules 🇪🇸 🇩🇪 </h3>
              <button class="btn btn-success btn-sm mr-3" @click.prevent="rules.push({rule_name: ' ', rule_url: ' '})">+</button>
              <button class="btn btn-warning btn-sm ml-3" @click.prevent="rules.pop()">-</button>
            </div>
            <div v-for="rule in rules" v-bind:key="rule" class="text-left mt-3">
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
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'Generator',
  data () {
    return {
      name: '',
      url: '',
      userId: '',
      rules: [
        {
          rule_name: '',
          rule_url: ''
        }
      ]
    }
  },
  validations: {
    name: { required },
    url: { required }
  },
  created () {
    this.signedIn()
    let val = localStorage.getItem('id')
    const int = parseInt(val, 10)
    this.userId = int
  },
  methods: {
    signedIn () {
      return localStorage.signedIn
    },
    addSmartLink () {
      axios.post('http://localhost:3000/api/v1/smart_links', { name: this.name, url: this.url, user_id: this.userId })
        .then(response => this.signinSuccesful(console.log(response)))
        .catch(error => this.signinFailed(error))
    },
    validationStatus (validation) {
      return validation !== 'undefined' ? validation.$error : false
    }
  }

}
</script>

<style scoped>
  div.invalid-feedback {
    position: absolute;
  }
  small.text-success {
    position: absolute;
  }
  h4 {
    margin: 0;
  }
  .picture-bg-light-gray{
    height: 92vh;
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
  .language-rules{
    background-color: rgba(0,0,0, 0.1);
    width: max-content;
    height: max-content;
    border-radius: 4px;
    box-shadow: 1px 1px 3px rgba(0,0,0,0.2)
  }
</style>
