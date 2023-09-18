<template>
    <Bar v-if="displayChart" ref="barChart" :data="processData" :options="chartOptions" @dblclick="resetZoom()"/>
    <div v-if="displayChart" class="button">
        <v-btn class="export"  > <img class="export" src="../../../img/csv_logo.png" @click="this.downloadData('text/csv', 'csv')"> </v-btn>
        <v-btn class="export"> <img class="export" src="../../../img/json_logo.png" @click="this.downloadData('application/sparql-results+json', 'json')" alt="JSON export"> </v-btn>
    </div>
    <div v-if="displayChart" class="button">
        <v-btn @click=show> {{text}} </v-btn>
    </div>
    <div v-show = "showed">
        <RawDataResult></RawDataResult>
    </div>
</template>

<script>
import {Bar} from 'vue-chartjs';
import CryptoJS from 'crypto-js';
import {getDailyValues,downloadFile,downloadDaily} from '@/utils/dataGatherer'
import RawDataResult from "@/components/tabs/RawDataResult.vue";

import {
    BarElement,
    CategoryScale,
    Chart,
    Legend,
    LinearScale,
    LineController,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from 'chart.js'
import zoomPlugin from 'chartjs-plugin-zoom';
import uniqolor from "uniqolor";


Chart.register(BarElement, LineController, CategoryScale, Title, Tooltip, Legend, PointElement, LinearScale, LineElement, zoomPlugin);

export default {
    name: "ComboChart",
    props: {
        chartData: Object,
    },
    components: {
        Bar,
        RawDataResult
    },
    data() {
        return {
                
            // Property for the chart.
            properties: [],

            showed: false,

            text:"show daily data",

            nbAxis:0,

            //display degrees on the left scale

            titles:[],

            


        

        }
    },
    methods: {
        downloadData(extension, extensionType) {
            downloadDaily(this.$store.getters.getRawWeather.map(el => el.result.values),this.$store.getters.getRawParameters,extension,extensionType)
        },

        show(){

            this.showed = !this.showed
            if (this.showed){
                this.text = "Hide daily data"
            }
            else{
                this.text = "Show daily data"
            }
        },
        setProperties(parameters) {
            let properties = [];
            for (let parameter in parameters) {
                const availableChart = parameters[parameter].availableChart;
                if (availableChart === "line" || availableChart === 'bar') {
                    properties.push({
                        title: parameters[parameter].param,
                        jsonPath: parameters[parameter].jsonPath,
                        type: parameters[parameter].availableChart,
                        axisLegend: parameters[parameter].axisLegend,
                        queryMethod: parameters[parameter].request.name,
                        unit: parameters[parameter].displayUnit
                    })
                }
            }
            return properties;
        },

        selectAndConcatAttributesDateComparaison(json) {
            let properties = this.setProperties(this.$store.getters.getParameters)
            this.properties = properties;


            let result = [];
            for (let attribute of properties.concat({
                jsonPath: "date",
            })) {
                let values = [];
                let attributes = [];

                if (attribute.jsonPath === "date") {
                    // Use the first query to obtain the dates
                    attributes = json[0].result.values;
                } else {
                    attributes = json.find(value => value.queryMethod === attribute.queryMethod).result.values;
                }


                for (let valueObj of attributes) {
                    let value = valueObj[attribute.jsonPath];
                    let date = valueObj["date"];
                    values.push({"station": valueObj['stationName'], "value": value, "year": date.substring(0, 4)});
                }
                values.forEach(item => {
                    const existingItem = result.find(outputItem => outputItem.station === item.station);

                    if (existingItem) {
                        existingItem.data.push({
                            "attribute": attribute.jsonPath,
                            "value": item.value,
                            "year": item.year
                        });
                    } else {
                        result.push({
                            station: item.station,
                            data: [{"attribute": attribute.jsonPath, "value": item.value, "year": item.year}]
                        });
                    }
                });
            }
            return result;
        },
        resetZoom() {
            this.$refs.barChart.chart.resetZoom();
        },
    },
    watch:{
        displayChart(newValue){
            if(!newValue){
                this.text = "Show daily data"
                this.showed=false
            }
        }
    },
    computed: {
        processData() {
            // Reset the properties to the default state.
            this.nbAxis =   this.properties.length;
            this.titles = [];
            

            if (this.$store.getters.getRawWeather.length === 0) {
                // No data loaded.
                return undefined;
            }

            let computedData, labels;
            if (this.$store.getters.getComparison) {
                computedData = this.selectAndConcatAttributesDateComparaison(this.chartData);
                labels = [...new Set(computedData[0].data.filter(item => item.attribute === "date").map(item => item.value.slice(5)))];
            } else {
                this.properties = this.setProperties(this.$store.getters.getParameters)
                computedData = getDailyValues(this.$store.getters.getRawWeather,this.$store.getters.getParameters);
                if(computedData.length ===0){
                    return undefined
                }
                labels = [...new Set(computedData[0].data.filter(item => item.attribute === "date").map(item => item.value))];
            }
                
            const years = [...new Set(computedData[0].data.map(entry => entry.year))];

            const datasets = [];
            for (let year of years) {
                for (let stationData of computedData) {
                    // For each station (station: XXX, data: [{attribute: XXX, value: XXX}]).
                    for (let property of this.properties) {
                        let axis = "yAxis";
                        

                        const titleLabel = property.title + " (" + stationData.station + ")" + ((this.$store.getters.getComparison) ? " - " + year : "");
                        let data;
                        if (this.$store.getters.getComparison) {
                            data = stationData.data.filter(item => item.attribute === property.jsonPath && item.year === year).map(item => parseFloat(item.value))

                        } else {
                            data = stationData.data.filter(item => item.attribute === property.jsonPath).map(item => item.value)
                        }

                        

                        // Low encryption method, just to randomize the String.
                        const colorSha1 = CryptoJS.SHA256(titleLabel).toString();
                        const colorUniq = uniqolor(colorSha1, {saturation: [45, 90], lightness: [45, 75]});
                        if(this.titles.includes(property.axisLegend)){
                            axis = axis.concat('',(this.titles.indexOf(property.axisLegend)+1).toString())
                        } else{
                            this.titles.push(property.axisLegend);
                            axis = axis.concat('',this.titles.length.toString());
                        }
                        datasets.push({
                            label: titleLabel,
                            backgroundColor: colorUniq.color,
                            borderColor: colorUniq.color,
                            data: data,
                            type: property.type,
                            displayUnit: property.axisLegend,
                            borderWidth: 3,
                            hoverBorderWidth: 10,
                            yAxisID: axis,
                            order: 0,
                            tension: 0.2,
                            unit: property.unit
                          
                        });
                    }
                }
            }

            return {
                labels: labels,
                datasets: datasets
            };
        },
        chartOptions() {
            return {
                responsive: true,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: (chart) =>
                              chart.dataset.label + ": " + chart.formattedValue + chart.dataset.unit
                        }
                    },
                    zoom: {
                        pan: {
                            enabled: true,
                            mode: 'x',
                            modifierKey: 'ctrl',
                        },
                        zoom: {
                            drag: {
                                enabled: true
                            },
                            mode: 'x',
                        },
                    }
                },
                scales: {
                    yAxis1: (this.titles.length>0) ? {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: this.titles[0]
                        }
                    } : {
                        // Hide the axis.
                        ticks: {
                            display: false
                        },
                        grid: {
                            display: false
                        }
                    },
                    yAxis2: (this.titles.length>1) ? {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: this.titles[1]
                        },

                        // grid line settings
                        grid: {
                            drawOnChartArea: (false), // only want the grid lines for one axis to show up
                        },
                    } : {
                        // Hide the axis.
                        ticks: {
                            display: false
                        },
                        grid: {
                            display: false
                        }
                    },
                    yAxis3: (this.titles.length>2) ? {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: this.titles[2]
                        },

                        // grid line settings
                        grid: {
                            drawOnChartArea: (false), // only want the grid lines for one axis to show up
                        },
                    } : {
                        // Hide the axis.
                        ticks: {
                            display: false
                        },
                        grid: {
                            display: false
                        }
                    },
                    yAxis4: (this.titles.length>3) ? {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: this.titles[3]
                        },

                        // grid line settings
                        grid: {
                            drawOnChartArea: (false), // only want the grid lines for one axis to show up
                        },
                    } : {
                        // Hide the axis.
                        ticks: {
                            display: false
                        },
                        grid: {
                            display: false
                        }
                    },
                    yAxis5: (this.titles.length>4) ? {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: this.titles[4]
                        },

                        // grid line settings
                        grid: {
                            drawOnChartArea: (false), // only want the grid lines for one axis to show up
                        },
                    } : {
                        // Hide the axis.
                        ticks: {
                            display: false
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            };
        },
        displayChart() {
            return (this.$store.getters.isChartUsed("line") || this.$store.getters.isChartUsed("bar")) && this.$store.getters.getSelectedStations.length
        }
    }
}
</script>

<style scoped>
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
    margin:20px
}
</style>
