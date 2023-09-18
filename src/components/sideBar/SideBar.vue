<script>
import MeteorologicalParameter from "@/components/sideBar/MeteorologicalParameter.vue";
import PeriodParameter from "@/components/sideBar/PeriodParameter.vue";
import SpatialParameter from "@/components/sideBar/SpatialParameter.vue";

export default {
    name: "SideBar",
    props:{
        map:Boolean
    },
    
    components: {
        PeriodParameter,
        MeteorologicalParameter,
        SpatialParameter
    }
}
</script>

<template>
    <div class="sidebar">
        <SpatialParameter></SpatialParameter>
        <PeriodParameter v-show="map"></PeriodParameter>
        <MeteorologicalParameter v-show="map" :show="map"></MeteorologicalParameter>
    </div>
</template>

<style scoped>
.sidebar {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
}
</style>
