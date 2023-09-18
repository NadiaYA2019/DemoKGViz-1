    import {reloadChart} from "@/utils/utils";

    export const dateModule = {
        namespace: false,
        state() {
            return {
                // TODO: for production, use "2016-01-01".
                startDate: "2020-01-01",
                endDate: "2020-12-31",
                comparison: false,
                comparisonDate: [2016, 2017],
            }
        },
        mutations: {
            setStartDate(state, payload) {
                state.startDate = payload
            },
            setEndDate(state, payload) {
                state.endDate = payload
            },
            setComparison(state, payload) {
                state.comparison = payload
            },
            setComparisonDate(state, payload) {
                state.comparisonDate = payload
            },
        },
        getters: {
            getStartDate(state) {
                return state.startDate
            },
            getEndDate(state) {
                return state.endDate
            },
            getComparison(state) {
                return state.comparison
            },
            getDate(state) {
                if (!state.comparison) {
                    return [state.startDate, state.endDate]
                } else {
                    return [state.comparisonDate[0].toString() + "-01-01", state.comparisonDate[1].toString() + "-12-31"]
                }
            }
        },
        actions: {
            setStartDate(context, payload) {
                context.commit('setStartDate', payload);

                reloadChart(context)
            },
            setEndDate(context, payload) {
                context.commit('setEndDate', payload);

                reloadChart(context)
            },
            setComparison(context, payload) {
                context.commit('setComparison', payload);
                reloadChart(context)
            },
            setComparisonDate(context, payload) {
                context.commit('setComparisonDate', payload);
                reloadChart(context)
            },
        }
    }
