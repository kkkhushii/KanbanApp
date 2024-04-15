import { useState } from 'react'
import CategoryTodo from '../Todos/CategoryTodo'
import TodoData from '../../Data/TodoData'
import '../Todos/TodoStyle.css'
import Header from '../Header/Header'

function MainTodo() {
  const [categories, setCategories] = useState([]);

  // add new list
  const handleAddCategory = (categoryName) => {
    const newCategory = {
      title: categoryName,
      tasks: []
    };
    setCategories(prevCategories => [...prevCategories, newCategory]);
    console.log(newCategory);

  };

  // delete list
  const handleDeleteCategory = (categoryId) => {
    setCategories(prevCategories => prevCategories.filter(category => category.id !== categoryId));
  };

  return (
    <>
      <Header onAddCategory={handleAddCategory} />

      <div className='category-container'>

        <>
          {TodoData.map(category => (
            <CategoryTodo
              key={category.id}
              title={category.name}
              tasks={category.child}
              id={category.id}
              onDeleteCategory={handleDeleteCategory}
            />
          ))}

          {categories.map(category => (
            <CategoryTodo
              key={category.title}
              title={category.title}
              tasks={category.tasks}
              onDeleteCategory={handleDeleteCategory}
            />
          ))}
        </>
      </div>

    </>
  )
}

export default MainTodo
