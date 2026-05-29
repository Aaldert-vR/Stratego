<?php

// TODO: maak op deze plek verbinding met de database (dbconn.php)

if (ISSET($_POST["JSON"])) {
	$request = json_decode($_POST["JSON"]);
	
	// Maak een result-object aan.
	$result = new stdClass();  // Zo maak je in PHP een leeg object aan.
	
	// Controleer het meegestuurde token
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	/* Uitleg: Waar je in JavaScript een . gebruikt om een attribuut van een object te nemen,
	/* gebruik je in PHP -> . In JavaScript zou je "$request->params->token" dus schrijven als
	/* "request.params.token". Als daar een waarde van is ingesteld, kan je hem controleren.
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	if (isset($request->params->token)) {
		// verzamel data uit het request-object
		$token = $request->params->token;
		
		// maak een query
		$query="SELECT...";
		
		// voer de query uit
		// TODO: voeg hier de if (mysqli_query(...))-regels toe.
		
		// verwerk het resultaat en zet het in het result-object
		//TODO: hard-coded 123456 vervangen door $opgehaald_token (token uit de database)
		if ($token == "123456") {
			// Hier kan je bijvoorbeeld gegevens over de gebruiker of het huidige spel uit de database laden.
			
		} else {
			print('{"jsonrpc": "2.0", "error": {"code": 2, "message": "Onbekend token meegestuurd. Log opnieuw in."}, "id": '.$request->id.'}');
			exit(); // Stop ermee als het token onbekend is
		}
		
	} else {
		print('{"jsonrpc": "2.0", "error": {"code": 1, "message": "Geen token meegestuurd. Log eerst in."}, "id": '.$request->id.'}');
		exit(); // Stop ermee als er geen token is opgestuurd
	}
	
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	/* Uitleg: hieronder zie je twee voorbeelden: de methods start_spel en test.
	/* De eerste stuurt een object als result terug, met daarin een message.
	/* De tweede overschrijft de waarde van $result met een stukje tekst.
	/* Als je result geen object is, maar tekst, kan je dus ook gewoon $result = "..." schrijven.
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	
	// Kijk welke method er aangevraagd wordt door de client en voer de bijbehorende actie uit.
	if ($request->method == "start_spel") {
		$result->message = "gelukt!";
	}
	
	if ($request->method == "test") {
		$result = "check";
	}
	// TODO: voeg andere methods hier toe. 
	
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	/* Uitleg: Gebruik "Uitleg: Gegevens invoeren" en "Uitleg: Gegevens ophalen" hierbij.
	/* De structuur van het maken van een query is hetzelfde.
	/* Misschien heb je soms ook nodig om eerst gegevens in te voeren (op te slaan) 
	/* en daarna andere gegevens op te halen. Dan plak loop je beide stappenplannen 
	/* achter elkaar door. Die stappenplannen staan in de "Uitleg:..."-stukjes voorgedaan.
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	
	// Dit is een voorbeeld-method die je zelf kan invullen. Gebruik dit als template.
	if ($request->method == "eigen_method") {
		// verzamel data uit het request-object
		
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
		/* Uitleg: vergelijk het met $opgestuurde_naam = $_POST["naam"].
		/* In dit geval zou je dan schrijven $opgestuurde_naam = $request->params->naam
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
		
		// maak een query
		
		// voer de query uit
		
		// verwerk het resultaat en zet het in het result-object
		
	}
	
	// maak een response-object aan.
	$response = new stdClass(); // Zo maak je in PHP een leeg object aan.
	$response->jsonrpc = "2.0"; // Maak een attribuut "jsonrpc" aan met de waarde "2.0"
	$response->id = $request->id; // Neem het attribuut "id" over van het request-object.
	$response->result = $result;
	
	print(json_encode($response));
}

// TODO: verbreek hier de verbinding met de database.
