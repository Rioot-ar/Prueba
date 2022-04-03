let gruposInput = Number(prompt("Cantidad de Grupos"));
let intervaloInput = Number(prompt("Intervalo entre grupos"));
let inicioInput = Number(prompt("Inicio del primer grupo"));

let contenido=document.querySelector(".actuales");
let tabla=document.querySelector(".horarios");
let fragmento=document.createDocumentFragment();

const obtenerGrupos=(cantGrupos,duracionDeIntervalos,iniPrimerGrupo)=>{
    let filaGrupos = document.createElement("TR");
    let intInicial = iniPrimerGrupo;
    for (let i = 0; i < cantGrupos; i++) {
        grupos.push([]);
        let grupoText = `<td class="grupo ${i+1}"> Grupo ${i+1}</td>`;
        filaGrupos.innerHTML+=grupoText;
    }

    fragmento.appendChild(filaGrupos);

    for (let j = 0; j < Math.round(1440/(cantGrupos*duracionDeIntervalos)); j++) {
        let filaDeHorarios = document.createElement("TR");
        for (let i = 0; i < cantGrupos ; i++){
            grupos[i].push([intInicial,(intInicial+duracionDeIntervalos)%1440]);
            intInicial= grupos[i][j][1];
            let textoFila= `<td>${Math.floor(grupos[i][j][0]/60)}:${grupos[i][j][0]%60}</td>`;
            filaDeHorarios.innerHTML+=textoFila;
        }
        fragmento.appendChild(filaDeHorarios);
    }
    grupos[cantGrupos-1][Math.floor(1440/(cantGrupos*duracionDeIntervalos)-1)][1]=iniPrimerGrupo;
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

let horarioPVU=new Date();
let grupoActual;
let minFaltantes;

let cantidadGrupos = gruposInput;
let intervaloGrupos = intervaloInput;
let inicioPrimerGrupo = inicioInput;

const grupos = [];

horariosMinutosPVU = horarioPVU.getMinutes()+horarioPVU.getHours()*60;

obtenerGrupos(cantidadGrupos,intervaloGrupos,inicioPrimerGrupo);
obtenerGrupoActual(cantidadGrupos,intervaloGrupos,horariosMinutosPVU);

tabla.appendChild(fragmento);
contenido.innerHTML = `Grupo Actual: ${grupoActual} <br>
Siguiente Grupo En: ${minFaltantes} Minutos`;
