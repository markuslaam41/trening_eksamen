var form = document.getElementById("form");

//Adds an eventlistener to submit form
form.addEventListener('submit',function(e){
    e.preventDefault()
    //Makes variables for the different values from the form
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var country = document.getElementById("country").value;
    var birthday = document.getElementById("birthday").value;
    var gender = document.getElementById("gender").value;
    var interest1 = document.getElementById("interest1").value;
    var interest2 = document.getElementById("interest2").value;
    var interest3 = document.getElementById("interest3").value;

    //Using fetch to access the localhost user page and Post the values
    fetch("http://localhost:7071/api/user", {
        method:'POST',
        body: JSON.stringify({
            name:name,
            email:email,
            country:country,
            birthday:birthday,
            gender:gender,
            interest1:interest1,
            interest2:interest2,
            interest3:interest3

        }),
        headers:{
            "Content-Type":"application/json; charset-UTF-8"
        }
    })
    // Using .then to make a response and returning with json
    .then((response)=>{
        return response.json()
    })
    //printing the data and sends the user to the html page account
    .then((data)=>{
        
        console.log(data)
        
        window.location.href = "account.html"
   

    // using catch in case of an error and printing err

    })
    .catch((err)=>{
        console.log(err)
    })
})

// sets getUsers to the variabel getButton

var getButton = document.getElementById("getUsers");

/*getButton.addEventListener("click", () => {
    if(localStorage.getItem("LoggedIn") == true){
        location.replace("account.html")
    }
});*/

//adding an eventlistener when user clicks on button
getButton.addEventListener("click",function(){

    // sets the value of get_name1 to the variabel name1

    var email= document.getElementById("email_login").value;

    // accessing localhost and page user?email

    fetch(`http://localhost:7071/api/user?email=${email}`)
    .then(
    //calling the function response where if the id of name is correct replaces the location
        function(response){
            if(localStorage.getItem("LoggedIn", email)){

                location.replace("account.html")}
           else if(response.status!=200){
               // else if the id is incorrect, prints "Noe gikk galt og sender response"
                console.log("Noe gikk galt" + response.status);
                return;
            }
            //Sets value loggedIn in local storage and takes the user to html page account
            response.json().then(function (data){
                localStorage.setItem ("LoggedIn", email)
                window.location.href = "account.html" 

                console.log(data);
            })
        }  
        
    )
    // in case of an error prints said error
    .catch(function(err){
        console.log(err);
    });
})

//creating the function
function matchingAlgo(user1, user2){
    
    //requesting the interest of the user
    var interest1 = document.getElementById("interest1")
    var interest2 = document.getElementById("interest2")
    var interest3 = document.getElementById("interest3")

     //creating empty array
    user1 = []
    user2 = []
    //pushing the interests into arrays for the two users
    user1.push(interest1, interest2, interest3)
   
    user2.push(interest1, interest2, interest3)
  

  // merge two arrays
  let arr = user1.concat(user2);

  //empty array to push the non-duplicated array
  const result = [];
  const map = {};

  //for loop to run through the array
  for (let i = 0; i < arr.length; i++) {
     
    //mapping the array
    if (map[arr[i]]) {
      continue;
      
      //we push the key which is not found yet
    } else {
      result.push(arr[i]);

      //which equals true
      map[arr[i]] = true;
    }

    //if the result of the array is less than 4
  }if (result.length < 4){
      //Console log potential match 
  return result + "This could be a match!";

//there wont be any match
  }else{
      return "No matches"
  }
}


