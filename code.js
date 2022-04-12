
let fechaActual=new Date();
let horariosMinutosPVU = fechaActual.getMinutes()+fechaActual.getHours()*60;


const obtenerIntervalos = (cantGrupos,duracionDeIntervalos,iniPrimerGrupo)=>{
    let intInicial = iniPrimerGrupo;
    for (let j = 0; j < Math.round(1440/(cantGrupos*duracionDeIntervalos)); j++) {
        let filaDeHorarios = document.createElement("TR");
        for (let i = 0; i < cantGrupos ; i++){
            grupos[i].push([intInicial,(intInicial+duracionDeIntervalos)%1440]);
            intInicial = grupos[i][j][1];

            let textoFila= `<td>${(Math.floor(grupos[i][j][0]/60).toString().length==2)? Math.floor(grupos[i][j][0]/60) : "0"+(Math.floor(grupos[i][j][0]/60).toString())}:
                                ${((grupos[i][j][0]%60).toString().length==2)? grupos[i][j][0]%60 : "0"+(grupos[i][j][0]%60).toString()}</td>`;
            filaDeHorarios.innerHTML+=textoFila;
        }
        fragmento.appendChild(filaDeHorarios);
    }
}


const obtenerGrupos=(cantGrupos)=>{
    let filaGrupos = document.createElement("TR");

    for (let i = 0; i < cantGrupos; i++) {
        grupos.push([]);
        let grupoText = `<td class="grupo ${i+1}"> Grupo ${i+1}</td>`;
        filaGrupos.innerHTML+=grupoText;
    }

    fragmento.appendChild(filaGrupos);


}

const obtenerGrupoActual = (cantGrupos,duracionDeIntervalos,horariosMinutosPVU)=>{
    for (let j = 0; j < Math.round(1440/(cantGrupos*duracionDeIntervalos)); j++) {
        for (let i = 0; i < cantGrupos; i++) {
           if(grupos[i][j][0] < horariosMinutosPVU && grupos[i][j][1] >= horariosMinutosPVU){
               grupoActual=i+1;
               minFaltantes=grupos[i][j][1]-horariosMinutosPVU;
               return;
           }
            
        }
        
    }
}



function mostrarError(){
    let nodoPadre=document.querySelector(".contenido");
    nodoPadre.innerHTML = ` no se puede organizar esa combinacion de grupos e intervalos`;
};






function obtenerDatos(){
    let cantidadGrupos;
    let intervaloGrupos;
    let inicioPrimerGrupo;

    cantidadGrupos = Number(document.getElementById("gruposInput").value);
    intervaloGrupos = Number(document.getElementById("intervaloInput").value);
    inicioPrimerGrupo = Number(document.getElementById("inicioInput").value);

    let verificacion = cantidadGrupos*intervaloGrupos;
    if(1440%verificacion != 0){
        console.error("La cantidad de grupos e intervalos no te pueden dividir en 24 horas");
        mostrarError();
        return;
    }
    actualizarDatos(cantidadGrupos,intervaloGrupos,inicioPrimerGrupo);


}

function actualizarDatos(cantidadGrupos,intervaloGrupos,inicioPrimerGrupo){ 
    fragmento=document.createDocumentFragment();
    grupos=[];
    obtenerGrupos(cantidadGrupos);
    obtenerIntervalos(cantidadGrupos,intervaloGrupos,inicioPrimerGrupo);

 

    var tablaActual=document.getElementById("horarios");
    var tablaPadre=tablaActual.parentNode;

    let tablaNueva=document.createElement("table");
    tablaNueva.setAttribute("id","horarios");
    tablaNueva.appendChild(fragmento);
    tablaActual=tablaPadre.replaceChild(tablaNueva,tablaActual);

    grupoActual = 0;
    minFaltantes = 0;
    obtenerGrupoActual(cantidadGrupos,intervaloGrupos,horariosMinutosPVU);
    let contenido=document.querySelector(".actuales");
    contenido.innerHTML = `Grupo Actual: ${grupoActual} <br>
    Siguiente Grupo En: ${minFaltantes} Minutos`;
}
