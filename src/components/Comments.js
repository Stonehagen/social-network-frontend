import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Comments.css';
import { formatTime } from '../methods/formatTime';

const Comments = ({ comments, getComments, postId, profile }) => {
  const [text, setText] = useState();
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKENDSERVER}/comment/new`, {
        text,
        post: postId,
      })
      .then((res) => getComments())
      .catch((err) =>
        err.response.data.error
          ? setErrors(err.response.data.error)
          : console.log(err),
      )
      .finally(() => {
        setText('');
      });
  };

  return (
    <div className="Comments">
      <form onSubmit={handleSubmit}>
        <div className="CreateComment">
          <img
            src={`${process.env.REACT_APP_BACKENDSERVER}/images/${profile.photo}`}
            alt=""
          />
          <textarea
            placeholder="What's your opinion?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>
        <div className="messages">
          {errors.map((error, index) => {
            return (
              <p className="errorMessage" key={index}>
                {error.msg}
              </p>
            );
          })}
        </div>
        <button type="submit">Send</button>
      </form>
      <ul className="comments">
        {comments.map((comment, index) => {
          const commentTime = formatTime(comment.timestamp);
          return (
            <li key={index}>
              <div className="commentHeader">
                <img
                  onClick={() => navigate(`/profile/${comment.author}`)}
                  className="CommentsImage"
                  src={`${process.env.REACT_APP_BACKENDSERVER}/images/${comment.author.photo}`}
                  alt=""
                />
                <div className="commentHeaderAuthor">
                  <h4
                    onClick={() => navigate(`/profile/${comment.author._id}`)}
                  >{`${comment.author.firstName} ${comment.author.lastName}`}</h4>
                  <p>{commentTime}</p>
                </div>
              </div>
              <p className="commentText">{`${comment.text}`}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Comments;
