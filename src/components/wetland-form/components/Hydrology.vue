<template>
  <v-container>
    <v-expansion-panel>
      <v-expansion-panel-content>
        <div slot="header">Primary Indicators</div>
        <v-layout class="pa-3" row wrap="true">
          <v-flex xs4 v-for="indicator in indicators" :key="indicator.label">
            <v-checkbox :label="indicator.label" v-model="form.indicator"></v-checkbox>
          </v-flex>
        </v-layout>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel class="mt-3">
      <v-expansion-panel-content>
        <div slot="header">Secondary Indicators</div>
        <v-layout class="pa-3" row wrap="true">
          <v-flex xs4 v-for="indicator in secondaryIndicators" :key="indicator.label">
            <v-checkbox :label="indicator.label" v-model="form.indicator"></v-checkbox>
          </v-flex>
        </v-layout>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-layout class="mt-4" row>
      <v-flex xs2>
        <v-checkbox
          class="pt-3"
          label="Surface Water"
          v-model="form.surfaceWater"
          hide-details>
        </v-checkbox>
      </v-flex>

      <v-flex xs1>
        <v-text-field
          name="surface-water-depth"
          label="Depth"
          hide-details>
        </v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs2>
        <v-checkbox
          class="pt-3"
          label="Water Table"
          v-model="form.waterTable"
          hide-details>
        </v-checkbox>
      </v-flex>

      <v-flex xs1>
        <v-text-field
          name="water-table-depth"
          label="Depth"
          hide-details
        ></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs2>
        <v-checkbox
          class="pt-3"
          label="Saturation"
          v-model="form.saturation"
          hide-details>
        </v-checkbox>
      </v-flex>

      <v-flex xs1>
        <v-text-field
          name="saturation-depth"
          label="Depth"
          hide-details
        ></v-text-field>
      </v-flex>
    </v-layout>

    <v-flex xs4 class="mt-5">
      <v-checkbox
        label="Wetland Hydrology"
        v-model="form.wetlandHydrology"
        hide-details>
      </v-checkbox>
    </v-flex>

    <v-flex xs6 class="mt-4">
      <v-text-field
        name="recorded-data"
        label="Describe Recorded Data"
        hide-details
      ></v-text-field>
    </v-flex>

    <v-flex xs6>
      <v-text-field
        name="hydrology-remarks"
        label="Remarks"
        hide-details
        multi-line
      ></v-text-field>
    </v-flex>
  </v-container>
</template>

<script>
// import firebase from 'firebase'

export default {
  name: 'hydrology',
  props: ['form'],
  data () {
    return {
      indicators: [
        {
          label: 'Surface Water',
          ref: 'A1'
        },
        {
          label: 'High Water Table',
          ref: 'A2'
        },
        {
          label: 'Saturation',
          ref: 'A3'
        },
        {
          label: 'Water Marks',
          ref: 'B1'
        },
        {
          label: 'Sediment Deposits',
          ref: 'B2'
        },
        {
          label: 'Drift Deposits',
          ref: 'B3'
        },
        {
          label: 'Algal Mat or Crust',
          ref: 'B4'
        },
        {
          label: 'Iron Deposits',
          ref: 'B5'
        },
        {
          label: 'Inundation Visible on Aerial Imagery',
          ref: 'B7'
        },
        {
          label: 'Sparsely Vegetate Concave Surface',
          ref: 'B8'
        },
        {
          label: 'Water-Stained Leaves',
          ref: 'B9'
        },
        {
          label: 'Aquatic Fauna',
          ref: 'B13'
        },
        {
          label: 'Marl Deposits',
          ref: 'B15'
        },
        {
          label: 'Hydrogen Sulfide Odor',
          ref: 'C1'
        },
        {
          label: 'Oxidized Rhizospheres on Living Roots',
          ref: 'C3'
        },
        {
          label: 'Presence of Reduced Iron',
          ref: 'C4'
        },
        {
          label: 'Recent Iron Reduction in Tilled Soils',
          ref: 'C6'
        },
        {
          label: 'Thin Muck Surface',
          ref: 'C7'
        },
        {
          label: 'Other (Explain in Remarks)',
          ref: ''
        }
      ],
      secondaryIndicators: [
        {
          label: 'Surface Soil Cracks',
          ref: 'B6'
        },
        {
          label: 'Drainage Patterns',
          ref: 'B10'
        },
        {
          label: 'Moss Trim Lines',
          ref: 'B16'
        },
        {
          label: 'Dry-Season Water Table',
          ref: 'C2'
        },
        {
          label: 'Crayfish Burrows',
          ref: 'C8'
        },
        {
          label: 'Saturation Visible on Aerial Imagery',
          ref: 'C9'
        },
        {
          label: 'Stunted or Stressed Plants',
          ref: 'D1'
        },
        {
          label: 'Geomorphic Position',
          ref: 'D2'
        },
        {
          label: 'Shallow Aquitard',
          ref: 'D3'
        },
        {
          label: 'Microtopographic Relief',
          ref: 'D4'
        },
        {
          label: 'FAC-Neutral Test',
          ref: 'D5'
        }
      ]
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
