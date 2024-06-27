import React, { useState } from 'react';
import AdminPage from './component/admin';
import CourseManager from './component/courseManager';

const App = () => {
  const [showCourseManager, setShowCourseManager] = useState(false);

  const handleSwitchToCourseManager = () => {
    setShowCourseManager(true);
  };

  return (
    <div>
      {!showCourseManager && <AdminPage onSwitchToCourseManager={handleSwitchToCourseManager} />}
      {showCourseManager && <CourseManager />}
    </div>
  );
};

export default App;
