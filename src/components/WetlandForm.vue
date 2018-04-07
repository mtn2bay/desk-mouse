<template>
  <v-container>
    <h1>Wetland Form</h1>
    <h3>{{form.name}}</h3>
    <v-flex xs4>
      <v-select
        label="Select"
        :items="states"
        v-model="form.states"
        multiple
        max-height="400"
        hint="Pick your favorite states"
        persistent-hint
      ></v-select>
    </v-flex>
    <v-btn color="primary" v-on:click="updateForm">Update</v-btn>
  </v-container>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'wetland-form',
  data () {
    return {
      states: [
        'Alabama', 'Alaska', 'American Samoa', 'Arizona',
        'Arkansas', 'California', 'Colorado', 'Connecticut',
        'Delaware', 'District of Columbia', 'Federated States of Micronesia',
        'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho',
        'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
        'Louisiana', 'Maine', 'Marshall Islands', 'Maryland',
        'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
        'Missouri', 'Montana', 'Nebraska', 'Nevada',
        'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
        'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio',
        'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
        'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
        'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia',
        'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
      ],
      selection: '',
      form: {}
    }
  },
  mounted () {
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
