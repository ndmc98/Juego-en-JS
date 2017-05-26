var jugando;
var puntos;
var vida;
$(document).ready(inicio);
$(document).keydown(capturaTeclado);

function inicio(){
	jugando = true;
	miCanvas = $("#mi_canvas")[0];
	contexto = miCanvas.getContext("2d");
	buffer = document.createElement("canvas");
	quica = new Quica();
	vida = 3;
	puntos=0;
	money = new Moneda();
	calacas = [new Calaca(), new Calaca(),
				   new Calaca(), new Calaca(),
				   new Calaca(), new Calaca(),
				   new Calaca(), new Calaca(),
				   new Calaca(), new Calaca()];
	calacas2 = [new Calaca(), new Calaca(),
				   new Calaca(), new Calaca(),
				   new Calaca(), new Calaca(),
				   new Calaca(), new Calaca(),
				   new Calaca(), new Calaca()];
	
	run();	
	
		$('#instrucciones').click(function(){
        $('#popup').fadeIn('slow');
        $('.popup-overlay').fadeIn('slow');
        $('.popup-overlay').height($(window).height());
        return false;
    });
    
		$('#close').click(function(){
        $('#popup').fadeOut('slow');
        $('.popup-overlay').fadeOut('slow');
        return false;
    });
    
    $("#iniciar").click(function(){	
		if(jugando==false)
			inicio();	
	});
}

function capturaTeclado(event){
	if(event.which==38 || event.which==87)
		quica.actualizar('arriba');
	if(event.which==40 || event.which==83)
		quica.actualizar('abajo');
	if(event.which==39 || event.which==68)
		quica.actualizar('derecha');
	if(event.which==37 || event.which==65)
		quica.actualizar('izquierda');
	
}

function run(){ 
	buffer.width = miCanvas.width;
	buffer.height = miCanvas.height;
	contextoBuffer = buffer.getContext("2d");
	if(jugando){  
		contextoBuffer.clearRect(0,0,buffer.width,buffer.height);
		contextoBuffer.fillStyle = "#ff0000";
		contextoBuffer.font = "30px sans-serif";
		contextoBuffer.fillText("PUNTOS :"+ puntos, 20, 30);
		contextoBuffer.fillText("VIDA :"+ vida, 200,30);
		money.dibujar(contextoBuffer);
		quica.dibujar(contextoBuffer);
		if(quica.colision(money.x, money.y)){
			money = new Moneda();
			contextoBuffer.fillText("PUNTOS :"+ puntos, 20, 30);
			contextoBuffer.fillText("VIDA :"+ vida, 200, 30);
			puntos++;
			vida++;
			money.dibujar(contextoBuffer);
		}
		money.dibujar(contextoBuffer);
		for(i=0;i<calacas.length;i++){
			calacas[i].dibujar(contextoBuffer);
			calacas[i].actualizar();
			calacas2[i].dibujar(contextoBuffer);
			calacas2[i].actualizar2();
			if(quica.colision(calacas[i].x,calacas[i].y)){
				vida--;
				contextoBuffer.fillText("VIDA :"+ vida, 200, 30);
				calacas[i].x=aleatorio(0,10);
				calacas[i].y=aleatorio(100,340);
				calacas2[i].actualizar();
				quica.sprite = 2;
				$('#pierde')[0].play();
			}
			if(quica.colision(calacas2[i].x,calacas2[i].y)){
				vida--;
				contextoBuffer.fillText("VIDA :"+ vida, 200, 30);
				calacas2[i].x=aleatorio(0,620);
				calacas2[i].y=aleatorio(0,10);
				calacas2[i].actualizar2();
				quica.sprite = 2;
				$('#pierde')[0].play();
			}
		}
		
		if(vida <= 0)
			jugando = false;
		
		contexto.clearRect(0,0,miCanvas.width,miCanvas.height);
		contexto.drawImage(buffer, 0, 0);
		setTimeout("run()",20);
		
	}else{
		contextoBuffer.clearRect(0,0,buffer.width,buffer.height);
		contextoBuffer.fillStyle = "#fff00f";
		quica.sprite = 3;
		vida = 0;
		quica.dibujar(contextoBuffer);
		contextoBuffer.font = "50px sans-serif";
		contextoBuffer.fillText("GAMEOVER", 180, 250);
		contextoBuffer.fillStyle = "#ff0000";
		contextoBuffer.font = "30px sans-serif";
		contexto.clearRect(0,0,miCanvas.width,miCanvas.height);
		contexto.drawImage(buffer, 0, 0);
	}
	
}


