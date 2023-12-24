import { TfiEmail } from "react-icons/tfi";
import { BiLogoTelegram } from "react-icons/bi";
import { BiLogoFacebookCircle } from "react-icons/bi";

const Footer = () => {
  return (
    <div className=" bg-gray-800 text-white py-8 px-24">
      <div className="container mx-auto grid grid-cols-4">
        <div className="flex flex-col w-60 border-r border-slate-600 ">
          <h4 className=" mb-4">BOOKSTORE</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga quos
            recusandae amet corporis qui.
          </p>
        </div>
        <div className="flex flex-col leading-7 font-serif font-normal border-r border-slate-600">
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
        <div className="flex flex-col leading-7 font-serif font-normal border-r border-slate-600 pl-8">
          <h4 className="mb-4">OUR COMPANY</h4>
          <ul className="flex flex-col">
            <li>
              <a href="#" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Books
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Categories
              </a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col pl-8">
          <h4 className="mb-4">STAY CONNECTED</h4>
          <ul className="flex gap-4 text-lg">
            <li>
              <TfiEmail />
            </li>
            <li>
              <BiLogoTelegram />
            </li>
            <li>
              <BiLogoFacebookCircle />
            </li>
          </ul>
        </div>
      </div>
      <p className="text-sm text-center mt-8">&copy; 2023 PentaCog</p>
    </div>
  );
};

export default Footer;
