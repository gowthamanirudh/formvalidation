import './App.css';
import {useState} from "react";

function App() {
  const[state,setState]=useState({
    fname:"",
    lname:"",
    email:"",
    phoneno:"",
    dept:"",
    doj:"",
    role:""
  })

  const[mistake,setmistake]=useState({
    type:"",
    error:""
  })

  const validateField=(name,value)=>{
    switch(name){
      case "fname":
        const fnameRegex=/^[A-Za-z]+$/;
        if(!fnameRegex.test(value)){
          return "This field should contain in format";
        };
        break;
      
      case "lname":
        const lnameRegex=/^[A-Za-z]+(\.[A-Za-z])*\.$/;
        if(!lnameRegex.test(value)){
            return "This field should contain in format"
          };
        break;
      
      case "email":
        const emailRegex=/^[A-Za-z_.%0-9+-]+@[A-Za-z0-9._]+\.[A-Za-z]$/;
        if(!emailRegex.test(value)){
            return "This field should contain in format"
          };
        break;
      
      case "phoneno":
          const phonenoRegex=/^[0-9]{10}$/;
          if(!phonenoRegex.test(value)){
              return "This field should contain in format"
            };
          break;
      
       case "dept":
          if(value.trim()===""){
            return "Dept cannot be empty";
          }
          break;
       
       case "doj":
          const today=new Date();
          const doj=new Date(value);
          if(doj>today){
            return "Cannot be in future";
          }
          break;
      case "role":
        if(value.trim()===""){
          return "role cannot be empty";
        }
        break;
      
      default:
        return "";
    }
    return "";
  };



  const form=async function(event){
      const{name,value}=event.target;
      const error=validateField(name,value);

      setmistake({type:name,error:error});
      setState({...state,[name]:value});
  }

  const handlesubmit=async()=>{
    if(!mistake.error){
      let sendData=await(
        await(
          await fetch("http://localhost:400/submitdata",{
            headers:{"content-type":"application/json"},
            method:"post",
            body:JSON.stringify(state)
          })
        )
      ).json()

      if(Object.keys(sendData).includes("error")){
        setmistake({type:"update_error",error:sendData.error});
      }else{
        setmistake({type:"success",message:sendData.message});
      }
      console.log(sendData);
    }

  }
  
  return (
       <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <div className='container mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-300 max-w-md'>
          <h1 className='text-3xl font-bold mb-6 text-center text-gray-800'>Validation Form</h1>
          <form className='space-y-6' onSubmit={(event)=>event.preventDefault()}>
            <div>
                 <label htmlFor='fname' className=''>First Name</label>
                 <input type="text" name="fname" placeholder='Enter First name' className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400' onChange={form} value={state.fname}></input>
                 {mistake.type==="fname"?<span>{mistake.error}</span>:""}
            </div>

            <div>
                 <label htmlFor='lname' className=''>Last Name</label>
                 <input type="text" name="lname" placeholder='Enter Last name' className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400' onChange={form} value={state.lname}></input>
                 {mistake.type==="lname"?<span>{mistake.error}</span>:""}
            </div>

            <div>
                 <label htmlFor='email' className=''>Email</label>
                 <input type="email" name="email" placeholder='Enter Email' className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400' onChange={form} value={state.email}></input>
                 {mistake.type==="email"?<span>{mistake.error}</span>:""}
            </div>

            <div>
                 <label htmlFor='phoneno' className=''>Contact</label>
                 <input type="text" name="phoneno" placeholder='Enter contact' className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400' onChange={form} value={state.phoneno}></input>
                 {mistake.type==="phoneno"?<span>{mistake.error}</span>:""}
            </div>

            <div>
                 <label htmlFor='dept' className=''>Department</label>
                 <input type="text" name="dept" placeholder='Enter Department' className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400' onChange={form} value={state.dept}></input>
                 {mistake.type==="dept"?<span>{mistake.error}</span>:""}
            </div>

            <div>
                 <label htmlFor='doj' className=''>Date of join</label>
                 <input type="date" name="doj" placeholder='Enter First name' className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400' onChange={form} value={state.doj}></input>
                 {mistake.type==="doj"?<span style={{color:"red"}}>{mistake.error}</span>:""}
            </div>

            <div>
                 <label htmlFor='role' className=''>Enter role</label>
                 <input type="text" name="role" placeholder='Enter First name' className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400' onChange={form} value={state.role}></input>
                 {mistake.type==="role"?<span color='red'>{mistake.error}</span>:""}
            </div>
            <div>
                 {mistake.type==="update_errorr"?<span>{mistake.error}</span>:""}
            </div>
             
             <div className="flex justify-between">
              <button type="submit" className='w-full ml-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300' onClick={handlesubmit}>
                SUBMIT
              </button>
             </div>
          </form>
        </div>
       </div>
  );
}

export default App;
