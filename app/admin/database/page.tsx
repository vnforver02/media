'use client';

import { useState, useEffect } from 'react';
import { Download, RefreshCw } from 'lucide-react';

interface DatabaseData {
  services: any[];
  jobs: any[];
  case_studies: any[];
  contact_leads: any[];
  navigation: any[];
  site_settings: any[];
  faqs: any[];
  admin_users: any[];
}

export default function DatabasePage() {
  const [data, setData] = useState<DatabaseData>({
    services: [],
    jobs: [],
    case_studies: [],
    contact_leads: [],
    navigation: [],
    site_settings: [],
    faqs: [],
    admin_users: [],
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('services');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const responses = await Promise.all([
          fetch('/api/services'),
          fetch('/api/jobs'),
          fetch('/api/case-studies'),
          fetch('/api/leads'),
          fetch('/api/navigation'),
          fetch('/api/site-settings'),
          fetch('/api/faqs'),
          fetch('/api/admin-users'),
        ]);

        const [services, jobs, caseStudies, leads, navigation, settings, faqs, adminUsers] = 
          await Promise.all(responses.map(r => r.json()));

        setData({
          services: services || [],
          jobs: jobs || [],
          case_studies: caseStudies || [],
          contact_leads: leads || [],
          navigation: navigation || [],
          site_settings: settings || [],
          faqs: faqs || [],
          admin_users: adminUsers || [],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const downloadJSON = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mediatoday-database-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportAsCSV = (tableName: string, tableData: any[]) => {
    if (!tableData.length) {
      alert('No data to export');
      return;
    }

    const headers = Object.keys(tableData[0]);
    const csv = [
      headers.join(','),
      ...tableData.map(row =>
        headers.map(header => {
          const value = row[header];
          if (typeof value === 'string' && value.includes(',')) {
            return `"${value}"`;
          }
          return value || '';
        }).join(',')
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${tableName}-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: 'services', label: 'Services', count: data.services.length },
    { id: 'jobs', label: 'Jobs', count: data.jobs.length },
    { id: 'case_studies', label: 'Case Studies', count: data.case_studies.length },
    { id: 'contact_leads', label: 'Contact Leads', count: data.contact_leads.length },
    { id: 'navigation', label: 'Navigation', count: data.navigation.length },
    { id: 'site_settings', label: 'Site Settings', count: data.site_settings.length },
    { id: 'admin_users', label: 'Admin Users', count: data.admin_users.length },
  ];

  const getTableData = () => {
    const tableMap: { [key: string]: any[] } = {
      services: data.services,
      jobs: data.jobs,
      case_studies: data.case_studies,
      contact_leads: data.contact_leads,
      navigation: data.navigation,
      site_settings: data.site_settings,
      faqs: data.faqs,
      admin_users: data.admin_users,
    };
    return tableMap[activeTab] || [];
  };

  const tableData = getTableData();

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading database...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Database Content</h1>
          <p className="text-gray-600 mt-2">View, explore and export all database tables</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={downloadJSON}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Download size={18} />
            Export All JSON
          </button>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            <RefreshCw size={18} />
            Refresh
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {tab.label}
            <span className="ml-2 text-sm opacity-75">({tab.count})</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {tableData.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p className="text-lg">No data in {activeTab.replace('_', ' ')} table</p>
          </div>
        ) : (
          <>
            {/* Table Controls */}
            <div className="p-4 bg-gray-50 border-b flex gap-2">
              <button
                onClick={() => exportAsCSV(activeTab, tableData)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium"
              >
                Export as CSV
              </button>
              <button
                onClick={() => {
                  const jsonStr = JSON.stringify(tableData, null, 2);
                  const blob = new Blob([jsonStr], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = `${activeTab}-${new Date().toISOString().split('T')[0]}.json`;
                  link.click();
                  URL.revokeObjectURL(url);
                }}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm font-medium"
              >
                Export as JSON
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    {Object.keys(tableData[0]).map(key => (
                      <th
                        key={key}
                        className="px-4 py-3 text-left text-sm font-semibold text-gray-700"
                      >
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      {Object.values(row).map((value, cellIdx) => (
                        <td key={cellIdx} className="px-4 py-3 text-sm text-gray-600">
                          {value === null ? (
                            <span className="text-gray-400">NULL</span>
                          ) : typeof value === 'boolean' ? (
                            <span className={value ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                              {value.toString()}
                            </span>
                          ) : typeof value === 'object' ? (
                            <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                              {JSON.stringify(value).substring(0, 50)}...
                            </code>
                          ) : (
                            <span className="break-words max-w-xs">
                              {String(value).substring(0, 100)}
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Row Count */}
            <div className="p-4 bg-gray-50 border-t text-sm text-gray-600">
              Total: <span className="font-semibold">{tableData.length}</span> records
            </div>
          </>
        )}
      </div>

      {/* JSON Preview */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Full JSON Export</h2>
        <div className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-sm overflow-x-auto">
          <pre>{JSON.stringify(data, null, 2).substring(0, 2000)}...</pre>
        </div>
      </div>
    </div>
  );
}
