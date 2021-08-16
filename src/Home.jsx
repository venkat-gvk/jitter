import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();

  return (
    <div className=" min-h-screen flex flex-col justify-center items-center space-y-6">
      <div className="text-[#ff9d1e] text-center space-y-4">
        <p className="text-5xl">Welcome to Jitter</p>
        <p className="text-3xl text-white">A fun way to Chat</p>
      </div>

      <div className="home-btn-container">
        <button className="submit" onClick={() => history.push("/login")}>
          Login
        </button>

        <button
          className="home-sign-up"
          onClick={() => history.push("/signup")}>
          Sign up
        </button>
      </div>
    </div>
  );
};

export default Home;
