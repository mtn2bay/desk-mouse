<template>
  <v-container>

    <!--ROW 1-->
    <v-layout row>
      <v-flex class="ma-2" xs3>
        <v-text-field
          name="project"
          label="Project/Site"
        ></v-text-field>
      </v-flex>
      <v-flex class="ma-2" xs2>
        <v-menu
          ref="menu"
          lazy
          :close-on-content-click="false"
          v-model="menu"
          transition="scale-transition"
          offset-y
          full-width
          :nudge-right="40"
          min-width="290px"
          :return-value.sync="date"
        >
          <v-text-field
            slot="activator"
            label="Sample Date"
            v-model="date"
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker v-model="date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-flex>
    </v-layout>

    <!--ROW 1-->
    <v-layout row>
      <v-flex class="ma-2" xs3>
        <v-text-field
          name="city"
          label="City/County"
        ></v-text-field>
      </v-flex>
      <v-flex class="ma-2" xs2>
        <v-select
          label="State"
          :items="states"
          v-model="form.state"
          max-height="400"
        ></v-select>
      </v-flex>
    </v-layout>

    <!--ROW 2-->
    <v-layout row>
      <v-flex class="ma-2" xs3>
        <v-text-field
          name="applicant"
          label="Applicant/Owner"
        ></v-text-field>
      </v-flex>
      <v-flex class="ma-2" xs3>
        <v-text-field
          name="investigators"
          label="Investigators"
        ></v-text-field>
      </v-flex>
    </v-layout>

    <!--ROW 4-->
    <v-layout row>
      <v-flex class="ma-2" xs3>
        <v-text-field
          name="section"
          label="Section, Township, Range"
        ></v-text-field>
      </v-flex>
      <v-flex class="ma-2" xs3>
        <v-select
          label="Subregion"
          :items="subregions"
          v-model="form.subregion"
          multiple
          max-height="400"
        ></v-select>
      </v-flex>
      <v-flex class="ma-2" xs2>
        <v-text-field
          name="lat"
          label="Lat"
        ></v-text-field>
      </v-flex>
      <v-flex class="ma-2" xs2>
        <v-text-field
          name="long"
          label="Long"
        ></v-text-field>
      </v-flex>
    </v-layout>

    <v-divider class="my-4"></v-divider>

    <!--ROW 3-->
    <v-layout row>
      <v-flex class="ma-2" xs2>
        <v-select
          label="Sampling Point"
          :items="samplingPoints"
          v-model="form.samplingPoint"
          max-height="400"
        ></v-select>
      </v-flex>
      <v-flex class="ma-2" xs3>
        <v-select
          label="Landform"
          :items="landforms"
          v-model="form.landform"
          multiple
          max-height="400"
        ></v-select>
      </v-flex>
      <v-flex class="ma-2" xs3>
        <v-select
          label="Local Relief"
          :items="reliefs"
          v-model="form.relief"
          multiple
          max-height="400"
        ></v-select>
      </v-flex>
      <v-flex class="ma-2" xs2>
        <v-text-field
          name="slope"
          label="Slope"
        ></v-text-field>
      </v-flex>
    </v-layout>

    <!--ROW 5-->
    <v-layout row>
      <v-flex class="ma-2" xs2>
        <v-select
          label="Datum"
          :items="listItems"
          v-model="form.datum"
          multiple
          max-height="400"
        ></v-select>
      </v-flex>
      <v-flex class="ma-2" xs3>
        <v-text-field
          name="soil-map"
          label="Soil Map Unit Name"
        ></v-text-field>
      </v-flex>
      <v-flex class="ma-2" xs3>
        <v-text-field
          name="nwi"
          label="NWI Classification"
        ></v-text-field>
      </v-flex>
    </v-layout>

    <!--ROW 6-->
    <v-layout row>
      <v-flex class="ma-2" xs4>
        <v-select
          label="Significantly Disturbed"
          :items="typeList"
          v-model="form.disturbed"
          multiple
          chips
        ></v-select>
      </v-flex>
      <v-flex class="ma-2" xs4>
        <v-select
          label="Naturally Problematic"
          :items="typeList"
          v-model="form.problematic"
          multiple
          chips
        ></v-select>
      </v-flex>
    </v-layout>

    <!--ROW 7-->
    <v-layout row>
      <v-flex class="ma-2" xs4>
        <v-checkbox label="Climatic/Hydrolic Conditions" v-model="form.climaticHydrolic"></v-checkbox>
      </v-flex>
      <v-flex class="ma-2" xs4>
        <v-checkbox label="Normal Circumstances" v-model="form.circumstances"></v-checkbox>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import firebase from 'firebase'

export default {
  name: 'plot',
  props: ['form'],
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
      landforms: [
        'Hillslope', 'Terrace'
      ],
      reliefs: [
        'Concave', 'Convex', 'None'
      ],
      subregions: [
        'LRR', 'MLRA'
      ],
      listItems: [
        'Item 1', 'Item2', 'Item 3'
      ],
      typeList: [
        'Vegetation', 'Soil', 'Hydrology'
      ],
      samplingPoints: [
        'Upland', 'Wetland'
      ],
      date: null,
      menu: false,
      modal: false
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style scoped>
  v-flex {
    margin: 10px;
  }
</style>
