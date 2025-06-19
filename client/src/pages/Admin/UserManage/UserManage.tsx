import { MdPersonAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import UsersTable from "./UsersTable";

function UserManage() {
  return (
    <main className="h-full grid grid-rows-[auto_1fr] fadeIn">
      <aside className="flex justify-between mb-4">
        <h1 className="md:text-3xl text-xl font-bold   ">Users Management</h1>
        <Link
          to="/admin/users/createUser"
          className="button px-4 flex justify-center items-center gap-3 font-semibold  bg-white text-black py-2 rounded-md border border-white hover:bg-transparent hover:text-white duration-200"
        >
          <MdPersonAdd className="text-xl" /> Create User
        </Link>
      </aside>

      <article className="w-full Border p-4 min-h-full overflow-hidden">
        <h1 className="text-3xl font-bold">User List</h1>
        <h2 className="text-base mt-1.5 text-gray-400">
          Manage all users in the system (Clients,Workers,Admins).
        </h2>
        <UsersTable />
      </article>
    </main>
  );
}

export default UserManage;
