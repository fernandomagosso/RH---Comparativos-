import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  Plus, 
  LayoutDashboard, 
  Loader2, 
  FileText, 
  ChevronRight 
} from 'lucide-react';
import { CompanyReport, ViewState } from './types';
import { INITIAL_REPORTS } from './constants';
import ReportView from './components/ReportView';
import { generateCompanyReport } from './services/geminiService';

function App() {
  const [reports, setReports] = useState<CompanyReport[]>(INITIAL_REPORTS);
  const [activeReport, setActiveReport] = useState<CompanyReport | null>(null);
  const [view, setView] = useState<ViewState>('dashboard');
  
  // Creation Form State
  const [companyName, setCompanyName] = useState('');
  const [sectorHint, setSectorHint] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) return;

    setIsGenerating(true);
    setError('');

    try {
      const newReport = await generateCompanyReport(companyName, sectorHint);
      setReports([newReport, ...reports]);
      setActiveReport(newReport);
      setView('report');
      setCompanyName('');
      setSectorHint('');
    } catch (err) {
      console.error(err);
      setError('Failed to generate report. Please try again or check your API Key.');
    } finally {
      setIsGenerating(false);
    }
  };

  const renderContent = () => {
    if (view === 'report' && activeReport) {
      return (
        <ReportView 
          report={activeReport} 
          onBack={() => setView('dashboard')} 
        />
      );
    }

    if (view === 'create') {
      return (
        <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900">New Corporate X-Ray</h2>
            <p className="text-gray-500 mt-2">Generate a comprehensive profile for any company using AI.</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <form onSubmit={handleGenerate} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input 
                  type="text" 
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Google, Magazine Luiza, Nestle..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none"
                  disabled={isGenerating}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sector (Optional)</label>
                <input 
                  type="text" 
                  value={sectorHint}
                  onChange={(e) => setSectorHint(e.target.value)}
                  placeholder="e.g. Retail, Tech, Pharma..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none"
                  disabled={isGenerating}
                />
                <p className="text-xs text-gray-400 mt-1">Helps disambiguate companies with similar names.</p>
              </div>

              {error && (
                <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button 
                type="submit" 
                disabled={isGenerating || !companyName.trim()}
                className={`w-full py-4 rounded-lg font-semibold text-white shadow-md flex items-center justify-center transition-all ${
                  isGenerating || !companyName.trim() 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5'
                }`}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing Market Data...
                  </>
                ) : (
                  <>
                    Generate Report
                  </>
                )}
              </button>
            </form>
          </div>
          
          <div className="mt-8 text-center">
            <button onClick={() => setView('dashboard')} className="text-gray-500 hover:text-gray-800 text-sm font-medium">
              Cancel and return to dashboard
            </button>
          </div>
        </div>
      );
    }

    // Dashboard View
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
            <p className="text-gray-500">Manage your market research and company profiles.</p>
          </div>
          <button 
            onClick={() => setView('create')}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Analysis
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <div 
              key={report.id}
              onClick={() => {
                setActiveReport(report);
                setView('report');
              }}
              className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex justify-between items-start mb-4">
                <div className="bg-blue-50 p-3 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-xs text-gray-400 font-mono">
                  {new Date(report.generatedAt).toLocaleDateString()}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">
                {report.name}
              </h3>
              <p className="text-sm text-gray-500 mb-4">{report.sector}</p>
              
              <p className="text-gray-600 text-sm line-clamp-3 mb-6">
                {report.overview}
              </p>

              <div className="flex items-center text-blue-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
                View Full X-Ray <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          ))}

          {/* Empty State / CTA if no reports (unlikely given constants, but good practice) */}
          {reports.length === 0 && (
            <div className="col-span-full text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No reports yet</h3>
              <p className="text-gray-500 mb-6">Start by generating your first corporate analysis.</p>
              <button 
                onClick={() => setView('create')}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Create Report
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex-shrink-0">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Search className="w-6 h-6 text-blue-400" />
            <span className="text-xl font-bold tracking-tight">Corp<span className="text-blue-400">XRay</span></span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Head Hunter Intelligence</p>
        </div>
        
        <nav className="p-4 space-y-2">
          <button 
            onClick={() => setView('dashboard')}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
              view === 'dashboard' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </button>
          
          <button 
            onClick={() => setView('create')}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
              view === 'create' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Plus className="w-5 h-5 mr-3" />
            New Analysis
          </button>
        </nav>

        <div className="p-6 mt-auto">
          <div className="bg-slate-800 p-4 rounded-lg">
            <p className="text-xs text-slate-400 mb-2">Powered by</p>
            <div className="flex items-center gap-2 text-sm font-semibold">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Gemini AI</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;