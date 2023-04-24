import '../styles/Header.css';
import CornLogo from '../img/corn.svg';
import { useNavigate } from 'react-router-dom';

const Header = ({ user, logout }) => {
  const navigate = useNavigate();

  const loggingOut = () => {
    logout()
    navigate('/login');
  }
  return (
    <div className="Header">
      <img src={CornLogo} alt="Corn Logo" />
      <h3 onClick={() => navigate('/')}>CORNECT.ME</h3>
      {user ? <button onClick={() => loggingOut()}>LOG OUT</button> : null}
    </div>
  );
};

export default Header;
