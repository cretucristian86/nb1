import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';

type AuthCardProps = {
    title: string;
    description: string;
    children: React.ReactNode;
    footerText: string;
    footerLinkText: string;
    footerHref: string;
};

export function AuthCard({
    title,
    description,
    children,
    footerText,
    footerLinkText,
    footerHref,
}: AuthCardProps) {
    return (
        <main className="flex min-h-screen items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-2xl bg-card border-2">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold text-primary font-headline">{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent>
                    {children}
                    <div className="mt-4 text-center text-sm">
                        {footerText}{" "}
                        <Link href={footerHref} className="underline text-primary hover:text-primary/80 font-semibold">
                            {footerLinkText}
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}
