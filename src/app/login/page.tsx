'use client'
import { useForm } from 'react-hook-form';
import { TextField, Button, Typography, CircularProgress, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useApi } from '@/hooks/useApi';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { validateEmail } from '@/utils/validators';

interface LoginForm {
    email: string;
    password: string;
}

export default function LoginPage() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
    const { request, loading, error } = useApi();
    const { setToken } = useAuth();

    const onSubmit = async (data: LoginForm) => {
        try {
            const response = await request<{ token: string }>('post', '/v1/identity/login', data);
            setToken(response.token);
            router.push('/profile');
        } catch (err) { }
    };

    return (
      <Box sx={{ maxWidth: 400, mx: "auto", mt: 4,}}>
        <Typography variant="h4">Login</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          {error && <Typography color={"error"}>{error}</Typography>}
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </form>
        <Link href="/register">
          <Typography sx={{ mt: 2 }}>No account? Register</Typography>
        </Link>
        <Link href="/send-code">
          <Typography sx={{ mt: 1 }}>Forgot password?</Typography>
        </Link>
      </Box>
    );
}