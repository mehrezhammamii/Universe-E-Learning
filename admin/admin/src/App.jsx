import React, { useState } from 'react';
import AdminPage from './component/admin';
import CourseManager from './component/courseManager';
import Exercise from './component/Exercise';

const App = () => {
  const [showCourseManager, setShowCourseManager] = useState(false);
  const [currentView, setCurrentView] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleNavigation = (view, courseId = null) => {
    setCurrentView(view);
    setSelectedCourse(courseId);
  };

  const goToCourseManager = () => {
    setCurrentView('');
    setShowCourseManager(true);
  };

  if (currentView === "ex") {
    return <Exercise selectedCourse={selectedCourse} goToCourseManager={goToCourseManager} />;
  }

  const handleSwitchToCourseManager = () => {
    setShowCourseManager(true);
  };

  return (
    <div>
      {!showCourseManager && <AdminPage onSwitchToCourseManager={handleSwitchToCourseManager} />}
      {showCourseManager && <CourseManager handleNavigation={handleNavigation} />}
    </div>
  );
};

export default App;
