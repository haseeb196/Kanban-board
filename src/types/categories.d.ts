
export interface Category {
    name: string,
    tasks? : Task[]
}

export interface Task {
    issue_number: string,
    issue_date: Date,
    issue_title: string,
    verified: boolean,
    severity: string,
    description: string    
    label: string[]
}