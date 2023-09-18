/**
 * Allows you to clean the data to a format :
 * {
 *   "values": [{
 *       "stationName": "NICE",
 *       "date": "2021-12-01",
 *       "temp_avg": 8.8,
 *       "temp_min": 4.4,
 *       "temp_max": 13.2,
 *       "temp_diff": 8.8,
 *       "rainfall": "0"
 *     }]
 * }
 *
 * @param inputData
 * @returns {{values: []}}
*/

export function transformData(inputData) {
    const outputData = {
        "values": []
    };
    const inputBindings = inputData.results.bindings;
    inputBindings.forEach((inputBinding) => {
        const outputBinding = {};
        Object.keys(inputBinding).forEach((key) => {
            outputBinding[key] = inputBinding[key].value;
            if (inputBinding[key].datatype === "http://www.w3.org/2001/XMLSchema#double") {
                outputBinding[key] = parseFloat(outputBinding[key]);
            }
        });
        outputData.values.push(outputBinding);
    });

    return outputData;
}


