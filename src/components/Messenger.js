import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Messenger.css';
import MessageNew from '../img/messageNew.svg';
import MessageNewFill from '../img/messageNewFill.svg';
import NewRoom from './NewRoom';

const Messenger = ({ user, profile, socket }) => {
  const [displayNewRoom, setDisplayNewRoom] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <NewRoom setDisplayNewRoom={setDisplayNewRoom} profile={profile} />
        ) : null}
      </div>
      <div>
        <ul>
          <li>chat mockup 1</li>
          <li>chat mockup 2</li>
          <li>chat mockup 3</li>
          <li>chat mockup 4</li>
        </ul>
      </div>
    </div>
  );
};

export default Messenger;
