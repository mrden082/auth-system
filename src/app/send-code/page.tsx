"use client";
import { useForm } from "react-hook-form";
import { TextField, Button, Typography, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/useApi";
import Link from "next/link";
import { validateEmail } from "@/utils/validators";

interface SendCodeForm {
  email: string;
}

export default function SendCodePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SendCodeForm>();
  const { request, loading, error } = useApi();
  const router = useRouter();

  const onSubmit = async (data: SendCodeForm) => {
    try {
      await request("post", "/v1/identity/reset/send-code", {
        email: data.email.trim(),
      });
      router.push("/reset");
    } catch (err) {
      console.error("Send code error:", err);
    }
  };

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
        {error && (
          <Typography className="auth-error">
            {error.includes("Unexpected end of JSON input")
              ? "Server response invalid. Please try again."
              : error.includes("404")
              ? "Endpoint not found."
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
          {loading ? <CircularProgress size={24} /> : "Send Code"}
        </Button>
      </form>
      <Link href="/login" className="auth-link">
        <Typography>Back to Login</Typography>
      </Link>
    </div>
  );
}