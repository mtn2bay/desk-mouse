<template>
  <div>
    <h1>{{project.name}}</h1>
    <v-layout row>
      <v-layout column>
        <v-layout row align-baseline>
          <v-btn v-on:click="addTask()" color="green" flat icon>
            <plus-circle />
          </v-btn>
          <v-flex xs4>
            <v-text-field type="text" v-model="task" placeholder="Enter Task" :hide-details="true" />
          </v-flex>
        </v-layout>
        <v-list>
          <v-list-tile v-for="(item, index) in items" :key="item.key">
            <v-list-tile-content>
              <v-layout depressed small row align-center justify-center>
                <v-btn v-on:click="deleteTask(index)" flat icon color="deep-orange">
                  <delete-icon />
                </v-btn>
                {{item}}
              </v-layout>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-layout>
      <v-layout column>
        <v-layout row align-baseline>
          <v-btn v-on:click="addUser()" color="green" flat icon>
            <plus-circle />
          </v-btn>
          <v-flex xs4>
            <v-text-field type="email" v-model="inviteEmail" placeholder="Add User" :hide-details="true" />
          </v-flex>
        </v-layout>
      </v-layout>
    </v-layout>
  </div>
</template>

<script>
import firebase from 'firebase'
import DeleteIcon from 'vue-material-design-icons/delete.vue'
import PlusCircle from 'vue-material-design-icons/plus-circle-outline.vue'

export default {
  name: 'project',
  components: {
    DeleteIcon,
    PlusCircle
  },
  data () {
    return {
      items: [],
      task: '',
      inviteEmail: '',
      project: {}
    }
  },
  mounted () {
    this.projectId = this.$route.params.id
    this.getTasks()
    this.getProject()
  },
  methods: {
    addTask () {
      let taskId = firebase.database().ref().child('/tasks/').push().key
      let updates = {}
      updates['/tasks/' + taskId] = this.task
      updates['/projects/' + this.projectId + '/tasks/' + taskId] = this.task
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
        updates['/projects/' + this.projectId + '/members/' + this.sharedUser.id] = true
        updates['/users/' + this.sharedUser.id + '/projects/' + this.projectId] = this.project.name
        return fb.update(updates)
      })
    },
    getProject () {
      console.log(this.projectId)
      let rootRef = firebase.database().ref()
      let urlRef = rootRef.child('/projects/' + this.projectId)
      urlRef.once('value', (snapshot) => {
        this.project = snapshot.val()
      })
    },
    getTasks () {
      let rootRef = firebase.database().ref()
      let urlRef = rootRef.child('/projects/' + this.projectId + '/tasks/')
      urlRef.on('value', (snapshot) => {
        this.items = snapshot.val()
      })
    },
    deleteTask (taskId) {
      let taskRef = firebase.database().ref('/tasks/' + taskId)
      let projectRef = firebase.database().ref('/projects/' + this.projectId + '/tasks/' + taskId)
      taskRef.remove()
      projectRef.remove()
    }
  }
}
</script>

<style scoped>
</style>
