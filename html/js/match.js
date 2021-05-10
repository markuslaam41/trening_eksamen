var likeBtn = document.getElementById("like");
var dislikeBtm= document.getElementById("Dislike");

function fn1(){
    if(confirm("You liked this person")){
        window.location.href = "yourMatches.html"
    }
   

}
function fn2(){
    if(confirm("Are you sure? You can't go back!!")){
        document.getElementById("mie").style.visibility = 'hidden';
        document.getElementById("like").style.visibility='hidden';
        document.getElementById("Dislike").style.visibility='hidden';
        document.getElementById("name_Mie").style.visibility='hidden';
    }

}




   








    
    document.getElementById("mie").style ="hidden";
    document.getElementById("morten").style="hidden";
    document.getElementById("hayley");
    document.getElementById("markus");
    document.getElementById("mats");
    document.getElementById("victoria");

    






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
