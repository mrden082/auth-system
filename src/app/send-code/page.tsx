"use client";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
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
        email: data.email,
      });
      router.push("/reset");
    } catch (err) {
      console.error("Send code error:", err);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Send Reset Code
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
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
          <Typography color="error" align="center" sx={{ mt: 2 }}>
            {error.includes("Unexpected end of JSON input")
              ? "Invalid server response."
              : error.includes("404")
              ? "Endpoint not found."
              : error.includes("500")
              ? "Server error, please try again later."
              : error}
          </Typography>
        )}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ width: "200px", height: "48px" }}
          >
            {loading ? <CircularProgress size={24} /> : "Send Code"}
          </Button>
        </Box>
      </form>
      <Link href="/login">
        <Typography align="center" sx={{ mt: 2 }}>
          Back to Login
        </Typography>
      </Link>
    </Box>
  );
}
