import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Settings,
  LogOut,
  Menu,
  X,
  PlusCircle,
  Edit,
  Trash2
} from 'lucide-react';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { path: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/admin/products', icon: <Package size={20} />, label: 'Products' },
    { path: '/admin/add-product', icon: <PlusCircle size={20} />, label: 'Add Product' },
    { path: '/admin/orders', icon: <ShoppingBag size={20} />, label: 'Orders' },
    { path: '/admin/users', icon: <Users size={20} />, label: 'Users' },
    { path: '/admin/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  const handleLogout = () => {
    // Add logout logic here
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-pink-600">Admin Panel</h1>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 transform 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 transition duration-200 ease-in-out
        w-64 bg-white shadow-lg z-30
      `}>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-pink-600 hidden lg:block">Admin Panel</h1>
          <h1 className="text-xl font-bold text-pink-600 lg:hidden">Admin</h1>
        </div>

        <nav className="mt-6">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
              onClick={() => setIsSidebarOpen(false)}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors mt-auto"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;