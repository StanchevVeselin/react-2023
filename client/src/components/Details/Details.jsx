import { useContext, useEffect, useMemo, useReducer, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Link, useParams } from "react-router-dom";
import * as productsService from "../../services/productsService"
import * as commentService from "../../services/commentService"
import "./details.css"
import AuthContext from '../../context/authData';
import reducer from './reducer';
import { useForm } from '../../hooks/useForm';
import EditCommentModal from '../editComments/EditComment';
import useEditedComments from '../../hooks/useEditedComment';

const Details = () => {
  const{email, userId} = useContext(AuthContext)
  const[product, setProduct] = useState({})
  const[comments,dispatch] = useReducer(reducer,[])
  const [editingComment, setEditingComment] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const { editedComments, addEditedComment, removeEditedComment } = useEditedComments();
  
  const {productId} = useParams()
   useEffect(() => {

    productsService.getOne(productId)
    .then(setProduct);

    commentService.getAll(productId)
      .then((result) => {
          dispatch({
            type: "GET_ALL_PRODUCTS",
            payload: result 
          })
      })
   },[productId])

  const addCommentHandler = async (values) => {
    try {
        const newComment =  await commentService.create(
        productId,
        values.comment,
        )
        newComment.owner = {email}

        dispatch({
            type: "ADD_COMMENT",
            payload: newComment
        })
    }catch(err) {
      console.error("Error adding comment:", error);
    }
  }

  const initialValues = useMemo(() => ({
  comment: "",
  }),[])

  const{values,onChange,onSubmit} = useForm(addCommentHandler,initialValues)

  const handleEditComment = (editedComment) => {
  const commentToEdit = comments.find((comment) => comment._id === editingComment._id)
 
  setEditingComment(editedComment);
  setShowEditModal(true);
  addEditedComment({ _id: editingComment._id, text: editingComment.text, productId: commentToEdit.productId });
};

  const handleSaveEditedComment = async (updatedComment) => {
  try{
    const updatesComment = await commentService.updateComment(updatedComment._id,updatedComment.text, updatedComment.productId)

    dispatch({
      type: "UPDATE_COMMENT",
      payload: updatesComment
    })

    
  } catch(err) {
    console.log(err);
  }

 
    

    
  removeEditedComment(updatedComment._id._id);
  setShowEditModal(false);
};

  const handleDeleteComment = async (commentId) => {
  const isConfirmed = confirm("Are you sure you want to delete this comment?")
  try {
      if(isConfirmed) {
        await commentService.deleteComment(commentId);
        dispatch({
          type: "DELETE_COMMENT",
          payload: commentId
        });
      }
  }catch(error) {
      console.error("Error deleting comment:", error);
  }
}

  return (
      <section id="game-details">
        <article className="product">
      <Card style={{ width: '18rem' }} >
      <Card.Img variant="top" src="https://vision-shop.bg/image/cache/data/photo_2020-03-22_01-36-11-600x600.jpg" 
      className="product_img"/>
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>
        {product.desc}
        </Card.Text>
        <p className="product__price">${product.price}</p>
        <div className="product__rating"></div>
        <Link to={`/add-to-cart/${productId}` } className="add-to-cart-button">Add to Cart</Link>
      </Card.Body>
      
      </Card>
      </article>


      <h1>Comments for Product:</h1>
      <div className="info-section">

          <div className="game-header">
              <img className="game-img" />
          </div>

          <p className="text">
          {product.desc}
          </p>

          <div className="details-comments">
              <ul>
                  

                      
                      {comments.map(({_id,_ownerId,text,owner: {email}}) => (
                        <li key={_id} className="comment">
                        <p>{email}: {text}</p>
                        {userId === _ownerId && (
                          <div className='buttonsEditAndDelete'>
                                <button onClick={() => handleEditComment({ _id, text, productId})}>
                                            Edit
                                </button>
                                <button onClick={() => handleDeleteComment(_id)}>Delete</button>
                          </div>
                        )}
                       </li>
                      ))}
              </ul>

                      {comments.length === 0 && (
                        <p className="no-comment">No comments.</p>
                      )}

          </div>
      </div>
      <article className="create-comment">
          <label>Add new comment:</label>
          <form className="form" 
          onSubmit={onSubmit}
          >
              <textarea name="comment" value={values.comment} onChange={onChange} placeholder="Comment......"></textarea>
              <input className="btn submit" type="submit" value="Add Comment"/>
          </form>
      </article>

      {showEditModal && (
        <EditCommentModal
          comment={editingComment}
          onSave={handleEditComment}
           onClose={() => setShowEditModal(false)}
           onUpdateComment={handleSaveEditedComment}
        />
      )}

  </section>

      
    )
    }
export default Details;