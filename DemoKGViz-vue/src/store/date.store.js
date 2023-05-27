import {groupRequestsByParam} from "@/utils/utils";

export const dateModule = {
    namespace: false,
    state() {
        return {
            // TODO: for production, use "2016-01-01".
            startDate: "2021-01-01",
            endDate: "2021-01-31",
        }
    },
    mutations: {
        setStartDate(state, payload) {
            state.startDate = payload
        },
        setEndDate(state, payload) {
            state.endDate = payload
        }
    },
    getters: {
        getStartDate(state) {
            return state.startDate
        },
        getEndDate(state) {
            return state.endDate
        }
    },
    actions: {
        setStartDate(context, payload) {
            context.commit('setStartDate', payload);

            // Reload chart data
            for (let fonction of groupRequestsByParam(context.getters.getParameters)) {
                console.log("setStartDate fonction", fonction)
                context.dispatch("setWeather", {
                    query:
                        fonction(context.getters.getSelectedStationsJoin,
                            context.getters.getStartDate,
                            context.getters.getEndDate),
                    queryMethod: fonction.name
                });
            }
        },
        setEndDate(context, payload) {
            context.commit('setEndDate', payload);

            // reload chart data
            for (let fonction of groupRequestsByParam(context.getters.getParameters)) {
                console.log("setEndDate function", fonction)
                context.dispatch("setWeather", {
                    query:
                        fonction(context.getters.getSelectedStationsJoin,
                            context.getters.getStartDate,
                            context.getters.getEndDate),
                    queryMethod: fonction.name
                });
            }
        },
    }
}
