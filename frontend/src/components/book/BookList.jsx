import { Books } from "../../shared/books";

export function formatViews(views) {
  if (views >= 1000000000) {
    return (views / 1000000000).toFixed(1) + "B";
  }
  if (views >= 1000000) {
    return (views / 1000000).toFixed(1) + "M";
  } else if (views >= 1000) {
    return (views / 1000).toFixed(1) + "K";
  } else {
    return views.toString();
  }
}
export function BookList({ books }) {
  return (
    <>
      <h1>List view</h1>
      <div className="grid grid-cols-1 m-auto md:grid-cols-2 gap-3 lg:w-5/6 sm:w-full">
        {books?.length > 0 &&
          books.map((book) => (
            <Books key={book._id} book={book} isGrid={false} />
          ))}
      </div>
    </>
  );
}
