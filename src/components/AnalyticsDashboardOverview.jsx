import React, { useState, useEffect, useRef } from 'react';
import { Calendar, ArrowDown, Download, Info } from 'lucide-react';
import * as echarts from 'echarts';

const AnalyticsDashboardOverview = () => {
  const [timeRange, setTimeRange] = useState('Last 30 Days');
  const [timeRangeOpen, setTimeRangeOpen] = useState(false);
  const dailyActivityChartRef = useRef(null);
  const inboxPerformanceChartRef = useRef(null);
  const replyRateChartRef = useRef(null);

  useEffect(() => {
    // Initialize ECharts for Daily Activity Chart
    const dailyActivityChart = echarts.init(dailyActivityChartRef.current);
    dailyActivityChart.setOption({
      animation: false,
      tooltip: { trigger: 'axis', backgroundColor: 'rgba(255, 255, 255, 0.9)', borderWidth: 1, borderColor: '#e5e7eb', textStyle: { color: '#1f2937' } },
      legend: { data: ['Sent', 'Opened', 'Replied'], bottom: 0, textStyle: { color: '#1f2937' } },
      grid: { left: 0, right: 0, top: 10, bottom: 30, containLabel: true },
      xAxis: { type: 'category', boundaryGap: false, data: ['Jun 25', 'Jun 26', 'Jun 27', 'Jun 28', 'Jun 29', 'Jun 30', 'Jul 1', 'Jul 2'], axisLine: { lineStyle: { color: '#e5e7eb' } }, axisLabel: { color: '#1f2937' } },
      yAxis: { type: 'value', axisLine: { show: false }, axisTick: { show: false }, splitLine: { lineStyle: { color: '#f3f4f6' } }, axisLabel: { color: '#1f2937' } },
      series: [
        { name: 'Sent', type: 'line', smooth: true, showSymbol: false, data: [35, 42, 38, 45, 40, 52, 48, 39], lineStyle: { width: 3, color: 'rgba(87, 181, 231, 1)' }, areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(87, 181, 231, 0.2)' }, { offset: 1, color: 'rgba(87, 181, 231, 0.01)' }] } } },
        { name: 'Opened', type: 'line', smooth: true, showSymbol: false, data: [22, 25, 20, 28, 24, 30, 32, 24], lineStyle: { width: 3, color: 'rgba(141, 211, 199, 1)' }, areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(141, 211, 199, 0.2)' }, { offset: 1, color: 'rgba(141, 211, 199, 0.01)' }] } } },
        { name: 'Replied', type: 'line', smooth: true, showSymbol: false, data: [5, 7, 4, 9, 6, 8, 10, 7], lineStyle: { width: 3, color: 'rgba(251, 191, 114, 1)' }, areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(251, 191, 114, 0.2)' }, { offset: 1, color: 'rgba(251, 191, 114, 0.01)' }] } } },
      ],
    });

    // Initialize ECharts for Inbox Performance Chart
    const inboxPerformanceChart = echarts.init(inboxPerformanceChartRef.current);
    inboxPerformanceChart.setOption({
      animation: false,
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, backgroundColor: 'rgba(255, 255, 255, 0.9)', borderWidth: 1, borderColor: '#e5e7eb', textStyle: { color: '#1f2937' } },
      grid: { left: 0, right: 0, top: 10, bottom: 20, containLabel: true },
      xAxis: { type: 'category', data: ['alex.mitchell', 'sarah.dev', 'michael.tech'], axisLine: { lineStyle: { color: '#e5e7eb' } }, axisLabel: { color: '#1f2937' } },
      yAxis: { type: 'value', axisLine: { show: false }, axisTick: { show: false }, splitLine: { lineStyle: { color: '#f3f4f6' } }, axisLabel: { formatter: '{value}%', color: '#1f2937' } },
      series: [{ name: 'Reply Rate', type: 'bar', data: [16.7, 11.1, 22.9], itemStyle: { color: 'rgba(87, 181, 231, 1)', borderRadius: [4, 4, 0, 0] }, barWidth: '40%' }],
    });

    // Initialize ECharts for Reply Rate Chart
    const replyRateChart = echarts.init(replyRateChartRef.current);
    replyRateChart.setOption({
      animation: false,
      tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)', backgroundColor: 'rgba(255, 255, 255, 0.9)', borderWidth: 1, borderColor: '#e5e7eb', textStyle: { color: '#1f2937' } },
      legend: { orient: 'vertical', right: 10, top: 'center', textStyle: { color: '#1f2937' } },
      series: [
        {
          name: 'Reply Rate',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: { borderRadius: 6, borderColor: '#fff', borderWidth: 2 },
          label: { show: false },
          emphasis: { label: { show: false } },
          labelLine: { show: false },
          data: [
            { value: 45, name: 'Initial Outreach', itemStyle: { color: 'rgba(87, 181, 231, 1)' } },
            { value: 25, name: 'Follow-up', itemStyle: { color: 'rgba(141, 211, 199, 1)' } },
            { value: 15, name: 'Custom Template', itemStyle: { color: 'rgba(251, 191, 114, 1)' } },
            { value: 15, name: 'Personalized', itemStyle: { color: 'rgba(252, 141, 98, 1)' } },
          ],
        },
      ],
    });

    // Resize charts on window resize
    const resizeCharts = () => {
      dailyActivityChart.resize();
      inboxPerformanceChart.resize();
      replyRateChart.resize();
    };
    window.addEventListener('resize', resizeCharts);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', resizeCharts);
      dailyActivityChart.dispose();
      inboxPerformanceChart.dispose();
      replyRateChart.dispose();
    };
  }, []);

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Analytics Dashboard</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <button onClick={() => setTimeRangeOpen(!timeRangeOpen)} className="px-3 py-1.5 text-sm font-medium rounded-button border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 flex items-center">
              <Calendar className="w-4 h-4 mr-1.5" /> {timeRange} <ArrowDown className="w-4 h-4 ml-1.5" />
            </button>
            {timeRangeOpen && (
              <div className="absolute right-0 mt-1 w-40 bg-white shadow-sm rounded-lg border border-gray-200 z-10">
                {['Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'Custom Range'].map(range => (
                  <a key={range} href="#" onClick={() => { setTimeRange(range); setTimeRangeOpen(false); }} className="block px-4 py-2 text-sm hover:bg-gray-50">{range}</a>
                ))}
              </div>
            )}
          </div>
          <button className="p-1.5 rounded-full hover:bg-gray-100">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-700">Daily Email Activity</h3>
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                <span className="w-2 h-2 rounded-full bg-primary mr-1"></span> Sent
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span> Opened
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                <span className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></span> Replied
              </span>
            </div>
          </div>
          <div ref={dailyActivityChartRef} className="w-full h-64"></div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-700">Inbox Performance</h3>
            <div className="flex items-center space-x-1">
              <button className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700">Open Rate</button>
              <button className="px-2 py-1 text-xs font-medium rounded bg-primary text-white">Reply Rate</button>
            </div>
          </div>
          <div ref={inboxPerformanceChartRef} className="w-full h-64"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-700">Reply Rate by Email Type</h3>
            <button className="p-1 rounded hover:bg-gray-100">
              <Info className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          <div ref={replyRateChartRef} className="w-full h-64"></div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-700">Best Send Times (Heatmap)</h3>
            <button className="p-1 rounded hover:bg-gray-100">
              <Info className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-max">
              <div className="flex mb-2">
                <div className="w-16"></div>
                <div className="flex space-x-1">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                    <div key={day} className="text-xs text-gray-500 w-24 text-center">{day}</div>
                  ))}
                </div>
              </div>
              {['8-10 AM', '10-12 PM', '12-2 PM', '2-4 PM', '4-6 PM'].map(time => (
                <div key={time} className="flex items-center">
                  <div className="w-16 text-xs text-gray-500 pr-2 text-right">{time}</div>
                  <div className="flex space-x-1">
                    {[100, 200, 300, 400, 300].map((intensity, i) => (
                      <div key={i} className={`heatmap-cell bg-blue-${intensity}`}></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-end">
              <div className="flex items-center space-x-1">
                {[100, 200, 300, 400, 500, 600].map(intensity => (
                  <div key={intensity} className={`w-3 h-3 rounded-sm bg-blue-${intensity}`}></div>
                ))}
              </div>
              <div className="ml-2 flex items-center text-xs text-gray-500">
                <span>Low</span>
                <span className="mx-1">-</span>
                <span>High Response Rate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsDashboardOverview;