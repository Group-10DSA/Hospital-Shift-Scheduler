// Enum to define fixed constants for shift types, avoiding typos in strings
export enum ShiftType {
  MORNING = 'Morning', // Represents the morning shift
  NIGHT = 'Night',     // Represents the night shift
}

// Interface defining the structure of a Staff object
export interface Staff {
  id: string;                // Unique identifier for the staff member
  name: string;              // Full name of the staff member
  availability: ShiftType[]; // Array containing shifts the staff is willing to work
  workedHours: number;       // The total hours worked; this is the key metric for the Greedy Algorithm
}

// Interface defining a single shift slot in the weekly schedule
export interface ShiftSlot {
  id: string;                // Unique identifier for the shift slot
  day: string;               // The day of the week (e.g., 'Monday')
  type: ShiftType;           // The type of shift (Morning or Night)
  assignedStaffId?: string;  // ID of the assigned staff member (optional, undefined if empty)
  assignedStaffName?: string;// Name of the assigned staff member for display purposes
}

// Interface for the final result returned by the scheduling algorithm
export interface ScheduleResult {
  schedule: ShiftSlot[];     // The complete list of shifts with assignments
  logs: string[];            // A list of text logs describing the algorithm's step-by-step execution
}