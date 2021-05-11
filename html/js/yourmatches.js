
var getMatchesButton = document.getElementById("getMatches");

getMatchesButton.addEventListener("click",function(){

    var getMatches= document.getElementById("get_matches").value;

    fetch(`http://localhost:7071/api/user?name=${getMatches}`)
    .then(
        function(response){
            
            if(response.status!=200){
               
                console.log("Noe gikk galt" + response.status);
                return;
            }
            response.json().then(function (data){
               
                console.log(data);
            })
        }  
        
    )
    .catch(function(err){
        console.log(err);
    });
})

var form_delete_match = document.getElementById("deleteMatch");

form_delete_match.addEventListener('click',function(e){
    e.preventDefault()


    var match_delete = document.getElementById("id_delete_match").value;
    

    fetch(`http://localhost:7071/api/user?name=${match_delete}`,{method:'DELETE'})
    .then(
        function(response){
            if(response.status!=200){
                console.log("Noe gikk galt" + response.status);
                return; 
            }
            response.json().then(function (data){
                console.log(data)

        
            })
        }
    )
    .catch(function(err){
        console.log(err);
    });
})

