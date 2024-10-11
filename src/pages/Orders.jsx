import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FaBox } from "react-icons/fa";

const Orders = ({ url }) => {  
  const [orders, setOrders] = useState([]);  

  // Fetch Orders from the backend
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`); // Corrected API request
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Error fetching orders: " + response.data.message); // Display specific error message
      }
    } catch (error) {
      console.error("Error fetching orders:", error); // Log the error for debugging
      toast.error("Could not fetch orders. Please try again later."); // Show user-friendly error message
    }
  };

  const statusHandler = async (event, orderId) =>{
    // console.log(event, orderId)
    const response = await axios.post(url + "/api/order/status", {orderId,status:event.target.value})
    if(response.data.success){
      await fetchAllOrders()
    }
  }

  useEffect(() => {
      fetchAllOrders();
  }, [url]); // Include url as a dependency if it can change

  return (
    <section className='p-4 sm:p-10 w-full'>
      <div>
        <h4 className='bold-22 uppercase'>Order Page</h4>
        <div className='overflow-auto mt-5'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-slate-900/20 text-gray-30 regular-14 xs:regular-16 text-start py-12'>
                <th className='p-1 text-left hidden sm:table-cell'>Package</th>
                <th className='p-2 text-left'>Order</th>
                <th className='p-2 text-left'>Item</th>
                <th className='p-2 text-left'>Price</th>
                <th className='p-2 text-left'>Status</th>
                {/* <th className='p-2 text-left'>Remove</th> */}
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                <tr key={i} className='border-b-black border-slate-900/20 text-gray-50 p-6 medium-14 text-left'>
                  <td className='p-1 hidden sm:table-cell'><FaBox className='text-2xl text-secondary'/></td>
                  <td className='p-1'>
                    <div className='pb-2'>
                      <p>
                        {order.items.map((item, i) => (
                          i === order.items.length - 1
                          ? `${item.name} x ${item.quantity}`
                          : `${item.name} x ${item.quantity}, `
                        ))}
                      </p>
                    </div>
                    <hr className='w-2/3'/>
                    <div>
                      <h5 className='medium-15'>{`${order.address.firstName} ${order.address.lastName}`}</h5>
                      <div>
                        <p>{`${order.address.city}, ${order.address.county}, ${order.address.country}, ${order.address.zipcode}`}</p>
                      </div>
                      <p>{order.address.phone}</p>
                    </div>
                  </td>
                  <td className='p-1'>{order.items.length}</td>
                  <td className='p-1'>KSH{order.amount}</td>
                  <td className='p-1'>
                    <select onChange={(event)=>statusHandler(event, order._id)} value={order.status} className='bg-primary ring-1 ring-secondary text-sm max-w-20 xl:max-w-28'>
                      <option value="Product Loading">Product Loading</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Orders;
