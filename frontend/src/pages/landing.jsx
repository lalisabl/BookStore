import { useState } from "react";
import { BookCategory, FeaturedBooks } from "../components/book/bookCategory";
import { NavBarLanding } from "../components/common/navBar";
import { HomeBanner } from "../components/user/user-home";
import UserNav from "../components/user/userNav";
import Footer from "../components/common/footer";
import { Login, Register } from "../components/user/login-registration";
import GenericModal from "../shared/GenericModal";
export function LandingPage({ SetLogin }) {
  return (
    <>
      <UserNav />
      <div className="mt-14 landing-pg">
        <HomeBanner />
      </div>

      <div className="items-center gap-20 flex flex-col flex-grow p-0  bg-white overflow-hidden ">
        <BookCategory />
        <LandingBanner1 />
        <FeaturedBooks />
      </div>
      <Footer />
    </>
  );
}

function LandingBanner1() {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  const handleSignInClick = (param) => {
    if (param) {
      setShowLoginPopup(true);
    } else {
      setShowLoginPopup(false);
      setShowRegisterPopup(true);
    }
  };

  const handleSignUpClick = (param) => {
    if (param) {
      setShowRegisterPopup(true);
    } else {
      setShowRegisterPopup(false);
      setShowLoginPopup(true);
    }
  };
  return (
    <>
      <div
        className="relative pt-4 w-full lg:h-96 max-h-max   overflow-hidden bg-cover bg-center items-center"
        style={{
          backgroundImage: 'url("/images/servicebg3.jpg")',
        }}
      >
        <div className="absolute top-0 bottom-0 inset-0 bg-primary opacity-40"></div>
        <div className="flex flex-col gap-2  w-full h-full  relative">
          <div className="ml-4 lg:ml-24 text-gray-100 text-4xl sm:text-7xl font-semibold ">
            Dive into a World of Stories at Tome Readers!
          </div>

          <div className="flex m-auto gap-10 flex-wrap sm:flex-nowrap justify-around w-5/6">
            <div className="bg-gray-500 w-full  p-10 rounded-lg bg-opacity-40  flex-n text-lg  text-white hover:bg-opacity-70">
              <div>Join today for free</div>
              <button
                onClick={() => handleSignUpClick(true)}
                className="m-1 btn-primary-white rounded-lg p-2"
              >
                Register for free
              </button>
            </div>
            <div className="bg-gray-500 w-full  p-10 rounded-lg bg-opacity-40  flex-n text-lg  text-white hover:bg-opacity-70">
              <div>Start reading as a guest</div>
              <button className="m-1 btn-primary-white rounded-lg p-2">
                Continue as a guest
              </button>
            </div>
            <div className="bg-gray-500 w-full  p-10 rounded-lg bg-opacity-40  flex-n text-lg  text-white hover:bg-opacity-70">
              <div>You have account already</div>
              <button
                onClick={() => handleSignInClick(true)}
                className="m-1 btn-primary rounded-lg p-2"
              >
                login now
              </button>
            </div>
          </div>
        </div>
      </div>
      {showLoginPopup && (
        <>
          <GenericModal
            isOpen={showLoginPopup}
            onClose={() => setShowLoginPopup(false)}
          >
            <Login
              success={() => {
                setShowLoginPopup(false);
              }}
              HandleRegister={() => handleSignInClick(false)}
            />
          </GenericModal>
        </>
      )}
      {showRegisterPopup && (
        <>
          <GenericModal
            isOpen={showRegisterPopup}
            onClose={() => setShowRegisterPopup(false)}
          >
            <Register
              success={() => {
                setShowRegisterPopup(false);
              }}
              HandleLogin={() => handleSignUpClick(false)}
            />
          </GenericModal>
        </>
      )}
    </>
  );
}
