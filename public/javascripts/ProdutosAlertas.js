window.onload=function(){

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
                html="<td class='column0'>"+prodCat_referencia+"</td><td class='column1'>"+prodCat_referencia+"</td><td class='column2'>"+prodCat_referencia+"</td><td class='column3'>"+prodCat_referencia+"</td><td class='column4'>"+prodCat_nome+"</td><td class='column5'>"+prodCat_referencia+"</td><td class='column6'>"+prodCat_referencia+"</td>";
            }
            produtosInfo.innerHTML=html;
        },
		error: function (jqXHR, errStr, errThrown) {
			console.log(errStr);
		}
	})
}