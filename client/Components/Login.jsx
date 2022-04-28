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

function Login(props){
  const [modalIsOpen, setIsOpen] = useState(false);

  // Modal refered a lot, dont know what it means
  //Modal refers to the window that opens when you click the sign in button
  function openModal() {
    if (!props.isLoggedIn){
      setIsOpen(true); 
    }
    else {
      setUserID(null);
      setLoggedIn(false);
      setUsername(null);
      setIsAdmin(false);
      setCustomerCart([]);
      console.log("Logout successful");
    }
}

  // function afterOpenModal() {
  // }

  function closeModal() {
    setIsOpen(false);
  }


  useEffect(() => {
    closeModal();
}, [props.isLoggedIn])

  // const logOut = function () {
  //   const [userID, setUserID] = useState(null);
  //   const [isLoggedIn, setLoggedIn] = useState(false);
  //   const [username, setUsername] = useState(null);
  //   const [isAdmin, setIsAdmin] = useState(false);
  //   const [customerCart, setCustomerCart] = useState([]);
  // }

  function logout() {
    localStorage.clear();
    window.location.href = '/';
}



  return (
    //ADD: if props.isLoggedIn is true call closeModal
    
    <div>
      {/* Checking if the user is currently signed in */}
      {/* If so displayed "Log Out" else "Sign in", very clever and short way of doing this */}
      {/* I thought it'd be much longer*/}
      <button 
        onClick={openModal} 
        id = 'signInBtn'>{props.isLoggedIn ? 'Log Out' : 'Sign In'}</button> 
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        
        {/* OH SHIT, IS THIS HOW SIGN IN/ SIGN UP page howevers over the main page? thats fuckin amazing */}
         <div className = 'inputForm'> 
          <input type='text' placeholder = 'Enter Username' id='usernameInput' />
          <br />
          <input type='password' placeholder='Enter Password' id='passwordInput' />
          <br />
          <button onClick={props.handleClick} id='loginButton'>Login</button>
          <button onClick={props.handleClick} id='signUpButton'>Sign up</button>
        </div>
        
      </Modal>
    </div>
  );
}

export default Login;