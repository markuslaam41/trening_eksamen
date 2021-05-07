
/*var matchForm = document.getElementById("matchUser")

matchForm.addEventListener("click", function(e){
    e.preventDefault()
   
    alert("Its a match")
})*/




var form = document.getElementById("form");

form.addEventListener('submit',function(e){
    e.preventDefault()


  //  var userId1 = document.getElementById("userId1").value;
  //  var userId2 = document.getElementById("userId2").value;
    var chat = document.getElementById("chat").value;
  //  var timeOfMatch = document.getElementById("timeOfMatch").value;
    var distance = document.getElementById("distance").value;

    fetch("http://localhost:7071/api/createMatch", {method: 'POST'}, {
        body: JSON.stringify({
        //    userId1:userId1,
        //    userId2:userId2,
            chat:chat,
          //  timeOfMatch:timeOfMatch,
            distance:distance
            
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
