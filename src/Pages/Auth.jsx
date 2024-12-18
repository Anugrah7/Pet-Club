import { PawPrint } from "lucide-react";
import React, { useState } from "react";
import { registerAPI } from "../../Services/allAPI";


const Auth = () => {
  // State to toggle between Sign-Up and Log-In forms
  const [isSignUp, setIsSignUp] = useState(true);
  // State to capture the selected role during sign-up
  const [role, setRole] = useState(null);
  const [isLoading,setIsLoading] = useState(false)

  // Handle role selection for sign-up
  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
  };

  const [userInput,setUserInput] = useState({
    username:"",email:"",password:""
  })
 console.log(userInput);
 

  const register =  async (e)=>{
    e.preventDefault()
    if(userInput.username && userInput.password && userInput.email && role){
      
      //api call
      try{
        const result = await registerAPI({...userInput,role})
        setIsLoading(true);
        if(result.status == 200){
          alert(`Welcome ${result.data?.username},Please login to explore our Projects`);
          navigate('/login')
          setUserInput({username:"",email:"",password:""});
          setRole(null)
        }else{
          if(result.response.status == 406){
            alert(result.response.data)
            setUserInput({username:"" , email:"",password:""})
          }
  
        }
  
      }catch(err){
        setIsLoading(false)
        console.log(err);
        alert("An error Occured while Registering")
      }
  
    }else{
      alert("Please fill the form completely !!! ")
    }
  }
  

  return (
    <div className="flex h-screen  items-center justify-center bg-gray-200">
      {/* Container */}
      <div className="flex flex-col  md:flex-row w-11/12 max-w-4xl shadow-2xl ">
        {/* Left Section - Form */}
        <div className="w-full md:w-1/2 bg-white p-6 md:p-10">
          {/* Logo */}
          <div className="mb-6 flex justify-center md:justify-start">
          <PawPrint size={20} />
            <h1 className="text-3xl font-bold text-indigo-600">
              Pet<span className="text-indigo-800">Club</span>
            </h1>
          </div>

          {/* Form Header */}
          <h2 className="mb-6 text-2xl font-semibold text-gray-700 text-center md:text-left">
            {isSignUp ? "Sign Up" : "Log In"}
          </h2>
   
          {/* Sign-Up Role Selection */}
          {isSignUp && !role && (
            <div className="space-y-4 mb-6">
              <p className="text-lg text-gray-600">Select your role:</p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => handleRoleSelect("owner")}
                  className="w-1/2 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-800 hover:shadow-xl"
                >
                  Owner
                </button>
                <button
                  onClick={() => handleRoleSelect("provider")}
                  className="w-1/2 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-800 hover:shadow-xl"
                >
                  Provider
                </button>
              </div>
            </div>
          )}

          {/* Form */}
          {isSignUp && role && (
            <form className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Username</label>
                <input
                  onChange={e=>setUserInput({...userInput,username:e.target.value})}
                  value={userInput.username}
                  type="text"
                  placeholder="Username"
                  className="w-full rounded-lg border border-gray-300 p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Email</label>
                <input
                   onChange={e=>setUserInput({...userInput,email:e.target.value})}
                   value={userInput.email}
                  type="email"
                  placeholder="Your Email"
                  className="w-full rounded-lg border border-gray-300 p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Password</label>
                <input
                 onChange={e=>setUserInput({...userInput,password:e.target.value})}
                 value={userInput.password}
                  type="password"
                  placeholder="Your Password"
                  className="w-full rounded-lg border border-gray-300 p-2"
                />
              </div>
              <button
                onClick={register}
                className={`w-full rounded-lg shadow-md bg-indigo-600 py-2 text-white transition-transform ${
                    isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-800 hover:-translate-y-1"
                }`}
                disabled={isLoading}
            >
                {isLoading ? "Signing Up..." : isSignUp ? "Sign Up" : "Log In"}
            </button>
            </form>
          )}

          {/* Login Form */}
          {!isSignUp && (
            <form className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Email</label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full rounded-lg border border-gray-300 p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Password</label>
                <input
                  type="password"
                  placeholder="Your Password"
                  className="w-full rounded-lg border border-gray-300 p-2"
                />
              </div>
              <button className="w-full rounded-lg shadow-md bg-indigo-600 py-2 text-white transition-transform hover:bg-indigo-800 hover:-translate-y-1 hover:shadow-2xl hover:transition-all active:-translate-y-0">
                Log In
              </button>
            </form>
          )}

          {/* Switch Between Forms */}
          <p className="mt-4 text-center text-sm text-gray-500">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <span
              onClick={() =>{
               setIsSignUp(!isSignUp)
                setRole(null);
              }}
              className="cursor-pointer text-indigo-600 hover:underline"
            >
              {isSignUp ? "Log In" : "Sign Up"}
            </span>
          </p>
        </div>

        {/* Right Section - Hero */}
        <div className="hidden md:flex w-1/2 bg-indigo-200 p-10">
          <div className="flex h-full flex-col items-center justify-center text-center">
            <h1 className="mb-4 text-3xl font-bold text-indigo-800">Pet Club</h1>
            <p className="mb-6 text-lg text-gray-700">
              All the Lorem Ipsum generators on the Internet tend to repeat.
            </p>
            {/* Images */}
            <div className="flex space-x-5">
              <img
                className="h-28 w-28 rounded-full object-cover"
                src="https://img.freepik.com/premium-photo/photo-shocked-cute-dog-face-solid-color-background-ai-generative_407474-14450.jpg"
                alt="Image 1"
              />
              <img
                className="h-28 w-28 rounded-full object-cover"
                src="https://img.freepik.com/premium-photo/ginger-cat-looking-up-with-wide-green-eyes-cat-has-long-white-whiskers-pink-nose-background-is-solid-light-orange-color_14117-219029.jpg?w=360"
                alt="Image 2"
              />
              <img
                className="h-28 w-28 rounded-full object-cover"
                src="https://www.shutterstock.com/image-photo/funny-hungry-australian-shepherd-puppy-600nw-2475379251.jpg"
                alt="Image 3"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
