//Visualization of the framework. 
// The framework defines core elements of Media Architecture. 
// And this visualization shows where does a so called Media Architecture project stands. Near the core or far away from it.


var plotData = null;

$(document).ready(function(){	
	loadData();	

	$("#spaceType").on("change", function(){
		var value = $(this).val();
		if(value == ""){ 
			plotGraph(plotData);
			return;
		}

		var data = filterData("space type", value);
		if(data.length > 0){
			plotGraph(data);
		}		
	});
});

function loadData(){
	$.ajax({
		url: "data/final_db_test_2.json",
		success: function(response){			
			plotData = response;	
			plotGraph(plotData);		
		},
		error: function(response){
			console.log(response);
		}
	})
}

function filterData(key, value){
	var data = $.grep(plotData, function(obj){				
		return (obj[key].toLowerCase() == value.toLowerCase());		
	});	
	return data;
}


var width = 700;
var height = 500;

function plotGraph(data){	
	var zone = [1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6];
	var rdii = 40;
	var p1 = width/2;
	var p2 = height/2;

	// Defining Colors for each tag

	d3.select("svg").remove();

	var canvas = d3.select("body").append("svg")
				.attr("width", width)
				.attr("height", height)
				//.attr("transform","translate(200,200)")

//	var colorMap = d3.scaleOrdinal().domain(["Media Facade","Light Architecture","Installation","Kinetic Facade","Game","Projection Mapping","Element"]).range(["#EE8434","#F76F8E","#2ecc71","#9b59b6","#f1c40f","#3498db","#40798C"]);
var colorMap = d3.scaleOrdinal().domain(['Installation',
										 'Kinetic Facade',
										 'Projection Mapping',
										 'Architectural Element',
										 'Media Facade',
										 'Immersive Environment',
										 'Smart House',
										 'Urban Screen',
										 'Light Architecture',
										 'Game',
										 'Mobile Application',
										 'Simulation',
										 'Smart Citizen',
										 'Architecture'
											]).range(['#87bcde',
													  '#89717f',
													  '#c4c3c3',
													  '#a599b4',
													  '#e1576d',
													  '#a0d29b',
													  '#896e54',
													  '#3e4e50',
													  '#fbde76',
													  '#f69774',
													  '#24967f',
													  '#eeaac3',
													  '#fbbfa0',
													  '#b63151'
														]);


	var bg_circle = canvas.selectAll("circle")
							.data(zone)
							.enter()
							.append("circle")
							.attr("cx",p1)
							.attr("cy",p2)
							.attr("r", function(d){ return d*rdii;})
							.attr("fill","none")
							.attr("stroke","#bdc3c7")
							.attr("stroke-width",2);
							
	var dots = canvas.selectAll("circle")
	 			.data(data)
	 			.enter()
	 			.append("circle") 			
	 			.attr("cx",function(d,i){		 					 			
					if(d.rank==6)
					{
						return p1 + rdii*Math.cos(i);

					}
					else if(d.rank==5.5)
					{
						return p1 + 1.5*rdii*Math.cos(i);
					}
					else if(d.rank==5)
					{
						return p1 + 2*rdii*Math.cos(i);
					}
					else if(d.rank==4.5)
					{
						return p1 + 2.5*rdii*Math.cos(i);
						
					}
					else if(d.rank==4)
					{
						return p1 + 3*rdii*Math.cos(i);
					}
					else if(d.rank==3.5)
					{
						return p1 + 3.5*rdii*Math.cos(i);
					}
					else if(d.rank==3)
					{
						return p1 + 4*rdii*Math.cos(i);
					}
					else{
						 return p1 + 4.5*rdii*Math.cos(i);
					}			
	 			})
	 			.attr("cy",function(d,i){ 

	 				if(d.rank==6)
	 				{
	 					return p2 + rdii*Math.sin(i);

	 				}
	 				else if(d.rank==5.5)
	 				{
	 					return p2 + 1.5*rdii*Math.sin(i);
	 				}
	 				else if(d.rank==5)
	 				{
	 					return p2 + 2*rdii*Math.sin(i);
	 				}
	 				else if(d.rank==4.5)
	 				{
	 					return p2 + 2.5*rdii*Math.sin(i);
	 				}
	 				else if(d.rank==4)
	 				{
	 					return p2 + 3*rdii*Math.sin(i);
	 				}
	 				else if(d.rank==3.5)
	 				{
	 					return p2 + 3.5*rdii*Math.sin(i);
	 				}
	 				else if(d.rank==3)
	 				{
	 					return p2 + 4*rdii*Math.sin(i);
	 				}
	 				else{
	 					 return p2 + 4.5*rdii*Math.sin(i);
	 				}
					
	 			})
	 			.attr("r",5)
	 			.attr("fill",function(d){ return colorMap(d.tags);})
	 			.on("mouseover", function(d){
	 				tooltip.style("display",null);
	 			})
	 			.on("click", function(d){	 				
	 				$("#circle-id").html(d.id);
	 				$("#point-modal").modal();
	 			})
	 			.on("mouseout", function(){
	 				tooltip.style("display","none");
	 			})
	 			.on("mousemove",function(d){
	 				var xPos = d3.mouse(this)[0]-15;
	 				var yPos = d3.mouse(this)[1]-40;

	 				tooltip.attr("transform","translate("+ xPos + " , "+ yPos +" )");

	 				tooltip.select("text").text(d.title);
	 			});

	 			var tooltip = canvas.append("g")
	 						  .attr("class","tooltip")
	 						  .style("display","none");

	 			tooltip.append("text")
	 					.attr("x", 15)
	 					.attr("dy","1.2em")
	 					.style("font-size","1.0 em");
}

