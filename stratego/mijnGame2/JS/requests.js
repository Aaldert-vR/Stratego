function updateData(){
    let a=sendRequest({data: "abc"});
    console.log("\n\n");
    console.log(a);
}

setInterval(updateData, 1000);

function registerRequest(email, password, nickname=null){
    let rqst={email: email};
    rqst.password=password;
    rqst.nickname=nickname;
    let response=sendRequest(rqst);
    if (response.status==200 || response.status==201){
        if(response.geslaagd==true){
            return true
        }
    }
    return false;
}