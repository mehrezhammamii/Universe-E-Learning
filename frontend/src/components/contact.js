import React,{useState} from "react";
import "./contact.css";
import emailjs from 'emailjs-com';
import { MDBInput, MDBCheckbox, MDBBtn, MDBValidation, MDBValidationItem,MDBTextArea } from 'mdb-react-ui-kit';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    subject:''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();

   
    const serviceID = 'service_5jrfg4z';
    const templateID = 'template_bstwlbo';
    const userID = 'OyRhgg0kLY6s2X6II';
console.log("target1",e.target);
console.log("target",e.target.value);
    emailjs.sendForm(serviceID, templateID, e.target, userID)
      .then((result) => {
        console.log(result.text);
        alert('Message sent successfully!');
      }, (error) => {
        console.log(error.text);
        alert('Failed to send message, please try again.');
      });
alert("success");
    setFormData({
      name: '',
      email: '',
      message: '',
      subject:''
    });
  };
  return (
    <div className="all">
      <MDBValidation noValidate id='form' className='text-center' style={{ width: '100%', maxWidth: '300px' }} onSubmit={handleSubmit}>
        <h2>Contact us</h2>

        <MDBValidationItem invalid feedback='Please provide your name.'>
          <MDBInput label='Name' name='name' value={formData.name} onChange={handleChange} wrapperClass='mb-4'  required/>
        </MDBValidationItem>

        <MDBValidationItem invalid feedback='Please provide your email.'>
          <MDBInput type='email' label='Email address' name='email' value={formData.email} onChange={handleChange} wrapperClass='mb-4' required />
        </MDBValidationItem>

        <MDBValidationItem invalid feedback='Please provide mail subject.'>
          <MDBInput label='Subject' name='subject' value={formData.subject} onChange={handleChange} wrapperClass='mb-4' required />
        </MDBValidationItem>

        <MDBValidationItem invalid feedback='Please provide a message text.'>
          <MDBTextArea wrapperClass='mb-4' label='Message' name='message' value={formData.message} onChange={handleChange} required />
        </MDBValidationItem>

        <MDBValidationItem feedback=''>
          <MDBCheckbox wrapperClass='d-flex justify-content-center' label='Send me copy' />
        </MDBValidationItem>
        <MDBBtn type='submit' color='primary' block className='my-4'>
        
        </MDBBtn>
      </MDBValidation>
      
    </div>
  );
};

export default Contact;
