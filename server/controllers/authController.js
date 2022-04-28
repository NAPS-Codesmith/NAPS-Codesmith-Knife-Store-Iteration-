const db = require('../models/models');

const authController = {};

authController.isLoggedIn = (req, res, next) => {
    //for now we do not verify user by cookie. Frontend should send userid in the request body here.
    // res.locals.user_id = req.body.user_id; 
    return next();
}

authController.createSessionId = (req, res, next) => {
    // customer Id is stored in res.locals from login
    const customerId = res.locals.authentication.id;
    //provide customer id and insert row to shopping_session table
    let queryString = `
        INSERT INTO shopping_session(customer_id, total)
        VALUES($1, 0)  
        ON CONFLICT (customer_id) DO NOTHING;  
    `;
    db.query(queryString, [customerId])
        .then(data => console.log(data))
        .then(() => next())
        .catch(err => {
            return next({
                log: 'authController.createSessionId',
                message: { err: err }
            })
        })
}

authController.getSessionId = (req, res, next) => {
    // the user id should be in the request body
    const { userId } = req.body;
    // console.log('auth userId from req body:', userId);
    // userId = Number(userId);
    // console.log('userId is', typeof userId);
    // query the customer table to get the corresponding row from the shopping_session table
    let queryString = `SELECT shopping_session.id AS session_id 
        FROM customer JOIN shopping_session ON customer.id = shopping_session.customer_id 
        WHERE customer.id = $1;`;
    db.query(queryString, [userId])
        .then(data => {
            sessionObject = data.rows[0];
            // console.log('sessionObject:', sessionObject);
            // save that shopping session into res.locals for next middleware
            res.locals.sessionId = sessionObject.session_id;
            // console.log(`${res.locals.sessionId} saved into res.locals`);
            return next();
        })
        .catch((err) =>
            next({
                log: 'authController.getSessionId',
                message: { err: err }
            })
        );
}


module.exports = authController;