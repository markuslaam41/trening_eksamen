const { Connection, Request, TYPES} = require('tedious'); 
const config = require ('./config.json');

var connection = new Connection(config)

function startDb(){
    return new Promise ((resolve,reject)=>{
        connection.on('connect',(err)=>{
            if(err){
                console.log("Connection failed")
                reject(err)
             throw(err);
            }else {
                console.log('Connected')
                resolve();

          }
      })

      connection.connect();
    })

}

module.exports.sqlConnection = connection;

module.exports.startDb = startDb;


function insert(payload){
    return new Promise ((resolve,reject) => {

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
            console.log('Match inserted', row);
            resolve('Match inserted', row)
        });
        connection.execSql(request)
    });
    
}
module.exports.insert = insert;

function select(userId1){
    return new Promise((resolve,reject)=>{
        const sql = 'SELECT * FROM [users].[matches] where userId1 = @userId1'
        const request = new Request (sql, (err, rowcount)=>{
            if(err){
                reject(err)
                console.log(err)
            }else if(rowcount==0){
                reject({message:'Matches does not exist'})
            }
        });
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

        const sql= `DELETE FROM [users].[matches] where userId1 = @userId1`
        const request = new Request (sql, (err, rowcount)=>{
            if(err){
                reject(err)
                console.log(err)
            }else if(rowcount==0){
                reject({message:'Match does not exist'})
            }
        });
        request.addParameter('userId1', TYPES.VarChar, userId1)
    
        request.on('row',(columns)=>{
            resolve(columns)
        });
        connection.execSql(request)
        return userId1
    })
       
    
}
module.exports.remove = remove;

