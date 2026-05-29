import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, FileText, MapPin, Users, Bell, LogOut, PlusCircle } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Reports', path: '/reports', icon: FileText },
    { name: 'Add Report', path: '/add-report', icon: PlusCircle },
    { name: 'Map', path: '/map', icon: MapPin },
    { name: 'Residents', path: '/residents', icon: Users },
    { name: 'Notification', path: '/notifications', icon: Bell },
  ];

  const handleLogout = () => {
    // Clear mock auth if any, then redirect to login (root)
    navigate('/');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        Drainage<br />Monitoring System
      </div>
      
      <nav className="sidebar-menu">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={22} />
              <span>{item.name}</span>
            </Link>
          );
        })}
        
        <div className="sidebar-footer">
          <button 
            onClick={handleLogout} 
            className="sidebar-item" 
            style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer' }}
          >
            <LogOut size={22} />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}
