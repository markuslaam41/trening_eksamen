const db = require('../shared/db');

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
                    body: "Please GET or POST, or DELETE"
                };
                break
    }
}

async function get(context, req){
    try {
        let name = req.query.name;
        let user = await db.select(name)
        context.res = {
            body: user
        };
    }
    catch (error){
        context.res = {
            status:400,
            body: `No user - ${error.message}`
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
        let name = req.query.name;
        let user = await db.remove(name)
        context.res = {
            body:user
        }
    }
    catch (error){
        context.res = {
            status:400,
            body: `No user - ${error.message}`
        }
    }
}

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
            status : 400,
            body: error.message
        }
    }
}
