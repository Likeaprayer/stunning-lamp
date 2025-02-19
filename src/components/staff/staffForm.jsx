// src/components/staff/StaffForm.jsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { Button } from '../ui/button';

const StaffForm = ({ staffMember, onSubmit, onCancel }) => {
  // Initialize form state with staff member data or empty values
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    status: 'Active',
    hireDate: '',
    ...staffMember
  });

  // Available roles in the museum
  const roles = [
    { id: 1, title: 'Curator' },
    { id: 2, title: 'Security Officer' },
    { id: 3, title: 'Guide' },
    { id: 4, title: 'Conservator' },
    { id: 5, title: 'Administrator' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">First Name</label>
          <Input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Last Name</label>
          <Input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Email</label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Phone</label>
        <Input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Role</label>
        <Select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="">Select Role</option>
          {roles.map(role => (
            <option key={role.id} value={role.id}>
              {role.title}
            </option>
          ))}
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Hire Date</label>
        <Input
          type="date"
          name="hireDate"
          value={formData.hireDate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Status</label>
        <Select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="Active">Active</option>
          <option value="On Leave">On Leave</option>
          <option value="Inactive">Inactive</option>
        </Select>
      </div>

      <div className="flex justify-end space-x-4 mt-6">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {staffMember ? 'Update Staff Member' : 'Add Staff Member'}
        </Button>
      </div>
    </form>
  );
};

export default StaffForm;