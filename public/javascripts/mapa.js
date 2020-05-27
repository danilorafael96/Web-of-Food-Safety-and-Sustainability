console.log("Start");

var mymap = L.map('mapid');
var origem = document.getElementById('origem');
var o;
var destino = document.getElementById('destino');
var d;
var dataProducao = document.getElementById('dataProducao');
var dp;
var submete=document.getElementById('submete');
var cidadeCoord=[];
var trajetos=[];

window.onload = function () {

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiZHJhZmFlbCIsImEiOiJja2ExcXJtYzUwMzFpM2xtbHNzcGxuaXd0In0.N0bGCdImHJxqCmxpiEF7mA'
    }).addTo(mymap);

    filtros();
}

function filtros() {

    $.ajax({
        url: '/api/mapaInfo/filtro',
        method: 'get',
        contentType: "application/json",
        dataType: "json",
        success: function (res, status) {
            var html1;
            var html2;
            var html3;
            var html4;

            for (i in res){
                var a={"cidade":res[i].local_cidadeOrigem,
                    "lat":res[i].local_cidadeOLat,
                    "long":res[i].local_cidadeOLong
                };

                var b={"cidade":res[i].local_cidadeDestino,
                    "lat":res[i].local_cidadeDLat,
                    "long":res[i].local_cidadeDLong
                };

                cidadeCoord.push(a,b);
                trajetos.push(res[i]);

                html1+="<option value="+res[i].local_cidadeOrigem+">"+res[i].local_cidadeOrigem+"</option>";
                html2+="<option value="+res[i].local_cidadeDestino+">"+res[i].local_cidadeDestino+"</option>";
                html3+="<option value="+res[i].prod_dataProducao+">"+res[i].prod_dataProducao+"</option>";
                html4="<input type='submit' onclick='recebeFiltro()'>"
            }

            origem.innerHTML=html1;
            destino.innerHTML=html2;
            dataProducao.innerHTML=html3;
            submete.innerHTML=html4;
        },
		error: function (jqXHR, errStr, errThrown) {
			console.log(errStr);
		}
    })
}

function getCidadesCoord(cidade){
    for (i in cidadeCoord){
        if (cidade==cidadeCoord[i].cidade){
            var coord=[cidadeCoord[i].lat,cidadeCoord[i].long];
            return coord;
        }
    }
}

function checkTrajetos(origem,destino){
    for(i in trajetos){
        if (origem==trajetos[i].local_cidadeOrigem && destino==trajetos[i].local_cidadeDestino){
            return true;
        }
    }
    return false;
}

function recebeFiltro(){
    console.log(cidadeCoord);

    mymap.invalidateSize();

    o=document.getElementById('origem').value;
    document.getElementById('teste1').innerHTML=o;

    d=document.getElementById('destino').value;
    document.getElementById('teste2').innerHTML=d;

    dp=document.getElementById('dataProducao').value;
    document.getElementById('teste3').innerHTML=dp;

    $.ajax({
        url: "/api/mapaInfo/",
        method: 'get',
        contentType: "application/json",
        dataType: "json",
        success: function (res, status) {
            // console.log(o);
            // console.log(d);
            // console.log(dp);

            var pontosTrajeto=[];
            var cidOrigem=getCidadesCoord(o);
            var cidDestino=getCidadesCoord(d);
            var paragem_nome=[];

            for (i in res){
                if (o==res[i].local_cidadeOrigem && d==res[i].local_cidadeDestino && dp==res[i].prod_dataProducao){
                    pontosTrajeto.push([res[i].localParagem_cidadeLat,res[i].localParagem_cidadeLong]);
                    paragem_nome.push(res[i].localParagem_cidade);
                }
            }
            if(!checkTrajetos(o,d)){
                return;
            }
            
            var trajeto=[];
            trajeto.push(cidOrigem);

            marker1=L.marker(cidOrigem);
            marker1.addTo(mymap).bindPopup("<p>Origem:"+o+"</p>").openPopup();

            for (i in pontosTrajeto){
                trajeto.push(pontosTrajeto[i]);
                marker2=L.marker(pontosTrajeto[i]);
                marker2.addTo(mymap).bindPopup("<p>Paragem:"+paragem_nome[i]+"</p>").openPopup();
            }

            trajeto.push(cidDestino);
            
            marker3=L.marker(cidDestino);
            marker3.addTo(mymap).bindPopup("<p>Destino:"+d+"</p>").openPopup();
            
            // console.log(cidOrigem);
            // console.log(pontosTrajeto);
            // console.log(cidDestino);
            // console.log(trajeto);

            var cor;
            var r = Math.floor(Math.random() * 180);
            var g = Math.floor(Math.random() * 230);
            var b = Math.floor(Math.random() * 200);
            cor= "rgb("+r+" ,"+g+","+ b+")";
            
            var options={color: cor};
            var polyline = L.polyline(trajeto,options ).addTo(mymap);
            // zoom the map to the polyline
            mymap.fitBounds(polyline.getBounds());
            console.log(mymap);

            console.log(cidOrigem.distanceTo(cidDestino));


        },
        error: function (jqXHR, errStr, errThrown) {
			console.log(errStr);
		}
    })
}
