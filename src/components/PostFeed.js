import { useEffect, useState } from 'react';
import '../styles/PostFeed.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PostFeed = ({ userProfile }) => {
  const [postFeed, setPostFeed] = useState([]);

  const timeFormat = (timest) => {
    return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(timest))
}

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
                src={`${process.env.REACT_APP_BACKENDSERVER}/images/${post.author.photo}`}
                alt=""
              />
              <div className="postContent">
                <h4>{`${post.author.firstName} ${post.author.lastName}`}</h4>
                <p className="timestamp">{`${postTime}`}</p>
                <p className='postText'>{post.text}</p>
              </div>
            </div>
            <form>
              <button type="button">Like</button>
              <button type="button">Comment</button>
            </form>
          </div>
        );
      })}
    </div>
  );
};

export default PostFeed;
