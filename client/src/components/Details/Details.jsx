import { useContext, useEffect, useMemo, useReducer, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useParams } from "react-router-dom";
import * as productsService from "../../services/productsService"
import * as commentService from "../../services/commentService"
import "./details.css"
import AuthContext from '../../context/authData';
// import reducer from './reducer';
import { useForm } from '../../hooks/useForm';
import EditCommentModal from '../editComments/EditComment';
import useEditedComments from '../../hooks/useEditedComment';

const reducer = (state,action) => {
  switch (action?.type) {
    case "GET_ALL_PRODUCTS":
          return [...action.payload];
    case "ADD_COMMENT":
          return [...state, action.payload]
    case "UPDATE_COMMENT":
      console.log(action.payload);
      if (action.payload && action.payload._id) {
        return state.map((comment) =>
          comment._id === action.payload._id ? { ...comment, ...action.payload } : comment
        );
      } else {
        console.error("Invalid action payload for UPDATE_COMMENT:", action.payload);
        return state;
      }
      case "DELETE_COMMENT":
        return state.filter(comment => comment._id !== action.payload);
default:
        return state;
    
  }
}

const Details = () => {
  const{email, userId} = useContext(AuthContext)
  const[product, setProduct] = useState({})
  const[comments,dispatch] = useReducer(reducer,[])
  // const[comments,setComments] = useState({})
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
  
 const newComment =  await commentService.create(
    productId,
    values.comment,
  )
  console.log(newComment);
    newComment.owner = {email}
  // setComments(state => [...state,{...newComment,author: {email}}])
    dispatch({
      type: "ADD_COMMENT",
      payload: newComment
    })
 }

 const initialValues = useMemo(() => ({
  comment: "",
 }),[])

 const{values,onChange,onSubmit} = useForm(addCommentHandler,initialValues)

const handleEditComment = (editedComment) => {
  // const commentToEdit = comments.find((comment) => {
  //   console.log({commentID: comment._id});
  //   console.log(_id);
  //   console.log(comment);
  //   comment._id === _id
  // });
  console.log(editingComment);
  setEditingComment(editedComment);
  setShowEditModal(true);
  addEditedComment({ _id: editingComment._id, text: editingComment.text });
};

const handleSaveEditedComment = async (updatedComment) => {
  console.log(updatedComment);
  try{
    const updatesComment = await commentService.updateComment(updatedComment._id,updatedComment.text)

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
  try {
    await commentService.deleteComment(commentId);
    dispatch({
      type: "DELETE_COMMENT",
      payload: commentId
    });
  } catch (error) {
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


      {/* // <section id="game-details"> */}
      <h1>Comments for Product:</h1>
      <div className="info-section">

          <div className="game-header">
              <img className="game-img" 
              // src={game.imageUrl}
               />
              {/* <h1>{product.title}</h1>
              <span className="levels">MaxLevel: </span>
              <p className="type">${product.price}</p> */}
          </div>

          <p className="text">
          {product.desc}
          </p>

          {/* <!-- Bonus ( for Guests and Users ) --> */}
          <div className="details-comments">
              {/* <h2>Comments:</h2> */}
              <ul>
                  {/* <!-- list all comments for current game (If any) --> */}
                  

                      
                      {comments.map(({_id,_ownerId,text,owner: {email}}) => (
                        <li key={_id} className="comment">
                        <p>{email}: {text}</p>
                        {userId === _ownerId && (
                          <div className='buttonsEditAndDelete'>
                                <button onClick={() => handleEditComment({ _id, text})}>
                                            Edit
                                </button>
                                <button onClick={() => handleDeleteComment(_id)}>Delete</button>
                          </div>
                        )}
                       </li>
                      ))}
                  
                  {/* <li className="comment">
                      <p>Content: I rate this one quite highly.</p>
                  </li> */}
              </ul>

                      {comments.length === 0 && (
                        <p className="no-comment">No comments.</p>
                      )}

              {/* <!-- Display paragraph: If there are no games in the database --> */}
                  {/* {comments.length === 0 && <p className="no-comment">No comments.</p>} */}
          </div>

          {/* <!-- Edit/Delete buttons ( Only for creator of this game )  -->
          <div className="buttons">
              <a href="#" className="button">Edit</a>
              <a href="#" className="button">Delete</a>
          </div> */}
      </div>

      {/* <!-- Bonus -->
      <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) --> */}
      <article className="create-comment">
          <label>Add new comment:</label>
          <form className="form" 
          onSubmit={onSubmit}
          >
              {/* <input type="text" name="username" placeholder="username" /> */}
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