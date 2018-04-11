<template>
  <v-container>
    <h1>Dashboard</h1>
    <v-layout row align-baseline>
      <v-btn v-on:click="addProject()" color="secondary" flat icon>
        <v-icon dark>add_circle_outline</v-icon>
      </v-btn>
      <v-flex xs4>
        <v-text-field type="text" v-model="project.name" placeholder="Project Name..." :hide-details="true" />
      </v-flex>
    </v-layout>
    <v-list>
      <v-list-tile v-for="(project, index) in projectList"
                   :key="project.key">
        <v-list-tile-content>
          <v-layout depressed small row align-center justify-center>
            <v-btn :to="{ name: 'project', params: { id: index, name: project }}" flat icon color="blue">
              <v-icon>chevron_right</v-icon>
            </v-btn>
            {{project}}
            <v-btn v-on:click="deleteProject(index)" flat icon color="deep-orange">
              <v-icon>delete</v-icon>
            </v-btn>
          </v-layout>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-container>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'dashboard',
  data () {
    return {
      projectList: [],
      project: {
        name: '',
        members: {},
        forms: []
      }
    }
  },
  mounted () {
    this.user = firebase.auth().currentUser
    this.getProjects()
  },
  methods: {
    logout () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    addProject () {
      this.project.members[this.user.uid] = this.user.email
      let projectId = firebase.database().ref().child('/projects/').push().key
      let updates = {}
      updates['/projects/' + projectId] = this.project
      updates['/users/' + this.user.uid + '/projects/' + projectId] = this.project.name
      return firebase.database().ref().update(updates)
    },
    getProjects () {
      let rootRef = firebase.database().ref()
      let urlRef = rootRef.child('/users/' + this.user.uid + '/projects/')
      urlRef.on('value', (snapshot) => {
        this.projectList = snapshot.val()
      })
    },
    deleteProject (projectId) {
      let taskRef = firebase.database().ref('/projects/' + projectId)
      let projectRef = firebase.database().ref('/users/' + this.user.uid + '/projects/' + projectId)
      taskRef.remove()
      projectRef.remove()
    }
  }
}
</script>

<style scoped>
</style>
