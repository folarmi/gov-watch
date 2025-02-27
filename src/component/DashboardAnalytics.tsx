// import { useState } from "react";
// import {
//   ChartBarIcon,
//   UsersIcon,
//   ShoppingCartIcon,
//   CurrencyDollarIcon,
// } from "@heroicons/react/24/outline"; // Heroicons for icons
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts"; // Recharts for charts

// const Dashboard = () => {
//   // Mock data for the line chart
//   const [chartData] = useState([
//     { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
//     { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
//     { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
//     { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
//     { name: "May", uv: 1890, pv: 4800, amt: 2181 },
//     { name: "Jun", uv: 2390, pv: 3800, amt: 2500 },
//     { name: "Jul", uv: 3490, pv: 4300, amt: 2100 },
//   ]);

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold text-gray-800 mb-6">
//         Dashboard Analytics
//       </h1>

//       {/* Key Metrics Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {/* Total Users */}
//         <div className="bg-white p-6 rounded-lg shadow-sm flex items-center space-x-4">
//           <div className="p-3 bg-blue-50 rounded-full">
//             <UsersIcon className="h-6 w-6 text-blue-500" />
//           </div>
//           <div>
//             <p className="text-gray-500 text-sm">Total Users</p>
//             <p className="text-2xl font-bold text-gray-800">12,345</p>
//           </div>
//         </div>

//         {/* Total Sales */}
//         <div className="bg-white p-6 rounded-lg shadow-sm flex items-center space-x-4">
//           <div className="p-3 bg-green-50 rounded-full">
//             <ShoppingCartIcon className="h-6 w-6 text-green-500" />
//           </div>
//           <div>
//             <p className="text-gray-500 text-sm">Total Sales</p>
//             <p className="text-2xl font-bold text-gray-800">$45,678</p>
//           </div>
//         </div>

//         {/* Revenue */}
//         <div className="bg-white p-6 rounded-lg shadow-sm flex items-center space-x-4">
//           <div className="p-3 bg-purple-50 rounded-full">
//             <CurrencyDollarIcon className="h-6 w-6 text-purple-500" />
//           </div>
//           <div>
//             <p className="text-gray-500 text-sm">Revenue</p>
//             <p className="text-2xl font-bold text-gray-800">$23,456</p>
//           </div>
//         </div>

//         {/* Active Projects */}
//         <div className="bg-white p-6 rounded-lg shadow-sm flex items-center space-x-4">
//           <div className="p-3 bg-yellow-50 rounded-full">
//             <ChartBarIcon className="h-6 w-6 text-yellow-500" />
//           </div>
//           <div>
//             <p className="text-gray-500 text-sm">Active Projects</p>
//             <p className="text-2xl font-bold text-gray-800">56</p>
//           </div>
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Line Chart */}
//         <div className="bg-white p-6 rounded-lg shadow-sm">
//           <h2 className="text-lg font-semibold text-gray-800 mb-4">
//             Sales Overview
//           </h2>
//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={chartData}>
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line
//                   type="monotone"
//                   dataKey="uv"
//                   stroke="#3b82f6"
//                   strokeWidth={2}
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="pv"
//                   stroke="#10b981"
//                   strokeWidth={2}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Bar Chart Placeholder */}
//         <div className="bg-white p-6 rounded-lg shadow-sm">
//           <h2 className="text-lg font-semibold text-gray-800 mb-4">
//             User Engagement
//           </h2>
//           <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
//             <p className="text-gray-500">Bar Chart Placeholder</p>
//           </div>
//         </div>
//       </div>

//       {/* Recent Activity Table */}
//       <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
//         <h2 className="text-lg font-semibold text-gray-800 mb-4">
//           Recent Activity
//         </h2>
//         <table className="w-full">
//           <thead>
//             <tr className="text-left text-gray-500 border-b">
//               <th className="py-2">User</th>
//               <th className="py-2">Action</th>
//               <th className="py-2">Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr className="border-b">
//               <td className="py-3">John Doe</td>
//               <td className="py-3">Logged In</td>
//               <td className="py-3">2023-10-01</td>
//             </tr>
//             <tr className="border-b">
//               <td className="py-3">Jane Smith</td>
//               <td className="py-3">Updated Profile</td>
//               <td className="py-3">2023-10-02</td>
//             </tr>
//             <tr className="border-b">
//               <td className="py-3">Mike Johnson</td>
//               <td className="py-3">Made a Purchase</td>
//               <td className="py-3">2023-10-03</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
