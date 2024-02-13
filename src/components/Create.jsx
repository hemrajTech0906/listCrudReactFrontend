// import React,{useState} from 'react'
// import axios from 'axios'
// import {useNavigate } from 'react-router-dom'
// import { ToastContainer, toast } from 'react-toastify';
// import './Create.css'
// import * as yup from 'yup';


// const validationSchema = yup.object().shape({
//   name: yup.string().required('Name is required'),
//   email: yup.string().email('Invalid email').required('Email is required'),
// });


// const Create = () => {
 
//   const notify = () => toast.success("ya dude created data!");

//     const [input,setInput]=useState({
//         name:"",
//         email:"",
//     })
   
//     let history=useNavigate()

//     let handleInputData=(e)=>{
//         // setInput(e.target.value)
//         setInput({
//             ...input,
//             [e.target.name]:e.target.value,
//         })

//     }
//       // we have to store the data in dummy is just line anykingofdatabase
//       // we have used axois 
//     let submitHandler =async(e)=>{

      
//       if (!input.name.trim() || !input.email.trim()){
//         // If name or email is empty, show a toast message
        
//          alert('Please enter details here')
//         return toast.error('Name and email are required'); // imp before that it will empty data submit return
//       }
//         e.preventDefault();

//         // showSuccessNotification("please fill the values of input fields")

//         try {
//           // yup validation
//           await validationSchema.validate(input, { abortEarly: false });
          
//             let responce= await axios.post('https://65c9a3e23b05d29307deb466.mockapi.io/crudFrontend',input)
//             console.log(responce.data)
//             setInput(responce.data)
//             // notify("done1")
//             notify()
//             history('/read')
           
//         } catch (error) {
//             // console.log('Error submitting on data',error)
//             if (error instanceof yup.ValidationError) {
//               // Handle Yup validation errors
//               error.errors.forEach((errorMessage) => toast.error(errorMessage));
//             } else {
//               // Handle other errors (e.g., API call error)
//               console.error('Error submitting data', error);
//               toast.error('Error submitting data. Please try again.');
//             }
//         }
        

        

//     }

//             // not working--->This logic-->validation not pass it not showing toast


//   //  const showSuccessNotification = (message) => {
//   //   if(!input.name.trim() ||!input.email.trim()){
       
//   //     toast.error(message, {
//   //       position: toast.POSITION,
//   //     });
      
//   //       return;

//   //   }
        
//   //     };

    

    

    
//   return (
//     <div className='container'>
//         <form onSubmit={submitHandler} >
        
//           <br></br>
//           <br></br>
//             <label htmlFor='name'>Name:</label>
//             <input type="text" name="name" value={input.name} onChange={handleInputData}/>
//             <br></br>
//             <br></br>
//             <label htmlFor="email">Email:</label>
//             <input type="email" value={input.email} name="email" onChange={handleInputData}/>
//             <br></br>
//             <br></br>

         
//           <div>
//           <button type="submit" onClick={notify} >Submit</button>
        
//       </div>

        
//         </form>
//        <div>
//         {/* {input.name}
//         <br></br>
//         {input.email} */}
//        </div>
//     </div>
//   )
// }

// export default Create









import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Create.css'
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
});

const Create = () => {
  const notify = () => toast.success('Data created successfully!');

  const [input, setInput] = useState({
    name: '',
    email: '',
  });

  const history = useNavigate();

  const handleInputData = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      // Validate the input data using Yup schema
      await validationSchema.validate(input, { abortEarly: false });

      // If validation passes, make the API call
      const response = await axios.post(
        'https://65c9a3e23b05d29307deb466.mockapi.io/crudFrontend',
        input
      );

      console.log(response.data);
      setInput(response.data);

      // Show success notification
      notify();
      // Redirect to the 'read' page
      history('/read');
         } catch (error) {
      // If validation fails or API call fails, show error messages
      if (error instanceof yup.ValidationError) {
        // Handle Yup validation errors
        error.errors.forEach((errorMessage) => toast.error(errorMessage));
      } else {
        // Handle other errors (e.g., API call error)
        console.error('Error submitting data', error);
        toast.error('Error submitting data. Please try again.');
      }
    }
  };

  return (
    <div className='container'>
      <form onSubmit={submitHandler}>
        <br />
        <br />
        <label htmlFor='name'>Name:</label>
        <input
          type='text'
          name='name'
          value={input.name}
          onChange={handleInputData}
        />
        <br />
        <br />
        <label htmlFor='email'>Email:</label>
        <input
          type='email'
          value={input.email}
          name='email'
          onChange={handleInputData}
        />
        <br />
        <br />
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
      {/* <div>
        {input.name}
        <br />
        {input.email}
      </div> */}
    </div>
  );
};

export default Create;
