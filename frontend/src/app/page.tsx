import Image from "next/image";
import { Separator } from "@/components/ui/separator"
import { Card } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="justify-center max-w-5xl mx-auto px-4 py-6">

      <div className="flex flex-col items-center gap-6 my-12">
        <Image
          src="/profile-picture.jpg"
          alt="Picture of Hugos Face"
          width={200}
          height={200}
          className="rounded-full border-4 border-border shadow-lg"
        />
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Hugo Marinho Lapa</h1>
          <p className="text-lg text-muted-foreground">Platform Engineer @ Go Reply</p>
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            📍 London, UK
          </p>
        </div>
      </div>


      <div className="flex items-center gap-2 justify-center mx-auto">
        <h4 className="text-sm leading-none font-medium">Blog</h4>
        <Separator className="flex-1" />
      </div>

      <div className="flex items-center gap-2 justify-center mx-auto">
        <h4 className="text-sm leading-none font-medium">Pinned Projects</h4>
        <Separator className="flex-1" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="">
          <p>Gallary of projects</p>
        </Card>

        <Card className="">
          <p>Gallary of projects</p>
        </Card>

        <Card className="">
          <p>Gallary of projects</p>
        </Card>

        <Card className="">
          <p>Gallary of projects</p>
        </Card>
      </div>



    </div>
  );
}
