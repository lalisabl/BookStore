import "./App.css";
import { Login, Register } from "./components/user/login-registration";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GenericModal from "./shared/GenericModal";
import { useState } from "react";
import NavBar from "./components/common/navBar";
import { BookGrid } from "./components/book/BookGrid";
import { BookList } from "./components/book/BookList";
import { BookCategory } from "./components/book/bookCategory";
import { BooksSample } from "./assets/constData";
import { Search } from "./components/book/Search";
import { LandingPage } from "./pages/landing";
import BookForm from "./components/book/bookForm";
import Account from "./pages/account";
function Pages() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route exact path="/" element={<FeedPage fed={<Feed />} />} /> */}

          <Route path="/" element={<LandingPage />} />
          <Route path="/:user" element={<Account />} />
          <Route path="search/" element={<Search />} />
          <Route path="/Upload-book" element={<BookForm />} />
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
  const [open, setOpen] = useState(true);

  return (
    <>
      <GenericModal
        isOpen={open}
        onClose={() => setOpen(false)}
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
