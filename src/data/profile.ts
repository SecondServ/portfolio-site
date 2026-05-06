import type { Profile } from '@/types';

const PROFILE: Profile = {
  name:     'Zihao (Hector) Zhao',
  title:    'Senior Data Analyst',
  email:    'hectorcareer@gmail.com',
  location: 'San Jose, CA',

  summary:
    'Action-oriented Senior Data Analyst with over 5 years of experience in the digital ' +
    'entertainment industry building scalable data pipelines, advanced statistical models, ' +
    'and executive dashboards. Additionally brings entrepreneurial expertise from founding ' +
    'and scaling a profitable wholesale business, possessing a deep understanding of ' +
    'full-cycle business operations, supply chain management, and data-driven customer acquisition.',

  links: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/zzh520' },
    { label: 'Tableau',  url: 'https://public.tableau.com/app/profile/zzh520/vizzes' },
    { label: 'Website',  url: 'https://zihaozhao.info' },
  ],

  experience: [
    {
      company:   'Jam City',
      title:     'Senior Data Analyst',
      startDate: 'Apr 2024',
      endDate:   'Present',
      location:  'Los Angeles Metropolitan Area',
      bullets: [
        'Architected and deployed 200+ scalable data processing pipelines using advanced SQL, enabling efficient large-scale dataset manipulation, storage optimization, and cross-functional revenue trend investigations to solve 98% of complex data inquiries.',
        'Developed 150+ executive-ready Tableau dashboards, empowering 80% of product managers with intuitive data visualizations to drive proactive business decisions and effectively diagnose system issues.',
        'Built and governed over 20 core KPI frameworks to accurately assess in-game economy health, systematically identifying inflation risks and accelerating proactive decision-making for leadership teams.',
        'Led pre- and post-launch analytical support for 3 major titles, executing multiple complex ad-hoc analyses that contributed to exceeding internal targets and achieving over 50% Day 1 retention on iOS.',
        'Developed and implemented a scalable level optimization methodology that directly improved player VC spend patterns, resulting in an approximately 20% increase in DB VC spend while maintaining healthy engagement.',
      ],
    },
    {
      company:   'Outdoor Products Wholesale Business',
      title:     'Founder & Operator',
      startDate: 'Jan 2023',
      endDate:   'Dec 2025',
      location:  'California',
      bullets: [
        'Founded and operated a one-person outdoor products wholesale business, driving rapid growth to achieve $140,000 in revenue by the second year.',
        'Acquired and served over 100 local B2B enterprise clients, maintaining strong customer relationships and ensuring high satisfaction and retention.',
        'Managed end-to-end business operations including supply chain management, inventory and warehouse management, and strict tax compliance.',
        'Spearheaded customer acquisition and brand presence through targeted social media operations and frontend digital optimization.',
      ],
    },
    {
      company:   'Jam City',
      title:     'Data Analyst',
      startDate: 'Jul 2022',
      endDate:   'Mar 2024',
      location:  'Culver City, CA',
      bullets: [
        'Engineered scalable A/B testing evaluation frameworks and proposed database infrastructure improvements for analytics taxonomy, streamlining experiment analysis, ensuring metric consistency, and saving teams 2+ hours weekly while guiding product strategy.',
        'Proposed and implemented database infrastructure improvements for analytics taxonomy, ensuring metric consistency and streamlining deep analyses for 3 new games.',
        'Resolved 25+ complex data requests from product and engineering teams each quarter using advanced SQL, translating trends into actionable cross-functional insights.',
        'Sourced and managed large external datasets via open APIs, applying NLP and scripted scraping to uncover user sentiment trends and proactively guide acquisition strategies.',
      ],
    },
    {
      company:   'Jam City',
      title:     'Central Product Management Analyst Intern',
      startDate: 'Sep 2021',
      endDate:   'Jul 2022',
      location:  'Culver City, CA',
      bullets: [
        'Investigated declining profitability in a flagship product by establishing comprehensive revenue and engagement funnels, decomposing factors, and effectively visualizing metrics to save 10+ manual hours weekly.',
        'Performed user attrition analysis by creating 150+ features and developing predictive machine learning models to identify churn likelihood, reporting 10+ core signals to guide mobile strategy.',
        'Revamped database schemas and wrote high-quality data pipelines to evaluate user engagement, resolving four major infrastructure bottlenecks with the push notification system.',
        'Created a game currency value and inflation evaluation framework to assess in-game economy health, identify inflation risks, and reduce ad-hoc economy research time by one hour weekly.',
      ],
    },
    {
      company:   'Jam City',
      title:     'Central Product Management Intern',
      startDate: 'Jun 2021',
      endDate:   'Aug 2021',
      location:  'Remote',
      bullets: [
        'Conducted a competitive analysis covering four existing competing products regarding mobile game onboarding tutorial and provided five recommendations for improvement, guiding game design.',
        'Established a multifunctional dashboard using open source Python packages as a potential substitute for Tableau to visualize over 40 key metrics evaluating performance of interstitial Ads.',
        'Designed a new metric called rolling weekly DAU retention rate, capable of capturing reactions of users in different categories toward in-game events on a rolling basis, contributing directions for UA strategies.',
      ],
    },
    {
      company:   'Fantuan',
      title:     'Business Development Intern',
      startDate: 'Jul 2020',
      endDate:   'Sep 2020',
      location:  'Fremont, CA',
      bullets: [
        'Analyzed consumption patterns of consumers in the Bay Area and created optimized development plans for 4 cities, accurately predicting market growth based on seasonal data trends.',
        'Negotiated with more than 50 small business owners and established 20+ partnerships, boosting product variety by 10% and monthly sales by 15% through data-driven promotional plans.',
        'Actively planned optimal routes for food delivery drivers, utilizing analytical skills to maximize operational efficiency and ensure timely fulfillment.',
      ],
    },
  ],

  skills: [
    {
      category: 'Data Engineering & Programming',
      items: ['Advanced SQL', 'Python', 'Spark', 'R', 'SAS', 'Scalable Pipelines', 'Large Datasets', 'HTML', 'CSS'],
    },
    {
      category: 'BI & Visualization',
      items: ['Tableau', 'Looker', 'Executive Dashboards', 'KPI Governance', 'Real-Time Alerts', 'Plotly'],
    },
    {
      category: 'Data Analysis & Methodology',
      items: ['A/B Testing', 'Statistical Modeling', 'Forecasting', 'Exploratory Analysis', 'Deep Trend Investigation', 'Linear Optimization'],
    },
    {
      category: 'Machine Learning',
      items: ['NLP', 'Predictive Modeling', 'Random Forest', 'Feature Engineering', 'Boosted Trees', 'Neural Networks', 'K-nearest Neighbors'],
    },
    {
      category: 'Database Infrastructure',
      items: ['BigQuery', 'PostgreSQL', 'MongoDB', 'MySQL', 'Schema Management'],
    },
    {
      category: 'Business Operations',
      items: ['Supply Chain Management', 'Inventory Management', 'Customer Acquisition', 'Social Media Operations', 'CRM'],
    },
  ],

  projects: [
    {
      name:        'Identity Fraud Detection',
      description: 'Designed a comprehensive fraud detection solution on 100,000 credit card application records. Created 680+ features and built 5 classification models (Boosted Trees, Random Forest, Neural Network, KNN), capturing 54% of fraud activities.',
      technologies: ['Python', 'Machine Learning', 'Feature Engineering', 'Random Forest'],
    },
    {
      name:        'Humana-Mays Healthcare Analytics Competition',
      description: 'Explored and cleaned longitudinal data with 800+ features and 60,000+ observations to build a binary classification model forecasting transportation issues for 16,000+ members. Achieved top 50 rank nationwide with F1-score of 0.85.',
      technologies: ['Python', 'Binary Classification', 'Predictive Modeling'],
    },
    {
      name:        "King's Hawaiian Marketing Analytics",
      description: 'Analyzed marketing data from 50+ properties and 70,000+ observations. Built a linear regression model explaining 81.9% of marketing ROI variance and visualized volume sales boosted by 9 marketing activations.',
      technologies: ['Python', 'SQL', 'Linear Regression', 'A/B Testing'],
    },
  ],

  education: [
    {
      institution:    'University of Southern California',
      degree:         'Master of Science',
      field:          'Business Analytics',
      graduationDate: 'May 2022',
      gpa:            '3.8',
      honors:         'Fall 2020 Dean\'s List',
    },
    {
      institution:    'University of California, San Diego',
      degree:         'Bachelor of Science',
      field:          'Management Science',
      graduationDate: 'Jun 2019',
      gpa:            '3.6',
    },
  ],

  certifications: [
    { name: 'Data Analysis in Spreadsheets',  issuer: 'DataCamp', date: 'Aug 2020' },
    { name: 'Customer Segmentation in Python', issuer: 'DataCamp', date: 'Oct 2020' },
  ],
};

export default PROFILE;
