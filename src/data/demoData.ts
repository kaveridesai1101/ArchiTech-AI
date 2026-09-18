export const demoRequirement = 
  "Build a scalable online learning platform where students can register and log in, browse and purchase courses, watch video lectures, take quizzes, track their progress, and interact with an AI tutor. The system should support secure payments, protect student data, handle increasing users, and keep infrastructure costs optimized.";

export const requirements = [
  { id: 'req-1', category: 'USERS', title: 'Students', icon: 'Users' },
  { id: 'req-2', category: 'SECURITY', title: 'Authentication + Data Protection', icon: 'Shield' },
  { id: 'req-3', category: 'AI', title: 'AI Tutor', icon: 'Bot' },
  { id: 'req-4', category: 'PAYMENT', title: 'Secure Payments', icon: 'CreditCard' },
  { id: 'req-5', category: 'SCALABILITY', title: 'Increasing Users', icon: 'TrendingUp' },
  { id: 'req-6', category: 'DATA', title: 'Courses + Progress + Analytics', icon: 'Database' }
];

export const ragResults = [
  { id: 'rag-1', title: 'Scalable Web Architecture', relevance: 96 },
  { id: 'rag-2', title: 'Secure Authentication Patterns', relevance: 94 },
  { id: 'rag-3', title: 'Payment Security Practices', relevance: 92 },
  { id: 'rag-4', title: 'AI Service Integration', relevance: 90 },
  { id: 'rag-5', title: 'Database Scalability', relevance: 88 },
  { id: 'rag-6', title: 'Cloud Cost Optimization', relevance: 86 }
];

export const agents = [
  {
    id: 'architect',
    title: 'ARCHITECT AGENT',
    icon: 'Building2',
    analyzing: ['System components', 'Frontend', 'Backend', 'Database', 'APIs', 'Scalability'],
    recommendation: 'Modular service-based architecture',
    technologyFocus: 'React + FastAPI + PostgreSQL'
  },
  {
    id: 'security',
    title: 'SECURITY AGENT',
    icon: 'ShieldAlert',
    analyzing: ['Authentication', 'Authorization', 'Payment security', 'Student data', 'API security'],
    recommendation: 'JWT authentication + RBAC + encrypted sensitive data',
    technologyFocus: 'JWT + RBAC + API Security'
  },
  {
    id: 'cost',
    title: 'COST AGENT',
    icon: 'Coins',
    analyzing: ['Infrastructure', 'Database', 'AI usage', 'Storage', 'Cloud resources'],
    recommendation: 'Use scalable managed infrastructure and control AI/service usage.',
    technologyFocus: 'OPTIMIZABLE'
  }
];

export const architectureNodes = [
  { id: 'users', type: 'custom', position: { x: 300, y: 50 }, data: { label: 'USERS', type: 'external', icon: 'Users' } },
  { id: 'frontend', type: 'custom', position: { x: 300, y: 150 }, data: { label: 'React Web / Mobile', type: 'frontend', icon: 'Monitor' } },
  { id: 'api', type: 'custom', position: { x: 300, y: 250 }, data: { label: 'FastAPI API', type: 'backend', icon: 'Server' } },
  { id: 'auth-svc', type: 'custom', position: { x: 50, y: 350 }, data: { label: 'Auth Service', type: 'backend', icon: 'Lock' } },
  { id: 'course-svc', type: 'custom', position: { x: 250, y: 350 }, data: { label: 'Course Service', type: 'backend', icon: 'BookOpen' } },
  { id: 'ai-svc', type: 'custom', position: { x: 500, y: 350 }, data: { label: 'AI Tutor Service', type: 'backend', icon: 'Bot' } },
  { id: 'llm', type: 'custom', position: { x: 500, y: 450 }, data: { label: 'LLM Service', type: 'ai', icon: 'Brain' } },
  { id: 'payment-svc', type: 'custom', position: { x: 50, y: 450 }, data: { label: 'Payment Service', type: 'backend', icon: 'CreditCard' } },
  { id: 'quiz-svc', type: 'custom', position: { x: 250, y: 450 }, data: { label: 'Quiz Service', type: 'backend', icon: 'CheckSquare' } },
  { id: 'progress-svc', type: 'custom', position: { x: 500, y: 550 }, data: { label: 'Progress Service', type: 'backend', icon: 'TrendingUp' } },
  { id: 'payment-gateway', type: 'custom', position: { x: 50, y: 550 }, data: { label: 'Payment Gateway', type: 'external', icon: 'ExternalLink' } },
  { id: 'postgres', type: 'custom', position: { x: 300, y: 650 }, data: { label: 'PostgreSQL', type: 'database', icon: 'Database' } },
  { id: 'storage', type: 'custom', position: { x: 150, y: 750 }, data: { label: 'Video Storage', type: 'storage', icon: 'Video' } },
  { id: 'analytics', type: 'custom', position: { x: 450, y: 750 }, data: { label: 'Analytics', type: 'storage', icon: 'PieChart' } },
];

