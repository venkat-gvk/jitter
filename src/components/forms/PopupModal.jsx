const PopupModal = (props) => {
  const { error, setError } = props;

  const val = error === "follow the instructions sent to your mail";

  return (
    <div className="error-modal">
      <p className={`flex-[80%] text-center ${val && "text-blue-600"}`}>
        {error}
      </p>
      <button
        className={`error-modal-close-btn ${
          val && "text-blue-600 hover:text-blue-800"
        }`}
        onClick={() => setError("")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default PopupModal;
