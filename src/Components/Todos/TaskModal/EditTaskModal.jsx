import { Modal, Button } from 'react-bootstrap';

function EditTaskModal({ show, onHide, task, editedTask, setEditedTask, onSave }) {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedTask({ ...editedTask, [name]: value });
    };
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Task</label>
                        <input type="text" className="form-control" name="task" value={editedTask.task} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Task Text</label>
                        {typeof editedTask.taskText === 'string' && editedTask.taskText.endsWith('.jpg') ? (
                            <textarea className="form-control" name="taskText" value="" />

                        ) : (
                            <textarea className="form-control" name="taskText" value={editedTask.taskText} onChange={handleChange} />
                        )}
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
                <Button variant="primary" onClick={onSave}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditTaskModal
