import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import * as commentService from"../../services/commentService"

const EditCommentModal = ( {comment, onSave, onClose, onUpdateComment} ) => {
  const [editedComment, setEditedComment] = useState(comment);

  const handleClose = () => {
    onClose();
  };

  const handleSave = async () => {
    // await saveOldComment()
    onSave(editedComment);

    console.log(editedComment);
    onUpdateComment(editedComment)
    handleClose()
    
  };

  const onChange = (e) => {
    setEditedComment(
        { ...editedComment, text: e.target.value }
        );
  };

//   const saveOldComment = async () => {
//     try {
//       // Предполагам, че commentService.update изисква _id на коментара и новият текст
//       await commentService.updateComment(editedComment._id, editedComment.text);
//     } catch (error) {
//       console.error("Error saving old comment", error);
//     }
//   };

  return (
    <Modal 
    show={true} 
    onHide={onClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Текстово поле за редактиране на коментара */}
          <Form.Group controlId="commentForm.ControlTextarea1">
            <Form.Control
              as="textarea"
              rows={3}
              value={editedComment.text}
              onChange={onChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleClose}
        >
          Close
        </Button>
        {/* Бутон за запазване на промените */}
        <Button
          variant="primary"
          onClick={handleSave}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditCommentModal;