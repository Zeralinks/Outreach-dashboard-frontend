import { useState, useEffect, useRef } from 'react';
import {
  Grid, List, Search, Filter, Send, Mic, Award, XCircle, Globe, Building, Music, Package, Film, Users, Apple, Twitter,
  MapPin, Calendar, X, DollarSign, Link, MailOpen, FileText, Download, Edit, Trash2, Upload, Plus, ChevronDown, MoreHorizontal, User
} from 'lucide-react';
import * as echarts from 'echarts';

const JobTracker = () => {
  const [viewDropdownOpen, setViewDropdownOpen] = useState(false);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [jobDetailsOpen, setJobDetailsOpen] = useState(false);
  const [jobModalOpen, setJobModalOpen] = useState(false);
  const [draggedCard, setDraggedCard] = useState(null);
  const applicationStatusChartRef = useRef(null);
  const applicationTrendChartRef = useRef(null);

  const jobs = [
    { id: 'job1', title: 'Senior Frontend Engineer', company: 'Google', status: 'applied', location: 'Remote', date: 'July 1, 2025', icon: Globe, statusColor: 'bg-blue-100 text-blue-800' },
    { id: 'job2', title: 'Product Designer', company: 'Microsoft', status: 'applied', location: 'Seattle, WA', date: 'June 28, 2025', icon: Building, statusColor: 'bg-blue-100 text-blue-800' },
    { id: 'job3', title: 'UX Researcher', company: 'Spotify', status: 'applied', location: 'Remote', date: 'June 25, 2025', icon: Music, statusColor: 'bg-blue-100 text-blue-800' },
    { id: 'job4', title: 'Software Development Engineer', company: 'Amazon', status: 'interview', location: 'Remote', date: 'July 5, 2025', icon: Package, statusColor: 'bg-purple-100 text-purple-800', subStatus: 'Technical Interview' },
    { id: 'job5', title: 'UI/UX Designer', company: 'Netflix', status: 'interview', location: 'Los Angeles, CA', date: 'July 3, 2025', icon: Film, statusColor: 'bg-purple-100 text-purple-800', subStatus: 'Screening' },
    { id: 'job6', title: 'Product Manager', company: 'Meta', status: 'offer', location: 'Menlo Park, CA', date: 'July 10, 2025', icon: Users, statusColor: 'bg-green-100 text-green-800', subStatus: 'Offer Received' },
    { id: 'job7', title: 'iOS Developer', company: 'Apple', status: 'rejected', location: 'Cupertino, CA', date: 'June 20, 2025', icon: Apple, statusColor: 'bg-red-100 text-red-800' },
    { id: 'job8', title: 'Backend Engineer', company: 'Twitter', status: 'rejected', location: 'San Francisco, CA', date: 'June 15, 2025', icon: Twitter, statusColor: 'bg-red-100 text-red-800' },
  ];

  useEffect(() => {
    // Initialize Application Status Chart
    const statusChart = echarts.init(applicationStatusChartRef.current);
    const statusOption = {
      animation: false,
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        textStyle: { color: '#1f2937' },
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 'center',
        textStyle: { color: '#1f2937' },
      },
      series: [
        {
          name: 'Application Status',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: { borderRadius: 8, borderColor: '#fff', borderWidth: 2 },
          label: { show: false },
          emphasis: { label: { show: false } },
          labelLine: { show: false },
          data: [
            { value: 12, name: 'Applied', itemStyle: { color: 'rgba(87, 181, 231, 1)' } },
            { value: 5, name: 'Interview', itemStyle: { color: 'rgba(141, 211, 199, 1)' } },
            { value: 2, name: 'Offer', itemStyle: { color: 'rgba(251, 191, 114, 1)' } },
            { value: 3, name: 'Rejected', itemStyle: { color: 'rgba(252, 141, 98, 1)' } },
          ],
        },
      ],
    };
    statusChart.setOption(statusOption);

    // Initialize Application Trend Chart
    const trendChart = echarts.init(applicationTrendChartRef.current);
    const trendOption = {
      animation: false,
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        textStyle: { color: '#1f2937' },
      },
      grid: { left: 0, right: 0, top: 10, bottom: 30, containLabel: true },
      xAxis: {
        type: 'category',
        data: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
        axisLine: { lineStyle: { color: '#e5e7eb' } },
        axisLabel: { color: '#1f2937' },
      },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: '#f3f4f6' } },
        axisLabel: { color: '#1f2937' },
      },
      series: [
        {
          name: 'Applications',
          type: 'line',
          smooth: true,
          showSymbol: false,
          data: [3, 5, 4, 7, 3],
          lineStyle: { width: 3, color: 'rgba(87, 181, 231, 1)' },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(87, 181, 231, 0.2)' },
                { offset: 1, color: 'rgba(87, 181, 231, 0.01)' },
              ],
            },
          },
        },
        {
          name: 'Interviews',
          type: 'line',
          smooth: true,
          showSymbol: false,
          data: [1, 2, 1, 3, 2],
          lineStyle: { width: 3, color: 'rgba(141, 211, 199, 1)' },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(141, 211, 199, 0.2)' },
                { offset: 1, color: 'rgba(141, 211, 199, 0.01)' },
              ],
            },
          },
        },
      ],
    };
    trendChart.setOption(trendOption);

    // Resize charts on window resize
    const handleResize = () => {
      statusChart.resize();
      trendChart.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      statusChart.dispose();
      trendChart.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleDragStart = (e, job) => {
    setDraggedCard(job);
    e.dataTransfer.setData('text/plain', job.id);
    setTimeout(() => e.target.classList.add('opacity-50'), 0);
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove('opacity-50');
    setDraggedCard(null);
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    if (draggedCard) {
      // Update job status in real implementation (e.g., API call)
      console.log(`Moved job ${draggedCard.id} to ${newStatus}`);
    }
  };

  return (
    <main className="flex-1 overflow-y-auto p-6 bg-neutral font-roboto">
      {/* Controls Section */}
      <section className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setViewDropdownOpen(!viewDropdownOpen)}
                className="px-3 py-2 text-sm font-medium rounded-button border border-gray-300 bg-white hover:bg-neutral-dark text-gray-700 flex items-center whitespace-nowrap"
              >
                <Grid className="w-4 h-4 mr-1.5" />
                <span>Kanban View</span>
                <ChevronDown className="w-4 h-4 ml-1.5" />
              </button>
              {viewDropdownOpen && (
                <div className="absolute mt-1 w-40 bg-white shadow-lg rounded-lg overflow-hidden z-10">
                  <button className="flex items-center px-4 py-2 text-sm hover:bg-neutral-dark w-full text-left">
                    <Grid className="w-4 h-4 mr-2" />
                    Kanban View
                  </button>
                  <button className="flex items-center px-4 py-2 text-sm hover:bg-neutral-dark w-full text-left">
                    <List className="w-4 h-4 mr-2" />
                    List View
                  </button>
                </div>
              )}
            </div>
            <div className="relative flex-grow max-w-xs">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border-none bg-white rounded-lg shadow-sm text-sm focus:ring-2 focus:ring-primary-light focus:ring-opacity-20 focus:outline-none"
                placeholder="Search jobs..."
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
                className="px-3 py-2 text-sm font-medium rounded-button border border-gray-300 bg-white hover:bg-neutral-dark text-gray-700 flex items-center whitespace-nowrap"
              >
                <Filter className="w-4 h-4 mr-1.5" />
                Filters
                <ChevronDown className="w-4 h-4 ml-1.5" />
              </button>
              {filterDropdownOpen && (
                <div className="absolute mt-1 w-64 right-0 bg-white shadow-lg rounded-lg overflow-hidden z-10">
                  <div className="p-3">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Filter by</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Company</label>
                        <select className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-light focus:ring-opacity-20 focus:outline-none pr-8">
                          <option value="">All Companies</option>
                          <option value="Google">Google</option>
                          <option value="Microsoft">Microsoft</option>
                          <option value="Amazon">Amazon</option>
                          <option value="Meta">Meta</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Location</label>
                        <select className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-light focus:ring-opacity-20 focus:outline-none pr-8">
                          <option value="">All Locations</option>
                          <option value="Remote">Remote</option>
                          <option value="Hybrid">Hybrid</option>
                          <option value="On-site">On-site</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Date Range</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="date"
                            className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-light focus:ring-opacity-20 focus:outline-none"
                          />
                          <span className="text-gray-500">to</span>
                          <input
                            type="date"
                            className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-light focus:ring-opacity-20 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-100 p-2 flex justify-end">
                    <button className="px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100 rounded mr-1 whitespace-nowrap">Reset</button>
                    <button className="px-2 py-1 text-xs font-medium bg-primary-light text-white rounded whitespace-nowrap">Apply</button>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => setJobModalOpen(true)}
              className="px-3 py-2 text-sm font-medium rounded-button bg-primary-light hover:bg-primary-light/90 text-white flex items-center whitespace-nowrap"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Add New Job
            </button>
          </div>
        </div>
      </section>
      {/* Kanban Board */}
      <section className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Applied Column */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2">
                    <Send className="w-4 h-4" />
                  </div>
                  <h3 className="font-medium text-gray-800">Applied</h3>
                </div>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  {jobs.filter(job => job.status === 'applied').length}
                </span>
              </div>
            </div>
            <div
              className="p-3 flex-1 overflow-y-auto min-h-[400px]"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, 'applied')}
            >
              {jobs.filter(job => job.status === 'applied').map(job => (
                <div
                  key={job.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 mb-3 cursor-grab active:cursor-grabbing"
                  draggable
                  onDragStart={(e) => handleDragStart(e, job)}
                  onDragEnd={handleDragEnd}
                  onClick={() => setJobDetailsOpen(true)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                      <job.icon className="w-6 h-6" />
                    </div>
                    <div className={`px-2 py-0.5 ${job.statusColor} rounded-full text-xs font-medium`}>
                      {job.subStatus || 'Applied'}
                    </div>
                  </div>
                  <h4 className="text-sm font-medium text-gray-900 mb-1">{job.title}</h4>
                  <p className="text-xs text-gray-500 mb-2">{job.company}</p>
                  <div className="flex items-center mb-3">
                    <div className="flex items-center mr-3">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 mr-1" />
                      <span className="text-xs text-gray-500">{job.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-3.5 h-3.5 text-gray-400 mr-1" />
                      <span className="text-xs text-gray-500">{job.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 border-2 border-white">
                        <User className="w-3 h-3" />
                      </div>
                    </div>
                    <button className="p-1 rounded hover:bg-gray-100">
                      <MoreHorizontal className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-gray-200">
              <button className="w-full px-3 py-2 text-sm font-medium rounded-button border border-dashed border-gray-300 text-gray-600 hover:bg-neutral-dark flex items-center justify-center whitespace-nowrap">
                <Plus className="w-4 h-4 mr-1.5" />
                Add Job
              </button>
            </div>
          </div>
          {/* Interview Column */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-2">
                    <Mic className="w-4 h-4" />
                  </div>
                  <h3 className="font-medium text-gray-800">Interview</h3>
                </div>
                <span className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                  {jobs.filter(job => job.status === 'interview').length}
                </span>
              </div>
            </div>
            <div
              className="p-3 flex-1 overflow-y-auto min-h-[400px]"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, 'interview')}
            >
              {jobs.filter(job => job.status === 'interview').map(job => (
                <div
                  key={job.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 mb-3 cursor-grab active:cursor-grabbing"
                  draggable
                  onDragStart={(e) => handleDragStart(e, job)}
                  onDragEnd={handleDragEnd}
                  onClick={() => setJobDetailsOpen(true)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                      <job.icon className="w-6 h-6" />
                    </div>
                    <div className={`px-2 py-0.5 ${job.statusColor} rounded-full text-xs font-medium`}>
                      {job.subStatus || 'Interview'}
                    </div>
                  </div>
                  <h4 className="text-sm font-medium text-gray-900 mb-1">{job.title}</h4>
                  <p className="text-xs text-gray-500 mb-2">{job.company}</p>
                  <div className="flex items-center mb-3">
                    <div className="flex items-center mr-3">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 mr-1" />
                      <span className="text-xs text-gray-500">{job.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-3.5 h-3.5 text-gray-400 mr-1" />
                      <span className="text-xs text-gray-500">{job.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 border-2 border-white">
                        <User className="w-3 h-3" />
                      </div>
                    </div>
                    <button className="p-1 rounded hover:bg-gray-100">
                      <MoreHorizontal className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-gray-200">
              <button className="w-full px-3 py-2 text-sm font-medium rounded-button border border-dashed border-gray-300 text-gray-600 hover:bg-neutral-dark flex items-center justify-center whitespace-nowrap">
                <Plus className="w-4 h-4 mr-1.5" />
                Add Job
              </button>
            </div>
          </div>
          {/* Offer Column */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-2">
                    <Award className="w-4 h-4" />
                  </div>
                  <h3 className="font-medium text-gray-800">Offer</h3>
                </div>
                <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  {jobs.filter(job => job.status === 'offer').length}
                </span>
              </div>
            </div>
            <div
              className="p-3 flex-1 overflow-y-auto min-h-[400px]"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, 'offer')}
            >
              {jobs.filter(job => job.status === 'offer').map(job => (
                <div
                  key={job.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 mb-3 cursor-grab active:cursor-grabbing"
                  draggable
                  onDragStart={(e) => handleDragStart(e, job)}
                  onDragEnd={handleDragEnd}
                  onClick={() => setJobDetailsOpen(true)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3">
                      <job.icon className="w-6 h-6" />
                    </div>
                    <div className={`px-2 py-0.5 ${job.statusColor} rounded-full text-xs font-medium`}>
                      {job.subStatus || 'Offer'}
                    </div>
                  </div>
                  <h4 className="text-sm font-medium text-gray-900 mb-1">{job.title}</h4>
                  <p className="text-xs text-gray-500 mb-2">{job.company}</p>
                  <div className="flex items-center mb-3">
                    <div className="flex items-center mr-3">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 mr-1" />
                      <span className="text-xs text-gray-500">{job.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-3.5 h-3.5 text-gray-400 mr-1" />
                      <span className="text-xs text-gray-500">{job.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 border-2 border-white">
                        <User className="w-3 h-3" />
                      </div>
                    </div>
                    <button className="p-1 rounded hover:bg-gray-100">
                      <MoreHorizontal className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-gray-200">
              <button className="w-full px-3 py-2 text-sm font-medium rounded-button border border-dashed border-gray-300 text-gray-600 hover:bg-neutral-dark flex items-center justify-center whitespace-nowrap">
                <Plus className="w-4 h-4 mr-1.5" />
                Add Job
              </button>
            </div>
          </div>
          {/* Rejected Column */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-2">
                    <XCircle className="w-4 h-4" />
                  </div>
                  <h3 className="font-medium text-gray-800">Rejected</h3>
                </div>
                <span className="px-2 py-0.5 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                  {jobs.filter(job => job.status === 'rejected').length}
                </span>
              </div>
            </div>
            <div
              className="p-3 flex-1 overflow-y-auto min-h-[400px]"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, 'rejected')}
            >
              {jobs.filter(job => job.status === 'rejected').map(job => (
                <div
                  key={job.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 mb-3 cursor-grab active:cursor-grabbing"
                  draggable
                  onDragStart={(e) => handleDragStart(e, job)}
                  onDragEnd={handleDragEnd}
                  onClick={() => setJobDetailsOpen(true)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-600 mr-3">
                      <job.icon className="w-6 h-6" />
                    </div>
                    <div className={`px-2 py-0.5 ${job.statusColor} rounded-full text-xs font-medium`}>
                      {job.subStatus || 'Rejected'}
                    </div>
                  </div>
                  <h4 className="text-sm font-medium text-gray-900 mb-1">{job.title}</h4>
                  <p className="text-xs text-gray-500 mb-2">{job.company}</p>
                  <div className="flex items-center mb-3">
                    <div className="flex items-center mr-3">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 mr-1" />
                      <span className="text-xs text-gray-500">{job.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-3.5 h-3.5 text-gray-400 mr-1" />
                      <span className="text-xs text-gray-500">{job.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 border-2 border-white">
                        <User className="w-3 h-3" />
                      </div>
                    </div>
                    <button className="p-1 rounded hover:bg-gray-100">
                      <MoreHorizontal className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-gray-200">
              <button className="w-full px-3 py-2 text-sm font-medium rounded-button border border-dashed border-gray-300 text-gray-600 hover:bg-neutral-dark flex items-center justify-center whitespace-nowrap">
                <Plus className="w-4 h-4 mr-1.5" />
                Add Job
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Analytics Dashboard */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Application Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Total Applications</h3>
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Send className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl font-semibold text-gray-800">22</p>
            <div className="flex items-center mt-1">
              <span className="text-xs text-chart-5 font-medium">+15%</span>
              <span className="text-xs text-gray-500 ml-1">vs last month</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Interview Rate</h3>
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                <Mic className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl font-semibold text-gray-800">22.7%</p>
            <div className="flex items-center mt-1">
              <span className="text-xs text-chart-5 font-medium">+3.2%</span>
              <span className="text-xs text-gray-500 ml-1">vs last month</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Offer Rate</h3>
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <Award className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl font-semibold text-gray-800">9.1%</p>
            <div className="flex items-center mt-1">
              <span className="text-xs text-chart-5 font-medium">+1.5%</span>
              <span className="text-xs text-gray-500 ml-1">vs last month</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Avg. Response Time</h3>
              <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                {/* Note: Clock icon is not available in Lucide; using Calendar as a placeholder */}
                <Calendar className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl font-semibold text-gray-800">5.3 days</p>
            <div className="flex items-center mt-1">
              <span className="text-xs text-destructive font-medium">+0.8 days</span>
              <span className="text-xs text-gray-500 ml-1">vs last month</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Application Status Distribution</h3>
            <div ref={applicationStatusChartRef} className="w-full h-64" />
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Weekly Application Trend</h3>
            <div ref={applicationTrendChartRef} className="w-full h-64" />
          </div>
        </div>
      </section>
      {/* Job Details Sidebar */}
      {jobDetailsOpen && (
        <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-20">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-800">Job Details</h3>
              <button onClick={() => setJobDetailsOpen(false)} className="p-1.5 rounded-full hover:bg-gray-100">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">Senior Frontend Engineer</h4>
                    <p className="text-sm text-gray-500">Google</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">Applied</span>
                  <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">Remote</span>
                  <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">Senior</span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">Remote</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">$140,000 - $180,000</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">Applied on July 1, 2025</span>
                  </div>
                  <div className="flex items-center">
                    <Link className="w-5 h-5 text-gray-400 mr-2" />
                    <a href="#" className="text-sm text-primary-light hover:underline">View Job Posting</a>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Application Timeline</h4>
                <div className="relative pl-6 border-l border-gray-200 space-y-6">
                  <div className="relative">
                    <div className="absolute -left-[25px] w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 border-2 border-white">
                      <Send className="w-3 h-3" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Application Submitted</p>
                      <p className="text-xs text-gray-500">July 1, 2025 at 10:30 AM</p>
                      <p className="text-sm text-gray-600 mt-1">Applied via alex.mitchell@gmail.com</p>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[25px] w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 border-2 border-white">
                      <MailOpen className="w-3 h-3" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Application Viewed</p>
                      <p className="text-xs text-gray-500">July 2, 2025 at 2:45 PM</p>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[25px] w-5 h-5 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 border-2 border-white">
                      <Mail className="w-3 h-3" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Received Response</p>
                      <p className="text-xs text-gray-500">July 3, 2025 at 9:15 AM</p>
                      <p className="text-sm text-gray-600 mt-1">Thank you for your application. We'd like to schedule an initial phone screen.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Notes</h4>
                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                  <p className="text-sm text-gray-600">Need to prepare for system design questions. Review distributed systems concepts.</p>
                  <p className="text-xs text-gray-500 mt-1">Added on July 3, 2025</p>
                </div>
                <textarea
                  placeholder="Add a note..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-light focus:ring-opacity-20 focus:outline-none"
                />
              </div>
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Documents</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mr-2">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">Resume.pdf</p>
                        <p className="text-xs text-gray-500">Uploaded on July 1, 2025</p>
                      </div>
                    </div>
                    <button className="p-1.5 rounded hover:bg-gray-200">
                      <Download className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mr-2">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">Cover_Letter.pdf</p>
                        <p className="text-xs text-gray-500">Uploaded on July 1, 2025</p>
                      </div>
                    </div>
                    <button className="p-1.5 rounded hover:bg-gray-200">
                      <Download className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Contact Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <User className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">Sarah Johnson (Recruiter)</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">sarah.johnson@google.com</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">(555) 123-4567</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <button className="flex-1 px-4 py-2 text-sm font-medium rounded-button bg-primary-light hover:bg-primary-light/90 text-white whitespace-nowrap">
                  <div className="flex items-center justify-center">
                    <Edit className="w-4 h-4 mr-1.5" />
                    Edit Job
                  </div>
                </button>
                <button className="px-4 py-2 text-sm font-medium rounded-button border border-gray-300 bg-white hover:bg-neutral-dark text-gray-700 whitespace-nowrap">
                  <div className="flex items-center justify-center">
                    <Trash2 className="w-4 h-4 mr-1.5" />
                    Delete
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Add/Edit Job Modal */}
      {jobModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-800">Add New Job</h3>
              <button onClick={() => setJobModalOpen(false)} className="p-1.5 rounded-full hover:bg-gray-100">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-light focus:ring-opacity-20 focus:outline-none"
                    placeholder="e.g. Senior Frontend Developer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-light focus:ring-opacity-20 focus:outline-none"
                    placeholder="e.g. Google"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-light focus:ring-opacity-20 focus:outline-none"
                    placeholder="e.g. Remote, San Francisco, CA"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-light focus:ring-opacity-20 focus:outline-none pr-8">
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="onsite">On-site</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-light focus:ring-opacity-20 focus:outline-none pr-8">
                    <option value="applied">Applied</option>
                    <option value="interview">Interview</option>
                    <option value="offer">Offer</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Application Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-light focus:ring-opacity-20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Applied From</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-light focus:ring-opacity-20 focus:outline-none pr-8">
                    <option value="alex.mitchell@gmail.com">alex.mitchell@gmail.com</option>
                    <option value="sarah.dev@gmail.com">sarah.dev@gmail.com</option>
                    <option value="michael.tech@gmail.com">michael.tech@gmail.com</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-light focus:ring-opacity-20 focus:outline-none"
                      placeholder="Min"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="text"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-light focus:ring-opacity-20 focus:outline-none"
                      placeholder="Max"
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
                  <textarea
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-light focus:ring-opacity-20 focus:outline-none"
                    placeholder="Enter job description..."
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-light focus:ring-opacity-20 focus:outline-none"
                    placeholder="Add any notes about this job..."
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm">
                      <span>Remote</span>
                      <button className="ml-1.5 text-blue-800 hover:text-blue-900">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center px-3 py-1.5 bg-purple-100 text-purple-800 rounded-full text-sm">
                      <span>Senior</span>
                      <button className="ml-1.5 text-purple-800 hover:text-purple-900">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <button className="px-3 py-1.5 border border-dashed border-gray-300 text-gray-600 hover:bg-neutral-dark rounded-full text-sm flex items-center">
                      <Plus className="w-4 h-4 mr-1" />
                      Add Tag
                    </button>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Documents</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 mx-auto mb-2">
                      <Upload className="w-5 h-5" />
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Drag and drop files here, or click to browse</p>
                    <p className="text-xs text-gray-500">Supports PDF, DOCX, JPG, PNG (Max 5MB)</p>
                    <input type="file" className="hidden" multiple />
                    <button className="mt-3 px-3 py-1.5 text-xs font-medium rounded-button border border-gray-300 bg-white hover:bg-neutral-dark text-gray-700 whitespace-nowrap">
                      Browse Files
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setJobModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium rounded-button bg-gray-100 hover:bg-gray-200 text-gray-700 whitespace-nowrap"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium rounded-button bg-primary-light hover:bg-primary-light/90 text-white whitespace-nowrap"
                >
                  Save Job
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default JobTracker;