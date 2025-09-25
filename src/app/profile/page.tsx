
'use client';

import { useUser, useFirestore, useCollection } from '@/firebase';
import { collection } from 'firebase/firestore';
import { Header } from '@/components/header';
import { NextSteps } from '@/components/next-steps';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { User, Phone, Home, Hash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function ProfileSkeleton() {
    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <Skeleton className="h-8 w-1/3" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <Skeleton className="h-6 w-6 rounded-full" />
                        <Skeleton className="h-6 w-1/2" />
                    </div>
                    <div className="flex items-center space-x-4">
                        <Skeleton className="h-6 w-6 rounded-full" />
                        <Skeleton className="h-6 w-2/3" />
                    </div>
                    <div className="flex items-center space-x-4">
                        <Skeleton className="h-6 w-6 rounded-full" />
                        <Skeleton className="h-6 w-3/4" />
                    </div>
                    <div className="flex items-center space-x-4">
                        <Skeleton className="h-6 w-6 rounded-full" />
                        <Skeleton className="h-6 w-1/2" />
                    </div>
                </CardContent>
            </Card>
            <Skeleton className="h-96 w-full" />
        </div>
    )
}


export default function ProfilePage() {
    const { user, isUserLoading } = useUser();
    const firestore = useFirestore();
    const router = useRouter();

    useEffect(() => {
        if (!isUserLoading && !user) {
            router.push('/login');
        }
    }, [isUserLoading, user, router]);

    const enrollmentsQuery = user ? collection(firestore, 'users', user.uid, 'enrollments') : null;
    const { data: enrollments, isLoading: isEnrollmentsLoading } = useCollection(enrollmentsQuery as any);

    if (isUserLoading || !user) {
        return (
             <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow container mx-auto px-4 py-8">
                   <ProfileSkeleton />
                </main>
            </div>
        )
    }

    const latestEnrollment = enrollments?.[0];

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 space-y-8">
                <h1 className="text-3xl font-bold text-primary font-headline">Your Profile</h1>
                
                {isEnrollmentsLoading && <ProfileSkeleton />}

                {!isEnrollmentsLoading && !latestEnrollment && (
                    <Alert>
                        <AlertTitle>No Enrollment Found</AlertTitle>
                        <AlertDescription>
                            You have not enrolled in the campaign yet. Please go to the enrollment page to get started.
                        </AlertDescription>
                    </Alert>
                )}

                {latestEnrollment && (
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="font-headline">Enrollment Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                            <div className="flex items-center gap-4">
                                <User className="h-5 w-5 text-muted-foreground" />
                                <span>{latestEnrollment.name} {latestEnrollment.surname}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <Phone className="h-5 w-5 text-muted-foreground" />
                                <span>{latestEnrollment.phone}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <Home className="h-5 w-5 text-muted-foreground" />
                                <span>{latestEnrollment.address}</span>
                            </div>
                             <div className="flex items-center gap-4">
                                <Hash className="h-5 w-5 text-muted-foreground" />
                                <span>{latestEnrollment.kitSerialNumber}</span>
                            </div>
                        </CardContent>
                    </Card>
                )}
                
                <NextSteps />

            </main>
        </div>
    );
}
