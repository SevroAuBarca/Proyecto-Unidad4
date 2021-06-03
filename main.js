/* 
.team1
perii 10 4 10 10 10 1 3 5 10 8 10 2
taker 4 5 8 3 6 3 10 10 6 10 4 3
sunshi 1 6 3 4 8 2 1 2 3 2 5 4
piabb 3 2 6 6 1 5 4 4 4 4 6 1

.team2
dibro 5 5 6 8 8 10 8 8 5 5 10 1
diablo 10 10 5 5 6 5 10 6 6 8 5 4
sol 8 8 8 10 10 8 5 5 8 2 8 6
caro 6 6 10 6 5 6 6 10 10 1 3 10 */
const obtenerDatos = () => {
    let caracteres = document.querySelector("#areaTexto");
    let lineas = caracteres.value.split("\n")
    let arreglo_participantes = new Array();
    let equipos = 0
    let nombreEquipo = []
    for (let i = 0; i < lineas.length; i++) {
        if (lineas[i].substring(0, 1) == ".") {
            console.log("hay un nombre")
            nombreEquipo.push(lineas[i].split(" "))
            equipos++
        } else
            if (lineas[i].substring(0, 1) != "") {
                arreglo_participantes.push(lineas[i].split(" "))
            }
    }
    sumaPuntos(arreglo_participantes, equipos, nombreEquipo)
}



const sumaPuntos = (arreglo_participantes, equipos, nombreEquipo) => {
    let participantes = arreglo_participantes.length / equipos
    let equiposSeparados = []
    let valor_Real_1 = []
    let valor_Real_2 = []
    let parts1 = []
    let parts2 = []
    let jugadores = []
    let jugadores2 = []
    let total = []
    equiposSeparados.push(separarEquipos(arreglo_participantes, participantes))
    valor_Real_1 = acomodarEquipos(equiposSeparados[0].aux1, equiposSeparados[0].aux1.length / participantes)
    valor_Real_2 = acomodarEquipos(equiposSeparados[0].aux2, equiposSeparados[0].aux2.length / participantes)

    parts1 = (sumaCada3(valor_Real_1))
    parts2 = (sumaCada3(valor_Real_2))
    jugadores = (sumaTotal(valor_Real_1, true))
    jugadores2 = (sumaTotal(valor_Real_2, true))
    total.push(sumaTotal(valor_Real_1, false))
    total.push(sumaTotal(valor_Real_2, false))

    console.log(nombreEquipo)    
    
    if (equipoGanador(total, valor_Real_1, valor_Real_2, parts1, parts2, jugadores2, jugadores, nombreEquipo)) {
         genera_tabla(valor_Real_2, parts2, jugadores2, total[1], 'green')
      
    } else {
        genera_tabla(valor_Real_1, parts1, jugadores, total[0], 'red')
    }


}

const acomodarEquipos = (aux, recorte) => {
    let arrlength = aux.length;
    let tempArray = [];

    for (let index = 0; index < arrlength; index += recorte) {
        myChunk = aux.slice(index, index + recorte);
        // Do something if you want with the group
        tempArray.push(myChunk);
    }
    return tempArray;
}

const separarEquipos = (aux, participantes) => {
    let aux1 = []
    let aux2 = []
    for (let i = 0; i < aux.length; i++) {
        for (let j = 0; j < aux[i].length; j++) {
            if (i < participantes) {
                aux1.push(aux[i][j])
            } else {
                aux2.push(aux[i][j])
            }
        }
    }
    return { aux1, aux2 }
}

const sumaCada3 = (arreglo_participantes) => {
    let count = 0;
    let almacen = 0;
    let arrpush = []
    let parts = []
    for (let i = 0; i < arreglo_participantes.length; i++) { //columnas
        for (let j = 0; j < arreglo_participantes[i].length; j++) { //filas
            if (j > 0 && j < arreglo_participantes[i].length) {
                if (count < 3) {
                    almacen += parseInt(arreglo_participantes[i][j])
                    if (count === 2) {
                        arrpush.push(almacen)
                        count = -1
                        almacen = 0
                    }
                    count++;
                }
            }
        }
        parts.push(arrpush)
        arrpush = []
    }
    return parts
}

