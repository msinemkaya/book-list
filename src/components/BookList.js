import BookShow from './BookShow'
import { useContext } from 'react';
import { BookContext } from '../context/books';

export default function BookList({books, onDelete, onEdit}){
    // passes down the onDelete and onEdit to be used in BookShow

    // this is the 3rd step to use context. We say that we will use the bookContext in this component
    // as a variable called value (we pass the BookContext object to the value variable)
    const value = useContext(BookContext)

    //maps the books that has been sent and creates a BookShow component for each one of them
    // ALSO passes down the book itself to to be used for its title and id
    return(
        <div className='book-list'>
            {books.map((book) => (
                <BookShow book={book} key={book.id} onDelete={onDelete} onEdit={onEdit} />
            ))}
        </div>
    );
}