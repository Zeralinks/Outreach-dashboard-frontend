import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp, ArrowDown, Download, Search, ChevronDown,  ChevronRight, ChevronLeft, FileText, File, BarChart, CalendarCheck } from 'lucide-react';
import ReactECharts from 'echarts-for-react';
import 'echarts/theme/macarons.js'; 


const Analytics = () => {
  const [dateRangeOpen, setDateRangeOpen] = useState(false);
  const [accountFilterOpen, setAccountFilterOpen] = useState(false);
  const [campaignFilterOpen, setCampaignFilterOpen] = useState(false);
  const dateRangeRef = useRef(null);
  const accountFilterRef = useRef(null);
  const campaignFilterRef = useRef(null);

  const campaigns = [
    { name: 'Q3 Client Outreach', date: 'Jul 2, 2025', recipients: 1245, openRate: 48.2, replyRate: 22.4, successRate: 18.7 },
    { name: 'Product Launch Follow-up', date: 'Jun 28, 2025', recipients: 2187, openRate: 52.1, replyRate: 19.8, successRate: 15.3 },
    { name: 'Monthly Newsletter', date: 'Jun 15, 2025', recipients: 3542, openRate: 38.7, replyRate: 12.3, successRate: 10.9 },
    { name: 'Event Invitation', date: 'Jun 10, 2025', recipients: 876, openRate: 62.4, replyRate: 28.6, successRate: 24.2 },
    { name: 'Sales Promotion', date: 'Jun 5, 2025', recipients: 1892, openRate: 45.8, replyRate: 16.9, successRate: 14.3 },
    { name: 'Customer Feedback Request', date: 'May 28, 2025', recipients: 1432, openRate: 41.2, replyRate: 24.7, successRate: 19.8 },
    { name: 'New Feature Announcement', date: 'May 20, 2025', recipients: 2764, openRate: 49.3, replyRate: 17.5, successRate: 15.1 },
    { name: 'Webinar Invitation', date: 'May 15, 2025', recipients: 1128, openRate: 53.7, replyRate: 26.2, successRate: 22.8 },
    { name: 'Partnership Announcement', date: 'May 8, 2025', recipients: 942, openRate: 47.6, replyRate: 21.3, successRate: 18.5 },
    { name: 'Q2 Client Outreach', date: 'Apr 28, 2025', recipients: 1356, openRate: 44.9, replyRate: 20.8, successRate: 17.2 },
  ];

  const performanceChartOptions = {
    animation: false,
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      textStyle: { color: '#1f2937' },
    },
    legend: { data: ['Emails Sent', 'Open Rate', 'Reply Rate'], bottom: 0 },
    grid: { left: '3%', right: '4%', bottom: '10%', top: '3%', containLabel: true },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Jun 5', 'Jun 10', 'Jun 15', 'Jun 20', 'Jun 25', 'Jun 30', 'Jul 5'],
    },
    yAxis: [
      {
        type: 'value',
        name: 'Count',
        position: 'left',
        axisLine: { show: true, lineStyle: { color: 'rgba(87, 181, 231, 1)' } },
        axisLabel: { formatter: '{value}' },
      },
      {
        type: 'value',
        name: 'Rate',
        position: 'right',
        min: 0,
        max: 100,
        axisLine: { show: true, lineStyle: { color: 'rgba(141, 211, 199, 1)' } },
        axisLabel: { formatter: '{value}%' },
      },
    ],
    series: [
      {
        name: 'Emails Sent',
        type: 'line',
        yAxisIndex: 0,
        smooth: true,
        lineStyle: { width: 3, color: 'rgba(87, 181, 231, 1)' },
        itemStyle: { color: 'rgba(87, 181, 231, 1)' },
        showSymbol: false,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{ offset: 0, color: 'rgba(87, 181, 231, 0.3)' }, { offset: 1, color: 'rgba(87, 181, 231, 0.1)' }],
          },
        },
        data: [820, 932, 901, 934, 1290, 1330, 1320],
      },
      {
        name: 'Open Rate',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        lineStyle: { width: 3, color: 'rgba(141, 211, 199, 1)' },
        itemStyle: { color: 'rgba(141, 211, 199, 1)' },
        showSymbol: false,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{ offset: 0, color: 'rgba(141, 211, 199, 0.3)' }, { offset: 1, color: 'rgba(141, 211, 199, 0.1)' }],
          },
        },
        data: [42, 43.5, 41.2, 44.7, 46.2, 48.5, 42.8],
      },
      {
        name: 'Reply Rate',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        lineStyle: { width: 3, color: 'rgba(251, 191, 114, 1)' },
        itemStyle: { color: 'rgba(251, 191, 114, 1)' },
        showSymbol: false,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{ offset: 0, color: 'rgba(251, 191, 114, 0.3)' }, { offset: 1, color: 'rgba(251, 191, 114, 0.1)' }],
          },
        },
        data: [18.2, 17.8, 16.5, 19.2, 20.4, 21.5, 18.3],
      },
    ],
  };

  const responseTimeChartOptions = {
    animation: false,
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      textStyle: { color: '#1f2937' },
    },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '3%', containLabel: true },
    xAxis: { type: 'category', data: ['<1h', '1-3h', '3-6h', '6-12h', '12-24h', '>24h'] },
    yAxis: { type: 'value', axisLabel: { formatter: '{value}%' } },
    series: [
      {
        data: [12, 28, 24, 18, 10, 8],
        type: 'bar',
        barWidth: '60%',
        itemStyle: { color: 'rgba(87, 181, 231, 1)', borderRadius: [4, 4, 0, 0] },
      },
    ],
  };

  const timeDistributionChartOptions = {
    animation: false,
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      textStyle: { color: '#1f2937' },
    },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '3%', containLabel: true },
    xAxis: { type: 'category', data: ['5-7', '7-9', '9-11', '11-13', '13-15', '15-17', '17-19', '19-21'] },
    yAxis: { type: 'value', axisLabel: { formatter: '{value}%' } },
    series: [
      {
        data: [12, 19, 28, 22, 16, 18, 21, 14],
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: { width: 3, color: 'rgba(141, 211, 199, 1)' },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{ offset: 0, color: 'rgba(141, 211, 199, 0.3)' }, { offset: 1, color: 'rgba(141, 211, 199, 0.1)' }],
          },
        },
      },
    ],
  };

  const dayPerformanceChartOptions = {
    animation: false,
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      textStyle: { color: '#1f2937' },
    },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '3%', containLabel: true },
    xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
    yAxis: { type: 'value', axisLabel: { formatter: '{value}%' } },
    series: [
      {
        data: [22, 26, 24, 20, 18, 14, 12],
        type: 'bar',
        barWidth: '60%',
        itemStyle: {
          color: function (params) {
            const colorList = [
              'rgba(251, 191, 114, 1)',
              'rgba(87, 181, 231, 1)',
              'rgba(141, 211, 199, 1)',
              'rgba(251, 191, 114, 1)',
              'rgba(252, 141, 98, 1)',
              'rgba(141, 211, 199, 0.7)',
              'rgba(141, 211, 199, 0.7)',
            ];
            return colorList[params.dataIndex];
          },
          borderRadius: [4, 4, 0, 0],
        },
      },
    ],
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dateRangeRef.current && !dateRangeRef.current.contains(event.target)) {
        setDateRangeOpen(false);
      }
      if (accountFilterRef.current && !accountFilterRef.current.contains(event.target)) {
        setAccountFilterOpen(false);
      }
      if (campaignFilterRef.current && !campaignFilterRef.current.contains(event.target)) {
        setCampaignFilterOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <main className="p-6">
      {/* Metrics Overview */}
      <section className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Total Emails Sent</h3>
              <div className="flex items-center text-green-500 text-xs font-medium">
                <ArrowUp className="w-4 h-4 mr-1" />
                <span>12.5%</span>
              </div>
            </div>
            <div className="flex items-end">
              <p className="text-3xl font-bold text-gray-900">8,942</p>
              <p className="ml-2 text-xs text-gray-500 mb-1">vs 7,948 last period</p>
            </div>
          </div>
          <div className="bg-white rounded shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Open Rate</h3>
              <div className="flex items-center text-green-500 text-xs font-medium">
                <ArrowUp className="w-4 h-4 mr-1" />
                <span>3.2%</span>
              </div>
            </div>
            <div className="flex items-end">
              <p className="text-3xl font-bold text-gray-900">42.8%</p>
              <p className="ml-2 text-xs text-gray-500 mb-1">vs 41.5% last period</p>
            </div>
          </div>
          <div className="bg-white rounded shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Reply Rate</h3>
              <div className="flex items-center text-red-500 text-xs font-medium">
                <ArrowDown className="w-4 h-4 mr-1" />
                <span>1.8%</span>
              </div>
            </div>
            <div className="flex items-end">
              <p className="text-3xl font-bold text-gray-900">18.3%</p>
              <p className="ml-2 text-xs text-gray-500 mb-1">vs 18.6% last period</p>
            </div>
          </div>
          <div className="bg-white rounded shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Avg. Response Time</h3>
              <div className="flex items-center text-green-500 text-xs font-medium">
                <ArrowUp className="w-4 h-4 mr-1" />
                <span>8.4%</span>
              </div>
            </div>
            <div className="flex items-end">
              <p className="text-3xl font-bold text-gray-900">3.2h</p>
              <p className="ml-2 text-xs text-gray-500 mb-1">vs 3.5h last period</p>
            </div>
          </div>
        </div>
      </section>

      {/* Email Performance Charts */}
      <section className="mb-8">
        <div className="bg-white rounded shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-gray-900">Email Performance</h2>
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative date-range-selector" ref={dateRangeRef}>
                  <button
                    onClick={() => setDateRangeOpen(!dateRangeOpen)}
                    className="flex items-center justify-between w-36 px-3 py-2 bg-white border border-gray-300 rounded-button text-sm text-gray-700 hover:bg-gray-50 whitespace-nowrap"
                  >
                    <span>Last 30 days</span>
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </button>
                  {dateRangeOpen && (
                    <div className="date-range-dropdown bg-white border border-gray-200 rounded shadow-lg p-2">
                      <div className="space-y-1">
                        {['Last 7 days', 'Last 30 days', 'Last 90 days', 'Custom range'].map((option) => (
                          <button
                            key={option}
                            className={`w-full px-3 py-2 text-left text-sm ${option === 'Last 30 days' ? 'bg-gray-100' : 'hover:bg-gray-100'} rounded`}
                            onClick={() => setDateRangeOpen(false)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="relative account-filter" ref={accountFilterRef}>
                  <button
                    onClick={() => setAccountFilterOpen(!accountFilterOpen)}
                    className="flex items-center justify-between w-48 px-3 py-2 bg-white border border-gray-300 rounded-button text-sm text-gray-700 hover:bg-gray-50 whitespace-nowrap"
                  >
                    <span>All accounts</span>
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </button>
                  {accountFilterOpen && (
                    <div className="account-filter-dropdown bg-white border border-gray-200 rounded shadow-lg p-2">
                      <div className="space-y-1">
                        {['All accounts', 'work@gmail.com', 'outlook@live.com'].map((option) => (
                          <button
                            key={option}
                            className={`w-full px-3 py-2 text-left text-sm ${option === 'All accounts' ? 'bg-gray-100' : 'hover:bg-gray-100'} rounded`}
                            onClick={() => setAccountFilterOpen(false)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="relative campaign-filter" ref={campaignFilterRef}>
                  <button
                    onClick={() => setCampaignFilterOpen(!campaignFilterOpen)}
                    className="flex items-center justify-between w-48 px-3 py-2 bg-white border border-gray-300 rounded-button text-sm text-gray-700 hover:bg-gray-50 whitespace-nowrap"
                  >
                    <span>All campaign types</span>
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </button>
                  {campaignFilterOpen && (
                    <div className="campaign-filter-dropdown bg-white border border-gray-200 rounded shadow-lg p-2">
                      <div className="space-y-1">
                        {['All campaign types', 'Outreach', 'Follow-up', 'Newsletter'].map((option) => (
                          <button
                            key={option}
                            className={`w-full px-3 py-2 text-left text-sm ${option === 'All campaign types' ? 'bg-gray-100' : 'hover:bg-gray-100'} rounded`}
                            onClick={() => setCampaignFilterOpen(false)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <button className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-button text-sm text-gray-700 hover:bg-gray-50 whitespace-nowrap">
                  <Download className="w-4 h-4 mr-2" />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>
          <div className="p-6">
            <ReactECharts option={performanceChartOptions} className="chart-container" />
          </div>
        </div>
      </section>

      {/* Campaign Analytics */}
      <section className="mb-8">
        <div className="bg-white rounded shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-gray-900">Campaign Analytics</h2>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
                  placeholder="Search campaigns"
                />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    <div className="flex items-center">
                      Campaign Name
                      <ArrowUp className="w-4 h-4 ml-1" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div className="flex items-center">
                      Send Date
                      <ArrowDown className="w-4 h-4 ml-1" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div className="flex items-center">
                      Recipients
                      <ArrowDown className="w-4 h-4 ml-1" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div className="flex items-center">
                      Open Rate
                      <ArrowDown className="w-4 h-4 ml-1" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div className="flex items-center">
                      Reply Rate
                      <ArrowDown className="w-4 h-4 ml-1" />
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div className="flex items-center">
                      Success Rate
                      <ArrowDown className="w-4 h-4 ml-1" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign, index) => (
                  <tr key={index} className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="px-6 py-4 font-medium text-gray-900">{campaign.name}</td>
                    <td className="px-6 py-4">{campaign.date}</td>
                    <td className="px-6 py-4">{campaign.recipients}</td>
                    <td className="px-6 py-4">{`${campaign.openRate}%`}</td>
                    <td className="px-6 py-4">{`${campaign.replyRate}%`}</td>
                    <td className="px-6 py-4">{`${campaign.successRate}%`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 flex items-center justify-between border-t border-gray-200">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
              <span className="font-medium">42</span> results
            </div>
            <div className="flex items-center space-x-2">
              <button className="pagination-button bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50" disabled>
                <ChevronLeft className="w-5 h-5" />
              </button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`pagination-button rounded-md ${page === 1 ? 'bg-primary text-white' : 'bg-white border border-gray-300 hover:bg-gray-50'}`}
                >
                  {page}
                </button>
              ))}
              <button className="pagination-button bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Response Time Analysis */}
      <section className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Response Time</h3>
            <ReactECharts option={responseTimeChartOptions} style={{ height: '256px' }} />
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Average first response</span>
                <span className="text-sm font-medium">3.2 hours</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Median response</span>
                <span className="text-sm font-medium">2.5 hours</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Fastest response</span>
                <span className="text-sm font-medium">12 minutes</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Time Distribution</h3>
            <ReactECharts option={timeDistributionChartOptions} style={{ height: '256px' }} />
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Best performing time</span>
                <span className="text-sm font-medium">9:00 - 11:00 AM</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Worst performing time</span>
                <span className="text-sm font-medium">3:00 - 5:00 PM</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Response rate variance</span>
                <span className="text-sm font-medium">±8.4%</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Day Performance</h3>
            <ReactECharts option={dayPerformanceChartOptions} style={{ height: '256px' }} />
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Best performing day</span>
                <span className="text-sm font-medium">Tuesday</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Worst performing day</span>
                <span className="text-sm font-medium">Friday</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Weekend performance</span>
                <span className="text-sm font-medium">-12.3%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Export Options */}
      <section>
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Export Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="export-option border border-gray-200 rounded p-4 cursor-pointer hover:border-primary">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                <FileText className="w-5 h-5 text-blue-500" />
              </div>
              <h3 className="text-md font-medium text-gray-900 mb-1">Raw Data (CSV)</h3>
              <p className="text-sm text-gray-500">Export all raw data in CSV format for further analysis</p>
            </div>
            <div className="export-option border border-gray-200 rounded p-4 cursor-pointer hover:border-primary">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
                <File className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="text-md font-medium text-gray-900 mb-1">Report Summary (PDF)</h3>
              <p className="text-sm text-gray-500">Generate a comprehensive PDF report with all analytics</p>
            </div>
            <div className="export-option border border-gray-200 rounded p-4 cursor-pointer hover:border-primary">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-4">
                <BarChart className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-md font-medium text-gray-900 mb-1">Custom Report</h3>
              <p className="text-sm text-gray-500">Build your own report with selected metrics and charts</p>
            </div>
            <div className="export-option border border-gray-200 rounded p-4 cursor-pointer hover:border-primary">
              <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center mb-4">
                <CalendarCheck className="w-5 h-5 text-purple-500" />
              </div>
              <h3 className="text-md font-medium text-gray-900 mb-1">Schedule Reports</h3>
              <p className="text-sm text-gray-500">Set up automated reports delivered to your email</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Analytics;