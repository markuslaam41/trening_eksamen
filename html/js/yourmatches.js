
var getMatchesButton = document.getElementById("getMatches");
//adds an eventlistener to the button
getMatchesButton.addEventListener("click",function(){

    var getMatches= document.getElementById("get_matches").value;
     //Using fetch to find the users matches
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
// adds an eventlistener to form
form_delete_match.addEventListener('click',function(e){
    e.preventDefault()

    //makes variables for the value from the form
    var match_delete = document.getElementById("id_delete_match").value;
    
    //using fetch to delete the match for the user
    fetch(`http://localhost:7071/api/user?name=${match_delete}`,{method:'DELETE'})
    .then(

        //If wrong return response.status
        function(response){
            if(response.status!=200){
                console.log("Noe gikk galt" + response.status);
                return; 
            }

            //Else log data
            response.json().then(function (data){
                console.log(data)

        
            })
        }
    )

    //Error handling
    .catch(function(err){
        console.log(err);
    });
})

