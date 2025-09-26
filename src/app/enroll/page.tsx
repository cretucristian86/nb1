
'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where, limit } from 'firebase/firestore';

import { EnrollmentForm } from '@/components/forms/enrollment-form';
import { Header } from '@/components/header';
import { Skeleton } from '@/components/ui/skeleton';

function EnrollmentSkeleton() {
    return (
        <div className="flex flex-col min-h-screen">
            <Skeleton className="h-[61px] w-full" />
            <main className="flex-grow container mx-auto px-4 py-8">
                 <div className="w-full max-w-2xl mx-auto my-12 space-y-8">
                    <div className="space-y-2">
                       <Skeleton className="h-8 w-1/3" />
                       <Skeleton className="h-4 w-2/3" />
                    </div>
                    <div className="space-y-6 pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2"><Skeleton className="h-4 w-1/4" /><Skeleton className="h-10 w-full" /></div>
                            <div className="space-y-2"><Skeleton className="h-4 w-1/4" /><Skeleton className="h-10 w-full" /></div>
                        </div>
                         <div className="space-y-2"><Skeleton className="h-4 w-1/4" /><Skeleton className="h-10 w-full" /></div>
                         <div className="space-y-2"><Skeleton className="h-4 w-1/4" /><Skeleton className="h-10 w-full" /></div>
                         <div className="space-y-2"><Skeleton className="h-4 w-1/4" /><Skeleton className="h-10 w-full" /></div>
                         <Skeleton className="h-10 w-full !mt-10" />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default function EnrollPage() {
    const router = useRouter();
    const { user, isUserLoading } = useUser();
    const firestore = useFirestore();

    const enrollmentsQuery = useMemoFirebase(() => {
        if (!firestore || !user) return null;
        return query(
            collection(firestore, 'nb1-users'),
            where('userId', '==', user.uid),
            limit(1)
        );
    }, [firestore, user]);

    const { data: enrollments, isLoading: isEnrollmentsLoading } = useCollection(enrollmentsQuery);

    useEffect(() => {
        if (!isUserLoading && !user) {
            router.push('/login');
        }
    }, [isUserLoading, user, router]);

    useEffect(() => {
        if (!isEnrollmentsLoading && enrollments && enrollments.length > 0) {
            router.push('/profile');
        }
    }, [isEnrollmentsLoading, enrollments, router]);

    if (isUserLoading || isEnrollmentsLoading) {
        return <EnrollmentSkeleton />;
    }

    if (user && enrollments && enrollments.length === 0) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow container mx-auto px-4 py-8">
                    <EnrollmentForm userId={user.uid} />
                </main>
            </div>
        );
    }
    
    // If user is logged in but enrollment check is happening or they are enrolled, show skeleton or redirect.
    // Otherwise if no user, this will be null and the effect will redirect to /login
    if (!user) {
        return null;
    }
    
    // Fallback skeleton while redirecting
    return <EnrollmentSkeleton />;
}
