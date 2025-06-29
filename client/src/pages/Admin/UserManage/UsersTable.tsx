import moment from "moment";
import { useGetUsers } from "../../../hooks/useDashboard";
import { MdPersonSearch } from "react-icons/md";

function UsersTable() {
  const { loading, users } = useGetUsers();
  return (
    <main className="overflow-auto w-full h-full [&::-webkit-scrollbar]:w-0">
      {users.length ? (
        <table className=" min-w-full overflow-auto">
          <thead className="[&_th]:text-start [&_th]:font-normal [&_th]:p-2 [&_th]:py-3 text-white/50">
            <tr className="border-b border-white/20">
              <th className="min-w-44">Full Name</th>
              <th className="min-w-52">Email</th>
              <th className="min-w-28">Role</th>
              <th className="min-w-28">Status</th>
              <th className="min-w-32">Member Since </th>
              <th className="min-w-22">Actions</th>
            </tr>
          </thead>

          <tbody className="[&_td]:text-start text-[15px]  [&_td]:p-2 [&_td]:py-3.5">
            {users?.map((user, i) => (
              <tr
                className={`  border-white/10 ${
                  i !== data.length - 1 && "border-b"
                }`}
              >
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.isVerified}</td>
                <td>{moment(user.createdAt).fromNow()}</td>
                <td>idk</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : loading ? (
        <div className="w-full h-full grid place-content-center">
          <div className="loader w-16 h-16" />
        </div>
      ) : (
        <div className="w-full h-full grid place-content-center opacity-60 text-center">
          <MdPersonSearch className="text-8xl mx-auto" />
          <p className="text-xl tracking-wide">No Users Found</p>
        </div>
      )}
    </main>
  );
}

const data = [
  {
    fullName: "Karim Zidane",
    email: "karim.z@example.com",
    role: "Admin",
    status: "Active",
    createdAt: "2025-06-15T10:00:00Z",
    actions: ["Edit", "Delete"],
  },
  {
    fullName: "Amina Benaissa",
    email: "amina.b@example.com",
    role: "Editor",
    status: "Active",
    createdAt: "2025-06-10T14:30:00Z",
    actions: ["Edit", "Delete"],
  },
  {
    fullName: "Yacine Mansouri",
    email: "y.mansouri@example.com",
    role: "Author",
    status: "Pending",
    createdAt: "2025-05-28T09:15:00Z",
    actions: ["Approve", "Delete"],
  },
  {
    fullName: "Fatima Hamidi",
    email: "fatima.h@example.com",
    role: "Member",
    status: "Inactive",
    createdAt: "2025-04-22T18:45:00Z",
    actions: ["Edit", "Delete"],
  },
  {
    fullName: "Sofiane Cherif",
    email: "s.cherif@example.com",
    role: "Member",
    status: "Active",
    createdAt: "2025-03-12T12:05:00Z",
    actions: ["Edit", "Delete"],
  },
];
export default UsersTable;
