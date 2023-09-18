<template>
  <div v-show="show" class="container" v-for="(parameter, i) in parameters" :key="i">
    <div class="text-subtitle-2 font-weight-bold" >{{ parameter.title }}</div>
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel v-for="subParameter in parameter.items" :key="subParameter.title">
        <v-expansion-panel-title disable-icon-rotate>
          {{ subParameter.title }}
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <MeteorologicalParameterItem
            v-for="item in subParameter.items"
            :key="item.param"
            :title="item.title"
            :tooltip="item.tooltip"
            :type="item.type"
            :param="item.param"
            :request="item.request"
            :json-path="item.jsonPath"
            :available-chart="item.availableChart"
            :displayUnit="item.displayUnit"
            :axisLegend="item.axisLegend"
            :related="item.related"
          ></MeteorologicalParameterItem>
          <SliderParameter
            v-if="subParameter.title === 'Heat'"
            label="Base Temperature"
            :minValue="0"
            :maxValue="10"
            :stepValue="1"
            :value="baseTemp"
            @input="updateBaseTemp"
          ></SliderParameter>
          <SliderParameter
            v-if="subParameter.title === 'Freezing cold'"
            label="Cold Threshold"
            :minValue="-10"
            :maxValue="10"
            :stepValue="1"
            :value="coldMin"
            @input="updateColdMin"
          ></SliderParameter>
          <SliderParameter
            v-if="subParameter.title === 'Freezing cold'"
            label="Cold Spell Duration"
            :minValue="0"
            :maxValue="50"
            :stepValue="1"
            :value="spellFrost"
            @input="updateSpellFrost"
          ></SliderParameter>
          <RangeSlider
            v-if="subParameter.title === 'Freezing cold'"
            label="Temperature"
            :min="0"
            :max="40"
            :stepValue="1"
            :maxValue="maxTemp"
            :minValue="minTemp"
            @input_max="updateMaxTemp"
            @input_min="updateMinTemp"
          ></RangeSlider>
          <SliderParameter
            v-if="subParameter.title === 'Heat'"
            label="Heat Threshold"
            :minValue="20"
            :maxValue="40"
            :stepValue="1"
            :value="heat"
            @input="updateHeat"
          ></SliderParameter>
          <SliderParameter
            v-if="subParameter.title === 'Heat'"
            label="Heat Spell Duration"
            :minValue="0"
            :maxValue="50"
            :stepValue="1"
            :value="spellHeat"
            @input="updateSpellHeat"
          ></SliderParameter>
          <SliderParameter
            v-if="subParameter.title === 'Humidity Conditions'"
            label="Min humidity"
            :minValue="0"
            :maxValue="100"
            :stepValue="1"
            :value="minHum"
            @input="updateMinHum"
          ></SliderParameter>
          <SliderParameter
            v-if="subParameter.title === 'Humidity Conditions'"
            label="Max humidity"
            :minValue="0"
            :maxValue="100"
            :stepValue="1"
            :value="maxHum"
            @input="updateMaxHum"
          ></SliderParameter>
          <SliderParameter
            v-if="subParameter.title === 'Humidity Conditions'"
            label="Humidity Spell Duration"
            :minValue="0"
            :maxValue="50"
            :stepValue="1"
            :value="spellHum"
            @input="updateSpellHum"
          ></SliderParameter>
          <SliderParameter
            v-if="subParameter.title === 'Water Deficit'"
            label="Rain level"
            :minValue="0"
            :maxValue="30"
            :stepValue="1"
            :value="rainLevel"
            @input="updateRainLevel"
          ></SliderParameter>
          <SliderParameter
            v-if="subParameter.title === 'Water Deficit'"
            label="Deficit threshold"
            :minValue="0"
            :maxValue="10"
            :stepValue="1"
            :value="deficitLevel"
            @input="updateDeficitLevel"
          ></SliderParameter>
          <SliderParameter
            v-if="subParameter.title === 'Water Deficit'"
            label="Drought Duration"
            :minValue="0"
            :maxValue="50"
            :stepValue="1"
            :value="droughtWave"
            @input="updateDroughtWave"
          ></SliderParameter>
          <SliderParameter
            v-if="subParameter.title === 'Wind days'"
            label="Wind Threshold (m/s)"
            :minValue="0"
            :maxValue="50"
            :stepValue="1"
            :value="windSpeed"
            @input="updateWindSpeed"
          ></SliderParameter>


        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>


