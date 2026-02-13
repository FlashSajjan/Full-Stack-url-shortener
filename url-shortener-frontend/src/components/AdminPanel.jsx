import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStoreContext } from '../contextApi/ContextApi';
import api from '../api/api';
import toast from 'react-hot-toast';
import Loader from './Loader';

const AdminPanel = () => {
    const { token } = useStoreContext();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [urls, setUrls] = useState([]);
    const [activeTab, setActiveTab] = useState('stats');

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        fetchData();
    }, [token, activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            if (activeTab === 'stats') {
                const { data } = await api.get('/api/admin/stats', { headers });
                setStats(data);
            } else if (activeTab === 'users') {
                const { data } = await api.get('/api/admin/users', { headers });
                setUsers(data);
            } else if (activeTab === 'urls') {
                const { data } = await api.get('/api/admin/urls', { headers });
                setUrls(data);
            }
        } catch (error) {
            console.error('Error fetching admin data:', error);
            if (error.response?.status === 403) {
                toast.error('Access denied. Admin privileges required.');
                navigate('/dashboard');
            } else {
                toast.error('Failed to fetch data');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        
        try {
            await api.delete(`/api/admin/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success('User deleted successfully');
            fetchData();
        } catch (error) {
            toast.error('Failed to delete user');
        }
    };

    const handleDeleteUrl = async (id) => {
        if (!window.confirm('Are you sure you want to delete this URL?')) return;
        
        try {
            await api.delete(`/api/admin/urls/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success('URL deleted successfully');
            fetchData();
        } catch (error) {
            toast.error('Failed to delete URL');
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="min-h-[calc(100vh-64px)] lg:px-14 sm:px-8 px-4 py-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-6">Admin Panel</h1>

            {/* Tabs */}
            <div className="flex gap-4 mb-6 border-b">
                <button
                    onClick={() => setActiveTab('stats')}
                    className={`px-4 py-2 font-semibold ${
                        activeTab === 'stats'
                            ? 'border-b-2 border-blue-500 text-blue-500'
                            : 'text-slate-600'
                    }`}
                >
                    Statistics
                </button>
                <button
                    onClick={() => setActiveTab('users')}
                    className={`px-4 py-2 font-semibold ${
                        activeTab === 'users'
                            ? 'border-b-2 border-blue-500 text-blue-500'
                            : 'text-slate-600'
                    }`}
                >
                    Users
                </button>
                <button
                    onClick={() => setActiveTab('urls')}
                    className={`px-4 py-2 font-semibold ${
                        activeTab === 'urls'
                            ? 'border-b-2 border-blue-500 text-blue-500'
                            : 'text-slate-600'
                    }`}
                >
                    All URLs
                </button>
            </div>

            {/* Stats Tab */}
            {activeTab === 'stats' && stats && (
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-blue-100 p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold text-blue-800">Total Users</h3>
                        <p className="text-4xl font-bold text-blue-600 mt-2">{stats.totalUsers}</p>
                    </div>
                    <div className="bg-green-100 p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold text-green-800">Total URLs</h3>
                        <p className="text-4xl font-bold text-green-600 mt-2">{stats.totalUrls}</p>
                    </div>
                    <div className="bg-purple-100 p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold text-purple-800">Total Clicks</h3>
                        <p className="text-4xl font-bold text-purple-600 mt-2">{stats.totalClicks}</p>
                    </div>
                </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-3 text-left">ID</th>
                                <th className="px-4 py-3 text-left">Username</th>
                                <th className="px-4 py-3 text-left">Email</th>
                                <th className="px-4 py-3 text-left">Role</th>
                                <th className="px-4 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="border-t">
                                    <td className="px-4 py-3">{user.id}</td>
                                    <td className="px-4 py-3">{user.username}</td>
                                    <td className="px-4 py-3">{user.email}</td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 rounded text-xs ${
                                            user.role === 'ROLE_ADMIN' 
                                                ? 'bg-red-100 text-red-800' 
                                                : 'bg-blue-100 text-blue-800'
                                        }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => handleDeleteUser(user.id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* URLs Tab */}
            {activeTab === 'urls' && (
                <div className="bg-white rounded-lg shadow overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-3 text-left">ID</th>
                                <th className="px-4 py-3 text-left">Short URL</th>
                                <th className="px-4 py-3 text-left">Original URL</th>
                                <th className="px-4 py-3 text-left">Owner</th>
                                <th className="px-4 py-3 text-left">Clicks</th>
                                <th className="px-4 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {urls.map((url) => (
                                <tr key={url.id} className="border-t">
                                    <td className="px-4 py-3">{url.id}</td>
                                    <td className="px-4 py-3 font-mono text-blue-600">{url.shortUrl}</td>
                                    <td className="px-4 py-3 max-w-xs truncate">{url.originalUrl}</td>
                                    <td className="px-4 py-3">{url.username}</td>
                                    <td className="px-4 py-3">{url.clickCount}</td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => handleDeleteUrl(url.id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
