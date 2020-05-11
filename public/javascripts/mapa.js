console.log("Start");

var mymap = L.map('mapid').setView([38.7763839, -9.2649320], 13);

window.onload = function () {

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiZHJhZmFlbCIsImEiOiJja2ExcXJtYzUwMzFpM2xtbHNzcGxuaXd0In0.N0bGCdImHJxqCmxpiEF7mA'
    }).addTo(mymap);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(mymap);

}

function rota(position) {

    $.ajax({
        url: '/api/mapaInfo',
        method: 'get',
        contentType: "application/json",
        dataType: "json",
        success: function (res, status) {

            for (i in res) {
                console.log(res[i]);
                L.Routing.control({
                    waypoints: [
                        L.latLng(res[i].prodOrigem_lat, res[i].prodOrigem_long),
                        L.latLng(res[i].prodDestino_lat, res[i].prodDestino_long)
                    ],
                    routeWhileDragging: false,
                    draggableWaypoints: false,
                    addWaypoints: false,
                }).addTo(mymap);
            }
        }
    })
}

//---------------------------------------------------------------
/*
console.log("Start");

var ptId = sessionStorage.getItem("ptId");
var cliId = sessionStorage.getItem("cliId");
var mymap = L.map('mapid').setView([38.7763839, -9.2649320], 13);

window.onload = function () {

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiZHJhZmFlbCIsImEiOiJjazJxMnBlb3IwNzg3M25tb21ncjZzNmRrIn0.5qpXqrTCKD6ouYStFOHygA'
    }).addTo(mymap);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(mymap);

    ptInfo();
    getLocalizacao()

}


//Função que recebe a posição actual do cliente e 
function getLocalizacao() {
    navigator.geolocation.getCurrentPosition(rota);
}

//Função 
function rota(position) {

    $.ajax({
        url: '/api/utilizadores/personalTrainers/' + ptId,
        method: 'get',
        contentType: "application/json",
        dataType: "json",
        success: function (res, status) {

            for (i in res) {
                console.log(res[i]);
                L.Routing.control({
                    waypoints: [
                        L.latLng(res[i].pts_lat, res[i].pts_long),
                        L.latLng(position.coords.latitude, position.coords.longitude)
                    ],
                    routeWhileDragging: false,
                    draggableWaypoints: false,
                    addWaypoints: false,
                }).addTo(mymap);
            }
        }
    })
}*/
