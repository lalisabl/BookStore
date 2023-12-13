import "./App.css";
import { Register } from "./components/user/login-registration";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GenericModal, { GenericLittleLoadingModal } from "./shared/GenericModal";
import { useState, useEffect } from "react";
import { Search } from "./components/book/Search";
import { LandingPage } from "./pages/landing";
import BookForm from "./components/book/bookForm";
import Account from "./pages/account";
import ProfileDetail from "./components/user/profileDetail";
import ReadingHistory from "./components/user/readingHistory";
import MyContributions from "./components/user/myContributions";
import { UserPage } from "./pages/UserPage";
import UserHome from "./components/user/user-home";
import axios from "axios";
import { apiurl } from "./assets/constData";
import { NotFound } from "./pages/NotFoundPage";
function Pages() {
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get(`${apiurl}/users/me`, { withCredentials: true });
        setLoading(true);
        setLogin(true);
      } catch (error) {
        setLoading(true);
        setLogin(false);
        console.log(error.response ? error.response.data : error.message);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      {!loading ? (
        <GenericLittleLoadingModal isOpen={!loading} />
      ) : (
        <BrowserRouter>
          <Routes>


            {login ? (
              <>
                
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
                <Route
                  path="/"
                  element={
                    <UserPage
                      SetLogin={() => setLogin(true)}
                      path={<UserHome />}
                    />
                  }
                />
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
      )}
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
