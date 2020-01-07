var numSup = new Array(),numInf = new Array();
var numero1, numero2, mai, men;
var calculadora, multiplicador, multiplicando;


function geraNumero(){
    var numero = Math.floor(Math.random() * 10000);
    return numero;
}


function maior(){
    if(numero1 >= numero2){        
        return numero1;
    }else{
        return numero2;
    }
}


function menor(){
    if(numero1 <= numero2){        
        return numero1;
    }else{
        return numero2;
    }
}


function insereNumerosGerados(){
    if(maior() == numero1){
        multiplicador.innerHTML = numero1;
        multiplicando.innerHTML = "x " + numero2;      
    }else{
        multiplicador.innerHTML = numero2;
        multiplicando.innerHTML = "x " + numero1; 
    }
}


function geraSobeResto(){
    for(var i = men; i >= 1; i--){       
        var sobeResto = document.createElement("div");
        sobeResto.id = 'sobeResto'+i;
        calculadora.appendChild(sobeResto);
        for(var j = 0; j < mai -1; j++){
            sobeResto.innerHTML += "<input type='text'>";
        }
    }   
}


function campoMultiplica(){
    var aux = 0;
    for(var i = 1; i <= men + 1; i++){       
        var campoMulti = document.createElement("div");
        campoMulti.id = 'campoMuti'+i;
        calculadora.appendChild(campoMulti);
        for(var j = 0; j <= mai + aux; j++){
            campoMulti.innerHTML += "<input type='text'class='input'>";
        }
        aux++
    }
}


function transforma(){ 
    numSup.splice(1,mai);
    numInf.splice(1,men);
    for(var i = 0; i < mai.length;i++){
        numSup[i] = parseInt(mai[i]);     
    }
    for(var i = 0; i < men.length;i++){
        numInf[i] = parseInt(men[i]);     
    }    
    numSup.reverse();
    numInf.reverse();
}


function verificaSubida(aDividir){
    if(aDividir % 10 == 0){
        return aDividir / 10;           
    }else{
        aux = parseInt(aDividir / 10);
        return aux;
    }
}

function corrigeSubida(result,j,muda){
    var divResto,aux;
    divResto = document.querySelector("#sobeResto"+ muda); 
    if(j < mai - 1){
        aux = divResto.children[j].value;
    }else{
        return false;
    }  
    if(aux != result){
        divResto.children[j].style.backgroundColor = "#FF0000";
    }else if((result == 0) && (aux == '') ||(result == aux)){
        divResto.children[j].style.backgroundColor = "#00FF00";
    }else{
        divResto.children[j].style.backgroundColor = "#FF0000";
    }        
}


function corrigeFinal(muda){
    var multiplicacao,aux,divResultadoFinal,tam,tam2;
    multiplicacao = numero1 * numero2;
    multiplicacao = multiplicacao.toString();
    tam = multiplicacao.length;
    tam2 = tam;
    divResultadoFinal = document.querySelector("#campoMuti" + muda);
    for(var i = 0; i < tam; i++){
        aux = parseInt(divResultadoFinal.children[i].value);
        if(aux == multiplicacao[tam2 - 1]){ 
            divResultadoFinal.children[i].style.backgroundColor = "#00FF00";
        }else{
            divResultadoFinal.children[i].style.backgroundColor = "#FF0000";
        }
        tam2 -= 1;
    }
}


function corrigir(){
    var aux, divMultiplica,muda;
    var divide = 0,result = 0;
    muda = 1;
    for(var i = 0; i < men; i++){
        for(var j = 0; j < mai; j++){
            divMultiplica = document.querySelector("#campoMuti"+ muda);
            aux = parseInt(divMultiplica.children[j + i].value);
            divide = ((numInf[i] * numSup[j]) + result) % 10;
            if(aux != divide){
                divMultiplica.children[j+ i].style.backgroundColor = "#FF0000";
            }else{
                divMultiplica.children[j + i].style.backgroundColor = "#00FF00";
            }
            result = verificaSubida(numInf[i] * numSup[j] + result);
            if(j == mai - 1){
                if(divMultiplica.children[j + i + 1].value != result){
                    divMultiplica.children[j + i + 1].style.backgroundColor = "#FF0000";
                }else{
                    divMultiplica.children[j + i + 1].style.backgroundColor = "#00FF00";
                }
            }
        corrigeSubida(result,j,muda);
        }
        result = 0;
        muda += 1;
    }
    corrigeFinal(muda);
}


function montar(){
    numero1 = geraNumero(), numero2 = geraNumero();
    mai = maior().toString(); 
    men = menor().toString();
    transforma();
    men = men.length;
    mai = mai.length;
    calculadora = document.querySelector("#calculadora");
    calculadora.innerHTML = "";
    multiplicador = document.createElement("div");
    multiplicador.id = 'multiplicador';
    multiplicando = document.createElement("div");
    multiplicando.id = 'multiplicando';
    calculadora.innerHTML += "<h2>Calculadora</h2>";
    geraSobeResto();
    calculadora.appendChild(multiplicador);
    calculadora.appendChild(multiplicando);
    insereNumerosGerados();
    campoMultiplica();
}

document.getElementById("gerar").addEventListener("click",montar);
document.getElementById("corrigir").addEventListener("click",corrigir);
