var form_delete = document.getElementById("deleteUsers");

form_delete.addEventListener('click',function(e){
    e.preventDefault()


    var name_delete = document.getElementById("name_delete").value;


    fetch(`http://localhost:7071/api/user?name=${name_delete}`,{method:'DELETE'})
    .then(
        function(response){
            if(response.status!=200){
                console.log("Noe gikk galt" + response.status);
                return; 
            }
            response.json().then(function (data){
                console.log(data);
            });
        }
    )
    .catch(function(err){
        console.log(err);
    });
})


   

    
var form_update = document.getElementById("form_update");

form_update.addEventListener('submit',function(e){
    e.preventDefault()
    var name_update = document.getElementById("name_delete")

    var name_update = document.getElementById("name_update").value;
    var email_update = document.getElementById("email_update").value;
    var country_update = document.getElementById("country_update").value;
    var birthday_update = document.getElementById("birthday_update").value;
    var gender_update = document.getElementById("gender_update").value;

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

    .then((response)=>{
        return response.json()
    })
    .then((data)=>{
        console.log(data)
    })
    .catch((err)=>{
        console.log(err)
    })
})
