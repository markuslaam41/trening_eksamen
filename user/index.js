//require the db
const db = require('../shared/db');

//Declaring and exporting function
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    try {
        await db.startDb(); // start db connection

    } 
    catch (error){
        console.log("Can't connect to DB", error.message)
    }
    //adding methods
    switch(req.method) {
        case 'GET':
            await get(context, req);
            break;

            case 'DELETE':
                await remove(context, req);
                break;
    
            
        case 'POST':
            await post(context, req);
            break

            case 'PUT':
            await put(context, req);
            break
         default:
                context.res = {
                    body: "Hello Markus" 
                };
                break
    }
}
//get function
async function get(context, req){
    try {
        let email = req.query.email;
        let user = await db.select(email)
        context.res = {
            body: user
        };
    }
    catch (error){
        context.res = {
             //respond with status 400 if it is an error
            status:400,
            body: `No user - ${error.message}`
        }
    }
}
//declaring function 
async function post(context, req){
    try{
        let payload = req.body;
        await db.insert(payload)
        context.res = {
            body: {status :'Success'}
        }
    }
    catch (error){
        context.res = {
             //respond with status 400 if it is an error
            status : 400,
            body: error.message
        }
    }
}
//declaring function
async function remove (context, req){
    try{
        let email = req.query.email;
        let user = await db.remove(email)
        context.res = {
            body:user
        }
    }
    catch (error){
        context.res = {
             //respond with status 400 if it is an error
            status:400,
            body: `No user - ${error.message}`
        }
    }
}
//Declaring function
async function put(context, req){
    try{
        let payload = req.body;
        await db.put(payload)
        context.res = {
            body: {status :'Success'}
        }
    }
    catch (error){
        context.res = {
            //respond with status 400 if it is an error
            status : 400,
            body: error.message
        }
    }
}
