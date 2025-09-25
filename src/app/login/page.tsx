import { AuthCard } from "@/components/auth-card";
import { LoginForm } from "@/components/forms/login-form";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account.',
};

export default function LoginPage() {
    return (
        <AuthCard
            title="Welcome Back!"
            description="Enter your credentials to access your account."
            footerText="Don't have an account?"
            footerLinkText="Register"
            footerHref="/register"
        >
            <LoginForm />
        </AuthCard>
    );
}
