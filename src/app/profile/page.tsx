"use client";
import { useEffect, useState } from "react";
import { Typography, CircularProgress, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { fetchUser } from "@/api/auth";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfilePage() {
  const { token, setToken } = useAuth();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return router.push("/login");
    fetchUser()
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Не удалось загрузить данные пользователя");
        setLoading(false);
      });
  }, [token, router]);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("access_token");
    router.push("/login");
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography className="auth-error">{error}</Typography>;

  return (
    <div className="auth-container flex flex-col min-h-screen items-center justify-center p-4">
      <Typography variant="h4" className="auth-title text-center mb-8">
        Profile
      </Typography>
      <div className="w-full max-w-md">
        <Typography align="left" className="mb-2">
          Email: {user?.email || "N/A"}
        </Typography>
        <Typography align="left" className="mb-2">
          Имя: {user?.name || "N/A"}
        </Typography>
        <Typography align="left" className="mb-2">
          Фамилия: {user?.surname || "N/A"}
        </Typography>
        <Typography align="left" className="mb-4">
          Роль: {user?.role || "N/A"}
        </Typography>
        <Button
          variant="contained"
          color="error"
          onClick={handleLogout}
          className="auth-button w-full"
        >
          Выйти
        </Button>
      </div>
    </div>
  );
}