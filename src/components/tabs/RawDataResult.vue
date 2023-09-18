<template>
    <div class="data-table-container">
      <VDataTable
        class= customHeader
        height="530px"
        :headers="headers"
        :items="processData"
        :fixed-header = "true"
        :hover = "true"
      >
      <template v-slot:headers="{ columns, isSorted, getSortIcon, toggleSort }">
      <tr>
        <template v-for="column in columns" :key="column.key">
          <td>
            <span class="mr-2 cursor-pointer" @click="() => toggleSort(column)">{{ column.title }}</span>
            <template v-if="isSorted(column)">
              <v-icon :icon="getSortIcon(column)"></v-icon>
            </template>
              <v-tooltip v-if="column.info" location="bottom">
                    <template v-slot:activator="{ props }">
                        <v-btn density="compact" icon="mdi-help-circle-outline" variant="text" v-bind="props"></v-btn>
                    </template>

                    <span v-html="column.info"></span>
              </v-tooltip>
          </td>
        </template>
      </tr>
    </template>
        <template v-slot:item.raw="{ item }">
          <tr>
            <td>{{ item.stationName }}
            </td>
            <td>{{ item.date }}</td>
            <td v-for="prop in existingProperties" :key="prop.param">{{ item[prop.jsonPath] }}</td>
          </tr>
        </template>
      </VDataTable>
    </div>
  </template>
  
  <script>
  import { VDataTable } from 'vuetify/labs/VDataTable'
  import "leaflet/dist/leaflet.css";
  import Papa from 'papaparse';

  
  
  export default {
    name: "RawDataResult",
    components: {
      VDataTable
    },
    data() {
      return {
        items: [
        ],
      };
    },
    computed:{
      processData() {
        
        if(this.properties.length>0 && this.stations>0){
          return this.mergeWeatherData(this.$store.getters.getRawWeather.map(el => el.result.values))
      } return undefined
      },
      properties() {
        return this.$store.getters.getRawParameters
      },
      existingProperties() {

      // List of properties available in merged data (containing a date)
        let properties = []
        for (let prop of this.$store.getters.getRawParameters) {
          const data = this.$store.getters.getRawWeather.map(el => el.result.values)
          if(data.length>0){
            if(data[0].length>0){
              if (prop.jsonPath in this.mergeWeatherData(data)[0]) {
                properties.push(prop)
              }
            }}
        }
        return properties;
      },
      headers()  {
        return [
          {title: "Station Name", key: "stationName"},
          {title: "Date", key: "date"},
          ...this.existingProperties.map((prop) => ({
            title: `${prop.param} (${prop.displayUnit})`,
            key: prop.jsonPath, info:`${prop.tooltip}`
          })),
        ]
      },
      stations() {
        return this.$store.getters.getSelectedStations.length
      }
  
    },
    methods: {
          mergeWeatherData(weatherArray) {
              const mergedData = [];
              weatherArray.forEach(weather => {
                  weather.forEach(item => {
                      if ("date" in item) {
                          const existingItem = mergedData.find(
                            mergedItem => mergedItem.date === item.date && mergedItem.stationName === item.stationName
                          );
                          if (existingItem) {
                              Object.keys(item).forEach(key => {
                                  if (key !== 'date' && key !== 'stationName' && !existingItem.hasOwnProperty(key)) {
                                      existingItem[key] = item[key];
                                  }
                              });
                          } else {
                              mergedData.push({...item});
                          }
                      }
  
                  });
              });
              return mergedData;
          },
          findStationDetail(stationName) {
            console.log(stationName)
          }
      }

    
  }
  </script>
  
  <style scoped>
  .customHeader th:hover {
  color: red;
}
  
  </style>