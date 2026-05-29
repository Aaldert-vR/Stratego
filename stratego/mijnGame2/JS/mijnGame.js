//variabelen die nodig zijn
var mx,my;

//alle afbeeldingen laden
function preload(){
	spritesheet = loadImage("images/sprites.png");
	redSprite = loadImage("images/Stratego_RED.png");
	blueSprite = loadImage("images/Stratego_BLUE.png");
	flag = loadImage("images/stratego flag.png");
	background1=loadImage("images/background1.jpg");
}
//het spel voorbereiden
function setup(){
	canvas = createCanvas(1100,600);
	canvas.parent('processing');
	background=new Background(background1,0,0,canvas.height,canvas.height);
	bord = new Raster(10,10);
	bord.bereken();
	red=new Speler(1);
	blue=new Speler(-1);
	spel=new Spel(bord,red,blue);
	spel.maakStukken();
	// wacht met de beurt totdat alle stukken geplaatst zijn
	// spel.plaatsFase wordt gebruikt om te bepalen of we nog aan het plaatsen zijn
	document.getElementById('game-message').innerText = 'Plaats eerst alle stukken (klik een reserve-stuk en klik een vak op het bord).';
	//Nu ziet gaat de speler iets zien
	spel.tekenSituatie();
}


function mouseClicked(){
	if(!spel.spelend) return;
	mx=mouseX;
	my=mouseY;
	// Plaatsingsfase: selecteer reserve-stuk of plaats geselecteerd stuk op bord
	if(spel.plaatsFase){
		// selecteer een ongeplaatst stuk
		if(red.stukHier(mx,my)){
			var s = red.stukken[red.stukZetten];
			if(!s.placed){
				spel.selectedStuk = s;
			}
		}
		if(!spel.selectedStuk && blue.stukHier(mx,my)){
			var s2 = blue.stukken[blue.stukZetten];
			if(!s2.placed){
				spel.selectedStuk = s2;
			}
		}
		// als een stuk geselecteerd is en we klikken op het bord, plaats het
		if(spel.selectedStuk){
			// bereken cel
			var cx = Math.floor(mx / bord.celGrootte) * bord.celGrootte;
			var cy = Math.floor(my / bord.celGrootte) * bord.celGrootte;
			// binnen bord
			if(cx>=0 && cy>=0 && cx<=9*bord.celGrootte && cy<=9*bord.celGrootte){
				// geen stuk op die cel
				var bezet=false;
				for (var i=0;i<red.stukken.length;i++){
					if(red.stukken[i].placed && red.stukken[i].x==cx && red.stukken[i].y==cy) bezet=true;
				}
				for (var i=0;i<blue.stukken.length;i++){
					if(blue.stukken[i].placed && blue.stukken[i].x==cx && blue.stukken[i].y==cy) bezet=true;
				}
				if(!bezet){
					spel.selectedStuk.x = cx;
					spel.selectedStuk.y = cy;
					spel.selectedStuk.placed = true;
					spel.placedCount++;
					spel.selectedStuk = null;
					fill("white")
					rect(canvas.height,0,canvas.width-canvas.height,canvas.height);
					// controleer of alle stukken geplaatst zijn
					var total = red.stukken.length + blue.stukken.length;
					if(spel.placedCount >= total){
						spel.plaatsFase = false;
						spel.spelend=true;
						red.aanDeBeurt = true;
						document.getElementById("game-message").innerHTML=spel.languages[spel.language]["plaatsEerst"];
					}
				}
			}
		}
		spel.tekenSituatie();
		return;
	}
	// normale interactie als het spel al begonnen is
	if(spel.spelend){
		if (red.aanDeBeurt){
			if(red.stukHier(mx,my)){
				spel.aanHetZetten=true;
			}
		}
		else{
			if(blue.stukHier(mx,my)){
				spel.aanHetZetten=true;
			}
		}
		
		}
	if(spel.spelend){
		spel.tekenSituatie();
	}
	
}
//een stuk verplaatsen
function keyPressed(){
	if(!spel.spelend) return;
	// tijdens plaatsingsfase geen zetten toelaten
	if(spel.plaatsFase) return;
	if(spel.aanHetZetten){
		spel.controleerToets();
	}
	if(spel.spelend){
		spel.tekenSituatie();
	}
}

//taalinstelling
function checkLanguage(){
	var m1=false;
	if (document.getElementById("game-message").innerHTML==spel.languages[spel.language]["gaSpelen"]){
		m1=true;
	}
	var EN=document.getElementById("EN");
	var NL=document.getElementById("NL");
	if (EN.checked){
		spel.language="EN";
	}
	if (NL.checked){
		spel.language="NL";
	}
	if(spel.plaatsFase){
		document.getElementById("game-message").innerHTML=spel.languages[spel.language]["plaatsEerst"];
	}
	else if(m1){
		document.getElementById("game-message").innerHTML=spel.languages[spel.language]["gaSpelen"];
	}
}