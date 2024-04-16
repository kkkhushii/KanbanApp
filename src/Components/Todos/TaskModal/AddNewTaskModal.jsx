import { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import { uniqueId } from 'lodash';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function AddNewList({ show, onHide, onSave, taskProperties }) {
    const [task, setTask] = useState('');
    const [taskText, setTaskText] = useState('');
    const [selectedProperty, setSelectedProperty] = useState('');
    const [maxId, setMaxId] = useState(5);
    const [dueDate, setDueDate] = useState();
    const [imageURL, setImageURL] = useState();


    // whenever page load than display current date in datepicker
    useEffect(() => {
        setDueDate(new Date());
    }, [show]);


    const handleSave = () => {
        const formattedDueDate = dueDate ? dueDate.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
        }) : '';

        const newId = maxId + 1;
        onSave({ id: newId, task, taskText, taskImage: imageURL, date: formattedDueDate, taskProperty: selectedProperty });
        setTask('');
        setTaskText('');
        setSelectedProperty(selectedProperty);
        setDueDate(dueDate);
        setMaxId(prevMaxId => prevMaxId + 1);
        onHide();

    };
    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setImageURL(URL.createObjectURL(e.target.files[0]));
        }
    };
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="task" className='AddTaskstyle'>
                        <Form.Control
                            type="text"
                            placeholder="task"
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="taskText" className='AddTaskstyle'>
                        <Form.Group controlId="taskText" className='AddTaskstyle'>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                placeholder="task text"
                                value={taskText}
                                onChange={(e) => setTaskText(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="taskText" className='AddTaskstyle'>
                            <Form.Control
                                type='text'
                                placeholder="add image url"
                                onChange={(e) => setImageURL(e.target.value)}
                            />
                        </Form.Group>
                        <img src={imageURL} alt="Selected" style={{ width: '100%', height: 'auto' }} />
                    </Form.Group>

                    <Form.Group controlId="taskProperty" className='AddTaskstyle'>
                        <Form.Select
                            value={selectedProperty}
                            onChange={(e) => setSelectedProperty(e.target.value)}
                        >
                            <option value="">Select Task Property</option>
                            {taskProperties.map(property => (
                                <option key={property} value={property}>
                                    {property}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="dueDate" className='AddTaskstyle'>
                        <DatePicker
                            selected={dueDate}
                            dateFormat="dd MMMM"
                            onChange={date => setDueDate(date)}
                            className="form-control"
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
