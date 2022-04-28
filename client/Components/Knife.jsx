/**
 * 
 * @module Knife
 * @author yeti crabs
 * @date 4/25/22 @2:55PM
 * @description presentation component that renders a single box for each knife
 */

import React from 'react';
import AdminDeleteKnife from './AdminDeleteKnife.jsx';

const Knife = props => {
  // Object destructuring the prob that was passed down
  /**
   * Prop = {
   * id: 548fjsjdffsad
   * name: Japanese Knife One
   * length: 6.9in
   * steel_type: tool steel
   * price: $175
   * Type: Chef's Knife
   * Img: https://www.looper.com/img/gallery/things-only-adults-notice-in-shrek/intro-1573597941.jpg
   * hrc: measures how much of a dent/mark a diamond point can make in the metal with a measured amount of weight
   * bevel: 20mm
   * isAdmin: Check if true or false
   * }
   */
  const { id, name, length, steel_type, price, type, img, hrc, bevel, isAdmin } = props;
  
     return(

      // Each Knife component/box where knife is displayed
      <div className="knifeBox">
          {/* Rest should speak for itself */}
        <img src={props.img} height='300' width='300'/>
        <div>{props.name}</div>
        <div>Length: {props.length}mm</div>
        <div>Steel: {props.steel_type}</div>
        <div>Price: ${props.price}</div>
        <div>Type: {props.type}</div>
        <div>Bevel Symmetry: {props.bevel}</div>
        <div>
            {/* That's just confusing, lost on why they just didn't implement a function for onclick within this page, but did it in different component*/}
            {/* Not too comfortable with the onClick way they went, could change it/ adapt to it */}
          <button className="addToCartButton" id={`knife-${props.id}`} onClick={props.handleClick}>Add to Cart</button>
          <AdminDeleteKnife isAdmin = {isAdmin} id = {id}/>
        </div>
      </div>
    );
};
export default Knife;