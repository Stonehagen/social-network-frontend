import { useNavigate } from 'react-router-dom';
import send from '../img/send.svg';
import sendFill from '../img/sendFill.svg';
import received from '../img/received.svg';
import receivedFill from '../img/receivedFill.svg';

const UserProfileMenu = ({ profile }) => {
  const navigate = useNavigate();

  return (
    <div className="ProfileMenu UserProfileMenu">
      <form>
        <button
          className="userMenuBtn"
          type="button"
          onClick={() => navigate('/profile/friendRequests')}
          onMouseOver={(e) => (e.currentTarget.children[0].src = receivedFill)}
          onMouseOut={(e) => (e.currentTarget.children[0].src = received)}
        >
          <img src={received} alt="" />
          Received Requests
        </button>
        <button
          className="userMenuBtn"
          type="button"
          onClick={() => navigate('/profile/friendRequestsOut')}
          onMouseOver={(e) => (e.currentTarget.children[0].src = sendFill)}
          onMouseOut={(e) => (e.currentTarget.children[0].src = send)}
        >
          <img src={send} alt="" />
          Send Requests
        </button>
      </form>
    </div>
  );
};

export default UserProfileMenu;
