import React, { useState } from 'react';
import { Mail, Send, MailOpen, Reply, ChevronRight, ChevronLeft, ChevronDown, Search, Plus, Download, Pause, Play, Settings, MoreHorizontal, AlertCircle, MessageSquare, CalendarCheck, XCircle, RefreshCw, FileText, UserCog } from 'lucide-react';

const Inboxes = () => {
  const [statusFilterOpen, setStatusFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedInboxes, setSelectedInboxes] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);

  const inboxes = [
    {
      id: 1,
      email: 'jennifer.parker@example.com',
      provider: 'Google Workspace',
      icon: 'Google',
      status: 'Active',
      statusColor: 'bg-green-500',
      quota: { used: 32, total: 50 },
      activity: { sends: 78, opens: 42, replies: 15 },
      spamScore: { value: 0.2, label: 'Low', color: 'bg-green-100 text-green-800' },
      recentActivity: [
        { icon: 'MailSend', text: 'Sent 12 emails to Acme Corp contacts', time: 'Today at 10:23 AM', color: 'bg-blue-100 text-blue-600' },
        { icon: 'Reply', text: 'Received reply from Michael Thompson', time: 'Yesterday at 4:15 PM', color: 'bg-green-100 text-green-600' },
        { icon: 'MailOpen', text: '8 emails opened from Globex campaign', time: 'July 4, 2025', color: 'bg-purple-100 text-purple-600' },
      ],
      performance: { openRate: 53.8, replyRate: 19.2, bounceRate: 1.3 },
      campaigns: [
        { name: 'Q3 Product Launch', contacts: 32, openRate: 78 },
        { name: 'Enterprise Follow-ups', contacts: 18, openRate: 45 },
      ],
    },
    {
      id: 2,
      email: 'robert.wilson@example.org',
      provider: 'Microsoft 365',
      icon: 'Microsoft',
      status: 'Warming',
      statusColor: 'bg-yellow-500',
      quota: { used: 12, total: 30 },
      activity: { sends: 24, opens: 18, replies: 5 },
      spamScore: { value: 0.5, label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
      recentActivity: [
        { icon: 'MailSend', text: 'Sent 5 warm-up emails to internal contacts', time: 'Today at 9:45 AM', color: 'bg-yellow-100 text-yellow-600' },
        { icon: 'Reply', text: 'Received reply from Sarah Johnson', time: 'Yesterday at 2:30 PM', color: 'bg-green-100 text-green-600' },
        { icon: 'Settings', text: 'Warming plan updated to moderate', time: 'July 3, 2025', color: 'bg-blue-100 text-blue-600' },
      ],
      warming: { progress: 40, completion: 'July 12, 2025', dailyLimit: 30, speed: 'Moderate', autoReply: true, includeInCampaigns: false },
    },
    {
      id: 3,
      email: 'emily.chen@example.net',
      provider: 'Google Workspace',
      icon: 'Google',
      status: 'Paused',
      statusColor: 'bg-red-500',
      quota: { used: 0, total: 60 },
      activity: { sends: 124, opens: 87, replies: 32 },
      spamScore: { value: 0.8, label: 'High', color: 'bg-red-100 text-red-800' },
      recentActivity: [
        { icon: 'AlertCircle', text: 'Account paused due to high spam score', time: 'Today at 8:15 AM', color: 'bg-red-100 text-red-600' },
        { icon: 'MessageSquare', text: 'Spam complaint received from recipient', time: 'Yesterday at 11:30 AM', color: 'bg-red-100 text-red-600' },
        { icon: 'MailSend', text: 'Sent 18 emails to Initech prospects', time: 'July 2, 2025', color: 'bg-blue-100 text-blue-600' },
      ],
      spamIssues: ['High volume of similar content', 'Multiple spam complaints', 'Low engagement metrics'],
      recommendations: [
        { icon: 'RefreshCw', text: 'Reset Warming Plan', subtext: 'Start fresh with a slower ramp-up', color: 'bg-blue-100 text-blue-600' },
        { icon: 'FileText', text: 'Review Email Content', subtext: 'Check for spam triggers in templates', color: 'bg-blue-100 text-blue-600' },
        { icon: 'UserCog', text: 'Update Sending Practices', subtext: 'Improve targeting and personalization', color: 'bg-blue-100 text-blue-600' },
      ],
    },
    {
      id: 4,
      email: 'david.martinez@example.com',
      provider: 'Google Workspace',
      icon: 'Google',
      status: 'Active',
      statusColor: 'bg-green-500',
      quota: { used: 45, total: 80 },
      activity: { sends: 156, opens: 92, replies: 28 },
      spamScore: { value: 0.1, label: 'Low', color: 'bg-green-100 text-green-800' },
      recentActivity: [
        { icon: 'MailSend', text: 'Sent 25 emails to Tech Conference attendees', time: 'Today at 11:45 AM', color: 'bg-blue-100 text-blue-600' },
        { icon: 'Reply', text: 'Received 4 new replies from Enterprise campaign', time: 'Yesterday at 3:20 PM', color: 'bg-green-100 text-green-600' },
        { icon: 'CalendarCheck', text: '3 meetings scheduled from email responses', time: 'July 3, 2025', color: 'bg-indigo-100 text-indigo-600' },
      ],
      performance: { openRate: 59.0, replyRate: 17.9, meetingRate: 5.1 },
      campaigns: [
        { name: 'Tech Conference Follow-up', contacts: 48, openRate: 62 },
        { name: 'Enterprise Decision Makers', contacts: 32, openRate: 54 },
        { name: 'Product Demo Request', contacts: 15, openRate: 73 },
      ],
    },
    {
      id: 5,
      email: 'sarah.johnson@example.org',
      provider: 'Microsoft 365',
      icon: 'Microsoft',
      status: 'Active',
      statusColor: 'bg-green-500',
      quota: { used: 28, total: 40 },
      activity: { sends: 92, opens: 51, replies: 14 },
      spamScore: { value: 0.3, label: 'Low', color: 'bg-green-100 text-green-800' },
      recentActivity: [],
      performance: { openRate: 0, replyRate: 0, bounceRate: 0 },
      campaigns: [],
    },
  ];

  const toggleCheckbox = (id) => {
    if (id === 'all') {
      setSelectAll(!selectAll);
      setSelectedInboxes(selectAll ? [] : inboxes.map((inbox) => inbox.id));
    } else {
      const updated = selectedInboxes.includes(id)
        ? selectedInboxes.filter((inboxId) => inboxId !== id)
        : [...selectedInboxes, id];
      setSelectedInboxes(updated);
      setSelectAll(updated.length === inboxes.length);
    }
  };

  const toggleRow = (id) => {
    setExpandedRows(
      expandedRows.includes(id)
        ? expandedRows.filter((rowId) => rowId !== id)
        : [...expandedRows, id]
    );
  };

  const getIcon = (iconName) => {
    const icons = {
      Google: <Mail className="w-5 h-5" />,
      Microsoft: <Mail className="w-5 h-5" />,
      MailSend: <Send className="w-5 h-5" />,
      Reply: <Reply className="w-5 h-5" />,
      MailOpen: <MailOpen className="w-5 h-5" />,
      Settings: <Settings className="w-5 h-5" />,
      AlertCircle: <AlertCircle className="w-5 h-5" />,
      MessageSquare: <MessageSquare className="w-5 h-5" />,
      CalendarCheck: <CalendarCheck className="w-5 h-5" />,
      RefreshCw: <RefreshCw className="w-5 h-5" />,
      FileText: <FileText className="w-5 h-5" />,
      UserCog: <UserCog className="w-5 h-5" />,
    };
    return icons[iconName] || <Mail className="w-5 h-5" />;
  };

  return (
    <main className="flex-1 p-6 overflow-x-hidden">
      <div className="max-w-[1200px] mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <a href="#" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
                  <Mail className="w-4 h-4 mr-2" />
                  Dashboard
                </a>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
                  <span className="text-sm font-medium text-gray-800">Inboxes</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary bg-opacity-10 text-primary mr-4">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Connected Inboxes</p>
                <h3 className="text-2xl font-bold text-gray-800">14</h3>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-green-600 mr-4">
                <Send className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Active Campaigns</p>
                <h3 className="text-2xl font-bold text-gray-800">8</h3>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-4">
                <MailOpen className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Average Open Rate</p>
                <h3 className="text-2xl font-bold text-gray-800">42.8%</h3>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mr-4">
                <Reply className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Average Reply Rate</p>
                <h3 className="text-2xl font-bold text-gray-800">18.3%</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Table Controls */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <button
                  onClick={() => setStatusFilterOpen(!statusFilterOpen)}
                  className="flex items-center justify-between w-full sm:w-40 px-4 py-2 bg-white border border-gray-300 rounded-button text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-30 whitespace-nowrap"
                >
                  <span>All Status</span>
                  <ChevronDown className="w-4 h-4 ml-2" />
                </button>
                {statusFilterOpen && (
                  <div className="dropdown-content mt-1">
                    <div className="py-1">
                      {['All Status', 'Active', 'Paused', 'Warming'].map((status) => (
                        <button
                          key={status}
                          className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                          onClick={() => {
                            setStatusFilterOpen(false);
                            // Add filter logic here
                          }}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-button text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-30"
                  placeholder="Search inboxes..."
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className="flex items-center justify-between w-full sm:w-40 px-4 py-2 bg-white border border-gray-300 rounded-button text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-30 whitespace-nowrap"
                >
                  <span>Sort by: Last Activity</span>
                  <ChevronDown className="w-4 h-4 ml-2" />
                </button>
                {sortOpen && (
                  <div className="dropdown-content mt-1">
                    <div className="py-1">
                      {['Last Activity', 'Email', 'Status'].map((sort) => (
                        <button
                          key={sort}
                          className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                          onClick={() => {
                            setSortOpen(false);
                            // Add sort logic here
                          }}
                        >
                          {sort}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-button text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary whitespace-nowrap">
                  <Plus className="w-4 h-4 mr-2" />
                  Connect New
                </button>
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-button text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary whitespace-nowrap">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Inboxes Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                    <div
                      className={`custom-checkbox ${selectAll ? 'checked' : ''}`}
                      onClick={() => toggleCheckbox('all')}
                    />
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email Address
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Daily Quota
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Activity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Spam Score
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {inboxes.map((inbox) => (
                  <React.Fragment key={inbox.id}>
                    <tr
                      className={`inbox-row hover:bg-gray-50 cursor-pointer ${expandedRows.includes(inbox.id) ? 'expanded' : ''}`}
                      onClick={() => toggleRow(inbox.id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className={`custom-checkbox ${selectedInboxes.includes(inbox.id) ? 'checked' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCheckbox(inbox.id);
                          }}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 flex items-center justify-center rounded-full ${inbox.icon === 'Google' ? 'bg-blue-100 text-blue-600' : 'bg-blue-100 text-blue-600'} mr-3`}>
                            {getIcon(inbox.icon)}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{inbox.email}</div>
                            <div className="text-xs text-gray-500">{inbox.provider}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={`status-dot ${inbox.statusColor}`} />
                          <span className="text-sm text-gray-900">{inbox.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-32">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-500">Daily Quota</span>
                            <span className="text-xs font-medium text-gray-900">{`${inbox.quota.used}/${inbox.quota.total}`}</span>
                          </div>
                          <div className="progress-bar">
                            <div
                              className={`progress-bar-fill ${inbox.status === 'Paused' ? 'bg-gray-300' : 'bg-green-500'}`}
                              style={{ width: `${(inbox.quota.used / inbox.quota.total) * 100}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-4">
                          <div className="text-center">
                            <div className="text-sm font-medium text-gray-900">{inbox.activity.sends}</div>
                            <div className="text-xs text-gray-500">Sends</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium text-gray-900">{inbox.activity.opens}</div>
                            <div className="text-xs text-gray-500">Opens</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium text-gray-900">{inbox.activity.replies}</div>
                            <div className="text-xs text-gray-500">Replies</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${inbox.spamScore.color}`}>
                            {`${inbox.spamScore.label} ${inbox.spamScore.value}`}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                            {inbox.status === 'Paused' ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                          </button>
                          <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                            <Settings className="w-5 h-5" />
                          </button>
                          <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                            <MoreHorizontal className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedRows.includes(inbox.id) && (
                      <tr className="inbox-details">
                        <td colSpan="7" className="px-6 py-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <div>
                                <h4 className="text-sm font-medium text-gray-900 mb-3">Recent Activity</h4>
                                <div className="space-y-3">
                                  {inbox.recentActivity.map((activity, index) => (
                                    <div key={index} className="flex items-start">
                                      <div className={`w-8 h-8 flex items-center justify-center rounded-full ${activity.color} mr-3 mt-0.5`}>
                                        {getIcon(activity.icon)}
                                      </div>
                                      <div>
                                        <p className="text-sm text-gray-900">{activity.text}</p>
                                        <p className="text-xs text-gray-500">{activity.time}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div>
                                {inbox.status === 'Warming' ? (
                                  <>
                                    <h4 className="text-sm font-medium text-gray-900 mb-3">Warming Progress</h4>
                                    <div className="space-y-3">
                                      <div>
                                        <div className="flex items-center justify-between mb-1">
                                          <span className="text-xs text-gray-500">Warming Progress</span>
                                          <span className="text-xs font-medium text-gray-900">{`${inbox.warming.progress}%`}</span>
                                        </div>
                                        <div className="progress-bar">
                                          <div className="progress-bar-fill bg-yellow-500" style={{ width: `${inbox.warming.progress}%` }} />
                                        </div>
                                      </div>
                                      <div>
                                        <div className="flex items-center justify-between mb-1">
                                          <span className="text-xs text-gray-500">Estimated Completion</span>
                                          <span className="text-xs font-medium text-gray-900">{inbox.warming.completion}</span>
                                        </div>
                                      </div>
                                      <div>
                                        <div className="flex items-center justify-between mb-1">
                                          <span className="text-xs text-gray-500">Daily Send Limit</span>
                                          <span className="text-xs font-medium text-gray-900">{`${inbox.warming.dailyLimit} emails`}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                ) : inbox.status === 'Paused' ? (
                                  <>
                                    <h4 className="text-sm font-medium text-gray-900 mb-3">Spam Score Analysis</h4>
                                    <div className="space-y-3">
                                      <div>
                                        <div className="flex items-center justify-between mb-1">
                                          <span className="text-xs text-gray-500">Current Score</span>
                                          <span className="text-xs font-medium text-red-600">{`${inbox.spamScore.value} (High)`}</span>
                                        </div>
                                        <div className="progress-bar">
                                          <div className="progress-bar-fill bg-red-500" style={{ width: `${inbox.spamScore.value * 100}%` }} />
                                        </div>
                                      </div>
                                      <div className="p-3 bg-white rounded-lg border border-gray-200">
                                        <h5 className="text-xs font-medium text-gray-900 mb-2">Issues Detected:</h5>
                                        <ul className="text-xs text-gray-700 space-y-1">
                                          {inbox.spamIssues.map((issue, index) => (
                                            <li key={index} className="flex items-start">
                                              <XCircle className="w-3 h-3 text-red-500 mr-1 mt-0.5" />
                                              {issue}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <h4 className="text-sm font-medium text-gray-900 mb-3">Performance Metrics</h4>
                                    <div className="space-y-3">
                                      <div>
                                        <div className="flex items-center justify-between mb-1">
                                          <span className="text-xs text-gray-500">Open Rate</span>
                                          <span className="text-xs font-medium text-gray-900">{`${inbox.performance.openRate}%`}</span>
                                        </div>
                                        <div className="progress-bar">
                                          <div className="progress-bar-fill bg-blue-500" style={{ width: `${inbox.performance.openRate}%` }} />
                                        </div>
                                      </div>
                                      <div>
                                        <div className="flex items-center justify-between mb-1">
                                          <span className="text-xs text-gray-500">Reply Rate</span>
                                          <span className="text-xs font-medium text-gray-900">{`${inbox.performance.replyRate}%`}</span>
                                        </div>
                                        <div className="progress-bar">
                                          <div className="progress-bar-fill bg-green-500" style={{ width: `${inbox.performance.replyRate}%` }} />
                                        </div>
                                      </div>
                                      <div>
                                        <div className="flex items-center justify-between mb-1">
                                          <span className="text-xs text-gray-500">{inbox.performance.meetingRate ? 'Meeting Rate' : 'Bounce Rate'}</span>
                                          <span className="text-xs font-medium text-gray-900">{`${inbox.performance.meetingRate || inbox.performance.bounceRate}%`}</span>
                                        </div>
                                        <div className="progress-bar">
                                          <div
                                            className={`progress-bar-fill ${inbox.performance.meetingRate ? 'bg-indigo-500' : 'bg-red-500'}`}
                                            style={{ width: `${inbox.performance.meetingRate || inbox.performance.bounceRate}%` }}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                              <div>
                                {inbox.status === 'Warming' ? (
                                  <>
                                    <h4 className="text-sm font-medium text-gray-900 mb-3">Warming Settings</h4>
                                    <div className="space-y-3">
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-700">Warming Speed</span>
                                        <div className="relative">
                                          <select
                                            className="block w-32 pl-3 pr-8 py-1.5 text-sm border border-gray-300 rounded-button bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-30 appearance-none"
                                            defaultValue={inbox.warming.speed}
                                          >
                                            <option>Moderate</option>
                                            <option>Slow</option>
                                            <option>Fast</option>
                                          </select>
                                          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                            <ChevronDown className="w-4 h-4 text-gray-400" />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-700">Auto-Reply</span>
                                        <label className="toggle-switch">
                                          <input type="checkbox" defaultChecked={inbox.warming.autoReply} />
                                          <span className="toggle-slider" />
                                        </label>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-700">Include in campaigns</span>
                                        <label className="toggle-switch">
                                          <input type="checkbox" defaultChecked={inbox.warming.includeInCampaigns} />
                                          <span className="toggle-slider" />
                                        </label>
                                      </div>
                                    </div>
                                  </>
                                ) : inbox.status === 'Paused' ? (
                                  <>
                                    <h4 className="text-sm font-medium text-gray-900 mb-3">Recommended Actions</h4>
                                    <div className="space-y-2">
                                      {inbox.recommendations.map((rec, index) => (
                                        <div key={index} className="flex items-center p-2 rounded-lg bg-white border border-gray-200">
                                          <div className={`w-8 h-8 flex items-center justify-center rounded-full ${rec.color} mr-3`}>
                                            {getIcon(rec.icon)}
                                          </div>
                                          <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">{rec.text}</p>
                                            <p className="text-xs text-gray-500">{rec.subtext}</p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <h4 className="text-sm font-medium text-gray-900 mb-3">Active Campaigns</h4>
                                    <div className="space-y-2">
                                      {inbox.campaigns.map((campaign, index) => (
                                        <div key={index} className="flex items-center p-2 rounded-lg bg-white border border-gray-200">
                                          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mr-3">
                                            <Send className="w-5 h-5" />
                                          </div>
                                          <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">{campaign.name}</p>
                                            <p className="text-xs text-gray-500">{`${campaign.contacts} contacts • ${campaign.openRate}% open rate`}</p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end">
                              <div className="flex space-x-3">
                                <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-button text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary whitespace-nowrap">
                                  {inbox.status === 'Warming' ? 'View Warming Plan' : inbox.status === 'Paused' ? 'View Detailed Report' : 'View Full Analytics'}
                                </button>
                                <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-button text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary whitespace-nowrap">
                                  {inbox.status === 'Warming' ? 'Accelerate Warming' : inbox.status === 'Paused' ? 'Resume with Caution' : 'Manage Settings'}
                                </button>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-button text-gray-700 bg-white hover:bg-gray-50 whitespace-nowrap">
                Previous
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-button text-gray-700 bg-white hover:bg-gray-50 whitespace-nowrap">
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">14</span> inboxes
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Previous</span>
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-primary text-sm font-medium text-white hover:bg-primary/90">
                    1
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    2
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    3
                  </button>
                  <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                    ...
                  </span>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Next</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Inboxes;