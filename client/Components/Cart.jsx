import React from 'react';
import Modal from 'react-modal';
import { useState, useEffect } from 'react';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

function Cart(props){
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  // function afterOpenModal() {
  // }

  function closeModal() {
    setIsOpen(false);
  }


  useEffect(() => {
    closeModal();
}, [props.isLoggedIn])

const arr = [];
let totalPrice = 0;

  for (let i = 0; i < props.customerCart; i++) {
    total += customerCart[i].total_price;
    arr.push(
      <tr>
        <th>{props.customerCart[i].picture_url}</th>
        <th>{props.customerCart[i].product_name}</th>
        <th>{props.customerCart[i].product_quantity}</th>
        <th>{props.customerCart[i].total_price}</th>
      </tr>
    )
  }


  /**
   *
   * 
   */


  return (
    //ADD: if props.isLoggedIn is true call closeModal 
    
    <div>
      <button 
        onClick={() => {
          openModal(); 
          props.handleClick();
        }} className = 'cartBtn'>Cart</button>
      {/* onClick = "functionOne(); functionTwo();" */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}>
        

        <body>
          <h1 id='shoppingCartHeader'>Your shopping cart</h1>
          <table border = "1">
            <tr>
              <th>Picture</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Total Price</th>
            </tr>
            {arr}
          </table>
          <h3>Total Price: {totalPrice}</h3>
          <button>Proceed to checkout</button>
        </body>
      </Modal>
    </div>
  );
}

export default Cart;