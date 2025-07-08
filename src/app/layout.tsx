import "./globals.css";
import ClientWrapper from "./ClientWrapper";

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
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
