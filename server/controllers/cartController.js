const db = require('../models/models');

const cartController = {};

cartController.addOneToCart = async (req, res, next) => {
  // user's session ID is stored in res.locals
  const sessionId = res.locals.sessionId;

  console.log('req.body on addOneToCart: ', req.body);
  const { knife_id } = req.body;
  knife_id = Number(knife_id);

  try {
    //check if quantity exists for the session_id and product_id. if not, set to 1. otherwise, increment by 1.

    let selectQueryString = `SELECT quantity FROM cart_item WHERE session_id = $1 AND product_id = $2;`;

    const quantity = await db.query(selectQueryString, [sessionId, knife_id]); //query cart_items and return quantity, if any

    if (quantity) {
      //UPDATE if there is an existing quantity
      quantity++;
      let updateQueryString = `UPDATE cart_item
                             SET quantity
                             WHERE session_id = $1
                               AND product_id = $2;`;
      const updateCart = await db.query(updateQueryString, [
        sessionId,
        knife_id,
      ]);
    } else {
      //INSERT if this is the first cart_item
      quantity = 1;
      let insertQueryString = `INSERT INTO cart_item
                             VALUES (DEFAULT,$1,$2,$3,DEFAULT,DEFAULT)
                             RETURNING *`;
      const insertCart = await db.query(insertQueryString, [
        sessionId,
        knife_id,
        quantity,
      ]);
    }

    return next();
  } catch (err) {
    return next(err);
  }
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
  // user's session ID is stored in res.locals
  const { sessionId } = res.locals;
  // console.log('sessionId of cart:', sessionId);

  // query database for join table of shopping_session and cart_item
  // get the product id, name, price, quantity, img_url
  // start from the shopping_session table, join the cart_item table, join the knives table
  // with the shopping_session Id as the narrowing parameter
  let queryString = `
  SELECT knives.id AS product_id, knives.name AS name, knives.price AS price, 
  knives.img AS img_url, cart_item.quantity AS quantity 
  FROM shopping_session 
  JOIN cart_item ON shopping_session.id = cart_item.session_id
  JOIN knives ON cart_item.product_id = knives.id 
  WHERE shopping_session.id = $1;
  `;

  db.query(queryString, [sessionId])
    .then((data) => {
      // should return an array of objects, each representing a knife in the user's cart
      const cartItems = data.rows;
      console.log('cart items:', cartItems);

      // save the cartItems to res.locals to return to client
      res.locals.cartItems = cartItems;

      return next();
    })
    .catch((error) => {
      return next({
        log: 'error occured in cartController.getCart',
        status: 400,
        message: { error: error },
      });
    });
};

module.exports = cartController;
