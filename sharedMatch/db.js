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

// the function insert, posts a match
function insert(payload){
    return new Promise ((resolve,reject) => {
         //Using the SQL statement to insert the values
        const sql= `INSERT INTO [users].[matches] (chat, distance) VALUES (@chat, @distance)`
        const request = new Request(sql, (err)=>{
            if(err){
                reject(err)
                console.log(err)
            }
        });
      //  request.addParameter('userId1', TYPES.VarChar, payload.userId1)
        //request.addParameter('userId2', TYPES.VarChar, payload.userId2)
        request.addParameter('chat', TYPES.VarChar, payload.chat)
        //request.addParameter('timeOfMatch', TYPES.Date, payload.timeOfMatch)
        request.addParameter('distance', TYPES.VarChar, payload.distance)

        request.on('requestCompleted',(row) => {
            //logs when match is inserted
            console.log('Match inserted', row);
            resolve('Match inserted', row)
        });
        connection.execSql(request)
    });
    
}
module.exports.insert = insert;
// function selects : to get a specific match from the DB
function select(userId1){
    return new Promise((resolve,reject)=>{
        //using the SQL statement to find the specific match
        const sql = 'SELECT * FROM [users].[matches] where userId1 = @userId1'
        const request = new Request (sql, (err, rowcount)=>{
            if(err){
                reject(err)
                console.log(err)
            }else if(rowcount==0){
                reject({message:'Matches does not exist'})
            }
        });
        //finding the parameters we want to find from the DB
        request.addParameter('id', TYPES.VarChar, userId1)
    
        request.on('row',(columns)=>{
            resolve(columns)
        });
        connection.execSql(request)
        return userId1
    })
   
}
module.exports.select = select;

function remove(userId1){
    return new Promise ((resolve,reject) => {

        //SQL statement
        const sql= `DELETE FROM [users].[matches] where userId1 = @userId1`
        const request = new Request (sql, (err, rowcount)=>{

            //Error handling
            if(err){
                reject(err)
                console.log(err)
            }else if(rowcount==0){
                reject({message:'Match does not exist'})
            }
        });

        request.addParameter('userId1', TYPES.VarChar, userId1)

    //Resolve in columns
        request.on('row',(columns)=>{
            resolve(columns)
        });

        //connect 
        connection.execSql(request)
        return userId1
    })
       
    
}
module.exports.remove = remove;

