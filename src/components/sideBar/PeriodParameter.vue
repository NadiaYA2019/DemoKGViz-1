<template>
    <div class="period-parameter">

        <v-switch v-model="localComparison" @change="updateComparison(localComparison)" hide-details inset
                  label="Comparison"></v-switch>

        <div class="date-pickers" v-if="comparison">
            <div>
                <span class="text-subtitle-2 font-weight-bold">Comparison period</span>
            </div>
            <div class="date-pickers">
                <VueDatePicker auto-apply year-picker v-model="this.yearsSelected[0]" placeholder="Select a start date"
                    :min-date="this.startDateBound" :max-date="this.endDateBound"
                    @update:model-value="this.updateComparisonDate" />
                <VueDatePicker auto-apply year-picker v-model="this.yearsSelected[1]" :min-date="this.startDateBound"
                    :max-date="this.endDateBound" placeholder="Select an end date"
                    @update:model-value="this.updateComparisonDate" />
            </div>

        </div>
        <div class="date-pickers" v-else>
            <div>
                <span class="text-subtitle-2 font-weight-bold">Temporal period</span>
                <v-tooltip location="bottom">
                    <template v-slot:activator="{ props }">
                        <v-btn density="compact" icon="mdi-help-circle-outline" variant="text" v-bind="props"></v-btn>
                    </template>
                    <span>Format: YYYY-MM-DD</span>
                </v-tooltip>
            </div>
            <div class="date-pickers">
                <VueDatePicker auto-apply prevent-min-max-navigation ignore-time-validation hide-offset-dates
                    :enable-time-picker="false" v-model="this.startDate" :min-date="this.startDateBound"
                    :max-date="this.endDateBound" :format="this.stringToStringFormatted(this.startDate)"
                    placeholder="Select a start date" @update:model-value="this.updateStartDate" />
                <VueDatePicker auto-apply prevent-min-max-navigation ignore-time-validation hide-offset-dates
                    :enable-time-picker="false" v-model="this.endDate" :min-date="this.startDateBound"
                    :max-date="this.endDateBound" :format="this.stringToStringFormatted(this.endDate)"
                    placeholder="Select an end date" @update:model-value="this.updateEndDate" />
            </div>
        </div>

    </div>
</template>

<script>

export default {
    name: "PeriodParameter",
    data() {
        return {
            localComparison: false,

            startDateBound: new Date(2016, 1, 1),
            endDateBound: new Date(2023, 11, 31),

            // Comparison range slider
            yearsSelected: [2016, 2017],
        }
    },
    methods: {
        dateToStringFormatted(date) {
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            return year + "-" + this.numberFormatString(month) + "-" + this.numberFormatString(day);
        },
        stringToStringFormatted(strDate) {
            const strDateSplit = strDate.split("-");
            const date = new Date(strDateSplit[0], strDateSplit[1] - 1, strDateSplit[2]);
            return this.dateToStringFormatted(date);
        },
        numberFormatString(number) {
            if (number >= 1 && number <= 9) {
                return '0' + number;
            }
            return number;
        },
        updateStartDate(date) {
            this.$store.dispatch('setStartDate', this.dateToStringFormatted(date));
        },
        updateEndDate(date) {
            this.$store.dispatch('setEndDate', this.dateToStringFormatted(date));
        },
        updateComparison(comparison) {
            this.$store.dispatch('setComparison', comparison);
        },
        updateComparisonDate() {
            this.$store.dispatch('setComparisonDate', this.yearsSelected)
        },
    },
    computed: {
        startDate: {
            // Workaround in order to not get a warning in the console.
            get() {
                return this.$store.getters.getStartDate
            },
            set() {
                // Empty.
            }
        },
        endDate: {
            // Workaround in order to not get a warning in the console.
            get() {
                return this.$store.getters.getEndDate
            },
            set() {
                // Empty.
            }
        },
        comparison() {
            return this.$store.getters.getComparison
        },
    }
}

</script>

<style scoped>
.period-parameter {
    display: flex;
    flex-direction: column;
    gap: 10px
}

.date-pickers {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-bottom: 10px;
}
</style>
