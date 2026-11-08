import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-center px-6">

      <h1 className="text-5xl font-bold mb-6">
        Transform Speech Into Handwriting
      </h1>

      <p className="text-lg mb-10 max-w-xl">
        Convert your voice into realistic handwritten PDF instantly using AI.
      </p>

      <Link
        to="/convert"
        className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition"
      >
        Try It Now
      </Link>

    </div>
  );
}

export default Home;