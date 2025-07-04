import {  useState } from "react";
import { 
  Eye, 
  EyeOff, 
  Mail, 
  User, 
  Lock, 
  ShoppingBag,
  Heart,
  Star,
  Filter,
  Search,
  Grid,
  List,
  ChevronDown,
  Plus,
  Minus,
  Share2,
  Truck,
  Shield,
  RefreshCw,
  ArrowLeft,
  ChevronRight
} from 'lucide-react';
// import { toast } from "react-toastify";

// const Login = () => {
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: ""
//   });

//   const handleInputChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const endpoint = isSignUp ? "register" : "login";
//     const data = isSignUp 
//       ? formData 
//       : { email: formData.email, password: formData.password };
//     const message = isSignUp ? "Your account has been created!" : "Welcome back!";

//     try {
//       const response = await axios.post(`${backendUrl}/api/user/${endpoint}`, data);
      
//       if (response.data.success) {
//         setToken(response.data.token);
//         localStorage.setItem("token", response.data.token);
//         toast.success(message);
//       }
//     } catch (error) {
//       const errorMessage = error.response?.data?.msg || "Something went wrong!";
//       toast.error(errorMessage);
//       console.error(error);
//     }
//   };

//   // Redirect if user is already logged in
//   useEffect(() => {
//     if (token) navigate("/");
//   }, [token, navigate]);

//   const currentState = isSignUp ? "Sign up" : "Login";

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
//     >
//       <div className="inline-flex items-center gap-2 mb-2 mt-10">
//         <p className="poppins-medium text-3xl">{currentState}</p>
//         <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
//       </div>

//       {isSignUp && (
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleInputChange}
//           className="w-full px-3 py-2 border border-gray-800"
//           placeholder="Name"
//           required
//         />
//       )}

//       <input
//         type="email"
//         name="email"
//         value={formData.email}
//         onChange={handleInputChange}
//         className="w-full px-3 py-2 border border-gray-800"
//         placeholder="Email"
//         required
//       />

//       <input
//         type="password"
//         name="password"
//         value={formData.password}
//         onChange={handleInputChange}
//         className="w-full px-3 py-2 border border-gray-800"
//         placeholder="Password"
//         required
//       />

//       <div className="w-full flex justify-between text-sm mt-[-8px]">
//         <p className="cursor-pointer">Forgot your password?</p>
//         <p
//           onClick={() => setIsSignUp(!isSignUp)}
//           className="cursor-pointer"
//         >
//           {isSignUp ? "Login Here" : "Create account"}
//         </p>
//       </div>

//       <button
//         type="submit"
//         className="bg-black text-white font-light px-8 py-2 mt-4"
//       >
//         {isSignUp ? "Sign Up" : "Sign In"}
//       </button>
//     </form>
//   );
// };

// Authentication Component
const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log('Form submitted:', formData);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-1 bg-secondary rounded-full"></div>
            <ShoppingBag className="w-8 h-8 text-primary" />
            <div className="w-12 h-1 bg-secondary rounded-full"></div>
          </div>
          <h1 className="text-4xl font-bold text-primary mb-2">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-neutral">
            {isSignUp 
              ? 'Join us and start shopping today' 
              : 'Sign in to continue shopping'
            }
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-base-100 rounded-2xl shadow-xl border border-base-300/50 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field (Sign Up Only) */}
            {isSignUp && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-primary flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-base-300 rounded-xl bg-base-100 
                           focus:border-primary focus:ring-2 focus:ring-primary/20 
                           transition-all duration-300 text-neutral"
                  placeholder="Enter your full name"
                  required={isSignUp}
                />
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-base-300 rounded-xl bg-base-100 
                         focus:border-primary focus:ring-2 focus:ring-primary/20 
                         transition-all duration-300 text-neutral"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pr-12 border border-base-300 rounded-xl bg-base-100 
                           focus:border-primary focus:ring-2 focus:ring-primary/20 
                           transition-all duration-300 text-neutral"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 
                           text-neutral hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Forgot Password Link (Login Only) */}
            {!isSignUp && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-secondary hover:text-primary transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn btn-primary btn-lg group border-0 shadow-lg hover:shadow-xl 
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-content/30 border-t-primary-content rounded-full animate-spin"></div>
                  Processing...
                </div>
              ) : (
                <>
                  {isSignUp ? 'Create Account' : 'Sign In'}
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {/* Toggle Auth Mode */}
            <div className="text-center pt-4 border-t border-base-300">
              <p className="text-neutral">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="ml-2 text-secondary hover:text-primary font-medium transition-colors"
                >
                  {isSignUp ? 'Sign In' : 'Create Account'}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;