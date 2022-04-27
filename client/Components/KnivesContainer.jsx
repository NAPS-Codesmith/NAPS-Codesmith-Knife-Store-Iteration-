import React, {useState, useEffect} from 'react';
import Knife from './Knife.jsx';
import AdminAddKnife from './AdminAddKnife.jsx'


function KnivesContainer(props){
  // this is also react hook
  const [knivesToRender, setKnivesToRender] = useState([]);
  // Name / Path gotta be changed, who tf goes to localhost:3000/knives/knives
  // Don't make sense to me
  fetch(`/knives/`)
    .then(data => data.json())
    .then(array => {
      // Took the easier route and did everything just in here
      // we can make it look clear by storing it in the state, iterating through and then pushing each element into the empty array
      // it would simply keep the fetch looking clear
      // I don't think fetch should be this cumbersome
        const finalRender = array.map(knife => (
        <Knife 
          username = {props.username} 
          key = {knife.id} 
          id = {knife.id} 
          name = {knife.name} 
          length = {knife.length} 
          steel_type = {knife.steel_type} 
          price = {knife.price} 
          type = {knife.type} 
          hrc = {knife.hrc} 
          bevel = {knife.bevel} 
          isLoggedIn = {props.isLoggedIn} 
          isAdmin = {props.isAdmin} 
          img = {knife.img} 
          handleClick = {props.handleClick}
        /> 
        ))
        if (JSON.stringify(finalRender) !== JSON.stringify(knivesToRender)){
        setKnivesToRender(finalRender)
      }
      // need to add catch method also
      // to any errs that could possibly go wrong along our fetch method
  });



  return (
    <div id='knivesContainerDiv'>
      {/* Getting really confused with the whole Admin stuff, it gets passed around in every single component */}
      <div>
      <AdminAddKnife isAdmin = {props.isAdmin}/>
      <h2>List of Knives</h2>
      </div>
      {/* This is where each item with the correct Price/Img and etc gets prop drilled to Knife.jsx to be displayed */}
        {knivesToRender}
    </div>
  )
}

export default KnivesContainer;