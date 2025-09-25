
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const steps = [
    {
        id: "step-1",
        title: "Step 1: Unbox Your Kit",
        description: "Carefully open your newly arrived kit. Inside, you'll find everything you need to get started on your journey.",
    },
    {
        id: "step-2",
        title: "Step 2: Follow Instructions",
        description: "Read the included instruction manual thoroughly. It contains important information about setup and usage.",
    },
    {
        id: "step-3",
        title: "Step 3: Activate Your Device",
        description: "Follow the on-screen prompts or the manual to activate your device. This will connect it to our network.",
    },
    {
        id: "step-4",
        title: "Step 4: Perform Initial Test",
        description: "Once activated, perform the initial test as described. This ensures your device is working correctly.",
    },
    {
        id: "step-5",
        title: "Step 5: You're All Set!",
        description: "Congratulations! You have successfully completed the setup process. Welcome to the campaign!",
    },
];

export function NextSteps() {
    return (
        <div className="space-y-8">
            {steps.map((step, index) => {
                const placeholder = PlaceHolderImages.find(p => p.id === step.id);
                return (
                    <Card key={step.id} className="overflow-hidden shadow-lg">
                        <div className="grid md:grid-cols-2">
                             <div className={`relative h-64 md:h-auto ${index % 2 === 1 ? 'md:order-last' : ''}`}>
                                {placeholder && (
                                    <Image
                                        src={placeholder.imageUrl}
                                        alt={placeholder.description}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        data-ai-hint={placeholder.imageHint}
                                    />
                                )}
                            </div>
                            <div className="p-6">
                                <CardHeader>
                                    <CardTitle className="font-headline">{step.title}</CardTitle>
                                    <CardDescription>{step.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">
                                        Here you can add more detailed information, links, or instructions for this particular step.
                                    </p>
                                </CardContent>
                            </div>
                        </div>
                    </Card>
                );
            })}
        </div>
    );
}
