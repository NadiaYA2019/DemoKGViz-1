<template>
  <VDataTable
    height=530px
    :headers="headers"
    :items="mergedData"
    fixed-header = true  
    hover = true
    >
    <template v-slot:item.raw=" {item} ">
      <tr>
        <td>{{ item.stationName }}</td>
        <td v-for="prop in existingProperties" :key="prop.param">{{ item[prop.jsonPath] }}</td>
      </tr>
    </template>
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
  </VDataTable>
</template>

  
  <script>
  import "leaflet/dist/leaflet.css";
  import { VDataTable } from 'vuetify/labs/VDataTable'

  
  export default {
    name: "TableChart",
    components:{
      VDataTable
    },
    computed: {
      mergedData() {
        const weatherArray = this.$store.getters.getWeather.map(el => el.result.values);
        const mergedData = [];
        weatherArray.forEach(weather => {
          weather.forEach(item => {
            const existingItem = mergedData.find(mergedItem => mergedItem.stationName === item.stationName);
            if (existingItem) {
              Object.keys(item).forEach(key => {
                if (key !== 'date' && key !== 'stationName' && !existingItem.hasOwnProperty(key)) {
                  existingItem[key] = item[key];
                }
              });
            } else {
              mergedData.push({ ...item });
            }
          });
        });
        return mergedData;
      },
      headers()  {
        return [
          {title: "Station Name", key: "stationName"},
          ...this.$store.getters.getDatesParameters.map((prop) => ({
            title: `${prop.param} (${prop.displayUnit})`,
            key: prop.jsonPath, info: prop.tooltip
          })),
        ]
      },
    }
  };
  </script>

  <style scoped>

    </style>
  