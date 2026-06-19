import { Server, Mail, Lock, Eye, EyeOff } from "lucide-react";
import {} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toast } from "@/utils/custom_toast";
import logo from "@/assets/images/logo.png";
import { signin } from "@/services/auth";
import { useAuthContext } from "@/context/AuthContext";
import RequestLoading from "@/loading/RequestLoading";
import LocalStorageSaver from "@/utils/local_storage";
import { TOKEN_KEY } from "@/utils/utils";

const formSchema = z.object({
  identifier: z.string().min(1, "Email or phone is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const { setAuth, refetchUserData } = useAuthContext();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: FormValues) {
    try {
      setLoading(true);
      LocalStorageSaver.removeData("socketToken");
      const res = await signin(values);
      if (res?.token) {
        const value: string = res.socketToken;
        LocalStorageSaver.setData(TOKEN_KEY, res);
        LocalStorageSaver.setData("socketToken", value, true);
      }
      if (res?.userData) {
        setAuth({ userData: res.userData, status: res.status });
        Toast({
          title: "Login Successful",
          description: "Welcome back to the student portal.",
          type: "success",
        });
        refetchUserData();
        navigate("/", { replace: true });
      }
    } catch (err: any) {
      Toast({
        title: "Login Failed",
        description: err.message || "Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-neutral-950 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white dark:bg-neutral-900 shadow-2xl border border-gray-200 dark:border-neutral-800 p-8">
        {/* LOGO */}
        <div className="flex justify-center mb-4">
          <img
            src={logo}
            alt="logo"
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          Student Portal
        </h1>

        <p className="text-sm text-center text-gray-500 dark:text-neutral-400 mt-2 mb-6">
          Sign in to continue
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* IDENTIFIER */}
          <div>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

              <input
                type="text"
                placeholder="Enter your student ID"
                {...register("identifier")}
                className="w-full rounded-full border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 py-3 pl-12 pr-4 text-sm text-gray-900 dark:text-white outline-none transition focus:border-black dark:focus:border-white"
              />
            </div>

            {errors.identifier && (
              <p className="mt-2 ml-2 text-sm text-red-500">
                {errors.identifier.message}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password")}
                className="w-full rounded-full border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 py-3 pl-12 pr-12 text-sm text-gray-900 dark:text-white outline-none transition focus:border-black dark:focus:border-white"
              />

              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="mt-2 ml-2 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="block w-3/4 mx-auto rounded-full bg-neutral-900 dark:bg-white text-white dark:text-black py-3 font-semibold transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
      {loading && <RequestLoading />}
      <button
        onClick={() => navigate("/ip")}
        className="fixed bottom-5 right-5 w-12 h-12 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-black shadow-lg flex items-center justify-center hover:scale-105 transition"
      >
        <Server size={20} />
      </button>
    </div>
  );
}
