import { Library } from "../types/library.type"
import { Project } from "../types/project.type"

export interface ProjectConfig {
  name: string
  type: Project | null
  libraries: Library[]
  description: string
}
