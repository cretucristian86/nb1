'use server';

import { z } from 'zod';
import { EnrollmentSchema } from '@/lib/schemas';
import { db } from '@/lib/firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

export async function enrollUserAction(values: z.infer<typeof EnrollmentSchema>, userId: string) {
    if (!userId) {
        return { error: 'Authentication error. Please log in again.' };
    }
    
    const validatedFields = EnrollmentSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: 'Invalid data provided.' };
    }

    try {
        await setDoc(doc(db, 'enrollments', userId), {
            ...validatedFields.data,
            enrolledAt: new Date(),
        });
        revalidatePath('/enroll');
        return { success: 'You have been successfully enrolled!' };
    } catch (error) {
        return { error: 'Failed to save enrollment data.' };
    }
}
