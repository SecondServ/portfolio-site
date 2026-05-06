import type { Profile } from '@/types';

/**
 * ─────────────────────────────────────────────────────────
 *  YOUR PORTFOLIO DATA
 *  Edit this file to update everything shown on the site.
 *  Tip: copy your profile from the Resume Builder app:
 *    Open / → DevTools → Application → Local Storage →
 *    resume_app_profile → paste the JSON here.
 * ─────────────────────────────────────────────────────────
 */

const PROFILE: Profile = {
  // ── Basic info ────────────────────────────────────────
  name:     'Hector Zhang',
  title:    'Data Analyst',
  email:    'hectorcareer@gmail.com',
  location: 'San Jose, CA',

  summary:
    'Data analyst with 5+ years of experience turning complex datasets into ' +
    'clear, actionable insights. Passionate about visualization, automation, ' +
    'and using data to drive smarter decisions.',

  links: [
    { label: 'LinkedIn', url: 'https://linkedin.com/in/your-handle' },
    { label: 'Tableau',  url: 'https://public.tableau.com/app/profile/zzh520/vizzes' },
    { label: 'GitHub',   url: 'https://github.com/SecondServ' },
  ],

  // ── Work experience ────────────────────────────────────
  // Most recent first. Dates: "YYYY-MM" format or "Present".
  experience: [
    {
      company:   'Company Name',
      title:     'Senior Data Analyst',
      startDate: '2022-06',
      endDate:   'Present',
      location:  'San Jose, CA',
      bullets: [
        'Built end-to-end Tableau dashboards tracking $50M+ in quarterly revenue, reducing manual reporting by 8 hours per week.',
        'Automated ETL pipelines in Python/SQL that cut data-refresh latency from 4 hours to 15 minutes.',
        'Led cross-functional analysis of customer churn, surfacing 3 root causes that reduced churn 12% in 6 months.',
      ],
    },
    {
      company:   'Previous Company',
      title:     'Data Analyst',
      startDate: '2020-01',
      endDate:   '2022-05',
      location:  'Remote',
      bullets: [
        'Designed and maintained 20+ Tableau dashboards for executive stakeholders across sales, ops, and marketing.',
        'Wrote SQL queries extracting insights from 100M+ row datasets, used to inform quarterly OKR planning.',
      ],
    },
  ],

  // ── Skills ─────────────────────────────────────────────
  skills: [
    {
      category: 'Analytics',
      items: ['SQL', 'Python', 'R', 'Pandas', 'NumPy'],
    },
    {
      category: 'Visualization',
      items: ['Tableau', 'Power BI', 'Matplotlib', 'Plotly', 'D3.js'],
    },
    {
      category: 'Data Engineering',
      items: ['dbt', 'Airflow', 'Spark', 'BigQuery', 'Snowflake', 'PostgreSQL'],
    },
    {
      category: 'Tools',
      items: ['Git', 'Docker', 'Jira', 'Confluence', 'Excel'],
    },
  ],

  // ── Projects ───────────────────────────────────────────
  projects: [
    {
      name:        'Sales Performance Dashboard',
      description: 'Interactive Tableau dashboard tracking real-time sales KPIs across 5 regions, used daily by 30+ stakeholders.',
      technologies: ['Tableau', 'SQL', 'Snowflake'],
      url:         'https://public.tableau.com/app/profile/zzh520/vizzes',
    },
    {
      name:        'Churn Prediction Model',
      description: 'Machine learning pipeline that predicts customer churn 30 days in advance with 84% accuracy.',
      technologies: ['Python', 'scikit-learn', 'Pandas', 'Airflow'],
    },
    {
      name:        'ETL Automation Framework',
      description: 'Modular Python framework for ingesting, transforming, and validating data from 10+ source systems.',
      technologies: ['Python', 'dbt', 'BigQuery', 'Docker'],
      url:         'https://github.com/SecondServ',
    },
  ],

  // ── Education ──────────────────────────────────────────
  education: [
    {
      institution:    'University Name',
      degree:         'B.S.',
      field:          'Statistics',
      graduationDate: '2019-05',
      gpa:            '3.8',
    },
  ],

  // ── Certifications (optional) ──────────────────────────
  certifications: [
    { name: 'Tableau Desktop Specialist', issuer: 'Tableau',          date: '2021-03' },
    { name: 'Google Data Analytics',      issuer: 'Google / Coursera', date: '2022-01' },
  ],
};

export default PROFILE;
