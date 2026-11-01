export type SkillConcept = {
  name: string;
  description: string;
};

export type LearningResource = {
  title: string;
  type: string;
  url: string;
  description: string;
};

export type Skill = {
  slug: string;
  title: string;
  category: string;
  level: string;
  description: string;
  progress: number;
  concepts: SkillConcept[];
  resources: LearningResource[];
  tools: string[];
};

export type Opportunity = {
  id: string;
  title: string;
  company: string;
  type: "Job" | "Internship" | "Freelance" | "Project";
  description: string;
  requiredSkills: string[];
};

export const skillCatalog: Skill[] = [
  {
    slug: "web-development",
    title: "Web Development",
    category: "Programming",
    level: "Beginner to Intermediate",
    description:
      "Learn to build responsive websites and modern web interfaces using core frontend and backend concepts.",
    progress: 72,
    tools: ["HTML", "CSS", "JavaScript", "React"],
    concepts: [
      { name: "HTML Structure", description: "Create semantic page layout and organize content for the web." },
      { name: "CSS Styling", description: "Apply design principles, layout systems, and visual consistency." },
      { name: "JavaScript Logic", description: "Add interactivity, dynamic behavior, and event-driven actions." },
      { name: "Responsive Design", description: "Build layouts that adapt to mobile, tablet, and desktop devices." },
      { name: "APIs", description: "Connect frontend interfaces to external data and services." },
    ],
    resources: [
      {
        title: "MDN Web Docs",
        type: "Documentation",
        url: "https://developer.mozilla.org/en-US/docs/Web",
        description: "Official documentation for HTML, CSS, JavaScript, and web APIs.",
      },
      {
        title: "FreeCodeCamp Responsive Web Design",
        type: "Course",
        url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/",
        description: "Practical project-based learning for responsive design and frontend structure.",
      },
      {
        title: "JavaScript.info",
        type: "Tutorial",
        url: "https://javascript.info/",
        description: "A beginner-friendly resource for learning modern JavaScript thoroughly.",
      },
    ],
  },
  {
    slug: "mobile-development",
    title: "Mobile Development",
    category: "Programming",
    level: "Foundation",
    description:
      "Understand app design, screens, interactions, data management, and platform-specific mobile development patterns.",
    progress: 61,
    tools: ["Flutter", "Kotlin", "React Native", "UI Design"],
    concepts: [
      { name: "App Architecture", description: "Structure an app into screens, state, and reusable modules." },
      { name: "User Interface Design", description: "Build user-friendly interfaces optimized for mobile screens." },
      { name: "Local Storage", description: "Save user preferences, data, and state on the device." },
      { name: "Navigation", description: "Move between screens without breaking user flow or context." },
      { name: "Notifications", description: "Provide timely updates and keep users engaged with app events." },
    ],
    resources: [
      {
        title: "Flutter Docs",
        type: "Documentation",
        url: "https://docs.flutter.dev/",
        description: "Official Flutter development docs with examples and best practices.",
      },
      {
        title: "Android Developer Guide",
        type: "Documentation",
        url: "https://developer.android.com/guide",
        description: "Detailed guide to Android app components, UI, and lifecycle handling.",
      },
      {
        title: "React Native Docs",
        type: "Documentation",
        url: "https://reactnative.dev/docs/getting-started",
        description: "Cross-platform mobile development guidance using React Native.",
      },
    ],
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity",
    category: "IT Security",
    level: "Foundation",
    description:
      "Build understanding of digital threats, secure authentication, protection strategies, and safe systems management.",
    progress: 45,
    tools: ["Authentication", "Networking", "Firewalls", "Security Awareness"],
    concepts: [
      { name: "Authentication", description: "Verify identity before allowing access to systems or data." },
      { name: "Access Control", description: "Restrict actions and resources based on roles, permissions, and policies." },
      { name: "Threat Awareness", description: "Recognize common risk patterns such as phishing, malware, and misuse." },
      { name: "Network Security", description: "Protect communication channels and reduce unauthorized access risks." },
      { name: "Data Protection", description: "Secure sensitive information through encryption, control, and safe practices." },
    ],
    resources: [
      {
        title: "Cybersecurity for Beginners",
        type: "Course",
        url: "https://www.cybersecurityforbeginners.com/",
        description: "Beginner-friendly guide to core cybersecurity terms and practices.",
      },
      {
        title: "Cisco Networking Academy",
        type: "Learning Platform",
        url: "https://www.netacad.com/",
        description: "Structured online training in networking and cybersecurity fundamentals.",
      },
      {
        title: "OWASP Top 10",
        type: "Resource",
        url: "https://owasp.org/www-project-top-ten/",
        description: "Key web application security risks and mitigation practices.",
      },
    ],
  },
  {
    slug: "database-management",
    title: "Database Management",
    category: "Data & Systems",
    level: "Practical",
    description:
      "Learn how to design, query, and maintain data systems that support digital applications and business operations.",
    progress: 68,
    tools: ["SQL", "MySQL", "PostgreSQL", "Database Design"],
    concepts: [
      { name: "Database Design", description: "Create efficient tables, relationships, and logical data structures." },
      { name: "SQL Queries", description: "Retrieve, filter, and manipulate data using structured query language." },
      { name: "Normalization", description: "Reduce duplication and preserve data integrity in relational models." },
      { name: "Relationships", description: "Connect records across tables through primary and foreign keys." },
      { name: "Data Integrity", description: "Ensure stored information is accurate, consistent, and trustworthy." },
    ],
    resources: [
      {
        title: "SQLBolt",
        type: "Tutorial",
        url: "https://sqlbolt.com/",
        description: "A straightforward introduction to SQL commands and relational logic.",
      },
      {
        title: "PostgreSQL Docs",
        type: "Documentation",
        url: "https://www.postgresql.org/docs/",
        description: "Official documentation covering relational database management and SQL features.",
      },
      {
        title: "Database Design Tutorial",
        type: "Guide",
        url: "https://www.studytonight.com/dbms/database-design",
        description: "Explains entities, relations, schema design, and normalization basics.",
      },
    ],
  },
  {
    slug: "data-analysis",
    title: "Data Analysis",
    category: "Data & Analytics",
    level: "Beginner",
    description:
      "Collect, clean, interpret, and visualize data to turn raw information into useful insights and decisions.",
    progress: 49,
    tools: ["Excel", "Python", "Power BI", "Visualization"],
    concepts: [
      { name: "Data Cleaning", description: "Prepare raw information by correcting errors and organizing inconsistent values." },
      { name: "Descriptive Statistics", description: "Summarize datasets using averages, distributions, and percentages." },
      { name: "Visualization", description: "Represent trends and patterns using dashboards, charts, and graphs." },
      { name: "Decision Making", description: "Turn analytical findings into practical business or project recommendations." },
      { name: "Reporting", description: "Share insights in a clear and actionable format for stakeholders." },
    ],
    resources: [
      {
        title: "Khan Academy Statistics",
        type: "Course",
        url: "https://www.khanacademy.org/math/statistics-probability",
        description: "Beginner-friendly statistics and probability learning materials.",
      },
      {
        title: "Google Data Analytics Course",
        type: "Course",
        url: "https://grow.google/data-analytics/",
        description: "Free practical training in data analytics workflows and tools.",
      },
      {
        title: "Power BI Documentation",
        type: "Documentation",
        url: "https://learn.microsoft.com/en-us/power-bi/",
        description: "Learn to build dashboards and communicate insights visually.",
      },
    ],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    category: "Business & Communication",
    level: "Beginner",
    description:
      "Grow awareness, engagement, and conversion using online platforms, content strategy, and audience insight.",
    progress: 38,
    tools: ["SEO", "Social Media", "Analytics", "Content Strategy"],
    concepts: [
      { name: "SEO", description: "Improve visibility in search results through content and technical optimization." },
      { name: "Content Strategy", description: "Plan online messages that connect with the target audience." },
      { name: "Social Media Marketing", description: "Use digital channels to promote products, services, and campaigns." },
      { name: "Analytics", description: "Track behavior and outcomes to evaluate campaign performance." },
      { name: "Brand Awareness", description: "Build a clear digital reputation and consistent customer perception." },
    ],
    resources: [
      {
        title: "HubSpot Academy",
        type: "Course",
        url: "https://academy.hubspot.com/",
        description: "Practical digital marketing education covering SEO, content, and sales strategy.",
      },
      {
        title: "Google Digital Garage",
        type: "Course",
        url: "https://skillshop.exceedlms.com/student/catalog/list?category_ids=141",
        description: "A broad digital marketing learning platform with practical courses and modules.",
      },
      {
        title: "Moz SEO Learning",
        type: "Resource",
        url: "https://moz.com/learn/seo",
        description: "Helpful SEO beginner resources and search optimization concepts.",
      },
    ],
  },
  {
    slug: "technical-support",
    title: "Technical Support",
    category: "IT Support",
    level: "Intermediate",
    description:
      "Resolve user issues, troubleshoot systems, and provide practical support for hardware, software, and digital services.",
    progress: 56,
    tools: ["Troubleshooting", "Hardware", "Operating Systems", "Customer Support"],
    concepts: [
      { name: "Troubleshooting", description: "Diagnose technical problems using structured and evidence-based methods." },
      { name: "Operating Systems", description: "Manage user tasks, services, settings, and performance in common platforms." },
      { name: "Hardware Basics", description: "Understand the purpose and interaction of common devices and components." },
      { name: "Customer Communication", description: "Explain solutions clearly and document issues for future resolution." },
      { name: "System Maintenance", description: "Keep devices and applications working effectively through regular upkeep." },
    ],
    resources: [
      {
        title: "Google IT Support Professional Certificate",
        type: "Course",
        url: "https://grow.google/it-support/",
        description: "A structured pathway for learning IT fundamentals and technical troubleshooting.",
      },
      {
        title: "CompTIA IT Fundamentals",
        type: "Certification Prep",
        url: "https://www.comptia.org/certifications/it-fundamentals",
        description: "Covers core IT support concepts and general digital literacy skills.",
      },
      {
        title: "How-To Geek",
        type: "Reference",
        url: "https://www.howtogeek.com/",
        description: "Practical articles for troubleshooting, software usage, and everyday tech help.",
      },
    ],
  },
];

