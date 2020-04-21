window.onload=function(){
    listaProdutosAlertas()
}

function listaProdutosAlertas(){
    var produtosInfo=document.getElementById('produtosInfo');

    $.ajax({
		url: "/api/produtosAlertas",
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