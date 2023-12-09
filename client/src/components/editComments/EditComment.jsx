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

    onUpdateComment(editedComment)
    handleClose()
    
  };

  const onChange = (e) => {
    setEditedComment(
        { ...editedComment, text: e.target.value }
        );
  };



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