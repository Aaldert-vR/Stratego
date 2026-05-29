//Het strategospel
class Spel{
    constructor(raster,s1,s2){
        this.speler1=s1;
        this.speler2=s2;
        this.plaatsFase = true; // true zolang stukken nog geplaatst moeten worden
        this.selectedStuk = null;
        this.placedCount = 0;
        this.aanHetZetten=false;
        this.spelend=true;
        //We hebben nu maar één taal nodig, maar dit maakt het gemakkelijker om een optie taal toe te voegen.
        this.languages={
            "NL":{
                "blue": "Blauw",
                "red": "Rood",
                "rede": "rode",
                "bluee": "blauwe",
                "marshal": "maarschalk",
                "general": "generaal",
                "colonel": "kolonel",
                "major": "majoor",
                "captain": "kapitein",
                "lieutenant": 'luitenant',
                "sergeant": "sergeant",
                "minor": "mineur",
                "scout": "verkenner",
                "spy": "spion",
                "bomb": 'bom',
                "flag": "vlag",
                "pieceMessage1": "Het ",
                "pieceMessage2": " stuk was een ",
                "plaatsEerst": "Plaats eerst alle stukken (klik een reserve-stuk en klik een vak op het bord).",
                "gaSpelen": "Alle stukken zijn geplaatst. Het spel begint."
            },
            "EN":{
                "blue": "Blue",
                "red": "Red",
                "rede": "red",
                "bluee": "blue",
                "marshal": "marshal",
                "general": "general",
                "colonel": "colonel",
                "major": "major",
                "captain": "captain",
                "lieutenant": 'lieutenant',
                "sergeant": "sergeant",
                "minor": "minor",
                "scout": "scout",
                "spy": "spy",
                "bomb": 'bomb',
                "flag": "flag",
                "pieceMessage1": "The ",
                "pieceMessage2": " piece was a ",
                "plaatsEerst": "Place all pieces first (click on a piece and click a box on the game board).",
                "gaSpelen": "All pieces are placed. The game begins."

            }
        }
        this.language="NL"
    }
    //Stukken maken voor beide spelers
    maakStukken(){
        // Plaats stukken eerst in een reservegebied rechts van het bord
        // reserveX begint na het bord (bord width = 10*celGrootte)
        var reserveX = 10*bord.celGrootte + 20;
        // maak 8 gelijke stukken per speler
        for (var i=0; i<8; i++){
            var rx = reserveX + (i%5*bord.celGrootte);
            var ry1 = 10 + Math.floor(i/5)*bord.celGrootte;
            var ry2 = 10 + 300 + Math.floor(i/5)*bord.celGrootte;
            // eerste speler (red) in het bovenste reserveblok
            this.speler1.stukken.push(new Stuk(2,rx,ry1,"red",false))
            // tweede speler (blue) in het onderste reserveblok
            this.speler2.stukken.push(new Stuk(2,rx,ry2,'blue',false))
        }
        // extra speciale stukken
        this.speler1.stukken.push(new Stuk(10,reserveX+4*bord.celGrootte,10+3*bord.celGrootte,"red",false));
        this.speler1.stukken.push(new Stuk("flag",reserveX+3*bord.celGrootte,10+1*bord.celGrootte,"red",false));
        this.speler2.stukken.push(new Stuk("flag",reserveX+3*bord.celGrootte,310+1*bord.celGrootte,"blue",false));
        this.speler2.stukken.push(new Stuk(10,reserveX+4*bord.celGrootte,310+3*bord.celGrootte,"blue",false));
        this.speler1.stukken.push(new Stuk(1,reserveX+4*bord.celGrootte,10+bord.celGrootte,"red",false));
        this.speler2.stukken.push(new Stuk(1,reserveX+4*bord.celGrootte,310+bord.celGrootte,"blue",false));
        for (var i=0; i<5; i++){
            this.speler1.stukken.push(new Stuk(3, reserveX+i*bord.celGrootte,10+2*bord.celGrootte+floor(i/5)*bord.celGrootte,"red",false))
        }
        for (var i=0; i<5; i++){
            this.speler2.stukken.push(new Stuk(3, reserveX+i*bord.celGrootte,10+7*bord.celGrootte+floor(i/5)*bord.celGrootte,"blue",false))
        }
        for (var i=0; i<6; i++){
            this.speler1.stukken.push(new Stuk(0,reserveX+i*bord.celGrootte,10+4*bord.celGrootte,"red",false));
            this.speler2.stukken.push(new Stuk(0,reserveX+i*bord.celGrootte,310+4*bord.celGrootte,"blue",false));
        }
        for (var i=0; i<4;i++){
            this.speler1.stukken.push(new Stuk(4,reserveX+5*bord.celGrootte,10+i*bord.celGrootte,"red",false));
            this.speler2.stukken.push(new Stuk(4,reserveX+5*bord.celGrootte,310+i*bord.celGrootte,"blue",false));
            this.speler1.stukken.push(new Stuk(5,reserveX+6*bord.celGrootte,10+i*bord.celGrootte,"red",false));
            this.speler2.stukken.push(new Stuk(5,reserveX+6*bord.celGrootte,310+i*bord.celGrootte,"blue",false));
            this.speler1.stukken.push(new Stuk(6,reserveX+7*bord.celGrootte,10+i*bord.celGrootte,"red",false));
            this.speler2.stukken.push(new Stuk(6,reserveX+7*bord.celGrootte,310+i*bord.celGrootte,"blue",false));
        }
        for (var i=0; i<3; i++){
            this.speler1.stukken.push(new Stuk(7,reserveX+i*bord.celGrootte,10+3*bord.celGrootte,"red",false));
            this.speler2.stukken.push(new Stuk(7,reserveX+i*bord.celGrootte,310+3*bord.celGrootte,"blue",false));
        }
        for (var i=0; i<2; i++){
            this.speler1.stukken.push(new Stuk(8,reserveX+(6+i)*bord.celGrootte,10+4*bord.celGrootte,"red"));
            this.speler2.stukken.push(new Stuk(8,reserveX+(6+i)*bord.celGrootte,310+4*bord.celGrootte,"blue"));
        }
        this.speler1.stukken.push(new Stuk(9,reserveX+3*bord.celGrootte,10+3*bord.celGrootte,"red"));
        this.speler2.stukken.push(new Stuk(9,reserveX+3*bord.celGrootte,310+3*bord.celGrootte,"blue"));
       
    }
    //is er een toets ingedrukt die mag?
    controleerToets(){
        var optellen=0;
        var invoerGeldig=true;
        if (keyCode==LEFT_ARROW){
            optellen=[-bord.celGrootte,0];
        }
        else if(keyCode==RIGHT_ARROW){
            optellen=[bord.celGrootte,0];
        }
        else if(keyCode==UP_ARROW){
            optellen=[0,-bord.celGrootte];
        }
        else if (keyCode==DOWN_ARROW){
            optellen=[0,bord.celGrootte];
        }
        else{
            invoerGeldig=false;
        }
        if (invoerGeldig){
            if(red.aanDeBeurt){
                red.zetStuk(optellen);
            }
            else if (blue.aanDeBeurt){
                blue.zetStuk(optellen);
            }
        }
    }
    //Helemaal aan het eind laten zien wie gewonnen heeft
    eindScherm(gewonnen){
        //noLoop();
        this.spelend=false;
        fill(255,0,0,128);
        rect(0,0,canvas.height);
        fill(0,0,255,128);
        rect(canvas.width/2,0,canvas.height);
        fill("yellow");
        if (gewonnen == "blue"){
            var zetten=blue.aantalZetten;
        }
        else{
            var zetten=red.aantalZetten;
        }
        var tekst=this.languages[this.language][gewonnen]+" heeft gewonnen in "+zetten+" zetten!";
        textSize(50);
        text(tekst,20,20,canvas.width);
    }
    //De huidige toestand van het spel tekenen
    tekenSituatie(){
	    background.draw();
	    bord.teken();
	    if (this.aanHetZetten){
		    if(red.aanDeBeurt){
			    var stuk=red.stukken[red.stukZetten];
		    }
		    else{
			    var stuk=blue.stukken[blue.stukZetten];
		    }
		    fill("yellow");
		    rect(stuk.x,stuk.y,bord.celGrootte);
	    }
	    for (var i=0; i<red.stukken.length; i++){
		    red.stukken[i].teken();
	    }
	    for (var i=0; i<blue.stukken.length; i++){
		    blue.stukken[i].teken();
        }
	}
    snelKlaar(){
        red.plaatsAlle(0);
        blue.plaatsAlle(6);
        this.tekenSituatie();
    }
}