
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const steps = [
    {
        id: "step-1",
        title: "Step 1: Unbox and Prepare Your Kit",
        description: "Inside your kit, you'll find a collection tube with a built-in scoop, a collection paper, and a prepaid return mailer. Unfold the collection paper and place it over the back of your toilet bowl, under the seat. This will catch your sample.",
    },
    {
        id: "step-2",
        title: "Step 2: Collect Your Sample",
        description: "After your bowel movement, use the scoop attached to the collection tube's cap to gather a small amount of stool. The goal is to fill the tube only to the indicated red line with the preservation liquid. Do not overfill the tube.",
    },
    {
        id: "step-3",
        title: "Step 3: Secure and Vigorously Mix",
        description: "Screw the cap on tightly to ensure it's fully sealed. Shake the tube as hard as you can for at least 30 seconds. This is crucial as it mixes your sample with the preservation fluid, which keeps it stable for analysis in the lab.",
    },
    {
        id: "step-4",
        title: "Step 4: Pack for Shipping in the Original Box",
        description: "Place the securely sealed collection tube into the provided biohazard bag. Then, place the sealed bag back inside the original kit box, which serves as your prepaid, pre-addressed return mailer.",
    },
    {
        id: "step-5",
        title: "Step 5: Mail Your Kit Within 24 Hours",
        description: "Drop the sealed kit box into any USPS mailbox or drop-off location as soon as possible, ideally within 24 hours of collection. Your results will be processed once we receive your sample. You're all set!",
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
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        style={{ objectFit: 'cover' }}
                                        data-ai-hint={placeholder.imageHint}
                                    />
                                )}
                            </div>
                            <div className="p-6 flex flex-col justify-center">
                                <CardHeader>
                                    <CardTitle className="font-headline">{step.title}</CardTitle>

                                    <CardDescription>{step.description}</CardDescription>
                                </CardHeader>
                            </div>
                        </div>
                    </Card>
                );
            })}
        </div>
    );
}
