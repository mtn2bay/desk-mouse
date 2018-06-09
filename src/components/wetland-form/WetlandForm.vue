<template>
  <div>
    <v-layout row justify-space-between>
      <h1>{{form.name}}</h1>
      <v-btn outline color="primary" v-on:click="updateForm">Update</v-btn>
    </v-layout>
    <v-tabs grow icons-and-text>
      <v-tab v-for="tab in tabs" :key="tab.name">
        {{tab.name}}
        <v-icon small>{{tab.icon}}</v-icon>
      </v-tab>
      <v-tab-item v-for="tab in tabs" :key="tab.name">
        <Plot :form="form" v-if="tab.name === 'plot'">{{tab}}</Plot>
        <Hydrology :form="form" v-if="tab.name === 'hydrology'">{{tab}}</Hydrology>
        <Soils :form="form" v-if="tab.name === 'soils'">{{tab}}</Soils>
        <Vegetation :form="form" v-if="tab.name === 'vegetation'">{{tab}}</Vegetation>
        <Findings :form="form" v-if="tab.name === 'findings'">{{tab}}</Findings>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import firebase from 'firebase'
import Plot from './components/Plot'
import Hydrology from './components/Hydrology'
import Soils from './components/Soils'
import Vegetation from './components/Vegetation'
import Findings from './components/Findings'

export default {
  name: 'wetland-form',
  components: { Plot, Hydrology, Soils, Vegetation, Findings },
  data () {
    return {
      form: {},
      tabs: [
        {
          name: 'plot',
          icon: 'grid_on'
        },
        {
          name: 'hydrology',
          icon: 'fa fa-shower'
        },
        {
          name: 'vegetation',
          icon: 'fa fa-leaf'
        },
        {
          name: 'soils',
          icon: 'fa fa-magic'
        },
        {
          name: 'findings',
          icon: 'fa fa-clipboard'
        }
      ]
    }
  },
  mounted () {
    // todo: fix reload routing
    if (!this.$route.params.id) { this.$router.push({ name: 'dashboard' }) }
    this.getForm()
  },
  methods: {
    getForm () {
      this.formId = this.$route.params.id
      let rootRef = firebase.database().ref()
      let urlRef = rootRef.child('/forms/' + this.formId)
      urlRef.once('value', (snapshot) => {
        this.form = snapshot.val()
      })
    },
    updateForm () {
      console.log(this.form)
      let updates = {}
      updates['/forms/' + this.formId] = this.form
      return firebase.database().ref().update(updates)
    }
  },
  watch: {
    '$route' (to, from) {
      this.getForm()
    }
  }
}
</script>

<style scoped>
</style>
