import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  ShoppingBag, 
  Users, 
  DollarSign,
  TrendingUp,
  Clock
} from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { 
      title: 'Total Products', 
      value: '156', 
      icon: <Package size={24} />, 
      color: 'bg-blue-500',
      change: '+12%'
    },
    { 
      title: 'Total Orders', 
      value: '89', 
      icon: <ShoppingBag size={24} />, 
      color: 'bg-green-500',
      change: '+23%'
    },
    { 
      title: 'Total Users', 
      value: '1,245', 
      icon: <Users size={24} />, 
      color: 'bg-purple-500',
      change: '+8%'
    },
    { 
      title: 'Revenue', 
      value: '$12,456', 
      icon: <DollarSign size={24} />, 
      color: 'bg-pink-500',
      change: '+32%'
    },
  ];

  const recentOrders = [
    { id: '#ORD001', customer: 'John Doe', amount: '$299.99', status: 'Pending', date: '2024-01-15' },
    { id: '#ORD002', customer: 'Jane Smith', amount: '$149.99', status: 'Processing', date: '2024-01-14' },
    { id: '#ORD003', customer: 'Bob Johnson', amount: '$89.99', status: 'Delivered', date: '2024-01-13' },
    { id: '#ORD004', customer: 'Alice Brown', amount: '$399.99', status: 'Pending', date: '2024-01-12' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} text-white p-3 rounded-lg`}>
                {stat.icon}
              </div>
              <span className="text-green-500 text-sm font-semibold">{stat.change}</span>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
            <TrendingUp size={48} className="text-gray-400" />
            <span className="text-gray-400 ml-2">Chart Component Here</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Popular Products</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded"></div>
                  <div>
                    <p className="font-medium">Product Name {item}</p>
                    <p className="text-sm text-gray-500">45 sold</p>
                  </div>
                </div>
                <span className="font-semibold">$299.99</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Orders</h2>
          <Link to="/admin/orders" className="text-pink-600 hover:text-pink-700 text-sm">
            View All
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Order ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Customer</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium">{order.id}</td>
                  <td className="px-4 py-3 text-sm">{order.customer}</td>
                  <td className="px-4 py-3 text-sm">{order.amount}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;