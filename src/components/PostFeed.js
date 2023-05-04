import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PostFeed.css';
import Post from './Post';

const PostFeed = () => {
  const [postFeed, setPostFeed] = useState([]);

  const getPostFeed = async () => {
    axios
      .get(`${process.env.REACT_APP_BACKENDSERVER}/post/latest/20`)
      .then((res) => setPostFeed(res.data.posts))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPostFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="PostFeed">
      {postFeed.map((post, index) => {
        return <Post post={post} key={index} />;
      })}
    </div>
  );
};

export default PostFeed;
