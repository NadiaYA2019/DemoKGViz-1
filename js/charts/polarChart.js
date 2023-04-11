let indexType = new Map();

indexType.set("nbRainDay", 3);
indexType.set("frostDays", 0);
indexType.set("iceDays", 2);
indexType.set("summerDays", 4);
indexType.set("heatDays", 1);

indexType.set("nbWetDays", 5);
indexType.set("highWind", 6);




function drawPolarChart(data, canvasElement) {


    const ctx = canvasElement.getContext('2d');
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);

    const polarChart = new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: data.labels,
            datasets: data.values
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Chart.js Line Chart'
          }
    }
    });
    return polarChart;
}

function updatepolarChart(polarChart, type) {

    let indexes = [];
    type.forEach((param) => {
        indexes.push(indexType.get(param));
    });
    //remove duplicates
    // there is 5 elements in the chart, hide all that or not in the indexes array

    console.log(indexes);
    for(let i = 0; i < 7; i++) {
        if(!indexes.includes(i)) {
            //console.log("hide " + i);
            hidePolarData(polarChart, i);
        }
        else {
            //console.log("show " + i);
            showPolarData(polarChart, i);
        }
    }
    polarChart.update();
}

function hidePolarData(chart, index) {
    if(chart.getDataVisibility(index))
        chart.toggleDataVisibility(index);
}

function showPolarData(chart, index) {
    if(!chart.getDataVisibility(index))
        chart.toggleDataVisibility(index);
}
