// Import React hooks
import React, { useState, useMemo } from 'react';
// Import types
import { Staff, ShiftType } from '../types';
// Import icons
import { Users, Trash2, ArrowUp, ArrowDown, ArrowUpDown, Edit2, Check, X } from 'lucide-react';

// Define props for StaffList
interface StaffListProps {
  staffList: Staff[];                    // Array of staff to display
  onRemoveStaff: (id: string) => void;   // Function to remove staff
  onUpdateStaff: (staff: Staff) => void; // Function to update staff
  text: any;                             // Translations object
}

// Define types for sorting configuration
type SortField = 'name' | 'workedHours' | 'availability';
type SortDirection = 'asc' | 'desc';

// Define structure for the edit form state
interface EditFormState {
  name: string;
  workedHours: number;
  availability: ShiftType[];
}

// Component definition
const StaffList: React.FC<StaffListProps> = ({ staffList, onRemoveStaff, onUpdateStaff, text }) => {
  // State for current sort field (e.g., 'name')
  const [sortField, setSortField] = useState<SortField | null>(null);
  // State for current sort direction ('asc' or 'desc')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  // State to track which staff ID is currently being edited (null if none)
  const [editingId, setEditingId] = useState<string | null>(null);
  // State to hold the temporary form data while editing
  const [editForm, setEditForm] = useState<EditFormState>({
    name: '',
    workedHours: 0,
    availability: [],
  });

  // Function to handle clicking a sort header
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // If clicking the same field, toggle direction
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      // If clicking a new field, set it and default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // useMemo ensures sorting is only recalculated when staffList or sort criteria change
  const sortedList = useMemo(() => {
    if (!sortField) return staffList; // Return original order if no sort selected

    return [...staffList].sort((a, b) => {
      let comparison = 0;
      // Determine comparison based on field type
      if (sortField === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortField === 'workedHours') {
        comparison = a.workedHours - b.workedHours;
      } else if (sortField === 'availability') {
        // Special logic for availability: sort by count, then type
        if (a.availability.length !== b.availability.length) {
          comparison = a.availability.length - b.availability.length;
        } else {
          // If counts are equal, use string comparison of first element
          const typeA = a.availability[0] || '';
          const typeB = b.availability[0] || '';
          comparison = typeA.localeCompare(typeB);
        }
      }
      // Reverse result if direction is descending
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [staffList, sortField, sortDirection]);

  // Function to enter edit mode for a specific staff member
  const startEditing = (staff: Staff) => {
    setEditingId(staff.id);
    // Initialize form with current staff data
    setEditForm({
      name: staff.name,
      workedHours: staff.workedHours,
      availability: [...staff.availability],
    });
  };

  // Function to cancel edit mode
  const cancelEditing = () => {
    setEditingId(null);
  };

  // Function to save changes made during editing
  const saveEditing = (originalId: string) => {
    // Validate name
    if (!editForm.name.trim()) return;
    // Validate availability
    if (editForm.availability.length === 0) {
      alert(text.alertNoShift);
      return;
    }

    // Create updated staff object
    const updatedStaff: Staff = {
      id: originalId,
      name: editForm.name.trim(),
      workedHours: Number(editForm.workedHours),
      availability: editForm.availability,
    };

    // Propagate update to parent
    onUpdateStaff(updatedStaff);
    // Exit edit mode
    setEditingId(null);
  };

  // Helper to toggle shift types in the edit form checkbox
  const toggleEditAvailability = (type: ShiftType) => {
    setEditForm((prev) => {
      if (prev.availability.includes(type)) {
        // Remove if exists
        return { ...prev, availability: prev.availability.filter((t) => t !== type) };
      } else {
        // Add if not exists
        return { ...prev, availability: [...prev.availability, type] };
      }
    });
  };

  // Helper to render the sort arrow icon
  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown size={14} className="text-gray-400 opacity-50" />;
    return sortDirection === 'asc' ? (
      <ArrowUp size={14} className="text-indigo-600" />
    ) : (
      <ArrowDown size={14} className="text-indigo-600" />
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 h-full flex flex-col">
      <div className="mb-4">
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Users size={20} className="text-indigo-600" />
          </div>
          {text.rosterTitle} ({staffList.length})
        </h2>

        {/* Sorting Controls - only show if there are staff */}
        {staffList.length > 1 && (
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg border border-gray-100">
            <span className="font-medium mr-1">{text.sort}:</span>
            
            {/* Sort by Name */}
            <button
              onClick={() => handleSort('name')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition border ${
                sortField === 'name' 
                  ? 'bg-white border-indigo-200 text-indigo-700 shadow-sm' 
                  : 'border-transparent hover:bg-gray-200 text-gray-600'
              }`}
            >
              {text.sortName} {renderSortIcon('name')}
            </button>

            {/* Sort by Availability */}
            <button
              onClick={() => handleSort('availability')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition border ${
                sortField === 'availability' 
                  ? 'bg-white border-indigo-200 text-indigo-700 shadow-sm' 
                  : 'border-transparent hover:bg-gray-200 text-gray-600'
              }`}
            >
              {text.sortAvailability} {renderSortIcon('availability')}
            </button>

            {/* Sort by Hours */}
            <button
              onClick={() => handleSort('workedHours')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition border ${
                sortField === 'workedHours' 
                  ? 'bg-white border-indigo-200 text-indigo-700 shadow-sm' 
                  : 'border-transparent hover:bg-gray-200 text-gray-600'
              }`}
            >
              {text.sortHours} {renderSortIcon('workedHours')}
            </button>
          </div>
        )}
      </div>

      {/* List content */}
      {staffList.length === 0 ? (
        // Empty state message
        <div className="text-center py-8 text-gray-400 italic">
          {text.noStaffMessage}
        </div>
      ) : (
        // Scrollable list container with desktop height adjustment
        <div className="space-y-3 max-h-[400px] lg:max-h-[600px] overflow-y-auto pr-2 custom-scrollbar flex-grow">
          {sortedList.map((staff) => {
            // Check if this specific item is in edit mode
            const isEditing = staff.id === editingId;

            if (isEditing) {
              // RENDER EDIT FORM VIEW
              return (
                <div key={staff.id} className="p-3 bg-blue-50 rounded-lg border border-blue-200 shadow-inner space-y-3">
                   {/* Edit Name Input */}
                   <div>
                      <input 
                        type="text" 
                        value={editForm.name}
                        onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder={text.staffNamePlaceholder}
                      />
                   </div>
                   
                   <div className="flex gap-4">
                      {/* Edit Hours Input */}
                      <div className="w-1/3">
                        <label className="text-xs text-gray-500 block mb-1">{text.workedHoursLabel}</label>
                        <input 
                          type="number" 
                          min="0"
                          value={editForm.workedHours}
                          onChange={(e) => setEditForm(prev => ({ ...prev, workedHours: Number(e.target.value) }))}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                      
                      {/* Edit Availability Checkboxes */}
                      <div className="w-2/3">
                        <label className="text-xs text-gray-500 block mb-1">{text.availabilityLabel}</label>
                        <div className="flex gap-2">
                           <label className="flex items-center text-xs gap-1 cursor-pointer bg-white px-2 py-1 rounded border">
                              <input 
                                type="checkbox" 
                                checked={editForm.availability.includes(ShiftType.MORNING)}
                                onChange={() => toggleEditAvailability(ShiftType.MORNING)}
                              />
                              {text.morning}
                           </label>
                           <label className="flex items-center text-xs gap-1 cursor-pointer bg-white px-2 py-1 rounded border">
                              <input 
                                type="checkbox" 
                                checked={editForm.availability.includes(ShiftType.NIGHT)}
                                onChange={() => toggleEditAvailability(ShiftType.NIGHT)}
                              />
                              {text.night}
                           </label>
                        </div>
                      </div>
                   </div>

                   {/* Save/Cancel Action Buttons */}
                   <div className="flex justify-end gap-2 pt-1">
                      <button 
                        onClick={cancelEditing}
                        className="flex items-center gap-1 px-3 py-1 bg-white border border-gray-300 text-gray-600 rounded-md text-xs hover:bg-gray-50"
                      >
                         <X size={12} /> {text.cancel}
                      </button>
                      <button 
                        onClick={() => saveEditing(staff.id)}
                        className="flex items-center gap-1 px-3 py-1 bg-emerald-600 text-white rounded-md text-xs hover:bg-emerald-700 shadow-sm"
                      >
                         <Check size={12} /> {text.save}
                      </button>
                   </div>
                </div>
              );
            }

            // RENDER READ-ONLY VIEW
            return (
              <div
                key={staff.id}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-indigo-300 transition group"
              >
                <div>
                  <p className="font-semibold text-gray-800">{staff.name}</p>
                  <div className="flex flex-wrap gap-2 text-xs mt-1">
                    <span className="px-2 py-0.5 bg-gray-200 text-gray-700 rounded-full font-medium">
                      {staff.workedHours} hrs
                    </span>
                    {/* Render badges for each available shift */}
                    {staff.availability.map((shift) => (
                      <span
                        key={shift}
                        className={`px-2 py-0.5 rounded-full ${
                          shift === ShiftType.MORNING
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-indigo-100 text-indigo-700'
                        }`}
                      >
                        {shift === ShiftType.MORNING ? text.morning : text.night}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                   {/* Edit Button */}
                   <button
                    onClick={() => startEditing(staff)}
                    className="p-2 text-gray-300 hover:text-blue-500 hover:bg-blue-50 rounded-full transition group-hover:text-gray-400"
                    aria-label={text.edit}
                   >
                     <Edit2 size={16} />
                   </button>
                  {/* Delete Button */}
                  <button
                    onClick={() => onRemoveStaff(staff.id)}
                    className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition group-hover:text-gray-400"
                    aria-label={text.removeStaff}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StaffList;
