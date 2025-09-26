
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const steps = [
    {
        id: "step-1",
        title: "Step 1: Prepare for Collection",
        description: "Inside your kit, you'll find a collection tube and a collection paper. Unfold the collection paper and place it over the back of your toilet bowl, under the seat.",
    },
    {
        id: "step-2",
        title: "Step 2: Collect Your Sample",
        description: "After your bowel movement, use the scoop on the cap of the collection tube to scrape a small amount of stool. The goal is to fill the tube to the indicated red line. Do not overfill.",
    },
    {
        id: "step-3",
        title: "Step 3: Secure and Mix",
        description: "Screw the cap on tightly and shake the tube vigorously for at least 30 seconds. This mixes the sample with the preservation liquid inside, which is crucial for analysis.",
    },
    {
        id: "step-4",
        title: "Step 4: Pack for Shipping",
        description: "Place the sealed collection tube into the biohazard bag provided, and then place the bag inside the original kit box. The box is pre-labeled for return shipping.",
    },
    {
        id: "step-5",
        title: "Step 5: Mail Your Kit",
        description: "Drop the sealed kit box into any USPS mailbox or drop-off location. Your results will be processed once we receive your sample. You're all set!",
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
