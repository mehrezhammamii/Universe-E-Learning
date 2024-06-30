import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { StoreContext } from '../context/StoreContext';
import defaultProfilePic from './photo/blank-profile-picture-973460_1280.webp';
import './profile.css';

const Profile = () => {
<<<<<<< HEAD
  const { token, url } = useContext(StoreContext);
  const [studentData, setStudentData] = useState({});
=======
  const { token, url,courseList,scoreStudent } = useContext(StoreContext);
  const [profileData, setProfileData] = useState({});
const [categoriesCourseOfStudent,setCategorysCourseOfStudent]=useState({});
const[image,setImage]=useState("");
  const categorizeCourses = () => {
    const categoryMap = {};
>>>>>>> e171b143fd2989ae97701f6d1a155f11e8bee129

    courseList.forEach((course) => {
      if (scoreStudent[course._id]) {
        if (!categoryMap[course.categorie]) {
          categoryMap[course.categorie] = [];
        }

        const dataCourse = {
          quiz:course.quiz,
          courseName: course.courseName,
          description: course.description,
          price: course.price,
          score: scoreStudent[course._id],
          picture:course.picture
        };

        categoryMap[course.categorie].push(dataCourse);
      }
    });

    setCategorysCourseOfStudent(categoryMap);
  };
  useEffect(() => {
    const fetchStudentData = async () => {
      if (token) {
        try {
<<<<<<< HEAD
          const response = await axios.get(`${url}/api/student/get/${token}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setStudentData(response.data.student);
          console.log('studentData is', response.data.student);
=======
          const response = await axios.get(`${url}/api/student/one`, { headers: { token } });
          setProfileData(response.data.student);
          categorizeCourses();
          console.log("student is",response.data.student);
>>>>>>> e171b143fd2989ae97701f6d1a155f11e8bee129
        } catch (error) {
          console.error('Error fetching student data:', error);
        }
      }
    };
<<<<<<< HEAD


    fetchStudentData();
  }, [token, url]);
=======
    fetchProfileData();
  }, [token]);
>>>>>>> e171b143fd2989ae97701f6d1a155f11e8bee129

 const updateProfilePicture= async()=>{
if(token){
  let formData=new FormData();
 
  formData.append("image",image);
 try{
  const response= await axios.post(url+"/api/student/update-profile-pic",formData,{headers:{token}})
if(response.data.success){
  alert("image updated sccesfully");
  setProfileData(response.data.student);
 
}
 }
 catch(error){
  console.log(error);
 }
}
 }
  return (
    <div className="profile-container">
      <div className="profile-header">
<<<<<<< HEAD
        <img className="profile-img" src={studentData.profilePic || defaultProfilePic} alt="Profile" />
        <h1>Profile</h1>
=======
        <img className="profile-img" src={image?URL.createObjectURL(image):profileData.profilePic?profileData.profilePic.secure_url:
defaultProfilePic} alt="Profile" />

        <h1 className="profile-title">Profile</h1>
        <input onChange={(e)=>setImage(e.target.files[0])} type='file' id='image' />

<button onClick={()=>updateProfilePicture()}> save image</button>
>>>>>>> e171b143fd2989ae97701f6d1a155f11e8bee129
      </div>

      <div className="profile-body">
<<<<<<< HEAD
        <div className="profile-section">
          <h2>Courses Taken:</h2>
          {studentData.courses.map((course) => (
            <div key={course._id} className="profile-course">
              <h3>{course.courseName}</h3>
              <div className="quiz-scores">
                <span>Score: {studentData.score[course._id]}</span>
              </div>
=======
        {Object.entries(categoriesCourseOfStudent).map(([category, courses]) => (
          <div key={category} className="category-section">
            <h2 className="category-title">category: {category}</h2>
            <div className="courses-container">
              {courses.map((course, index) => (
                <div key={index} className="course-item">
                  <img src={course.picture} alt={course.courseName} className="course-img" />
                  <h3 className="course-name">course name:{course.courseName}</h3>
                  <p className="course-description">description:{course.description}</p>
                  <p className="course-price">Price: ${course.price}</p>
                  <p className="course-score">Score: {course.score+"/"+course.quiz.length}</p>
                </div>
              ))}
>>>>>>> e171b143fd2989ae97701f6d1a155f11e8bee129
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
