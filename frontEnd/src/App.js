import "./App.css";
import { Login, Register } from "./components/user/login-registration";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GenericModal from "./shared/GenericModal";
import { useState, useEffect } from "react";
import NavBar from "./components/common/navBar";
import { BookGrid } from "./components/book/BookGrid";
import { BookList } from "./components/book/BookList";
import { BookCategory } from "./components/book/bookCategory";
import { BooksSample, apiurl } from "./assets/constData";
import { Search } from "./components/book/Search";
import { LandingPage } from "./pages/landing";
import BookForm from "./components/book/bookForm";
import Account from "./pages/account";
import { AccountSideBar } from "./components/user/side-bar";
import ProfileDetail from "./components/user/profileDetail";
import ReadingHistory from "./components/user/readingHistory";
import MyContributions from "./components/user/myContributions";
import { UserPage } from "./pages/UserPage";
import UserHome from "./components/user/user-home";
import axios from "axios";
function Pages() {
  const [login, setLogin] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get(`${apiurl}/users/me`, { withCredentials: true });
        setLogin(true);
      } catch (error) {
        setLogin(false);
        console.log(error.response ? error.response.data : error.message);
      }
    };

    fetchData();
  }, []);
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
            <Route path="/" element={<LandingPage />} />
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

function TryMod() {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);

  return (
    <>
      <GenericModal
        isOpen={showLoginPopup}
        onClose={() => setShowLoginPopup(false)}
        children={<Register />}
      />
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
