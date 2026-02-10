import { GoogleGenAI, Type } from "@google/genai";
import { CompanyReport } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateCompanyReport = async (companyName: string, sectorHint?: string): Promise<CompanyReport> => {
  const prompt = `
    Act as a senior Head Hunter and Career Consultant.
    Perform a "Corporate X-Ray" (Raio-X Corporativo) for the company: "${companyName}" ${sectorHint ? `in the sector: ${sectorHint}` : ''}.
    
    You must provide accurate, professional, and strategic information useful for a candidate preparing for an interview.
    Focus on real data regarding culture, structure, financials, and salaries.
    
    The currency for salaries should be appropriate for the company's main headquarters or global average (e.g., BRL for Brazilian companies, USD for US/Global companies).
    
    If exact private data is not available, make a highly educated professional estimate based on sector benchmarks and public sentiment.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          sector: { type: Type.STRING },
          founded: { type: Type.STRING },
          headquarters: { type: Type.STRING },
          overview: { type: Type.STRING, description: "Brief executive summary of what the company does." },
          history: { type: Type.STRING, description: "Key milestones, timeline, origin, and major acquisitions." },
          structure: { type: Type.STRING, description: "Organizational chart summary, hierarchy levels." },
          marketPresence: { type: Type.STRING, description: "Number of employees, locations, countries, stores." },
          financials: { type: Type.STRING, description: "Revenue, growth, profit status, main revenue streams." },
          culture: { type: Type.STRING, description: "Work environment, values, management style." },
          salaries: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                role: { type: Type.STRING },
                range: { type: Type.STRING, description: "e.g. 'R$ 5.000 - 7.000'" },
                avgValue: { type: Type.NUMBER, description: "A numeric average value for charting purposes." },
              },
              required: ["role", "range", "avgValue"],
            },
          },
          competitiveness: { type: Type.STRING, description: "Position vs competitors, market share." },
          interviewTips: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "3-5 strategic tips for a candidate.",
          },
          sources: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "List of sources used (e.g. Glassdoor, LinkedIn).",
          },
        },
        required: [
          "name", "sector", "founded", "headquarters", "overview", "history", 
          "structure", "marketPresence", "financials", "culture", "salaries", 
          "competitiveness", "interviewTips", "sources"
        ],
      },
    },
  });

  const rawJson = response.text;
  if (!rawJson) {
    throw new Error("Failed to generate report content.");
  }

  const data = JSON.parse(rawJson);
  
  return {
    id: Date.now().toString(),
    generatedAt: new Date().toISOString(),
    ...data
  };
};
