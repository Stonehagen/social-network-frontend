import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PostFeed.css';
import heart from '../img/heart.svg';
import heartFill from '../img/heartFill.svg';
import comment from '../img/comment.svg';
import commentFill from '../img/commentFill.svg';
import clock from '../img/clock.svg';

const PostFeed = ({ userProfile }) => {
  const [postFeed, setPostFeed] = useState([]);

  const navigate = useNavigate();

  const timeFormat = (timest) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(timest));
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKENDSERVER}/post/latest/20`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        if (res.data.error) {
          return res.data.error;
        } else {
          setPostFeed(res.data.posts);
        }
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="PostFeed">
      {postFeed.map((post, index) => {
        const postTime = timeFormat(post.timestamp);
        return (
          <div className="Post" key={index}>
            <div className="PostTop">
              <img
              className='PostImage'
                onClick={() => navigate(`/profile/${post.author._id}`)}
                src={`${process.env.REACT_APP_BACKENDSERVER}/images/${post.author.photo}`}
                alt=""
              />
              <div className="postContent">
                <h4
                  onClick={() => navigate(`/profile/${post.author._id}`)}
                >{`${post.author.firstName} ${post.author.lastName}`}</h4>
                <p className="timestamp">
                  <img src={clock} alt="" />
                  {` ${postTime}`}
                </p>
                <p className="postText">{post.text}</p>
              </div>
            </div>
            <form>
              <button
                type="button"
                className="likeBtn"
                onMouseOver={(e) =>
                  (e.currentTarget.children[0].src = heartFill)
                }
                onMouseOut={(e) => (e.currentTarget.children[0].src = heart)}
              >
                <img src={heart} alt="" />
                Like Post
              </button>
              <button
                type="button"
                className="commentBtn"
                onMouseOver={(e) =>
                  (e.currentTarget.children[0].src = commentFill)
                }
                onMouseOut={(e) => (e.currentTarget.children[0].src = comment)}
              >
                <img src={comment} alt="" />
                Comment
              </button>
            </form>
          </div>
        );
      })}
    </div>
  );
};

export default PostFeed;
