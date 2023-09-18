 import {reloadChart} from "@/utils/utils";
 export const weatherParameterModule = {
    state() {
            return {
                baseTemp : 5,   //Base temperature for GDD
                coldMin : 0,    //Minimum temperature for frost/cold days
                heat : 30,      //maximale temperature for heat day
                minTemp:0,      //min temperature for vernalization day
                maxTemp:40,     //max temperature for vernalization day
                minHum:40,      //maximum temperature for dry days
                maxHum:60,      //minimum temperature for wet days
                rainLevel:0,    //minimum precipitation for rainy days
                deficitLevel:0, //maximum water deficit for rainless days
                spellFrost:5,   //minimum duration for a spell frost
                spellHeat:5,    //minimum duration for a spell heat
                spellHum:7,     //minimum duration for a spell of low/high humidity
                droughtWave:20, //minimum duration for a drought wave
                windSpeed:5,    //minimum windSpeed for a windy day

            }
        },
        mutations: {
            SET_BASE_TEMP(state, payload) {
                state.baseTemp = payload;
            },
            SET_COLD_MIN(state, payload) {
                state.coldMin = payload;
            },
            SET_HEAT(state,payload) {
                state.heat = payload;
            },
            SET_MIN_TEMP(state,payload) {
                state.minTemp = payload;
            },
            SET_MAX_TEMP(state,payload) {
                state.maxTemp = payload;
            },
            SET_MIN_HUM(state,payload) {
                state.minHum = payload;
            },
            SET_MAX_HUM(state,payload) {
                state.maxHum = payload;
            },
            SET_RAIN_LEVEL(state,payload) {
                state.rainLevel = payload;
            },
            SET_DEFICIT_LEVEL(state, payload) {
                state.deficitLevel = payload;
            },
            SET_SPELL_FROST(state,payload) {
                state.spellFrost = payload
            },
            SET_SPELL_HEAT(state,payload) {
                state.spellHeat = payload
            },
            SET_SPELL_HUM(state,payload) {
                state.spellHum = payload
            },
            SET_DROUGHT_WAVE(state,payload) {
                state.droughtWave = payload
            },
            SET_WIND_SPEED(state,payload) {
                state.windSpeed = payload
            }
        },
        getters: {
            getBaseTemp(state) {
                return state.baseTemp
            },
            getColdMin(state) {
                return state.coldMin
            },
            getHeat(state) {
                return state.heat
            },
            getMinTemp(state) {
                return state.minTemp
            },
            getMaxTemp(state) {
                return state.maxTemp
            },
            getMinHum(state) { 
                return state.minHum
            },
            getMaxHum(state) {
                return state.maxHum
            },
            getRainLevel(state) {
                return state.rainLevel
            },
            getDeficitLevel(state) {
                return state.deficitLevel
            },
            getSpellFrost(state) {
                return state.spellFrost
            },
            getSpellHeat(state) {
                return state.spellHeat
            },
            getSpellHum(state) {
                return state.spellHum
            },
            getDroughtWave(state) {
                return state.droughtWave
            },
            getWindSpeed(state) {
                return state.windSpeed
            }



        },
        actions: {
            setBaseTemp(context, newBaseTemp) {
              context.commit('SET_BASE_TEMP', newBaseTemp);
              reloadChart(context)
            },
            setColdMin(context, newColdMin) {
              context.commit('SET_COLD_MIN', newColdMin);
              reloadChart(context)
            },
            setHeat(context,newHeat) {
                context.commit('SET_HEAT',newHeat);
                reloadChart(context)
            },
            setMinTemp(context, newMinTemp) {
                context.commit('SET_MIN_TEMP',newMinTemp);
                reloadChart(context)
            },
            setMaxTemp(context, newMaxTemp) {
                context.commit('SET_MAX_TEMP',newMaxTemp);
                reloadChart(context)
            },
            setMinHum(context, newMinHum) {
                context.commit('SET_MIN_HUM',newMinHum);
                reloadChart(context)
            },
            setMaxHum(context, newMaxHum) {
                context.commit('SET_MAX_HUM',newMaxHum);
                reloadChart(context)
            },
            setRainLevel(context,newRainLevel) {
                context.commit('SET_RAIN_LEVEL', newRainLevel);
                reloadChart(context)
            },
            setDeficitLevel(context,newDeficitLevel) {
                context.commit('SET_DEFICIT_LEVEL', newDeficitLevel);
                reloadChart(context)
            },
            setSpellFrost(context,newSpellFrost) {
                context.commit('SET_SPELL_FROST',newSpellFrost);
                reloadChart(context)
            },
            setSpellHeat(context,newSpellHeat) {
                context.commit('SET_SPELL_HEAT',newSpellHeat);
                reloadChart(context)
            },
            setSpellHum(context,newSpellHum) {
                context.commit('SET_SPELL_HUM',newSpellHum);
                reloadChart(context)
            },
            setDroughtWave(context,newDroughtWave) {
                context.commit("SET_DROUGHT_WAVE",newDroughtWave);
                reloadChart(context)
            },
            setWindSpeed(context,newWindSpeed) {
                context.commit("SET_WIND_SPEED", newWindSpeed);
                reloadChart(context)
            }
        }
    }