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

export const metricsConfig = [{"title":"Weather Variables" , "items":[{
    "title": "Daily values", "items": [{
        "title": "Minimum temperature (T<sub>min</sub>)",
        "tooltip": "The daily minimum temperature represents the lower air temperature recorded from 18:00 UTC day d-1 till 18:00 UTC day d",
        "type": "TmpRain",
        "param": "TMin",
        "jsonPath": "temp_min",
        "request": buildQuery_tmpRainStation,
        "availableChart": "line",
        "axisLegend": "Temperature (°C)" ,
        "displayUnit":"°C",
        "related":[{
            "title": "Mean of daily minimum air temperature",
            "tooltip": "The mean of the daily minimum temperature over the period",
            "type": "average",
            "param":"minMean",
            "jsonPath":"meanmint",
            "request" : buildQuery_StatsPeriod,
            "availableChart":"table",
            "axisLegend":"Temperature (°C)",
            "displayUnit": "°C",
            "related":[]
        }],
    }, {
        "title": "Maximum temperature (T<sub>max</sub>)",
        "tooltip": "The daily maximum temperature represents the highest air temperature recorded from 6:00 UTC day d till 6:00 UTC day d+1",
        "type": "TmpRain",
        "param": "TMax",
        "jsonPath": "temp_max",
        "request": buildQuery_tmpRainStation,
        "availableChart": "line",
        "axisLegend": "Temperature (°C)" ,
        "displayUnit":"°C",
        "related":[{
            "title": "Mean of daily maximum air temperature",
            "tooltip": "The mean of the daily maximum temperature over the period",
            "type": "average",
            "param":"maxMean",
            "jsonPath":"meanmaxt",
            "request" : buildQuery_StatsPeriod,
            "availableChart":"table",
            "axisLegend":"Temperature (°C)",
            "displayUnit": "°C",
            "related":[]
        }],
    }, {
        "title": "Mean temperature (T<sub>mean</sub>)",
        "tooltip": "The daily mean temperature represents the average value of the temperatures",
        "type": "TmpRain",
        "param": "TMean",
        "jsonPath": "temp_avg",
        "request": buildQuery_tmpRainStation,
        "availableChart": "line",
        "axisLegend": "Temperature (°C)" ,
        "displayUnit":"°C",
        "related":[{
            "title": "Mean of daily average air temperature",
            "tooltip": "The mean of the daily average temperature over the period",
            "type": "average",
            "param":"avgMean",
            "jsonPath":"meanavgt",
            "request" : buildQuery_StatsPeriod,
            "availableChart":"table",
            "axisLegend":"Temperature (°C)",
            "displayUnit": "°C",
            "related":[]
        }],
    }, {
        "title": "Thermal amplitude (T<sub>Diff</sub>)",
        "tooltip": "The daily thermal amplitude represents the difference between the maximum and the minimum temperature for each days",
        "type": "TmpRain",
        "param": "TDiff",
        "jsonPath": "temp_diff",
        "request": buildQuery_tmpRainStation,
        "availableChart": "line",
        "axisLegend": "Temperature (°C)",
        "displayUnit":"°C",
        "related":[{
            "title": "Mean of daily range temperature",
            "tooltip": "The mean of the daily range temperature over the period",
            "type": "average",
            "param":"rangeMean",
            "jsonPath":"meanranget",
            "request" : buildQuery_StatsPeriod,
            "availableChart":"table",
            "axisLegend":"Temperature (°C)",
            "displayUnit": "°C",
            "related":[]
        }],
    }, {
        "title": "Amount of precipitations (Prec<sub>day</sub>)",
        "tooltip": "Daily cumulative precipitation R<sub>d</sub> recorded from 6:00 UTC day d till 6:00 UTC day d+1",
        "type": "TmpRain",
        "param": "precDay",
        "jsonPath": "rainfall",
        "request": buildQuery_tmpRainStation,
        "availableChart": "bar",
        "axisLegend": "Precipitations(mm)" ,
        "displayUnit":"mm",
        "related":[],
    }, {
        "title": "Radiation sum (rad<sub>sum</sub>)",
        "tooltip": "The radiation sum",
        "type": "EvapoRad",
        "param": "RadSum",
        "jsonPath": "radiationSum",
        "request": buildQuery_DailyWaterDef,
        "availableChart": "line",
        "axisLegend": "Radiations (W/m²)",
        "displayUnit":"W/m²",
        "related":[],
    }, {
        "title": "Daily Relative Humidity (Hum<sub>rel</sub>)",
        "tooltip": "The average humidiy",
        "type": "TmpRain",
        "param": "HumRel",
        "jsonPath": "humidity",
        "request": buildQuery_tmpRainStation,
        "availableChart": "line",
        "axisLegend": "humidity (%)",
        "displayUnit":"%",
        "related":[],
    }, {
        "title": "Evapotranspiration (ET0)",
        "tooltip": "The evapotranspiration",
        "type": "EvapoRad",
        "param": "ET0",
        "jsonPath": "evapotranspiration",
        "request": buildQuery_DailyWaterDef,
        "availableChart": "line",
        "axisLegend": "Evapotranspiration (mm)",
        "displayUnit":"mm",
        "related":[],
        
    }, {
        "title": "Daily Water Deficit (Water<sub>def</sub>)",
        "tooltip": "The average humidiy",
        "type": "waterDeficit",
        "param": "waterDef",
        "jsonPath": "waterDef",
        "request": buildQuery_DailyWaterDef,
        "availableChart": "line",
        "axisLegend": "Water Deficit (mm)",
        "displayUnit":"mm",
        "related":[],
    }]
}]}, {
    "title":"Agro-Meteorological Variables  ", "items":[
    {
    "title": "Freezing cold","items":[{
        "title": "Number of cold days (T<sub>min</sub> < Cold Threshold)",
        "tooltip": "Number of cold days represents the number of days during which the minimum temperature is lower than the cold threshold for a period",
        "type": "Numb",
        "param": "nbColdDays",
        "jsonPath": "nbColdDays",
        "request": buildQuery_nbStatsDaysStation,
        "availableChart": "POLAR",
        "axisLegend": " day(s)",
        "displayUnit":"day(s)",
        "related":[{
                    "title": "Cold day start",
                    "tooltip": "First day of the period where the minimum temperature is lower than the limit",
                    "type": "Numb",
                    "param": "coldDayStart",
                    "jsonPath": "startFrost",
                    "request": buildQuery_nbStatsDaysStation,
                    "availableChart": "table",
                    "axisLegend": "date",
                    "displayUnit":"date",
                    "related":[]
        
                }, {
                    "title": "Cold day end",
                    "tooltip": "Last day of the period where the minimum temperature is lower than the limit",
                    "type": "Numb",
                    "param": "coldDayEnd",
                    "jsonPath": "endFrost",
                    "request": buildQuery_nbStatsDaysStation,
                    "availableChart": "table",
                    "axisLegend": "date",
                    "displayUnit":"date",
                    "related":[]
        
                }, {
                    "title": "Cold frequencie",
                    "tooltip": "Percentage of cold days over the period",
                    "type": "Numb",
                    "param": "coldFrequencie",
                    "jsonPath": "frostFrequencie",
                    "request": buildQuery_nbStatsDaysStation,
                    "availableChart": "table",
                    "axisLegend": "percentage",
                    "displayUnit":"%",
                    "related":[]
        
                }, {
                    "title": "Period of cold",
                    "tooltip": "Number of days between the first and the last day of cold",
                    "type": "Numb",
                    "param": "coldPeriod",
                    "jsonPath": "frostPeriod",
                    "request": buildQuery_nbStatsDaysStation,
                    "availableChart": "table",
                    "axisLegend": "days",
                    "displayUnit":"nb days",
                    "related":[]
        
                }, {
                    "title":"Cold Spell",
                    "tooltip":"Number of cold spell that lasted at least {CodlSpellDuration} days (T<sub>min</sub> \< cold) ",
                    "type": "frost",
                    "param": "nbColdSpell",
                    "jsonPath": "SpellFrost",
                    "request": buildQuery_consecutiveDaysSpellFrost,
                    "availableChart": "table",
                    "axisLegend": " day(s)",
                    "displayUnit":"nb spells",
                    "related":[]
                    }],
    }, {
        "title": "Number of extreme cold days (T<sub>mean</sub> < Cold Threshold)",
        "tooltip": "Number of extreme cold days represents the number of days for which the mean temperature is lower than the cold threshold for a period",
        "type": "Numb",
        "param": "nbExtremeColdDays",
        "jsonPath": "nbExtremeColdDays",
        "request": buildQuery_nbStatsDaysStation,
        "availableChart": "POLAR",
        "axisLegend": " day(s)",
        "displayUnit":"day(s)",
        "related":[{
                    "title": "Extreme Cold frequencie",
                    "tooltip": "Percentage of extreme cold days over the period",
                    "type": "Numb",
                    "param": "extremeColdFrequencie",
                    "jsonPath": "coldFrequencie",
                    "request": buildQuery_nbStatsDaysStation,
                    "availableChart": "table",
                    "axisLegend": "percentage",
                    "displayUnit":"%",
                    "related":[]
        
                }]
    }, {
        "title": "Number of vernalization days (minTemp < T<sub>mean</sub> < maxTemp)",
        "tooltip": "Number of vernalization days represents the number of days during which the mean temperature is between the min and max temperature choosen",
        "type": "TmpRain",
        "param": "nbVernDays",
        "jsonPath": "nbVernDays",
        "request": buildQuery_nbStatsDaysStation,
        "availableChart": "POLAR",
        "axisLegend": "day(s)",
        "displayUnit":"day(s)",
        "related":[],
    }]
}, {
    "title": "Heat", "items": [ {
        "title": "Number of heat days (T<sub>max</sub> > Heat Threshold)",
        "tooltip": "Number of heat days represents the number of days during which the maximum temperature is higher than the heat threshold for a period",
        "type": "Numb",
        "param": "nbHeatDays",
        "jsonPath": "nbHeatDays",
        "request": buildQuery_nbStatsDaysStation,
        "availableChart": "POLAR",
        "axisLegend": "day(s)",
        "displayUnit":"day(s)",
        "related":[{
                    "title": "Heat day start",
                    "tooltip": "First day of the period where the maximum temperature is higher than the heat threshold",
                    "type": "Numb",
                    "param": "heatDayStart",
                    "jsonPath": "startHeat",
                    "request": buildQuery_nbStatsDaysStation,
                    "availableChart": "table",
                    "axisLegend": "date",
                    "displayUnit":"date",
                    "related":[]
        
                }, {
                    "title": "Heat day end",
                    "tooltip": "Last day of the period where the maximum temperature is higher than the heat threshold",
                    "type": "Numb",
                    "param": "heatDayEnd",
                    "jsonPath": "endHeat",
                    "request": buildQuery_nbStatsDaysStation,
                    "availableChart": "table",
                    "axisLegend": "date",
                    "displayUnit":"date",
                    "related":[]
        
                }, {
                    "title": "Heat frequencie",
                    "tooltip": "Percentage of heat days over the period",
                    "type": "Numb",
                    "param": "heatFrequencie",
                    "jsonPath": "heatFrequencie",
                    "request": buildQuery_nbStatsDaysStation,
                    "availableChart": "table",
                    "axisLegend": "percentage",
                    "displayUnit":"%",
                    "related":[]
        
                }, {
                    "title": "Period of heat",
                    "tooltip": "Number of days between the first and the last day of heat",
                    "type": "Numb",
                    "param": "heatPeriod",
                    "jsonPath": "heatPeriod",
                    "request": buildQuery_nbStatsDaysStation,
                    "availableChart": "table",
                    "axisLegend": "days",
                    "displayUnit":"nb days",
                    "related":[]
        
                }, {
                    "title":"Spell heat",
                    "tooltip":"Number of spell heat that lasted at least {SpellHeatDuration} days (T<sub>max</sub> \> heat) ",
                    "type": "heat",
                    "param": "nbSpellHeat",
                    "jsonPath": "SpellHeat",
                    "request": buildQuery_consecutiveDaysSpellHeat,
                    "availableChart": "table",
                    "axisLegend": " day(s)",
                    "displayUnit":"nb spells",
                    "related":[]
                    }]
            },{
        "title": "Number of extreme heat days (T<sub>mean</sub> > Heat Threshold)",
        "tooltip": "Number of extreme heat days represents the number of days during which the mean temperature is higher than the heat threshold for a period",
        "type": "Numb",
        "param": "nbExtremeHeatDays",
        "jsonPath": "nbExtremeHeatDays",
        "request": buildQuery_nbStatsDaysStation,
        "availableChart": "POLAR",
        "axisLegend": "day(s)",
        "displayUnit":"day(s)",
        "related":[{
                    "title": "Extreme Heat frequencie",
                    "tooltip": "Percentage of extreme heat days over the period",
                    "type": "Numb",
                    "param": "extremeHeatFrequencie",
                    "jsonPath": "heatAvgFrequencie",
                    "request": buildQuery_nbStatsDaysStation,
                    "availableChart": "table",
                    "axisLegend": "percentage",
                    "displayUnit":"%",
                    "related":[]
        
                }]
    }, {
        "title": "Growing degree days (GDD)",
        "tooltip": "Growing degree days is equal to the average daily temperature minus base temperature",
        "type": "GddRain",
        "param": "GDD",
        "jsonPath": "GDD",
        "request": buildQuery_GddDaysStation,   
        "availableChart": "bar",
        "axisLegend": "Temperature (°C)",
        "displayUnit":"°C",
        "related":[],
    }, {
        "title": "Accumulated growing degree days (sumGDD)",
        "tooltip": "Accumulated growing degree days represents the sum of Growing degree days (GDD) over a period of time",
        "type": "GddRain",
        "param": "cumulativeGDD",
        "jsonPath": "cumulativeGDD",
        "request": buildQuery_GddDaysStation,
        "availableChart": "line",
        "axisLegend": "Cumulative Temperature (°C)",
        "displayUnit":"°C",
        "related":[],
    }, {
        "title": "Photothermal ratio (PTR)",
        "tooltip": "Photothermal quotient represents the cumulated radiation sum over the GDD on a period of time",
        "type": "GddRain",
        "param": "PTR",
        "jsonPath": "photothermalquotient",
        "request": buildQuery_DailyWaterDef,
        "availableChart": "line",
        "axisLegend": "coeff photothermique (J/(m²DD))",
        "displayUnit":"J/(m²DJ)",
        "related":[],
    }]
}, {
    "title": "Humidity Conditions", "items": [{
        "title": "Number of wet days (humidity>MaxHumidity)",
        "tooltip": "Number of wet days represents the number of days during which the humidity is higher than Max Humidity for a period",
        "type": "Numb",
        "param": "nbWetDays",
        "jsonPath": "nbWetDays",
        "request": buildQuery_nbStatsDaysStation,
        "availableChart": "POLAR",
        "axisLegend": " day(s)",
        "displayUnit":"day(s)",
        "related":[{
                    "title": "Wet frequencie",
                    "tooltip": "Percentage of Wet days over the period",
                    "type": "Numb",
                    "param": "wetFrequencie",
                    "jsonPath": "wetFrequencie",
                    "request": buildQuery_nbStatsDaysStation,
                    "availableChart": "table",
                    "axisLegend": "percentage",
                    "displayUnit":"%",
                    "related":[]
        
                }, {
                    "title":"High humidity",
                    "tooltip":"Number of spell of high humidity that lasted at least {Humidity Spell Duration} day (RH \> maxHum) ",
                    "type": "humidity",
                    "param": "nbHighHumiditySpell",
                    "jsonPath": "HighHum",
                    "request": buildQuery_consecutiveDaysHighHum,
                    "availableChart": "table",
                    "axisLegend": " day(s)",
                    "displayUnit":"nb spells",
                    "related":[]
                    }]
    }, {
        "title": "Number of dry days (humidity < minHumidity)",
        "tooltip": "Number of dry days represents the number of days during which the humidity is lower than Min Humidity for a period",
        "type": "Numb",
        "param": "nbDryDays",
        "jsonPath": "nbDryDays",
        "request": buildQuery_nbStatsDaysStation,
        "availableChart": "POLAR",
        "axisLegend": " day(s)",
        "displayUnit":"day(s)",
        "related":[{
                    "title": "Dry frequencie",
                    "tooltip": "Percentage of dry days over the period",
                    "type": "Numb",
                    "param": "dryFrequencie",
                    "jsonPath": "dryFrequencie",
                    "request": buildQuery_nbStatsDaysStation,
                    "availableChart": "table",
                    "axisLegend": "percentage",
                    "displayUnit":"%",
                    "related":[]
        
                }, {
                    "title":"Low humidity",
                    "tooltip":"Number of spell of low humidity that lasted at least {Humidity Spell Duration} day (RH \< minHum) ",
                    "type": "humidity",
                    "param": "nbLowHumiditySpell",
                    "jsonPath": "LowHum",
                    "request": buildQuery_consecutiveDaysLowHum,
                    "availableChart": "table",
                    "axisLegend": " day(s)",
                    "displayUnit":"nb spells",
                    "related":[]
                    } ]
    },]
}, {
    "title": "Water Deficit", "items": [{
        "title": "Number of precipitation days (rain > rainLevel)",
        "tooltip": "Number of precipitation days represents the number of days during which precipitation are higher than the precipitation limit for a period",
        "type": "Numb",
        "param": "nbRainyDays",
        "jsonPath": "nbRainyDays",
        "request": buildQuery_nbStatsDaysStation,
        "availableChart": "POLAR",
        "axisLegend": " day(s)",
        "displayUnit":"day(s)",
        "related":[{
                    "title": "Rain frequencie",
                    "tooltip": "Percentage of rainy days over the period",
                    "type": "Numb",
                    "param": "Rainfreq",
                    "jsonPath": "rainfreq",
                    "request": buildQuery_nbStatsDaysStation,
                    "availableChart": "table",
                    "axisLegend": "percentage",
                    "displayUnit":"%",
                    "related":[]
        
                }]
        }, {
        "title": "Number of days with water deficit (rain - ET0 < deficit threshold) ",
        "tooltip": "Number of rainless days represents the number of days during which the precipitation minus the evapotranspiratoin was lower than the deficit threshold for a period",
        "type": "Numb",
        "param": "nbDefDays",
        "jsonPath": "nbDefDays",
        "request": buildQuery_WaterDef,
        "availableChart": "POLAR",
        "axisLegend": " day(s)",
        "displayUnit":"day(s)",
        "related":[{
                    "title": "Water deficit days frequencie",
                    "tooltip": "Percentage of water deficit days over the period",
                    "type": "Numb",
                    "param": "waterDeficitFrequencie",
                    "jsonPath": "waterDeficitFrequencie",
                    "request": buildQuery_WaterDef,
                    "availableChart": "table",
                    "axisLegend": "percentage",
                    "displayUnit":"%",
                    "related":[]
        
                }, {
                    "title":"Max Consecutives Days",
                    "tooltip":"Max number of consecutives days for which (rain - evapotranspiration) \< deficit threshold ",
                    "type": "consecutive",
                    "param": "maxConsWaterDefDays",
                    "jsonPath": "maxConsDays",
                    "request": buildQuery_consecutiveDaysmaxConsDays,
                    "availableChart": "table",
                    "axisLegend": " day(s)",
                    "displayUnit":"days",
                    "related":[]
                    }]
    }, {
        "title":"Number of droughts waves",
        "tooltip":"Number of drought waves that lasted at least {drought Duration} day (precipitation \<= 0) ",
        "type": "rain",
        "param": "nbDroughtsWaves",
        "jsonPath": "DroughtWave",
        "request": buildQuery_consecutiveDaysDroughtWave,
        "availableChart": "table",
        "axisLegend": " day(s)",
        "displayUnit":"nb",
        "related":[]
    }, {
        "title": "Cumulative Precipitations",
        "tooltip": "Sum of all the precipitation over the period",
        "type": "precipitation",
        "param": "cumulativeRain",
        "jsonPath": "cprecip",
        "request": buildQuery_dailyCumulativeDeficit,
        "availableChart": "line",
        "axisLegend": "Cumulative    precipitation (mm)",
        "displayUnit":"mm",
        "related":[]
    }, {
        "title": "Sum of water deficit",
        "tooltip": "Sum of all the water deficit (RAIN-ET0) over the period",
        "type": "average",
        "param": "cumulativeWaterDeficit",
        "jsonPath": "sumwd",
        "request": buildQuery_StatsPeriod,
        "availableChart": "table",
        "axisLegend": "waterDeficit (mm)",
        "displayUnit":"mm",
        "related":[]
    }]

},{
    "title": "Wind days", "items":[{
        "title": "Number of Windy days (wind > wind threshold) ",
        "tooltip": "Number of windy days represents the number of days during which the wind was higher than the  wind threshold for a period",
        "type": "wind",
        "param": "nbWindyDays",
        "jsonPath": "nbWindyDays",
        "request": buildQuery_nbStatsDaysWindStation,
        "availableChart": "POLAR",
        "axisLegend": " day(s)",
        "displayUnit":"day(s)",
        "related":[{
                    "title": "Windy days frequencie",
                    "tooltip": "Percentage of windy days over the period",
                    "type": "wind",
                    "param": "windFrequencie",
                    "jsonPath": "windFrequencie",
                    "request": buildQuery_nbStatsDaysWindStation,
                    "availableChart": "table",
                    "axisLegend": "percentage",
                    "displayUnit":"%",
                    "related":[]
        
                }]
            }]
    }]
}]
