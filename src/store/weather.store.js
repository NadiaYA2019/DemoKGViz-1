import axios from "axios";
import {transformData} from '@/utils/dataTransformation'
import { mapGetters } from "vuex";
import {weatherParameterModule} from "./weatherParameters.store";
import {
    buildQuery_tmpRainStation,
    buildQuery_nbStatsDaysStation,
    buildQuery_GddDaysStation,
    buildQuery_consecutiveDaysSpellFrost,
    buildQuery_consecutiveDaysSpellHeat,
    buildQuery_consecutiveDaysHighHum,
    buildQuery_consecutiveDaysDroughtWave,
    buildQuery_consecutiveDaysmaxConsDays,
    buildQuery_StatsPeriod,
    buildQuery_consecutiveDaysLowHum,
    buildQuery_dailyCumulativeDeficit,
    buildQuery_WaterDef,
    buildQuery_nbStatsDaysWindStation,
    buildQuery_DailyWaterDef

    
} from "@/queries/queries"

function getStationInfo(stationName, stations) {
    return stations.find(value => value.stationName.value === stationName)
}

function addOneDay(date) {
  date.setDate(date.getDate() + 1);
  return date;
}

function calculateSumOfDuration(data, minDuration, name) {
  const stationsMap = new Map();

  // Initialize the map with each station having a value of 0
  for (const entry of data) {
    const { station } = entry;
    stationsMap.set(station, 0);
  }

  for (const entry of data) {
    const { station, duration } = entry;
    if (duration >= minDuration) {
      stationsMap.set(station, stationsMap.get(station) + 1);
    }
  }
  return Array.from(stationsMap.entries()).map(([station, sumDuration]) => ({
    stationName: station,
    [name]: sumDuration,
  }));
}


function calculateDurationOfBiggestPeriod(data,name) {

  const stationsMap = new Map();

  for (const entry of data) {
    const { station, duration } = entry;

    if (stationsMap.has(station)) {
      stationsMap.set(station, Math.max(stationsMap.get(station), duration));
    } else {
      stationsMap.set(station, duration);
    }
  }
  return Array.from(stationsMap.entries()).map(([station, duration]) => ({
    stationName: station,
    [name]: duration,
  }));
}


function getNbWaves(payload) {
    let minDay =0
    let minDays = payload.nbDays    
    let name=payload.queryMethod.substring(26)
    switch(name){
        case 'SpellFrost':
            minDay = minDays.spellFrost;
            break;
        case 'SpellHeat':
            minDay = minDays.spellHeat;
            break;
        case 'HighHum':
            minDay=minDays.spellHum;
            break;
        case 'LowHum':
            minDay=minDays.spellHum;
            break;
        case 'DroughtWave':
            minDay=minDays.droughtWave;
            break;
    }
    let data = payload.result.values
    const consecutivePeriods = [];
    let i=0;
    let start = true;
    while(start){
        if(i<data.length){
                if(!("date1" in data[i])){
                    consecutivePeriods.push({station:data[i].stationName,duration:0})
                    i++;
                } else {
                    start = false;
                }
            } else {
                start = false
            }
    }

    if (i < data.length){
        let currentStartDate = new Date(data[i].date1);
        let currentEndDate = new Date(data[i].date1);
        let prevStation = data[i].stationName;
        i++
          while (  i < data.length) {
            if(!("date1" in data[i])){
                consecutivePeriods.push({station:data[i].stationName,duration:0})
            } else {
                    const previousEndDate = currentEndDate;
                    let nextDay = addOneDay(new Date(previousEndDate))
                    const currentDate1 = new Date(data[i].date1);
                    const currentStation = data[i].stationName;
                    if (currentDate1.getTime()=== nextDay.getTime() && currentStation === prevStation) {
                        currentEndDate = new Date(data[i].date1);
                    } else {
                        consecutivePeriods.push({station: prevStation, start: currentStartDate, end: currentEndDate, duration: (new Date(currentEndDate) - new Date(currentStartDate))/(3600*24 * 1000)+1 });
                        currentStartDate = new Date(data[i].date1);
                        currentEndDate = new Date(data[i].date1);
                        prevStation = currentStation
                    }
                }
            i++
        }
        if(( "date1" in data[i-1])){
            consecutivePeriods.push({ station: prevStation, start: currentStartDate, end: currentEndDate, duration: (new Date(currentEndDate) - new Date(currentStartDate))/(3600*24 * 1000)+1 });}
    }
    let sums ;

    
    if(name === 'maxConsDays') {
        sums = calculateDurationOfBiggestPeriod(consecutivePeriods,name)
    }else{
        sums = calculateSumOfDuration(consecutivePeriods,minDay,name)
    }
    payload.result.values = sums
    let test = payload.result.values

    return payload
}






export const weatherModule = {
    namespace: false, state() {
        return {
            weather: [],
            globalQueries:[buildQuery_consecutiveDaysSpellFrost.name,buildQuery_consecutiveDaysSpellHeat.name,buildQuery_consecutiveDaysHighHum.name,buildQuery_consecutiveDaysDroughtWave.name,
            buildQuery_consecutiveDaysmaxConsDays.name,buildQuery_consecutiveDaysLowHum.name],
            rawQueries:[buildQuery_tmpRainStation.name,buildQuery_GddDaysStation.name,buildQuery_dailyCumulativeDeficit.name,buildQuery_DailyWaterDef.name],
            barQueries:[buildQuery_nbStatsDaysStation.name,buildQuery_nbStatsDaysWindStation.name, buildQuery_WaterDef.name]
        }
    }, mutations: {
        setWeather(state, payload) {
            let index = state.weather.findIndex(value => value.queryMethod === payload.queryMethod)
            if(state.globalQueries.includes(payload.queryMethod)) {
                payload = getNbWaves(payload)
            }
            if (index !== -1) {
                state.weather[index] = payload;
            } else {
                state.weather.push(payload);
            }
        }
    }, getters: {
        getRawWeather(state) {
            return state.weather.filter(value => state.rawQueries.includes(value.queryMethod));
        }, getWeatherNbDay(state) {
            return state.weather.filter(value => state.barQueries.includes(value.queryMethod));
        },
        getWeather(state) {
            return state.weather;
        }
    }, actions: {
        async setWeather(context, payload) {
            
            try {
                const response = await axios.post(import.meta.env.VITE_API_URL,{
                    query: payload.query
                }, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }, responseType: 'json'
                });
                const transformedData = transformData(response.data);
                context.commit("setWeather", {
                    query: payload.query.toString(), queryMethod: payload.queryMethod, result: transformedData, nbDays: payload.nbDays
                });
            } catch (error) {
                console.error(error);
            }
        }
    }
}
