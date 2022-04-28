import React from 'react';
import Login from './Login.jsx'
import Cart from './Cart.jsx'

function HeaderContainer(props){


  return (
    //Header Container displays  everything
    <div className = 'HeaderContainer'>
      {/* Left Container Displaying the Title of the page */}
      {/* We'd want it to be center for more professionality */}
      <div className = 'LeftContainer'>
        <h2>刃 Big Body Knives</h2>
      </div>
      {/* Right Container is display text "Cart" and "Sign in" */}
      <div className = 'RightContainer'>
        {/* From my understanding, they were trying to display message before the cart, therefore they were trying to pass that img through css */}
        {/* For us we might want to delete the text Cart and simply just add an Icon for cleaner look */}
        <Cart 
          handleClick ={props.handleClick} 
          isLoggedIn = {props.isLoggedIn}
          customerCart = {props.customerCart}
        />
        <Login 
          handleClick ={props.handleClick} 
          isLoggedIn = {props.isLoggedIn} 
        />
      </div>
    </div>
  )
}


export default HeaderContainer