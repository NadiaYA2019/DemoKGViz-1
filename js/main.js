SPARQL =  function(o) {
    this.query = function(q) {
        return $.ajax({
            url: o.endpoint,
            accepts: {json: "application/sparql-results+json"},
            data: {query: q, apikey: o.apikey},
            dataType: "json",
            method: "POST",
        });
    };

    this.queryTurtle = function(q) {
        return $.ajax({
            url: o.endpoint,
            accepts: {turtle: "text/turtle"},
            data: {query: q, apikey: o.apikey},
            method: "POST",
        });
    }

    this.queryCSV = function(q) {
        return $.ajax({
            url: o.endpoint,
            accepts: {csv: "text/csv"},
            data: {query: q, apikey: o.apikey},
            method: "POST",
        });
    }
};




var endpoint = new SPARQL({ 
    apikey: "YOUR-API-KEY-HERE", 
    endpoint: "https://weakg.i3s.unice.fr/sparql"
    //endpoint: "http://localhost:8890/sparql"
});





function stationLoad() {

    var option = document.createElement("option");
    option.text = "--Please choose an option--";
    document.getElementById("select-station").appendChild(option);

    endpoint.query(listWeatherStation()).done((json) => {
        stationnames = json.results.bindings.map(d => d.name.value)
        stationnames.forEach(element => {
            option = document.createElement("option");
            option.value = element;
            option.text = element.charAt(0).toUpperCase() + element.slice(1);
            document.getElementById("select-station").appendChild(option);
        });
        //stationChanged();
        endpoint.query(buildQuery_station()).done(onSuccessStation);
    });
}





var textStation, valueStation
function stationChanged() {
    let selectStation;
    selectStation = document.getElementById("select-station");
    textStation = selectStation.options[selectStation.selectedIndex].text;
    valueStation = selectStation.options[selectStation.selectedIndex].value;
    endpoint.query(buildQuery_station()).done(onSuccessStation);
    document.getElementById("localisation-choose").innerHTML = "Station selected : " + textStation;

    //clear all data
    dataCalc.clear();
    //clear all graphs
    types.forEach(async(value, key) => {
        //check if there is values
        if(value.length > 0){
            const canvasElement = document.getElementById(key);
            const ctx = canvasElement.getContext('2d');
            ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
            if(graphLoaded.has(key)){
                graphLoaded.get(key).destroy();
                graphLoaded.delete(key);
            }
            await updateData(key);
            updateGraph(key);
        }
    });
}

var types = new Map();

types.set("TmpRain", []);
types.set("GddRain", []);
types.set("Numb", []);
//types.set("RainDay", []);


var parameters = [];

async function checkParameters([type,param]) {
    if(document.getElementById(param).checked) {
        parameters.push(param);
        types.get(type).push(param);
    } else {
        parameters = parameters.filter(function(item) {
            return item !== param;
        });
        types.get(type).splice(types.get(type).indexOf(param), 1);
    }
    document.getElementById("parameters-choose").innerHTML = "Parameters selected : " + parameters;

    await updateData(type);
    updateGraph(type);
}

var startDate = "2016-01-01";
var endDate = "2021-12-31";
function dateChanged() {
    startDate = (document.getElementById("start").value);
    endDate = (document.getElementById("end").value);
    document.getElementById("start").max = endDate;
    document.getElementById("end").min = startDate;
    document.getElementById("date-choose").innerHTML = "Start: " + startDate + "</br>End: " + endDate;

    //clear all data
    dataCalc.clear();
    //clear all graphs
    types.forEach(async(value, key) => {
        const canvasElement = document.getElementById(key);
        const ctx = canvasElement.getContext('2d');
        ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        if(graphLoaded.has(key)){
            graphLoaded.get(key).destroy();
            graphLoaded.delete(key);
            await updateData(key);
            updateGraph(key);
        }
    });
}

//map that contains data for each type of graph
var dataCalc = new Map();