const sumaTotal = (arreglo_participantes, sum) => {
    let sumaJugadores = []
    let total = 0
    let aux = 0
    for (let i = 0; i < arreglo_participantes.length; i++) { //columnas
        for (let j = 0; j < arreglo_participantes[i].length; j++) { //filas
            if (j > 0 && j < arreglo_participantes[i].length) {
                aux += parseInt(arreglo_participantes[i][j])
            }
        }
        sumaJugadores.push(aux)
        total += sumaJugadores[i]
        aux = 0
    }
    if (sum) {
        return sumaJugadores
    } else {
        return total
    }
}

const equipoGanador = (total, valor_Real_1, valor_Real_2, parts1, parts2, jugadores2, jugadores, nombreEquipo) => {
    if (total[0] > total[1]) {
        genera_tabla(valor_Real_1, parts1, jugadores, total[0], 'green')
        
        return true
    } else if (total[0] < total[1]) {
        genera_tabla(valor_Real_2, parts2, jugadores2, total[1], 'red')

        return false
    }
}
const mostrarGanador = (nombreEquipo) => {
    let winner = document.getElementById("ganador");
    let mostrar = document.createElement("h1");
    let texto = document.createTextNode("EL GANADOR ES: " + nombreEquipo)
    mostrar.appendChild(texto)
    winner.appendChild(mostrar)
}

function genera_tabla(tabla_equipo, parts, jugador, total, color) {
    // Obtener la referencia del elemento div
   
    body = document.getElementById("crearTabla");
    
    // Crea un elemento <table> y un elemento <tbody>
 
     tabla = document.createElement("table");
     tblBody = document.createElement("tbody");
    
        // Crea las celdas
        for (var i = 0; i < tabla_equipo.length; i++) {
            // Crea las hileras de la tabla
            var hilera = document.createElement("tr");

            for (var j = 0; j < tabla_equipo[i].length; j++) {
                // Crea un elemento <td> y un nodo de texto, haz que el nodo de
                // texto sea el contenido de <td>, ubica el elemento <td> al final
                // de la hilera de la tabla
                var celda = document.createElement("td");
                var textoCelda = document.createTextNode(tabla_equipo[i][j]);
                if (j == 0) {
                    celda.classList.add('td');
                    celda.classList.add('tdnombre');
                } else {
                    celda.classList.add('td');
                    celda.classList.add('td_datos');
                }
                celda.appendChild(textoCelda);
                hilera.appendChild(celda);
            }
            for (var k = 0; k < parts[i].length; k++) {
                // Crea un elemento <td> y un nodo de texto, haz que el nodo de
                // texto sea el contenido de <td>, ubica el elemento <td> al final
                // de la hilera de la tabla
                var celda = document.createElement("td");
                var textoCelda = document.createTextNode(parts[i][k]);
                celda.classList.add('td');
                celda.classList.add('tdsumas');
                celda.appendChild(textoCelda);
                hilera.appendChild(celda);
            }
            var celda = document.createElement("td");
            var textoCelda = document.createTextNode(jugador[i]);
            celda.classList.add('td');
            celda.classList.add('tdjugador');
            celda.appendChild(textoCelda);
            hilera.appendChild(celda);
            if (i == tabla_equipo.length - 1) {
                var celda = document.createElement("td");
                var textoCelda = document.createTextNode(total);
                celda.classList.add('total');
                celda.appendChild(textoCelda);
                hilera.appendChild(celda);
            }
            celda.classList.add('tr');
            // agrega la hilera al final de la tabla (al final del elemento tblbody)
            tblBody.appendChild(hilera);
        }
        // posiciona el <tbody> debajo del elemento <table>
        // appends <table> into <body>
        tabla.appendChild(tblBody);
        // appends <table> into <body>
        body.appendChild(tabla);
       
        tabla.classList.add('tabla');
    
}