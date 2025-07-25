import { Bell, ChevronDown, HelpCircle, LogOut, User, UserCog } from 'lucide-react';
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between font-roboto">
        <h1 className="text-xl font-semibold text-black">Dashboard</h1>
        <div className="flex items-baseline space-x-6">
            <div className="relative">
                <button className="text-gray-500 hover:text-gray-700">
                    <Bell className="w-6 h-6" />
                    <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-destructive"></span>
                </button>
            </div>

            <div className="relative">
            <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center space-x-2"
            >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <User className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-gray-700">Emma Wilson</span>
                <ChevronDown className="w-4 h-4" />
            </button>
            {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden z-10">
                <NavLink
                    to="/dashboard/profile-settings"
                    className="flex items-center px-4 py-2 text-sm hover:bg-neutral-dark"
                >
                    <UserCog className="w-4 h-4 mr-2" />
                    Profile Settings
                </NavLink>
                <NavLink
                    to="/dashboard/help"
                    className="flex items-center px-4 py-2 text-sm hover:bg-neutral-dark"
                >
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Help & Support
                </NavLink>
                <NavLink
                    to="/logout"
                    className="flex items-center px-4 py-2 text-sm text-destructive border-t border-gray-100 hover:bg-neutral-dark"
                >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                </NavLink>
                </div>
            )}
            </div>
        </div>
    </header>
  );
};

export default Header