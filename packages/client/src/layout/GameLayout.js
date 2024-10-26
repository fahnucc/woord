import Header from "../components/Header";

const GameLayout = ({ children, leftSidebar, rightSidebar }) => {
  return (
    <div className="flex flex-col h-screen w-full bg-purple-300">
      <Header />
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="flex w-full max-w-6xl h-full max-h-[calc(100vh-5rem)] overflow-hidden rounded-3xl">
          <div className="bg-blue-200 p-4 w-3/12 h-full overflow-auto rounded-l-3xl">
            {leftSidebar}
          </div>
          <div className="bg-blue-200 p-4 w-7/12 h-full overflow-auto flex flex-col items-center gap-4">
            {children}
          </div>
          <div className="bg-blue-200 p-4 w-2/12 h-full overflow-auto rounded-r-3xl">
            {rightSidebar}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameLayout;
