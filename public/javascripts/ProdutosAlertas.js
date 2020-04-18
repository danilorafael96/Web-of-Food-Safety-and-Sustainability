window.onload=function(){
    listaProdutosAlertas()
}

function listaProdutosAlertas(){
    var produtosInfo=document.getElementsByClassName('produtosInfo');

    $.ajax({
		url: "/api/produtos+alertas",
		method: "get",
		contentType: "aplication/json",
		dataType: "json",
		success: function (res, status, jqXHR) {
			console.log(status);
			if (res.err) {
				console.log(JSON.stringify(res));
				return;
            }
            var html='';
            for(i in res){
                html+="<td class='column0'>"+res[i].prodCat_referencia+"</td><td class='column1'>"+res[i].prodCat_referencia+"</td><td class='column2'>"+res[i].prodCat_referencia+"</td><td class='column3'>"+res[i].prodCat_referencia+"</td><td class='column4'>"+res[i].prodCat_nome+"</td><td class='column5'>"+res[i].prodCat_referencia+"</td><td class='column6'>"+res[i].prodCat_referencia+"</td>";
            }
            produtosInfo.innerHTML=html;
        },
		error: function (jqXHR, errStr, errThrown) {
			console.log(errStr);
		}
	})
}