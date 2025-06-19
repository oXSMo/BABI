import { MdCreditCard, MdGroups2, MdTimeline } from "react-icons/md";
import ColumnChartDarkMode from "./SalesChart";
import PieChart from "./UserDistripbutionPie";
import PassengersChart from "./PassengersChart";

function Dashboard() {
  return (
    <main className="h-full grid grid-rows-[auto_auto_1fr] fadeIn">
      <h1 className="md:text-3xl text-xl font-bold   ">Admin Dashboard</h1>

      <section className="grid md:grid-cols-3 grid-cols-1 gap-4 my-6">
        {[
          {
            title: "Total Users",
            count: "150",
            description: "Clients,Workers,and Admins",
            icon: <MdGroups2 />,
          },
          {
            title: "Total Credit Added",
            count: "7500 DZD",
            description: "Access all credit addictions",
            icon: <MdCreditCard />,
          },
          {
            title: "System Activity",
            count: "High",
            description: "Based on recent transactions",
            icon: <MdTimeline />,
          },
        ].map((card) => (
          <InfoCard {...card} />
        ))}
      </section>

      <section className="grid lg:grid-cols-2 gap-4 h-full">
        <aside className="Border p-3 h-full overflow-x-hidden !pb-0">
          <h3>Monthly Sales</h3>
          <h4>Total credit sales over the last 6 months</h4>
          <ColumnChartDarkMode />
        </aside>
        <aside className="Border p-3 h-full overflow-x-hidden">
          <h3>User Distripbution</h3>
          <h4>breakdown of user roles in the system.</h4>
          <div className="py-5">
            <PieChart />
          </div>
        </aside>
        <aside className="col-span-2 Border p-3 h-full overflow-x-hidden">
          <h3>Passengers Counting</h3>
          <h4>Analytics of passengers.</h4>
          <PassengersChart />
        </aside>
      </section>
    </main>
  );
}

const InfoCard = ({ title, count, description, icon }: any) => (
  <article className="Border p-3 px-4 grid rounded-md grid-rows-[auto_auto_1fr]">
    <aside className="flex justify-between items-center">
      <h1 className="font-medium">{title}</h1>
      <div className="text-2xl opacity-70">{icon}</div>
    </aside>

    <h1 className="text-[32px]  font-bold ">{count}</h1>

    <p className="text-white/60 text-sm">{description}</p>
  </article>
);

export default Dashboard;
