
const db = require('../sharedMatch/db.js');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    try {
        await db.startDb(); // start db connection

    } 
    catch (error){
        console.log("Can't connect to DB", error.message)
    }
    switch(req.method) {
       case 'GET':
       await get(context, req)
       break
     
        case 'POST':

            await post(context, req);
            break

        case "DELETE":
            await remove(context, req)
            break

         default:
               context.res = {
                    body: "please"
                };
                break
    }
}
async function get(context, req){
    try {
        let userId1 = req.query.userId1;
        let matches = await db.select(userId1)
        context.res = {
            body: matches
        };
    }
    catch (error){
        context.res = {
            status:400,
            body: `No matches - ${error.message}`
        }
    }
}


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
            status : 400,
            body: error.message
        }
    }
}
async function remove (context, req){
    try{
        let userId1 = req.query.userId1;
        let matches = await db.remove(userId1)
        context.res = {
            body: matches
        }
    }
    catch (error){
        context.res = {
            status:400,
            body: `No match - ${error.message}`
        }
    }
}
