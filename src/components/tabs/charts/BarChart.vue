<template>
    <div class="chart">
        <bar v-if="displayChart" :data="processData" :options="chartOptions" />
    </div>
</template>

<script>
import {Bar} from 'vue-chartjs';
import {ArcElement, Chart as ChartJS, Legend, RadialLinearScale, Title, Tooltip} from 'chart.js'
import CryptoJS from "crypto-js";
import uniqolor from "uniqolor";
import {getDailyValues,downloadFile,downloadGlobal} from '@/utils/dataGatherer'
ChartJS.register(Title, Tooltip, Legend, ArcElement, RadialLinearScale);

export default {
    name: "BarChart",
    props: {
        chartData: Object,
    },
    components: {
        Bar,
    },

    data() {
        return {
            // Property for the chart.
            properties: [],

        }
    },
    methods: {
        
        concatAttribute(json) {
            let attributes = json[0].result.values
            if (json.length>1){
                for (let i=1;i<json.length;i++){
                    let property = json[i].result.values
                    for (let result of property){
                        const attribute = attributes.find((value) => value.stationName === result.stationName)
                        for(let prop of Object.keys(result)){
                            if(prop!="stationName"){

                                attribute[prop] = result[prop]
                            }
                        }
                    }
                }
            }
            return attributes
        },
        extractValues(stationName, json1, json2) {
            const params = json2.map(param => param.param);
            const values = json1.filter(item => item["stationName"] === stationName)[0];

            return Object.keys(values)
              .filter(key => params.includes(key))
              .map(key => parseInt(values[key]));
        },
        extractKeys(stationName, json1, json2) {
            const params = json2.map(param => param.param);
            const keys = Object.keys(json1.filter(item => item["stationName"] === stationName)[0]);
            
            return keys.filter(key => params.includes(key));
        }
    },
    computed: {
        processData() {
            if (this.$store.getters.getWeatherNbDay.length === 0) {
                // No data loaded.
                return undefined;
            }
            let labels = [];
            let backgroundColors = [];
            let data = [];
            let concatData = this.concatAttribute(this.chartData)


            // For each station with data
            for (const stationData of concatData) {
                const stationName = stationData["stationName"];

                const titleLabels = this.extractKeys(stationName, concatData, this.$store.getters.getBarParameters)
                  .map(item => item + " (" + stationName + ")");
                labels = labels.concat(titleLabels);

                backgroundColors = backgroundColors.concat(titleLabels.map(item =>
                  uniqolor(CryptoJS.SHA256(item).toString(), {saturation: [45, 90], lightness: [45, 75]}).color
                ));
                data = data.concat(this.extractValues(stationName, concatData, this.$store.getters.getBarParameters));
            }

            const barChart = {
                labels: labels,
                datasets: [{
                    backgroundColor: backgroundColors,
                    data: data
                }]
            }

            return barChart;
        },
        chartOptions() {
            return {
                responsive: true,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const value = context.formattedValue;
                                return value + ' days';
                            }
                        }
                    },
                    legend:{
                        display:false,
                    }
                }
            };
        },
        displayChart() {
            return this.$store.getters.isChartUsed("POLAR") && this.$store.getters.getSelectedStations.length
        }
    }
}
</script>

<style scoped>
.chart {
    width: 50vw;
}


</style>
