<template>
  <div>
    <v-layout row justify-space-between>
      <h1>Dashboard</h1>
      <v-btn depressed small v-on:click="logout">Logout</v-btn>
    </v-layout>
    <v-layout row align-baseline>
      <v-btn v-on:click="addProject()" color="green" flat icon>
        <plus-circle />
      </v-btn>
      <v-flex xs4>
        <v-text-field type="text" v-model="project.name" placeholder="Project Name..." :hide-details="true" />
      </v-flex>
    </v-layout>
    <v-list>
      <v-list-tile v-for="(project, index) in projectList" :key="project.key">
        <v-list-tile-content>
          <v-layout depressed small row align-center justify-center>
            <router-link :to="{ name: 'Project', params: { id: index }}">
              <v-btn flat icon color="blue">
                <chevron-right />
              </v-btn>
            </router-link>
            {{project}}
          </v-layout>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
import firebase from 'firebase'
import PlusCircle from 'vue-material-design-icons/plus-circle-outline.vue'
import ChevronRight from 'vue-material-design-icons/chevron-right.vue'

export default {
  name: 'dashboard',
  components: {
    PlusCircle,
    ChevronRight
  },
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
    this.userId = firebase.auth().currentUser.uid
    this.getProjects()
  },
  methods: {
    logout () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    addProject () {
      this.project.members[this.userId] = true
      console.log(this.project)
      let projectId = firebase.database().ref().child('/projects/').push().key
      let updates = {}
      updates['/projects/' + projectId] = this.project
      updates['/users/' + this.userId + '/projects/' + projectId] = this.project.name
      return firebase.database().ref().update(updates)
    },
    getProjects () {
      let rootRef = firebase.database().ref()
      let urlRef = rootRef.child('/users/' + this.userId + '/projects/')
      urlRef.on('value', (snapshot) => {
        this.projectList = snapshot.val()
      })
    }
  }
}
</script>

<style scoped>
</style>
