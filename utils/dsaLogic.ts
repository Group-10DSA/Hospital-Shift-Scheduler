// Import necessary types from the types definition file
import { Staff, ShiftSlot, ShiftType, ScheduleResult } from '../types';


// Define a constant array representing all shifts for a week (Monday to Sunday)
export const REQUIRED_SHIFTS: ShiftSlot[] = [
  { id: '1', day: 'Monday', type: ShiftType.MORNING },
  { id: '2', day: 'Monday', type: ShiftType.NIGHT },
  { id: '3', day: 'Tuesday', type: ShiftType.MORNING },
  { id: '4', day: 'Tuesday', type: ShiftType.NIGHT },
  { id: '5', day: 'Wednesday', type: ShiftType.MORNING },
  { id: '6', day: 'Wednesday', type: ShiftType.NIGHT },
  { id: '7', day: 'Thursday', type: ShiftType.MORNING },
  { id: '8', day: 'Thursday', type: ShiftType.NIGHT },
  { id: '9', day: 'Friday', type: ShiftType.MORNING },
  { id: '10', day: 'Friday', type: ShiftType.NIGHT },
  { id: '11', day: 'Saturday', type: ShiftType.MORNING },
  { id: '12', day: 'Saturday', type: ShiftType.NIGHT },
  { id: '13', day: 'Sunday', type: ShiftType.MORNING },
  { id: '14', day: 'Sunday', type: ShiftType.NIGHT },
];

// Main function to generate the schedule.
// Takes the current list of staff and the translation text object.
export const generateSchedule = (staffList: Staff[], text: any): ScheduleResult => {
  // Create a deep copy of the staff list. 
  // We do this to mutate 'workedHours' locally during the algorithm's execution
  // without affecting the actual React state immediately.
  const workingStaffList = staffList.map(s => ({ ...s }));

  // Create a copy of the required shifts array to populate with assignments.
  const schedule: ShiftSlot[] = REQUIRED_SHIFTS.map(s => ({ ...s }));
  
  // Initialize an array to store execution logs for educational display.
  const logs: string[] = [];
  // Push the start message to logs
  logs.push(text.logStart);

  // Iterate through every shift that needs to be filled (Monday Morning -> Sunday Night)
  for (const shift of schedule) {
    // Get the localized name of the day (e.g., "Monday" or "ሰኞ")
    // @ts-ignore - Dynamic access to keys
    const dayName = text.days[shift.day]; 
    // Get the localized name of the shift type
    const shiftName = shift.type === ShiftType.MORNING ? text.morning : text.night;

    // Log which shift is currently being processed
    logs.push(`\n${text.logProcessing}: ${dayName} ${shiftName}`);

    // STEP 1: FILTER LOGIC
    // Find all staff members whose 'availability' array includes the current shift type.
    const availableCandidates = workingStaffList.filter(staff => 
      staff.availability.includes(shift.type)
    );

    // If no one is available for this shift:
    if (availableCandidates.length === 0) {
      // Log the failure to find a candidate
      logs.push(`  ${text.logNoStaff} ${dayName} ${shiftName}!`);
      // Skip to the next iteration of the loop
      continue; 
    }

    // STEP 2: GREEDY SORTING
    // Sort the available candidates by 'workedHours' in Ascending order.
    // Logic: The person with the FEWEST hours should get the next shift to balance the load.
    availableCandidates.sort((a, b) => a.workedHours - b.workedHours);
    
    // Log the list of candidates and their current hours for transparency
    logs.push(`  ${text.logSorted}: ${availableCandidates.map(c => `${c.name}(${c.workedHours})`).join(', ')}`);

    // STEP 3: ASSIGNMENT
    // Pick the first candidate from the sorted list (index 0 has the lowest hours)
    const bestCandidate = availableCandidates[0];

    // Assign this candidate's ID and Name to the current shift slot
    shift.assignedStaffId = bestCandidate.id;
    shift.assignedStaffName = bestCandidate.name;

    // STEP 4: UPDATE STATE
    // Increase the assigned candidate's worked hours by 8 (standard shift duration).
    // This is CRITICAL: it changes their position in the sort order for future shifts.
    bestCandidate.workedHours += 8;

    // Log the assignment and the new total hours for the staff member
    logs.push(`  ${text.logAssigned}: ${bestCandidate.name}. ${text.logNewTotal}: ${bestCandidate.workedHours}`);
  }

  // Log that the scheduling process is finished
  logs.push(`\n${text.logComplete}`);
  
  // Return the fully assigned schedule and the logs
  return { schedule, logs };
};
