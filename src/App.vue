<template>
  <div id="app" dark>
    <v-app id="inspire" dark>
      <v-navigation-drawer
        clipped
        fixed
        v-model="drawer"
        app
        v-if="user"
      >
        <v-list dense>
          <v-list-tile :to="{ path: 'dashboard' }">
            <v-list-tile-action>
              <v-icon>dashboard</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Dashboard</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider class="my-3"></v-divider>
          <v-list-tile v-for="(project, index) in projectList"
                       :key="project.key"
                       :to="{ name: 'task', params: { id: index }}">
            <v-list-tile-action>
              <v-icon>insert_drive_file</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ project }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar app fixed clipped-left v-if="user">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>fieldMouse</v-toolbar-title>
        <v-spacer></v-spacer>
        <span v-if="user">{{ user.email }}</span>
        <v-btn depressed small v-on:click="logout">Logout</v-btn>
      </v-toolbar>
      <v-content>
        <router-view/>
      </v-content>
      <v-footer app fixed>
        <span>&copy; 2018</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'App',
  data: () => ({
    drawer: true,
    projectList: [],
    user: ''
  }),
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
    getProjects () {
      let rootRef = firebase.database().ref()
      let urlRef = rootRef.child('/users/' + this.user.uid + '/projects/')
      urlRef.on('value', (snapshot) => {
        this.projectList = snapshot.val()
      })
    }
  }
}
</script>

<style>
</style>
