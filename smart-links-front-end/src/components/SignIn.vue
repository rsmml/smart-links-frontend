<template>
  <div>
    <div class="container px-0" :class="{'sign-up-active' : signUp}">
      <div class="overlay-container p-0">
        <div class="row overlay mx-0">
          <!-- Log-In Message -->
          <div class="py-5 col-12 col-lg-6 overlay-left d-flex flex-column justify-content-around align-items-center">
            <h1><strong>Smart Links</strong></h1>
            <h3>Welcome Back!</h3>
            <div>
              <p class="m-0">If you have already an account</p>
              <p class="m-0">sign-in in here</p>
            </div>
            <button style="margin-bottom: 6px;" class="btn btn-light" id="signIn" @click="signUp = !signUp">Sign In</button>
          </div>

          <!-- Sign-Up Message -->
          <div class="p-0 col-12 col-lg-6 overlay-right d-flex flex-column justify-content-around align-items-center">
            <h1 class="px-3">Want to create cool <strong>smart-links</strong>?</h1>
            <div class="px-3">
              <p class="m-0">If you are interested in creating some</p>
              <p class="m-0"><strong>Smart Links</strong></p>
              <p class="m-0">please sign up here</p>
            </div>
            <button class="btn btn-light" id="signUp" @click="signUp = !signUp" style="margin-bottom: 27%">Sign Up</button>
          </div>
        </div>
      </div>

      <!-- Forms -->
      <!-- Registration Form -->
      <form class="sign-up py-3" @submit.prevent="signup">
        <div class="form-group">
          <label for="email">Email address</label>
          <input type="email" v-model="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="example@example.com">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" v-model="password" class="form-control" id="password" placeholder="Password">
        </div>
        <div class="form-group">
          <label for="password-confirmation">Password Confirmation</label>
          <input type="password" v-model="password_confirmation" class="form-control" id="password_confirmation" placeholder="Password">
        </div>
        <button type="submit" class="btn btn-dark">Register</button>
        <small id="emailHelp" class="form-text text-muted m-0 align-middle">Alredy registered? Look left </small>
      </form>

      <!-- SignIn Form -->
      <form class="sign-in py-5" @submit.prevent="signin">
        <div class="form-group">
          <label for="email">Email address</label>
          <input type="email" v-model="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" v-model="password" class="form-control" id="password" placeholder="Password">
        </div>
        <button type="submit" class="btn btn-dark">Sign-In</button>
        <small id="emailHelp" class="form-text text-muted m-0 align-middle">New Here? Watch over there -> </small>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignIn',
  data () {
    return {
      signUp: false,
      email: '',
      password: '',
      password_confirmation: '',
      error: ''
    }
  },
  created () {
    this.checkSignedIn()
  },
  updated () {
    this.checkSignedIn()
  },
  methods: {
    checkSignedIn () {
      if (localStorage.signedIn) {
        this.$router.replace('/')
      }
    },

    // Sign-In
    signin () {
      this.$http.plain.post('/sessions', { email: this.email, password: this.password })
        .then(response => this.signinSuccesful(response))
        .catch(error => this.signinFailed(error))
    },
    signinSuccesful (response) {
      localStorage.csrf = response.data.csrf
      localStorage.signedIn = true
      this.error = ''
      this.$router.replace('/')
    },
    signinFailed (error) {
      this.error = (error.response && error.response.data && error.response.data.error) || 'Unexpected Error'
      delete localStorage.csrf
      delete localStorage.signedIn
    },

    // Sign-Up
    signup () {
      this.$http.plain.post('/registrations', { email: this.email, password: this.password, password_confirmation: this.password_confirmation })
        .then(response => this.signupSuccessful(response))
        .catch(error => this.signupFailed(error))
    },
    signupSuccessful (response) {
      localStorage.csrf = response.data.csrf
      localStorage.signedIn = true
      this.$router.replace('/generator')
    },
    signupFailed (error) {
      this.error = (error.response && error.response.data && error.response.data.error) || 'Oops...'
      delete localStorage.csrf
      delete localStorage.signedIn
    }
  }
}
</script>

<style scoped>
  .container {
    position: relative;
    width: 768px;
    height: 480px;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, .2);
    background: linear-gradient(to bottom, #bdc3c7, #2c3e50);
  }
  .container .overlay-container{
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform .4s ease-in-out;
    z-index: 100;
  }

  .container .overlay {
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    background: linear-gradient(to bottom right, #00dbde, #fc00ff);
    color: white;
    transform: translateX(0);
    transition: transform .3s ease-in-out;
  }

  .container .overlay-left {
    width: 50%;
    height: 100%;
    text-align: center;
    position: absolute;
    top: 0;
    transform: translateX(-20%);
    transition: transform .3s ease-in-out;
  }
  .container .overlay-right {
    width: 50%;
    height: 100%;
    text-align: center;
    position: absolute;
    right: 0;
    top: 0;
    transform: translateX(0);
    transition: transform .3s ease-in-out;
  }

  h2 {
    margin: 0;
  }
  p {
    margin: 20px 0 30px;
  }
  a {
    color: #222;
    text-decoration: none;
    margin: 15px 0;
    font-size: 1rem;
  }
  button{
    width: 50%;
  }

  form {
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    padding: 90px 60px;
    width: 50%;
    height: 100%;
    text-align: center;
    background: linear-gradient(to bottom, #efefef, #ccc);
    transition: all .3s ease-in-out;
  }

  .sign-in {
    left: 0;
    z-index: 2;
  }
  .sign-up {
    left: 0;
    z-index: 1;
    opacity: 0;
  }

  .sign-up-active .sign-in {
    transform: translateX(100%);
  }
  .sign-up-active .sign-up {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: show .5s;
  }
  .sign-up-active .overlay-container{
    transform: translateX(-100%);
  }
  .sign-up-active .overlay{
    transform: translateX(50%);
  }
  .sign-up-active .overlay-left {
    transform: translateX(0);
  }
  .sign-up-active .overlay-right {
    transform: translateX(20%);
  }

</style>
