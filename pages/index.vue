<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-form>
            <v-row>
              <v-col cols="12" md="4">
                <v-select
                  v-model="currentYear"
                  :items="getYears"
                  label="Year"
                  outlined
                ></v-select
              ></v-col>
              <v-col cols="12" md="4">
                <v-select
                  v-model="currentMake"
                  :items="getMakes"
                  label="Make"
                  outlined
                ></v-select
              ></v-col>
              <v-col cols="12" md="4">
                <v-select
                  v-model="currentModel"
                  :items="getModels"
                  label="Model"
                  outlined
                ></v-select
              ></v-col>
            </v-row>
            <h5 class="text--h6">Car not listed? Manually enter tank size:</h5>
            <v-text-field
              v-model="tankSize"
              label="Gas Tank Size"
              hint="Gallons"
              placeholder="22"
              outlined
            ></v-text-field>

            <v-slider
              v-model="tankLevel"
              :tick-labels="tankTicksLabels"
              :max="8"
              step="1"
              ticks="always"
            ></v-slider>
            <h4>How many prices to compare?</h4>
            <v-slider
              v-model="stations"
              :tick-labels="stationTickLabels"
              :max="3"
              step="1"
              ticks="always"
            ></v-slider>
            <v-row>
              <v-col v-for="(s, idx) in numberOfStations" :key="idx">
                <h4>Station {{ stationsArr[idx] }}</h4>

                <v-text-field
                  v-model="priceModels[idx]"
                  label="Price Per Gallon"
                  placeholder="2.99"
                  outlined
                ></v-text-field>

                <h4 class="text--h6">Price to Fill Up:</h4>
                <v-banner outlined>{{
                  calculatedPrice(tankSize, currentTank, priceModels[idx])
                }}</v-banner>

                <h4 class="text--h6">Price Rounded Up:</h4>
                <v-banner outlined
                  >{{
                    Math.ceil(
                      calculatedPrice(tankSize, currentTank, priceModels[idx])
                    )
                  }}.00</v-banner
                >
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      tankSize: 0,
      // tankLevel: 0,
      tankTicksLabels: [
        'E',
        '1/8',
        '1/4',
        '3/8',
        '1/2',
        '5/8',
        '3/4',
        '7/8',
        'F',
      ],
      tankArr: [1, 0.875, 0.75, 0.625, 0.5, 0.375, 0.25, 0.125, 0],
      stations: 0,
      stationTickLabels: [1, 2, 3, 4],
      stationsArr: [1, 2, 3, 4],
      priceModels: [0, 0, 0, 0],
    }
  },
  computed: {
    ...mapState([
      'carList',
      'storeTankLevel',
      'selectedYear',
      'selectedMake',
      'selectedModel',
    ]),
    ...mapGetters(['getYears', 'getMakes', 'getModels', 'getGasTank']),
    numberOfStations() {
      return this.stationsArr[this.stations]
    },
    currentTank() {
      return this.tankArr[this.storeTankLevel]
    },
    currentYear: {
      get() {
        return this.selectedYear
      },
      set(v) {
        this.setSelectedYear(v)
      },
    },
    currentMake: {
      get() {
        return this.selectedMake
      },
      set(v) {
        this.setSelectedMake(v)
      },
    },
    currentModel: {
      get() {
        return this.selectedMake
      },
      set(v) {
        this.setSelectedModel(v)
      },
    },
    tankLevel: {
      get() {
        return this.storeTankLevel
      },
      set(v) {
        this.setTankLevel(v)
      },
    },
  },
  watch: {
    getGasTank(v) {
      // this.getGasTank
      this.tankSize = v
    },
  },

  methods: {
    ...mapActions([
      'loadCarList',
      'setTankLevel',
      'setSelectedMake',
      'setSelectedModel',
      'setSelectedYear',
    ]),
    calculatedPrice(tankSize, currenttank, price) {
      return (tankSize * currenttank * price).toFixed(2)
    },
  },
  mounted() {
    this.loadCarList()
    console.log('>> ', this.carList)
  },
}
</script>
