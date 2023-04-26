import { useState } from 'react';
import '../styles/CreatePost.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
          <label className="privateToggle">
            <button
              type="button"
              className={publicPost ? 'inactive' : 'active'}
              onClick={() => setPublicPost(false)}
            >
              Private
            </button>
            <button
              type="button"
              className={publicPost ? 'active' : 'inactive'}
              onClick={() => setPublicPost(true)}
            >
              Public
            </button>
          </label>
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
