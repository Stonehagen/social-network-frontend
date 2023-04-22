import '../styles/Header.css';
import CornLogo from '../img/corn.svg';

const Header = ({ user, logout }) => {
  return (
    <div className="Header">
      <img src={CornLogo} alt="Corn Logo" />
      <h3>CORNECT.ME</h3>
      {user ? <button onClick={() => logout()}>LOG OUT</button> : null}
    </div>
  );
};

export default Header;
