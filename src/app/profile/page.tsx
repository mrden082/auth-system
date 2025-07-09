"use client";
import { useState, useEffect } from "react";
import { Typography, Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useApi } from "@/hooks/useApi";
import { useAuth } from "@/contexts/AuthContext";

interface ProfileData {
  name: string;
  surname: string;
  email: string;
  role: string;
}

export default function ProfilePage() {
  const { request, loading, error } = useApi();
  const { logout } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await request<ProfileData>("get", "/v1/identity/profile");
        setProfile(data);
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography className="auth-error">{error}</Typography>;
  if (!profile) return <Typography>No profile data</Typography>;

  return (
    <div className="auth-container">
      <Typography variant="h4" className="auth-title">
        Profile
      </Typography>
      <Typography>Name: {profile.name}</Typography>
      <Typography>Surname: {profile.surname}</Typography>
      <Typography>Email: {profile.email}</Typography>
      <Typography>Role: {profile.role}</Typography>
      <Button
        variant="contained"
        color="error"
        onClick={handleLogout}
        className="auth-button"
      >
        Logout
      </Button>
    </div>
  );
}