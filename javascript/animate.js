// This script creates animated background on the  index page.

var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth-10;
canvas.height = window.innerHeight-50;


var c = canvas.getContext('2d'); 
var mouse = { x:undefined, y:undefined};

c.font = "30px";
c.textAlign = "center";
c.fillStyle="black";
c.fillText("This is (not) Media Architecture",canvas.width/2,canvas.height/2);

/*var colorArray = [
					'#D781E7',
					'#00D19B',
					'#4E2B36',
					'#D9B928',
					'#266BDC',
					'#B3F42A',
					'#F9AD9F',
					'#B83148'];*/

var colorArray = [
					'#14A697',
					'#F2C12E',
					'#F27649',
					'#F25252',
					'#67CC8E',
					'#289976',
					'#00A1D9',
					'#04518C',
					'#FF5600'];
var maxR = 8;
var minR = 6;


window.addEventListener('mousemove',function(event){

	mouse.x = event.x;
	mouse.y = event.y ;

});

function Circle(x,y,dx,dy,r){

	this.x = x ;
	this.y = y ;
	this.dx = dx;
	this.dy = dy;
	this.r = r;
	this.alpha = 0.2 + Math.random()*0.5;

	this.color = colorArray[Math.floor(Math.random()*colorArray.length)];

	this.draw = function(){

			c.beginPath();
			c.arc(this.x,this.y,this.r, 0 ,2*Math.PI);
			c.fillStyle = this.color;
			c.fill();

	}

	//  bouncing off the boundry 

	this.update = function(){

		if(this.x + this.r > canvas.width || this.x - this.r <0 )
		{
			this.dx = - this.dx;
		}
		if(this.y + this.r > canvas.height || this.y- this.r <0 )
		{
			this.dy = - this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;

		//interactivity on  mouse move

		if(mouse.x - this.x < 50 && mouse.x-this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
			if(this.r < maxR){
			this.r += 1;}
		}else if(this.r > minR ){
				this.r -= 1;	
		}


		this.draw();

	}
}


//create random circles 
var circleArray = [];

for(var i=0; i<280;i++){

		
		var r = 6;
		var x = Math.random()*(canvas.width- r*2)+r;
		var y = Math.random()*(canvas.height-r*2)+r;
		var dx = (Math.random()- 0.5)*0.2;
		var dy =(Math.random()- 0.5)*0.2;
		
		circleArray.push(new Circle(x,y,dx,dy,r));
	//	console.log(circleArray);
}

//Create the animation 

function animation()
{

	requestAnimationFrame(animation);     					// runs loop for animation
	
	c.clearRect(0,0,canvas.width,canvas.height);  			// clears the background



	for(var i = 0; i< circleArray.length; i++)				// Moving circles randomely 
	{
		circleArray[i].update();
	}

}

animation();