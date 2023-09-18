 
<template>
    <div v-if="getStationsLength === 0 || getStationsParameters === 0">
        <v-alert type="info" title="Information" text="Please select at least one station and one parameter to show any chart."
            variant="tonal"></v-alert>
    </div>
    <div id="visualisation">
        <div class="groupVisualisation">
            <ComboChart v-if="getWeather.length > 0" :chartData="getWeather"></ComboChart>
            <BarChart v-if="getWeatherNbDay.length >0" :chartData="getWeatherNbDay"></BarChart>
        </div>
    </div>
    <div v-if="show" class="button">
        <v-btn class="export"  > <img class="export" src="../../img/csv_logo.png" @click="this.downloadData('text/csv', 'csv')"> </v-btn>
        <v-btn class="export"> <img class="export" src="../../img/json_logo.png" @click="this.downloadData('application/sparql-results+json', 'json')" alt="JSON export"> </v-btn>
    </div>
    <div v-if="show" class="button">
        <v-btn @click=display> {{text}} </v-btn>
    </div>
    <div v-show = "showed">
        <TableChart></TableChart>
    </div>
</template>

<script>
import ComboChart from "@/components/tabs/charts/ComboChart.vue";
import BarChart from "@/components/tabs/charts/BarChart.vue";
import {getGlobal,downloadGlobal} from '@/utils/dataGatherer'
import TableChart from "@/components/tabs/TableChart.vue";


export default {
    name: "ChartResult",
    components: {
        ComboChart,
        BarChart,
        TableChart
    },
    data(){
        return {
            dailyValues : [],
            showed: false,
            text:"show global data"
        }
    },
    methods:{
        downloadData(extension, extensionType) {
            downloadGlobal(this.$store.getters.getWeather,this.$store.getters.getDatesParameters,extension,extensionType)
        },

        display(){
            this.showed = !this.showed
            if (this.showed){
                this.text = "Hide global data"
            }
            else{
                this.text = "Show global data"
            }
        },
    },

    
    computed: {
        show() {
            const table = getGlobal(this.$store.getters.getWeather,this.$store.getters.getDatesParameters) 
            if (table.length<1){
                this.showed = false
                this.text = "Show global data"
                return false
            }
            if(Object.keys(table[0]).length<=1){
                this.showed = false
                this.text = "Show global data"
                return false
            }
            return true

        },
        getWeather() {
            return this.$store.getters.getRawWeather;
        },
        getWeatherNbDay() {
            return this.$store.getters.getWeatherNbDay;

        },
        getStationsLength() {
            return this.$store.getters.getSelectedStations.length;
        },
        getStationsParameters() {
            return this.$store.getters.getParameters.length
        },
    }
}
</script>

<style scoped>
div#visualisation {
    margin-top: 20px;
}

div.button {
    align-items:center;
    display:flex;
    justify-content:center;
}

div.groupVisualisation {
    /* Centrer les boutons au center de la page */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 25px;
}
img.export {
    width: 75px;
    height: 75px;
    margin: auto;
    display: block;
}
button.export {
    width: 100px;
    height: 100px;
    border-radius: 15px;
    margin: 0 3em;
}
button{
    margin: 20px;
}
</style>
