import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../layout/AdminSidebar";
import AdminNavbar from "../layout/AdminNavbar";

function AdminRoutes() {
  const [open, setOpen] = useState<boolean>(true);
  useEffect(() => {
    document.body.style.backgroundColor = "#09090B";

    return () => {
      document.body.style.backgroundColor = "transparent";
    };
  }, []);
  return (
    <main className="grid min-h-screen md:grid-cols-[auto_1fr] text-white/90">
      <AdminSidebar open={open} setOpen={setOpen} />
      <section
        className="grid grid-rows-[auto_1fr] 
      [&_.Border]:border-2 [&_.Border]:border-white/10 [&_.Border]:rounded-md
      [&_h3]:font-bold [&_h3]:text-[23px]
      [&_h4]:text-white/60 [&_h4]:text-sm
      "
      >
        <AdminNavbar setOpen={setOpen}/>
        <nav className="h-full w-full p-4">
          <Outlet />
        </nav>
      </section>
    </main>
  );
}

export default AdminRoutes;
