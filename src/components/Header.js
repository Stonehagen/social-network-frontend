import '../styles/Header.css';
import CornLogo from '../img/corn.svg';

const Header = ({ user, logout }) => {
  return (
    <div className="Header">
      <img src={CornLogo} alt='Corn Logo'/>
      <h3>CORNECT.ME</h3>
    </div>
  );
};

export default Header;
