const ctx = document.getElementById("torque").getContext("2d");
const ctx2 = document.getElementById("speed").getContext("2d");
const ctx3 = document.getElementById("drag").getContext("2d");
let engine = [];
const step = 150;
const gearsNames = [
    "First",
    "Second",
    "Third",
    "Fourth",
    "Fifth",
    "Sixth",
    "Seventh",
];
const gearsColors = [
    "rgb(255, 0, 255)",
    "rgb(0, 0, 0)",
    "rgb(255, 0, 0)",
    "rgb(0, 255, 0)",
    "rgb(0, 0, 255)",
    "rgb(255, 255, 0)",
    "rgb(0, 255, 255)",
];

let gears = [];
let diameter = 0;

const reverseGear = document.getElementById("reverseGear");
const finalRatio = document.getElementById("finalRatio");
const profileRatio = document.getElementById("profileRatio");
const aspectRatio = document.getElementById("aspectRatio");
const rimDiameter = document.getElementById("rimDiameter");
const transmission = document.getElementById("transmission");
const dragCoeff = document.getElementById("dragCoefficient");
const frontArea = document.getElementById("frontArea");
const brand = document.getElementById("brand");
const model = document.getElementById("model");
const year = document.getElementById("year");
const doors = document.getElementById("doors");

const chart = new Chart(ctx, {
    type: "scatter",
    data: {
        datasets: [],
    },
    options: {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return [
                            context.dataset.label,
                            "RPM: " + Math.round(context.parsed.x) + " rev/min",
                            "Torque: " + Math.round(context.parsed.y) + " N.m",
                        ];
                    },
                },
            },
        },
        responsive: true,
        interaction: {
            mode: "nearest",
            axis: "x",
            intersect: false,
        },
        scales: {
            x: {
                min: 0,
                title: {
                    display: true,
                    text: "RPM",
                },
            },
            y: {
                min: 0,
                title: {
                    display: true,
                    text: "Torque N.m",
                },
            },
        },
    },
});

const chart2 = new Chart(ctx2, {
    type: "scatter",
    labels: [],
    data: {
        datasets: [],
    },
    options: {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return [
                            context.dataset.label,
                            "Speed: " + Math.round(context.parsed.x) + " km/h",
                            "Torque: " + Math.round(context.parsed.y) + " N.m",
                        ];
                    },
                },
            },
        },
        responsive: true,
        interaction: {
            mode: "nearest",
            axis: "x",
            intersect: false,
        },
        scales: {
            x: {
                min: 0,
                title: {
                    display: true,
                    text: "Speed (km/h)",
                },
            },
            y: {
                min: 0,
                title: {
                    display: true,
                    text: "Torque N.m",
                },
            },
        },
    },
});

const chart3 = new Chart(ctx3, {
    type: "line",
    data: {
        labels: [],
        datasets: [{
            label: "Air drag",
            data: [],
            fill: false,
            borderColor: "rbg(255, 0, 0)",
            tension: 0.1,
            showLine: true,
            pointRadius: 0,
        }, ],
    },
    options: {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return [
                            "Speed: " + Math.round(context.parsed.x) + " km/h",
                            "Drag: " + Math.round(context.parsed.y) + " N",
                        ];
                    },
                },
            },
        },
        responsive: true,
        interaction: {
            mode: "nearest",
            axis: "x",
            intersect: false,
        },
        scales: {
            x: {
                min: 0,
                title: {
                    display: true,
                    text: "Speed (km/h)",
                },
            },
            y: {
                min: 0,
                title: {
                    display: true,
                    text: "Drag (N)",
                },
            },
        },
    },
});

$(".container").on("paste keyup", "input", function(e) {
    if (!$(this).is("[notNumber]")) {
        var charCode = e.which ? e.which : e.keyCode;
        if (charCode != 110 && charCode != 188)
            $(this).val(
                $(this)
                .val()
                .replace(/[^0-9.,]/g, "")
            );
        $(this).val($(this).val().replace(/,/g, "."));
    }
});

function calcGear(ratio) {
    let result = [];
    const fr = finalRatio.value || 1;
    engine.forEach((el) => {
        result.push({
            x: el.x / ratio / fr,
            y: el.y * ratio * fr,
        });
    });
    return result;
}

function calcSpeed(ratio) {
    let result = [];
    const fr = finalRatio.value || 1;
    engine.forEach((el) => {
        result.push({
            x: ((el.x / ratio / fr) * diameter * Math.PI * 60) / 1000,
            y: el.y * ratio * fr,
        });
    });
    return result;
}

function calcDrag(speed) {
    speed = (speed * 1000) / 3600;
    return (1.225 * speed * speed * dragCoeff.value * frontArea.value) / 2;
}

