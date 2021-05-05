var form = document.getElementById("form");

form.addEventListener('submit',function(e){
    e.preventDefault()

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var country = document.getElementById("country").value;
    var birthday = document.getElementById("birthday").value;
    var gender = document.getElementById("gender").value;

    fetch("http://localhost:7071/api/user", {
        method:'POST',
        body: JSON.stringify({
            name:name,
            email:email,
            country:country,
            birthday:birthday,
            gender:gender
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

var getButton = document.getElementById("getUsers");

getButton.addEventListener("click",function(){

    var name1= document.getElementById("name").value;

    fetch(`http://localhost:7071/api/user?name=${name1}`)
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
    
var deleteBtn= document.getElementById("deleteUsers");

deleteBtn.addEventListener("click",function(){

    var name_delete= document.getElementById("name").value;

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

    var name_update = document.getElementById("name_update").value;
    var email_update = document.getElementById("email_update").value;
    var country_update = document.getElementById("country_update").value;
    var birthday_update = document.getElementById("birthday_update").value;
    var gender_update = document.getElementById("gender_update").value;

    fetch("http://localhost:7071/api/user",{method:'PUT'},{
        
        body: JSON.stringify({
            name_update:name_update,
            email_update:email_update,
            country_update:country_update,
            birthday_update:birthday_update,
            gender_update:gender_update
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

//var form_delete= document.getElementById("form_delete");

 
 
//var deleteUser = document.getElementById("Submit_delete");

/*
form_delete.addEventListener('Submit',function(e){
    e.preventDefault()

    var name_delete = document.getElementById("name_delete").value;
    var email_delete = document.getElementById("email_delete").value;
    var country_delete = document.getElementById("country_delete").value;
    var birthday_delete = document.getElementById("birthday_delete").value;
    var gender_delete = document.getElementById("gender_delete").value;

    fetch("http://localhost:7071/api/user", {
        method:'DELETE',
        body: JSON.stringify({
            name_delete:name_delete,
            email_delete:email_delete,
            country_delete:country_delete,
            birthday_delete:birthday_delete,
            gender_delete:gender_delete
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
*/
    
