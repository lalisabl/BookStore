export const apiurl = "http://localhost:5000/api/v1";
export const host = "http://localhost:5000";

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
