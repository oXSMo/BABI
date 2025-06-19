import TransactionsTable from "./TransactionsTable";

function AllTransactions() {
  return (
    <main className="h-full grid grid-rows-[auto_1fr] fadeIn">
      <h1 className="md:text-3xl text-xl font-bold   mb-4">All Transactions</h1>

      <article className="w-full Border p-4 min-h-full overflow-hidden">
        <h1 className="text-3xl font-bold">Transactions List</h1>
        <h2 className="text-base mt-1.5 text-gray-400">
          Manage all transactions in the system
        </h2>
        <TransactionsTable />
      </article>
    </main>
  );
}

export default AllTransactions;
