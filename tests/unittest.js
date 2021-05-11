const { Connection, Request, TYPES} = require('tedious'); 


const assert = require("assert");
const db = require("../shared/db.js");
const config = require("../shared/config.json");

const chai = require("chai");
//const { assert } = require("chai");

var connection = new Connection(config);


describe("/Get user", () =>
it("Should get one name in the database"), (name) =>{
    let requestBody =  {
            name: "Markus"
    }
    assert(() => {
        
 const name = new Promise((resolve,reject)=>{
        const sql = 'SELECT * FROM [users].[users] where name = "Markus"'
       
        request.addParameter('name', TYPES.VarChar, name)
    
        request.on('row',(columns)=>{
            resolve(columns)
        });
        connection.execSql(request)
        return name
        })
        if(name.sql == name.requestBody){
            return "Suksess"
        }
    })

})