export const userProfile = {
  name: "Edimond Morara",
  role: "Frontend Developer",
  skills: [
    "Web Development",
    "HTML",
    "CSS",
    "JavaScript",
    "Database Management",
    "SQL",
    "Responsive Design",
  ],
};

export const opportunities: Opportunity[] = [
  {
    id: "opp-1",
    title: "Frontend Developer Intern",
    company: "NovaTech Labs",
    type: "Internship",
    description: "Support the design and development of responsive interfaces for a growing digital product team.",
    requiredSkills: ["Web Development", "HTML", "CSS", "JavaScript", "Responsive Design"],
  },
  {
    id: "opp-2",
    title: "Junior Web Developer",
    company: "BluePeak Studio",
    type: "Job",
    description: "Build and maintain client websites while collaborating with designers and project managers.",
    requiredSkills: ["Web Development", "JavaScript", "Database Management", "SQL"],
  },
  {
    id: "opp-3",
    title: "Cybersecurity Analyst Trainee",
    company: "SecureGrid Ltd",
    type: "Project",
    description: "Support security monitoring, awareness campaigns, and risk analysis for internal systems.",
    requiredSkills: ["Cybersecurity", "Access Control", "Data Protection", "Network Security"],
  },
  {
    id: "opp-4",
    title: "Data Analyst Assistant",
    company: "Insight Hub",
    type: "Freelance",
    description: "Assist with cleaning data, creating reports, and visualizing business trends for decision making.",
    requiredSkills: ["Data Analysis", "Visualization", "SQL", "Excel"],
  },
];

export const getSkillBySlug = (slug: string) =>
  skillCatalog.find((skill) => skill.slug === slug);

export function calculateMatchScore(userSkills: string[], requiredSkills: string[]) {
  const normalizedUser = userSkills.map((item) => item.toLowerCase());
  const normalizedRequired = requiredSkills.map((item) => item.toLowerCase());

  const matched = normalizedRequired.filter((skill) => normalizedUser.includes(skill));
  const missing = normalizedRequired.filter((skill) => !normalizedUser.includes(skill));

  const score = normalizedRequired.length
    ? Math.round((matched.length / normalizedRequired.length) * 100)
    : 0;

  return {
    score,
    matched,
    missing,
    isStrongMatch: score >= 70,
  };
}

export const dashboardStats = [
  { label: "Skills tracked", value: "18" },
  { label: "Completed", value: "6" },
  { label: "Matches", value: "12" },
  { label: "Avg. score", value: "86%" },
];

export const skillFocus = [
  "JavaScript Fundamentals",
  "Responsive Design",
  "Database Queries",
  "Cybersecurity Basics",
];

export const adminOverview = {
  users: 1240,
  skills: 35,
  opportunities: 186,
  activeMentors: 82,
};
