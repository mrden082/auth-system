"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { TextField, Button, Typography, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { loginUser } from "@/api/auth";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { validateEmail } from "@/utils/validators";
import { LoginForm } from "@/contexts/types";

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const { setToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [redirect, setRedirect] = useState(false);

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginUser({
        email: data.email.trim(),
        password: data.password,
      });
      localStorage.setItem("access_token", response.token);
      setToken(response.token);
      setRedirect(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (redirect) {
      router.refresh();
      router.push("/profile");
    }
  }, [redirect, router]);

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
        {error && <Typography className="auth-error">{error}</Typography>}
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