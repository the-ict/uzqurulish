// pages/ComplianceChecker.tsx
import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, FileText, Info, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import ComplianceFunctions from '../../functions/compliance.func';
import type { IComplianceResult, IComplianceRecord } from '../../types/compliance.types';
import ProjectsFunc from '../../functions/projects.func';
import type { IProject } from '../../types/projects.types';
import jsPDF from 'jspdf';


const COLORS = ['#10B981', '#EF4444', '#F59E0B'];

const complianceFunc = new ComplianceFunctions();
const projectsFunc = new ProjectsFunc();

export default function ComplianceChecker() {
   const [complianceResult, setComplianceResult] = useState<IComplianceResult | null>(null);
   const [complianceHistory, setComplianceHistory] = useState<IComplianceRecord[]>([]);
   const [projects, setProjects] = useState<IProject[]>([]);
   const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
   const [projectParams, setProjectParams] = useState({
     height: "",
     floors: "",
     area: "",
     type: "",
   });
   const [activeTab, setActiveTab] = useState("check");
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
     const loadProjects = async () => {
       try {
         const projectsData = await projectsFunc.getProjects();
         setProjects(projectsData || []);
         if (projectsData && projectsData.length > 0) {
           setSelectedProjectId(projectsData[0].id);
         }
       } catch (err) {
         console.error("Failed to load projects:", err);
       }
     };
     loadProjects();
   }, []);

   useEffect(() => {
     if (selectedProjectId) {
       const loadHistory = async () => {
         try {
           const history = await complianceFunc.getComplianceByProjectId(selectedProjectId);
           setComplianceHistory(history);
         } catch (err) {
           console.error("Failed to load compliance history:", err);
         }
       };
       loadHistory();
     }
   }, [selectedProjectId]);

  const handleCheck = async () => {
    if (!selectedProjectId) {
      setError("Please select a project first");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const result = await complianceFunc.checkProject(selectedProjectId, projectParams);
      setComplianceResult(result);
    } catch (err: any) {
      setError(err.message || "Failed to check compliance");
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const handleDownloadReport = () => {
    if (!complianceResult) return;

    try {
      const jsdoc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pageWidth = jsdoc.internal.pageSize.getWidth();
      const pageHeight = jsdoc.internal.pageSize.getHeight();
      const margin = 20;
      let yPosition = 30;

      // Title
      jsdoc.setFontSize(18);
      jsdoc.text("Qoidalarga moslik tekshiruvi hisoboti", pageWidth / 2, yPosition, { align: "center" });
      yPosition += 15;

      // Project info
      jsdoc.setFontSize(12);
      const selectedProject = projects.find(p => p.id === selectedProjectId);
      if (selectedProject) {
        jsdoc.text(`Loyiha: ${selectedProject.name}`, margin, yPosition);
        yPosition += 8;
        jsdoc.text(`Joylashuv: ${selectedProject.location}`, margin, yPosition);
        yPosition += 8;
        jsdoc.text(`Maydon: ${selectedProject.area} m²`, margin, yPosition);
        yPosition += 8;
        jsdoc.text(`Turi: ${selectedProject.type}`, margin, yPosition);
        yPosition += 15;
      }

      // Overall result
      jsdoc.setFontSize(14);
      jsdoc.text("Umumiy natija:", margin, yPosition);
      yPosition += 10;

      jsdoc.setFontSize(12);
      const statusText = complianceResult.status === "passed" ? "Qoidalarga mos keladi" :
                        complianceResult.status === "failed" ? "Qoidalarga mos kelmaydi" :
                        "Qisman mos keladi";
      jsdoc.text(`Status: ${statusText}`, margin, yPosition);
      yPosition += 8;
      jsdoc.text(`Umumiy ball: ${complianceResult.overallScore}%`, margin, yPosition);
      yPosition += 15;

      // Detailed results
      jsdoc.setFontSize(14);
      jsdoc.text("Batafsil natijalar:", margin, yPosition);
      yPosition += 10;

      jsdoc.setFontSize(10);
      complianceResult.results.forEach((result, index) => {
        if (yPosition > pageHeight - 40) {
          jsdoc.addPage();
          yPosition = 30;
        }

        const status = result.status === "passed" ? "✓" :
                      result.status === "failed" ? "✗" : "⚠";
        jsdoc.text(`${index + 1}. ${result.ruleName}: ${result.score}% (${status})`, margin, yPosition);
        yPosition += 6;

        // Wrap long descriptions
        const descriptionLines = jsdoc.splitTextToSize(result.details, pageWidth - margin * 2);
        descriptionLines.forEach((line: string) => {
          jsdoc.setFontSize(8);
          jsdoc.text(line, margin + 10, yPosition);
          yPosition += 4;
        });
        yPosition += 2;
      });

      // Footer
      jsdoc.setFontSize(8);
      const footerY = pageHeight - 15;
      jsdoc.text(`Hisobot yaratilgan sana: ${new Date().toLocaleDateString('uz-UZ')}`, margin, footerY);
      jsdoc.text("UzQurilish AI - Qoidalarga moslik tekshiruvi", pageWidth - margin, footerY, { align: "right" });

      // Save the PDF
      const fileName = `compliance-report-${selectedProject?.name || 'project'}-${new Date().toISOString().split('T')[0]}.pdf`;
      jsdoc.save(fileName);

    } catch (error) {
      console.error("Error generating compliance report PDF:", error);
    }
  };


  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Compliance Checker</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center items-center py-4">
          <div className="text-gray-500">Tekshiruv amalga oshirilmoqda...</div>
        </div>
      )}
      
      <div className="bg-white rounded-xl shadow">
        <div className="flex border-b border-gray-200">
          <button
            className={`px-4 py-3 font-medium text-sm cursor-pointer ${
              activeTab === "check" 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab("check")}
          >
            Tekshiruv
          </button>
        </div>
        
        <div className="p-6">
          {/* Check Tab */}
          {activeTab === "check" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Parameters */}
              <div className="space-y-4">
                <h2 className="font-bold text-lg mb-4">Loyiha parametrlari</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Loyiha tanlash</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={selectedProjectId || ""}
                    onChange={(e) => setSelectedProjectId(Number(e.target.value))}
                  >
                    <option value="">Tanlang</option>
                    {projects.map(project => (
                      <option key={project.id} value={project.id}>{project.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Balandlik (m)</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    value={projectParams.height}
                    onChange={(e) => setProjectParams({...projectParams, height: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Qavatlar soni</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    value={projectParams.floors}
                    onChange={(e) => setProjectParams({...projectParams, floors: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Maydoni (m²)</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    value={projectParams.area}
                    onChange={(e) => setProjectParams({...projectParams, area: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bino turi</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={projectParams.type}
                    onChange={(e) => setProjectParams({...projectParams, type: e.target.value})}
                  >
                    <option value="">Tanlang</option>
                    <option value="residential">Aholi binosi</option>
                    <option value="commercial">Tijorat binosi</option>
                    <option value="industrial">Sanoat binosi</option>
                  </select>
                </div>
                
                <button
                  onClick={handleCheck}
                  disabled={isLoading}
                  className="w-full py-2 px-4 bg-indigo-600 cursor-pointer text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Tekshirilmoqda..." : "Tekshirishni boshlash"}
                </button>
              </div>
              
              {/* Result */}
              <div>
                <h2 className="font-bold text-lg mb-4">Tekshiruv natijasi</h2>
                
                {complianceResult && (
                  <div className="mb-6 p-4 rounded-lg bg-gray-50 border border-gray-200">
                    <div className="flex items-center mb-2">
                      {complianceResult.status === "passed" ? (
                        <CheckCircle className="text-green-600 mr-2" size={24} />
                      ) : complianceResult.status === "failed" ? (
                        <XCircle className="text-red-600 mr-2" size={24} />
                      ) : (
                        <AlertCircle className="text-yellow-600 mr-2" size={24} />
                      )}
                      <span className={`font-bold ${
                        complianceResult.status === "passed" ? "text-green-600" :
                        complianceResult.status === "failed" ? "text-red-600" : "text-yellow-600"
                      }`}>
                        {complianceResult.status === "passed" ? "Qoidalarga mos keladi" :
                         complianceResult.status === "failed" ? "Qoidalarga mos kelmaydi" : "Qisman mos keladi"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Loyiha qoidalarga mosligi {complianceResult.overallScore}% ni tashkil qiladi.
                    </p>
                  </div>
                )}
                
                {/* Compliance Score Chart */}
                {complianceResult && (
                  <div className="mb-6">
                    <h3 className="font-medium mb-2">Qoidalarga moslik balli</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={complianceResult.results}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="ruleName" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="score" name="Ball">
                            {complianceResult.results.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[entry.status === 'passed' ? 0 : entry.status === 'failed' ? 1 : 2]} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}
                
                <button
                  onClick={handleDownloadReport}
                  className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center justify-center cursor-pointer"
                >
                  <Download className="mr-2" size={18} />
                  To'liq hisobot yuklab olish
                </button>
              </div>
            </div>
          )}
          
          {/* Rules Database */}
          {activeTab === "rules" && (
            <div>
              <h2 className="font-bold text-lg mb-4">Qoidalar bazasi</h2>
              
              <div className="space-y-3">
                {complianceResult ? complianceResult.results.map((rule, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center">
                          <div className={`flex-shrink-0 mt-1 mr-3 ${
                            rule.status === "passed" ? "text-green-600" :
                            rule.status === "failed" ? "text-red-600" : "text-yellow-600"
                          }`}>
                            {rule.status === "passed" ? <CheckCircle size={18} /> :
                             rule.status === "failed" ? <XCircle size={18} /> : <AlertCircle size={18} />}
                          </div>
                          <h4 className="font-medium">{rule.ruleName}</h4>
                        </div>
                        <p className="text-sm text-gray-600 mt-1 ml-8">{rule.details}</p>
                      </div>
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-100">
                          <span className="font-bold">{rule.score}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 ml-8">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className={`h-2 rounded-full ${getScoreColor(rule.score)}`} style={{ width: `${rule.score}%` }}></div>
                      </div>
                    </div>
                  </div>
                )) : (
                  <p className="text-gray-500">Tekshiruv natijasi yo'q</p>
                )}
              </div>
            </div>
          )}
          
          {/* History */}
          {activeTab === "history" && (
            <div>
              <h2 className="font-bold text-lg mb-4">Tekshiruv tarixi</h2>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Qoida
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sana
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Natija
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ball
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Hisobot
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {complianceHistory.length > 0 ? complianceHistory.map((record) => (
                      <tr key={record.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {record.ruleName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(record.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            record.status === 'passed' ? 'bg-green-100 text-green-800' :
                            record.status === 'failed' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {record.status === 'passed' ? 'Tasdiqlangan' :
                             record.status === 'failed' ? 'Rad etilgan' : 'Kutilmoqda'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {record.score}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-indigo-600 hover:text-indigo-900">
                            <FileText size={16} />
                          </button>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                          Tarix mavjud emas
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}