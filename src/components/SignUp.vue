<template>
  <div class="sign-up">
    <h3>Let's create a new acccount!</h3>
    <input type="text" v-model="email" placeholder="Email" /><br>
    <input type="password" v-model="password" placeholder="Password"/><br>
    <button v-on:click="signUp">Sign Up</button>
    <span>or go back to <router-link to="/login">login</router-link>.</span>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'signUp',
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signUp: function () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          let userId = firebase.auth().currentUser.uid
          let updates = {}
          updates['/users/' + userId] = {email: this.email, id: userId}
          return firebase.database().ref().update(updates)
        },
        (err) => {
          alert('Oops. ' + err.message)
        }
      ).then(() => {
        this.$router.replace('dashboard')
      })
    }
  }
}
</script>

<style scoped>
  .sign-up {
    margin-top: 40px;
  }
  input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
  }
  button {
    margin-top: 10px;
    width: 10%;
    cursor: pointer;
  }
  span {
    display: block;
    margin-top: 20px;
    font-size: 11px;
  }
</style>
