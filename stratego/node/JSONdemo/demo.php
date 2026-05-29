<!DOCTYPE HTML>
<head>
	<title>Demo voor JSON RPC protocol</title>
</head>
<body>
	<textarea id="JSONcode" style="width: 100%;height: 8em;">{"jsonrpc": "2.0", "method": "start_spel", "params": {"token": "123456", "opties": null}, "id": 1}</textarea><br>
	<button onclick = "submitJSON()"> versturen</button>


	<script>
	function submitJSON() {
		var JSONcode = document.getElementById("JSONcode").value;
		const xhttp = new XMLHttpRequest();
		xhttp.onload = function() {
			document.getElementById("demo").innerHTML =
			this.responseText;
			
			// Maak van het response een object en print het in de console (druk op F12 om dat te zien)
			var JSONresponse = JSON.parse(this.responseText);
			console.log(JSONresponse);
		}
		xhttp.open("POST", "server.php");
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send("JSON="+JSONcode);
	}
	</script>

	<pre id="demo"></pre>
</body>
</html>