async function updateData(type) {
    if(dataCalc.get(type) == undefined) {
        //if not, load it
        await endpoint.query(queries.get(type)(textStation,startDate,endDate)).done((json) => {
            let data = json.results.bindings;
            console.log(data);
            data = formatData(type,data);
            dataCalc.set(type, data);
            console.log(data);
        });
    }
}

var graphLoaded = new Map();

var graphType = new Map();

graphType.set("TmpRain", [drawComboChart,updateComboChart]);
graphType.set("GddRain", [drawComboChart,updateComboChart]);
graphType.set("Numb", [drawPolarChart,updatepolarChart]);

async function updateGraph(type) {
    if(graphLoaded.get(type) == undefined) {
        //check if there is parameters selected
        if(types.get(type).length == 0) {
            return;
        }
        console.log("load graph");
        const canvasElement = document.getElementById(type);
        //let c = drawComboChart(dataCalc.get(type),canvasElement);
        document.getElementsByClassName("chart-container-" + type)[0].style.width = "100%";

        document.getElementsByClassName("chart-container-" + type)[0].style.height = "50vh";


        let c = graphType.get(type)[0](dataCalc.get(type),canvasElement);
        //updateComboChart(c,types.get(type));
        graphType.get(type)[1](c,types.get(type));

        graphLoaded.set(type, c);
    } else {
        //if yes, update the graph
        //check if there is parameters selected
        if(types.get(type).length == 0) {
            const canvasElement = document.getElementById(type);
            const ctx = canvasElement.getContext('2d');
            ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
            graphLoaded.get(type).destroy();
            graphLoaded.delete(type);
           document.getElementsByClassName("chart-container-" + type)[0].style.width = "0%";

           document.getElementsByClassName("chart-container-" + type)[0].style.height = "0vh";


            return;
        }
        //updateComboChart(graphLoaded.get(type),types.get(type));
        graphType.get(type)[1](graphLoaded.get(type),types.get(type));
    }
}

function formatData(type,data) {
    if(type == "TmpRain") {
        return formatDataTmpRain(data);
    }
    else if(type == "GddRain") {
        return formatDataGddRain(data);
    }
    else if(type == "Numb") {
        return formatDataNumb(data);
    }
    else if(type == "Numb") {
        return formatDataNumb(data);
    }

    console.log("formatData");
}

function formatDataTmpRain(data) {
    let d = {
        date: [],
        values: []
    }

    //for each element in the data array
    data.forEach(element => {
        //add the date to the date array
        d.date.push(element.date.value);
    });

    let temp_avg_data = [];
    data.forEach(element => {
        temp_avg_data.push(element.temp_avg.value);
    });
    let temp_min_data = [];
    data.forEach(element => {
        temp_min_data.push(element.temp_min.value);
    });
    let temp_max_data = [];
    data.forEach(element => {
        temp_max_data.push(element.temp_max.value);
    }
    );
    let rainfall_data = [];
    data.forEach(element => {
        rainfall_data.push(element.rainfall.value);
    });

    d.values.push({
        type: "line",
        label: "Daily mean temperature (°C)",
        data: temp_avg_data,
        backgroundColor: "rgba(255, 159, 64, 0)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
        id : "TMean"
    });
    //rgba blue



    d.values.push({
        type: "line",
        label: "Daily minimum temperature (°C)",
        data: temp_min_data,
        backgroundColor: "rgba(40, 67, 135, 0)",
        borderColor: "rgba(40, 67, 135, 1)",
        borderWidth: 1,
        id : "TMin"
    });
    //rgba red

    d.values.push({
        type: "line",
        label: "Daily maximum temperature(°C)",
        data: temp_max_data,
        backgroundColor: "rgba(255, 99, 132, 0)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        id : "TMax"
    });

    d.values.push({
        type: "bar",
        label: "Precipitations (mm)",
        data: rainfall_data,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        id : "rainDay"
    });
    return d;
}

