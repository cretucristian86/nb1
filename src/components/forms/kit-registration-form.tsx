
'use client';

import { useState, useTransition, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFirestore } from '@/firebase';
import { doc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

import { KitRegistrationSchema } from '@/lib/schemas';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, User, Phone, Home, Hash, CheckCircle } from 'lucide-react';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import type { KitRegistration } from '@/lib/schemas';

type KitRegistrationFormProps = {
    userId: string;
    isEditMode?: boolean;
    initialData?: KitRegistration;
    onSuccess?: () => void;
};

export function KitRegistrationForm({ userId, isEditMode = false, initialData, onSuccess }: KitRegistrationFormProps) {
  const router = useRouter();
  const firestore = useFirestore();
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof KitRegistrationSchema>>({
    resolver: zodResolver(KitRegistrationSchema),
    defaultValues: initialData || {
      name: '',
      surname: '',
      phone: '',
      address: '',
      kitSerialNumber: '',
    },
  });
  
  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  const onSubmit = (values: z.infer<typeof KitRegistrationSchema>) => {
    setSuccess(null);
    startTransition(() => {
        if (!firestore) return;

        const enrollmentDocRef = doc(firestore, 'nb1-users', userId);
        
        const dataToSave = isEditMode 
            ? { ...values, updatedAt: serverTimestamp() }
            : { ...values, userId: userId, enrolledAt: serverTimestamp() };

        setDocumentNonBlocking(enrollmentDocRef, dataToSave, { merge: true }).then(() => {
            const successMessage = isEditMode ? 'Your details have been successfully updated!' : 'You have been successfully registered! Redirecting...';
            setSuccess(successMessage);
            form.reset();
            
            if (onSuccess) {
                setTimeout(onSuccess, 1500);
            }

            if (!isEditMode) {
                setTimeout(() => {
                    router.push('/next-steps');
                }, 2000);
            }
        });
    });
  };

  const InputWithIcon = ({ icon, ...props }: { icon: React.ReactNode } & React.ComponentProps<typeof Input>) => (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        {icon}
      </div>
      <Input className="pl-10" {...props} />
    </div>
  );

  return (
    <Card className="w-full max-w-2xl mx-auto my-12 shadow-2xl bg-card border-2">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-primary font-headline">
            {isEditMode ? 'Edit Kit Registration' : 'Kit Registration'}
        </CardTitle>
        <CardDescription>
            {isEditMode ? 'Update your details below.' : 'Please fill out the form below to complete your kit registration.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <InputWithIcon icon={<User className="h-4 w-4 text-muted-foreground"/>} {...field} placeholder="John" disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="surname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Surname</FormLabel>
                    <FormControl>
                      <InputWithIcon icon={<User className="h-4 w-4 text-muted-foreground"/>} {...field} placeholder="Doe" disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <InputWithIcon icon={<Phone className="h-4 w-4 text-muted-foreground"/>} {...field} placeholder="+1 (555) 555-5555" disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <InputWithIcon icon={<Home className="h-4 w-4 text-muted-foreground"/>} {...field} placeholder="123 Main St, Anytown, USA" disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="kitSerialNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kit Serial Number</FormLabel>
                  <FormControl>
                    <InputWithIcon icon={<Hash className="h-4 w-4 text-muted-foreground"/>} {...field} placeholder="KSN-12345678" disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {success && (
                <Alert variant="success">
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle>Success!</AlertTitle>
                    <AlertDescription>{success}</AlertDescription>
                </Alert>
            )}

            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditMode ? 'Update Registration' : 'Save Registration'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
