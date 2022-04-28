import React from 'react';
import { useState, useEffect } from 'react';
import HeaderContainer from './HeaderContainer.jsx';
import KnivesContainer from './KnivesContainer.jsx';

function Main() {
  const [userID, setUserID] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [customerCart, setCustomerCart] = useState([]);

  /**
   * super()
   *  this.state = {
   *    userId: null;
   * }
   */
  
function handleClick(e){
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

  // if (e.target.className === 'myCartButton') {
  //   if (!userID) {
  //     alert('You must login to see your cart.');
  //     return;
  //   }
    
  //   //DOUBLE CHECK THIS PATH WITH BACKEND
  //   fetch('/cart/myCart')
  //   .then(res => res.json())
  //   .then(data => {
  //     setCustomerCart(data);
  //   })
  // }

//{ knife_id, customer_id, quantity} what I'm using for variable names
  if (e.target.className === 'addToCartButton' ){
    //console.log(e.target.id) --> knife-12
    //knife-12 --> const knife_id = 12
    const knife_id = e.target.id.split('-')[1];
    console.log('userID: ', userID)
    if (!userID) {
      alert('Please login before adding to cart.');
      return;
    }
    // path gotta be worked on
    // After we are in the cart path twice, then were are making fetch request?
    fetch('/cart/addToCart', {
      method: 'POST',
      body: JSON.stringify({
        knife_id,
        userID
    }),
    headers: { 'Content-Type': 'application/json'},
    })
    .then(res => res.json())
    .then(data => 
      /*RETURN BACK TO THIS WHEN BACKEND FOR ADDTOCART IS FINISHED */
      // access name property, store as const
        //const nameOfKnife = data.product_name;
        //alert(`You've successfully added ${nameOfKnife} to your cart!`);
      console.log('add to cart: ', data),
    )
    .catch(err => console.log('error adding knife:', err));
  
}

  if (e.target.id === 'loginButton'){
    console.log(document.querySelector('#usernameInput'))
    const user = document.querySelector('#usernameInput').value;
    const password = document.querySelector('#passwordInput').value;

    fetch(`/customers/login`, {
      method: 'POST',
      body: JSON.stringify({user, password}),
      headers: { 'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(data => {
      // console.log(typeof data.username);
      if (data.username) {
        setUserID(data.id)
        setLoggedIn(true);
        setUsername(data.username);
        setIsAdmin(data.isAdmin);
      }
      else {
        setUserID(null);
        setLoggedIn(false);
        setUsername(null);
        setIsAdmin(false);
      }
    })
    // .then(() => console.log('isloggedin: ', isLoggedIn, 'username:  ', username, 'isAdmin: ', isAdmin))
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
      if (data.username) {
        setUserID(data.id)
        setLoggedIn(true);
        setUsername(data.username);
        setIsAdmin(data.isAdmin);
      }
      else {
        setUserID(null);
        setLoggedIn(false);
        setUsername(null);
        setIsAdmin(false);
      }
    })
    .catch(err => console.log('error in fetch request', err));
  }
}

useEffect(() => {console.log('userID: ', userID ,'isloggedin: ', isLoggedIn, 'username:  ', username, 'isAdmin: ', isAdmin)});


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