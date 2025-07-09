"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CircularProgress, Typography } from "@mui/material";
import "../../styles/global.css"; // Добавлен импорт для единообразия

export default function MainPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, [router]);

  return (
    <div className="main center">
      <div className="description">
        <Typography variant="h6">Redirecting to Login...</Typography>
        <CircularProgress />
      </div>
    </div>
  );
}