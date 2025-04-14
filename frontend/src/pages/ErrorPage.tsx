import { useRouteError } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button'; // Import the Button component

export default function ErrorPage({
    title = 'Sorry, an unexpected error has occurred.',
    message = 'Unknown Error'
}) {
    const error = useRouteError() as { statusText?: string; message?: string };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-foreground">Oops!</h1>
                <p className="text-xl text-foreground">{title}</p>
                <p className="text-muted-foreground">
                    {error?.statusText || error?.message || message}
                </p>

                <Button variant="outline">
                    <Link to="/" className="font-bold py-2 px-4 rounded">
                        ← Back to Home
                    </Link>
                </Button>
            </div>
        </div>
    );
}
