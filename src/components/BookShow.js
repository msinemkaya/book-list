import { useState } from 'react';
import BookEdit from './BookEdit';

export default function BookShow({ book, onDelete, onEdit }) {
  const [showEdit, setShowEdit] = useState(false);

  // if clicked to edit button it sets the visibility of the BookEdit component either to true or false
  const handleEditClick = () => {
    setShowEdit(!showEdit);
  };

  // if clicked to delete button calls the passed down deleteBookById and gives the books id to it as a parameter to use
  const handleDeleteClick = () => {
    onDelete(book.id);
  };

  const handleSubmit = (id, newTitle) => {
    // insted of sending them seperately we created one event handler and call them both in
    // here and sent it together as a whole

    onEdit(id, newTitle);
    setShowEdit(false);
  };

  // content is by default books title
  let content = <h3>{book.title}</h3>;

  // but if showEdit is true then content becomes the BookEdit component
  if (showEdit)
    // not to send 2 props when we submit we no longer need to send something like onEdit
    // because when submit we want to both set setShowEdit to false and send the onEdit function at the same time
    // content = <BookEdit book={book} onEdit={onEdit}/>

    // we continue to pass down the onEdit with handleSubmit and also when submited 
    // to close the form we set the showEdit to false 
    content = <BookEdit book={book} onSubmit={handleSubmit}/>;

  return (
    <>
      <div className='book-show'>
        <img src={`https://picsum.photos/seed/${book.id}/300/200`} alt="" />
        
        <div className=''>{content}</div>

        <div className='actions'>
          <button className='edit' onClick={handleEditClick}>
            Edit
          </button>
          <button className='delete' onClick={handleDeleteClick}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
