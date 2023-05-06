import BookShow from './BookShow'
import useBookContext from '../hooks/useBookContext';

export default function BookList(){
    // WE NO LONGER NEED TO DO THAT
    // passes down the onDelete and onEdit to be used in BookShow

    // this is the 3rd step to use context. We say that we will use the bookContext in this component
    // as a variable called value (we pass the BookContext object to the value variable)
        // const value = useContext(BookContext)

    // we take only the books from BookContext
    const {books} = useBookContext()

    //maps the books that has been sent and creates a BookShow component for each one of them
    // ALSO passes down the book itself to to be used for its title and id
    return(
        <div className='book-list'>
            {books.map((book) => (
                <BookShow book={book} key={book.id} />
            ))}
        </div>
    );
}