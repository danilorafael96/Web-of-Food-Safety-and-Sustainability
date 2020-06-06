var produtoNome;
var pn;
var tipoTransporte;
var tt;
var tipoCombustivel;
var tc;
var origem;
var o;
var destino;
var d;
var quantidadeProduto;
var qp;
var submeter;
var calculo;

window.onload=function(){
    dadosCalculadora();
}

function dadosCalculadora(){
    produtoNome=document.getElementById('produtoNome');
    tipoTransporte=document.getElementById('tipoTransporte');
    tipoCombustivel=document.getElementById('tipoCombustivel');
    origem=document.getElementById('origem');
    destino=document.getElementById('destino');
    quantidadeProduto=document.getElementById('quantidadeProduto');
    submeter=document.getElementById('submeter');

    $.ajax({
		url: "/api/calculadora",
		method: "get",
		contentType: "aplication/json",
		dataType: "json",
		success: function (res, status, jqXHR) {
            var html0;
            var html1;
            var html2;
            var html3;
            var html4;
            var html5;
            var html6;
            
            for (i in res){
                html0+="<option value='"+res[i].prod_nome+"'>"+res[i].prod_nome+"</option>";
                html1+="<option value='"+res[i].tipoTransp_nome+"'>"+res[i].tipoTransp_nome+"</option>";
                html2+="<option value='"+res[i].tipoTransp_combustivel+"'>"+res[i].tipoTransp_combustivel+"</option>";
                html3+="<option value='"+res[i].local_cidadeOrigem+"'>"+res[i].local_cidadeOrigem+"</option>";
                html4+="<option value='"+res[i].local_cidadeDestino+"'>"+res[i].local_cidadeDestino+"</option>";
                html5+="<option value='"+res[i].prodTransp_quantidade+"'>"+res[i].prodTransp_quantidade+"</option>";
                html6="<input type='submit' onclick='resultadoCalc()'></input>";
            }
            
            produtoNome.innerHTML=html0;
            tipoTransporte.innerHTML=html1;
            tipoCombustivel.innerHTML=html2;
            origem.innerHTML=html3;
            destino.innerHTML=html4;
            quantidadeProduto.innerHTML=html5;
            submeter.innerHTML=html6;
        },
        error: function (jqXHR, errStr, errThrown) {
			console.log(errStr);
		}
    })
}

function resultadoCalc(){
    calculo=document.getElementById('calculo');
    pn=document.getElementById('produtoNome').value;
    tt=document.getElementById('tipoTransporte').value;
    tc=document.getElementById('tipoCombustivel').value;
    o=document.getElementById('origem').value;
    d=document.getElementById('destino').value;
    qp=document.getElementById('quantidadeProduto').value;
    var pegada;

    $.ajax({
		url: "/api/calculadora",
		method: "get",
		contentType: "aplication/json",
		dataType: "json",
		success: function (res, status, jqXHR) {
            
            for (i in res){
                if(pn==res[i].prod_nome && tt==res[i].tipoTransp_nome && tc==res[i].tipoTransp_combustivel && o==res[i].local_cidadeOrigem && d==res[i].local_cidadeDestino && qp==res[i].prodTransp_quantidade){
                    console.log(res[i].tipoTransp_pegadaEcoKm);
                    console.log(res[i].local_distTrajetoKm);
                    formula=res[i].tipoTransp_pegadaEcoKm/res[i].local_distTrajetoKm;
                    console.log(formula);
                    pegada="O resultado dos valores introduzidos indica que, de "+res[i].local_cidadeOrigem+" para "+res[i].local_cidadeDestino+", é percorrida uma disntância de "+res[i].local_distTrajetoKm+" km. Logo, a pegada de carbono é igual a "+formula.toFixed(3)+" mg/L.";
                    calculo.innerHTML=pegada;
                }
            }
        },
        error: function (jqXHR, errStr, errThrown) {
			console.log(errStr);
		}
    })
}