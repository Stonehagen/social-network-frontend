import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { OutsideClick } from '../methods/outsideClick';
import '../styles/NewRoom.css';

const CloseRed = '../img/closeRed.svg';
const CloseFillRed = '../img/closeFillRed.svg';

const NewRoom = ({ setDisplayNewRoom, profile, getRooms }) => {
  const [friends, setFriends] = useState([]);
  const [searchText, setSearchText] = useState();
  const wrapperRef = useRef(null);
  OutsideClick(wrapperRef, setDisplayNewRoom);

  const getFriends = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_BACKENDSERVER}/profile/friends/${profile._id}`,
      )
      .then((res) => setFriends(res.data.friends))
      .catch((err) => console.log(err));
  };

  const startRoom = async (chatPartner) => {
    await axios
      .post(`${process.env.REACT_APP_BACKENDSERVER}/room/new`, {
        chatPartner,
      })
      .then((res) => {
        getRooms();
      })
      .catch((err) => console.log(err))
      .finally(() => setDisplayNewRoom(false));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchText) {
      axios
        .get(`${process.env.REACT_APP_BACKENDSERVER}/profile/search/${searchText}`)
        .then((res) => {
          setFriends(res.data.profiles);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    getFriends();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  return (
    <div ref={wrapperRef} className="NewRoom">
      <div className="newRoomHeader">
        <h3>New Message</h3>
        <button
          className="closeNewRoom"
          type="button"
          onClick={() => setDisplayNewRoom(false)}
          onMouseOver={(e) => (e.currentTarget.children[0].src = CloseFillRed)}
          onMouseOut={(e) => (e.currentTarget.children[0].src = CloseRed)}
        >
          <img src={CloseRed} alt="" />
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="TO:"
          id="search"
          name="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </form>
      <ul className="friendList">
        {friends.sort().map((friend, index) => (
          <li onClick={() => startRoom(friend._id)} key={index}>
            <img
              className="FriendImage"
              src={`${process.env.REACT_APP_BACKENDSERVER}/images/${friend.photo}`}
              alt=""
            />
            <h4>
              {friend.firstName} <span>{friend.lastName}</span>
            </h4>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewRoom;
