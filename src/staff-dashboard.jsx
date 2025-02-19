import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Calendar, Clock, User } from 'lucide-react';

const StaffDashboard = () => {
  const [staff, setStaff] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample data
  const sampleStaff = [
    {
      id: 1,
      name: "Jane Smith",
      role: "Curator",
      email: "jane@museum.com",
      status: "Active"
    },
    {
      id: 2,
      name: "John Doe",
      role: "Security",
      email: "john@museum.com",
      status: "Active"
    }
  ];

  const sampleShifts = [
    {
      id: 1,
      staffId: 1,
      date: "2025-02-18",
      startTime: "09:00",
      endTime: "17:00"
    },
    {
      id: 2,
      staffId: 2,
      date: "2025-02-18",
      startTime: "08:00",
      endTime: "16:00"
    }
  ];

  useEffect(() => {
    // Simulating API calls
    setTimeout(() => {
      setStaff(sampleStaff);
      setShifts(sampleShifts);
      setLoading(false);
    }, 1000);
  }, []);

  const StaffCard = ({ staffMember }) => (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">{staffMember.name}</h3>
            <p className="text-sm text-gray-600">{staffMember.role}</p>
            <p className="text-sm text-gray-500">{staffMember.email}</p>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs ${
            staffMember.status === 'Active' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {staffMember.status}
          </span>
        </div>
      </CardContent>
    </Card>
  );

  const ShiftSchedule = () => (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Today's Shifts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {shifts.map(shift => {
            const staffMember = staff.find(s => s.id === shift.staffId);
            return (
              <div key={shift.id} className="flex items-center space-x-4 p-2 border-b">
                <User className="text-gray-400" size={20} />
                <div className="flex-1">
                  <p className="font-medium">{staffMember?.name}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock size={14} />
                    <span>{shift.startTime} - {shift.endTime}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Staff Management</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <User size={20} />
          Add Staff Member
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {staff.map((staffMember) => (
                <StaffCard key={staffMember.id} staffMember={staffMember} />
              ))}
            </div>
          </div>
          <div className="lg:col-span-1">
            <ShiftSchedule />
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffDashboard;
