import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GenericLittleLoadingModal } from "./shared/GenericModal";
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
import BookDetail from "./components/book/BookDetail";
import { useDispatch } from "react-redux";
import { setLoginStatus, setSetIsMobile, setUserInfo } from "./redux/actions";
import PDFViewer from "./components/book/pdfViewer";
import DefaultPage from "./pages/defaultPg";
import ComingSoon from "./shared/ComingSoon";
import Favorites from "./components/user/favorites";
import AboutUs from "./pages/about";
import UserProfile from "./components/user/UserProfile";
function Pages() {
  const dispatch = useDispatch();
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${apiurl}/users/me`, {
          withCredentials: true,
        });
        setLoading(true);
        setLogin(true);
        dispatch(setLoginStatus(true));
        dispatch(setUserInfo(res.data.data.user));
      } catch (error) {
        setLoading(true);
        dispatch(setLoginStatus(false));
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
                  element={<UserPage path={<ComingSoon />} />}
                />
                <Route
                  path="/My-favorites"
                  element={<UserPage path={<Favorites />} />}
                />
                <Route
                  path="/books/:id"
                  element={<UserPage path={<BookDetail />} />}
                />
                <Route
                  path="/books/:id/read"
                  element={<UserPage path={<PDFViewer />} />}
                />

                <Route
                  path="search/"
                  element={<UserPage path={<Search />} />}
                />
              </>
            ) : (
              <Route path="/" element={<LandingPage SetLogin={setLogin} />} />
            )}
            <Route
              path="/user/:username"
              element={<DefaultPage page={<UserProfile />} />}
            />
            <Route
              path="/aboutUs"
              element={<DefaultPage page={<AboutUs />} />}
            />

            <Route
              path="/books/:id"
              element={<DefaultPage page={<BookDetail />} />}
            />
            <Route
              path="/books/:id/forums"
              element={<DefaultPage page={<ComingSoon />} />}
            />
            <Route path="search/" element={<DefaultPage page={<Search />} />} />
            <Route
              path="/books/:id/read"
              element={<DefaultPage page={<PDFViewer />} />}
            />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

function App() {
  //set is mobile
  const dispatch = useDispatch();
  const handleResize = () => {
    dispatch(setSetIsMobile(window.innerWidth < 640));
  };
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="overflow-x-hidden overflow-y-scroll">
      <Pages />
    </div>
  );
}

export default App;
