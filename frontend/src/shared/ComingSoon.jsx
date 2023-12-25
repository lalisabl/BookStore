import { FaClock } from "react-icons/fa";

export default function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center  shadow border p-20 w-5/6 m-auto rounded-md">
      <div className="text-primary items-center flex text-6xl font-bold mb-8">
        <FaClock className="text-secondary text-6xl mr-4" />
        Coming Soon
      </div>
      <p className="text-primary text-lg">Stay tuned for exciting updates!</p>
    </div>
  );
}
