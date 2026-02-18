import React, { useState } from 'react';
import { Search, Filter, Eye, CheckCircle, XCircle, Truck } from 'lucide-react';

const OrdersManagement = () => {
  const [orders, setOrders] = useState([
    {
      id: 'ORD001',
      customer: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
      },
      items: [
        { name: 'Diamond Necklace', quantity: 1, price: 299.99 },
        { name: 'Gold Earrings', quantity: 2, price: 149.99 },
      ],
      total: 599.97,
      status: 'pending',
      paymentMethod: 'Credit Card',
      shippingAddress: '123 Main St, New York, NY 10001',
      orderDate: '2024-01-15',
      deliveryDate: null,
    },
    {
      id: 'ORD002',
      customer: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+0987654321',
      },
      items: [
        { name: 'Summer Dress', quantity: 1, price: 89.99 },
      ],
      total: 89.99,
      status: 'processing',
      paymentMethod: 'PayPal',
      shippingAddress: '456 Oak Ave, Los Angeles, CA 90001',
      orderDate: '2024-01-14',
      deliveryDate: null,
    },
    {
      id: 'ORD003',
      customer: {
        name: 'Bob Johnson',
        email: 'bob@example.com',
        phone: '+1122334455',
      },
      items: [
        { name: 'Designer Handbag', quantity: 1, price: 249.99 },
        { name: 'Silk Blouse', quantity: 2, price: 79.99 },
      ],
      total: 409.97,
      status: 'delivered',
      paymentMethod: 'Credit Card',
      shippingAddress: '789 Pine St, Chicago, IL 60007',
      orderDate: '2024-01-13',
      deliveryDate: '2024-01-16',
    },
    {
      id: 'ORD004',
      customer: {
        name: 'Alice Brown',
        email: 'alice@example.com',
        phone: '+5566778899',
      },
      items: [
        { name: 'Pearl Bracelet', quantity: 1, price: 129.99 },
      ],
      total: 129.99,
      status: 'cancelled',
      paymentMethod: 'PayPal',
      shippingAddress: '321 Elm St, Miami, FL 33101',
      orderDate: '2024-01-12',
      deliveryDate: null,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const statuses = ['all', 'pending', 'processing', 'delivered', 'cancelled'];

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus, deliveryDate: newStatus === 'delivered' ? new Date().toISOString().split('T')[0] : null }
        : order
    ));
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

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
              className="border rounded-lg px-4 py-2"
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
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Date</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{order.id}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">{order.customer.name}</p>
                      <p className="text-sm text-gray-500">{order.customer.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      {order.items.map((item, idx) => (
                        <div key={idx}>
                          {item.name} x{item.quantity}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className={`px-2 py-1 text-xs rounded-full border-0 ${getStatusColor(order.status)}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm">{order.orderDate}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-blue-600 hover:text-blue-700 p-1"
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
                <h2 className="text-2xl font-bold">Order Details - {selectedOrder.id}</h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Customer Info */}
                <div className="border-b pb-4">
                  <h3 className="font-semibold mb-2">Customer Information</h3>
                  <p><span className="text-gray-600">Name:</span> {selectedOrder.customer.name}</p>
                  <p><span className="text-gray-600">Email:</span> {selectedOrder.customer.email}</p>
                  <p><span className="text-gray-600">Phone:</span> {selectedOrder.customer.phone}</p>
                </div>

                {/* Shipping Info */}
                <div className="border-b pb-4">
                  <h3 className="font-semibold mb-2">Shipping Address</h3>
                  <p>{selectedOrder.shippingAddress}</p>
                </div>

                {/* Order Items */}
                <div className="border-b pb-4">
                  <h3 className="font-semibold mb-2">Order Items</h3>
                  <table className="w-full">
                    <thead>
                      <tr className="text-sm text-gray-600">
                        <th className="text-left">Product</th>
                        <th className="text-left">Qty</th>
                        <th className="text-left">Price</th>
                        <th className="text-left">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map((item, idx) => (
                        <tr key={idx}>
                          <td>{item.name}</td>
                          <td>{item.quantity}</td>
                          <td>${item.price.toFixed(2)}</td>
                          <td>${(item.quantity * item.price).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="border-t font-bold">
                      <tr>
                        <td colSpan="3" className="text-right pt-2">Total:</td>
                        <td className="pt-2">${selectedOrder.total.toFixed(2)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* Order Status */}
                <div>
                  <h3 className="font-semibold mb-2">Order Status</h3>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(selectedOrder.status)}`}>
                      {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                    </span>
                    <span className="text-sm text-gray-600">
                      Ordered on: {selectedOrder.orderDate}
                    </span>
                    {selectedOrder.deliveryDate && (
                      <span className="text-sm text-gray-600">
                        Delivered on: {selectedOrder.deliveryDate}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t">
                  {selectedOrder.status === 'pending' && (
                    <>
                      <button
                        onClick={() => {
                          handleStatusChange(selectedOrder.id, 'processing');
                          setSelectedOrder(null);
                        }}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                      >
                        <Truck size={16} />
                        Process Order
                      </button>
                      <button
                        onClick={() => {
                          handleStatusChange(selectedOrder.id, 'cancelled');
                          setSelectedOrder(null);
                        }}
                        className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                      >
                        <XCircle size={16} />
                        Cancel Order
                      </button>
                    </>
                  )}
                  {selectedOrder.status === 'processing' && (
                    <button
                      onClick={() => {
                        handleStatusChange(selectedOrder.id, 'delivered');
                        setSelectedOrder(null);
                      }}
                      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                      <CheckCircle size={16} />
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