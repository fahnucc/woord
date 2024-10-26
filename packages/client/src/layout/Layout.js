import Header from "../components/Header";
import Logo from "../components/Logo";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen w-full bg-purple-300">
      <Header />
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="bg-blue-300 p-4 w-full max-w-4xl h-full max-h-[calc(100vh-5rem)] overflow-auto rounded-3xl flex flex-col items-center gap-4">
          <div className="flex flex-col gap-4 items-center w-full">
            <Logo className="text-purple-300 w-72" />
            the #1 word search game
            <hr className="border-t-4 border-purple-300 w-full" />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
