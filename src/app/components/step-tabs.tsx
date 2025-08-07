"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Code2, Database, Container, FileText, Settings, Zap, Layers, Terminal, Globe, Package } from 'lucide-react'

import { ProjectConfig } from "@/common/interfaces/project-config.interface"
import { Library } from "@/common/types/library.type"
import { Project } from "@/common/types/project.type"

function StepTabs() {

  const [config, setConfig] = useState<ProjectConfig>({
    name: "",
    type: null,
    libraries: [],
    description: ""
  })

  const [currentStep, setCurrentStep] = useState(1)

  const projectTypes = [
    {
      id: "nextjs" as Project,
      name: "Next.js",
      description: "Modern React framework with App Router, TypeScript, and Tailwind CSS",
      icon: Globe,
      features: ["TypeScript", "Tailwind CSS", "App Router", "API Routes", "ESLint", "Turbopack"],
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100"
    },
    {
      id: "typescript-cli" as Project,
      name: "TypeScript CLI",
      description: "Command-line application with TypeScript and Commander.js",
      icon: Terminal,
      features: ["TypeScript", "Commander.js", "Build System", "Development Tools"],
      color: "bg-green-50 border-green-200 hover:bg-green-100"
    }
  ]

  const libraries = [
    {
      id: "prisma" as Library,
      name: "Prisma",
      description: "Database ORM with PostgreSQL, pre-configured schema, and seeder",
      icon: Database,
      features: ["PostgreSQL Setup", "User & Post Models", "Database Seeder", "Migration Scripts"],
      compatibleWith: ["nextjs"]
    },
    {
      id: "docker" as Library,
      name: "Docker",
      description: "Containerized development environment",
      icon: Container,
      features: ["Docker Compose", "PostgreSQL Container", "Environment Variables"],
      compatibleWith: ["nextjs"]
    },
    {
      id: "prisma-docker" as Library,
      name: "Prisma + Docker",
      description: "Complete database setup with Prisma ORM and Docker containers",
      icon: Layers,
      features: ["All Prisma Features", "Docker Compose", "Containerized Database"],
      compatibleWith: ["nextjs"]
    }
  ]

  const handleLibraryToggle = (libraryId: Library) => {
    setConfig(prev => ({
      ...prev,
      libraries: prev.libraries.includes(libraryId)
        ? prev.libraries.filter(lib => lib !== libraryId)
        : [...prev.libraries, libraryId]
    }))
  }

  const getCompatibleLibraries = () => {
    return libraries.filter(lib =>
      config.type && lib.compatibleWith.includes(config.type)
    )
  }

  const generateProject = () => {
    // This would integrate with your CLI tool or API
    console.log("Generating project with config:", config)
    // Simulate project generation
    alert(`Project "${config.name}" will be generated with ${config.type} and libraries: ${config.libraries.join(", ")}`)
  }

  const canProceed = (step: number) => {
    switch (step) {
      case 1: return config.name.trim() !== ""
      case 2: return config.type !== null
      case 3: return true // Libraries are optional
      default: return false
    }
  }
  return (

    <div className="max-w-4xl mx-auto">
      <Tabs value={currentStep.toString()} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="1" disabled={false}>
            <FileText className="h-4 w-4 mr-2" />
            Project Info
          </TabsTrigger>
          <TabsTrigger value="2" disabled={!canProceed(1)}>
            <Code2 className="h-4 w-4 mr-2" />
            Project Type
          </TabsTrigger>
          <TabsTrigger value="3" disabled={!canProceed(2)}>
            <Package className="h-4 w-4 mr-2" />
            Libraries
          </TabsTrigger>
          <TabsTrigger value="4" disabled={!canProceed(3)}>
            <Settings className="h-4 w-4 mr-2" />
            Review
          </TabsTrigger>
        </TabsList>

        {/* Step 1: Project Information */}
        <TabsContent value="1" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Project Information
              </CardTitle>
              <CardDescription>
                Let&apos;s start by setting up your project details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="project-name">Project Name</Label>
                <Input
                  id="project-name"
                  placeholder="my-awesome-project"
                  value={config.name}
                  onChange={(e) => setConfig(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-description">Description (Optional)</Label>
                <Input
                  id="project-description"
                  placeholder="A brief description of your project"
                  value={config.description}
                  onChange={(e) => setConfig(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-end">
            <Button
              onClick={() => setCurrentStep(2)}
              disabled={!canProceed(1)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Next: Choose Project Type
            </Button>
          </div>
        </TabsContent>

        {/* Step 2: Project Type Selection */}
        <TabsContent value="2" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code2 className="h-5 w-5" />
                Choose Project Type
              </CardTitle>
              <CardDescription>
                Select the type of project you want to create
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {projectTypes.map((type) => {
                  const Icon = type.icon
                  const isSelected = config.type === type.id
                  return (
                    <Card
                      key={type.id}
                      className={`cursor-pointer transition-all ${isSelected
                        ? "ring-2 ring-blue-500 bg-blue-50"
                        : type.color
                        }`}
                      onClick={() => setConfig(prev => ({ ...prev, type: type.id, libraries: [] }))}
                    >
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <Icon className="h-8 w-8 text-blue-600" />
                          <div>
                            <CardTitle className="text-lg">{type.name}</CardTitle>
                            <CardDescription className="text-sm">
                              {type.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-1">
                          {type.features.map((feature) => (
                            <Badge key={feature} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setCurrentStep(1)}>
              Back
            </Button>
            <Button
              onClick={() => setCurrentStep(3)}
              disabled={!canProceed(2)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Next: Select Libraries
            </Button>
          </div>
        </TabsContent>

        {/* Step 3: Library Selection */}
        <TabsContent value="3" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Select Libraries
              </CardTitle>
              <CardDescription>
                Choose additional libraries to include in your project
              </CardDescription>
            </CardHeader>
            <CardContent>
              {getCompatibleLibraries().length > 0 ? (
                <div className="space-y-4">
                  {getCompatibleLibraries().map((library) => {
                    const Icon = library.icon
                    const isSelected = config.libraries.includes(library.id)
                    return (
                      <Card
                        key={library.id}
                        className={`cursor-pointer transition-all ${isSelected
                          ? "ring-2 ring-blue-500 bg-blue-50"
                          : "hover:bg-slate-50"
                          }`}
                        onClick={() => handleLibraryToggle(library.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <Checkbox
                              checked={isSelected}
                              onChange={() => handleLibraryToggle(library.id)}
                            />
                            <Icon className="h-6 w-6 text-blue-600 mt-1" />
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg">{library.name}</h3>
                              <p className="text-muted-foreground mb-2">{library.description}</p>
                              <div className="flex flex-wrap gap-1">
                                {library.features.map((feature) => (
                                  <Badge key={feature} variant="outline" className="text-xs">
                                    {feature}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No additional libraries available for this project type.</p>
                </div>
              )}
            </CardContent>
          </Card>
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setCurrentStep(2)}>
              Back
            </Button>
            <Button
              onClick={() => setCurrentStep(4)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Review Configuration
            </Button>
          </div>
        </TabsContent>

        {/* Step 4: Review and Generate */}
        <TabsContent value="4" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Review Configuration
              </CardTitle>
              <CardDescription>
                Review your project configuration before generation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="font-semibold mb-2">Project Details</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Name:</strong> {config.name}</div>
                    {config.description && (
                      <div><strong>Description:</strong> {config.description}</div>
                    )}
                    <div><strong>Type:</strong> {projectTypes.find(t => t.id === config.type)?.name}</div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Selected Libraries</h3>
                  {config.libraries.length > 0 ? (
                    <div className="space-y-1">
                      {config.libraries.map(libId => {
                        const lib = libraries.find(l => l.id === libId)
                        return (
                          <Badge key={libId} variant="secondary">
                            {lib?.name}
                          </Badge>
                        )
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No additional libraries selected</p>
                  )}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-2">What will be generated:</h3>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <div className="space-y-2 text-sm font-mono">
                    <div>📁 {config.name}/</div>
                    <div className="ml-4">📄 package.json</div>
                    <div className="ml-4">📄 tsconfig.json</div>
                    <div className="ml-4">📄 README.md</div>
                    {config.type === "nextjs" && (
                      <>
                        <div className="ml-4">📁 src/</div>
                        <div className="ml-4">📄 tailwind.config.js</div>
                        <div className="ml-4">📄 next.config.js</div>
                      </>
                    )}
                    {config.libraries.includes("prisma") && (
                      <>
                        <div className="ml-4">📁 prisma/</div>
                        <div className="ml-8">📄 schema.prisma</div>
                        <div className="ml-8">📄 seed.ts</div>
                      </>
                    )}
                    {config.libraries.includes("docker") && (
                      <div className="ml-4">📄 docker-compose.yml</div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setCurrentStep(3)}>
              Back
            </Button>
            <Button
              onClick={generateProject}
              className="bg-green-600 hover:bg-green-700"
              size="lg"
            >
              <Zap className="h-4 w-4 mr-2" />
              Generate Project
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export { StepTabs }
