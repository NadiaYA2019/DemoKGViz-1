export const isParameterTypeDataAlreadyFetch = (parameters, parameter) => {
    const foundTypeData = parameters.find(p => p.type === parameter.type);
    return !!foundTypeData
}

export function groupRequestsByParam(requests) {
    return [...new Set(requests.map(item => item.request))]
}

export function reloadChart(context) {
    // Reload chart data

    // if comparison is active, then use getComparisonDate, else use getStartDate...

    for (let fonction of groupRequestsByParam(context.getters.getParameters)) {
        context.dispatch("setWeather", {
            query: fonction(
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
                context.getters.getURLStations),
            queryMethod: fonction.name,
            nbDays:{
                spellFrost:context.getters.getSpellFrost,
                spellHeat:context.getters.getSpellHeat,
                spellHum:context.getters.getSpellHum,
                droughtWave:context.getters.getDroughtWave
            }
        });
    }
}
