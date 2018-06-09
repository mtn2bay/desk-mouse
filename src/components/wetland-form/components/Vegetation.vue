<template>
  <v-container>
    <v-expansion-panel
      class="mt-3"
      v-for="(vegetation, index) in vegetationTypes"
      :key="vegetation.name">
      <v-expansion-panel-content>
        <div slot="header">{{ vegetation.name }}</div>

        <v-btn outline @click="activate(index)" color="primary" class="mb-2">Add Species</v-btn>

        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              {{ vegetation.name }}
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout>
                  <v-flex xs12>
                    <v-text-field v-model="newSpecies.name" label="Species"></v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field v-model="newSpecies.absoluteCover" label="% Cover"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="secondary" flat @click.native="close">Cancel</v-btn>
              <v-btn color="secondary" flat @click.native="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-data-table
          :headers="headers"
          :items="vegetation.species"
          hide-actions
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.absoluteCover }}</td>
            <td>
              <v-btn icon class="mx-0" @click="editItem(props.item, index)">
                <v-icon color="teal">edit</v-icon>
              </v-btn>
              <v-btn icon class="mx-0" @click="deleteItem(props.item, index)">
                <v-icon color="pink">delete</v-icon>
              </v-btn>
            </td>
          </template>
        </v-data-table>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-flex xs6>
      <v-text-field
        name="vegetation-remarks"
        label="Remarks"
        hide-details
        multi-line
      ></v-text-field>
    </v-flex>
  </v-container>
</template>

<script>
export default {
  name: 'vegetation',
  props: ['form'],
  data () {
    return {
      vegetationTypes: [
        {
          name: 'Tree Stratum',
          species: []
        },
        {
          name: 'Sapling/Shrub Stratum',
          species: []
        },
        {
          name: 'Herb Stratum',
          species: []
        },
        {
          name: 'Woody Vine Stratum',
          species: []
        }
      ],
      newSpecies: {},
      dialog: false,
      editedIndex: -1,
      headers: [
        {
          text: 'Species',
          align: 'left',
          sortable: false,
          value: 'species'
        },
        {
          text: 'Absolute Cover',
          align: 'left',
          sortable: false,
          value: 'absoluteCover'
        },
        {
          text: 'Actions',
          align: 'left',
          sortable: false,
          value: 'name'
        }
      ]
    }
  },
  methods: {
    activate (index) {
      this.dialog = true
      this.currentIndex = index
    },
    editItem (item, index) {
      this.editedIndex = this.vegetationTypes[index].species.indexOf(item)
      this.newSpecies = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item, index) {
      let deleteIndex = this.vegetationTypes[index].species.indexOf(item)
      confirm('Are you sure you want to delete this item?') &&
        this.vegetationTypes[index].species.splice(deleteIndex, 1)
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.newSpecies = {}
        this.editedIndex = -1
      }, 300)
    },
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.vegetationTypes[this.currentIndex].species[this.editedIndex], this.newSpecies)
      } else {
        this.vegetationTypes[this.currentIndex].species.push(this.newSpecies)
        this.newSpecies = {}
      }
      this.close()
    }
  }
}
</script>
