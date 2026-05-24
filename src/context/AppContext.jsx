import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Initial Reports Data (aligned with screenshots)
  const [reports, setReports] = useState([
    {
      id: '#25',
      issue: 'Clogged Drain',
      location: 'Barangay Hall',
      status: 'Rejected',
      dateSubmitted: 'May 20, 2026 10:30 AM',
      submittedBy: 'Marites Quireda',
      contactNo: '09123456789',
      description: 'There is a clogged drain in front of the barangay hall causing bad smell and slow drainage.',
      remarks: 'Duplicate report of #20.',
      mapCoords: { x: 57, y: 70 },
      latLngLabel: 'Barangay Hall, Soledad'
    },
    {
      id: '#23',
      issue: 'Flooded Street',
      location: 'Piurok 1, Zone 1',
      status: 'In Progress',
      dateSubmitted: 'May 2, 2026 08:15 AM',
      submittedBy: 'Juan Dela Cruz',
      contactNo: '09242586524',
      description: 'The street is completely flooded due to heavy rains and blocked catchbasins.',
      remarks: '',
      mapCoords: { x: 72, y: 22 },
      latLngLabel: 'Farm ni Tengklers, Zone 1'
    },
    {
      id: '#20',
      issue: 'Clogged Drain',
      location: 'Purok 2, Zone 2',
      status: 'Resolved',
      dateSubmitted: 'May 29, 2026 02:45 PM',
      submittedBy: 'Ana Beltran',
      contactNo: '09275768752',
      description: 'Stagnant water piling up over the main highway drainage, causing plastic bottles and leaves blockages.',
      remarks: 'Cleaned up by public works team.',
      mapCoords: { x: 35, y: 18 },
      latLngLabel: 'Purok 2, Main Highway'
    },
    {
      id: '#21',
      issue: 'Clogged Drain',
      location: 'purok 3, Zone 4',
      status: 'In Progress',
      dateSubmitted: 'May 17, 2026 11:20 AM',
      submittedBy: 'Marla Santos',
      contactNo: '09427578688',
      description: 'Clogged pipe outlets are causing slow drainage and foul smell in front of residential homes.',
      remarks: '',
      mapCoords: { x: 42, y: 56 },
      latLngLabel: 'Casa Maan, Cavinti Rd'
    }
  ]);

  // Initial Residents Data (aligned with screenshots)
  const [residents, setResidents] = useState([
    {
      id: 1,
      name: 'Juan Dela Cruz',
      contact: '09242586524',
      email: 'JuanDelaCruz@goole.com',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Marla Santos',
      contact: '09427578688',
      email: 'MarlaSantos@email.com',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Ana Beltran',
      contact: '09275768752',
      email: 'Ana Beltran@gmail.com',
      status: 'Inactive'
    }
  ]);

  // Initial Notifications Data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Drainage Report Submitted',
      description: 'Resident Juan Dela Cruz submitted a report: "Flooded Street near Piurok 1".',
      time: '2 hours ago',
      unread: true,
      category: 'report'
    },
    {
      id: 2,
      title: 'Report Rejected',
      description: 'Report #25 from Barangay Hall was rejected by admin due to duplicate report.',
      time: '4 hours ago',
      unread: true,
      category: 'status'
    },
    {
      id: 3,
      title: 'New Resident Account Registered',
      description: 'Marla Santos successfully registered and verified their contact details.',
      time: '1 day ago',
      unread: false,
      category: 'resident'
    },
    {
      id: 4,
      title: 'Report Resolved',
      description: 'Report #20 "Clogged Drain at Purok 2" status updated to Resolved.',
      time: '2 days ago',
      unread: false,
      category: 'status'
    }
  ]);

  // Helper function to update report status
  const updateReportStatus = (id, newStatus) => {
    setReports(prevReports =>
      prevReports.map(rep => (rep.id === id ? { ...rep, status: newStatus } : rep))
    );
  };

  // Helper function to update report details (status + remarks)
  const updateReportDetails = (id, newStatus, newRemarks) => {
    setReports(prevReports =>
      prevReports.map(rep => (rep.id === id ? { ...rep, status: newStatus, remarks: newRemarks } : rep))
    );
  };

  // Helper to add a resident
  const addResident = (newResident) => {
    setResidents(prev => [
      ...prev,
      {
        id: Date.now(),
        status: 'Active',
        ...newResident
      }
    ]);
  };

  // Helper to delete a resident
  const deleteResident = (id) => {
    setResidents(prev => prev.filter(res => res.id !== id));
  };

  // Helper to toggle resident status
  const toggleResidentStatus = (id) => {
    setResidents(prev =>
      prev.map(res =>
        res.id === id ? { ...res, status: res.status === 'Active' ? 'Inactive' : 'Active' } : res
      )
    );
  };

  // Helper to mark notifications as read
  const markNotificationRead = (id) => {
    setNotifications(prev =>
      prev.map(notif => (notif.id === id ? { ...notif, unread: false } : notif))
    );
  };

  // Helper to delete notification
  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        reports,
        setReports,
        residents,
        notifications,
        updateReportStatus,
        updateReportDetails,
        addResident,
        deleteResident,
        toggleResidentStatus,
        markNotificationRead,
        deleteNotification
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
