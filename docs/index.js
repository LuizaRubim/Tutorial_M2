
var botao = true;

$("#botao").click(function(){
    if (botao == true){
        $("body").css("background", "#282626");
        $("p,h1,h2").css("color","white");
        $("h1").css("border","2px solid white");
        $(this).text("Modo Claro");
        botao = false;}
    else{
        $("body").css("background", "#FFFFFF");
        $("p,h1,h2").css("color","black");
        $("h1").css("border","2px solid blue");
        $(this).text("Modo Escuro");
        botao = true;}
    
})

$("p,h1").mouseover(function(){
    if (botao == true){
        $(this).css("color", "#97ced3");}
    else{
        $(this).css("color", "#9f9ad0");}
})

$("h2").mouseover(function(){
    if (botao == true){
        $(this).css("color", "red");}
    else{
        $(this).css("color", "red");}
})

$("p,h1,h2").mouseout(function(){
    if (botao == true){
        $(this).css("color", "black");}
    else{
        $(this).css("color", "white");} 
})