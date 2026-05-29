//De klasse raster, alleen nodig voor de vakjes en de stapgrootte van de stukken
class Raster{
	constructor(nx,ny){
		this.aantalRijen = ny;
		this.aantalKolommen = nx;
		this.celGrootte=null;
	}
	bereken(){
			this.celGrootte = canvas.height/this.aantalRijen;
		
	}
	teken(){
		push();
		
		for (var y=0; y<10; y++){
      		for (var x=0; x<10 ;x++){
				
				fill(255,255,255,0);
				stroke("black");
				//strokeWeight(1);
				rect(x*this.celGrootte,y*this.celGrootte,this.celGrootte);		
      }
    }
		pop();
	}
}
