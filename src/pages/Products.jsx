import React, { useState } from 'react'
import { uesState, useEffect } from 'react'
import api from '../services/api'

const Products = () => {
    const [Products, setProduct] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        stock: ''
    });

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await api.get('/products');
            setProduct(response.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleChage = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post('/products', formData);

            setFormData({
                name: '',
                price: '',
                stock: ''
            })

            fetchProducts();
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <i className="bi bi-box-seam-fill text-green-600"></i>
                    จัดการข้อมูลสินค้า
                </h1>

                <form onSubmit={handleSubmit}>
                    <input type="name" name='name' value={formData.name} onChange={handleChage} placeholder='Name' required />
                    <input type="price" name='price' value={formData.price} onChange={handleChage} placeholder='Price' required />
                    <input type="stock" name='stock' value={formData.stock} onChange={handleChage} placeholder='Stock' required />
                    <button type='submit'>Confirm</button>
                </form>

                {!loading && !error && (
                    <table className="min-w-full border">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-4 py-2">ชื่อสินค้า</th>
                                <th className="border px-4 py-2">ราคา</th>
                                <th className="border px-4 py-2">คลังสินค้า</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Products.map(product => (
                                <tr key={product.id}>
                                    <td className='border px-4 py-2'>{product.name}</td>
                                    <td className='border px-4 py-2'>{product.price}</td>
                                    <td className='border px-4 py-2'>{product.stock}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-gray-700 flex items-center gap-2">
                        <i className="bi bi-info-circle-fill text-green-600"></i>
                        หน้านี้จะใช้สำหรับแสดงและจัดการข้อมูลสินค้าทั้งหมด
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Products