// Export a constant object named 'translations' containing language strings
export const translations = {
  // English translations section
  en: {
    appTitle: "Hospital Shift Scheduler", // The main title of the application
    addStaff: "Add Staff", // Header for the add staff form
    staffNameLabel: "Staff Name", // Label for the name input
    staffNamePlaceholder: "e.g. Dr. Yonas or Nurse Betelehem", // Placeholder example for name input
    workedHoursLabel: "Initial Worked Hours", // Label for the hours input
    availabilityLabel: "Availability", // Label for the checkbox group
    morning: "Morning", // Label for Morning shift
    night: "Night", // Label for Night shift
    addStaffBtn: "Add Staff Member", // Button text to submit new staff
    alertNoShift: "Please select at least one shift availability.", // Error message for validation
    rosterTitle: "Staff Roster", // Title for the list of staff
    noStaffMessage: "No staff added yet. Add staff to begin.", // Message shown when list is empty
    removeStaff: "Remove staff", // Tooltip text for remove button
    howItWorks: "How the Greedy Algorithm Works:", // Header for explanation card
    step1: "Iterate through each required shift (Mon Morning, Mon Night, etc).", // Step 1 explanation
    step2: "Filter valid candidates who are available for that specific shift.", // Step 2 explanation
    step3: "Sort candidates by their current workedHours (Lowest to Highest).", // Step 3 explanation
    step4: "Pick the first candidate (min hours) to ensure fair workload distribution.", // Step 4 explanation
    step5: "Update the assigned staff's hours (+8) immediately, affecting future sorting choices.", // Step 5 explanation
    generatedSchedule: "Generated Schedule", // Header for the results table
    unassigned: "Unassigned (No availability)", // Text for unfilled slots
    algoLog: "Algorithm Execution Log", // Header for the log terminal
    emptyState: "Add staff and click \"Generate Schedule\" to see the algorithm in action.", // Text for empty result state
    generateBtn: "Generate Schedule", // Main action button text
    alertAddStaff: "Please add at least one staff member.", // Alert if generating with no staff
    developedByPrefix: "Developed by", // Footer text prefix
    groupName: "Group 10 – Section 1 Biomedical Engineering Students", // Developer group name
    projectTitle: "DSA Project", // Project subtitle
    disclaimer: "This web application is developed for educational purposes only.", // Footer disclaimer
    // Contact Info
    githubIntro: "View Source Code on GitHub",
    emailIntro: "Contact Us:",
    emailAddress: "group10.dsaproject@gmail.com",
    contactComment: "(If you have any comment let us know!)",
    // Sorting related strings
    sort: "Sort by",
    sortName: "Name",
    sortHours: "Hours",
    sortAvailability: "Availability",
    // Editing related strings
    edit: "Edit",
    save: "Save",
    cancel: "Cancel",
    // Logic Log strings (used for dynamic logging)
    logStart: "Starting Greedy Schedule Generation...",
    logProcessing: "Processing Shift",
    logNoStaff: "❌ No staff available for",
    logSorted: "Candidates sorted by hours",
    logAssigned: "✅ Assigned",
    logNewTotal: "New Total Hours",
    logComplete: "Scheduling Complete.",
    // Day names for display
    days: {
      Monday: "Monday",
      Tuesday: "Tuesday",
      Wednesday: "Wednesday",
      Thursday: "Thursday",
      Friday: "Friday",
      Saturday: "Saturday",
      Sunday: "Sunday"
    }
  },
  // Amharic translations section
  am: {
    appTitle: "የሆስፒታል ፈረቃ መርሐግብር",
    addStaff: "ሰራተኛ ጨምር",
    staffNameLabel: "የሰራተኛ ስም",
    staffNamePlaceholder: "ምሳሌ፡ ዶ/ር ዮናስ ወይም ነርስ ቤተልሄም",
    workedHoursLabel: "የተሰራ ሰዓት",
    availabilityLabel: "መገኘት",
    morning: "ጠዋት",
    night: "ሌሊት",
    addStaffBtn: "ሰራተኛ ጨምር",
    alertNoShift: "እባክዎ ቢያንስ አንድ የፈረቃ አይነት ይምረጡ።",
    rosterTitle: "የሰራተኞች ዝርዝር",
    noStaffMessage: "ምንም ሰራተኛ አልተጨመረም። ለመጀመር ሰራተኛ ይጨምሩ።",
    removeStaff: "ሰራተኛ ያስወግዱ",
    howItWorks: "የGreedy ስልተ-ቀመር እንዴት እንደሚሰራ፡",
    step1: "እያንዳንዱን አስፈላጊ ፈረቃ ይዳስሳል (ሰኞ ጠዋት፣ ሰኞ ማታ፣ ወዘተ)።",
    step2: "ለዚያ ፈረቃ ብቁ የሆኑ እጩዎችን ይለያል።",
    step3: "እጩዎችን አሁን ባላቸው የተሰራ ሰዓት ይደረድራል (ከዝቅተኛ ወደ ከፍተኛ)።",
    step4: "የስራ ጫናን ለማመጣጠን የመጀመሪያውን እጩ (ዝቅተኛ ሰዓት) ይመርጣል።",
    step5: "የተመደበውን ሰራተኛ ሰዓት ወዲያውኑ ያዘምናል (+8)፣ ይህም ቀጣይ ምርጫዎችን ይነካል።",
    generatedSchedule: "የተፈጠረ መርሐግብር",
    unassigned: "ያልተመደበ (ማንም የለም)",
    algoLog: "የስልተ-ቀመር ክንውን መዝገብ",
    emptyState: "ሰራተኛ ይጨምሩ እና ስልተ-ቀመሩን ለማየት \"መርሐግብር አውጣ\"ን ይጫኑ።",
    generateBtn: "መርሐግብር አውጣ",
    alertAddStaff: "እባክዎ ቢያንስ አንድ ሰራተኛ ይጨምሩ።",
    developedByPrefix: "የተዘጋጀው በ:",
    groupName: "ቡድን 10 - ክፍል 1 የባዮሜዲካል ምህንድስና ተማሪዎች",
    projectTitle: "DSA ፕሮጀክት",
    disclaimer: "ይህ የድር መተግበሪያ ለትምህርታዊ ዓላማ ብቻ የተዘጋጀ ነው።",
    // Contact Info
    githubIntro: "ምንጭ ኮዱን በ GitHub ይመልከቱ",
    emailIntro: "ያግኙን:",
    emailAddress: "group10.dsaproject@gmail.com",
    contactComment: "(አስተያየት ካለዎት ያሳውቁን!)",
    // Sorting
    sort: "ደርድር በ",
    sortName: "ስም",
    sortHours: "ሰዓት",
    sortAvailability: "መገኘት",
    // Editing
    edit: "አርትዕ",
    save: "አስቀምጥ",
    cancel: "ሰርዝ",
    // Logic Logs
    logStart: "የGreedy መርሐግብር አወጣጥ በመጀመር ላይ...",
    logProcessing: "ፈረቃን በማስኬድ ላይ",
    logNoStaff: "❌ ለዚህ ፈረቃ ሰራተኛ የለም",
    logSorted: "እጩዎች በሰዓት ተለይተዋል",
    logAssigned: "✅ ተመድቧል",
    logNewTotal: "አዲስ ጠቅላላ ሰዓት",
    logComplete: "መርሐግብር መጠናቀቅ።",
    days: {
      Monday: "ሰኞ",
      Tuesday: "ማክሰኞ",
      Wednesday: "ረቡዕ",
      Thursday: "ሐሙስ",
      Friday: "አርብ",
      Saturday: "ቅዳሜ",
      Sunday: "እሁድ"
    }
  }
};
