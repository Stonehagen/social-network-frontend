import { useNavigate } from 'react-router-dom';
import { formatTime } from '../methods/formatTime';
import '../styles/PostFeed.css';
import heart from '../img/heart.svg';
import heartFill from '../img/heartFill.svg';
import comment from '../img/comment.svg';
import commentFill from '../img/commentFill.svg';
import worldFillWhite from '../img/worldFillWhite.svg';
import friendsFillWhite from '../img/friendsFillWhite.svg';

const Post = ({ post }) => {
  const postTime = formatTime(post.timestamp);

  const navigate = useNavigate();

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
        </div>
      </div>
      <form>
        <button
          type="button"
          className="likeBtn"
          onMouseOver={(e) => (e.currentTarget.children[0].src = heartFill)}
          onMouseOut={(e) => (e.currentTarget.children[0].src = heart)}
        >
          <img src={heart} alt="" />
          Like Post
        </button>
        <button
          type="button"
          className="commentBtn"
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
