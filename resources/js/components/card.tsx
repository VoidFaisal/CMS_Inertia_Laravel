import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { PlaceholderPattern } from './ui/placeholder-pattern';

export default function CardWithForm(props: any) {
    return (
        <Link href={props.link} >
            <Card className="relative z-10 flex h-full items-center justify-center cursor-pointer">
                <CardHeader className="text-center font-bold text-4xl group-hover:animate-pulse">
                    <CardTitle>{props.heading}</CardTitle>
                </CardHeader>
            </Card>
        </Link>
    );
}
