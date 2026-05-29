function format(str, ...values){
    return str.replace(/{(\d+)}/g, function(match, index){
        return typeof values[index] != 'undefined' ? values[index] : match;
    });
}

let formattedStr = format("Hello, {0}! You have {1} new messages.", "GeeksforGeeks", 5);
console.log(formattedStr);

function sendRequest(jsonData){
    const xhr=new XMLHttpRequest();
    xhr.open("POST", "myApi.php", async=false);
    let returnVal=null;
    xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function(){
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log(xhr.responseText);
                var msg=JSON.parse(xhr.responseText);
                console.log(msg)
                if(msg.valid==true){
                    console.log("valid!");
                }
                klaar=msg.valid;
                returnVal=xhr.responseText;
                returnVal.status=xhr.status;
            } 
            else {
                console.log(`Error: ${xhr.status}`);
            }
            returnVal={status: xhr.status};
        };
    console.log(JSON.stringify(jsonData));    
    xhr.send(jsonData);
    console.log(xhr);
    return returnVal;
}