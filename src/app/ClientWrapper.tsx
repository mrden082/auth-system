"use client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "@/contexts/AuthContext";
import theme from "@/utils/theme";
import { Box } from "@mui/material";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CssBaseline />
        <Box
          sx={{
            background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
          }}
        >
          <Box
            sx={{
              backgroundColor: "#fff",
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              padding: 3,
              maxWidth: 400,
              width: "100%",
            }}
          >
            {children}
          </Box>
        </Box>
      </AuthProvider>
    </ThemeProvider>
  );
}
