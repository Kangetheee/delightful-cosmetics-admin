import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for the toast notifications
import { TbTrash } from 'react-icons/tb'

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  const fetchList = async () => {
    try {
      setLoading(true); // Set loading to true before fetching
      const response = await axios.get(`${url}/api/product/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Failed to fetch product list");
      }
    } catch (error) {
      toast.error("An error occurred while fetching the list");
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  }

  const handleRemove = async (id) => {
    if (!id) {
      toast.error("Invalid product ID");
      return;
    }

    try {
      const response = await axios.post(`${url}/api/product/remove`, { id });
      if (response.data.success) {
        toast.success("Product removed successfully");
        setList(list.filter(product => product._id !== id));
      } else {
        toast.error("Failed to remove product");
      }
    } catch (error) {
      toast.error("An error occurred while removing the product");
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <section className="p-4 sm:p-10 box-border w-full">
      <ToastContainer />
      <h4 className='bold-22 uppercase'>Product List</h4>
      <div className='overflow-auto mt-5'>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-slate-900/20 text-gray-30 regular-14 xs:regular-16 text-start py-12'>
              <th className='p-1 text-left'>Product Image</th>
              <th className='p-1 text-left'>Title</th>
              <th className='p-1 text-left'>Price</th>
              <th className='p-1 text-left'>Remove</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center">Loading...</td>
              </tr>
            ) : (
              list.length > 0 ? (
                list.map((product) => (
                  <tr key={product._id} className='border-b border-slate-900/20 text-gray-50 p-6 medium-14'>
                    <td className='p-1'>
                      <img 
                        src={`${url}/images/` + product.image} 
                        height={38} 
                        width={38} 
                        alt={product.name} 
                        className='rounded-lg ring-1 ring-slate-900/5 m-1'
                        onError={(e) => e.target.src = 'path/to/placeholder-image.jpg'} // Replace with a valid placeholder image path
                      />
                    </td>
                    <td className='p-1'><div className='line-clamp-3'>{product.name}</div></td>
                    <td className='p-1'>Ksh {product.price}</td>
                    <td className='p-1'>
                      <button 
                        onClick={() => handleRemove(product._id)} 
                        className='text-purple-600 hover:text-red-800'
                        aria-label={`Remove ${product.name}`} // Adds accessibility
                      >
                        <div className='bold-22'><TbTrash /></div>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">No products available</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default List;
