import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import Profile from './Profile';
import CreatePost from './CreatePost';
import PostFeed from './PostFeed';
import NewUsers from './NewUsers';
import Messenger from './Messenger';

const Home = ({ user, profile, socket }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!profile) {
    return <></>;
  }

  return (
    <div className="Home">
      <div className="leftDiv">
        <Profile profile={profile} />
        <NewUsers />
      </div>
      <div className="middleDiv">
        <CreatePost profile={profile} />
        <PostFeed profile={profile} />
      </div>
      <div className="rightDiv">
        <Messenger user={user} profile={profile} socket={socket} />
      </div>
    </div>
  );
};

export default Home;
