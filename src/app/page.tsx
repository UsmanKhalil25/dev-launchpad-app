import { Rocket } from "lucide-react"

import { StepTabs } from "./components/step-tabs"
export default function HomePage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Rocket className="h-8 w-8" />
            <h1 className="text-4xl font-bold">
              Dev Launchpad
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Rapidly scaffold modern development projects with pre-configured libraries and best practices
          </p>
        </div>
        <StepTabs />
      </div>
    </div>
  )
}
