<template>
  <v-container>
    <v-layout row>
      <h1>{{project.name}}</h1>
    </v-layout>
    <v-layout row>
      <v-layout column class="ma-2">
        <v-layout row align-baseline>
          <v-btn v-on:click="addForm()" color="primary" flat icon>
            <v-icon dark>add_circle_outline</v-icon>
          </v-btn>
          <v-flex xs4>
            <v-text-field type="text" v-model="form.name" placeholder="Enter Name" :hide-details="true" />
          </v-flex>
        </v-layout>
        <v-list>
          <v-list-tile v-for="(form, index) in formList" :key="form.key">
            <v-list-tile-content>
              <v-layout depressed small row align-center justify-center>
                <v-btn v-on:click="deleteForm(index)" flat icon color="error">
                  <v-icon>delete</v-icon>
                </v-btn>
                <v-btn :to="{ name: 'wetland-form', params: { id: index, name: form }}" flat icon color="secondary">
                  <v-icon>chevron_right</v-icon>
                </v-btn>
                {{form.name}}
              </v-layout>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-layout>
      <v-layout column class="ma-2">
        <v-layout row align-baseline>
          <v-btn v-on:click="addUser()" color="primary" flat icon>
            <v-icon dark>add_circle_outline</v-icon>
          </v-btn>
          <v-flex xs4>
            <v-text-field type="email" v-model="inviteEmail" placeholder="Add User" :hide-details="true" />
          </v-flex>
        </v-layout>
        <v-list>
          <v-list-tile v-for="(member, index) in members" :key="member.key">
            <v-list-tile-content>
              <v-layout depressed small row align-center justify-center>
                <v-btn v-on:click="deleteForm(index)" flat icon color="error">
                  <v-icon>delete</v-icon>
                </v-btn>
                {{member}}
              </v-layout>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'project',
  data () {
    return {
      formList: [],
      form: {
        name: '',
        data: {}
      },
      inviteEmail: '',
      project: {},
      members: {}
    }
  },
  mounted () {
    // todo: fix reload routing
    if (!this.$route.params.id) { this.$router.push({ name: 'dashboard' }) }
    this.projectId = this.$route.params.id
    this.getForms()
    this.getProject()
    this.getMembers()
  },
  methods: {
    addForm () {
      let formId = firebase.database().ref().child('/forms/').push().key
      let updates = {}
      updates['/forms/' + formId] = this.form
      updates['/projects/' + this.projectId + '/forms/' + formId] = this.form
      return firebase.database().ref().update(updates)
    },
    addUser () {
      let fb = firebase.database().ref()

      fb.child('users').orderByChild('email').equalTo(this.inviteEmail).once('value', (snap) => {
        for (let user in snap.val()) {
          if (snap.child(user).val().email === this.inviteEmail) {
            this.sharedUser = snap.child(user).val()
          }
        }
        let updates = {}
        updates['/projects/' + this.projectId + '/members/' + this.sharedUser.id] = this.sharedUser.email
        updates['/users/' + this.sharedUser.id + '/projects/' + this.projectId] = this.project.name
        return fb.update(updates)
      })
    },
    getProject () {
      let rootRef = firebase.database().ref()
      let urlRef = rootRef.child('/projects/' + this.projectId)
      urlRef.once('value', (snapshot) => {
        this.project = snapshot.val()
      })
    },
    getMembers () {
      let rootRef = firebase.database().ref()
      let urlRef = rootRef.child('/projects/' + this.projectId + '/members/')
      urlRef.once('value', (snapshot) => {
        this.members = snapshot.val()
      })
    },
    getForms () {
      let rootRef = firebase.database().ref()
      let urlRef = rootRef.child('/projects/' + this.projectId + '/forms/')
      urlRef.on('value', (snapshot) => {
        this.formList = snapshot.val()
      })
    },
    deleteForm (formId) {
      let formRef = firebase.database().ref('/forms/' + formId)
      let projectRef = firebase.database().ref('/projects/' + this.projectId + '/forms/' + formId)
      formRef.remove()
      projectRef.remove()
    }
  },
  watch: {
    '$route' (to, from) {
      this.projectId = this.$route.params.id
      this.getForms()
      this.getProject()
      this.getMembers()
    }
  }
}
</script>

<style scoped>
</style>
