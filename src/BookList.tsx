import { For } from "solid-js";
import { Book } from "./App";

interface BookListProps {
  books: Book[];
}

export function BookList(props: BookListProps) {
  const totalBooks = () => props.books.length;
  return (
    <>
      <h2 class="font-semibold flex items-center gap-2">
        My books <span class="rounded-full pt-1 min-w-6 w-6 h-6 border border-solid-lightitem dark:border-solid-darkitem grid place-content-center bg-solid-light dark:bg-white text-solid-accent font-bold">{totalBooks()}</span>
      </h2>
      <ul class="list-disc pl-4 mt-2">
        <For each={props.books}>
          {(book) => {
            return (
              <li>
                {book.title}
                <span class="italic text-neutral-400"> ({book.author})</span>
              </li>
            );
          }}
        </For>
      </ul>
    </>
  );
}
