import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import "./oneCourse.css"

const OneCourse = ({ courseId,handleNavigation,setShowLogin }) => {
  const { courseList,token } = useContext(StoreContext);
  const courseOne = courseList.find((el) => el._id === courseId);

  if (!courseOne) return <div>Course not found</div>;

  const handleQuizClick = () => {
if(token){
    handleNavigation('quizPage', courseId);
}
else{
  alert("you should login first");
  setShowLogin(true);
}
};
  
  return (
    <>

        <div className='oneVideo'>
          <iframe
            width="1000"
            height="640"
            src={courseOne.video}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
<br/><br/>
<button class="red-button" onClick={() => handleQuizClick(courseOne.id)}>Test your knowledge</button>

        </div>
    </>
  );
};

export default OneCourse;