function update() {
    diameter =
        ((((profileRatio.value || 1) * (aspectRatio.value || 1)) / 2540) * 2 +
            (parseInt(rimDiameter.value) || 1)) *
        0.0254;

    engine = [];
    gears = [];
    $.each($(".gear"), function() {
        gears.push($(this));
    });
    $.each($(".engineDt"), function() {
        const input = $(this).find("input");
        engine.push({
            x: parseFloat(input.eq(0).val()),
            y: parseFloat(input.eq(1).val()),
        });
    });
    chart.data.datasets = [];
    chart.data.datasets.push({
        label: "Engine",
        data: engine,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        showLine: true,
    });
    for (i = 0; i < gears.length; i++) {
        chart.data.datasets.push({
            label: gearsNames[i] + " gear",
            data: calcGear(gears[i].val() || 1),
            fill: false,
            borderColor: gearsColors[i],
            tension: 0.1,
            showLine: true,
        });
    }
    chart.update();
    chart2.data.datasets = [];
    for (i = 0; i < gears.length; i++) {
        chart2.data.datasets.push({
            label: gearsNames[i] + " gear",
            data: calcSpeed(gears[i].val() || 1),
            fill: false,
            borderColor: gearsColors[i],
            tension: 0.1,
            showLine: true,
        });
    }
    chart2.update();
    chart3.data.labels = [];
    chart3.data.datasets[0].data = [];
    for (i = 0; i <= 150; i++) {
        chart3.data.datasets[0].data.push(calcDrag(i));
        chart3.data.labels.push(i.toString());
    }
    chart3.update();
}

function addGear() {
    const id = $(".gear").length;
    if (id < 7) {
        $("#gears").append(`<label for="gear${id + 1}">${
      gearsNames[id]
    } gear</label>
					<input type="text" class="gear" id="gear${id + 1}" value="1">`);
    }
}

function removeGear() {
    const id = $(".gear").last().attr("id");
    $(".gear").last().remove();
    $("label[for='" + id + "']").remove();
}

function addEngineData() {
    const id = $(".engineDt").length;
    $("#engin-data").append(`
		<div class="engineDt" style="display: flex; flex-direction: row;" id="engineDt${
      id + 1
    }">
			<div>
			<input type="text" value="1000">
			</div>
			<div>
			<input type="text" value="20">
			</div>
			<button onclick="removeEngineData(${id + 1})">X</button>
		</div>`);
}

function removeEngineData(id) {
    $("#engineDt" + id).remove();
}

function exportData() {
    const dt = {
        engine: {
            graph: [],
            minRpm: 0,
            maxRpm: 0,
        },
        tire: {
            width: parseInt(profileRatio.value) || 1,
            ratio: parseInt(aspectRatio.value) || 1,
            diameter: parseInt(rimDiameter.value) || 1,
        },
        transmission: parseInt(transmission.value),
        gears: [],
        reverseGear: parseFloat(reverseGear.value),
        finalRatio: parseFloat(finalRatio.value),
        aerodynamics: {
            drag: parseFloat(dragCoeff.value),
            frontArea: parseFloat(frontArea.value),
        },
        infos: {
            model: model.value,
            brand: brand.value,
            year: year.value,
            doors: Math.round(parseFloat(doors.value)) || 5,
        },
    };
    let min = engine.length > 0 ? engine[0].x : 0,
        max = 0;
    engine.forEach((el) => {
        if (el.x < min) min = el.x;
        if (el.x > max) max = el.x;
    });
    dt.engine.minRpm = min;
    dt.engine.maxRpm = max;
    $.each($(".gear"), function() {
        dt.gears.push(parseFloat($(this).val()));
    });
    $.each($(".engineDt"), function() {
        const input = $(this).find("input");
        dt.engine.graph.push({
            x: parseFloat(input.eq(0).val()),
            y: parseFloat(input.eq(1).val()),
        });
    });
    var dataStr =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(dt, null, 4));
    var dlAnchorElem = document.getElementById("downloadAnchorElem");
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "settings.json");
    dlAnchorElem.click();
}

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    };
    rawFile.send(null);
}

function loadData(data) {
    engine = data.engine.graph;
    reverseGear.value = data.reverseGear || 1;
    finalRatio.value = data.finalRatio || 1;
    transmission.value = data.transmission || 0;
    dragCoeff.value = data.aerodynamics.drag || 0.5;
    frontArea.value = data.aerodynamics.frontArea || 1;
    year.value = data.infos.year || 2022;
    doors.value = data.infos.doors || 5;
    model.value = data.infos.model || "";
    brand.value = data.infos.brand || "";
    if (data.tire) {
        profileRatio.value = data.tire.width || 1;
        aspectRatio.value = data.tire.ratio || 1;
        rimDiameter.value = data.tire.diameter || 1;
    }
    $("#gears").empty();
    for (i = 0; i < data.gears.length; i++) {
        $("#gears").append(`<label for="gear${i + 1}">${gearsNames[i]} gear</label>
				<input type="text" class="gear" id="gear${i + 1}" value="${data.gears[i]}">`);
    }
    $("#engin-data").empty();
    for (i = 0; i < data.engine.graph.length; i++) {
        $("#engin-data").append(`
	<div class="engineDt" style="display: flex; flex-direction: row;" id="engineDt${
    i + 1
  }">
		<div>
		<input type="text" value="${data.engine.graph[i].x}">
		</div>
		<div>
		<input type="text" value="${data.engine.graph[i].y}">
		</div>
		<button onclick="removeEngineData(${i + 1})">X</button>
	</div>`);
    }
    update();
}

$("#file").on("change", function(e) {
    var file = e.target.files[0];
    var path = (window.URL || window.webkitURL).createObjectURL(file);
    readTextFile(path, function(text) {
        loadData(JSON.parse(text));
    });
});

function loadFromUrl(url) {
    fetch(url)
        .then((res) => res.json())
        .then((out) => loadData(out))
        .catch((err) => alert(err));
}