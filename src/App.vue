<template>
  <div id="app" dark>
    <v-app id="inspire" dark>
      <v-navigation-drawer
        class="expansion-panel"
        clipped
        fixed
        v-model="drawer"
        app
        v-if="user"
        width="230"
      >
        <v-list dense>
          <v-list-tile :to="{ name: 'dashboard' }">
            <v-list-tile-action>
              <v-icon>dashboard</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Dashboard</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider class="my-2"></v-divider>
          <!--todo: allow multiples to be expanded at once-->
          <v-expansion-panel>
            <v-expansion-panel-content v-for="(project, index) in projectList"
                                       :key="project.key">
              <div slot="header" v-on:click="getForms(project, index)">
                <v-icon>folder</v-icon>
                {{ project }}
              </div>
              <v-card>
                <v-card-text>
                  <v-list>
                    <v-list-tile v-for="(form, index) in formList"
                                 :key="form.key"
                                 :to="{ name: 'wetland-form', params: { id: index, name: form.name }}">
                      <v-list-tile-action>
                        <v-icon>insert_drive_file</v-icon>
                      </v-list-tile-action>
                      <v-list-tile-content>
                        {{ form.name }}
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
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
    formList: [],
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
    },
    getForms (projectName, projectId) {
      let rootRef = firebase.database().ref()
      let urlRef = rootRef.child('/projects/' + projectId + '/forms/')
      urlRef.on('value', (snapshot) => {
        this.formList = snapshot.val() || []
      })
      this.$router.push({ name: 'project', params: { id: projectId, name: projectName } })
    }
  }
}
</script>

<style scoped>
  .expansion-panel {
    -webkit-box-shadow: none !important;
    -moz-box-shadow: none !important;
    box-shadow: none !important;
  }
  .expansion-panel__container {
    border-top: none !important;
  }
  .list__tile__action {
    min-width: 0;
    padding-right: 3px;
  }
  .card__text {
    padding: 0 0 0 16px;
  }
</style>
