import { AuthCard } from "@/components/auth-card";
import { RegisterForm } from "@/components/forms/register-form";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register',
  description: 'Create a new account.',
};

export default function RegisterPage() {
    return (
        <AuthCard
            title="Create an Account"
            description="Fill in your details to get started."
            footerText="Already have an account?"
            footerLinkText="Login"
            footerHref="/login"
        >
            <RegisterForm />
        </AuthCard>
    );
}
