import { useState } from 'react';
import '../styles/CreatePost.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import world from '../img/world.svg';
import worldFill from '../img/worldFill.svg';
import worldFillWhite from '../img/worldFillWhite.svg';
import friends from '../img/friends.svg';
import friendsFill from '../img/friendsFill.svg';
import friendsFillWhite from '../img/friendsFillWhite.svg';

const CreatePost = ({ profilePicture }) => {
  const [text, setText] = useState();
  const [publicPost, setPublicPost] = useState(false);
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        `${process.env.REACT_APP_BACKENDSERVER}/post/new`,
        {
          text,
          public: publicPost,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((res) => {
        if (res.data.error) {
          setErrors(res.data.error);
        } else {
          setErrors([]);
        }
      })
      .then(() => navigate(0))
      .catch((err) => {
        if (err.response.data.error) {
          setErrors(err.response.data.error);
        } else {
          console.log(err);
        }
      });
  };

  return (
    <div className="CreatePost">
      <form onSubmit={handleSubmit}>
        <div className="ImageContainer">
          <img
            src={`${process.env.REACT_APP_BACKENDSERVER}/images/${profilePicture}`}
            alt=""
          />
          <textarea
            placeholder="What's on your mind?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>
        <div className="messages">
          {errors.map((error, index) => {
            return (
              <p className="errorMessage" key={index}>
                {error.msg}
              </p>
            );
          })}
        </div>
        <div>
          <div className="privateToggle">
            <button
              type="button"
              className={publicPost ? 'inactive' : 'active'}
              onClick={() => setPublicPost(false)}
              onMouseOver={
                publicPost
                  ? (e) => (e.currentTarget.children[0].src = friendsFill)
                  : null
              }
              onMouseOut={
                publicPost
                  ? (e) => (e.currentTarget.children[0].src = friends)
                  : null
              }
            >
              <img src={publicPost ? friends : friendsFillWhite} alt="" />
              <span>Friends</span>
            </button>
            <button
              type="button"
              className={publicPost ? 'active' : 'inactive'}
              onClick={() => setPublicPost(true)}
              onMouseOver={
                publicPost
                  ? null
                  : (e) => (e.currentTarget.children[0].src = worldFill)
              }
              onMouseOut={
                publicPost
                  ? null
                  : (e) => (e.currentTarget.children[0].src = world)
              }
            >
              <img src={publicPost ? worldFillWhite : world} alt="" />
              <span>Public</span>
            </button>
          </div>
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
