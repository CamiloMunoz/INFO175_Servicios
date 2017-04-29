/**
	JS de prueba
 */

var CONST = {
	// Cambiar a http://<hostname>/<directorio principal>
	uriServer  : "http://localhost:8080/trabajo/"  
};

var data = null;

/**
 * Esta función se llama en el call-back de getJSON en loadData
 * @param res representa la data leida del servicio. Se asume que 
 * contiene un arreglo con objetos JSON con los atributos userid, 
 * applabel y activitycount
 */
function displayData(res) {
	data = res;
	// para poner la información leida en la página web (index.html)
	// accedemos al elemento con id working_area y le agregamos
	// un elemento html de tipo table, que tiene a su vez el id
	// "data_table".
	$("#working_area").append("<table id=\"data_table\">");
	
	// secuencialmente agregamos filas (<tr>) y celdas (<td>) a la
	// tabla "data_table".  
	for (var i = 0; i < data.length; i++) {
		var row = data[i];
		$("#data_table").append("<tr><td>" + row.userid + "</td>" + "<td>" + row.applabel + "</td>" + "<td>" + row.activitycount + "</td></tr>\n");
	}
	//$( "#working_area" ).append("</table>");
}

/**
 * Esta función usa la función getJSON de jquery para hacer una llamada
 * a una dirección Web que devuelve un json. Aca llamamos al servicio 
 * GetSampleData implementado en Java y corriendo en el servidor Tomcat.
 * getJSON es de jquery, y se reconoce porque se invoca desde el objeto $
 * El segundo parámetro de getJSON es una función de "call-back". Como 
 * la llamada AJAX producida por getJSON es asíncrona, la ejecución de getJSON 
 * no espera por la respuesta, sino que pasa la "data" leida del servicio a una 
 * siguiente función. Esta es la forma como javascript secuencia llamadas 
 * asíncronas
 */
function loadData(){
	var url = CONST.uriServer + "GetSampleData";
	
	$.getJSON(url, function(data) {
		displayData(data);
	});
}

$(window).ready(function() {
	loadData();
});