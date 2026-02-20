import MobileNav from "./mobile-nav";
import NavList from "./nav-list";

const Navbar = () => {
  return (
    <nav className="mb-6 mt-10 flex items-center justify-end gap-4 pt-4" role="navigation">
      <div className="hidden sm:block">
        <NavList />
      </div>

      <div className="block sm:hidden">
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
