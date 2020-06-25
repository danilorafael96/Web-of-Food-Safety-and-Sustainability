console.log("Start");

var mymap = L.map('mapid').setView([40,-8],8);
var produtoNome = document.getElementById('produtoNome');
var pn;
var origem = document.getElementById('origem');
var o;
var destino = document.getElementById('destino');
var d;
var dataProducao = document.getElementById('dataProducao');
var dp;
var submete=document.getElementById('submete');
var cidadeCoord=[];
var trajetos=[];

var polyline;
var marker1;
var marker2;
var marker3;
var markers;
var markersMap;

var limpaMapa=document.getElementById('refreshButton');

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
            var html0;
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

                html0+="<option value="+res[i].prod_nome+">"+res[i].prod_nome+"</option>";
                html1+="<option value="+res[i].local_cidadeOrigem+">"+res[i].local_cidadeOrigem+"</option>";
                html2+="<option value="+res[i].local_cidadeDestino+">"+res[i].local_cidadeDestino+"</option>";
                html3+="<option value="+res[i].prod_dataProducao+">"+res[i].prod_dataProducao+"</option>";
                html4="<input type='submit' onclick='recebeFiltro()'></input>"
            }

            produtoNome.innerHTML=html0;
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

function checkTrajetos(produtoNome,origem,destino,dataProducao){
    for(i in trajetos){
        if (produtoNome==trajetos[i].prod_nome && origem==trajetos[i].local_cidadeOrigem && destino==trajetos[i].local_cidadeDestino && dataProducao==trajetos[i].prod_dataProducao){
            return true;
        }
    }
    return false;
}

function recebeFiltro(){
    console.log(cidadeCoord);

    var cidOrigem;

    pn=document.getElementById('produtoNome').value;
    o=document.getElementById('origem').value;
    d=document.getElementById('destino').value;
    dp=document.getElementById('dataProducao').value;
    
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
            cidOrigem=getCidadesCoord(o);
            var cidDestino=getCidadesCoord(d);
            var paragem_nome=[];

            var distancia_km;
            var distancia_total;
            for (i in res){
                if (pn==res[i].prod_nome && o==res[i].local_cidadeOrigem && d==res[i].local_cidadeDestino && dp==res[i].prod_dataProducao){
                    pontosTrajeto.push([res[i].localParagem_cidadeLat,res[i].localParagem_cidadeLong]);
                    paragem_nome.push(res[i].localParagem_cidade);
                }
            }
            
            if(!checkTrajetos(pn,o,d,dp)){
                return;
            }
            
            var trajeto=[];
            markers=[];
            trajeto.push(cidOrigem);

            marker1=L.marker(cidOrigem).bindPopup("<p>Origem:"+o+"</p>").openPopup();
            //marker1.addTo(mymap);
            markers.push(marker1)
            for (i in pontosTrajeto){
                trajeto.push(pontosTrajeto[i]);
                marker2=L.marker(pontosTrajeto[i]).bindPopup("<p>Paragem:"+paragem_nome[i]+"</p>").openPopup();
                //marker2.addTo(mymap);
                markers.push(marker2);
            }

            trajeto.push(cidDestino);

            marker3=L.marker(cidDestino).bindPopup("<p>Destino:"+d+"</p>").openPopup();
            //marker3.addTo(mymap);
            markers.push(marker3);

            markersMap=L.layerGroup(markers).addTo(mymap);

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
            polyline = L.polyline(trajeto,options ).addTo(mymap);
            // zoom the map to the polyline
            mymap.fitBounds(polyline.getBounds());
            console.log(mymap);

            //Cálculo da distância do trajeto(com ou sem paragens) em metros e conversão em km. Utilizado para determinar a distância que é adicionada à base de dados manualmente.
            if (pontosTrajeto.length==0){
                var distancia = mymap.distance(cidOrigem,cidDestino);
                distancia_km=Math.round(distancia/1000);
                console.log(distancia_km);
            } else if (pontosTrajeto.length!=0) {
                distancia_total=mymap.distance(cidOrigem,pontosTrajeto[0]);
                for(i in pontosTrajeto){
                    if(pontosTrajeto[i+1]!=null)
                    distancia_total += map.distance(pontosTrajeto[i],(pontosTrajeto[i+1]));
                }
                distancia_total+= mymap.distance(pontosTrajeto[pontosTrajeto.length-1],cidDestino);
                distancia_total= Math.round(distancia_total/1000);
                console.log(distancia_total);
            }
        },
        error: function (jqXHR, errStr, errThrown) {
			console.log(errStr);
        }
    })
}

function limparMapa(){
    for (i in markers){
        mymap.removeLayer(markers[i]);
    }
    mymap.removeLayer(polyline);
}