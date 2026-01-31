// Import core React hook
import React, { useState } from 'react';
// Import child components
import StaffForm from './components/StaffForm';
import StaffList from './components/StaffList';
// Import types
import { Staff, ScheduleResult, ShiftType } from './types';
// Import business logic function
import { generateSchedule } from './utils/dsaLogic';
// Import UI icons
import { Calendar, Terminal, Info, Activity, Globe, Code, Github, Mail } from 'lucide-react';
// Import translation data
import { translations } from './locales';

// Define available languages
type Language = 'en' | 'am';

// Main Application Component
const App: React.FC = () => {
  // STATE 1: Language Preference ('en' or 'am')
  const [lang, setLang] = useState<Language>('en');
  // Helper to access the current language's strings
  const text = translations[lang];

  // STATE 2: Staff List
  // This is an Array Data Structure storing Staff objects.
  const [staffList, setStaffList] = useState<Staff[]>([
    // Initialize with some dummy data to make testing easier
    { id: '1', name: 'Dr. Yonas', availability: [ShiftType.MORNING, ShiftType.NIGHT], workedHours: 40 },
    { id: '2', name: 'Nurse Betelehem', availability: [ShiftType.MORNING], workedHours: 10 },
    { id: '3', name: 'Dr. Haimanot', availability: [ShiftType.NIGHT], workedHours: 0 },
    { id: '4', name: 'Nurse Blen', availability: [ShiftType.MORNING, ShiftType.NIGHT], workedHours: 20 },
    { id: '5', name: 'Dr. Wengelawit', availability: [ShiftType.MORNING, ShiftType.NIGHT], workedHours: 5 },
    { id: '6', name: 'Nurse Dinknesh', availability: [ShiftType.NIGHT], workedHours: 15 },
  ]);

  // STATE 3: Algorithm Result
  // Stores the generated schedule and logs after the algorithm runs.
  const [scheduleResult, setScheduleResult] = useState<ScheduleResult | null>(null);

  // Function to add a new staff member to the list
  const handleAddStaff = (newStaff: Staff) => {
    // Uses spread operator to create a new array with the new staff member appended
    setStaffList((prev) => [...prev, newStaff]);
  };

  // Function to remove a staff member by ID
  const handleRemoveStaff = (id: string) => {
    // Uses filter to create a new array excluding the staff member with the given ID
    setStaffList((prev) => prev.filter((s) => s.id !== id));
  };

  // Function to update an existing staff member's details
  const handleUpdateStaff = (updatedStaff: Staff) => {
    // Maps over the array, replacing the matching staff object with the updated one
    setStaffList((prev) => prev.map((s) => (s.id === updatedStaff.id ? updatedStaff : s)));
  };

  // Function to Execute the Greedy Algorithm
  const handleGenerateSchedule = () => {
    // Check if there are staff to schedule
    if (staffList.length === 0) {
      alert(text.alertAddStaff);
      return;
    }
    // Call the logic function imported from dsaLogic.ts
    const result = generateSchedule(staffList, text);
    // Update state with the result
    setScheduleResult(result);
  };

  // Function to toggle between English and Amharic
  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'am' : 'en');
  };

  // JSX Render Logic
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-32 lg:pb-12 font-sans">
      
      {/* Header Section */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo Icon */}
            <div className="bg-blue-600 p-2 rounded-lg shadow-sm">
              <Activity className="text-white" size={24} />
            </div>
            {/* App Title */}
            <div>
              <h1 className="text-xl font-bold text-gray-900">{text.appTitle}</h1>
            </div>
          </div>
          
          {/* Language Toggle Button */}
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition text-sm font-medium text-gray-700 shadow-sm"
          >
            <Globe size={16} className="text-blue-500"/>
            {lang === 'en' ? 'Amharic (አማርኛ)' : 'English'}
          </button>
        </div>
      </header>

      {/* Developer Credit Info Box - Expanded Red Version */}
      <div className="max-w-4xl mx-auto px-4 mt-6">
        <div className="bg-gradient-to-r from-red-900 to-red-700 rounded-xl shadow-lg border border-red-800 py-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
             
             {/* Developer Info */}
             <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
                <span className="text-xs font-bold text-red-200 uppercase flex items-center gap-1 shrink-0 bg-red-950/40 px-3 py-1.5 rounded-md shadow-sm border border-red-900/50">
                   <Code size={14} /> {text.developedByPrefix}
                </span>
                <span className="text-base sm:text-lg font-bold text-yellow-300 tracking-wide drop-shadow-sm">
                  {text.groupName}
                </span>
             </div>

             {/* Project Info */}
             <div className="flex items-center gap-3">
                <span className="bg-white/10 text-white text-xs font-bold px-3 py-1 rounded border border-white/20 uppercase tracking-wide shrink-0">
                   {text.projectTitle}
                </span>
                <span className="text-xs text-red-100 italic hidden sm:block opacity-90">
                   {text.disclaimer}
                </span>
             </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col gap-8">
          
          {/* Section 1: Input Forms & Staff List */}
          <div className="space-y-6">
            <StaffForm onAddStaff={handleAddStaff} text={text} />
            <StaffList 
              staffList={staffList} 
              onRemoveStaff={handleRemoveStaff} 
              onUpdateStaff={handleUpdateStaff}
              text={text} 
            />
            {/* Desktop-only Generate Button */}
            <button
              onClick={handleGenerateSchedule}
              className="hidden lg:flex w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-lg font-bold py-4 px-6 rounded-xl shadow-lg transform transition active:scale-95 items-center justify-center gap-2"
            >
              <Calendar size={24} />
              {text.generateBtn}
            </button>
          </div>

          {/* Section 2: Visualization & Algorithm Output */}
          <div className="space-y-6">
            
            {/* Algorithm Explanation Card */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-blue-900">
              <h3 className="font-bold flex items-center gap-2 mb-2">
                <Info size={18} />
                {text.howItWorks}
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm opacity-90">
                <li>{text.step1}</li>
                <li>{text.step2}</li>
                <li>{text.step3}</li>
                <li>{text.step4}</li>
                <li>{text.step5}</li>
              </ul>
            </div>

            {/* Conditional Rendering: Show results if they exist */}
            {scheduleResult && (
              <div className="grid grid-cols-1 gap-6 animate-fade-in">
                
                {/* Visual Schedule Table */}
                <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                  <div className="bg-gray-800 text-white px-6 py-3 font-semibold flex items-center gap-2">
                    <Calendar size={18} /> {text.generatedSchedule}
                  </div>
                  <div className="divide-y divide-gray-100">
                    {scheduleResult.schedule.map((slot) => (
                      <div key={slot.id} className="grid grid-cols-12 p-4 hover:bg-gray-50 transition items-center">
                        <div className="col-span-4 font-medium text-gray-700">
                          {/* @ts-ignore - Dynamic key access */}
                          {text.days[slot.day]} <span className={`text-xs ml-2 px-2 py-0.5 rounded-full ${slot.type === ShiftType.MORNING ? 'bg-yellow-100 text-yellow-800' : 'bg-indigo-100 text-indigo-800'}`}>
                            {slot.type === ShiftType.MORNING ? text.morning : text.night}
                          </span>
                        </div>
                        <div className="col-span-8">
                          {slot.assignedStaffName ? (
                            <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                              {slot.assignedStaffName}
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-red-500 italic text-sm">
                              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                              {text.unassigned}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Algorithm Execution Log (Terminal View) */}
                <div className="bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-800">
                  <div className="bg-gray-800 text-gray-200 px-4 py-2 text-sm font-mono flex items-center gap-2 border-b border-gray-700">
                    <Terminal size={14} /> {text.algoLog}
                  </div>
                  <div className="p-4 font-mono text-xs text-green-400 overflow-x-auto h-64 overflow-y-auto custom-scrollbar leading-relaxed">
                    {scheduleResult.logs.map((log, index) => (
                      <div key={index} className={`${log.includes(text.logProcessing) ? 'text-yellow-300 mt-2 font-bold' : ''} ${log.includes(text.logAssigned) ? 'text-emerald-300' : ''}`}>
                        {log}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}
            
            {/* Empty State: Show when no schedule has been generated yet */}
            {!scheduleResult && (
               <div className="h-64 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
                 <Calendar size={48} className="mb-2 opacity-20" />
                 <p>{text.emptyState}</p>
               </div>
            )}
          </div>
        </div>

        {/* Footer Section */}
        <footer className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm pb-12 px-4">
          {/* Developed By Text */}
          <div className="mb-4">
            <p className="font-medium text-gray-600 leading-relaxed">
              {text.developedByPrefix} <span className="inline-block">{text.groupName}</span>
            </p>
          </div>

          {/* Links Section */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
            
            {/* GitHub Link */}
            <a 
              href="https://github.com/Group-10DSA/Hospital-Shift-Scheduler" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-transform duration-200 hover:scale-105"
            >
               <Github size={16} className="shrink-0" />
               <span className="hover:underline underline-offset-4">{text.githubIntro}</span>
            </a>

            {/* Gmail Link */}
             <a 
               href={`mailto:${text.emailAddress}`}
               className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-transform duration-200 hover:scale-105 max-w-full"
             >
               <Mail size={16} className="shrink-0" />
               <span className="hover:underline underline-offset-4 text-left md:text-center">
                 {text.emailIntro} {text.emailAddress} 
                 <span className="block sm:inline sm:ml-1 text-xs sm:text-sm text-gray-500 sm:text-gray-600 mt-0.5 sm:mt-0">
                    {text.contactComment}
                 </span>
               </span>
            </a>
          </div>
        </footer>
      </main>

      {/* Floating Bottom Button for triggering generation (Mobile Only) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={handleGenerateSchedule}
            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-lg font-bold py-4 px-6 rounded-xl shadow-lg transform transition active:scale-95 flex items-center justify-center gap-2"
          >
            <Calendar size={24} />
            {text.generateBtn}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
