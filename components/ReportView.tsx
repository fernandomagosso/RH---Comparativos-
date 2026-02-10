import React from 'react';
import { CompanyReport } from '../types';
import SalaryChart from './SalaryChart';
import { 
  Building2, 
  History, 
  Users, 
  Briefcase, 
  TrendingUp, 
  DollarSign, 
  Award, 
  Lightbulb,
  Link,
  MapPin,
  Calendar,
  ArrowLeft
} from 'lucide-react';

interface ReportViewProps {
  report: CompanyReport;
  onBack: () => void;
}

const ReportView: React.FC<ReportViewProps> = ({ report, onBack }) => {
  return (
    <div className="animate-in fade-in duration-500">
      <button 
        onClick={onBack}
        className="flex items-center text-gray-500 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-slate-50 to-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-3 text-sm text-blue-600 font-semibold uppercase tracking-wider mb-2">
                <span className="bg-blue-100 px-2 py-1 rounded">{report.sector}</span>
                <span className="flex items-center text-gray-500"><MapPin className="w-3 h-3 mr-1" /> {report.headquarters}</span>
                <span className="flex items-center text-gray-500"><Calendar className="w-3 h-3 mr-1" /> Est. {report.founded}</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{report.name}</h1>
              <p className="text-lg text-gray-600 max-w-3xl">{report.overview}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          {/* History & Origin */}
          <section className="space-y-4">
            <h3 className="flex items-center text-xl font-bold text-gray-800">
              <History className="w-5 h-5 mr-2 text-blue-600" /> Origin & History
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base bg-gray-50 p-4 rounded-lg border border-gray-100">
              {report.history}
            </p>
          </section>

           {/* Structure */}
           <section className="space-y-4">
            <h3 className="flex items-center text-xl font-bold text-gray-800">
              <Building2 className="w-5 h-5 mr-2 text-blue-600" /> Organization Structure
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base bg-gray-50 p-4 rounded-lg border border-gray-100">
              {report.structure}
            </p>
          </section>

          {/* Market Presence */}
          <section className="space-y-4">
            <h3 className="flex items-center text-xl font-bold text-gray-800">
              <Users className="w-5 h-5 mr-2 text-blue-600" /> Market Presence
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base bg-gray-50 p-4 rounded-lg border border-gray-100">
              {report.marketPresence}
            </p>
          </section>

          {/* Financials */}
          <section className="space-y-4">
            <h3 className="flex items-center text-xl font-bold text-gray-800">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-600" /> Financial Results
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base bg-gray-50 p-4 rounded-lg border border-gray-100">
              {report.financials}
            </p>
          </section>

          {/* Culture */}
          <section className="col-span-1 md:col-span-2 space-y-4">
            <h3 className="flex items-center text-xl font-bold text-gray-800">
              <Award className="w-5 h-5 mr-2 text-blue-600" /> Employees & Culture
            </h3>
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 text-blue-900">
              <p className="leading-relaxed font-medium">
                {report.culture}
              </p>
            </div>
          </section>

          {/* Salaries */}
          <section className="col-span-1 md:col-span-2 space-y-4">
            <h3 className="flex items-center text-xl font-bold text-gray-800">
              <DollarSign className="w-5 h-5 mr-2 text-green-600" /> Estimated Compensation
            </h3>
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                   <ul className="space-y-3">
                    {report.salaries.map((s, idx) => (
                      <li key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                        <span className="font-medium text-gray-700">{s.role}</span>
                        <span className="font-semibold text-green-700 bg-green-50 px-2 py-1 rounded text-sm">{s.range}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-gray-400 mt-4 italic">
                    * Values are estimated based on market data and may vary by seniority and location.
                  </p>
                </div>
                <div className="min-h-[200px]">
                   <SalaryChart data={report.salaries} />
                </div>
              </div>
            </div>
          </section>
          
          {/* Competitiveness */}
          <section className="space-y-4">
            <h3 className="flex items-center text-xl font-bold text-gray-800">
              <Briefcase className="w-5 h-5 mr-2 text-purple-600" /> Competitiveness
            </h3>
            <p className="text-gray-600 leading-relaxed bg-purple-50 p-4 rounded-lg border border-purple-100">
              {report.competitiveness}
            </p>
          </section>

          {/* Interview Tips */}
          <section className="space-y-4">
            <h3 className="flex items-center text-xl font-bold text-gray-800">
              <Lightbulb className="w-5 h-5 mr-2 text-yellow-600" /> Interview Tips
            </h3>
            <ul className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 space-y-3">
              {report.interviewTips.map((tip, idx) => (
                <li key={idx} className="flex items-start text-gray-800">
                  <span className="bg-yellow-400 text-yellow-900 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    {idx + 1}
                  </span>
                  {tip}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="bg-gray-50 p-6 border-t border-gray-200">
          <h4 className="flex items-center text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            <Link className="w-4 h-4 mr-2" /> Sources & References
          </h4>
          <div className="flex flex-wrap gap-2">
            {report.sources.map((source, idx) => (
              <span key={idx} className="bg-white border border-gray-200 px-3 py-1 rounded-full text-xs text-gray-600 hover:text-blue-600 hover:border-blue-200 transition-colors cursor-default">
                {source}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportView;