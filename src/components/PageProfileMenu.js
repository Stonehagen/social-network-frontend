import axios from 'axios';
import message from '../img/message.svg';
import messageFill from '../img/messageFill.svg';
import friend from '../img/friend.svg';
import friendFill from '../img/friendFill.svg';

const PageProfileMenu = ({ profile, pageProfile, getPageProfile }) => {

  const makeFriendRequest = () => {
    axios
      .put(`${process.env.REACT_APP_BACKENDSERVER}/profile/friendRequest`, {
        requestedFriend: pageProfile._id,
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
            className="cancelRequest"
            type="button"
            onClick={() => cancelFriendRequest()}
            onMouseOver={(e) => (e.currentTarget.children[0].src = friendFill)}
            onMouseOut={(e) => (e.currentTarget.children[0].src = friend)}
          >
            <img src={friend} alt="" />
            Cancel Request
          </button>
        ) : pageProfile.friends.includes(profile._id) ? null : (
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