function formatDataGddRain(data) {
    let d = {
        date: [],
        values: []
    }

    //for each element in the data array
    data.forEach(element => {
        //add the date to the date array
        d.date.push(element.date.value);
    });

    let gdd_data = [];
    data.forEach(element => {
        gdd_data.push(element.gdd.value);
    });

    let rainfall_data = [];
    data.forEach(element => {
        rainfall_data.push(element.rainfall.value);
    });

    let sum_gdd_data = [];
    //calculate the sum of gdd and add it to the array
    let sum = 0;
    gdd_data.forEach(element => {
        //convert the string to a number
        sum += parseFloat(element);
        sum_gdd_data.push(sum);
    });

    let sum_rainfall_data = [];
    //calculate the sum of rainfall and add it to the array
    sum = 0;
    rainfall_data.forEach(element => {
        sum += parseFloat(element);
        sum_rainfall_data.push(sum);
    });

    d.values.push({
        type: "line",
        label: "Accumulated Gdd (°C)",
        data: sum_gdd_data,
        backgroundColor: "rgba(255, 99, 132, 0)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        id : "sumGdd"
    });

    d.values.push({
        type: "line",
        label: "Cumulative Precipitation (mm)",
        data: sum_rainfall_data,
        backgroundColor: "rgba(54, 162, 235, 0)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        id : "sumRain"
    });

    d.values.push({
        type: "bar",
        label: "Gdd (°C)",
        data: gdd_data,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        id : "Gdd"
    });

    d.values.push({
        type: "bar",
        label: "Precipitations (mm)",
        data: rainfall_data,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        id : "rainDay"
    });
    return d;
}

function formatDataNumb(data) {
    let d = {
        labels: ['Frost days', 'Rainy days', 'Heat days', 'Summer days', 'Wet days','High wind days'],
        values: []
    }

    let numbers = [];
    //iterate over the data[0] object
    for (let key in data[0]) {
        //check if the key is a number
        if (data[0][key].type === "typed-literal" && data[0][key].datatype === "http://www.w3.org/2001/XMLSchema#integer") {
            //add the number to the numbers array
            numbers.push(data[0][key].value);
        }
    }

    d.values.push(
        {
            label: ['Number of days '],
            data: numbers,
            backgroundColor: [
                'rgba(0, 0, 255, 0.2)',

                'rgba(0, 150, 255, 0.2)',

                'rgba(255, 145, 145, 0.2)',

                //'rgba(0, 255, 255, 0.2)',

                'rgba(255, 0, 0, 0.2)',

                'rgba(90, 120, 110, 0.2)',

                'rgba(0, 160, 0, 0.2)',

            ],
            borderColor: [
                'rgba(0, 0, 255, 1)',

                'rgba(0, 150, 255, 1)',

                'rgba(255, 145, 145, 1)',

                //'rgba(0, 255, 255, 1)',

                'rgba(255, 0, 0, 1)',

                'rgba(90, 120, 110, 1)',

                'rgba(0, 160, 0, 1)',

            ],
            borderWidth: 1
        }
    );

    return d;
}

function createFileRDF(stationName, startDate, endDate) {
    console.log("stationName: " + stationName + " startDate: " + startDate + " endDate: " + endDate) 
    endpoint.queryTurtle(buildQuery_extractRDF(stationName, startDate, endDate)).done((turtle) => {
        // console.log(turtle);
        downloadFileRDF(turtle);
    });
}

function downloadFileRDF(text) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', 'export.txt');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}



function createFileJSON(stationName, startDate, endDate) {
    console.log("stationName: " + stationName + " startDate: " + startDate + " endDate: " + endDate) 
    endpoint.query(buildQuery_extractData(stationName, startDate, endDate)).done((json) => {
        json = JSON.stringify(json, null, 2);
        // console.log(json);
        downloadFileJSON(json);
    });
}


function downloadFileJSON(text) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', 'export.json');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function createFileCSV(stationName, startDate, endDate) {
    console.log("stationName: " + stationName + " startDate: " + startDate + " endDate: " + endDate) 
    endpoint.queryCSV(buildQuery_extractData(stationName, startDate, endDate)).done((csv) => {
        console.log(csv);
        downloadFileCSV(csv);
    });
}

function downloadFileCSV(text) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', 'export.csv');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}