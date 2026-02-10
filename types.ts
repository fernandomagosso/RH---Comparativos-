export interface SalaryInfo {
  role: string;
  range: string;
  avgValue: number; // For charting purposes
}

export interface CompanyReport {
  id: string;
  name: string;
  sector: string;
  founded: string;
  headquarters: string;
  overview: string;
  history: string;
  structure: string;
  marketPresence: string;
  financials: string;
  culture: string;
  salaries: SalaryInfo[];
  competitiveness: string;
  interviewTips: string[];
  sources: string[];
  generatedAt: string;
}

export type ViewState = 'dashboard' | 'create' | 'report';