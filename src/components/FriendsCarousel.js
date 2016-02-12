import React from 'react';

const FriendsCarousel = ({ friends, toggleFriendAnnotations }) => {
  const ownId = window.localStorage.getItem('user_id');
  const friendsArray = Object.keys(friends);

  const friendsCarousel = friendsArray.map(function(friend, index) {
    if (friend !== ownId) {
      return (
        <img key={index} data-id={friend} onClick={toggleFriendAnnotations.bind(null, friend)} className='friends-pic' src={friends[friend].pic} />
      )
    }
  }.bind(this));

  return (
    <div className='friends-container'>
      {friendsCarousel}
    </div>
  )
};

export default FriendsCarousel;
