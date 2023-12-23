import { Books } from "../../shared/books";
export function BookGrid({ books }) {
  return (
    <>
      <h1>grid view</h1>
      <div className="gap-3 grid sm:grid-cols-3 lg:grid-cols-8  md:grid-cols-5 grid-cols-2 mb-10">
        {books?.map((book) => (
          <Books key={book._id} book={book} isGrid={true} />
        ))}
      </div>
    </>
  );
}
