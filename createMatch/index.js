
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
       
    
            
        case 'POST':
            await post(context, req);
            break

         default:
               context.res = {
                    body: "please"
                };
                break
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
