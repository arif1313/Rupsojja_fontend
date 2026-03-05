import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, CheckCircle, XCircle, Truck, Loader } from 'lucide-react';
import { allOrder, updateOrderStatus } from '../api/ProductApi';

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  const statuses = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  useEffect(() => {
    fetchOrders();
  }, []);

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

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setUpdatingOrderId(orderId);
      
      // Call API to update order status
      const response = await updateOrderStatus(orderId, newStatus);
      
      // Update local state
      setOrders(orders.map(order => 
        order._id === orderId 
          ? { 
              ...order, 
              orderStatus: newStatus,
              ...(newStatus === 'delivered' ? { deliveredAt: new Date().toISOString() } : {})
            }
          : order
      ));

      // Update selected order if modal is open
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder({
          ...selectedOrder,
          orderStatus: newStatus,
          ...(newStatus === 'delivered' ? { deliveredAt: new Date().toISOString() } : {})
        });
      }

      // Show success message (you can add a toast notification here)
      console.log('Order status updated successfully');
      
    } catch (err) {
  
      alert('Failed to update order status. Please try again.');
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shippingAddress?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shippingAddress?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.orderStatus === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="animate-spin text-pink-600" size={48} />
        <span className="ml-3 text-gray-600">Loading orders...</span>
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
    <div>
      <h1 className="text-3xl font-bold mb-8">Orders Management</h1>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search orders by ID, customer name, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Order ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Customer</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Items</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Total</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Payment</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Date</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-pink-600">{order.orderNumber}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">{order.shippingAddress?.fullName}</p>
                      {/* <p className="text-sm text-gray-500">{order.shippingAddress?.email}</p> */}
                      <p className="text-sm text-gray-500">{order.shippingAddress?.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      {order.items?.slice(0, 2).map((item, idx) => (
                        <div key={idx}>
                          {item.name} x{item.quantity}
                        </div>
                      ))}
                      {order.items?.length > 2 && (
                        <div className="text-xs text-gray-400">+{order.items.length - 2} more</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold">${order.totalAmount?.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <select
                      value={order.orderStatus}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      disabled={updatingOrderId === order._id}
                      className={`px-2 py-1 text-xs rounded-full border-0 cursor-pointer font-medium ${getStatusColor(order.orderStatus)} ${
                        updatingOrderId === order._id ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    {updatingOrderId === order._id && (
                      <Loader size={12} className="animate-spin ml-2 inline" />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getPaymentStatusColor(order.paymentStatus)}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">{formatDate(order.orderDate)}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-blue-600 hover:text-blue-700 p-1 transition-colors"
                      disabled={updatingOrderId === order._id}
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No orders found</p>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Order Details - {selectedOrder.orderNumber}</h2>
                <button
                  onClick={() => setSelectedOrder(null)}
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
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(selectedOrder.orderStatus)}`}>
                      {selectedOrder.orderStatus}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm ${getPaymentStatusColor(selectedOrder.paymentStatus)}`}>
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
                          setSelectedOrder(null);
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
                          setSelectedOrder(null);
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
                          setSelectedOrder(null);
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
                        setSelectedOrder(null);
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
  );
};

export default OrdersManagement;