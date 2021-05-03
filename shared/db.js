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

        const sql= `INSERT INTO [users].[users] (name, email, country, birthday, gender) VALUES (@name, @email, @country, @birthday, @gender)`
        const request = new Request(sql, (err)=>{
            if(err){
                reject(err)
                console.log(err)
            }
        });
        request.addParameter('name', TYPES.VarChar, payload.name)
        request.addParameter('email', TYPES.VarChar, payload.email)
        request.addParameter('country', TYPES.VarChar, payload.country)
        request.addParameter('birthday', TYPES.Date, payload.birthday)
        request.addParameter('gender', TYPES.VarChar, payload.gender)

        request.on('requestCompleted',(row) => {
            console.log('User inserted', row);
            resolve('user inserted', row)
        });
        connection.execSql(request)
    });
    
}
module.exports.insert = insert;

function select(name){
    return new Promise((resolve,reject)=>{
        const sql = 'SELECT * FROM [users].[users] where name = @name'
        const request = new Request (sql, (err, rowcount)=>{
            if(err){
                reject(err)
                console.log(err)
            }else if(rowcount==0){
                reject({message:'User does not exist'})
            }
        });
        request.addParameter('name', TYPES.VarChar, name)
    
        request.on('row',(columns)=>{
            resolve(columns)
        });
        connection.execSql(request)
        return name
    })
   
}
module.exports.select = select;

function remove(name){
    return new Promise ((resolve,reject) => {

        const sql= `DELETE FROM [users].[users] where name = @name`
        const request = new Request (sql, (err, rowcount)=>{
            if(err){
                reject(err)
                console.log(err)
            }else if(rowcount==0){
                reject({message:'User does not exist'})
            }
        });
        request.addParameter('name', TYPES.VarChar, name)
    
        request.on('row',(columns)=>{
            resolve(columns)
        });
        connection.execSql(request)
        return name
    })
       
    
}
module.exports.remove = remove;

function put(payload){
    return new Promise ((resolve,reject) => {

        const sql= `UPDATE [users].[users] SET name = @name_update, email = @email_update, )`
        const request = new Request(sql, (err)=>{
            if(err){
                reject(err)
                console.log(err)
            }
        });
        request.addParameter('name', TYPES.VarChar, payload.name)
        request.addParameter('email', TYPES.VarChar, payload.email)
        request.addParameter('country', TYPES.VarChar, payload.country)
        request.addParameter('birthday', TYPES.Date, payload.birthday)
        request.addParameter('gender', TYPES.VarChar, payload.gender)

        request.on('requestCompleted',(row) => {
            console.log('User updated', row);
            resolve('user updated', row)
        });
        connection.execSql(request)
    });
    
}
module.exports.put = put;