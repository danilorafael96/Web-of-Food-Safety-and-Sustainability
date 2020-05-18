console.log("Start");

var mymap = L.map('mapid').setView([38.7763839, -9.2649320], 3);
var origem = document.getElementById('origem');
var destino = document.getElementById('destino');
var tipoTransporte = document.getElementById('tipoTransporte');


window.onload = function () {

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiZHJhZmFlbCIsImEiOiJja2ExcXJtYzUwMzFpM2xtbHNzcGxuaXd0In0.N0bGCdImHJxqCmxpiEF7mA'
    }).addTo(mymap);

    rota();
    filtros();
}

function rota() {

    $.ajax({
        url: '/api/mapaInfo',
        method: 'get',
        contentType: "application/json",
        dataType: "json",
        success: function (res, status) {

            var marker1;
            var marker2;
            var marker3;
            
            for (i in res) {
                console.log(res[i]);

                // create a red polyline from an array of LatLng points
                var latlngs = [
                    [res[i].local_cidadeOLat, res[i].local_cidadeOLong],
                    [res[i].localParagem_cidadeLat, res[i].localParagem_cidadeLong],
                    [res[i].local_cidadeDLat, res[i].local_cidadeDLong]
                ];

                var options={color: 'red'};
                var polyline = L.polyline(latlngs,options ).addTo(mymap);
                // zoom the map to the polyline
                mymap.fitBounds(polyline.getBounds());

                marker1=L.marker([res[i].local_cidadeOLat, res[i].local_cidadeOLong]);
                marker1.addTo(mymap).bindPopup("<p>Origem:"+res[i].local_cidadeOrigem+"</br>Data de produção:"+res[i].prod_dataProducao+"</br>Data de validade:"+res[i].prod_dataValidade+"</p>").openPopup();

                marker2=L.marker([res[i].localParagem_cidadeLat, res[i].localParagem_cidadeLong]);
                marker2.addTo(mymap).bindPopup("<p>Paragem:"+res[i].localParagem_cidade+"</p>").openPopup();

                marker3=L.marker([res[i].local_cidadeDLat, res[i].local_cidadeDLong]);
                marker3.addTo(mymap).bindPopup("<p>Destino:"+res[i].local_cidadeDestino+"</p>").openPopup();
            }
        },
		error: function (jqXHR, errStr, errThrown) {
			console.log(errStr);
		}
    })
}

function filtros() {

    $.ajax({
        url: '/api/mapaInfo',
        method: 'get',
        contentType: "application/json",
        dataType: "json",
        success: function (res, status) {
            var html1;
            var html2;
            var html3;

            for (i in res){
                html1+="<option value=''>"+res[i].local_cidadeOrigem+"</option>";
                html2+="<option value=''>"+res[i].local_cidadeDestino+"</option>";
                html3+="<option value=''>"+res[i].tipoTransp_nome+"</option>";
            }

            origem.innerHTML=html1;
            destino.innerHTML=html2;
            tipoTransporte.innerHTML=html3;
        },
		error: function (jqXHR, errStr, errThrown) {
			console.log(errStr);
		}
    })
}