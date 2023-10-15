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
      <form class="flex items-center gap-2">
        <div class="relative flex-1">
          <label for="title" class="sr-only">Book title: </label>
          <input
            id="title"
            class="px-4 py-2 border border-solid-lightitem rounded-lg bg-transparent w-full flex-1"
            value={input()}
            onInput={(event) => {
              setInput(event.currentTarget.value);
            }}
          />
          <div class="absolute right-0 top-0 bottom-0 grid place-content-center px-2"><svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20" width="1.2em" height="1.2em" class="w-6 h-6 dark:text-solid-darkaction"><path fill="currentColor" fill-rule="evenodd" d="M8 4a4 4 0 1 0 0 8a4 4 0 0 0 0-8ZM2 8a6 6 0 1 1 10.89 3.476l4.817 4.817a1 1 0 0 1-1.414 1.414l-4.816-4.816A6 6 0 0 1 2 8Z" clip-rule="evenodd"></path></svg></div>
        </div>
        <button
          type="submit"
          class="bg-stone-600 hover:bg-stone-600/90 rounded p-2 font-semibold text-white flex items-center justify-center"
          onClick={(event) => {
            event.preventDefault();
            setQuery(input());
          }}
        >
          Search
        </button>
      </form>

      <Show when={!data.loading} fallback={<p class="py-2">Searching...</p>}>
        <ul class="list-disc ml-4 my-2">
          <For each={data()}>
            {(book) => (
              <li class="mb-1">
                {book.title} by {book.author}{" "}
                <button
                  class="p-1 pb-0 text-black border rounded-md border-black"
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
