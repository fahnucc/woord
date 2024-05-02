import Navbar from "./Navbar";
import Aside from "./Aside";

const Layout = ({ children, asideChildren }) => {
  return (
    <div className="grid grid-cols-12 w-full h-screen gap-4 bg-purple-300 px-4">
      <Navbar />
      <div
        id="content"
        className="col-span-8 p-4 bg-blue-300 h-[calc(100vh-5rem)]"
      >
        {children}
      </div>
      <Aside>{asideChildren}</Aside>
    </div>
  );
};

export default Layout;
