import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-stone-50 p-4">
      <Card className="w-full max-w-md mx-auto border-accent/20 shadow-xl">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2 text-destructive">
            <AlertCircle className="h-8 w-8" />
            <h1 className="text-2xl font-bold font-serif">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            The destiny you are looking for is written on another page. 
            Please return to the start to find your path.
          </p>

          <div className="mt-8">
            <Link href="/" className="w-full block">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Return Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
