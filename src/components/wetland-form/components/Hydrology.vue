<template>
  <v-container>
    Hydrology
    <v-layout row>
      <v-flex class="ma-2" xs4>
        <v-select
          label="Primary Indicators"
          :items="indicatorList"
          item-text="label"
          v-model="form.primaryIndicators"
          multiple
          chips
        ></v-select>
      </v-flex>
    </v-layout>
    <v-layout row wrap="true">
      <v-flex xs4 v-for="indicator in indicatorList" :key="indicator.label">
        <v-checkbox :label="indicator.label" v-model="form.indicator"></v-checkbox>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// import firebase from 'firebase'

export default {
  name: 'hydrology',
  props: ['form'],
  data () {
    return {
      indicatorList: [
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
