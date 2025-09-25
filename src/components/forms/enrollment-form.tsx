
'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFirestore } from '@/firebase';
import { collection, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

import { EnrollmentSchema } from '@/lib/schemas';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, User, Phone, Home, Hash, CheckCircle } from 'lucide-react';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';

export function EnrollmentForm({ userId }: { userId: string }) {
  const router = useRouter();
  const firestore = useFirestore();
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof EnrollmentSchema>>({
    resolver: zodResolver(EnrollmentSchema),
    defaultValues: {
      name: '',
      surname: '',
      phone: '',
      address: '',
      kitSerialNumber: '',
    },
  });

  const onSubmit = (values: z.infer<typeof EnrollmentSchema>) => {
    setSuccess(null);
    startTransition(() => {
        if (!firestore) return;

        const enrollmentsRef = collection(firestore, 'nb1-users');
        
        addDocumentNonBlocking(enrollmentsRef, {
            ...values,
            userId: userId,
            enrolledAt: serverTimestamp(),
        }).then(() => {
            setSuccess('You have been successfully enrolled! Redirecting...');
            form.reset();
            setTimeout(() => {
                router.push('/next-steps');
            }, 2000);
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
        <CardTitle className="text-3xl font-bold text-primary font-headline">Enroll in Campaign</CardTitle>
        <CardDescription>Please fill out the form below to complete your enrollment.</CardDescription>
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
              Save Enrollment
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
