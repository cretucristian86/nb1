'use server';

import { z } from 'zod';
import { EnrollmentSchema } from '@/lib/schemas';
import { getFirestore } from 'firebase-admin/firestore';
import {getApp, getApps, initializeApp} from 'firebase-admin/app';
import { revalidatePath } from 'next/cache';

// Ensure Firebase Admin is initialized
if (!getApps().length) {
    initializeApp();
}

const db = getFirestore();

export async function enrollUserAction(values: z.infer<typeof EnrollmentSchema>, userId: string) {
    if (!userId) {
        return { error: 'Authentication error. Please log in again.' };
    }
    
    const validatedFields = EnrollmentSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: 'Invalid data provided.' };
    }

    try {
        const enrollmentId = db.collection('users').doc(userId).collection('enrollments').doc().id;
        
        await db.collection('users').doc(userId).collection('enrollments').doc(enrollmentId).set({
            ...validatedFields.data,
            userId: userId,
            id: enrollmentId,
            enrolledAt: new Date(),
        });
        
        revalidatePath('/enroll');
        return { success: 'You have been successfully enrolled!' };
    } catch (error) {
        console.error("Enrollment error:", error);
        return { error: 'Failed to save enrollment data.' };
    }
}
