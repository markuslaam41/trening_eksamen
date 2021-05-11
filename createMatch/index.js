
//require our model
const db = require('../sharedMatch/db.js');

//creating and async function
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    //try/catch to create promises
    try {

        // start db connection
        await db.startDb(); 

    } 

    //catching an error
    catch (error){

        console.log("Can't connect to DB", error.message)
    }

    //comparing condition
    switch(req.method) {
       case 'GET':
       await get(context, req)
       break
     

       //comparing condition
        case 'POST':
            await post(context, req);
            break

        //comparing condition
        case "DELETE":
            await remove(context, req)
            break
            
            //placing context in our body
         default:
               context.res = {
                    body: "please"
                };
                break
    }
}

//Declaring async function
async function get(context, req){
    try {

        //Using userId1 as an base
        let userId1 = req.query.userId1;

        //waiting for our database
        let matches = await db.select(userId1)
        context.res = {
            body: matches
        };
    }

    //Error handling
    catch (error){
        context.res = {
            status:400,
            body: `No matches - ${error.message}`
        }
    }
}


async function post(context, req){
    try{

        //payload posting from our body
        let payload = req.body;
        await db.insert(payload)

        // post was success
        context.res = {
            body: {status :'Success'}
        }
    }

    //Error handling
    catch (error){
        context.res = {
            status : 400,
            body: error.message
        }
    }
}

async function remove (context, req){
    try{

        //Using userID as base for deleting match
        let userId1 = req.query.userId1;

        //await database before remove
        let matches = await db.remove(userId1)
        context.res = {
            body: matches
        }
    }

    //Error handling
    catch (error){
        context.res = {
            status:400,
            body: `No match - ${error.message}`
        }
    }
}
