import { Setter, JSX, createSignal, createResource, Show, For } from "solid-js";
import { Book } from "./App";
import { searchBooks } from "./searchBooks";

export interface AddBookProps {
  setBooks: Setter<Book[]>;
}

export function AddBook(props: AddBookProps) {
  const [input, setInput] = createSignal("");
  const [query, setQuery] = createSignal("");

  const [data] = createResource<Book[], string>(query, searchBooks);

  return (
    <>
      <form>
        <div>
          <label for="title">Book title: </label>
          <input
            id="title"
            value={input()}
            onInput={(event) => {
              setInput(event.currentTarget.value);
            }}
          />
        </div>
        <button type="submit" onClick={(event) => {
          event.preventDefault();
          setQuery(input());
        }}>Search</button>
      </form>

      <Show when={!data.loading} fallback={<>Searching...</>}>
        <ul>
          <For each={data()}>
            {(book) => (
              <li>
                {book.title} by {book.author}{" "}
                <button
                  aria-label={`Add ${book.title} by ${book.author} to the bookshelf`}
                  onClick={(e) => {
                    e.preventDefault();
                    props.setBooks((books) => [...books, book]);
                  }}
                >
                  Add
                </button>
              </li>
            )}
          </For>
        </ul>
      </Show>
    </>
  );
}
