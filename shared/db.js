//Setting up connection to database
//require tedious which is used to interact with instances of Microsoft's SQL Server
const { Connection, Request, TYPES} = require('tedious'); 
const config = require ('./config.json');

var connection = new Connection(config)

//checking if the connection to DB works
function startDb(){
    return new Promise ((resolve,reject)=>{
    //Making a if else check to make sure the connection works
        connection.on('connect',(err)=>{
            if(err){
                console.log("Connection failed")
                reject(err)
             throw(err);
             //If its not connected the if else test will throw an error 
            }else {
                console.log('Connected')
                resolve();
                // If the connection doesn't have any error, it wil console "Connnected"
          }
      })

      connection.connect();
    })

}

//exporting the connection
module.exports.sqlConnection = connection;
module.exports.startDb = startDb;

//The function insert register a new user and saves it in the DB
function insert(payload){
    return new Promise ((resolve,reject) => {
            //Using the SQL statement to insert the values
        const sql= `INSERT INTO [users].[users] (name, email, country, birthday, gender, interest1, interest2, interest3) VALUES (@name, @email, @country, @birthday, @gender, @interest1, @interest2, @interest3)`
        const request = new Request(sql, (err)=>{
            if(err){
                reject(err)
                console.log(err)
            }
        });
        //adding the parameters we want to add
        request.addParameter('name', TYPES.VarChar, payload.name)
        request.addParameter('email', TYPES.VarChar, payload.email)
        request.addParameter('country', TYPES.VarChar, payload.country)
        request.addParameter('birthday', TYPES.Date, payload.birthday)
        request.addParameter('gender', TYPES.VarChar, payload.gender)
        request.addParameter('interest1', TYPES.VarChar, payload.interest1)
        request.addParameter('interest2', TYPES.VarChar, payload.interest2)
        request.addParameter('interest3', TYPES.VarChar, payload.interest3)

        request.on('requestCompleted',(row) => {
            //logs when the user is inserted
            console.log('User inserted', row);
            resolve('user inserted', row)
        });
        connection.execSql(request)
    });
    
}
//exporting the function
module.exports.insert = insert;

//the function select : to get a user from the DB
function select(email){
    return new Promise((resolve,reject)=>{
         //Using the SQL statement to find the specific user
        const sql = 'SELECT * FROM [users].[users] where email = @email'
        const request = new Request (sql, (err, rowcount)=>{
            if(err){
                reject(err)
                console.log(err)
            }else if(rowcount==0){
                reject({message:'User does not exist'})
            }
        });
        //finding the parameters we want to find from the DB
        request.addParameter('email', TYPES.VarChar, email)
    
        request.on('row',(columns)=>{
            resolve(columns)
        });
        connection.execSql(request)
        return email
    })
   
}
//exporting the function
module.exports.select = select;

//the function remove : to remove a user from the DB
function remove(email){
    return new Promise ((resolve,reject) => {
 //Using the SQL statement remove a user from the DB
        const sql= `DELETE FROM [users].[users] where email = @email`
        const request = new Request (sql, (err, rowcount)=>{
            if(err){
                reject(err)
                console.log(err)
            }else if(rowcount==0){
                reject({message:'User does not exist'})
            }
        });
        //removing the parameters we want to remove from the DB
        request.addParameter('email', TYPES.VarChar, email)
    
        request.on('row',(columns)=>{
            resolve(columns)
        });
        connection.execSql(request)
        return email
    })
       
    
}
//Exporting the function
module.exports.remove = remove;

//The function put : tp update a user from DB
function put(payload){
    return new Promise ((resolve,reject) => {
         //Using the SQL statement to update the values to the specific user
        const sql= `UPDATE [users].[users] SET name = @name_update, email = @email_update, country = @country_update, birthday = @birtday_update, 
        gender = @gender_update WHERE name = @name)`
        const request = new Request(sql, (err)=>{
            if(err){
                reject(err)
                console.log(err)
            }
        });
        //updating the parameters we want update from the DB
        request.addParameter('name_update', TYPES.VarChar, payload.name_update)
        request.addParameter('email_update', TYPES.VarChar, payload.email_update)
        request.addParameter('country_update', TYPES.VarChar, payload.country_update)
        request.addParameter('birthday_update', TYPES.Date, payload.birthday_update)
        request.addParameter('gender_update', TYPES.VarChar, payload.gender_update)

        request.on('requestCompleted',(row) => {
            console.log('User updated', row);
            resolve('user updated', row)
        });
        connection.execSql(request)
    });
    
}
//exporting the function
module.exports.put = put;