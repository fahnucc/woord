import Header from "../components/Header";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen w-full bg-purple-300">
      <Header />
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="bg-blue-300 p-4 w-full max-w-4xl h-full max-h-[calc(100vh-5rem)] overflow-auto rounded-3xl flex flex-col items-center gap-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
