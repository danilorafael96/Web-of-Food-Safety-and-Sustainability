window.onload=function(){
    listaProdutosAlertas()
}

function listaProdutosAlertas(){
    var produtosInfo=document.getElementById('produtosInfo');

    $.ajax({
		url: "/api/produtos",
		method: "get",
		contentType: "aplication/json",
		dataType: "json",
		success: function (res, status, jqXHR) {
			console.log(status);
			if (res.err) {
				console.log(JSON.stringify(res));
				return;
            }
            var html="";
            for(i in res){
                html+="<tr> <td class='column0'>"+res[i].prod_referencia+"</td><td class='column1'>"+res[i].prod_nome+"</td><td class='column2'>"+res[i].categ_nome+"</td><td class='column3'>"+res[i].local_cidadeOrigem+"</td><td class='column4'>"+res[i].local_cidadeDestino+"</td><td class='column5'>"+res[i].prod_dataProducao+"</td><td class='column6'>"+res[i].prodTransp_quantidade+"</td> </tr>";
            }
            produtosInfo.innerHTML=html;
        },
		error: function (jqXHR, errStr, errThrown) {
			console.log(errStr);
		}
	})
}

function verifAlertas(){
	var alertasInfo = document.getElementById('alertasInfo').checked;
	var produtosInfo=document.getElementById('produtosInfo');

	var inicio=document.getElementById('inicio');
	var fim=document.getElementById('fim');
	var dataAlerta=document.getElementById('dataAlerta');
	var alertaInfo=document.getElementById('alertaInfo');
	var entidade=document.getElementById('entidade');
	$.ajax({
		url: "/api/produtos/infoAlertas",
		method: "get",
		contentType: "aplication/json",
		dataType: "json",
		success: function (res, status, jqXHR) {
			console.log(status);
			if (res.err) {
				console.log(JSON.stringify(res));
				return;
			}
			if (alertasInfo==true){
				var novo1="<th class='column2'>Origem</th>";
				var novo2="<th class='column3'>Destino</th>";
				var novo3="<th class='column4'>Data do alerta</th>";
				var novo4="<th class='column5'>Informação</th>";
				var novo5="<th class='column6'>Entidade reguladora</th>";

				var html="";
				for(i in res){
					html+="<tr> <td class='column0'>"+res[i].prod_referencia+"</td><td class='column1'>"+res[i].prod_nome+" </td><td class='column2'>"+res[i].local_cidadeOrigem+" </td><td class='column3'>"+res[i].local_cidadeDestino+" </td><td class='column4'>"+res[i].alerta_data+"</td><td class='column5'>"+res[i].alerta_info+" </td><td class='column6'>"+res[i].entidade_nome+" </td> </tr>";
				}
				inicio.innerHTML=novo1;
				fim.innerHTML=novo2;
				dataAlerta.innerHTML=novo3;
				alertaInfo.innerHTML=novo4;
				entidade.innerHTML=novo5;

				produtosInfo.innerHTML=html;
			}else{
				novo1="<th class='column2'>Categoria</th>";
				novo2="<th class='column3'>Origem</th>";
				novo3="<th class='column4'>Destino</th>";
				novo4="<th class='column5'>Data de produção</th>";
				novo5="<th class='column6'>Quantidade transportada</th>";

				inicio.innerHTML=novo1;
				fim.innerHTML=novo2;
				dataAlerta.innerHTML=novo3;
				alertaInfo.innerHTML=novo4;
				entidade.innerHTML=novo5;				
				listaProdutosAlertas();
			}
		},
		error: function (jqXHR, errStr, errThrown) {
			console.log(errStr);
		}
	})
}