import gandalf from "./gandalf.jpg";

const YouShallNotPass = () => {
  return (
    <div className="min-h-screen flex flex-col justify-evenly items-center text-xl text-white">
      <img
        src={gandalf}
        alt=""
        className="object-contain w-10/12 h-full sm:w-7/12 sm:h-3/6"
      />
      <p className="text-2xl tracking-wide">YOU SHALL NOT PASS...</p>
    </div>
  );
};

export default YouShallNotPass;
