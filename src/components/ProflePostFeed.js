import axios from 'axios';
import { useEffect, useState } from 'react';
import '../styles/PostFeed.css';
import Post from './Post';

const ProfilePostFeed = ({
  pageProfile,
  checkIfFriends,
  checkIfUserProfile,
  profile,
}) => {
  const [postFeed, setPostFeed] = useState([]);

  const filterPostFeed = (feed) =>
    checkIfFriends() || checkIfUserProfile()
      ? feed
      : feed.filter((post) => post.public);

  const getPostFeed = async () => {
    axios
      .get(
        `${process.env.REACT_APP_BACKENDSERVER}/post/user/${pageProfile._id}`,
      )
      .then((res) => setPostFeed(filterPostFeed(res.data.posts)))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    window.scrollTo(0, 0)
    getPostFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageProfile]);

  return (
    <div className="PostFeed">
      {postFeed.map((post, index) => {
        return (
          <Post
            post={post}
            profile={profile}
            getPostFeed={getPostFeed}
            key={`${pageProfile._id}-${index}`}
          />
        );
      })}
    </div>
  );
};

export default ProfilePostFeed;
