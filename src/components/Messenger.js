import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Messenger.css';
import NewRoom from './NewRoom';
import Chat from './Chat';

const MessageNew = '../img/messageNew.svg';
const MessageNewFill = '../img/messageNewFill.svg';

const Messenger = ({ user, profile, socket }) => {
  const [rooms, setRooms] = useState([]);
  const [displayNewRoom, setDisplayNewRoom] = useState(false);
  const [displayChat, setDisplayChat] = useState(false);
  const [activeRoom, setActiveRoom] = useState(null);

  const navigate = useNavigate();

  const getRooms = async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKENDSERVER}/profile/rooms`)
      .then((res) => setRooms(res.data.rooms))
      .catch((err) => console.log(err));
  };

  socket.on('private message', () => {
    if (!displayChat || !displayNewRoom) {
      getRooms();
    }
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    getRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayChat]);

  return (
    <div className="Messenger">
      <div className="MessengerHeader">
        <h3>Messenger</h3>
        <button
          onClick={() => {
            setDisplayNewRoom(true);
          }}
          type="button"
          onMouseOver={(e) =>
            (e.currentTarget.children[0].src = MessageNewFill)
          }
          onMouseOut={(e) => (e.currentTarget.children[0].src = MessageNew)}
        >
          <img src={MessageNew} alt="" />
        </button>
        {displayNewRoom ? (
          <NewRoom
            setDisplayNewRoom={setDisplayNewRoom}
            profile={profile}
            getRooms={getRooms}
          />
        ) : null}
        {displayChat ? (
          <Chat
            profile={profile}
            setDisplayChat={setDisplayChat}
            activeRoom={activeRoom}
            socket={socket}
          />
        ) : null}
      </div>
      <div className="chats">
        <ul>
          {rooms.map((room, index) => {
            const chatPartner =
              room.users[0]._id === profile._id ? room.users[1] : room.users[0];
            return (
              <li
                key={index}
                onClick={() => {
                  setActiveRoom(room);
                  setDisplayChat(true);
                }}
              >
                <img
                  className="FriendImage"
                  src={`${process.env.REACT_APP_BACKENDSERVER}/images/${chatPartner.photo}`}
                  alt=""
                />
                <div>
                  <h4>{`${chatPartner.firstName} ${chatPartner.lastName}`}</h4>
                  {room.messages[0] ? (
                    <p>{`${
                      room.messages[0].author === profile._id
                        ? 'You: '
                        : `${chatPartner.firstName}: `
                    } ${room.messages[0].text}`}</p>
                  ) : (
                    <p></p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Messenger;
