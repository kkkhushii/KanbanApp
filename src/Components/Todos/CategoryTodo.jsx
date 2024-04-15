import { useState } from 'react'
import { Dropdown } from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TaskCoponent from '../Todos/TaskCoponent'
import EditCategoryModal from '../Todos/TaskModal/EditCategoryModal'
import AddNewTaskModal from '../Todos/TaskModal/AddNewTaskModal'

function CategoryTodo({ title, tasks, onDeleteCategory, id }) {
    const [allTasks, setAllTasks] = useState(tasks);
    const [showModal, setShowModal] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState(title);
    const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
    const [showContainer, setShowContainer] = useState(true);


    // this is for add task in category modal
    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    // this is for edit modal 
    const handleShowEditCategoryModal = () => setShowEditCategoryModal(true);
    const handleCloseEditCategoryModal = () => setShowEditCategoryModal(false);


    const handleSaveTask = (newTaskText) => {
        setAllTasks([...allTasks, newTaskText]);
        handleCloseModal();
    };
    const handleClearAll = () => {
        setAllTasks([]);
    }

    const handleDeleteTask = (taskId) => {
        const updatedTasks = allTasks.filter(task => task.id !== taskId);
        setAllTasks(updatedTasks);
    };
    const handleUpdateCategory = () => {
        handleCloseEditCategoryModal();
    };

    const handleDeleteClick = () => {
        setShowContainer(false);
        onDeleteCategory(id);
    };

    const backgroundColor = title === 'Todo' ? '#eff4fa' :
        title === 'Progress' ? 'rgba(20, 233, 226, 0.2)' :
            title === 'Pending' ? 'rgba(70, 202, 235, 0.2)' :
                title === 'Done' ? '#36c76c2e' : '#dfe5ef';


    return (
        <div className='task-list-container'>
            {showContainer && title && (
                <div className='connect-sorting connect-sorting-todo' style={{ backgroundColor }}>

                    <div className='task-container-header'>
                        <h6 className='fw-semibold'>{newCategoryName}</h6>

                        <div className="hstack gap-2">
                            <div className='add-kanban-title'>
                                {title === 'Todo' ? (<AddIcon onClick={handleShowModal} />) : ('')}

                                <AddNewTaskModal show={showModal} onHide={handleCloseModal} onSave={handleSaveTask} />
                                <EditCategoryModal
                                    showModal={showEditCategoryModal}
                                    handleCloseModal={handleCloseEditCategoryModal}
                                    newCategoryName={newCategoryName}
                                    setNewCategoryName={setNewCategoryName}
                                    handleUpdateCategory={handleUpdateCategory}
                                />
                            </div>

                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic" className="custom-toggle" variant="none">
                                    <MoreVertIcon className='icon' />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={handleShowEditCategoryModal}>Edit</Dropdown.Item>
                                    <Dropdown.Item onClick={handleDeleteClick}>Delete</Dropdown.Item>
                                    <Dropdown.Item onClick={handleClearAll}>Clear All</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>

                    <div className='connect-sorting-content'>
                        {allTasks.map(task => (
                            <TaskCoponent key={task.id} task={task} onDeleteTask={handleDeleteTask} />
                        ))}
                    </div>

                </div >
            )}
        </div>
    )
}

export default CategoryTodo
