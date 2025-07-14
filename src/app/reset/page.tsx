"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { TextField, Button, Typography, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/api/auth";
import Link from "next/link";
import { validateEmail, validatePassword } from "@/utils/validators";
import { ResetForm } from "@/contexts/types";

interface FormData extends ResetForm {
  email: string;
}

export default function ResetPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormData>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);
    try {
      await resetPassword({
        email: data.email.trim(),
        code: data.code.trim(),
        password: data.password,
      });
      router.push("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
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
          label="Reset Code"
          fullWidth
          margin="normal"
          {...register("code", {
            required: "Reset code is required",
            pattern: { value: /^[0-9]{6}$/, message: "Code must be 6 digits" },
          })}
          error={!!errors.code}
          helperText={errors.code?.message}
        />
        <TextField
          label="New Password"
          type="password"
          fullWidth
          margin="normal"
          {...register("password", {
            required: "Password is required",
            validate: validatePassword,
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          margin="normal"
          {...register("confirmPassword", {
            required: "Confirm password is required",
            validate: (value) =>
              value === getValues("password") || "Passwords do not match",
          })}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />
        {error && <Typography className="auth-error">{error}</Typography>}
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