import { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import { uniqueId } from 'lodash';

function AddNewList({ show, onHide, onSave }) {
    const [task, setTask] = useState('');
    const [taskText, setTaskText] = useState('');

    const handleSave = () => {
        const currentDate = new Date().toLocaleDateString();
        const newid = uniqueId();
        onSave({ id: newid, task, taskText, date: currentDate, taskProperty: 'Design' });
        setTask('');
        setTaskText('');
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form >
                    <Form.Group controlId="task" style={{ marginBottom: "10px" }}>

                        <Form.Control
                            type="text"
                            placeholder="task"
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="taskText">

                        <Form.Control
                            as="textarea"
                            rows={2}
                            placeholder="task text"
                            value={taskText}
                            onChange={(e) => setTaskText(e.target.value)}
                        />
                    </Form.Group>
                </Form>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Add Task
                    </Button>
                </Modal.Footer>
            </Modal.Body>
        </Modal>
    )
}

export default AddNewList;
