<template>
    <v-tabs class="tabs" v-model="tab" bg-color="secondary">
        <v-tab value="map">
            <v-icon class="mr-2">mdi-map</v-icon>
            Map
        </v-tab>
        <v-tab value="charts">
            <v-icon class="mr-2">mdi-chart-bar</v-icon>
            Meteorological paramaters
        </v-tab>
    </v-tabs>
    <v-window class="windows" v-model="tab">
        <v-window-item  class="window" value="map">
            <LeafletMap></LeafletMap>
        </v-window-item>
        <v-window-item value="charts">
            <ChartResult></ChartResult>
        </v-window-item>
    </v-window>
</template>

<script>
import ChartResult from "@/components/Tabs/ChartResult.vue";
import LeafletMap from "@/components/tabs/LeafletMap.vue";
import MeteorologicalParameter from "@/components/sideBar/MeteorologicalParameter.vue";
import PeriodParameter from "@/components/sideBar/PeriodParameter.vue";

export default {
    name: "TabsBar",
    data: () => ({
        tab: "charts",
    }),
    components: {
        ChartResult,
        LeafletMap,
        MeteorologicalParameter,
        PeriodParameter,
    },
    watch:{
        tab(newValue){
            this.$emit("tab",newValue)
        }
    }
}
</script>

<style scoped>
.tabs {
    position: sticky;
    top: 64px;
    z-index: 999;
}
.windows {
    height: calc(100% - 50px);
}
.window {
    height: calc(100%);
}
</style>
