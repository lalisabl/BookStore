import "./App.css";
import { Login, Register } from "./components/user/login-registration";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GenericModal from "./shared/GenericModal";
import { useState } from "react";
function Pages() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" />
        </Routes>
      </BrowserRouter>
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
      <TryMod />
    </div>
  );
}

export default App;
