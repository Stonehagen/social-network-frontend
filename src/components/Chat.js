import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OutsideClick } from '../methods/outsideClick';
import '../styles/Chat.css';
import CloseRed from '../img/closeRed.svg';
import CloseFillRed from '../img/closeFillRed.svg';
import sendDark from '../img/sendDark.svg';
import sendFillDark from '../img/sendFillDark.svg';

const Chat = ({ profile, setDisplayChat, activeRoom, socket }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const wrapperRef = useRef(null);
  const chatPartner =
    activeRoom.users[0]._id === profile._id
      ? activeRoom.users[1]
      : activeRoom.users[0];

  OutsideClick(wrapperRef, setDisplayChat);

  const navigate = useNavigate();

  const getMessages = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_BACKENDSERVER}/room/getmessages/${activeRoom._id}`,
      )
      .then((res) => setMessages(res.data.messages))
      .catch((err) => console.log(err));
  };

  const sendMessage = (e) => {
    e.preventDefault();
    axios
      .put(
        `${process.env.REACT_APP_BACKENDSERVER}/room/addmessage/${activeRoom._id}`,
        {
          text: message,
        },
      )
      .then(() => {
        socket.emit('chat message', { profileId: profile._id, message });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setMessages((messages) => [
          ...messages,
          {
            text: message,
            timestamp: Date.now(),
            room: activeRoom._id,
            author: profile._id,
          },
        ]);
        setMessage('');
      });
  };

  socket.on('chat message', (msg) => {
    console.log(msg);
  });

  useEffect(() => {
    getMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={wrapperRef} className="Chat">
      <div className="ChatHeader">
        <div>
          <img
            onClick={() => navigate(`/profile/${chatPartner._id}`)}
            className="FriendImage"
            src={`${process.env.REACT_APP_BACKENDSERVER}/images/${chatPartner.photo}`}
            alt=""
          />
          <h3
            onClick={() => navigate(`/profile/${chatPartner._id}`)}
          >{`${chatPartner.firstName} ${chatPartner.lastName}`}</h3>
        </div>
        <button
          className="closeChat"
          type="button"
          onClick={() => setDisplayChat(false)}
          onMouseOver={(e) => (e.currentTarget.children[0].src = CloseFillRed)}
          onMouseOut={(e) => (e.currentTarget.children[0].src = CloseRed)}
        >
          <img src={CloseRed} alt="" />
        </button>
      </div>
      <div className="ChatWindow">
        <ul>
          {messages.map((message, index) => {
            return (
              <li
                key={index}
                className={message.author._id === profile._id ? 'out' : 'in'}
              >
                <p className="messageText">{message.text}</p>
                <p className="messageTimestamp">{message.timestamp}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="ChatControlls">
        <form onSubmit={(e) => sendMessage(e)}>
          <input
            type="text"
            placeholder="Aa"
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            onMouseOver={(e) =>
              (e.currentTarget.children[0].src = sendFillDark)
            }
            onMouseOut={(e) => (e.currentTarget.children[0].src = sendDark)}
          >
            <img src={sendDark} alt="" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;