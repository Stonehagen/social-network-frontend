import { useEffect } from 'react';
import '../styles/Home.css';
import { useNavigate } from 'react-router-dom';

const Home = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  });

  return (
    <div className="Home">
      <h1>Welcome Home</h1>
    </div>
  );
};

export default Home;
