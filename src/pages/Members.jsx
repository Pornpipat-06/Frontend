import React, { useState } from 'react'
import { uesState, useEffect } from 'react'
import api from '../services/api'

const Members = () => {
    const [members, setMembers] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    const fetchMembers = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await api.get('/members');
            setMembers(response.data.data);
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
            await api.post('/members', formData);

            setFormData({
                firstName: '',
                lastName: '',
                email: ''
            })

            fetchMembers();
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchMembers();
    }, []);

    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <i className="bi bi-people-fill text-blue-600"></i>
                        จัดการข้อมูลสมาชิก
                    </h1>

                    <form
                        onSubmit={handleSubmit}
                        className="mb-8 p-6 border border-gray-200 rounded-lg bg-gray-50 shadow-sm"
                    >
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">
                            เพิ่มสมาชิก
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    ชื่อ
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChage}
                                    placeholder="First Name"
                                    required
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    นามสกุล
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChage}
                                    placeholder="Last Name"
                                    required
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    อีเมล
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChage}
                                    placeholder="Email"
                                    required
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="mt-6 text-right">
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition"
                            >
                                Confirm
                            </button>
                        </div>
                    </form>

                    {loading && <p>Loading....</p>}

                    {error && (
                        <p className='text-red-600'>{error}</p>
                    )}

                    {!loading && !error && (
                        <table className="min-w-full border">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border px-4 py-2">ID</th>
                                    <th className="border px-4 py-2">ชื่อ</th>
                                    <th className="border px-4 py-2">นามสกุล</th>
                                    <th className="border px-4 py-2">อีเมล</th>
                                </tr>
                            </thead>
                            <tbody>
                                {members.map(member => (
                                    <tr key={member.id}>
                                        <td className='border px-4 py-2'>{member.id}</td>
                                        <td className='border px-4 py-2'>{member.firstName}</td>
                                        <td className='border px-4 py-2'>{member.lastName}</td>
                                        <td className='border px-4 py-2'>{member.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-gray-700 flex items-center gap-2">
                            <i className="bi bi-info-circle-fill text-blue-600"></i>
                            หน้านี้จะใช้สำหรับแสดงและจัดการข้อมูลสมาชิกทั้งหมด
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Members