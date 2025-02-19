// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { LoadingSpinner } from './components/common/LoadingSpinner';
import { artworkService, staffService, shiftService } from './api-service';
import { Image, Users, Calendar } from 'lucide-react';


// The Dashboard serves as the main overview page, displaying key metrics and recent activities
export default function Dashboard() {
  const [stats, setStats] = useState({
    totalArtworks: 0,
    totalStaff: 0,
    activeShifts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dashboard statistics when component mounts
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real application, you might want to create a dedicated dashboard endpoint
        // Here we're making separate calls to demonstrate the structure
        const [artworks, staff, shifts] = await Promise.all([
          artworkService.getAllArtworks(),
          staffService.getAllStaff(),
          shiftService.getAllShifts(),
        ]);

        setStats({
          totalArtworks: artworks.data.length,
          totalStaff: staff.data.length,
          activeShifts: shifts.data.filter(shift => 
            new Date(shift.date).toDateString() === new Date().toDateString()
          ).length,
        });
        setLoading(false);
      } catch (err) {
        // setError(err.message);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Artworks</CardTitle>
            <Image className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalArtworks}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Staff Members</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStaff}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Shifts</CardTitle>
            <Calendar className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeShifts}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* This would typically be populated with real activity data */}
            <div className="flex items-center">
              <div className="ml-4">
                <p className="text-sm font-medium">New artwork added: "Starry Night"</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="ml-4">
                <p className="text-sm font-medium">Staff shift updated: John Doe</p>
                <p className="text-sm text-gray-500">3 hours ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
