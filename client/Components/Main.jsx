import React from 'react';
import { useState, useEffect } from 'react';
import HeaderContainer from './HeaderContainer.jsx';
import KnivesContainer from './KnivesContainer.jsx';

function Main() {
  const [userId, setUserID] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [customerCart, setCustomerCart] = useState([]);

  /**
   * const [userData, setUserData] = useState ({
   * userId: null,
   * isLoggedIn: false,
   * username: null,
   * isAdmin: false,
   * customerCart: []
   * })
   * 
   */

  /**
   * super()
   *  this.state = {
   *    userId: null;
   * }
   */
  
function handleClick (e){
  //five options - addToCart, login, signUp, seeMyCart, logOut
  // if (e.target.id === 'signInBtn' && isLoggedIn === true) {
  //   setUserID(null);
  //   setLoggedIn(false);
  //   setUsername(null);
  //   setIsAdmin(false);
  //   setCustomerCart([]);
  //   console.log("Logout successful");
  //   //return;
  // }

  // if (e.target.className === 'cartBtn') {
  //   if (!userId) {
  //     console.log('Please login before accessing the cart');
  //     return;
  //   }
  // }

  //   //DOUBLE CHECK THIS PATH WITH BACKEND
  //   fetch('/cart/myCart')
  //   .then(res => res.json())
  //   .then(data => {
  //     setCustomerCart(data);
  //   })
  // }



  if (e.target.className === 'addToCartButton' ){

    const knife_id = e.target.id.split('-')[1];
    console.log(typeof knife_id);
 
    if (!isLoggedIn) {
      console.log(userId)
      alert('Please login before adding to cart.');
      return;
    }

    const bodyObject = {
      knife_id,
      userId
    };

    fetch(`/cart/${Number(knife_id)}/addOne`, {
      method: 'POST',
      headers: {
      'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(bodyObject)
    })
    .then(res => res.json())
    .then(data => {
      console.log('add to cart: ', data['updatedCart']);
      setCustomerCart(data['updatedCart'])
      alert('Item successfully added to cart.')
      }
    )
    .catch(err => console.log('error adding knife:', err));
  
}

  if (e.target.id === 'loginButton'){
    const user = document.querySelector('#usernameInput').value;
    const password = document.querySelector('#passwordInput').value;

    fetch(`/customers/login`, {
      method: 'POST',
      body: JSON.stringify({user, password}),
      headers: { 'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(data => {
      console.log('data', data);
      if (data.customer.username) {
        setUserID(data.customer.id);
        setLoggedIn(true);
        setUsername(data.customer.username);
        setIsAdmin(data.customer.isAdmin);
        setCustomerCart(data.cart);
      }
      else {
        setUserID(null);
        setLoggedIn(false);
        setUsername(null);
        setIsAdmin(false);
        setCustomerCart([]);
      }
    })
    .catch(err => console.log('error in fetch request', err));
  }

  if (e.target.id === 'signUpButton'){
    const user = document.querySelector('#usernameInput').value;
    const password = document.querySelector('#passwordInput').value;

    fetch(`/customers/addCustomer`, {
      method: 'POST',
      body: JSON.stringify({user, password}),
      headers: { 'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(data => {
      if (data.customer.username) {
        setUserID(data.customer.id);
        setLoggedIn(true);
        setUsername(data.customer.username);
        setIsAdmin(data.customer.isAdmin);
        setCustomerCart(data.cart);
      }
      else {
        setUserID(null);
        setLoggedIn(false);
        setUsername(null);
        setIsAdmin(false);
        setCustomerCart([]);
      }
    })
    .catch(err => console.log('error in fetch request', err));
  }
}

useEffect(() => console.log('userId: ', userId ,'isloggedin: ', isLoggedIn, 'username:  ', username, 'isAdmin: ', isAdmin));


  return (
    <>
      <div>
        <HeaderContainer 
          handleClick = {handleClick} 
          isLoggedIn = { isLoggedIn } 
          isAdmin = { isAdmin } 
          username = { username } 
          customerCart = {customerCart}
        />   
      </div> 
      <div>
        <KnivesContainer 
          username = {username} 
          isLoggedIn = {isLoggedIn} 
          isAdmin = {isAdmin} 
          handleClick = {handleClick}
        />
      </div>
    </>
  )
}

export default Main;