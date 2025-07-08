import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegisterPage from "@/app/register/page";
import { AuthProvider } from "@/contexts/AuthContext";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("@/hooks/useApi", () => ({
  useApi: () => ({
    request: jest.fn().mockResolvedValue({ token: "mock-token" }),
    loading: false,
    error: null,
  }),
}));

describe("RegisterPage", () => {
  test("renders register form", async () => {
    render(
      <AuthProvider>
        <RegisterPage />
      </AuthProvider>
    );
    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /register/i })
      ).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    });
  });

  test("shows validation error for invalid email", async () => {
    render(
      <AuthProvider>
        <RegisterPage />
      </AuthProvider>
    );
    fireEvent.input(screen.getByLabelText(/email/i), {
      target: { value: "invalid" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /register/i }));
    await waitFor(() => {
      expect(screen.getByText(/email is invalid/i)).toBeInTheDocument();
    });
  });
});
