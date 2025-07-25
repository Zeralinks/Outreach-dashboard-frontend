import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

// Dashboard Component
const Dashboard = () => (
  <section className="flex font-montserrat h-screen overflow-y-hidden">
    <Sidebar />
    <article className="bg-neutral md:w-[80%] overflow-y-auto">
      <Header />
      <div className="mt-6 mx-6 ">
        <Outlet />
      </div>
    </article>
  </section>
);

export default Dashboard