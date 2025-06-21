import { useEffect, useRef, useState } from "react";
import { BsCreditCard } from "react-icons/bs";
import { LuPanelLeftClose } from "react-icons/lu";
import {
  MdAdminPanelSettings,
  MdCurrencyExchange,
  MdDashboard,
  MdGroup,
} from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";

function AdminNavbar({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [navs, setNavs] = useState<boolean>();
  const { pathname } = useLocation();
  const ref = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    let handle = (e: any) => {
      if (!ref.current?.contains(e.target)) {
        setNavs(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => {
      document.removeEventListener("mousedown", handle);
    };
  });

  useEffect(() => {
    setNavs(false);
  }, [pathname]);
  return (
    <header className="h-16 border-b-2 sticky  z-40 top-0 border-white/10 border-opacity-40 w-full  bg-[#09090B]">
      <article className="flex justify-between items-center h-full  mx-auto w-11/12">
        <button
          onClick={() => setOpen((open) => !open)}
          className="Button w-8 h-8 rounded-full md:hidden rotate-180 grid place-content-center"
        >
          <LuPanelLeftClose />
        </button>

        <aside className="flex gap-2 items-center md:text-2xl text-lg text-white font-bold tracking-wide">
          <BsCreditCard className="text-white " /> TramCreditAlgeria
        </aside>

        <aside ref={ref} className="relative">
          <div
            onClick={() => setNavs(true)}
            className="text-sec text-3xl w-10 h-10 grid place-content-center rounded-full  hover:bg-black/10 cursor-pointer"
          >
            <MdAdminPanelSettings className="" />
          </div>

          <div
            className={`grid absolute right-0  overflow-hidden z-40 transition-all duration-500 ${
              navs ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className=" bg-[#09090B] border-2 border-white/15 rounded-md !p-2 overflow-hidden w-52  space-y-0.5">
              <NavLink
                to={"/admin"}
                className={`flex w-full py-1 hover:bg-white/10 gap-3 rounded-md px-2 items-center ${
                  pathname === "/admin" && "bg-white/15"
                }`}
              >
                <MdDashboard />
                Dashboard
              </NavLink>

              {[
                {
                  to: "/admin/users",
                  icon: <MdGroup />,
                  title: "User Management",
                },

                {
                  to: "/admin/transactions",
                  icon: <MdCurrencyExchange />,
                  title: "All transactions",
                },
              ].map(({ to, icon, title }) => (
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `flex w-full py-1 hover:bg-white/10 gap-3 rounded-md px-2 items-center ${
                      isActive && "bg-white/15"
                    }`
                  }
                >
                  {icon}
                  {title}
                </NavLink>
              ))}
            </div>
          </div>
        </aside>
      </article>
    </header>
  );
}

export default AdminNavbar;
