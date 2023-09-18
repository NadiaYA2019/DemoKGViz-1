import Papa from 'papaparse';

function setProperties(parameters) {
    let properties = [];
    for (let parameter in parameters) {
    	const availableChart = parameters[parameter].availableChart;
        if (availableChart === "line" || availableChart === 'bar') {
        	properties.push({
            	title: parameters[parameter].param,
                jsonPath: parameters[parameter].jsonPath,
                type: parameters[parameter].availableChart,
                axisLegend: parameters[parameter].axisLegend,
                queryMethod: parameters[parameter].request.name,
                unit: parameters[parameter].displayUnit
            })
        }
    }
    return properties;
}

export function getDailyValues(json,parameters){
	let properties = setProperties(parameters)
	let result = [];
    for (let attribute of properties.concat({
     	jsonPath: "date",})) {

            let values = [];
            let attributes = [];
            if (attribute.jsonPath === "date") {
				attributes = json[0].result.values;
            } else {
            	let temp = json.find(value => value.queryMethod === attribute.queryMethod)
                if (temp!=undefined){
                	attributes = temp.result.values;
                }
            }

            for (let valueObj of attributes) {
            	let value = valueObj[attribute.jsonPath];
                values.push({"station": valueObj['stationName'], "value": value});
            }

            values.forEach(item => {
            	const existingItem = result.find(outputItem => outputItem.station === item.station);

                if (existingItem) {
                	existingItem.data.push({"attribute": attribute.jsonPath, "value": item.value});
                } else {
                	result.push({
                    	station: item.station,
                        data: [{"attribute": attribute.jsonPath, "value": item.value}]
					});
                }
            });
	}
    return result;
}


function mergeWeatherData(weatherArray,properties) {
    let parameters = []
    properties.forEach((property) => parameters.push(property.jsonPath))
    const mergedData = [];
        weatherArray.forEach(weather => {
            weather.forEach(item => {
                if ("date" in item) {
                    const existingItem = mergedData.find(
                        mergedItem => mergedItem.date === item.date && mergedItem.stationName === item.stationName
                    );
                    if (existingItem) {
                    Object.keys(item).forEach(key => {
                        if (key !== 'date' && key !== 'stationName' && !existingItem.hasOwnProperty(key)) {
                            existingItem[key] = item[key];
                        }
                    });
                } else {
                    let tempItem = {
                        stationName: item.stationName,
                        date:item.date
                    }
                    parameters.forEach((parameter)=>tempItem[parameter] = item[parameter])
                

                    mergedData.push(tempItem);
                }
            }
  
        });
    });
    return mergedData;
}


function mergeGlobal(weather,properties){
    const parameters = properties.map((item)=> item.jsonPath)
    const flattenedArray = weather.map(proxyObj => [...proxyObj]);
    weather = flattenedArray.flat();
    const merged = [];
    weather.forEach((item)=>{
        const existing = merged.find((mergedItem)=>mergedItem.stationName=== item.stationName)
        if(existing){
            Object.keys(item).forEach(key => {
                if(parameters.includes(key)){
                    existing[key] = item[key]
                }
            })
        } else {
            let tempItem = {
                stationName: item.stationName,
            }
            Object.keys(item).forEach(key => {
                if(parameters.includes(key)){
                    tempItem[key] = item[key]
                }
            })

            merged.push(tempItem)
        }
    }) 
    return merged

}


export function getDaily(weather,properties){
    return mergeWeatherData(weather,properties)
    } 
export function getGlobal(weather, properties){
    let weatherBis = weather.filter((item)=> !Object.keys(item.result.values[0]).includes("date"))
    weatherBis = weatherBis.map(obj=>obj.result.values)
    const result =mergeGlobal(weatherBis,properties)
    return result
}

export function downloadFile(content, fileName, fileType){
    // Create a Blob object from the content with the specified file type
    const blob = new Blob([content],{type: fileType});

    // Create a URL for the blob object
    const url = URL.createObjectURL(blob);

    // Create an <a> element for the download
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;

    // Simulate a click on the link to trigger the download
    link.click();
    // Clean up the object URL after the download
    URL.revokeObjectURL(url);
}

function downloadData(extension, extensionType, data,name) {
    downloadFile(
        (extensionType === 'json') ? JSON.stringify(data) : Papa.unparse(data),
        name+"." + extensionType,
        "text/plain");
}

export function downloadDaily(weather,properties,extension,extensionType){
    downloadData(extension,extensionType,getDaily(weather,properties),"daily")
}

export function downloadGlobal(weather,properties,extension,extensionType){
    downloadData(extension,extensionType,getGlobal(weather,properties),"global")
}