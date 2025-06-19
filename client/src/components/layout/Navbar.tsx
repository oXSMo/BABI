import { useEffect, useRef, useState } from "react";
import { BsCreditCard } from "react-icons/bs";
import {
  MdAdminPanelSettings,
  MdBadge,
  MdHistory,
  MdHome,
  MdPerson,
  MdQrCode2,
} from "react-icons/md";
import { profileSlice } from "../../store/signSlice";
import { NavLink, useLocation } from "react-router-dom";
import { LuBadgeDollarSign, LuScanSearch } from "react-icons/lu";

function Navbar() {
  const { profile } = profileSlice();
  const [open, setOpen] = useState<boolean>(false);
  const { pathname } = useLocation();
  const ref = useRef<null | HTMLDivElement>(null);
  
  useEffect(() => {
    let handle = (e: any) => {
      if (!ref.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => {
      document.removeEventListener("mousedown", handle);
    };
  });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  let navs = [
    { to: "/", icon: <MdHome />, title: "Home" },
    { to: "/transactionHistory", icon: <MdHistory />, title: "History" },
  ];

  if (profile?.role === "worker")
    navs = [
      ...navs,
      { to: "/worker", icon: <MdBadge />, title: "Worker" },
      {
        title: "Controle Client",
        icon: <LuScanSearch />,
        to: "/worker/contole",
      },
      { title: "Redeem Ticket", icon: <MdQrCode2 />, to: "/worker/redeem" },
      {
        title: "Add Sales",
        icon: <LuBadgeDollarSign />,
        to: "/worker/addsales",
      },
    ];

  if (profile.isAdmin)
    navs = [
      ...navs,
      { to: "/admin", icon: <MdAdminPanelSettings />, title: "Admin" },
    ];

  return (
    <header className="h-16 border-b-2 border-sec border-opacity-40 w-full ">
      <article className="flex justify-between items-center h-full max-w-7xl mx-auto w-11/12">
        <aside className="flex gap-2 items-center text-2xl text-textPri font-bold tracking-wide">
          <BsCreditCard className="text-sec " /> TramCreditAlgeria
        </aside>

        <aside className="relative">
          <div
            onClick={() => setOpen(true)}
            className="text-sec text-3xl w-10 h-10 grid place-content-center rounded-full  hover:bg-black/10 cursor-pointer"
          >
            <MdPerson className="" />
          </div>
          <div
            className={`grid absolute right-0  overflow-hidden z-40 transition-all duration-500 ${
              open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div
              ref={ref}
              className=" card !p-2 overflow-hidden w-44  space-y-0.5"
            >
              {navs.map(({ to, icon, title }) => (
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `flex w-full py-1 hover:bg-black/10 gap-3 rounded-md px-2 items-center ${
                      isActive && "bg-black/15"
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

export default Navbar;
