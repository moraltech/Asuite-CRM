import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Asuite CRM</h1>
        <Card>
          <CardHeader>
            <CardTitle>Welcome to Asuite CRM</CardTitle>
            <CardDescription>Your trucking management solution</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Badge variant="success">Active</Badge>
              <Badge variant="info">New</Badge>
            </div>
            <Input placeholder="Search..." />
            <div className="flex gap-2">
              <Button>Get Started</Button>
              <Button variant="outline">Learn More</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
