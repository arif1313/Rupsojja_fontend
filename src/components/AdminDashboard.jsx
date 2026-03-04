import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  ShoppingBag, 
  Users, 
  DollarSign,
  TrendingUp,
  Clock,
  Loader,
  MapPin,
  Phone,
  User,
  Eye
} from 'lucide-react';
import { allOrder } from '../Api/ProductApi';


const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalProducts: 156,
    totalOrders: 0,
    totalUsers: 1245,
    totalRevenue: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalItems: 0
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await allOrder();
      
      // এক্সট্রাক্ট অর্ডার ডেটা
      const ordersData = response.data || [];
      setOrders(ordersData);
      
      // ক্যালকুলেট স্ট্যাটিসটিক্স
      calculateStats(ordersData);
      
      setError(null);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (ordersData) => {
    // টোটাল রেভিনিউ ক্যালকুলেট করুন
    const totalRevenue = ordersData.reduce((sum, order) => {
      return sum + (order.totalAmount || 0);
    }, 0);

    // বিভিন্ন স্ট্যাটাসের অর্ডার কাউন্ট করুন
    const pendingOrders = ordersData.filter(o => o.orderStatus === 'pending').length;
    const processingOrders = ordersData.filter(o => o.orderStatus === 'processing').length;
    const deliveredOrders = ordersData.filter(o => o.orderStatus === 'delivered').length;
    const completedOrders = ordersData.filter(o => o.orderStatus === 'completed' || o.orderStatus === 'delivered').length;
    
    // টোটাল প্রোডাক্ট আইটেম কাউন্ট করুন
    const totalItems = ordersData.reduce((sum, order) => {
      return sum + (order.items?.length || 0);
    }, 0);

    setStats({
      totalProducts: 156, // প্রোডাক্ট API থেকে আনতে হবে
      totalOrders: ordersData.length,
      totalUsers: 1245, // ইউজার API থেকে আনতে হবে
      totalRevenue: totalRevenue,
      pendingOrders,
      processingOrders,
      deliveredOrders,
      completedOrders,
      totalItems
    });
  };

  // ডেট ফরম্যাট করুন
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // স্ট্যাটাস ব্যাজ কালার
  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // পেমেন্ট স্ট্যাটাস ব্যাজ কালার
  const getPaymentStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // স্ট্যাটস কার্ড ডেটা
  const statsCards = [
    { 
      title: 'Total Products', 
      value: stats.totalProducts.toLocaleString(), 
      icon: <Package size={24} />, 
      color: 'bg-blue-500',
      change: '+12%'
    },
    { 
      title: 'Total Orders', 
      value: stats.totalOrders.toLocaleString(), 
      icon: <ShoppingBag size={24} />, 
      color: 'bg-green-500',
      change: `+${Math.round((stats.totalOrders / 10) * 2)}%`
    },
    { 
      title: 'Total Users', 
      value: stats.totalUsers.toLocaleString(), 
      icon: <Users size={24} />, 
      color: 'bg-purple-500',
      change: '+8%'
    },
    { 
      title: 'Total Revenue', 
      value: `$${stats.totalRevenue.toLocaleString()}`, 
      icon: <DollarSign size={24} />, 
      color: 'bg-pink-500',
      change: '+32%'
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="animate-spin text-pink-600" size={48} />
        <span className="ml-3 text-gray-600">Loading dashboard...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        <p>{error}</p>
        <button 
          onClick={fetchOrders}
          className="mt-2 text-sm underline hover:no-underline"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* হেডার */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* স্ট্যাটস গ্রিড */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} text-white p-3 rounded-lg`}>
                {stat.icon}
              </div>
              <span className="text-green-500 text-sm font-semibold bg-green-50 px-2 py-1 rounded">
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* অর্ডার স্ট্যাটাস ওভারভিউ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* পাই চার্টের পরিবর্তে স্ট্যাটাস কার্ড */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Order Status Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-yellow-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-yellow-600">{stats.pendingOrders}</p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.processingOrders || 0}</p>
              <p className="text-sm text-gray-600">Processing</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-purple-600">{stats.deliveredOrders || 0}</p>
              <p className="text-sm text-gray-600">Delivered</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{stats.completedOrders}</p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </div>
          
          {/* প্রোগ্রেস বার */}
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Completion Rate</span>
              <span className="font-semibold">
                {stats.totalOrders ? Math.round((stats.completedOrders / stats.totalOrders) * 100) : 0}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-green-600 h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${stats.totalOrders ? (stats.completedOrders / stats.totalOrders) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* কুইক ইনফো */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Info</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Total Items Sold</span>
              <span className="font-bold text-gray-800">{stats.totalItems}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Average Order Value</span>
              <span className="font-bold text-gray-800">
                ${stats.totalOrders ? (stats.totalRevenue / stats.totalOrders).toFixed(2) : 0}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Payment Method</span>
              <span className="font-bold text-gray-800">Cash on Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* রিসেন্ট অর্ডার */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            <p className="text-sm text-gray-500">Latest {Math.min(5, orders.length)} orders from your store</p>
          </div>
          <Link to="/admin/orders" className="text-pink-600 hover:text-pink-700 text-sm font-medium flex items-center gap-1">
            View All
            <Eye size={16} />
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag size={48} className="mx-auto mb-3 text-gray-400" />
            <p className="text-gray-500">No orders found</p>
            <p className="text-sm text-gray-400 mt-1">When customers place orders, they will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.slice(0, 5).map((order) => (
              <div key={order._id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                {/* অর্ডার হেডার */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-medium text-pink-600">{order.orderNumber}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.orderStatus)}`}>
                      {order.orderStatus}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getPaymentStatusColor(order.paymentStatus)}`}>
                      Payment: {order.paymentStatus}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    <Clock size={14} className="inline mr-1" />
                    {formatDate(order.orderDate)}
                  </span>
                </div>

                {/* অর্ডার ডিটেলস */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* কাস্টমার ইনফো */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <User size={16} className="text-gray-400" />
                      <span className="font-medium">{order.shippingAddress.fullName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone size={16} className="text-gray-400" />
                      <span>{order.shippingAddress.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin size={16} className="text-gray-400" />
                      <span>{order.shippingAddress.city}, {order.shippingAddress.address}</span>
                    </div>
                  </div>

                  {/* প্রোডাক্ট আইটেম */}
                  <div className="md:col-span-1">
                    <p className="text-sm font-medium mb-2">Items ({order.items.length})</p>
                    <div className="space-y-1">
                      {order.items.slice(0, 2).map((item, idx) => (
                        <div key={idx} className="text-sm text-gray-600 flex justify-between">
                          <span>{item.name} x{item.quantity}</span>
                          <span>${item.price * item.quantity}</span>
                        </div>
                      ))}
                      {order.items.length > 2 && (
                        <p className="text-xs text-gray-400">+{order.items.length - 2} more items</p>
                      )}
                    </div>
                  </div>

                  {/* টোটাল */}
                  <div className="text-right">
                    <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                    <p className="text-xl font-bold text-gray-800">${order.totalAmount}</p>
                    <p className="text-xs text-gray-400 mt-1">{order.paymentMethod}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ফুটার স্ট্যাটস */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-4">
          <p className="text-sm text-pink-600 font-medium">Today's Orders</p>
          <p className="text-2xl font-bold text-gray-800">12</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
          <p className="text-sm text-blue-600 font-medium">Today's Revenue</p>
          <p className="text-2xl font-bold text-gray-800">$2,450</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
          <p className="text-sm text-green-600 font-medium">Pending Orders</p>
          <p className="text-2xl font-bold text-gray-800">{stats.pendingOrders}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
          <p className="text-sm text-purple-600 font-medium">Low Stock Items</p>
          <p className="text-2xl font-bold text-gray-800">5</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