export const architectureEdges = [
  { id: 'e-user-front', source: 'users', target: 'frontend' },
  { id: 'e-front-api', source: 'frontend', target: 'api' },
  { id: 'e-api-auth', source: 'api', target: 'auth-svc' },
  { id: 'e-api-course', source: 'api', target: 'course-svc' },
  { id: 'e-api-ai', source: 'api', target: 'ai-svc' },
  { id: 'e-ai-llm', source: 'ai-svc', target: 'llm' },
  { id: 'e-auth-payment', source: 'auth-svc', target: 'payment-svc' },
  { id: 'e-course-quiz', source: 'course-svc', target: 'quiz-svc' },
  { id: 'e-ai-progress', source: 'ai-svc', target: 'progress-svc' },
  { id: 'e-payment-gw', source: 'payment-svc', target: 'payment-gateway' },
  { id: 'e-course-db', source: 'course-svc', target: 'postgres' },
  { id: 'e-quiz-db', source: 'quiz-svc', target: 'postgres' },
  { id: 'e-progress-db', source: 'progress-svc', target: 'postgres' },
  { id: 'e-db-storage', source: 'postgres', target: 'storage' },
  { id: 'e-db-analytics', source: 'postgres', target: 'analytics' },
];

export const nodeDetails: Record<string, any> = {
  'users': {
    purpose: 'Students and administrators accessing the platform.',
    technology: 'Web / Mobile Browser',
    integration: 'React Client',
    security: 'HTTPS',
    scaling: 'Global CDN'
  },
  'frontend': {
    purpose: 'User interface for the platform.',
    technology: 'React + Tailwind CSS',
    integration: 'REST APIs',
    security: 'Content Security Policy, XSS Protection',
    scaling: 'Static hosting via CDN'
  },
  'api': {
    purpose: 'Main API Gateway and router.',
    technology: 'FastAPI (Python)',
    integration: 'Microservices',
    security: 'Rate limiting, API Key / JWT verification',
    scaling: 'Auto-scaling groups behind load balancer'
  },
  'auth-svc': {
    purpose: 'Manages user identities and sessions.',
    technology: 'Node.js or Python',
    integration: 'Database, Third-party OAuth',
    security: 'Argon2 password hashing, JWT',
    scaling: 'Stateless, scalable horizontally'
  },
  'course-svc': {
    purpose: 'Handles course catalog, enrollment, and content delivery.',
    technology: 'FastAPI',
    integration: 'PostgreSQL, Video Storage',
    security: 'Role-based access control',
    scaling: 'High read throughput caching (Redis)'
  },
  'ai-svc': {
    purpose: 'Provides personalized assistance to students.',
    technology: 'Python + FastAPI',
    integration: 'LLM Service',
    security: 'Authenticated API access',
    scaling: 'Independent service scaling'
  },
  'llm': {
    purpose: 'Generative AI model for tutoring.',
    technology: 'OpenAI/Gemini API',
    integration: 'AI Tutor Service',
    security: 'API Key rotation, data privacy agreements',
    scaling: 'Managed provider limits'
  },
  'payment-svc': {
    purpose: 'Processes secure payments and subscriptions.',
    technology: 'Node.js',
    integration: 'Stripe / Payment Gateway',
    security: 'PCI-DSS compliance, tokenization',
    scaling: 'High availability, queue-based processing'
  },
  'quiz-svc': {
    purpose: 'Manages assessments and grading.',
    technology: 'FastAPI',
    integration: 'PostgreSQL',
    security: 'Anti-cheating measures',
    scaling: 'Scales during exam periods'
  },
  'progress-svc': {
    purpose: 'Tracks student progress and metrics.',
    technology: 'FastAPI',
    integration: 'PostgreSQL, Analytics',
    security: 'Data isolation per student',
    scaling: 'Event-driven updates'
  },
  'payment-gateway': {
    purpose: 'External payment processor.',
    technology: 'Stripe / PayPal',
    integration: 'Payment Service',
    security: 'External PCI compliance',
    scaling: 'Managed by provider'
  },
  'postgres': {
    purpose: 'Primary relational data store.',
    technology: 'PostgreSQL',
    integration: 'All microservices',
    security: 'Encryption at rest, VPC isolation',
    scaling: 'Read replicas, connection pooling'
  },
  'storage': {
    purpose: 'Stores video lectures and assets.',
    technology: 'AWS S3 / Cloud Storage',
    integration: 'CDN, Course Service',
    security: 'Signed URLs, Private Buckets',
    scaling: 'Virtually infinite storage'
  },
  'analytics': {
    purpose: 'Data warehouse for platform metrics.',
    technology: 'Snowflake / BigQuery',
    integration: 'Data pipelines',
    security: 'Anonymized data pipelines',
    scaling: 'Compute separated from storage'
  }
};

export const securityInsights = [
  'Secure authentication',
  'Role-based access control',
  'Protected payment flow',
  'Encrypted sensitive data',
  'API security'
];

export const scalabilityInsights = [
  'Modular services',
  'Independent service scaling',
  'Database optimization',
  'Caching where required',
  'Stateless API design'
];

export const costInsights = {
  infrastructure: 'MEDIUM',
  database: 'MEDIUM',
  aiUsage: 'MEDIUM',
  storage: 'HIGH',
  overall: 'OPTIMIZABLE'
};

export const technologyRecommendations = {
  Frontend: 'React',
  Backend: 'FastAPI / Python',
  Database: 'PostgreSQL',
  AI: 'LLM Service',
  Authentication: 'JWT + RBAC',
  Storage: 'Object Storage'
};

export const demoFeedback = "Use PostgreSQL instead of the suggested database and add a dedicated payment service.";
