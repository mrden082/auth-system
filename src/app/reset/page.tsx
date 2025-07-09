"use client";
import { useForm } from "react-hook-form";
import { TextField, Button, Typography, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/useApi";
import Link from "next/link";
import { validateEmail, validatePassword } from "@/utils/validators";

interface ResetForm {
  email: string;
  password: string;
  code: string;
}

export default function ResetPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetForm>();
  const { request, loading, error } = useApi();
  const router = useRouter();

  const onSubmit = async (data: ResetForm) => {
    try {
      await request("post", "/v1/identity/reset", {
        email: data.email,
        password: data.password,
        code: data.code,
      });
      router.push("/login");
    } catch (err) {
      console.error("Reset password error:", err);
    }
  };

  return (
    <div className="auth-container">
      <Typography variant="h4" className="auth-title">
        Reset Password
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
          label="New Password"
          type="password"
          fullWidth
          margin="normal"
          {...register("password", {
            required: "Password is required",
            validate: validatePassword,
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          label="Reset Code"
          fullWidth
          margin="normal"
          {...register("code", { required: "Reset code is required" })}
          error={!!errors.code}
          helperText={errors.code?.message}
        />
        {error && (
          <Typography className="auth-error">
            {error.includes("400")
              ? "Invalid data. Check email, password, or code."
              : error.includes("500")
              ? "Server error, please try again later."
              : error}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={loading}
          className="auth-button"
        >
          {loading ? <CircularProgress size={24} /> : "Reset Password"}
        </Button>
      </form>
      <Link href="/login" className="auth-link">
        <Typography>Back to Login</Typography>
      </Link>
    </div>
  );
}