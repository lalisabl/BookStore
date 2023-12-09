import "./App.css";
import { Login, Register } from "./components/user/login-registration";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GenericModal from "./shared/GenericModal";
import { useState } from "react";
import NavBar from "./components/common/navBar";
import { BookGrid } from "./components/book/BookGrid";
import { BookList } from "./components/book/BookList";
function BookStoreRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/register" element={<Register />} />
          <Route
            exact
            path="/api/v1/users/auth/google/callback"
            element={<TryMod />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

function TryMod() {
  const [open, setOpen] = useState(true);

  return (
    <>
      {/* <GenericModal
        isOpen={open}
        onClose={() => setOpen(false)}
        children={<Register />}
      /> */}
      <h3>Hello Home</h3>
    </>
  );
}

function App() {
  return (
    <div>
      {/* <NavBar where={"landing"} />
    //   <BookGrid />
    //   <BookList /> */}
      <Register />
    </div>
    // <BookStoreRoutes />
  );
}

export default App;
