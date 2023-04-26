import { useState } from 'react';
import '../styles/CreatePost.css';

const CreatePost = ({ profilePicture }) => {
  const [publicPost, setPublicPost] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };


  return (
    <div className="CreatePost">
      <form onSubmit={handleSubmit}>
        <div className="ImageContainer">
          <img
            src={`${process.env.REACT_APP_BACKENDSERVER}/images/${profilePicture}`}
            alt=""
          />
          <textarea placeholder="What do you think?"></textarea>
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
