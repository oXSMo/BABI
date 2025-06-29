import moment from "moment";
import { useGetTransactions } from "../../../hooks/useDashboard";

function TransactionsTable() {
  const { loading, transactions } = useGetTransactions();

  return (
    <main className="overflow-auto w-full h-full [&::-webkit-scrollbar]:w-0 mt-2">
      {transactions.length ? (
        <table className=" min-w-full overflow-auto">
          <thead className="[&_th]:text-start [&_th]:font-normal [&_th]:p-2 [&_th]:py-3 [&_th]:border-r [&_th]:border-white/20 text-white/50">
            <tr className="border-b border-white/20">
              <th className="w-20">Id</th>
              <th className="min-w-44">Client</th>
              <th className="min-w-52">Worker</th>
              <th className="min-w-44">Balance</th>
              <th className="min-w-28">CreatedAt</th>

              <th className="min-w-22 !border-r-0">
                <p className="text-center">Actions</p>
              </th>
            </tr>
          </thead>

          <tbody className="[&_td]:text-start text-[15px] [&_td]:border-r [&_td]:border-white/10  [&_td]:p-2 [&_td]:py-3.5">
            {transactions?.map((t, i) => (
              <tr
                className={`  border-white/10 ${
                  i !== data.length - 1 && "border-b"
                }`}
              >
                <td className="border-r border-white/10">
                  <p className="line-clamp-1">{t._id}</p>
                </td>
                <td>{t.client.fullName}</td>
                <td>{t.worker.fullName}</td>
                <td>
                  <h1 className="flex gap-1 items-end">
                    {t.balance} <p className="text-xs mb-0.5">DZD</p>
                  </h1>
                </td>
                <td>{moment(t.createdAt).fromNow()}</td>
                <td className="!border-r-0">
                  <p className="text-center"></p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : loading ? (
        <div className="w-full h-full grid place-content-center">
          <div className="loader w-16 h-16" />
        </div>
      ) : (
        <></>
      )}
    </main>
  );
}

const data = [
  {
    id: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    createdAt: "2025-06-17T15:45:00Z",
    balance: 150000.5,
    worker: "Karim Bensalah",
    client: "SARL Ciment Lafarge",
  },
  {
    id: "b2c3d4e5-f6a7-8901-2345-67890abcdef1",
    createdAt: "2025-06-15T10:20:00Z",
    balance: -25000.0,
    worker: "Lydia Ait-Said",
    client: "Pharmacie Boumaza",
  },
  {
    id: "c3d4e5f6-a7b8-9012-3456-7890abcdef12",
    createdAt: "2025-06-05T09:00:00Z",
    balance: 7500.75,
    worker: "Karim Bensalah",
    client: "Amine Khelifi",
  },
  {
    id: "d4e5f6a7-b8c9-0123-4567-890abcdef123",
    createdAt: "2025-05-20T18:10:00Z",
    balance: 0.0,
    worker: "Younes Chergui",
    client: "Hôtel Ibis Constantine",
  },
  {
    id: "e5f6a7b8-c9d0-1234-5678-90abcdef1234",
    createdAt: "2025-05-18T11:55:00Z",
    balance: 345800.0,
    worker: "Lydia Ait-Said",
    client: "Société Générale Algérie",
  },
  {
    id: "f6a7b8c9-d0e1-2345-6789-0abcdef12345",
    createdAt: "2025-04-30T14:00:00Z",
    balance: 12350.25,
    worker: "Sara Haddad",
    client: "Entreprise Nationale de Siderurgie",
  },
];

export default TransactionsTable;
