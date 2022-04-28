const db = require('../models/models');

const cartController = {};

cartController.addOneToCart = async (req, res, next) => {
  // user's session ID is stored in res.locals
  const sessionId = res.locals.sessionId;

  // console.log('req.body on addOneToCart: ', req.body);
  // console.log(req.params);
  let { knife_id } = req.params;
  knife_id = Number(knife_id);

  // console.log(knife_id);
  try {
    //check if quantity exists for the session_id and product_id. if not, set to 1. otherwise, increment by 1.

    let selectQueryString = `SELECT * 
                            FROM cart_item 
                            WHERE session_id = $1 
                              AND product_id = $2;`;
    // console.log(sessionId, knife_id);
    const dataObjToUpdate = await db.query(selectQueryString, [sessionId, knife_id]); //query cart_items and return the cart_item, if any
    // console.log(dataItemToUpdate);
    const dataItemToUpdate = dataObjToUpdate.rows[0];
    let updatedCartItem;
    let quantity = dataItemToUpdate.quantity;
    if (quantity || quantity === 0) { //UPDATE if there is an existing quantity
      quantity++;
      let updateQueryString = `UPDATE cart_item
                             SET quantity = $1
                             WHERE session_id = $2
                               AND product_id = $3 RETURNING *;`
      const updateCart = await db.query(updateQueryString, [quantity, sessionId, knife_id]);
      updatedCartItem = updateCart.rows[0];
    }
    else {       //INSERT if this is the first cart_item
      quantity = 1;
      let insertQueryString = `INSERT INTO cart_item
                             VALUES (DEFAULT,$1,$2,$3,DEFAULT,DEFAULT)
                             RETURNING *`;
      const insertCart = await db.query(insertQueryString, [sessionId, knife_id, quantity]);
      updatedCartItem = insertCart.rows[0];
    };
    res.locals.addedItem = updatedCartItem;
    return next();

  } catch (err) {
    return next({
      log: 'error occured in cartController.addOneToCart',
      message: { err: err }
    })
  }

};

cartController.removeOneFromCart = async (req, res, next) => {
  const sessionId = res.locals.sessionId;

  console.log('req.body on removeOneFromCart: ', req.body);
  let { knife_id } = req.params;
  knife_id = Number(knife_id);

  try {
    let selectQueryString = `SELECT * 
    FROM cart_item 
    WHERE session_id = $1 
      AND product_id = $2;`;

    const dataObjToRemove = await db.query(selectQueryString, [sessionId, knife_id]); //query cart_items and return the cart_item, if any
    const dataItemToRemove = dataObjToRemove.rows[0];
    let dataItemRemoved;
    // console.log(dataItemToRemove);
    let quantity = dataItemToRemove.quantity;
    // console.log(typeof quantity);
    if (quantity || quantity === 0) { //UPDATE if there is an existing quantity
      if (quantity > 0) { quantity-- } else { quantity = 0 };

      let removeQueryString = `UPDATE cart_item
     SET quantity = $1
     WHERE session_id = $2
       AND product_id = $3 RETURNING *;`
      const updateCart = await db.query(removeQueryString, [quantity, sessionId, knife_id]);
      dataItemRemoved = updateCart.rows[0];
    }

    res.locals.removedItem = dataItemRemoved;
    return next();

  } catch (err) {
    return next({
      log: 'error occured in cartController.removeOneFromCart',
      message: { err: err }
    })

  }

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
      })
    })
};

module.exports = cartController;
