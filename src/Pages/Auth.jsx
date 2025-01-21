import { PawPrint } from "lucide-react";
import React, { useState } from "react";
import { loginAPI, registerAPI } from "../../Services/allAPI";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(true); // Toggle Sign-Up and Log-In forms
  const [role, setRole] = useState(null); // Capture selected role
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  
  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    password: ""
  });
  console.log(userInput);

  const [selectedServices, setSelectedServices] = useState([]); 

  const serviceOptions = ["Grooming", "Veterinary", "Training"];
  

  // Role selection handler
  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    console.log(`Role Selected: ${selectedRole}`);
  };

  const toggleServiceSelection = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service) // Remove if already selected
        : [...prev, service] // Add if not selected
    );
  };


  const register = async (e) => {
    e.preventDefault();
    if (userInput.username && userInput.password && userInput.email && role) {
      if (role === "provider" && selectedServices.length === 0) {
        alert("Please select at least one service!");
        return;
      }

      try {
        setIsLoading(true);

        const requestBody = {
          ...userInput,
          role,
          services: role === "provider" ? selectedServices : [],
        };

        const result = await registerAPI(requestBody);
        if (result && result.status === 200) {
          alert(`Welcome ${result.data?.username}, Please log in to explore our Projects`);
          setIsSignUp(false); // Switch to Log-In
          setRole(null); // Reset role
          setSelectedServices([]); // Reset services
          setUserInput({ username: "", email: "", password: "" }); // Reset fields
        } else {
          alert(result?.response?.data || "Registration failed.");
        }
      } catch (err) {
        alert("An error occurred during registration. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("Please fill out all fields, including selecting a role!");
    }
  };



  // Log-In API Call
  const login = async (e) => {
    e.preventDefault();
    if (userInput.password && userInput.email && role) { // Ensure role is selected
      try {
        setIsLogin(true);
        const result = await loginAPI({ ...userInput, role }); // Pass role directly
        if (result && result.status === 200) {
          sessionStorage.setItem("user", JSON.stringify(result.data.user));
          sessionStorage.setItem("token", result.data.token);
        
          
  
          // Navigate based on role
          if (result.data.user.role === "owner") {
            navigate("/dashboard/owner");
          } else if (result.data.user.role === "provider") {
            navigate("/dashboard/provider");
          } else {
            alert("Unknown role. Unable to navigate.");
          }
        }
      } catch (err) {
        alert("Login failed. Check your credentials and selected role.");
      } finally {
        setIsLogin(false);
      }
    } else {
      alert("Please fill all fields, including selecting a role.");
    }
  };
  

  return (
    <div className="flex h-screen items-center justify-center bg-gray-200">
      <div className="flex flex-col md:flex-row w-11/12 max-w-4xl shadow-2xl">
        {/* Left Section - Form */}
        <div className="w-full md:w-1/2 bg-white p-6 md:p-10">
          <div className="mb-6 flex justify-center md:justify-start">
            <PawPrint size={20} />
            <h1 className="text-3xl font-bold text-indigo-600">
              Pet<span className="text-indigo-800">Club</span>
            </h1>
          </div>

          <h2 className="mb-6 text-2xl font-semibold text-gray-700 text-center md:text-left">
            {isSignUp ? "Sign Up" : "Log In"}
          </h2>

          {/* Role Selection */}
          {isSignUp && !role && (
            <div className="space-y-4 mb-6">
              <p className="text-lg text-gray-600 text-center">Select your role:</p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => handleRoleSelect("owner")}
                  className="w-1/2 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-800 hover:shadow-xl transition-transform"
                >
                  Owner
                </button>
                <button
                  onClick={() => handleRoleSelect("provider")}
                  className="w-1/2 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-800 hover:shadow-xl transition-transform"
                >
                  Provider
                </button>
              </div>
            </div>
          )}

          {/* Sign-Up Form */}
          {isSignUp && role && (
            <form className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Username</label>
                <input
                  onChange={(e) => setUserInput({ ...userInput, username: e.target.value })}
                  value={userInput.username}
                  type="text"
                  placeholder="Username"
                  className="w-full rounded-lg border border-gray-300 p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Email</label>
                <input
                  onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
                  value={userInput.email}
                  type="email"
                  placeholder="Your Email"
                  className="w-full rounded-lg border border-gray-300 p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Password</label>
                <input
                  onChange={(e) => setUserInput({ ...userInput, password: e.target.value })}
                  value={userInput.password}
                  type="password"
                  placeholder="Your Password"
                  className="w-full rounded-lg border border-gray-300 p-2"
                />
              </div>
               {/* Services for Providers */}
               {role === "provider" && (
                <div>
                  <p className="text-lg font-medium text-gray-700 mb-2">Select Services:</p>
                  <div className="flex flex-wrap gap-2">
                    {serviceOptions.map((service) => (
                      <button
                        type="button"
                        key={service}
                        onClick={() => toggleServiceSelection(service)}
                        className={`px-3 py-1 rounded-lg border ${
                          selectedServices.includes(service)
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={register}
                className={`w-full rounded-lg shadow-md bg-indigo-600 py-2 text-white transition-transform ${
                  isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-800 hover:-translate-y-1"
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Signing Up..." : "Sign Up"}
              </button>
            </form>
          )}

          {/* Log-In Form */}
          {!isSignUp && (
  <form className="mt-4 space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-600">Email</label>
      <input
        onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
        value={userInput.email}
        type="email"
        placeholder="Your Email"
        className="w-full rounded-lg border border-gray-300 p-2"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-600">Password</label>
      <input
        onChange={(e) => setUserInput({ ...userInput, password: e.target.value })}
        value={userInput.password}
        type="password"
        placeholder="Your Password"
        className="w-full rounded-lg border border-gray-300 p-2"
      />
    </div>
    <div>
      <p className="block text-sm font-medium text-gray-600 mb-2">Select your role:</p>
      <div className="flex justify-center space-x-4">
        <button
          type="button"
          onClick={() => handleRoleSelect("owner")}
          className={`w-1/2 py-2 rounded-lg shadow-md ${
            role === "owner" ? "bg-indigo-800 text-white" : "bg-gray-200"
          }`}
        >
          Owner
        </button>
        <button
          type="button"
          onClick={() => handleRoleSelect("provider")}
          className={`w-1/2 py-2 rounded-lg shadow-md ${
            role === "provider" ? "bg-indigo-800 text-white" : "bg-gray-200"
          }`}
        >
          Provider
        </button>
      </div>
    </div>
    <button
      onClick={login}
      className={`w-full rounded-lg shadow-md bg-indigo-600 py-2 text-white transition-transform ${
        isLogin ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-800 hover:-translate-y-1"
      }`}
      disabled={isLogin}
    >
      {isLogin ? "Logging In..." : "Log In"}
    </button>
  </form>
)}


          <p className="mt-4 text-center text-sm text-gray-500">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <span
              onClick={() => {
                setIsSignUp(!isSignUp);
                setRole(null); // Reset role on form switch
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
            <div className="flex space-x-5">
              <img
                className="h-28 w-28 rounded-full object-cover"
                src="https://img.freepik.com/premium-photo/photo-shocked-cute-dog-face-solid-color-background-ai-generative_407474-14450.jpg"
                alt="Dog"
              />
              <img
                className="h-28 w-28 rounded-full object-cover"
                src="https://img.freepik.com/premium-photo/ginger-cat-looking-up-with-wide-green-eyes-cat-has-long-white-whiskers-pink-nose-background-is-solid-light-orange-color_14117-219029.jpg"
                alt="Cat"
              />
              <img
                className="h-28 w-28 rounded-full object-cover"
                src="https://www.shutterstock.com/image-photo/funny-hungry-australian-shepherd-puppy-600nw-2475379251.jpg"
                alt="Puppy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
