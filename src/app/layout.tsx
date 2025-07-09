import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "@/contexts/AuthContext";
import theme from "@/utils/theme";
import { Box } from "@mui/material";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import "../../styles/global.css";

export const metadata = {
  title: "Auth System",
  description: "Authentication system built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <CssBaseline />
            <ErrorBoundary>
              <Box className="client-wrapper">
                <Box className="inner-wrapper">{children}</Box>
              </Box>
            </ErrorBoundary>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}