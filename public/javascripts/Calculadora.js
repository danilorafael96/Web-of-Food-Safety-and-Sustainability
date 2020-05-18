var tipoTransporte;
var tipoCombustivel;
var origem;
var destino;
var quantidadeProduto;
var calculo;
var html1;
var html2;
var html3;
var html4;
var html5;

window.onload=function(){
    dadosCalculadora();
}

function dadosCalculadora(){
    tipoTransporte=document.getElementById('tipoTransporte');
    tipoCombustivel=document.getElementById('tipoCombustivel');
    origem=document.getElementById('origem');
    destino=document.getElementById('destino');
    quantidadeProduto=document.getElementById('quantidadeProduto');
    $.ajax({
		url: "/api/calculadora",
		method: "get",
		contentType: "aplication/json",
		dataType: "json",
		success: function (res, status, jqXHR) {
            
            for (i in res){
                html1+="<option value='' onClick>"+res[i].tipoTransp_nome+"</option>";
                html2+="<option value=''>"+res[i].tipoTransp_combustivel+"</option>";
            }
            
            tipoTransporte.innerHTML=html1;
            tipoCombustivel.innerHTML=html2;
        },
        error: function (jqXHR, errStr, errThrown) {
			console.log(errStr);
		}
    })

    $.ajax({
		url: "/api/calculadora/locais",
		method: "get",
		contentType: "aplication/json",
		dataType: "json",
		success: function (res, status, jqXHR) {
            
            for (i in res){
                html3+="<option value=''>"+res[i].local_cidadeOrigem+"</option>";
                html4+="<option value=''>"+res[i].local_cidadeDestino+"</option>";
                html5+="<option value=''>"+res[i].prodTransp_quantidade+"</option>";
            }
            origem.innerHTML=html3;
            destino.innerHTML=html4;
            quantidadeProduto.innerHTML=html5;
        },
        error: function (jqXHR, errStr, errThrown) {
			console.log(errStr);
		}
    })
}

function resultadoCalc(){
    calculo=document.getElementById('calculo');

    var pegada;
    
    pegada="O resultado dos valores introduzidos é de "+300*10+" mg/L";

    calculo.innerHTML=pegada;
}