import React, { useState } from 'react'
import { uesState, useEffect } from 'react'
import api from '../services/api'

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [formData, setFormData] = useState({
        orderNumber: '',
        customerName: '',
        email: '',
        phone: '',
        totalAmount: ''
    });

    const fetchOrders = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await api.get('/orders');
            setOrders(response.data.data);
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
            await api.post('/orders', formData);

            setFormData({
                customerName: '',
                email: '',
                phone: '',
                totalAmount: ''
            })

            fetchOrders();
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <i className="bi bi-cart-fill text-orange-600"></i>
                    จัดการคำสั่งซื้อ
                </h1>

                <form onSubmit={handleSubmit}>
                    <input type="customerName" name='customerName' value={formData.customerName} onChange={handleChage} placeholder='CustomerName' required />
                    <input type="email" name='email' value={formData.email} onChange={handleChage} placeholder='Email' required />
                    <input type="phone" name='phone' value={formData.phone} onChange={handleChage} placeholder='Phone' required />
                    <input type="totalAmount" name='totalAmount' value={formData.totalAmount} onChange={handleChage} placeholder='TotalAmount' required />
                    <button type='submit'>Confirm</button>
                </form>

                {loading && <p>Loading....</p>}

                {error && (
                    <p className='text-red-600'>{error}</p>
                )}

                {!loading && !error && (
                    <table className="min-w-full border">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-4 py-2">ชื่อ</th>
                                <th className="border px-4 py-2">อีเมล</th>
                                <th className="border px-4 py-2">เบอร์โทรศัพท์</th>
                                <th className="border px-4 py-2">ยอดรวมทั้งหมด</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id}>
                                    <td className='border px-4 py-2'>{order.customerName}</td>
                                    <td className='border px-4 py-2'>{order.email}</td>
                                    <td className='border px-4 py-2'>{order.phone}</td>
                                    <td className='border px-4 py-2'>{order.totalAmount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <p className="text-gray-700 flex items-center gap-2">
                        <i className="bi bi-info-circle-fill text-orange-600"></i>
                        หน้านี้จะใช้สำหรับแสดงและจัดการคำสั่งซื้อทั้งหมด
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Orders