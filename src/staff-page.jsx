// src/pages/Staff.jsx
import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { Input } from './components/ui/input';
import { Modal } from './components/common/Modal';
import { LoadingSpinner } from './components/common/LoadingSpinner';
import { staffService } from './api-service';
import StaffForm from './components/staff/staffForm';

export default function Staff() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStaffMember, setSelectedStaffMember] = useState(null);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await staffService.getAllStaff();
        setStaff(response.data);
        setLoading(false);
      } catch (err) {
        // setError(err.message);
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  const handleStaffSubmit = async (staffData) => {
    try {
      if (selectedStaffMember) {
        const response = await staffService.updateStaffMember(
          selectedStaffMember.id,
          staffData
        );
        setStaff(staff.map(s => 
          s.id === selectedStaffMember.id ? response.data : s
        ));
      } else {
        const response = await staffService.createStaffMember(staffData);
        setStaff([...staff, response.data]);
      }
      setIsModalOpen(false);
      setSelectedStaffMember(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditStaff = (staffMember) => {
    setSelectedStaffMember(staffMember);
    setIsModalOpen(true);
  };

  const filteredStaff = staff.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Staff Management</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Staff Member
        </Button>
      </div>

      <Input
        placeholder="Search staff..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.map(member => (
          <Card key={member.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                  <p className="text-sm text-gray-500">{member.email}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  member.status === 'Active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {member.status}
                </span>
              </div>
              <div className="mt-4 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditStaff(member)}
                >
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedStaffMember(null);
        }}
        title={selectedStaffMember ? "Edit Staff Member" : "Add New Staff Member"}
      >
        <StaffForm
          staffMember={selectedStaffMember}
          onSubmit={handleStaffSubmit}
          onCancel={() => {
            setIsModalOpen(false);
            setSelectedStaffMember(null);
          }}
        />
      </Modal>
    </div>
  );
}
