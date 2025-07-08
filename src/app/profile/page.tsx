"use client";
import { useEffect, useState } from "react";
import { Typography, Button, CircularProgress, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/useApi";
import { useAuth } from "@/contexts/AuthContext";

interface User {
  email: string;
  name: string;
  surname: string;
  role: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { token, logout } = useAuth();
  const { request, loading, error } = useApi();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const data = await request<User>("get", "/v1/identity/profile");
        setUser(data);
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    };
    fetchUser();
  }, [token, router, request]);

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
        Profile
      </Typography>
      {loading && !user && <CircularProgress />}
      {error && (
        <Typography color="error" align="center" sx={{ mt: 2 }}>
          {error.includes("500")
            ? "Server error, please try again later."
            : error}
        </Typography>
      )}
      {user && (
        <>
          <Typography sx={{ mt: 2 }}>Name: {user.name}</Typography>
          <Typography sx={{ mt: 1 }}>Surname: {user.surname}</Typography>
          <Typography sx={{ mt: 1 }}>Email: {user.email}</Typography>
          <Typography sx={{ mt: 1 }}>Role: {user.role}</Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                logout();
                router.push("/login");
              }}
              sx={{ width: "200px", height: "48px" }}
            >
              Logout
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
