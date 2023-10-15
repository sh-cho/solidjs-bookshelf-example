import { Show, createSignal } from "solid-js";
import { BookList } from "./BookList";
import { AddBook } from "./AddBook";

export type Book = {
  title: string;
  author: string;
};

const initialBooks: Book[] = [
  { title: "Code Complete", author: "Steve McConnell" },
  { title: "The Hobbit", author: "J.R.R. Tolkien" },
  { title: "Living a Feminist Life", author: "Sarah Ahmed" },
];

interface BookshelfProps {
  name: string;
}

function Bookshelf(props: BookshelfProps) {
  const [books, setBooks] = createSignal(initialBooks);
  const [showForm, setShowForm] = createSignal(false);

  const toggleForm = () => setShowForm(!showForm());

  return (
    <div class="border rounded-lg m-8">
      <div class="p-4">
        <h1 class="text-2xl font-semibold mb-4">{props.name}'s Bookshelf</h1>
        <BookList books={books()} />
      </div>
      <div class="border-t p-4">
        <Show
          when={showForm()}
          fallback={<button class="bg-stone-600 hover:bg-stone-600/90 rounded p-2 font-semibold text-white flex items-center justify-center" onClick={toggleForm}>Open</button>}
        >
          <AddBook setBooks={setBooks}/>
          <button
            class="bg-stone-600 hover:bg-stone-600/90 rounded p-2 font-semibold text-white flex items-center justify-center"
            onClick={toggleForm}
          >
            Hide
          </button>
        </Show>
      </div>
    </div>
  );
}

function App() {
  return (
    <Bookshelf name="Vince"/>
  );
}

export default App;
