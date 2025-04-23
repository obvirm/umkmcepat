import { CreateLandingPageForm } from "@/components/forms/CreateLandingPageForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";

export default async function BuatPage() {
  const session = await auth();

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <Card className="w-full border border-border/60 shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl">✨ Buat Landing Page Baru</CardTitle>
          <CardDescription>
            Isi detail usahamu di bawah ini. AI akan membantu membuatkan konten
            yang menarik.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateLandingPageForm session={session} />
        </CardContent>
      </Card>
    </div>
  );
}
