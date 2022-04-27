const db = require('../models/models');

const cartController = {};

// cartController.addToCart = (req, res, next) => {
//   console.log('req.body: ', req.body);
//   const { userID, knife_id } = req.body;
//   knife_id = Number(knife_id);
//   db.query('INSERT INTO cart VALUES (DEFAULT, $1, $2, $3) RETURNING *', [
//     userID,
//     knife_id,
//     quantity,
//   ])
//     .then((data) => {
//       console.log('DATA:  ', data);
//       res.locals.addedItem = data.rows[0];
//       return next();
//     })
//     .catch((err) =>
//       next({
//         log: 'cartController.addToCart',
//         message: { err: err },
//       })
//     );
// };

cartController.addOneToCart = (req, res, next) => {
  // user's session ID is stored in res.locals
  const sessionId = res.locals.sessionId;

  console.log('req.body on addOneToCart: ', req.body);
  const { knife_id } = req.body;
  knife_id = Number(knife_id);


  // query to add a row to the cart_item table
  let queryString = `
    INSERT INTO cart_item(session_id, product_id, quantity) 
    VALUES($1, $2 , 1 )
    ON CONFLICT (session_id)
    DO UPDATE SET quantity += 1;`;
  db.query(queryString, [sessionId, knife_id])

    // .then((data) => {
    //   console.log('DATA:  ', data);
    //   res.locals.addedItem = data.rows[0];
    //   return next();
    // })
    .catch((err) =>
      next({
        log: 'error in cartController.addOneToCart',
        message: { err: err },
      })
    );
};

cartController.removeOneFromCart = (req, res, next) => {
  console.log('req.body: ', req.body);
  const { userID, knife_id, quantity } = req.body;
  knife_id = Number(knife_id);
  db.query('INSERT INTO cart VALUES (DEFAULT, $1, $2, $3) RETURNING *', [
    userID,
    knife_id,
    quantity,
  ])
    .then((data) => {
      console.log('DATA:  ', data);
      res.locals.addedItem = data.rows[0];
      return next();
    })
    .catch((err) =>
      next({
        log: 'cartController.addToCart',
        message: { err: err },
      })
    );
};

cartController.getCart = (req, res, next) => {
  console.log(req.body);
};

module.exports = cartController;
