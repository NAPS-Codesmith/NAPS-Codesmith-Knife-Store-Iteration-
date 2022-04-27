import React, {useState} from 'react';

const AdminDeleteKnife = props => {

  // making a fetch delete request when button clicked
  const deleteKnife = () => {
    fetch(`./knives/${props.id}`, {
        method: 'DELETE',
    })
    .catch(err => console.log('COULD NOT DELETE:', err))
  }

  // if the User login is Admin, then go into the conditional statement, where on button click, we are invoking the fetch request method to delete certain knife
  if (props.isAdmin) {
    return (
      <div>
        <button onClick = {deleteKnife}>Delete Knife</button>
      </div>
    );
  } else return <></>
};

export default AdminDeleteKnife;