"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { TextField, Button, Typography, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { sendResetCode } from "@/api/auth";
import Link from "next/link";
import { validateEmail } from "@/utils/validators";
import { SendCodeForm } from "@/contexts/types";

export default function SendCodePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SendCodeForm>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [redirect, setRedirect] = useState(false);

  const onSubmit = async (data: SendCodeForm) => {
    setLoading(true);
    setError(null);
    try {
      await sendResetCode(data.email.trim());
      setRedirect(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send reset code");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (redirect) {
      setTimeout(() => router.push("/reset"), 0);
    }
  }, [redirect, router]);

  return (
    <div className="auth-container">
      <Typography variant="h4" className="auth-title">
        Send Reset Code
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
        {error && <Typography className="auth-error">{error}</Typography>}
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={loading}
          className="auth-button"
        >
          {loading ? <CircularProgress size={24} /> : "Send Code"}
        </Button>
      </form>
      <Link href="/login" className="auth-link">
        <Typography>Back to Login</Typography>
      </Link>
    </div>
  );
}