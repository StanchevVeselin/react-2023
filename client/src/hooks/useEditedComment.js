import { useState } from 'react';

const useEditedComments = () => {
  const [editedComments, setEditedComments] = useState([]);

  const addEditedComment = (comment) => {
    setEditedComments((prevComments) => [...prevComments, comment]);
  };

  const removeEditedComment = (commentId) => {
    setEditedComments((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
  };

  return { editedComments, addEditedComment, removeEditedComment };
};

export default useEditedComments;