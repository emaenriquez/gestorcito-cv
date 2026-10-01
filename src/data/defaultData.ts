import { MasterCV, AdaptedCV } from '../types/cv';

export const DEFAULT_MASTER_CV: MasterCV = {
  personal: {
    fullName: 'Alejandro Morales',
    headline: 'Senior Full Stack Engineer & Tech Lead',
    email: 'alejandro.morales.dev@email.com',
    phone: '+34 612 345 678',
    location: 'Madrid, España (Disponible Remoto)',
    linkedin: 'linkedin.com/in/alejandromorales-tech',
    github: 'github.com/amorales-dev',
    website: 'alejandromorales.dev',
    summary:
      'Ingeniero de software con más de 8 años de experiencia diseñando y escalando arquitecturas web de alto rendimiento. Especializado en TypeScript, React, Node.js y plataformas cloud en AWS/GCP. Con comprobada trayectoria liderando equipos multidisciplinarios, reduciendo tiempos de carga en un 40% y optimizando flujos CI/CD para productos con más de 1.5M de usuarios activos.',
  },
  experiences: [
    {
      id: 'exp-1',
      role: 'Staff / Lead Software Engineer',
      company: 'Novatech Solutions',
      location: 'Madrid / Remoto',
      startDate: '2022-03',
      endDate: '',
      current: true,
      summary:
        'Liderazgo técnico del equipo de plataforma core (8 desarrolladores) para la migración a micro-frontends y modernización de servicios backend.',
      bullets: [
        'Diseñé y coordiné la arquitectura de micro-frontends con React 18, Vite y Module Federation, reduciendo el bundle size en un 35% y mejorando el Core Web Vitals.',
        'Implementé pipelines de testing automatizado (Playwright, Jest) elevando la cobertura al 88% y recortando incidentes en producción a menos de 2 al mes.',
        'Mentoricé a 5 ingenieros junior y mid hacia roles senior, estableciendo buenas prácticas de Clean Architecture y revisión de código.',
      ],
      technologies: ['React', 'TypeScript', 'Node.js', 'Next.js', 'PostgreSQL', 'Docker', 'AWS'],
      included: true,
    },
    {
      id: 'exp-2',
      role: 'Senior Full Stack Developer',
      company: 'Klaris Digital FinTech',
      location: 'Barcelona, España',
      startDate: '2019-06',
      endDate: '2022-02',
      current: false,
      summary:
        'Desarrollo de módulos bancarios seguros, pasarelas de pago y visualización de analíticas financieras en tiempo real.',
      bullets: [
        'Desarrollé la integración con API bancarias PSD2 y procesadores de pago Stripe/Adyen procesando +$4M mensuales con 99.98% de disponibilidad.',
        'Optimicé consultas complejas en PostgreSQL y caché en Redis, reduciendo la latencia P95 de 420ms a 78ms en endpoints críticos.',
        'Colaboré estrechamente con equipos de producto y diseño para reconstruir el portal de clientes con Tailwind CSS y componentes accesibles (WCAG AA).',
      ],
      technologies: ['TypeScript', 'Express', 'React', 'Redis', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
      included: true,
    },
    {
      id: 'exp-3',
      role: 'Frontend Developer',
      company: 'PixelCraft Studio',
      location: 'Valencia, España',
      startDate: '2017-01',
      endDate: '2019-05',
      current: false,
      summary:
        'Creación de interfaces interactivas, SPAs de alto impacto visual y optimización de rendimiento responsive.',
      bullets: [
        'Construí más de 14 aplicaciones web reactivas con React y Redux Toolkit garantizando fidelidad pixel-perfect con diseños Figma.',
        'Migré bases de código heredadas de jQuery a componentes modernos React con TypeScript.',
      ],
      technologies: ['JavaScript ES6+', 'React', 'Redux', 'Sass', 'Webpack', 'REST APIs'],
      included: true,
    },
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'Universidad Politécnica de Madrid',
      degree: 'Grado en Ingeniería Informática',
      field: 'Ingeniería de Software y Sistemas Distribuidos',
      startDate: '2012',
      endDate: '2016',
      location: 'Madrid, España',
      details: 'Mención de honor en Proyecto Final de Carrera enfocado en sistemas distribuidos tolerantes a fallos.',
      included: true,
    },
  ],
  skillCategories: [
    {
      id: 'cat-1',
      category: 'Frontend & UI',
      skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'State Management (Zustand/Redux)', 'Vite', 'Testing (Jest/Playwright)', 'HTML5/CSS3 Semántico'],
      included: true,
    },
    {
      id: 'cat-2',
      category: 'Backend & Cloud',
      skills: ['Node.js', 'Express', 'NestJS', 'PostgreSQL', 'Redis', 'REST & GraphQL APIs', 'Docker', 'AWS (ECS, S3, CloudFront)'],
      included: true,
    },
    {
      id: 'cat-3',
      category: 'Metodologías & Liderazgo',
      skills: ['Arquitectura de Software', 'Code Review & Mentoring', 'Agile / Scrum', 'CI/CD Pipelines', 'Clean Code'],
      included: true,
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'OmniDash Platform',
      role: 'Creador & Arquitecto',
      url: 'https://github.com/amorales-dev/omnidash',
      description: 'Panel de monitoreo SaaS open-source con dashboards reactivos, métricas en tiempo real y alertas automáticas.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Fastify', 'PostgreSQL'],
      included: true,
    },
    {
      id: 'proj-2',
      name: 'PayFlow Gateway SDK',
      role: 'Lead Contributor',
      url: 'https://github.com/amorales-dev/payflow-sdk',
      description: 'Librería TypeScript modular para unificar cobros recurrentes y validaciones de tarjetas con cifrado client-side.',
      technologies: ['TypeScript', 'Jest', 'Rollup', 'Web Crypto API'],
      included: true,
    },
  ],
  languages: [
    { id: 'lang-1', name: 'Español', proficiency: 'Nativo', included: true },
    { id: 'lang-2', name: 'Inglés', proficiency: 'C1 Profesional (Fluido)', included: true },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services',
      year: '2023',
      url: 'https://aws.amazon.com/verification',
      included: true,
    },
    {
      id: 'cert-2',
      name: 'Meta Front-End Developer Professional Certificate',
      issuer: 'Meta / Coursera',
      year: '2022',
      url: 'https://coursera.org/verify',
      included: true,
    },
  ],
  lastUpdated: new Date().toISOString(),
};

