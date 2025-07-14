"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { TextField, Button, Typography, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { registerUser } from "@/api/auth";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { validateEmail, validatePassword } from "@/utils/validators";
import { RegisterForm } from "@/contexts/types";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<RegisterForm>();
  const { setToken } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true);
    setError(null);
    try {
      const response = await registerUser({
        email: data.email.trim(),
        name: data.name,
        surname: data.surname,
        password: data.password,
      });
      if (response && "token" in response) {
        setToken(response.token);
        router.push("/profile");
      } else {
        throw new Error("No token received from server");
      }
    } catch (err: any) {
      setError(err.message || "Invalid request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <Typography variant="h4" className="auth-title">
        Register
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
          label="Name"
          fullWidth
          margin="normal"
          {...register("name", { required: "Name is required" })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label="Surname"
          fullWidth
          margin="normal"
          {...register("surname", { required: "Surname is required" })}
          error={!!errors.surname}
          helperText={errors.surname?.message}
        />
        <TextField
          label="Password"
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
          {loading ? <CircularProgress size={24} /> : "Register"}
        </Button>
      </form>
      <Link href="/login" className="auth-link">
        <Typography>Already have an account? Login</Typography>
      </Link>
    </div>
  );
}