<script>
import MeteorologicalParameterItem from "@/components/sideBar/MeteorologicalParameterItem.vue";
import SliderParameter from "@/components/sideBar/SliderParameter.vue";
import RangeSlider from "@/components/sideBar/RangeSlider.vue";
import { metricsConfig } from "@/config/metricsConfig";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "MeteorologicalParameter",
  components: {
    MeteorologicalParameterItem,
    SliderParameter,
    RangeSlider
  },
  data() {
    return {
      parameters: metricsConfig,
      panel: [0, 1, 2, 3, 4],
    };
  },
  props:{
    show:Boolean,
  },
  computed: {
    
    ...mapGetters(["getBaseTemp"]),
    baseTemp: {
      get() {
        return this.getBaseTemp;
      },
      set(value) {
        this.setBaseTemp(value);
      },
    },
    ...mapGetters(["getColdMin"]),
    coldMin: {
      get() {
        return this.getColdMin;
      },
      set(value) {
        this.setColdMin(value);
      }
    },
    ...mapGetters(["getHeat"]),
    heat: {
      get() {
        return this.getHeat;
      },
      set(value) {
        this.setHeat(value);
      }
    },
    ...mapGetters(["getMinTemp"]),
    minTemp: {
      get() {
        return this.getMinTemp;
      },
      set(value) {
        this.setMinTemp(value)
      }
    },
    ...mapGetters(["getMaxTemp"]),
    maxTemp: {
      get() {
        return this.getMaxTemp;
      },
      set(value) {
        this.setMaxTemp(value)
      }
    },
    ...mapGetters(["getMinHum"]),
    minHum: {
      get() {
        return this.getMinHum
      },
      set(value) {
        this.setMinHum(value)
      }
    },
    ...mapGetters(["getMaxHum"]),
    maxHum: {
      get() {
        return this.getMaxHum;
      },
      set(value) {
        this.setMaxHum(value)
      }
    },
    ...mapGetters(["getRainLevel"]),
    rainLevel: {
      get() {
        return this.getRainLevel;
      },
      set(value) {
        this.setRainLevel(value)
      }
    },
    ...mapGetters(["getDeficitLevel"]),
    deficitLevel: {
      get() {
        return this.getDeficitLevel;
      },
      set(value) {
        this.setDeficitLevel(value)
      }
    },
    ...mapGetters(["getSpellFrost"]),
    spellFrost: {
      get() {
        return this.getSpellFrost;
      },
      set(value) {
        this.setSpellFrost(value)
      }
    },
    ...mapGetters(["getSpellHeat"]),
    spellHeat: {
      get() {
        return this.getSpellHeat;
      },
      set(value) {
        this.setSpellHeat(value)
      }
    },
    ...mapGetters(["getSpellHum"]),
    spellHum: {
      get() {
        return this.getSpellHum;
      },
      set(value) {
        this.setSpellHum(value)
      }
    },
    ...mapGetters(["getDroughtWave"]),
    droughtWave: {
      get() {
        return this.getDroughtWave;
      },
      set(value) {
        this.setDroughtWave(value)
      }
    },
    ...mapGetters(["getWindSpeed"]),
    windSpeed: {
      get() {
        return this.getWindSpeed;
      },
      set(value) {
        this.setWindSpeed(value)
      }
    }
  },
  methods: {
    ...mapActions(["setBaseTemp"]),
    updateBaseTemp(newValue) {
      // Update the baseTemp value using the setBaseTemp action
      this.setBaseTemp(newValue);
    },
    ...mapActions(["setColdMin"]),
    updateColdMin(newValue) {
      this.setColdMin(newValue);
    },
    ...mapActions(["setHeat"]),
    updateHeat(newValue) {
      this.setHeat(newValue);
    },
    ...mapActions(["setMinTemp"]),
    updateMinTemp(newValue) {
      this.setMinTemp(newValue)
    },
    ...mapActions(["setMaxTemp"]),
    updateMaxTemp(newValue) {
      this.setMaxTemp(newValue)
    },
    ...mapActions(["setMinHum"]),
    updateMinHum(newValue) {
      this.setMinHum(newValue)
    },
    ...mapActions(["setMaxHum"]),
    updateMaxHum(newValue) {
      this.setMaxHum(newValue)
    },
    ...mapActions(["setRainLevel"]),
    updateRainLevel(newValue) {
      this.setRainLevel(newValue)
    },
    ...mapActions(["setDeficitLevel"]),
    updateDeficitLevel(newValue) {
      this.setDeficitLevel(newValue)
    },
    ...mapActions(["setSpellFrost"]),
    updateSpellFrost(newValue) {
      this.setSpellFrost(newValue)
    },
    ...mapActions(["setSpellHeat"]),
    updateSpellHeat(newValue) {
      this.setSpellHeat(newValue)
    },
    ...mapActions(["setSpellHum"]),
    updateSpellHum(newValue) {
      this.setSpellHum(newValue)
    },
    ...mapActions(["setDroughtWave"]),
    updateDroughtWave(newValue) {
      this.setDroughtWave(newValue)
    },
    ...mapActions(["setWindSpeed"]),
    updateWindSpeed(newValue) {
      this.setWindSpeed(newValue)
    }
  },
};
</script>

<style scoped>

</style>






