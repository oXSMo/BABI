import {
  MdBarChart,
  MdCurrencyExchange,
  MdDashboard,
  MdGroup,
} from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useScreenWidth } from "../../utils/hooks";

function AdminSidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const width = useScreenWidth();
  console.log({ width, open });

  return (
    <>
      <nav
        onClick={() => setOpen(false)}
        className={`h-screen md:sticky fixed left-0 z-50  top-0 w-56 bg-[#18181B]   duration-500 ${
          !open && width < 768 ? "-translate-x-full" : ""
        }`}
      >
        <header className="flex gap-2 my-2 p-2 text-2xl font-medium items-center">
          <MdBarChart className="text-4xl" /> Admin Panel
        </header>

        <aside className="mt-4 space-y-1 ">
          {[
            { icon: <MdDashboard />, text: "Dashboard", link: "/admin" },
            { icon: <MdGroup />, text: "User Managment", link: "/admin/users" },

            {
              icon: <MdCurrencyExchange />,
              text: "All Transactions",
              link: "/admin/transactions",
            },
          ].map((nav) => (
            <Nav {...nav} />
          ))}
        </aside>
      </nav>
      <aside
        onClick={() => setOpen(false)}
        className={`fixed w-full h-screen md:!hidden z-[45] bg-black/40 ${
          open ? "block" : "hidden"
        }`}
      />
    </>
  );
}

type TNav = {
  icon: React.ReactElement;
  text: string;
  link?: string;
  className?: string;
};

const Nav = ({ icon, text, link }: TNav) => {
  return (
    <NavLink
      to={`${link}`}
      end={link === "/admin"}
      className={({
        isActive,
      }) => `py-1.5 relative pl-2 flex items-center group  hover:bg-white/5  font-medium tracking-wide duration-200 text-white gap-2 
          
          ${isActive && "!text-white bg-white/10 pl-3 "}
          `}
    >
      <aside className="flex gap-2   items-center group-hover:translate-x-1 duration-200">
        {icon}
        {text}
      </aside>
    </NavLink>
  );
};

export default AdminSidebar;
