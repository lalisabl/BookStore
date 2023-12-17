export const apiurl = "http://localhost:5000/api/v1";
export const BooksSample = {
  books: [
    {
      id: 1,
      title: "The Catcher in the Rye longer text",
      thumbnail: "/images/the catcher.jpeg",
      rate: 4.5,
      uploader: {
        id: "user123",
        username: "john doe",
        image: "/images/placeholder.jpg",
        followBtn: true,
      },
      numberOfViews: 1279090090,
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      thumbnail: "/images/to_kill_a_mockingbird_cover-t34.jpg",
      rate: 4.8,
      uploader: {
        id: "user456",
        image: "/images/placeholder.jpg",
        username: "john doe",
        followBtn: false,
      },
      numberOfViews: 980,
    },
    {
      id: 3,
      title: "1984",
      thumbnail: "/images/1984.jpg",
      rate: 4.7,
      uploader: {
        id: "user789",
        image: "/images/placeholder.jpg",
        username: "john doe",
        followBtn: true,
      },
      numberOfViews: 1500,
    },
    {
      id: 4,
      title: "The Catcher in the Rye",
      thumbnail: "/images/the catcher.jpeg",
      rate: 4.5,
      uploader: {
        id: "user123",
        image: "/images/placeholder.jpg",
        username: "john doe",
        followBtn: true,
      },
      numberOfViews: 1200,
    },
  ],
};

export const enumCategories = [
  "Fiction",
  "Non-Fiction",
  "Poetry",
  "Drama",
  "Children's Books",
  "Religion/Spirituality",
  "Science Fiction/Fantasy",
  "Mystery/Thriller",
  "Romance",
  "History",
  "Reference",
  "Humor/Satire",
  "Graphic Novels/Comics",
  "Science",
  "Travel",
  "Art/Photography",
  "Education",
  "Politics/Social Sciences",
  "Sports",
  "Philosophy",
];

export const enumCategoriesOptions = enumCategories.map((category, index) => ({
  value: category,
  label: category,
}));
