import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "@/assets/assets";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (token) {
      loadOrderData();
    }
  }, [token]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["Date"] = order.Date;
            allOrdersItem.push(item);
          });
        });

        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handleTrackOrder = (order) => {
    loadOrderData();
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedOrder(null);
  };

  const renderOrderStatus = (order) => {
    const orderDate = new Date(order.Date);
    let message = "";
    let imageUrl = "";

    switch (order.status) {
      case "Order Placed": {
        const expectedDate1 = new Date(orderDate);
        expectedDate1.setDate(orderDate.getDate() + 7);
        message = `Order will be delivered within 7 days (Expected delivery date: ${expectedDate1.toDateString()})`;
        imageUrl = assets.orderplaced;
        break;
      }
      case "Shipped": {
        const expectedDate2 = new Date(orderDate);
        expectedDate2.setDate(orderDate.getDate() + 4);
        message = `Order shipped and will be delivered in 2-3 days (Expected delivery date: ${expectedDate2.toDateString()})`;
        imageUrl = assets.orderShipped;
        break;
      }
      case "Out for Delivery":
        message = "Order is out for delivery & it will be delivered by today.";
        imageUrl = assets.outfordelivery;
        break;
      case "Delivered":
        message = "Order delivered.";
        imageUrl = assets.delivered;
        break;
      default:
        message = "Unknown status.";
        imageUrl = assets.noOrder;
        break;
    }

    return (
      <div className="text-center">
        <img src={imageUrl} alt={order.status} className="w-11 mx-auto mb-4" />
        <p className="text-gray-600 text-xs">{message}</p>
      </div>
    );
  };

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      <div>
        {orderData.length === 0 ? (
          <div className="text-center py-20">
            <img
              src={assets.noOrder} // Replace with the actual image path
              alt="Empty Order"
              className="mx-auto w-20"
            />
            <p className="mt-4 text-gray-600">No Orders Found</p>
          </div>
        ) : (
          orderData.map((item, index) => (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex items-start gap-6 text-sm">
                {item.image && item.image.length > 0 && (
                  <img
                    className="w-16 sm:w-20"
                    src={`http://localhost:4000${item.image}`}
                    alt="product"
                  />
                )}
                <div>
                  <p className="sm:text-base font-bold">{item.prodname}</p>
                  <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                    <p>
                      {currency}
                      {item.price}
                    </p>
                    <p>Quantity : {item.quantity || 1}</p>
                  </div>
                  <p className="mt-1">
                    Date :
                    <span className="text-gray-400">
                      {new Date(item.Date).toDateString()}
                    </span>
                  </p>
                  <p className="mt-1">
                    Payment :
                    <span className="text-gray-400">{item.paymentMethod}</span>
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p className="text-sm md:text-base">{item.status}</p>
                </div>
                <button
                  onClick={() => handleTrackOrder(item)}
                  className="border px-4 py-2 text-sm font-medium rounded-sm"
                >
                  Track Order
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Dialog */}
      {isDialogOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 shadow-lg w-11/12 max-w-lg rounded-[8px]">
            <button
              onClick={closeDialog}
              className="flex w-[100%] justify-end text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            {renderOrderStatus(selectedOrder)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
