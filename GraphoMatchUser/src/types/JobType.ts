export type JobType = {
    id: number
    title: string
    company: string
    location: string
    tags: string[]
    salary: string
    description: string
    logo: string
    matchLevel: "Low" | "Medium" | "High" | "Very High"
}