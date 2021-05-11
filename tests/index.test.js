//Requiring db
const db = require("../shared/db.js");

//Requiring our logic
const httpFunction = require("../user/index.js")

//Require jest
const context = require('../testing/defaultContext')

test('Http trigger should return known text', async () => {

    //Object equal Markus
    const request = {
        query: { name: 'Markus' }
    };

    //Asynchron function
    await httpFunction(context, request);

    //Expected answer
    expect(context.log.mock.calls.length).toBe(1);
    expect(context.res.body).toEqual('Hello Markus');
});




