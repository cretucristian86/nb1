
'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signOut } from 'firebase/auth';
import { useAuth, useUser } from '@/firebase';
import { Button } from '@/components/ui/button';
import { LogOut, User as UserIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AnimatedLogo from './animated-logo';

export function Header() {
    const router = useRouter();
    const auth = useAuth();
    const { user } = useUser();
    const { toast } = useToast();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push('/login');
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Logout Failed',
                description: 'An error occurred while logging out.',
            });
        }
    };

    return (
        <header className="bg-card shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link href={user ? "/profile" : "/"} className="text-xl font-bold text-primary font-headline">
                    <AnimatedLogo className="w-10 h-10" />
                </Link>
                <div className="flex items-center gap-4">
                    {user && (
                         <Link href="/profile" passHref>
                            <Button variant="ghost" size="sm">
                                <UserIcon className="mr-2 h-4 w-4" />
                                Profile
                            </Button>
                        </Link>
                    )}
                    <Button variant="ghost" size="sm" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Button>
                </div>
            </div>
        </header>
    );
}
