//De rangen op volgorde van laag naar hoog
images=["bomb","spy","scout","minor","sergeant","lieutenant","captain","major","colonel","general","marshal"]


//De klasse Stuk
class Stuk{
    constructor(rank,x,y,c,placed=true){
			this.x=x;
			this.y=y;
            this.stapGrootte=bord.celGrootte;
            this.placed = placed;
            if (rank == "flag"){
                this.type="flag";
                this.rank=0;
            }
            else{
			    this.type=images[rank];
                this.rank=rank;
            }
            this.visible=true;
            this.standardVisible=true;
            this.color=c;
            if (this.color=="red"){
                this.speler=red;
                this.tegenstander=blue;
            }
            else{
                this.speler=blue;
                this.tegenstander=red;
                this.visible=false;
                this.standardVisible=false;
            }
    }
//teken een stuk
    teken(){
        if (this.color == "red"){
            image(redSprite, this.x+2,this.y+2,this.stapGrootte-4,this.stapGrootte-4);
        }
        else if (this.color == "blue"){
            image(blueSprite, this.x+2,this.y+2,this.stapGrootte-4,this.stapGrootte-4);
        }
        if (this.visible){
            if(this.type=="flag"){
                image(flag,this.x+8,this.y+8,this.stapGrootte-20,this.stapGrootte-15);
            }
            else{
                image(spritesheet,this.x+8,this.y+8,this.stapGrootte-20,this.stapGrootte-15,15+152*(this.rank%6),15+225*floor(this.rank/6),110,110/40*45);
            }
        }
    }

//Zet een stuk
    zet(x,y){
        //Een zet mag niet:
        // - als het stuk buiten het veld zou komen
        // - als er al een eigen stuk staat
        // - als het stuk een bom of vlag is.
        var zetMag=true;
        if (this.rank==0){
            zetMag=false;
        }
        for (var s=0; s<this.speler.stukken.length; s++){
            if(this.speler.stukken[s].x==this.x+x && this.speler.stukken[s].y==this.y+y && this.speler.stukken[s]!=this){
                zetMag=false;
            }
        }
        if (this.x+x<0 || this.y+y<0 || this.x+x>9*bord.celGrootte || this.y+y>9*bord.celGrootte){
            zetMag=false;
        }
        if(zetMag){
            this.speler.aantalZetten++;
            this.x+=x;
            this.y+=y;
            x=this.x;
            y=this.y;
            this.speler.aanDeBeurt=false;
            this.tegenstander.aanDeBeurt=true;
            spel.aanHetZetten=false;
            for (var s=0;s<this.tegenstander.stukken.length;s++){
                if (x==this.tegenstander.stukken[s].x&&y==this.tegenstander.stukken[s].y){
                    this.sla(this.tegenstander.stukken[s]);
                }
            }
        }
    }

//Slaan: volgens de regels van Stratego
    sla(stuk){
        const language=spel.languages[spel.language];
        
        document.getElementById("game-message").innerHTML=language["pieceMessage1"] +language[this.color+"e"]+language["pieceMessage2"]+spel.languages[spel.language][this.type]+" ("+this.rank+");<br>";
        document.getElementById("game-message").innerHTML+=language["pieceMessage1"] +language[stuk.color+"e"]+language["pieceMessage2"]+spel.languages[spel.language][stuk.type]+" ("+stuk.rank+");<br>";
//bom of vlag
        if (stuk.rank==0){
            if(stuk.type=="bomb"){
                if (this.rank==3){
                    var a=[];
                    for (var s=0;s<this.tegenstander.stukken.length;s++){
                        if (this.tegenstander.stukken[s]!=stuk){
                            a.push(this.tegenstander.stukken[s]);
                        }
                    }
                    this.tegenstander.stukken=a;
                }
                else{
                    var a=[];
                    for (var s=0; s<this.speler.stukken.length;s++){
                        if(this.speler.stukken[s]!=this){
                            a.push(this.speler.stukken[s]);
                        }
                    }
                    this.speler.stukken=a;
                }
            }
            else{
                noLoop();
                spel.eindScherm(this.color);
            }
        }
        //eigen rang hoger dan rang van ander
        else if (this.rank>stuk.rank){
            var a=[];
            for (var s=0;s<this.tegenstander.stukken.length;s++){
                if (this.tegenstander.stukken[s]!=stuk){
                    a.push(this.tegenstander.stukken[s]);
                }
            }
            this.tegenstander.stukken=a;
        }
        else if (this.rank<stuk.rank){
            //spion:
            if (stuk.rank==10 &&this.rank==1){
                var a=[];
                for (var s=0;s<this.tegenstander.stukken.length;s++){
                    if (this.tegenstander.stukken[s]!=stuk){
                        a.push(this.tegenstander.stukken[s]);
                    }
                }
                this.tegenstander.stukken=a;
            }
            else{
                //geen spion&maarscalk:
                var a=[];
                for (var s=0;s<this.speler.stukken.length;s++){
                    if (this.speler.stukken[s]!=this){
                        a.push(this.speler.stukken[s]);
                    }
                }
                this.speler.stukken=a;
            }
        }
        else{
            //verwijder beide als ze hetzelfde rang hebben
            var a=[];
            for (var s=0;s<this.tegenstander.stukken.length;s++){
                if (this.tegenstander.stukken[s]!=stuk){
                    a.push(this.tegenstander.stukken[s]);
                }
            }
            this.tegenstander.stukken=a;
            a=[];
            for (var s=0;s<this.speler.stukken.length;s++){
                if (this.speler.stukken[s]!=this){
                    a.push(this.speler.stukken[s]);
                }
            }
            this.speler.stukken=a;
            }
        }
    }
