import axios from 'axios';
import { useEffect, useState } from 'react';
import '../styles/PostFeed.css';
import Post from './Post';

const PostFeed = ({ profile }) => {
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
  }, [postFeed]);

  return (
    <div className="PostFeed">
      {postFeed.map((post, index) => {
        return (
          <Post
            post={post}
            profile={profile}
            getPostFeed={getPostFeed}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default PostFeed;
