"use client";
import { useForm } from "react-hook-form";
import { TextField, Button, Typography, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/useApi";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { validateEmail } from "@/utils/validators";

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const { request, loading, error } = useApi();
  const { setToken } = useAuth();

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await request<{ token: string }>(
        "post",
        "/v1/identity/login",
        {
          email: data.email.trim(),
          password: data.password,
        }
      );
      if (response && "token" in response) {
        setToken(response.token);
        router.push("/profile");
      } else {
        throw new Error("No token received from server");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="auth-container">
      <Typography variant="h4" className="auth-title">
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          {...register("email", {
            required: "Email is required",
            validate: validateEmail,
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        {error && (
          <Typography className="auth-error">
            {error.includes("400")
              ? "Invalid email or password. Please check your credentials."
              : error}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          className="auth-button"
        >
          {loading ? <CircularProgress size={24} /> : "Login"}
        </Button>
      </form>
      <Link href="/register" className="auth-link">
        <Typography>No account? Register</Typography>
      </Link>
      <Link href="/send-code" className="auth-link">
        <Typography>Forgot password?</Typography>
      </Link>
    </div>
  );
}