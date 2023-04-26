import '../styles/CreatePost.css';

const CreatePost = ({ profilePicture }) => {
  return (
    <div className="CreatePost">
      <div className='ImageContainer'>
        <img
          src={`${process.env.REACT_APP_BACKENDSERVER}/images/${profilePicture}`}
          alt=""
        />
      </div>
      <form>
        <textarea placeholder="What do you think?"></textarea>
        <div>
          <button type='submit'>Send</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
