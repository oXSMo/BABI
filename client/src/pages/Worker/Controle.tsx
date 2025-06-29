import { Outlet, useNavigate, useParams } from "react-router-dom";
import StartScan from "../../components/content/StartScan";
import { useGetClient } from "../../hooks/useSign";
import moment from "moment";
import { useGetUserTransactions } from "../../hooks/useTransaction";
import { MdCurrencyExchange } from "react-icons/md";

function Controle() {
  return (
    <main className="max-w-7xl w-11/12  px-4 my-4 py-2 mx-auto grid grid-rows-[auto_1fr] ">
      <aside>
        <h1 className="text-3xl font-bold mb-5">Controle Client</h1>
        <h2 className="text-textSec mb-4">
          Scan a client's QR,then choose an action and amount
        </h2>
      </aside>

      <Outlet />
    </main>
  );
}

export const ControleScanner = () => {
  const navigate = useNavigate();

  return (
    <StartScan
      handler={(result: any) => {
        navigate(result);
      }}
    />
  );
};

export const ControleClientInfo = () => {
  const { _id } = useParams();
  const { client } = useGetClient(_id);
  const { userTransactions, loading } = useGetUserTransactions(true, _id);
  console.log({ userTransactions });

  return (
    <main className="grid h-full md:grid-cols-[auto_1fr] gap-6">
      <article className="card md:w-80 w-full items-start space-y-2 grid grid-cols-2 max-h-96 md:sticky top-5 gap-y-3 [&_h3]:line-clamp-1 [&_h3]:justify-self-end [&_h2]:text-black/60">
        <h1 className="tracking-wide font-medium text-lg !mb-4 col-span-2">
          Client Informations
        </h1>

        <h2>Full Name : </h2>
        <h3>{client.fullName}</h3>
        <h2>Email : </h2>
        <h3>{client.email}</h3>
        <h2>Phone Number : </h2>
        <h3>{client.phoneNumber}</h3>
        <h2>Balance : </h2>
        <h3
          className="font-medium"
          style={{ color: (client.balance || 0) > 0 ? "green" : "red" }}
        >
          {client.balance} <span className="text-xs">dzd</span>
        </h3>
        <h2>Role : </h2>
        <h3>{client.role}</h3>
        <h2>Account Created : </h2>
        <h3>{moment(client.createdAt).fromNow()}</h3>
      </article>

      <article className="card flex flex-col h-full w-full ">
        <h1 className="tracking-wide font-medium text-lg w-full !mb-4 col-span-2">
          Client Transaction History
        </h1>
        <aside className="max-h-[400px] grid h-full overflow-auto">
          {userTransactions.length ? (
            <table className="w-full max-h-72 !overflow-auto">
              <thead className="[&_th]:text-start [&_th]:font-medium [&_th]:px-2 [&_th]:py-1.5 border-b">
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Amount</th>
                </tr>
              </thead>

              <tbody className="[&_td]:text-start  [&_td]:px-2 [&_td]:py-1.5">
                {userTransactions?.map((t) => (
                  <tr className="border-b">
                    <td>{moment(t.createdAt).format("yy-MMM-DD hh:mm")}</td>
                    <td>
                      <h2 className="">
                        {t.balance > 0 ? "Credit Purchase" : "Ticket redeemed"}
                      </h2>
                    </td>
                    <td>
                      <h3
                        style={{
                          color: t.balance > 0 ? "green" : "red",
                        }}
                        className="justify-self-end pr-2"
                      >
                        {t.balance > 0 ? "+" : ""}
                        {t.balance} <span className="text-xs">DZD</span>
                      </h3>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : loading ? (
            <div className="loader w-16 h-16 place-self-center !border-t-black/60 !border-black/10 !border-8" />
          ) : (
            <div className="w-full h-full grid place-content-center opacity-80 pointer-events-none">
              <MdCurrencyExchange className="text-7xl mx-auto" />
              <p className="text-lg mt-1">No Transactions Found</p>
            </div>
          )}
        </aside>
      </article>
    </main>
  );
};

export default Controle;
