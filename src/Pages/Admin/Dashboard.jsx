import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaUsers, FaCalendarAlt, FaEnvelope, FaMoneyBillWave,
  FaCheckCircle, FaTimesCircle, FaHourglassHalf,
} from 'react-icons/fa';
import { adminAPI } from '../../services/api';

const formatDate = (d) =>
  new Date(d + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
const formatDateTime = (d) =>
  new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

const STATUS_BADGE = {
  Pending: 'bg-yellow-100 text-yellow-800',
  Confirmed: 'bg-blue-100 text-blue-800',
  Completed: 'bg-green-100 text-green-800',
  Cancelled: 'bg-red-100 text-red-800',
  New: 'bg-red-100 text-red-800',
  Read: 'bg-yellow-100 text-yellow-800',
  Replied: 'bg-green-100 text-green-800',
};

const StatCard = ({ icon, label, value, color, sub }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
    className='bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4 border border-gray-100 hover:shadow-md transition'
  >
    <div className={'w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl flex-shrink-0 ' + color}>
      {icon}
    </div>
    <div className='min-w-0'>
      <p className='text-2xl font-extrabold text-gray-800'>{value?.toLocaleString?.() ?? value}</p>
      <p className='text-sm text-gray-500 truncate'>{label}</p>
      {sub && <p className='text-xs text-teal-600 font-medium mt-0.5'>{sub}</p>}
    </div>
  </motion.div>
);

const Spinner = () => (
  <div className='flex items-center justify-center h-64 text-teal-600'>
    <svg className='animate-spin h-8 w-8 mr-3' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
      <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
      <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v8H4z' />
    </svg>
    Loading dashboard...
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentAppts, setRecentAppts] = useState([]);
  const [recentMsgs, setRecentMsgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    adminAPI.getStats()
      .then((res) => {
        setStats(res.data.stats);
        setRecentAppts(res.data.recentAppointments || []);
        setRecentMsgs(res.data.recentMessages || []);
      })
      .catch((err) => setError(err?.response?.data?.message || 'Failed to load stats'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner />;
  if (error) return <div className='bg-red-50 border border-red-200 text-red-700 rounded-xl p-4'>{error}</div>;

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-2xl font-extrabold text-gray-800'>Dashboard</h1>
        <p className='text-gray-500 text-sm mt-0.5'>Overview of MindCare Bangladesh</p>
      </div>

      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
        <StatCard icon={<FaUsers />} label='Total Users' value={stats?.totalUsers} color='bg-blue-500' />
        <StatCard icon={<FaCalendarAlt />} label='Total Appointments' value={stats?.totalAppointments} color='bg-teal-600'
          sub={(stats?.todayAppointments ?? 0) + ' today'} />
        <StatCard icon={<FaEnvelope />} label='New Messages' value={stats?.newMessages} color='bg-yellow-500'
          sub={(stats?.totalMessages ?? 0) + ' total'} />
        <StatCard icon={<FaMoneyBillWave />} label='Total Revenue'
          value={'\u09F3' + (stats?.totalRevenue || 0).toLocaleString()} color='bg-green-600' />
      </div>

      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
        <StatCard icon={<FaHourglassHalf />} label='Pending' value={stats?.pendingAppointments} color='bg-yellow-400' />
        <StatCard icon={<FaCheckCircle />} label='Confirmed' value={stats?.confirmedAppointments} color='bg-blue-500' />
        <StatCard icon={<FaCheckCircle />} label='Completed' value={stats?.completedAppointments} color='bg-green-500' />
        <StatCard icon={<FaTimesCircle />} label='Cancelled' value={stats?.cancelledAppointments} color='bg-red-500' />
      </div>

      <div className='grid grid-cols-1 xl:grid-cols-3 gap-6'>
        <div className='xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
          <div className='flex items-center justify-between px-5 py-4 border-b border-gray-100'>
            <h2 className='font-bold text-gray-800'>Recent Appointments</h2>
            <Link to='/admin/appointments' className='text-teal-600 text-sm font-semibold hover:underline'>View All &rarr;</Link>
          </div>
          <div className='overflow-x-auto'>
            <table className='w-full text-sm'>
              <thead className='bg-gray-50 text-gray-500 text-xs uppercase'>
                <tr>
                  <th className='px-4 py-3 text-left'>Patient</th>
                  <th className='px-4 py-3 text-left'>Doctor</th>
                  <th className='px-4 py-3 text-left'>Date</th>
                  <th className='px-4 py-3 text-left'>Status</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-50'>
                {recentAppts.map((a) => (
                  <tr key={a.id} className='hover:bg-gray-50 transition'>
                    <td className='px-4 py-3'>
                      <p className='font-semibold text-gray-800'>{a.patient_name}</p>
                      <p className='text-gray-400 text-xs'>{a.patient_mobile}</p>
                    </td>
                    <td className='px-4 py-3'>
                      <p className='font-medium text-gray-700'>{a.doctor_name}</p>
                      <p className='text-gray-400 text-xs'>{a.doctor_role}</p>
                    </td>
                    <td className='px-4 py-3 text-gray-600 whitespace-nowrap'>{formatDate(a.appointment_date)}</td>
                    <td className='px-4 py-3'>
                      <span className={STATUS_BADGE[a.status] + ' px-2.5 py-1 rounded-full text-xs font-semibold'}>
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {recentAppts.length === 0 && <p className='text-center py-8 text-gray-400 text-sm'>No appointments yet</p>}
          </div>
        </div>

        <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
          <div className='flex items-center justify-between px-5 py-4 border-b border-gray-100'>
            <h2 className='font-bold text-gray-800'>Recent Messages</h2>
            <Link to='/admin/messages' className='text-teal-600 text-sm font-semibold hover:underline'>View All &rarr;</Link>
          </div>
          <div className='divide-y divide-gray-50'>
            {recentMsgs.map((m) => (
              <div key={m.id} className='px-5 py-3 hover:bg-gray-50 transition'>
                <div className='flex items-start justify-between gap-2'>
                  <div className='min-w-0'>
                    <p className='font-semibold text-gray-800 text-sm truncate'>{m.name}</p>
                    <p className='text-gray-500 text-xs truncate'>{m.subject}</p>
                    <p className='text-gray-400 text-xs mt-0.5'>{formatDateTime(m.created_at)}</p>
                  </div>
                  <span className={STATUS_BADGE[m.status] + ' px-2 py-0.5 rounded-full text-xs font-semibold flex-shrink-0'}>
                    {m.status}
                  </span>
                </div>
              </div>
            ))}
            {recentMsgs.length === 0 && <p className='text-center py-8 text-gray-400 text-sm'>No messages yet</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
