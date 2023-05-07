import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { formatTime } from '../methods/formatTime';
import '../styles/PostFeed.css';
import heart from '../img/heart.svg';
import heartFill from '../img/heartFill.svg';
import comment from '../img/comment.svg';
import commentFill from '../img/commentFill.svg';
import worldFillWhite from '../img/worldFillWhite.svg';
import friendsFillWhite from '../img/friendsFillWhite.svg';
import { useState } from 'react';
import Likes from './Likes';

const Post = ({ post, profile, getPostFeed }) => {
  const postTime = formatTime(post.timestamp);
  const [likes, setLikes] = useState([]);
  const [displayLikes, setDisplayLikes] = useState(false);

  const navigate = useNavigate();

  const likePost = async () => {
    await axios
      .put(`${process.env.REACT_APP_BACKENDSERVER}/post/like/${post._id}`)
      .then()
      .catch((err) => console.log(err))
      .finally(() => getPostFeed());
  };
  const unlikePost = async () => {
    await axios
      .put(`${process.env.REACT_APP_BACKENDSERVER}/post/unlike/${post._id}`)
      .then()
      .catch((err) => console.log(err))
      .finally(() => getPostFeed());
  };

  const getLikes = async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKENDSERVER}/post/likes/${post._id}`)
      .then((res) => setLikes(res.data.likes))
      .catch((err) => console.log(err));
  };

  return (
    <div className="Post">
      <div className="PostTop">
        <img
          className="PostImage"
          onClick={() => navigate(`/profile/${post.author._id}`)}
          src={`${process.env.REACT_APP_BACKENDSERVER}/images/${post.author.photo}`}
          alt=""
        />
        <div className="postContent">
          <h4
            onClick={() => navigate(`/profile/${post.author._id}`)}
          >{`${post.author.firstName} ${post.author.lastName}`}</h4>
          <p className="timestamp">
            <img src={post.public ? worldFillWhite : friendsFillWhite} alt="" />
            {` ${postTime}`}
          </p>
          <p className="postText">{post.text}</p>
          <div className="stats">
            <div className="shorts">
              <button
                onClick={() => {
                  getLikes();
                  setDisplayLikes(!displayLikes);
                }}
                type="button"
                className="likeBtn"
              >
                <img
                  src={post.likes.includes(profile._id) ? heartFill : heart}
                  alt=""
                />
                {`${post.likes.length}`}
              </button>
            </div>
            {displayLikes && post.likes.length > 0 ? (
              <Likes likes={likes} setDisplayLikes={setDisplayLikes}/>
            ) : null}
          </div>
        </div>
      </div>

      <form>
        {post.likes.includes(profile._id) ? (
          <button
            onClick={() => unlikePost()}
            type="button"
            className="likeBtn"
            onMouseOver={(e) => (e.currentTarget.children[0].src = heart)}
            onMouseOut={(e) => (e.currentTarget.children[0].src = heartFill)}
          >
            <img src={heartFill} alt="" />
            Unlike
          </button>
        ) : (
          <button
            onClick={() => likePost()}
            type="button"
            className="likeBtn"
            onMouseOver={(e) => (e.currentTarget.children[0].src = heartFill)}
            onMouseOut={(e) => (e.currentTarget.children[0].src = heart)}
          >
            <img src={heart} alt="" />
            Like
          </button>
        )}
        <button
          type="button"
          className="likeBtn"
          onMouseOver={(e) => (e.currentTarget.children[0].src = commentFill)}
          onMouseOut={(e) => (e.currentTarget.children[0].src = comment)}
        >
          <img src={comment} alt="" />
          Comment
        </button>
      </form>
    </div>
  );
};

export default Post;
