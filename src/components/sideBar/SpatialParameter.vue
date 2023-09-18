<template>
    <div class="spatial-parameter">
        <div class="text-subtitle-2 font-weight-bold">Spatial location</div>
        <v-select :items="this.stations" v-model="this.selectedStations"
                  label="Stations" @update:model-value="selectionUpdated($event)" multiple>
            <template v-slot:selection="{ item, index }">
                <v-chip v-if="index < 3">
                    <span>{{ item.title }}</span>
                </v-chip>
                <span v-if="index === 3" class="text-grey text-caption align-self-center">
                    (+{{ this.selectedStations.length - 3 }} other(s))
                </span>
            </template>
        </v-select>
    </div>
</template>

<script>

export default {
    name: "SpatialParameter",
    computed: {
        stations() {
            const stations = this.$store.getters.getStations;
            return stations.map(station => station.stationName.value);
        },
        selectedStations: {
            // Workaround in order to not get a warning in the console.
            set() {
                // Empty.
            },
            get() {
                return this.$store.getters.getSelectedStations;
            }
        }
    },
    methods: {
        selectionUpdated(event) {
            this.$store.dispatch('setSelectedStations', event);
        }
    }
}

</script>

<style scoped>
.spatial-parameter {
    display: flex;
    flex-direction: column;
    gap: 10px
}
</style>
