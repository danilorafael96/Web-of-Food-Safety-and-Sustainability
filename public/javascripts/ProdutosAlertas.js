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
                html+="<tr> <td class='column0'>"+res[i].prodCat_referencia+"</td><td class='column1'> </td><td class='column2'> </td><td class='column3'> </td><td class='column4'>"+res[i].prodCat_nome+"</td><td class='column5'> </td><td class='column6'> </td> </tr>";
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
				var html="";
				for(i in res){
					html+="<tr> <td class='column0'>"+res[i].prodCat_referencia+"</td><td class='column1'>"+res[i].alerta_data+" </td><td class='column2'>"+res[i].estadoClassif_nome+" </td><td class='column3'>"+res[i].alerta_info+" </td><td class='column4'>"+res[i].prodCat_nome+"</td><td class='column5'>"+res[i].ent_nome+" </td><td class='column6'>"+res[i].tipoAlerta_nome+" </td> </tr>";
				}
				produtosInfo.innerHTML=html;
			}else{
				listaProdutosAlertas();
			}
		},
		error: function (jqXHR, errStr, errThrown) {
			console.log(errStr);
		}
	})
}