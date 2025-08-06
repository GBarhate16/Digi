import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Calendar, 
  Trash2, 
  LogOut, 
  RefreshCw,
  Mail,
  Phone,
  MessageSquare,
  User,
  Clock,
  Search,
  X,
  Menu
} from 'lucide-react';
import { Button } from '../Components/ui/button';

interface FormSubmission {
  _id: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  message: string;
  submittedAt: string;
}

interface Stats {
  totalSubmissions: number;
  todaySubmissions: number;
}

const AdminDashboard: React.FC = () => {
  const { logout, token } = useAuth();
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [stats, setStats] = useState<Stats>({ totalSubmissions: 0, todaySubmissions: 0 });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSubmissions, setFilteredSubmissions] = useState<FormSubmission[]>([]);
  const [realtimeConnected, setRealtimeConnected] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for hamburger menu

  const fetchData = async () => {
    try {
      const [submissionsRes, statsRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/admin/submissions`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }),
        fetch(`${import.meta.env.VITE_API_URL}/admin/stats`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      ]);

      if (submissionsRes.ok && statsRes.ok) {
        const submissionsData = await submissionsRes.json();
        const statsData = await statsRes.json();
        setSubmissions(submissionsData);
        setStats(statsData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  // Real-time connection
  useEffect(() => {
    if (!token) return;

    const connectRealtime = () => {
      const eventSource = new EventSource(`${import.meta.env.VITE_API_URL}/admin/realtime?token=${token}`);

      eventSource.onopen = () => {
        console.log('Real-time connection established');
        setRealtimeConnected(true);
      };

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          switch (data.type) {
            case 'connected':
              console.log('Connected to real-time updates');
              break;
            
            case 'new_submission':
              console.log('New submission received:', data.data);
              setSubmissions(prev => [data.data, ...prev]);
              setStats(prev => ({ 
                ...prev, 
                totalSubmissions: prev.totalSubmissions + 1,
                todaySubmissions: prev.todaySubmissions + 1
              }));
              
              setShowNotification(true);
              setTimeout(() => setShowNotification(false), 5000);
              break;
            
            case 'delete_submission':
              console.log('Submission deleted:', data.data.id);
              setSubmissions(prev => prev.filter(sub => sub._id !== data.data.id));
              setFilteredSubmissions(prev => prev.filter(sub => sub._id !== data.data.id));
              setStats(prev => ({ 
                ...prev, 
                totalSubmissions: prev.totalSubmissions - 1
              }));
              break;
            
            case 'ping':
              break;
            
            default:
              console.log('Unknown real-time event:', data);
          }
        } catch (error) {
          console.error('Error parsing real-time data:', error);
        }
      };

      eventSource.onerror = (error) => {
        console.error('Real-time connection error:', error);
        setRealtimeConnected(false);
        eventSource.close();
        
        setTimeout(connectRealtime, 5000);
      };

      return eventSource;
    };

    const eventSource = connectRealtime();

    return () => {
      if (eventSource) {
        eventSource.close();
        setRealtimeConnected(false);
      }
    };
  }, [token]);

  // Filter submissions
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredSubmissions(submissions);
      return;
    }

    const filtered = submissions.filter(submission => {
      const query = searchQuery.toLowerCase();
      return (
        submission.fullName.toLowerCase().includes(query) ||
        submission.email.toLowerCase().includes(query) ||
        submission.mobileNumber.toLowerCase().includes(query) ||
        submission.message.toLowerCase().includes(query)
      );
    });
    setFilteredSubmissions(filtered);
  }, [searchQuery, submissions]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/submissions/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setSubmissions(submissions.filter(sub => sub._id !== id));
        setFilteredSubmissions(filteredSubmissions.filter(sub => sub._id !== id));
        setStats(prev => ({ ...prev, totalSubmissions: prev.totalSubmissions - 1 }));
      }
    } catch (error) {
      console.error('Error deleting submission:', error);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-black flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-sm sm:text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-black flex flex-col">
      {/* Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg shadow-lg max-w-xs w-full"
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-xs sm:text-sm">New submission received!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 fixed top-0 left-0 right-0 z-50 w-full">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            {/* Logo and Live Status */}
            <div className="flex items-center flex-wrap gap-3 sm:gap-4">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                <span className="text-yellow-500">Digitos</span> Admin
              </h1>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${realtimeConnected ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-xs text-gray-400">Live: {realtimeConnected ? 'On' : 'Off'}</span>
                <Button
                  onClick={handleRefresh}
                  disabled={refreshing}
                  variant="outline"
                  size="sm"
                  className="text-gray-400 hover:text-white px-2 sm:px-3"
                >
                  <RefreshCw className={`w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                  <span className="text-xs sm:text-sm">Refresh</span>
                </Button>
              </div>
            </div>

            {/* Hamburger Menu for Mobile/Tablet */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded p-1"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Logout Button for Desktop */}
            <div className="hidden lg:flex">
              <Button
                onClick={logout}
                variant="outline"
                size="sm"
                className="text-red-400 hover:text-red-300 border-red-400 hover:border-red-300 px-3"
              >
                <LogOut className="w-4 h-4 mr-2" />
                <span className="text-sm">Logout</span>
              </Button>
            </div>
          </div>

          {/* Dropdown Menu for Mobile/Tablet */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="lg:hidden bg-gray-900/90 backdrop-blur-sm border-b border-gray-800 px-4 py-3"
              >
                <Button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  variant="outline"
                  size="sm"
                  className="w-full text-red-400 hover:text-red-300 border-red-400 hover:border-red-300 px-3"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  <span className="text-sm">Logout</span>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-28 pb-6 sm:pb-8 overflow-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8 max-w-screen-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4 sm:p-5 lg:p-6"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">Total Submissions</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{stats.totalSubmissions}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4 sm:p-5 lg:p-6"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500/10 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
              </div>
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">Today's Submissions</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{stats.todaySubmissions}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4 sm:p-5 lg:p-6"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">Response Rate</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-white">100%</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Submissions */}
        <div className="space-y-4 sm:space-y-6 max-w-screen-2xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-white">Form Submissions</h2>
              <p className="text-gray-400 text-xs sm:text-sm">
                {filteredSubmissions.length} of {submissions.length} submission{submissions.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Search Box */}
            <div className="relative w-full sm:w-64 lg:w-80">
              <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search by name, email, phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 sm:pl-10 pr-8 sm:pr-10 bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 rounded-lg py-1.5 sm:py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              )}
            </div>
          </div>

          <AnimatePresence>
            {filteredSubmissions.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 sm:py-12"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600" />
                </div>
                <p className="text-gray-400 text-sm sm:text-lg">
                  {submissions.length === 0 ? 'No submissions yet' : 'No results found'}
                </p>
                <p className="text-gray-500 text-xs sm:text-sm">
                  {submissions.length === 0 ? 'Form submissions will appear here' : 'Try adjusting your search terms'}
                </p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredSubmissions.map((submission, index) => (
                  <motion.div
                    key={submission._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4 sm:p-5 lg:p-6 hover:border-gray-700 transition-colors relative"
                  >
                    <Button
                      onClick={() => handleDelete(submission._id)}
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 p-1 h-auto w-auto"
                    >
                      <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Button>

                    <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4 pr-8 sm:pr-10">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-white text-sm sm:text-base truncate">{submission.fullName}</h3>
                        <p className="text-xs sm:text-sm text-gray-400 truncate">{submission.email}</p>
                      </div>
                    </div>

                    <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                      <div className="flex items-center space-x-2 text-xs sm:text-sm">
                        <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-300 truncate">{submission.mobileNumber}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs sm:text-sm">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-300">{formatDate(submission.submittedAt)}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-xs sm:text-sm">
                        <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-400">Message:</span>
                      </div>
                      <p className="text-white text-xs sm:text-sm bg-gray-800/50 rounded-lg p-2 sm:p-3 border border-gray-700 line-clamp-3">
                        {submission.message}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;