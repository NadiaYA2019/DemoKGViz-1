import {createStore} from "vuex";
import axios from "axios";
import {buildQuery_station} from "@/queries/queries";
import {transformData} from "@/utils/dataTransformation";

function callSparql(url, query, key, type) {
    try {
        return axios.post(url, {
            query: query
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            responseType: type
        });
    } catch (error) {
        console.error(error);
    }
}

/**
 * TODO: REMOVE THIS
 */
let SPARQL = function (o) {
    this.query = function (q) {
        return callSparql(o.endpoint, q, 'json')
    };

    this.queryTurtle = function (q) {
        return callSparql(o.endpoint, q, 'text/turtle')
    }

    this.queryCSV = function (q) {
        return callSparql(o.endpoint, q, 'text/csv')
    }
};

const mainModule = {
    state: {
        // Used mainly by the MeteorologicalParameter component.
        parameters: [],
        weatherTypes: new Map(Object.entries({TmpRain: [], GddRain: [], Numb: []})),

        // Used to define the range of the data retrieved.
        startDate: new Date(2016, 0, 1),
        endDate: new Date(2021, 11, 31),

        // Endpoint to call the back-end.
        endpoint: new SPARQL({
            endpoint: "/sparql"
        })
    },
    mutations: {
        pushParameter(state, payload) {
            state.parameters.push(payload['parameter'])
            state.weatherTypes.get(payload['type']).push(payload['parameter'])
        },
        cleanParameters(state, parameter) {
            state.parameters = state.parameters.filter(function (item) {
                return item !== parameter
            })
        },
        setStartDate(state, date) {
            state.startDate = date
        },
        setEndDate(state, date) {
            state.endDate = date
        }
    },
    actions: {
        pushParameter(context, payload) {
            context.commit('pushParameter', payload)
        },
        cleanParameters(context, parameter) {
            context.commit('cleanParameters', parameter)
        },
        setStartDate(context, date) {
            context.commit('setStartDate', date)
        },
        setEndDate(context, date) {
            context.commit('setEndDate', date)
        },
    },
    getters: {
        getParameters(state) {
            return state.parameters;
        },
        getWeatherTypes(state) {
            return state.weatherTypes;
        },
        getStartDate(state) {
            return state.startDate;
        },
        getEndDate(state) {
            return state.endDate;
        },
        getEndpoint(state) {
            return state.endpoint;
        }
    }
}

const stationModule = {
    state: {
        stations: [],
    },
    mutations: {
        setStations(state, payload) {
            for (const element of payload.stations.results.bindings) {
                element['selected'] = false;
            }
            state.stations = payload.stations.results;
        },
        setSelectedStations(state, payload) {
            for (const element of state.stations.bindings) {
                element['selected'] = (payload.stationNames).includes(element['stationName']['value']);
            }
        },
    },
    getters: {
        findStation(state, id) {
            return state.stations.find((station) => station.id === id);
        },
        getAll(state) {
            return state.stations;
        },
        getSelectedStations(state) {
            return (state.stations.bindings).filter(station => station['selected'] === true);
        }
    },
    actions: {
        async setStationsApi(context) {
            try {
                const response = await axios.post("/sparql", {
                    query: buildQuery_station()
                }, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    responseType: 'json'
                });
                context.commit("setStations", {stations: response.data});
            } catch (error) {
                console.error(error);
            }
        },
        async updateSelectedStations(context, payload) {
            context.commit("setSelectedStations", {stationNames: payload});
        }
    },
};


const weatherModule = {
    state: {
        queryResult: [],
    },
    mutations: {
        setQueryResult(state, payload) {
            state.queryResult = payload;
        }
    },
    getters: {
        getAllData(state) {
            return state.queryResult;
        }
    },
    actions: {
        async fetchWeatherData(context, payload) {
            try {
                const response = await axios.post("/sparql", {
                    query: payload
                }, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    responseType: 'json'
                });
                //Apply transformation
                const transformedData = transformData(response.data);
                context.commit("setQueryResult", {query: payload.toString(), result: transformedData});
            } catch (error) {
                console.error(error);
            }
        }
    },
};


export const index = createStore({
    modules: {
        stationModule,
        mainModule,
        weatherModule
    },
});