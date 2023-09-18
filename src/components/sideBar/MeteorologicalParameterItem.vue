<template>
    <div>
        <v-checkbox density="compact" :hide-details="true" @click="checkParameter($event)">
            <template v-slot:label>
                <div class="text-body-2 font-weight-regular" v-html="title"></div>
                <v-tooltip location="bottom">
                    <template v-slot:activator="{ props }">
                        <v-btn density="compact" icon="mdi-help-circle-outline" variant="text" v-bind="props"></v-btn>
                    </template>

                    <span v-html="tooltip"></span>
                </v-tooltip>
            </template>
        </v-checkbox>
    </div>
</template>

<script>

export default {
    name: "MeteorologicalParameterItem",
    props: {
        title: String,
        tooltip: String,
        type: String,
        param: String,
        request: Function,
        jsonPath: String,
        availableChart: String,
        displayUnit: String,
        axisLegend: String,
        related: Array,
    },
    methods: {
        checkParameter(event) {
            const isChecked = event.target.checked;
            if (isChecked) {
                this.$store.dispatch('addParameter', {
                    type: this.type,
                    param: this.param,
                    request: this.request,
                    jsonPath: this.jsonPath,
                    availableChart : this.availableChart,
                    displayUnit: this.displayUnit,
                    axisLegend: this.axisLegend,
                    tooltip: this.tooltip
                });
                this.related.forEach(element => {
                    this.$store.dispatch('addParameter', {
                        type: element.type,
                        param: element.param,
                        request: element.request,
                        jsonPath: element.jsonPath,
                        availableChart: element.availableChart,
                        displayUnit: element.displayUnit,
                        axisLegend: element.axisLegend,
                        tooltip: element.tooltip
                    });
                    
                });
            } else {
                this.related.forEach(element =>{
                    this.$store.dispatch('removeParameter', {param: element.param});
                });
                this.$store.dispatch('removeParameter', {param: this.param});
            }

        },
    },
    computed: {
        baseTemp: {
            // Workaround in order to not get a warning in the console.
            get() {
            },
            set() {
                // Empty.
            }
        }
    },

}
</script>

<style scoped>


input{
    width: 3em;
}
</style>
