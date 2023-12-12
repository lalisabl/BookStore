import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { Search } from "./components/book/Search";
import { LandingPage } from "./pages/landing";
import BookForm from "./components/book/bookForm";
import Account from "./pages/account";
import ProfileDetail from "./components/user/profileDetail";
import ReadingHistory from "./components/user/readingHistory";
import MyContributions from "./components/user/myContributions";
import { UserPage } from "./pages/UserPage";
import UserHome from "./components/user/user-home";
function Pages() {
  const [login, setLogin] = useState(false);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/account/profile"
            element={<Account path={<ProfileDetail />} />}
          />
          <Route
            path="/read-history"
            element={<Account path={<ReadingHistory />} />}
          />
          <Route
            path="/my-contributions"
            element={<Account path={<MyContributions />} />}
          />
          {login ? (
            <>
              {" "}
              <Route path="/" element={<UserPage path={<UserHome />} />} />
              <Route
                path="/Upload-book"
                element={<UserPage path={<BookForm />} />}
              />
              <Route
                path="/My-books"
                element={<UserPage path={<BookForm />} />}
              />
              <Route
                path="/My-favorites"
                element={<UserPage path={<BookForm />} />}
              />
            </>
          ) : (
            <Route path="/" element={<LandingPage SetLogin={setLogin} />} />
          )}
          <Route path="search/" element={<Search />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

function NotFound() {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <>
      <p>Page not found. Please return back.</p>
      <button onClick={handleGoBack}>Go Back</button>
    </>
  );
}

function App() {
  return (
    <div>
      <Pages />
    </div>
  );
}

export default App;
