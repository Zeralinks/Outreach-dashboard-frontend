import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Rocket,
  LayoutDashboard,
  Mail,
  Briefcase,
  BarChart,
  Flame,
  Settings,
  User,
  Plus,
  MoreHorizontal
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getGmailAccounts } from '@/services/apiBlog';

const Sidebar = () => {
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Inboxes', icon: Mail, path: '/dashboard/inboxes' },
    { name: 'Job Tracker', icon: Briefcase, path: '/dashboard/job-tracker' },
    { name: 'Analytics', icon: BarChart, path: '/dashboard/analytics' },
    { name: 'Warmup Manager', icon: Flame, path: '/dashboard/warmup' },
    { name: 'Settings', icon: Settings, path: '/dashboard/settings' },
    { name: 'Connected Accounts', icon: User, path: '/dashboard/connectedAccounts' },
  ];

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['gmailAccounts'],
    queryFn: getGmailAccounts,
  });

  const accounts = data?.results ?? [];

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/', { replace: true });
  };

  return (
    <aside className="bg-white h-screen flex flex-col justify-between px-12 py-6 md:w-[20%] shadow-md font-roboto">
      {/* Top Navigation */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Rocket className="text-primary-light w-7 h-7" />
          <h2 className="text-2xl font-bold text-black tracking-wide font-montserrat">
            <span className="text-primary-light">Auto</span>Apply
          </h2>
        </div>

        <ul className="space-y-4 text-gray-700 font-medium">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 hover:text-primary-light cursor-pointer ${
                  isActive ? 'text-primary-light font-bold' : ''
                }`
              }
              end={item.path === '/dashboard'}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </ul>
      </div>

      {/* Connected Accounts Section */}
      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Connected Accounts
        </h3>

        <ul className="space-y-2">
          {isLoading ? (
            <li className="text-center text-gray-500">Loading...</li>
          ) : isError ? (
            <li className="text-center text-red-500">{error.message}</li>
          ) : accounts && accounts.length > 0 ? (
            accounts.slice(0, 3).map((account) => (
              <li key={account.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary-light/10 flex items-center justify-center text-primary-light mr-2">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-black">{account.email}</p>
                    <div className="flex items-center">
                      <span className={`w-2 h-2 rounded-full ${
                        account.is_active ? 'bg-chart-5' : 'bg-chart-3'
                      } mr-1`}></span>
                      <span className="text-xs text-muted-foreground">
                        {account.is_active ? 'Live' : 'Warming'}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </li>
            ))
          ) : (
            <li className="text-center text-gray-500">No accounts connected.</li>
          )}
        </ul>

        {/* Connect Button */}
        <Link
          to="/dashboard/connectedAccounts"
          className="mt-3 w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-button text-gray-700 bg-white hover:bg-neutral-dark"
        >
          <Plus className="w-4 h-4 mr-2" />
          Connect Gmail
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
