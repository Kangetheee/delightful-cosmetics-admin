import React, { useState } from 'react'
import upload_area from '../assets/upload_area1.svg'
import { FaPlus } from 'react-icons/fa6'
import axios from "axios"
import { toast } from 'react-toastify'


const Add = ({url}) => {
    // const url = "http://localhost:4000"
    const [image, setImage] = useState(null)
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Women" // Default category
    })

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImage(file)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("category", data.category);
        formData.append("image", image); // Use the image state directly

        try {
            const response = await axios.post(`${url}/api/product/add`, formData);
            if (response.data.success) {
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "Women" // Resetting to default category
                });
                setImage(null); // Reset image state
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error("Error uploading product:", error);
        }
    }

    return (
        <section className='p-4 sm:p-10 w-full bg-white/20'>
            <form className='flex flex-col gap-y-5 max-w-[555px]' onSubmit={handleSubmit}>
                <h4 className='bold-22 pb-2 uppercase'>Products Upload</h4>
                <div className='flex flex-col gap-y-2 max-w-24 h-24'>
                    <p>Upload Image</p>
                    <label htmlFor='image'>
                        <img src={image ? URL.createObjectURL(image) : upload_area} alt='' className='h-20' />
                    </label>
                    <input onChange={handleImageChange} type='file' id='image' hidden required />
                </div>
                <div className='flex flex-col gap-y-2'>
                    <p>Product Name</p>
                    <input 
                        type='text' 
                        name='name' 
                        value={data.name}
                        onChange={handleChange}
                        placeholder='Type Here ...' 
                        className='ring-1 ring-slate-900/10 py-1 px-3 outline-none' 
                    />
                </div>
                <div className='flex flex-col gap-y-2'>
                    <p>Product Description</p>
                    <textarea 
                        name='description' 
                        rows={'6'} 
                        value={data.description}
                        onChange={handleChange}
                        placeholder='Write item description' 
                        required 
                        className='ring-1 ring-slate-900/10 py-1 px-3 outline-none resize-none'
                    ></textarea>
                </div>
                <div className='flex items-center gap-x-6 text-gray-900/70 medium-15'>
                    <div className='flex flex-col gap-y-2'>
                        <p>Product Category</p>
                        <select 
                            name='category' 
                            value={data.category}
                            onChange={handleChange}
                            className='outline-none ring-1 ring-slate-900/10 pl-2'
                        >
                            <option value="Women">Women</option>
                            <option value="Men">Men</option>
                            <option value="Kids">Kids</option>
                            <option value="Unisex">Unisex</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-y-2'>
                        <p>Product Price</p>
                        <input 
                            type='number' 
                            name='price' 
                            value={data.price}
                            onChange={handleChange}
                            placeholder='Kshs 2000' 
                            className='ring-1 ring-slate-900/10 pl-2 w-24 outline-none' 
                        />
                    </div>
                </div>
                <button type='submit' className='btn-dark sm:w-5/12 flexCenter gap-x-2 !py-2 rounded'>
                    <FaPlus />
                    Add Products
                </button>
            </form>
        </section>
    )
}

export default Add;
