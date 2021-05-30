import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useHttp from '../hooks/use-http';
import { getAllComments } from '../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import CommentsList from './CommentsList';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();
  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);
  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
  const { quoteId } = params;
  useEffect(() => {
    sendRequest(quoteId)
  }, [sendRequest, quoteId])
  const addedCommentHandler = useCallback(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);
  let comments;
  if(status === 'pending') comments = <div className="centered"><LoadingSpinner/></div>
  if(status === 'completed' && loadedComments) comments = <CommentsList comments={loadedComments} />
  if(status === 'completed' && loadedComments.length===0) comments = <p className='centered'>No Comments added yte!</p>
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm quoteId={quoteId} onAddedComment={addedCommentHandler}/>}
      {comments}
    </section>
  );
};

export default Comments;
