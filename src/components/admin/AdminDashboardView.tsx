import React from 'react';
import { Plant, Category, GalleryImage, Testimonial, Inquiry } from '../../types';
import { 
  Sprout, Tag, Image, MessageSquare, Mail, TrendingUp, 
  BarChart2, PieChart as PieIcon, CheckCircle2, Clock, Eye 
} from 'lucide-react';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, 
  CartesianGrid, PieChart, Pie, Cell, Legend, LineChart, Line 
} from 'recharts';

interface AdminDashboardViewProps {
  plants: Plant[];
  categories: Category[];
  gallery: GalleryImage[];
  testimonials: Testimonial[];
  inquiries: Inquiry[];
  onNavigateTab: (tab: any) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  plants,
  categories,
  gallery,
  testimonials,
  inquiries,
  onNavigateTab
}) => {
  const newInquiries = inquiries.filter(i => i.status === 'New');

  // Sales Trend Data (Dummy Wholesale Revenue Graph)
  const salesData = [
    { month: 'Feb', sales: 120000, orders: 18 },
    { month: 'Mar', sales: 185000, orders: 24 },
    { month: 'Apr', sales: 240000, orders: 32 },
    { month: 'May', sales: 310000, orders: 41 },
    { month: 'Jun', sales: 280000, orders: 36 },
    { month: 'Jul', sales: 390000, orders: 52 },
  ];

  // Category Pie Data
  const categoryData = categories.map(c => ({
    name: c.name,
    count: plants.filter(p => p.category.toLowerCase().includes(c.name.toLowerCase()) || c.name.toLowerCase().includes(p.category.toLowerCase())).length || 3
  }));

  const COLORS = ['#2E7D32', '#66BB6A', '#A5D6A7', '#43A047', '#1b5e20', '#81c784', '#388e3c', '#c8e6c9'];

  // Stock Graph Data
  const stockData = plants.slice(0, 6).map(p => ({
    name: p.name.split(' ')[0],
    stock: p.availability === 'In Stock' ? 120 : p.availability === 'Bulk Only' ? 45 : 15
  }));

  return (
    <div className="space-y-8">
      
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        <div 
          onClick={() => onNavigateTab('plants')}
          className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Total Plants</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#2E7D32] flex items-center justify-center">
              <Sprout className="w-5 h-5" />
            </div>
          </div>
          <div className="font-poppins font-bold text-2xl text-[#355E3B]">
            {plants.length}
          </div>
          <div className="text-[11px] text-emerald-600 font-medium">Active Nursery Inventory</div>
        </div>

        <div 
          onClick={() => onNavigateTab('categories')}
          className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Categories</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#2E7D32] flex items-center justify-center">
              <Tag className="w-5 h-5" />
            </div>
          </div>
          <div className="font-poppins font-bold text-2xl text-[#355E3B]">
            {categories.length}
          </div>
          <div className="text-[11px] text-emerald-600 font-medium">Plant Classifications</div>
        </div>

        <div 
          onClick={() => onNavigateTab('gallery')}
          className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Gallery Photos</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#2E7D32] flex items-center justify-center">
              <Image className="w-5 h-5" />
            </div>
          </div>
          <div className="font-poppins font-bold text-2xl text-[#355E3B]">
            {gallery.length}
          </div>
          <div className="text-[11px] text-emerald-600 font-medium">Farm Media Uploads</div>
        </div>

        <div 
          onClick={() => onNavigateTab('testimonials')}
          className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Reviews</span>
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>
          <div className="font-poppins font-bold text-2xl text-[#355E3B]">
            {testimonials.length}
          </div>
          <div className="text-[11px] text-amber-700 font-medium">⭐ 4.8 Average Rating</div>
        </div>

        <div 
          onClick={() => onNavigateTab('inquiries')}
          className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">New Inquiries</span>
            <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
          </div>
          <div className="font-poppins font-bold text-2xl text-rose-600">
            {newInquiries.length}
          </div>
          <div className="text-[11px] text-rose-600 font-medium">Pending Callbacks</div>
        </div>

      </div>

      {/* Recharts Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sales Trend Bar Chart */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-emerald-50">
            <div>
              <h3 className="font-poppins font-bold text-base text-[#355E3B] flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-[#2E7D32]" />
                <span>Monthly Wholesale Orders & Revenue</span>
              </h3>
              <p className="text-xs text-gray-500">Estimated sales volume at Huskur nursery location</p>
            </div>
            <span className="text-xs font-bold text-[#2E7D32] bg-emerald-50 px-2.5 py-1 rounded-full">
              +28% YoY Growth
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} tickFormatter={(v) => `₹${v / 1000}k`} />
                <Tooltip formatter={(val: any) => [`₹${val.toLocaleString('en-IN')}`, 'Wholesale Sales']} />
                <Bar dataKey="sales" fill="#2E7D32" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown Pie Chart */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm space-y-4">
          <div className="pb-2 border-b border-emerald-50">
            <h3 className="font-poppins font-bold text-base text-[#355E3B] flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-[#2E7D32]" />
              <span>Plant Stock Distribution</span>
            </h3>
            <p className="text-xs text-gray-500">Share of total nursery space by plant type</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="count"
                  label={({ name, percent }) => `${name.split(' ')[0]} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Recent Inquiries List Table */}
      <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
          <div>
            <h3 className="font-poppins font-bold text-base text-[#355E3B] flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#2E7D32]" />
              <span>Recent Customer Inquiries</span>
            </h3>
            <p className="text-xs text-gray-500">Latest website lead submissions</p>
          </div>
          <button
            onClick={() => onNavigateTab('inquiries')}
            className="text-xs font-semibold text-[#2E7D32] hover:underline flex items-center gap-1"
          >
            <span>View All Leads</span>
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-[#F8FFF5] text-[#355E3B] font-bold uppercase tracking-wider text-[10px] border-b border-emerald-100">
              <tr>
                <th className="p-3">Customer Name</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Requirement</th>
                <th className="p-3">Plant Type</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-50">
              {inquiries.slice(0, 5).map((inq) => (
                <tr key={inq.id} className="hover:bg-emerald-50/50">
                  <td className="p-3 font-bold text-[#355E3B]">{inq.name}</td>
                  <td className="p-3 font-semibold text-[#2E7D32]">{inq.phone}</td>
                  <td className="p-3">{inq.requirementType}</td>
                  <td className="p-3 font-medium">{inq.plantType || 'N/A'}</td>
                  <td className="p-3">{inq.quantity || 'N/A'}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                      inq.status === 'New'
                        ? 'bg-rose-100 text-rose-700'
                        : inq.status === 'In Touch'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {inq.status}
                    </span>
                  </td>
                  <td className="p-3 text-gray-400">{inq.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
