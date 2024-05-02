export interface Category {
  name: string;
  tasks?: Task[];
}

export interface Task {
  issue_number: string;
  issue_date: string;
  issue_title: string;
  verified: boolean;
  severity: string;
  description: string;
  label: Label[];
}

export interface Label {
  name: string;
  color: string;
}
