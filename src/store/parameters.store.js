import { isParameterTypeDataAlreadyFetch } from "@/utils/utils"


export const parametersModule = {
    namespace: false,
    state() {
        return {
            parameters: []
        }
    },
    mutations: {
        addParameter(state, payload) {
            state.parameters.push(payload)
        },
        removeParameter(state, payload) {
            state.parameters = state.parameters.filter(parameter => parameter.param !== payload.param)
        }
    },
    getters: {
        getParameters(state) {
            return state.parameters
        },
        isChartUsed: (state) => (availableChart) => {
            return state.parameters.some((parameter) => parameter.availableChart === availableChart)
        },
        getBarParameters(state) {
            return state.parameters.filter(item=> item.availableChart==="POLAR")
        },
        getDatesParameters(state){
            return state.parameters.filter(item=>item.availableChart==="table")
        },
        getRawParameters(state){
            return state.parameters.filter(item=>item.availableChart!="POLAR" && item.availableChart!="table")
        }
    },
    actions: {
        addParameter(context, payload) {
            if (context.getters.getSelectedStations.length > 0 &&
                !isParameterTypeDataAlreadyFetch(context.getters.getParameters, payload)) {
                context.dispatch("setWeather", {
                    query: payload.request(
                        context.getters.getSelectedStationsJoin,
                        context.getters.getDate[0],
                        context.getters.getDate[1],
                        context.getters.getBaseTemp,
                        context.getters.getColdMin,
                        context.getters.getHeat,
                        context.getters.getMinTemp,
                        context.getters.getMaxTemp,
                        context.getters.getMinHum,
                        context.getters.getMaxHum,
                        context.getters.getRainLevel,
                        context.getters.getDeficitLevel,
                        context.getters.getWindSpeed,
                        context.getters.getURLStations
                    ),
                    queryMethod: payload.request.name,
                    nbDays:{
                        spellFrost:context.getters.getSpellFrost,
                        spellHeat:context.getters.getSpellHeat,
                        spellHum:context.getters.getSpellHum,
                        droughtWave:context.getters.getDroughtWave
                    }
                });
            }

            context.commit("addParameter", payload);
        },
        removeParameter(context, payload) {
            context.commit("removeParameter", payload)
        }
    }
}
