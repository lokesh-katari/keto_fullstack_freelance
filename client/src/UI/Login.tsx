import { useState } from "react";
import { RiEyeCloseFill } from "react-icons/ri";
import { FaRegEye } from "react-icons/fa";
// import Cookies from 'js-cookie';
import logbg from "../assets/logbg.jpg";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/Context/userContext";

const Login = () => {
  const { setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"ADMIN" | "TEACHER" | "STUDENT" | "PARENT">(
    "STUDENT"
  ); // Default role
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handlePasswordToggle = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensures cookies are included in requests
        body: JSON.stringify({ email, password, reqRole: role }),
      });

      const data = await response.json();
      setUser({
        email: data.user.email,
        name: data.user.name,
        role: data.user.role,
      });
      if (response.ok) {
        if (response.ok) {
          const dashboardRoutes = {
            ADMIN: "/admin/dashboard",
            TEACHER: "/teacher/dashboard",
            STUDENT: "/student/dashboard",
            PARENT: "/parent/dashboard",
          };

          navigate(
            dashboardRoutes[role as "ADMIN" | "TEACHER" | "STUDENT" | "PARENT"]
          );
        }
      } else {
        alert(data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <div className="h-[100vh] grid grid-cols-1 lg:grid-cols-2 overflow-y-hidden">
        <div className="relative flex items-end px-4 pb-10 pt-60 sm:px-6 sm:pb-16 md:justify-center lg:px-8 lg:pb-24 hidden sm:block md:block lg:block">
          <div className="absolute inset-0">
            <img
              className="h-[100vh] w-full rounded-br-full rounded-tr-full object-cover"
              src={logbg}
              alt=""
            />
          </div>
        </div>
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h3
              className="text-2xl sm:text-4xl font-bold border bg-gray-100 pb-1 pt-2 px-4 rounded-md w-[30%]"
              style={{ fontFamily: "Grandstander" }}
            >
              <span className="text-cyan-700">K</span>eto
              <span className="text-cyan-700">.</span>
            </h3>
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Login
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Don&#x27;t have an account?{" "}
              <a
                href="#"
                title=""
                className="font-semibold text-black transition-all duration-200 hover:underline"
              >
                Contact Your Administrator
              </a>
            </p>
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="space-y-5">
                <div>
                  <label className="text-base font-medium text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-400 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                      type="email"
                      placeholder="Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-base font-medium text-gray-900">
                      Password
                    </label>
                    <a
                      href="#"
                      title=""
                      className="text-sm font-semibold text-black hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center border border-gray-400 rounded-md">
                      <input
                        className="h-10 w-full rounded-l-md bg-transparent px-3 py-2 text-sm placeholder:text-gray-400"
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <div
                        onClick={handlePasswordToggle}
                        className="flex items-center px-3 cursor-pointer"
                      >
                        {isPasswordVisible ? <FaRegEye /> : <RiEyeCloseFill />}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-base font-medium text-gray-900">
                    Role
                  </label>
                  <div className="mt-2">
                    <select
                      className="flex h-10 w-full rounded-md border border-gray-400 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
                      value={role}
                      onChange={(e) =>
                        setRole(
                          e.target.value as
                            | "ADMIN"
                            | "TEACHER"
                            | "STUDENT"
                            | "PARENT"
                        )
                      }
                      required
                    >
                      <option value="STUDENT">Student</option>
                      <option value="TEACHER">Teacher</option>
                      <option value="ADMIN">Admin</option>
                      <option value="PARENT">Parent</option>
                    </select>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-full bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-100"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="url(#gradient)"
                          strokeWidth="4"
                        ></circle>
                      </svg>
                    ) : (
                      <>Login</>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
