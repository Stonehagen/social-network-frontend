import { useRef } from 'react';
import { OutsideClick } from '../methods/outsideClick';
import '../styles/NewRoom.css';
import CloseRed from '../img/closeRed.svg';
import CloseFillRed from '../img/closeFillRed.svg';

const NewRoom = ({ setDisplayNewRoom }) => {
  const wrapperRef = useRef(null);
  OutsideClick(wrapperRef, setDisplayNewRoom);

  return (
    <div ref={wrapperRef} className="NewRoom">
      <div className='newRoomHeader'>
        <h4>Start new Conversion</h4>
        <button
          className="closeNewRoom"
          type="button"
          onClick={() => setDisplayNewRoom(false)}
          onMouseOver={(e) => (e.currentTarget.children[0].src = CloseFillRed)}
          onMouseOut={(e) => (e.currentTarget.children[0].src = CloseRed)}
        >
          <img src={CloseRed} alt="" />
        </button>
      </div>

    </div>
  );
};

export default NewRoom;
