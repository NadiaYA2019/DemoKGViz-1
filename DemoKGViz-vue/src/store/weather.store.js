import axios from "axios";
import {transformData} from '../utils/dataTransformation'

export const weatherModule = {
    namespace: false, state() {
        return {
            weather: [],
        }
    }, mutations: {
        setWeather(state, payload) {
            if (!state.weather.some(e => payload.query === e.query)) {
                let index = state.weather.findIndex(value => value.queryMethod === payload.queryMethod)
                if(index !== -1) {
                    state.weather[index] = payload;
                }
                state.weather.push(payload);
            }
        }
    }, getters: {
        getWeather(state) {
            return state.weather.find(value => value.queryMethod === "buildQuery_tmpRainStation");
        },
        getWeatherNbDay(state) {
            return state.weather.find(value => value.queryMethod === "buildQuery_nbStatsDaysStation");
        }
    }, actions: {
        async setWeather(context, payload) {
            try {
                const response = await axios.post("/sparql", {
                    query: payload.query
                }, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }, responseType: 'json'
                });
                const transformedData = transformData(response.data);
                    context.commit("setWeather", {query: payload.query.toString(), queryMethod: payload.queryMethod, result: transformedData});
            } catch (error) {
                console.error(error);
            }
        }
    }
}