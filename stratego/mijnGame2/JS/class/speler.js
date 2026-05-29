//de spelers rood en blauw
class Speler{
    constructor(side){
        this.side=side;
        this.aanDeBeurt = false;
        this.stukken=[];
        this.stukZetten=null;
        this.aantalZetten=0;
    }
    //als er een stuk in hetzelfde hokje is als de x en de y, returnt deze methode de x en de y van dat stuk en wordt dat stuk geselecteerd
    stukHier(x,y){
        var isStukHier=false;
        for (var i=0; i<this.stukken.length; i++){
            if (this.stukken[i].x<=x && this.stukken[i].x>=x-bord.celGrootte && this.stukken[i].y<=y && this.stukken[i].y>=y-bord.celGrootte){
                isStukHier=true;
                this.stukZetten=i;
            }
            
        }
        return isStukHier;
    }
    //Een stuk zich laten zetten
    zetStuk(opt){
        this.stukken[this.stukZetten].zet(opt[0],opt[1]);

    }
    //debug en cheat
    plaatsAlle(y){
        for (var i=0; i<this.stukken.length;i++){
            this.stukken[i].x=(i%10)*bord.celGrootte;
            this.stukken[i].y=(floor(i/10)+y)*bord.celGrootte;
            this.stukken[i].placed=true;
            spel.placedCount++;
            fill("white")
				rect(canvas.height,0,canvas.width-canvas.height,canvas.height);
            spel.tekenSituatie;
            var total = red.stukken.length + blue.stukken.length;
			if(spel.placedCount >= total){
				spel.plaatsFase = false;
				spel.spelend=true;
				red.aanDeBeurt = true;
				document.getElementById("game-message").innerHTML=spel.languages[spel.language]["gaSpelen"];
            }
        }
    }
    verplaatsVlag(x,y){
        for (var i=0;i<this.stukken.length;i++){
            if (this.stukken[i].type=="flag"){
                this.stukken[i].x=x*bord.celGrootte;
                this.stukken[i].y=y*bord.celGrootte;
            }
        }
    }
}