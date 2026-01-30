// Import React and useState hook
import React, { useState } from 'react';
// Import types and icons
import { Staff, ShiftType } from '../types';
import { Plus, Clock } from 'lucide-react';

// Define props for the StaffForm component
interface StaffFormProps {
  onAddStaff: (staff: Staff) => void; // Function to call when adding a new staff member
  text: any;                          // Translation object for UI text
}

// Component definition
const StaffForm: React.FC<StaffFormProps> = ({ onAddStaff, text }) => {
  // State hook for storing the name input
  const [name, setName] = useState('');
  // State hook for storing the worked hours input
  const [workedHours, setWorkedHours] = useState<number | string>(0);
  // State hook for the 'Morning' checkbox
  const [availableMorning, setAvailableMorning] = useState(false);
  // State hook for the 'Night' checkbox
  const [availableNight, setAvailableNight] = useState(false);

  // Handler function for form submission
  const handleSubmit = (e: React.FormEvent) => {
    // Prevent the default browser form submission (page reload)
    e.preventDefault();
    
    // Basic validation: ensure name is not empty
    if (!name.trim()) return;

    // Construct the availability array based on checkbox states
    const availability: ShiftType[] = [];
    if (availableMorning) availability.push(ShiftType.MORNING);
    if (availableNight) availability.push(ShiftType.NIGHT);

    // Validation: ensure at least one shift type is selected
    if (availability.length === 0) {
      alert(text.alertNoShift);
      return;
    }

    // Create a new Staff object with the form data
    const newStaff: Staff = {
      id: crypto.randomUUID(), // Generate a cryptographically unique ID
      name: name.trim(),       // Remove leading/trailing whitespace
      availability,            // The array of selected shifts
      workedHours: Number(workedHours) // Ensure workedHours is stored as a number
    };

    // Call the parent component's function to add the new staff member
    onAddStaff(newStaff);

    // Reset the form fields to their default state
    setName('');
    setWorkedHours(0);
    setAvailableMorning(false);
    setAvailableNight(false);
  };

  // Render the component
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      {/* Header section with icon and title */}
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <div className="p-2 bg-blue-100 rounded-lg">
           <Plus size={20} className="text-blue-600" />
        </div>
        {text.addStaff}
      </h2>
      
      {/* Form element */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input field for Staff Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{text.staffNameLabel}</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} // Update state on typing
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder={text.staffNamePlaceholder}
          />
        </div>

        {/* Input field for Initial Worked Hours */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
             <Clock size={14}/> {text.workedHoursLabel}
          </label>
          <input
            type="number"
            min="0"
            value={workedHours}
            onChange={(e) => setWorkedHours(e.target.value)} // Update state on typing
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        {/* Checkboxes for Availability */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{text.availabilityLabel}</label>
          <div className="flex gap-4">
            {/* Morning Checkbox */}
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={availableMorning}
                onChange={(e) => setAvailableMorning(e.target.checked)} // Update state on click
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-gray-600">{text.morning}</span>
            </label>
            {/* Night Checkbox */}
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={availableNight}
                onChange={(e) => setAvailableNight(e.target.checked)} // Update state on click
                className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
              />
              <span className="text-gray-600">{text.night}</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
        >
          {text.addStaffBtn}
        </button>
      </form>
    </div>
  );
};

// Export the component as default
export default StaffForm;