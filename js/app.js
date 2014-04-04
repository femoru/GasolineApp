var ultimoConsumo;

$(document).ready(function(){
	ultimoConsumo = localStorage.getItem(localStorage.length - 1);
	ultimoConsumo = JSON.parse(ultimoConsumo);

	if (ultimoConsumo != null) {
		$("#km").val(ultimoConsumo.kmAnterior);
		$("#galon").val(ultimoConsumo.vlrGalon);
		$("#total").val(ultimoConsumo.totalGalon);	
		mostrarUltimo();
		llenarHistorial();
	};

	$("#consumo").on('click',function(){
		var vlrGalon = $("#galon").val();
		var totalGalon = $("#total").val();
		var kmActual = $("#km").val();
		var kmAnterior = 0;//Inicial
		if (ultimoConsumo != null) {
			kmAnterior = ultimoConsumo.kmAnterior;
		}
		
		var galones = totalGalon/vlrGalon;
		var recorrido = kmActual - kmAnterior;
		var rendimiento = recorrido/galones;
		var fecha = new Date();
		var registro = {
			"galones":galones,
			"recorrido":recorrido,
			"rendimiento":rendimiento,
			"fecha":fecha,
			"totalGalon":totalGalon,
			"vlrGalon":vlrGalon,
			"kmAnterior":kmActual
		}
		localStorage.setItem(localStorage.length,JSON.stringify(registro));
		ultimoConsumo = registro;
		mostrarUltimo();
		llenarHistorial();
		alert("El rendimiento de la ultima tanqueda fue de " + rendimiento + "km/galon");
		$.mobile.changePage($("#ultimo"));
	});


	$("#limpiarHistorial").click(function(){
	   localStorage.clear();
	   $("#historicoConsumos").html("");
	   alert("Todos los consumos han sido borrados");
	});
});

function mostrarUltimo(){
	$("#spFecha").text((new Date(Date.parse( ultimoConsumo.fecha))).toDateString());
	$("#spGalones").text(Math.round(ultimoConsumo.galones*1000)/1000);
	$("#spTotal").text(ultimoConsumo.totalGalon);
	$("#spRecorrido").text(ultimoConsumo.recorrido);
	$("#spRendimiento").text(ultimoConsumo.rendimiento);
}

function llenarHistorial(){
 	for (i=0; i<=localStorage.length-1; i++)  
	{  
		var key = localStorage.key(i);  
		var val = localStorage.getItem(key);
		var consumo = JSON.parse(val);
		var noteElement = $("<div data-role='collapsible' data-mini='true'/>");
		var fecha = (new Date(Date.parse( consumo.fecha)));
		var h3NoteTitle = $("<h3/>").text(fecha.toDateString());
		var pTotal = $("<p/>").text("Valor: $"+consumo.totalGalon);
		var pGalones = $("<p/>").text("Galones: "+(Math.round(consumo.galones*1000)/1000)+" galones");
		var pRecorrido = $("<p/>").text("Recorrido: "+consumo.recorrido+" km" );
		var pRendimiento = $("<p/>").text("Rendimiento: "+consumo.rendimiento+" km/galon");

		noteElement.append(h3NoteTitle);
		noteElement.append(pTotal);
		noteElement.append(pGalones);
		noteElement.append(pRecorrido);
		noteElement.append(pRendimiento);

		$("#historicoConsumos").append(noteElement);
	}  

}