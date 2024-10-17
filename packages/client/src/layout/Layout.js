const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen w-full bg-purple-300">
      <div className="flex flex-1">
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-blue-300 p-4 w-full max-w-4xl h-full max-h-[calc(100vh-5rem)] overflow-auto rounded-3xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
