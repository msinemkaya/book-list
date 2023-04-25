import BookShow from './BookShow'

export default function BookList({books, onDelete, onEdit}){
    // passes down the onDelete and onEdit to be used in BookShow

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