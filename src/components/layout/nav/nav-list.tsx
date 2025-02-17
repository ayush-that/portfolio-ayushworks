import { Dispatch, SetStateAction } from "react";
import { navData } from "./_nav-mock";
import NavItem from "./nav-item";

interface NavProps {
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

const NavList: React.FC<NavProps> = ({ setOpen }) => {
  return (
    <ul
      role="list"
      className="mt-6 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center sm:gap-6"
    >
      {navData.map((nav) => (
        <NavItem key={nav.id} setOpen={setOpen} {...nav} />
      ))}
    </ul>
  );
};

export default NavList;
