var form_delete = document.getElementById("deleteUsers");

//adds an eventlistener to form
form_delete.addEventListener('click',function(e){
    e.preventDefault()

     //Makes variables for the value from the form
    var name_delete = document.getElementById("name_delete").value;
    
      //Using fetch to access the localhost user page and DELETE the given name
    fetch(`http://localhost:7071/api/user?name=${name_delete}`,{method:'DELETE'})
    .then(

        //Posting handling response
        function(response){
            if(response.status!=200){
                console.log("Noe gikk galt" + response.status);
                return; 
            }

            //Log data if approved
            response.json().then(function (data){
                console.log(data)
                window.replace = "signup_login.html"
        
            })
        }
    )

    //Error handling
    .catch(function(err){
        console.log(err);
    });
})


   

    
var form_update = document.getElementById("form_update");
//adds an eventlistener to form
form_update.addEventListener('submit',function(e){
    e.preventDefault()
    //Makes variables for the different values from the form
    var name_update = document.getElementById("name_delete")

    var name_update = document.getElementById("name_update").value;
    var email_update = document.getElementById("email_update").value;
    var country_update = document.getElementById("country_update").value;
    var birthday_update = document.getElementById("birthday_update").value;
    var gender_update = document.getElementById("gender_update").value;

    //Using fetch to access the localhost user page and update the given values to the given name
    fetch(`http://localhost:7071/api/user?name=${name_update}`,{method:'PUT'},{
        
        body: JSON.stringify({
            name:name_update,
            email:email_update,
            country:country_update,
            birthday:birthday_update,
            gender:gender_update
        }),
        headers:{
            "Content-Type":"application/json; charset-UTF-8"
        }
    })
      // Using .then to make a response and returning with json
    .then((response)=>{
        return response.json()
    })
      //printing the updated data
    .then((data)=>{
        console.log(data)
    })

    //Error handling
    .catch((err)=>{
        console.log(err)
    })
})
