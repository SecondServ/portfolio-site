export interface ProfileLink {
  label: string;
  url: string;
}

export interface WorkExperience {
  company: string;
  title: string;
  startDate: string;   // "2022-06" or "Jan 2022"
  endDate: string;     // "2024-03" or "Present"
  location: string;
  bullets: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  url?: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  graduationDate: string;
  gpa?: string;
  honors?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
}

export interface Profile {
  name: string;
  title: string;
  email: string;
  location: string;
  summary: string;
  links: ProfileLink[];
  experience: WorkExperience[];
  skills: SkillGroup[];
  projects: Project[];
  education: Education[];
  certifications: Certification[];
}
