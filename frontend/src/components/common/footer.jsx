import { BiLogoGmail } from "react-icons/bi";
import { BiLogoTelegram } from "react-icons/bi";
import { BiLogoFacebook } from "react-icons/bi";
import { useNavigate, Link } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-16 bg-gray-800 text-white py-4 lg:py-8 lg:px-24">
      <div className="container mx-auto grid grid-cols-1 place-items-center gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:place-items-start">
        <div className="flex flex-col w-60 ">
          <h4 className=" mb-4">BOOKSTORE</h4>
          <p>
            Engage in lively literary discussions in our vibrant forum,
            connecting with fellow book enthusiasts and expanding your reading
            horizons.
          </p>
        </div>
        <div className="flex flex-col leading-7 font-serif font-normal lg:border-l lg:border-slate-600 lg:pl-8">
          <h4 className="mb-4"> PAGES</h4>
          <ul className="flex flex-col">
            <li>
              <a href="#" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Help
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact us
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col leading-7 font-serif font-normal lg:border-l lg:border-slate-600 lg:pl-8">
          <h4 className="mb-4">OUR COMPANY</h4>
          <ul className="flex flex-col">
            <li>
              <Link
                to="/aboutUs"
                className="hover:underline hover:cursor-pointer"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link to="/search?" className="hover:underline">
                Books
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:underline">
                Categories
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col lg:pl-8 lg:border-l lg:border-slate-600">
          <h4 className="mb-4">STAY CONNECTED</h4>
          <ul className="flex gap-4 text-l text-black">
            <li className="bg-slate-200 overflow-hidden rounded-full p-4 transition duration-300 ease-in-out hover:bg-gray-900 hover:text-slate-200">
              <BiLogoGmail />
            </li>
            <li className="bg-slate-200 overflow-hidden rounded-full p-4 transition duration-300 ease-in-out hover:bg-gray-900 hover:text-slate-200">
              <BiLogoTelegram />
            </li>
            <li className="bg-slate-200 overflow-hidden rounded-full p-4 transition duration-300 ease-in-out hover:bg-gray-900 hover:text-slate-200">
              <BiLogoFacebook />
            </li>
          </ul>
        </div>
      </div>
      <p className="text-sm text-center mt-8">&copy; 2023 HayuBk</p>
    </div>
  );
};

export default Footer;
