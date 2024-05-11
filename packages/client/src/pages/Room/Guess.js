import { GuessResult } from "../../redux/gameSlice";

const Guess = ({ word, valid }) => {
  return (
    <div>
      {word && (
        <div
          className={`mt-4 p-2 ${
            valid === GuessResult.PENDING
              ? "bg-orange-200"
              : valid === GuessResult.VALID
              ? "bg-lime-200"
              : "bg-red-200"
          } flex border-gray-300 border-2 gap-2 border rounded-md`}
        >
          {word.split("").map((letter, index) => (
            <div
              key={index}
              className={`flex items-center justify-center bg-white border border-gray-400 rounded-lg`}
            >
              <div className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-md select-none">
                {letter}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Guess;
