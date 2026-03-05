import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, Eye, CheckCircle, XCircle, Truck, Loader,
  ChevronDown, RefreshCw, Package, Clock, MapPin, User,
  Calendar, DollarSign, TrendingUp, ShoppingBag, Download,
  Printer, Mail, AlertCircle, X
} from 'lucide-react';
import { allOrder, updateOrderStatus } from '../api/ProductApi';

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  const statuses = [
    { value: 'all', label: 'All Orders', icon: Package },
    { value: 'pending', label: 'Pending', icon: Clock },
    { value: 'processing', label: 'Processing', icon: RefreshCw },
    { value: 'shipped', label: 'Shipped', icon: Truck },
    { value: 'delivered', label: 'Delivered', icon: CheckCircle },
    { value: 'cancelled', label: 'Cancelled', icon: XCircle }
  ];

  useEffect(() => {
    fetchOrders();
  }, []);

  // ESC কী প্রেস করলে মডাল বন্ধ হবে
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && selectedOrder) {
        setSelectedOrder(null);
        document.body.style.overflow = 'unset';
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [selectedOrder]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await allOrder();
      setOrders(response.data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyles = (status) => {
    const styles = {
      pending: {
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-200',
        icon: Clock,
        gradient: 'from-amber-50 to-amber-100/50'
      },
      processing: {
        bg: 'bg-sky-50',
        text: 'text-sky-700',
        border: 'border-sky-200',
        icon: RefreshCw,
        gradient: 'from-sky-50 to-sky-100/50'
      },
      shipped: {
        bg: 'bg-purple-50',
        text: 'text-purple-700',
        border: 'border-purple-200',
        icon: Truck,
        gradient: 'from-purple-50 to-purple-100/50'
      },
      delivered: {
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        icon: CheckCircle,
        gradient: 'from-emerald-50 to-emerald-100/50'
      },
      cancelled: {
        bg: 'bg-rose-50',
        text: 'text-rose-700',
        border: 'border-rose-200',
        icon: XCircle,
        gradient: 'from-rose-50 to-rose-100/50'
      }
    };
    return styles[status?.toLowerCase()] || styles.pending;
  };

  const getPaymentStatusBadge = (status) => {
    const badges = {
      paid: 'bg-gradient-to-r from-emerald-500 to-green-500 text-white',
      pending: 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white',
      failed: 'bg-gradient-to-r from-rose-500 to-red-500 text-white'
    };
    return badges[status?.toLowerCase()] || badges.pending;
  };

  const handleStatusChange = async (orderId, newStatus, event) => {
    if (event) {
      event.stopPropagation();
    }
    
    try {
      setUpdatingOrderId(orderId);
      await updateOrderStatus(orderId, newStatus);
      
      setOrders(orders.map(order => 
        order._id === orderId 
          ? { 
              ...order, 
              orderStatus: newStatus,
              ...(newStatus === 'delivered' ? { deliveredAt: new Date().toISOString() } : {})
            }
          : order
      ));

      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder({
          ...selectedOrder,
          orderStatus: newStatus,
          ...(newStatus === 'delivered' ? { deliveredAt: new Date().toISOString() } : {})
        });
      }
      
      showNotification('success', `Order status updated to ${newStatus}`);
      
    } catch (err) {
      showNotification('error', 'Failed to update order status');
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const showNotification = (type, message) => {
    console.log(`${type}: ${message}`);
  };

  const handleViewDetails = (order, event) => {
    if (event) {
      event.stopPropagation();
    }
    setSelectedOrder(order);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
    document.body.style.overflow = 'unset';
  };

  const handleModalBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      handleCloseModal();
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return `Today at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays === 1) {
      return `Yesterday at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shippingAddress?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shippingAddress?.phone?.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || order.orderStatus === statusFilter;
    
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.orderDate) - new Date(a.orderDate);
    if (sortBy === 'oldest') return new Date(a.orderDate) - new Date(b.orderDate);
    if (sortBy === 'highest') return b.totalAmount - a.totalAmount;
    if (sortBy === 'lowest') return a.totalAmount - b.totalAmount;
    return 0;
  });

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.orderStatus === 'pending').length,
    processing: orders.filter(o => o.orderStatus === 'processing').length,
    delivered: orders.filter(o => o.orderStatus === 'delivered').length,
    revenue: orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0)
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin"></div>
            <Package className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-pink-600" size={24} />
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="text-rose-600" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={fetchOrders}
            className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-shadow duration-300 flex items-center justify-center gap-2 mx-auto"
          >
            <RefreshCw size={18} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Orders Management
            </h1>
            <p className="text-gray-600 mt-1">Manage and track all customer orders</p>
          </div>
          
          <div className="flex gap-3">
            <button className="p-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 text-gray-600 hover:text-pink-600">
              <Download size={20} />
            </button>
            <button className="p-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 text-gray-600 hover:text-pink-600">
              <Printer size={20} />
            </button>
            <button 
              onClick={fetchOrders}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 text-gray-600 hover:text-pink-600"
            >
              <RefreshCw size={18} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Orders</p>
                <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl flex items-center justify-center">
                <Package className="text-pink-600" size={24} />
              </div>
            </div>
            <div className="mt-4 text-sm text-green-600 flex items-center gap-1">
              <TrendingUp size={16} />
              <span>+12% from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending Orders</p>
                <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <Clock className="text-amber-600" size={24} />
              </div>
            </div>
            <div className="mt-4 text-sm text-amber-600 flex items-center gap-1">
              <AlertCircle size={16} />
              <span>{stats.pending} orders need attention</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Processing</p>
                <p className="text-2xl font-bold text-sky-600">{stats.processing}</p>
              </div>
              <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                <RefreshCw className="text-sky-600" size={24} />
              </div>
            </div>
            <div className="mt-4 text-sm text-sky-600 flex items-center gap-1">
              <Truck size={16} />
              <span>{stats.processing} being prepared</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="text-2xl font-bold text-emerald-600">{formatCurrency(stats.revenue)}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <DollarSign className="text-emerald-600" size={24} />
              </div>
            </div>
            <div className="mt-4 text-sm text-emerald-600 flex items-center gap-1">
              <TrendingUp size={16} />
              <span>+8% from last month</span>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by order ID, customer name, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-xl hover:border-pink-300 hover:text-pink-600 transition-all duration-300"
              >
                <Filter size={18} />
                <span>Filters</span>
                <ChevronDown size={16} className={`transform transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Amount</option>
                <option value="lowest">Lowest Amount</option>
              </select>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex flex-wrap gap-3">
                {statuses.map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    onClick={() => setStatusFilter(value)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                      statusFilter === value
                        ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{label}</span>
                    {value !== 'all' && (
                      <span className={`ml-1 px-1.5 py-0.5 text-xs rounded-full ${
                        statusFilter === value ? 'bg-white/20' : 'bg-gray-200'
                      }`}>
                        {orders.filter(o => o.orderStatus === value).length}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {filteredOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-pink-600 to-purple-600">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Order</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Customer</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Items</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Total</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Payment</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredOrders.map((order) => {
                    const statusStyle = getStatusStyles(order.orderStatus);
                    const StatusIcon = statusStyle.icon;
                    
                    return (
                      <tr 
                        key={order._id} 
                        className={`group hover:bg-gradient-to-r ${statusStyle.gradient} transition-all duration-300`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Package className="text-pink-600" size={18} />
                            <span className="font-medium text-gray-800">#{order.orderNumber}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center">
                              <User size={14} className="text-pink-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">{order.shippingAddress?.fullName}</p>
                              <p className="text-xs text-gray-500">{order.shippingAddress?.phone}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex -space-x-2">
                            {order.items?.slice(0, 3).map((item, idx) => (
                              <div
                                key={idx}
                                className="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600"
                                title={item.name}
                              >
                                {item.quantity}
                              </div>
                            ))}
                            {order.items?.length > 3 && (
                              <div className="w-8 h-8 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-pink-600">
                                +{order.items.length - 3}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-bold text-gray-800">{formatCurrency(order.totalAmount)}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="relative" onClick={(e) => e.stopPropagation()}>
                            <select
                              value={order.orderStatus}
                              onChange={(e) => handleStatusChange(order._id, e.target.value, e)}
                              disabled={updatingOrderId === order._id}
                              className={`appearance-none pl-8 pr-8 py-1.5 text-sm rounded-xl border-0 cursor-pointer font-medium ${statusStyle.bg} ${statusStyle.text} focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-300 ${
                                updatingOrderId === order._id ? 'opacity-50 cursor-not-allowed' : ''
                              }`}
                              style={{ backgroundImage: 'none' }}
                            >
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                            <StatusIcon size={14} className={`absolute left-2 top-1/2 transform -translate-y-1/2 ${statusStyle.text}`} />
                            {updatingOrderId === order._id && (
                              <Loader size={12} className="absolute right-2 top-1/2 transform -translate-y-1/2 animate-spin" />
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1.5 text-xs rounded-xl font-medium ${getPaymentStatusBadge(order.paymentStatus)}`}>
                            {order.paymentStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Calendar size={14} />
                            <span>{formatDate(order.orderDate)}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={(e) => handleViewDetails(order, e)}
                            className="p-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                          >
                            <Eye size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="text-pink-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No orders found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filter to find what you're looking for.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                }}
                className="text-pink-600 hover:text-pink-700 font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Order Details Modal - সরাসরি দ্বিতীয় কোড থেকে নেওয়া */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Order Details - {selectedOrder.orderNumber}</h2>
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-500 hover:text-gray-700 text-xl"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Customer Info */}
                  <div className="border-b pb-4">
                    <h3 className="font-semibold mb-2">Customer Information</h3>
                    <p><span className="text-gray-600">Name:</span> {selectedOrder.shippingAddress?.fullName}</p>
                    <p><span className="text-gray-600">Email:</span> {selectedOrder.shippingAddress?.email}</p>
                    <p><span className="text-gray-600">Phone:</span> {selectedOrder.shippingAddress?.phone}</p>
                  </div>

                  {/* Shipping Info */}
                  <div className="border-b pb-4">
                    <h3 className="font-semibold mb-2">Shipping Address</h3>
                    <p>{selectedOrder.shippingAddress?.address}</p>
                    <p>{selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} {selectedOrder.shippingAddress?.pincode}</p>
                  </div>

                  {/* Order Items */}
                  <div className="border-b pb-4">
                    <h3 className="font-semibold mb-2">Order Items</h3>
                    <table className="w-full">
                      <thead>
                        <tr className="text-sm text-gray-600 border-b">
                          <th className="text-left py-2">Product</th>
                          <th className="text-left">Qty</th>
                          <th className="text-left">Price</th>
                          <th className="text-left">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedOrder.items?.map((item, idx) => (
                          <tr key={idx} className="border-b">
                            <td className="py-2">{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>${item.price?.toFixed(2)}</td>
                            <td>${(item.quantity * item.price).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="font-bold">
                        <tr>
                          <td colSpan="3" className="text-right pt-4">Total Amount:</td>
                          <td className="pt-4">${selectedOrder.totalAmount?.toFixed(2)}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  {/* Order Status */}
                  <div>
                    <h3 className="font-semibold mb-2">Order Status</h3>
                    <div className="flex items-center gap-4 flex-wrap">
                      <span className={`px-3 py-1 rounded-full text-sm ${getStatusStyles(selectedOrder.orderStatus).bg} ${getStatusStyles(selectedOrder.orderStatus).text}`}>
                        {selectedOrder.orderStatus}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm ${getPaymentStatusBadge(selectedOrder.paymentStatus)}`}>
                        Payment: {selectedOrder.paymentStatus}
                      </span>
                      <span className="text-sm text-gray-600">
                        Ordered: {formatDate(selectedOrder.orderDate)}
                      </span>
                      {selectedOrder.deliveredAt && (
                        <span className="text-sm text-gray-600">
                          Delivered: {formatDate(selectedOrder.deliveredAt)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t">
                    {selectedOrder.orderStatus === 'pending' && (
                      <>
                        <button
                          onClick={() => {
                            handleStatusChange(selectedOrder._id, 'processing');
                            handleCloseModal();
                          }}
                          disabled={updatingOrderId === selectedOrder._id}
                          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {updatingOrderId === selectedOrder._id ? (
                            <Loader size={16} className="animate-spin" />
                          ) : (
                            <Truck size={16} />
                          )}
                          Process Order
                        </button>
                        <button
                          onClick={() => {
                            handleStatusChange(selectedOrder._id, 'cancelled');
                            handleCloseModal();
                          }}
                          disabled={updatingOrderId === selectedOrder._id}
                          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <XCircle size={16} />
                          Cancel Order
                        </button>
                      </>
                    )}
                    {selectedOrder.orderStatus === 'processing' && (
                      <>
                        <button
                          onClick={() => {
                            handleStatusChange(selectedOrder._id, 'shipped');
                            handleCloseModal();
                          }}
                          disabled={updatingOrderId === selectedOrder._id}
                          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {updatingOrderId === selectedOrder._id ? (
                            <Loader size={16} className="animate-spin" />
                          ) : (
                            <Truck size={16} />
                          )}
                          Mark as Shipped
                        </button>
                      </>
                    )}
                    {selectedOrder.orderStatus === 'shipped' && (
                      <button
                        onClick={() => {
                          handleStatusChange(selectedOrder._id, 'delivered');
                          handleCloseModal();
                        }}
                        disabled={updatingOrderId === selectedOrder._id}
                        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {updatingOrderId === selectedOrder._id ? (
                          <Loader size={16} className="animate-spin" />
                        ) : (
                          <CheckCircle size={16} />
                        )}
                        Mark as Delivered
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersManagement;