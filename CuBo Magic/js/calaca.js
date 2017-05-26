function aleatorio(piso,techo){
	return Math.floor(Math.random() * (techo - piso + 1)) + piso;
}


function Moneda(x,y){
	this.img = $("#moneda")[0];	
	this.x = aleatorio(0,620);
	this.y = aleatorio(100,330);
	this.dibujar = function(ctx){
		var img = this.img;
		ctx.drawImage(img,this.x,this.y);
	}
}

function Calaca(x,y){
	this.img = $("#calaca_1")[0];	
	this.x = aleatorio(0,620);
	this.y = aleatorio(100,330);
	this.velocidad = 0;
	while(this.velocidad == 0)
		this.velocidad=aleatorio(-1,5);
			
	this.dibujar = function(ctx){
		var img = this.img;
		ctx.drawImage(img,this.x,this.y);
	}
	
	this.actualizar = function(){
		this.x += this.velocidad;
		this.x = (640 + this.x)%640;
	}
	
	this.actualizar2 = function(){
		this.y += this.velocidad;
		this.y = (640 + this.y)%640;
	}
}
