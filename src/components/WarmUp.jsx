import { useState, useEffect, useRef } from 'react';
import {
  Mail, Plus, ChevronDown, MoreHorizontal, User, Download, Settings, Pause, Calendar, Sliders, CheckSquare, XCircle, Send, Flame, MailOpen, FileText, Trash2, Upload, LogOut, HelpCircle, UserCog, Bell
} from 'lucide-react';
import * as echarts from 'echarts';

const WarmUp = () => {
  const [activeTab, setActiveTab] = useState('delivery');
  const [dateRangeDropdownOpen, setDateRangeDropdownOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const dailySendVolumeChartRef = useRef(null);
  const deliveryMetricsChartRef = useRef(null);
  const [dailyIncrease, setDailyIncrease] = useState(3);
  const [settingsOpen, setSettingsOpen] = useState(true);

  const dateRangeItems = ['Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'Custom Range'];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const emailTypes = ['Newsletters', 'Replies', 'Forwards', 'Personal Messages'];

  const emailAccounts = [
    { email: 'alex.mitchell@gmail.com', status: 'Active', statusColor: 'bg-blue-100', dailyLimit: '25 emails', deliveryRate: '98.2%', spamIncidents: '0', progress: 85 },
    { email: 'sarah.dev@gmail.com', status: 'Warming Up', statusColor: 'bg-yellow-100', dailyLimit: '12 emails', deliveryRate: '95.7%', spamIncidents: '1', progress: 40 },
    { email: 'michael.tech@gmail.com', status: 'Active', statusColor: 'bg-blue-100', dailyLimit: '20 emails', deliveryRate: '97.5%', spamIncidents: '0', progress: 75 },
  ];

  const analyticsData = {
    delivery: [
      { email: 'alex.mitchell@gmail.com', sent: 725, delivered: 712, inbox: '98.2%', spam: '0.3%', bounced: '1.5%', status: 'Healthy', statusColor: 'bg-blue-100 text-blue-800' },
      { email: 'sarah.dev@gmail.com', sent: 230, delivered: 220, inbox: '95.7%', spam: '2.1%', bounced: '2.2%', status: 'Warming', statusColor: 'bg-yellow-100 text-yellow-800' },
      { email: 'michael.tech@gmail.com', sent: 542, delivered: 529, inbox: '97.5%', spam: '0.5%', bounced: '2.0%', status: 'Healthy', statusColor: 'bg-blue-100 text-blue-800' },
    ],
    engagement: [
      { email: 'alex.mitchell@gmail.com', openRate: '42.7%', replyRate: '18.3%', clickRate: '5.2%', responseTime: '4.2 hours', status: 'Good', statusColor: 'bg-blue-100 text-blue-800' },
      { email: 'sarah.dev@gmail.com', openRate: '35.1%', replyRate: '12.5%', clickRate: '3.8%', responseTime: '6.5 hours', status: 'Average', statusColor: 'bg-yellow-100 text-yellow-800' },
      { email: 'michael.tech@gmail.com', openRate: '40.2%', replyRate: '16.7%', clickRate: '4.9%', responseTime: '3.8 hours', status: 'Good', statusColor: 'bg-blue-100 text-blue-800' },
    ],
    reputation: [
      { email: 'alex.mitchell@gmail.com', domainScore: '9.2/10', spf: 'Pass', dkim: 'Pass', dmarc: 'Pass', status: 'Excellent', statusColor: 'bg-blue-100 text-blue-800' },
      { email: 'sarah.dev@gmail.com', domainScore: '7.8/10', spf: 'Pass', dkim: 'Pass', dmarc: 'Neutral', status: 'Good', statusColor: 'bg-yellow-100 text-yellow-800' },
      { email: 'michael.tech@gmail.com', domainScore: '8.9/10', spf: 'Pass', dkim: 'Pass', dmarc: 'Pass', status: 'Excellent', statusColor: 'bg-blue-100 text-blue-800' },
    ],
  };

  const headers = {
    delivery: ['Email Account', 'Sent', 'Delivered', 'Inbox %', 'Spam %', 'Bounced', 'Status'],
    engagement: ['Email Account', 'Open Rate', 'Reply Rate', 'Click Rate', 'Avg. Response Time', 'Status'],
    reputation: ['Email Account', 'Domain Score', 'SPF', 'DKIM', 'DMARC', 'Status'],
  };

  useEffect(() => {
    // Initialize Daily Send Volume Chart
    const dailySendVolumeChart = echarts.init(dailySendVolumeChartRef.current);
    const dailySendVolumeOption = {
      animation: false,
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        textStyle: { color: '#1f2937' },
      },
      legend: {
        data: ['Total Emails', 'Target'],
        right: 10,
        top: 0,
        textStyle: { color: '#1f2937' },
      },
      grid: { left: 0, right: 0, top: 30, bottom: 30, containLabel: true },
      xAxis: {
        type: 'category',
        data: ['Jun 3', 'Jun 10', 'Jun 17', 'Jun 24', 'Jul 1', 'Jul 8', 'Jul 15', 'Jul 22', 'Jul 29'],
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
          name: 'Total Emails',
          type: 'line',
          smooth: true,
          showSymbol: false,
          data: [12, 18, 24, 30, 36, 42, 42, 42, 42],
          lineStyle: { width: 3, color: 'rgba(87, 181, 231, 1)' },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{ offset: 0, color: 'rgba(87, 181, 231, 0.2)' }, { offset: 1, color: 'rgba(87, 181, 231, 0.01)' }],
            },
          },
        },
        {
          name: 'Target',
          type: 'line',
          smooth: true,
          showSymbol: false,
          data: [10, 20, 30, 40, 50, 60, 70, 80, 90],
          lineStyle: { width: 2, type: 'dashed', color: 'rgba(141, 211, 199, 1)' },
        },
      ],
    };
    dailySendVolumeChart.setOption(dailySendVolumeOption);

    // Initialize Delivery Metrics Chart
    const deliveryMetricsChart = echarts.init(deliveryMetricsChartRef.current);
    const deliveryMetricsOption = {
      animation: false,
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        textStyle: { color: '#1f2937' },
      },
      legend: {
        data: ['Inbox Rate', 'Spam Rate', 'Bounce Rate'],
        right: 10,
        top: 0,
        textStyle: { color: '#1f2937' },
      },
      grid: { left: 0, right: 0, top: 30, bottom: 30, containLabel: true },
      xAxis: {
        type: 'category',
        data: ['Jun 3', 'Jun 10', 'Jun 17', 'Jun 24', 'Jul 1', 'Jul 8', 'Jul 15', 'Jul 22', 'Jul 29'],
        axisLine: { lineStyle: { color: '#e5e7eb' } },
        axisLabel: { color: '#1f2937' },
      },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: '#f3f4f6' } },
        axisLabel: { color: '#1f2937', formatter: '{value}%' },
        max: 100,
      },
      series: [
        {
          name: 'Inbox Rate',
          type: 'line',
          smooth: true,
          showSymbol: false,
          data: [90.2, 92.5, 94.1, 95.3, 96.2, 96.8, 96.9, 97.1, 97.2],
          lineStyle: { width: 3, color: 'rgba(87, 181, 231, 1)' },
        },
        {
          name: 'Spam Rate',
          type: 'line',
          smooth: true,
          showSymbol: false,
          data: [6.5, 4.8, 3.2, 2.5, 1.8, 1.2, 1.1, 0.9, 0.8],
          lineStyle: { width: 3, color: 'rgba(251, 191, 114, 1)' },
        },
        {
          name: 'Bounce Rate',
          type: 'line',
          smooth: true,
          showSymbol: false,
          data: [3.3, 2.7, 2.7, 2.2, 2.0, 2.0, 2.0, 2.0, 2.0],
          lineStyle: { width: 3, color: 'rgba(252, 141, 98, 1)' },
        },
      ],
    };
    deliveryMetricsChart.setOption(deliveryMetricsOption);

    // Resize charts on window resize
    const handleResize = () => {
      dailySendVolumeChart.resize();
      deliveryMetricsChart.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      dailySendVolumeChart.dispose();
      deliveryMetricsChart.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <main className="flex-1 overflow-y-auto p-6 bg-neutral font-roboto">
      {/* Controls Section */}
      <section className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-grow max-w-xs">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Mail className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border-none bg-white rounded-lg shadow-sm text-sm focus:ring-2 focus:ring-primary-light focus:ring-opacity-20 focus:outline-none"
                placeholder="Search email accounts..."
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setEmailModalOpen(true)}
              className="px-3 py-2 text-sm font-medium rounded-button bg-primary-light hover:bg-primary-light/90 text-white flex items-center whitespace-nowrap"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Add Email Account
            </button>
          </div>
        </div>
      </section>
      {/* Metrics Section */}
      <section className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Active Warmups</h3>
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Mail className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl font-semibold text-gray-800">3</p>
            <div className="flex items-center mt-1">
              <span className="text-xs text-chart-5 font-medium">+1</span>
              <span className="text-xs text-gray-500 ml-1">vs last week</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Average Delivery Rate</h3>
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <CheckSquare className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl font-semibold text-gray-800">96.8%</p>
            <div className="flex items-center mt-1">
              <span className="text-xs text-chart-5 font-medium">+2.3%</span>
              <span className="text-xs text-gray-500 ml-1">vs last week</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Spam Score</h3>
              <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                <XCircle className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl font-semibold text-gray-800">1.2</p>
            <div className="flex items-center mt-1">
              <span className="text-xs text-destructive font-medium">-0.5</span>
              <span className="text-xs text-gray-500 ml-1">vs last week</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Daily Volume</h3>
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                <Send className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl font-semibold text-gray-800">42</p>
            <div className="flex items-center mt-1">
              <span className="text-xs text-chart-5 font-medium">+8</span>
              <span className="text-xs text-gray-500 ml-1">vs last week</span>
            </div>
          </div>
        </div>
      </section>
      {/* Email Accounts Section */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Connected Email Accounts</h2>
        <div className="flex overflow-x-auto pb-2 space-x-4">
          {emailAccounts.map((account, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 min-w-[300px] flex-shrink-0">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-800">{account.email}</h3>
                    <div className="flex items-center">
                      <span className={`w-2 h-2 rounded-full ${account.statusColor} mr-1`}></span>
                      <span className="text-xs text-gray-500">{account.status}</span>
                    </div>
                  </div>
                </div>
                <button className="p-1 rounded hover:bg-gray-100">
                  <MoreHorizontal className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Daily limit:</span>
                  <span className="text-xs font-medium text-gray-800">{account.dailyLimit}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Delivery rate:</span>
                  <span className="text-xs font-medium text-gray-800">{account.deliveryRate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Spam incidents:</span>
                  <span className="text-xs font-medium text-gray-800">{account.spamIncidents}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className={`bg-${account.statusColor.split('-')[1]}-500 h-1.5 rounded-full`} style={{ width: `${account.progress}%` }}></div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-1.5 text-xs font-medium rounded-button bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center whitespace-nowrap">
                  <Settings className="w-3.5 h-3.5 mr-1" />
                  Settings
                </button>
                <button className="flex-1 px-3 py-1.5 text-xs font-medium rounded-button bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center whitespace-nowrap">
                  <Pause className="w-3.5 h-3.5 mr-1" />
                  Pause
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Warmup Progress Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Warmup Progress</h2>
          <div className="relative">
            <button
              onClick={() => setDateRangeDropdownOpen(!dateRangeDropdownOpen)}
              className="px-3 py-2 text-sm font-medium rounded-button border border-gray-300 bg-white hover:bg-neutral-dark text-gray-700 flex items-center whitespace-nowrap"
            >
              <Calendar className="w-4 h-4 mr-1.5" />
              Last 30 Days
              <ChevronDown className="w-4 h-4 ml-1.5" />
            </button>
            {dateRangeDropdownOpen && (
              <div className="absolute mt-1 w-40 right-0 bg-white shadow-lg rounded-lg overflow-hidden z-10">
                {dateRangeItems.map((item, index) => (
                  <button key={index} className="flex items-center px-4 py-2 text-sm hover:bg-neutral-dark w-full text-left">
                    <Calendar className="w-4 h-4 mr-2" />
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Daily Send Volume</h3>
            <div ref={dailySendVolumeChartRef} className="w-full h-64" />
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Delivery Metrics</h3>
            <div ref={deliveryMetricsChartRef} className="w-full h-64" />
          </div>
        </div>
      </section>
      {/* Settings Panel */}
      <section className="mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between cursor-pointer" onClick={() => setSettingsOpen(!settingsOpen)}>
            <h2 className="text-lg font-semibold text-gray-800">Warmup Settings</h2>
            <ChevronDown className={`w-6 h-6 text-gray-500 transform ${settingsOpen ? 'rotate-180' : ''}`} />
          </div>
          {settingsOpen && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-4">General Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Daily Increase Rate</label>
                      <div className="flex items-center">
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={dailyIncrease}
                          onChange={(e) => setDailyIncrease(e.target.value)}
                          className="flex-1 mr-3"
                        />
                        <span className="text-sm font-medium text-gray-800 min-w-[30px]">{dailyIncrease}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Emails added per day during warmup</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Daily Limit</label>
                      <input
                        type="number"
                        min="10"
                        max="100"
                        defaultValue="50"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-light focus:ring-opacity-20 focus:outline-none"
                      />
                      <p className="text-xs text-gray-500 mt-1">Maximum emails to send per day</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Apply Settings To</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-light focus:ring-opacity-20 focus:outline-none pr-8">
                        <option value="all">All Email Accounts</option>
                        <option value="alex">alex.mitchell@gmail.com</option>
                        <option value="sarah">sarah.dev@gmail.com</option>
                        <option value="michael">michael.tech@gmail.com</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-4">Advanced Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Warmup Schedule</label>
                      <div className="grid grid-cols-7 gap-1">
                        {days.map((day, index) => (
                          <div key={index} className="text-center">
                            <div className="text-xs text-gray-500 mb-1">{day}</div>
                            <div className="w-8 h-8 mx-auto rounded-full bg-primary-light/10 flex items-center justify-center cursor-pointer">
                              <input type="checkbox" defaultChecked className="hidden" id={`day-${day.toLowerCase()}`} />
                              <label htmlFor={`day-${day.toLowerCase()}`} className="w-full h-full flex items-center justify-center cursor-pointer">
                                <div className="w-6 h-6 rounded-full bg-primary-light flex items-center justify-center text-white">
                                  <CheckSquare className="w-4 h-4" />
                                </div>
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Types</label>
                      <div className="space-y-2">
                        {emailTypes.map((type, index) => (
                          <div key={index} className="flex items-center">
                            <input type="checkbox" defaultChecked id={`type-${type.toLowerCase().replace(' ', '-')}`} />
                            <label htmlFor={`type-${type.toLowerCase().replace(' ', '-')}`} className="ml-2 text-sm text-gray-700">{type}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button className="px-4 py-2 text-sm font-medium rounded-button bg-primary-light hover:bg-primary-light/90 text-white whitespace-nowrap">
                  Save Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
      {/* Analytics Table */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Detailed Analytics</h2>
          <div className="flex items-center">
            <div className="bg-white rounded-full p-1 flex items-center border border-gray-200 mr-2">
              <button
                className={`px-3 py-1 text-sm font-medium rounded-full ${activeTab === 'delivery' ? 'bg-primary-light text-white' : 'text-gray-700 hover:bg-neutral-dark'}`}
                onClick={() => setActiveTab('delivery')}
              >
                Delivery
              </button>
              <button
                className={`px-3 py-1 text-sm font-medium rounded-full ${activeTab === 'engagement' ? 'bg-primary-light text-white' : 'text-gray-700 hover:bg-neutral-dark'}`}
                onClick={() => setActiveTab('engagement')}
              >
                Engagement
              </button>
              <button
                className={`px-3 py-1 text-sm font-medium rounded-full ${activeTab === 'reputation' ? 'bg-primary-light text-white' : 'text-gray-700 hover:bg-neutral-dark'}`}
                onClick={() => setActiveTab('reputation')}
              >
                Reputation
              </button>
            </div>
            <button className="p-2 text-gray-500 hover:text-gray-700 bg-white rounded-full border border-gray-200">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  {headers[activeTab].map((header, index) => (
                    <th key={index} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {analyticsData[activeTab].map((row, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2">
                          <Mail className="w-5 h-5" />
                        </div>
                        <span className="text-sm text-gray-800">{row.email}</span>
                      </div>
                    </td>
                    {Object.values(row).slice(1, -1).map((value, i) => (
                      <td key={i} className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{value}</td>
                    ))}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${row.statusColor}`}>{row.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      {/* Add Email Modal */}
      {emailModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-800">Add New Email Account</h3>
              <button onClick={() => setEmailModalOpen(false)} className="p-1.5 rounded-full hover:bg-gray-100">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-light focus:ring-opacity-20 focus:outline-none"
                    placeholder="Enter your email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Provider</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-light focus:ring-opacity-20 focus:outline-none pr-8">
                    <option value="gmail">Gmail</option>
                    <option value="outlook">Outlook</option>
                    <option value="yahoo">Yahoo</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Initial Daily Limit</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    defaultValue="5"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-light focus:ring-opacity-20 focus:outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">Recommended to start with 5 emails per day</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Warmup Strategy</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-light focus:ring-opacity-20 focus:outline-none pr-8">
                    <option value="conservative">Conservative (Slower, Safer)</option>
                    <option value="balanced">Balanced (Recommended)</option>
                    <option value="aggressive">Aggressive (Faster, Riskier)</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="auto-increase" defaultChecked />
                  <label htmlFor="auto-increase" className="ml-2 text-sm text-gray-700">Automatically increase daily limit</label>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setEmailModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium rounded-button bg-gray-100 hover:bg-gray-200 text-gray-700 whitespace-nowrap"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setEmailModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium rounded-button bg-primary-light hover:bg-primary-light/90 text-white whitespace-nowrap"
                >
                  Add Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default WarmUp;