export const DEFAULT_ADAPTED_CVS: AdaptedCV[] = [
  {
    id: 'cv-empresa-x',
    reference: 'Empresa X - Martín RRHH',
    company: 'Empresa X',
    recruiter: 'Martín (Lead Recruiter Tech)',
    targetRole: 'Lead Frontend Architect',
    jobUrl: 'https://empresax.com/careers/lead-frontend',
    jobDescription:
      'Buscamos Lead Frontend con sólido dominio de React 18, TypeScript, Micro-frontends y optimización de Core Web Vitals. Valorable experiencia en FinTech y liderazgo técnico de equipos de +6 ingenieros.',
    status: 'Entrevista',
    salaryExpectation: '65.000€ - 75.000€',
    notes: 'Martín me contactó por LinkedIn. Primera entrevista técnica agendada para el jueves a las 11:00h.',
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    applicationDate: '2026-09-27',
    template: 'modern',
    cvData: {
      ...DEFAULT_MASTER_CV,
      personal: {
        ...DEFAULT_MASTER_CV.personal,
        headline: 'Lead Frontend Architect (React, TypeScript & Micro-frontends)',
        summary:
          'Ingeniero de software con más de 8 años de especialización en Frontend Architecture, escalando aplicaciones React y Micro-frontends en entornos FinTech. Enfocado en Core Web Vitals, diseño modular y liderazgo de equipos de ingeniería ágiles para entregar productos robustos a gran escala.',
      },
      experiences: [
        {
          ...DEFAULT_MASTER_CV.experiences[0],
          summary:
            'Liderazgo de 8 ingenieros frontend enfocado en arquitectura de micro-frontends y modernización de interfaces.',
        },
        {
          ...DEFAULT_MASTER_CV.experiences[1],
          summary:
            'Diseño de interfaces financieras de alta fidelidad, pasarelas de pago seguras y componentes accesibles.',
        },
        {
          ...DEFAULT_MASTER_CV.experiences[2],
          included: false, // Hidden for this senior role
        },
      ],
      skillCategories: [
        {
          id: 'cat-1-adapted',
          category: 'Arquitectura Frontend (Enfoque Vacante)',
          skills: ['React 18 / Next.js', 'Micro-frontends & Module Federation', 'TypeScript', 'Tailwind CSS', 'Core Web Vitals & Web Performance', 'Testing (Playwright/Jest)', 'Design Systems'],
          included: true,
        },
        {
          ...DEFAULT_MASTER_CV.skillCategories[1],
        },
        {
          ...DEFAULT_MASTER_CV.skillCategories[2],
        },
      ],
    },
  },
  {
    id: 'cv-mercadolibre-fintech',
    reference: 'Mercado Libre - Laura Talento',
    company: 'Mercado Libre',
    recruiter: 'Laura Gómez',
    targetRole: 'Staff Software Engineer - Payments',
    jobUrl: 'https://careers.mercadolibre.com',
    jobDescription:
      'Staff Engineer para la vertical de pagos digitales. Requiere experiencia profunda en Node.js, TypeScript, PostgreSQL, microservicios resilientes y alta concurrencia.',
    status: 'Enviado',
    salaryExpectation: '70.000€ - 80.000€',
    notes: 'Postulación enviada a través de referral directo. CV adaptado destacando experiencia FinTech y APIs bancarias.',
    createdAt: new Date(Date.now() - 6 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 86400000).toISOString(),
    applicationDate: '2026-09-24',
    template: 'executive',
    cvData: {
      ...DEFAULT_MASTER_CV,
      personal: {
        ...DEFAULT_MASTER_CV.personal,
        headline: 'Staff Software Engineer – Plataformas de Pagos & Sistemas Distribuidos',
        summary:
          'Ingeniero de software con 8+ años de trayectoria diseñando soluciones de pago seguras y sistemas backend distribuidos. Experto en TypeScript, Node.js y bases de datos relacionales, con experiencia procesando millones de transacciones mensuales bajo normativas bancarias de alta resiliencia.',
      },
    },
  },
];
