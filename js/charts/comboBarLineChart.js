function drawComboChart(data, canvasElement) {

    

    console.log(data.date);
    console.log(data.values);

    const ctx = canvasElement.getContext('2d');
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);

    const comboChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.date,
            datasets: data.values
        },
        options: {
            responsive: true,
            tooltips: {
                mode: 'index',
                intersect: true,
                callbacks: {
                    label: function(tooltipItem, data) {
                        var label = data.datasets[tooltipItem.datasetIndex].label || '';
                        console.log(tooltipItem,data,label);
                        if (label) {
                            label += ': bonjour ';
                        }
                        label += Math.round(tooltipItem.yLabel * 100) / 100;
                        return label;
                    }
                }
            },
            
        }
    });
    return comboChart;
}

function updateComboChart(comboChart, type) {
    //comboChart.data.labels = data.date;
    //comboChart.data.datasets = data.value;
 
    //for each element in type array
    // set hiden to false
    // else set hiden to true

    comboChart.data.datasets.forEach((dataset) => {
        console.log(type)
        if(type.includes(dataset.id)) {
            dataset.hidden = false;
        } else {
            dataset.hidden = true;
        }
    });
    // a revoir il faudrait associer un id à plusieurs type dans le html
    if(types.get("TmpRain").includes("rainDay")){
        comboChart.data.datasets.find(dataset => dataset.id === "rainDay").hidden = false;
    }
    comboChart.update();
    console.log("updateComboChart");
}