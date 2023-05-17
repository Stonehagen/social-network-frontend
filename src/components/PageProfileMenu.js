import axios from 'axios';
import message from '../img/message.svg';
import messageFill from '../img/messageFill.svg';
import friend from '../img/friend.svg';
import friendFill from '../img/friendFill.svg';
import friendRemove from '../img/friendRemove.svg';
import friendRemoveFill from '../img/friendRemoveFill.svg';
import { useNavigate } from 'react-router-dom';

const PageProfileMenu = ({
  profile,
  pageProfile,
  getPageProfile,
  checkIfFriends,
}) => {
  const navigate = useNavigate();

  const startRoom = async () => {
    await axios
      .post(`${process.env.REACT_APP_BACKENDSERVER}/room/new`, {
        chatPartner: pageProfile._id,
      })
      .then()
      .catch((err) => console.log(err))
      .finally(() => navigate('/messenger'));
  };

  const makeFriendRequest = () => {
    axios
      .put(`${process.env.REACT_APP_BACKENDSERVER}/profile/friendRequest`, {
        requestedFriend: pageProfile._id,
      })
      .then()
      .catch((err) => console.log(err))
      .finally(() => getPageProfile());
  };

  const removeFriend = () => {
    axios
      .put(`${process.env.REACT_APP_BACKENDSERVER}/profile/friendRemove`, {
        friend: pageProfile._id,
      })
      .then()
      .catch((err) => console.log(err))
      .finally(() => getPageProfile());
  };

  const cancelFriendRequest = () => {
    axios
      .put(
        `${process.env.REACT_APP_BACKENDSERVER}/profile/friendRequest/cancel`,
        {
          requestedFriend: pageProfile._id,
        },
      )
      .then()
      .catch((err) => console.log(err))
      .finally(() => getPageProfile());
  };

  return (
    <div className="ProfileMenu">
      <form>
        {pageProfile.friendRequestIn.includes(profile._id) ? (
          <button
            className="removeBtn"
            type="button"
            onClick={() => cancelFriendRequest()}
            onMouseOver={(e) =>
              (e.currentTarget.children[0].src = friendRemoveFill)
            }
            onMouseOut={(e) => (e.currentTarget.children[0].src = friendRemove)}
          >
            <img src={friendRemove} alt="" />
            Cancel Request
          </button>
        ) : checkIfFriends() ? (
          <button
            className="removeBtn"
            type="button"
            onClick={() => removeFriend()}
            onMouseOver={(e) =>
              (e.currentTarget.children[0].src = friendRemoveFill)
            }
            onMouseOut={(e) => (e.currentTarget.children[0].src = friendRemove)}
          >
            <img src={friendRemove} alt="" />
            Remove Friend
          </button>
        ) : (
          <button
            className="menuBtn"
            type="button"
            onClick={() => makeFriendRequest()}
            onMouseOver={(e) => (e.currentTarget.children[0].src = friendFill)}
            onMouseOut={(e) => (e.currentTarget.children[0].src = friend)}
          >
            <img src={friend} alt="" />
            Add Friend
          </button>
        )}
        <button
          onClick={() => startRoom()}
          className="menuBtn"
          type="button"
          onMouseOver={(e) => (e.currentTarget.children[0].src = messageFill)}
          onMouseOut={(e) => (e.currentTarget.children[0].src = message)}
        >
          <img src={message} alt="" />
          Message
        </button>
      </form>
    </div>
  );
};

export default PageProfileMenu;
