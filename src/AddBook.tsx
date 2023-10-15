import { Setter, JSX, createSignal } from "solid-js";
import { Book } from "./App";

export interface AddBookProps {
  setBooks: Setter<Book[]>;
}

const emptyBook: Book = { title: "", author: "" };

export function AddBook(props: AddBookProps) {
  const [newBook, setNewBook] = createSignal(emptyBook);
  const addBook: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (event) => {
    event.preventDefault();
    props.setBooks((books) => [...books, newBook()]);
    setNewBook(emptyBook);
  };

  return (
    <form>
      <div>
        <label for="title">Book name</label>
        <input
          id="title"
          value={newBook().title}
          onInput={(event) => {
            setNewBook({ ...newBook(), title: event.currentTarget.value });
          }}
        />
      </div>
      <div>
        <label for="author">Author</label>
        <input
          id="author"
          value={newBook().author}
          onInput={(event) => {
            setNewBook({ ...newBook(), author: event.currentTarget.value });
          }}
        />
      </div>
      <button type="submit" onClick={addBook}>Add book</button>
    </form>
  );
}
