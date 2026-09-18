

// Icons will be imported in the components using the icon names
export type ScenarioId = 'online-learning' | 'ecommerce' | 'healthcare';

export interface Scenario {
  id: ScenarioId;
  projectName: string;
  shortDescription: string;
  requirement: string;
  tags: string[];
  requirementsAnalysis: {
    application: string;
    users: string;
    authentication: string;
    coreFeatures: string;
    customFields: Record<string, string>;
    requirements: Array<{ id: string, category: string, title: string, icon: string }>;
  };
  ragResults: Array<{ id: string, title: string, relevance: number }>;
  agents: Array<{
    id: string;
    title: string;
    icon: string;
    analyzing: string[];
    recommendation: string;
    technologyFocus?: string;
    costLevel?: string;
  }>;
  architectureNodes: any[];
  architectureEdges: any[];
  refinedArchitectureNodes: any[];
  refinedArchitectureEdges: any[];
  nodeDetails: Record<string, any>;
  securityInsights: string[];
  scalabilityInsights: string[];
  costInsights: Record<string, string>;
  technologyStack: Record<string, string>;
  humanFeedback: {
    suggestion: string;
    beforeText: string[];
    afterText: any; // We'll handle rendering in the component
  };
}

const onlineLearningNodes = [
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

const onlineLearningEdges = [
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

const ecommerceNodes = [
  { id: 'users', type: 'custom', position: { x: 400, y: 50 }, data: { label: 'CUSTOMERS', type: 'external', icon: 'Users' } },
  { id: 'frontend', type: 'custom', position: { x: 400, y: 150 }, data: { label: 'React Web / Mobile', type: 'frontend', icon: 'Monitor' } },
  { id: 'api', type: 'custom', position: { x: 400, y: 250 }, data: { label: 'FastAPI API', type: 'backend', icon: 'Server' } },
  
  { id: 'auth-svc', type: 'custom', position: { x: 50, y: 350 }, data: { label: 'Auth Service', type: 'backend', icon: 'Lock' } },
  { id: 'catalog-svc', type: 'custom', position: { x: 250, y: 350 }, data: { label: 'Product Catalog', type: 'backend', icon: 'Server' } },
  { id: 'search-svc', type: 'custom', position: { x: 450, y: 350 }, data: { label: 'Search Service', type: 'backend', icon: 'Search' } },
  { id: 'recommend-svc', type: 'custom', position: { x: 650, y: 350 }, data: { label: 'Recommendation Service', type: 'backend', icon: 'Brain' } },
  
  { id: 'cart-svc', type: 'custom', position: { x: 250, y: 450 }, data: { label: 'Cart Service', type: 'backend', icon: 'Server' } },
  { id: 'search-idx', type: 'custom', position: { x: 450, y: 450 }, data: { label: 'Search Index', type: 'database', icon: 'Database' } },
  { id: 'llm-svc', type: 'custom', position: { x: 650, y: 450 }, data: { label: 'LLM Service', type: 'ai', icon: 'Cpu' } },
  
  { id: 'order-svc', type: 'custom', position: { x: 250, y: 550 }, data: { label: 'Order Service', type: 'backend', icon: 'Server' } },
  { id: 'payment-svc', type: 'custom', position: { x: 50, y: 550 }, data: { label: 'Payment Service', type: 'backend', icon: 'CreditCard' } },
  { id: 'delivery-svc', type: 'custom', position: { x: 450, y: 550 }, data: { label: 'Delivery Tracking', type: 'backend', icon: 'Server' } },
  
  { id: 'payment-gw', type: 'custom', position: { x: 50, y: 650 }, data: { label: 'Payment Gateway', type: 'external', icon: 'ExternalLink' } },
  { id: 'postgres', type: 'custom', position: { x: 250, y: 650 }, data: { label: 'PostgreSQL', type: 'database', icon: 'Database' } },
  { id: 'img-store', type: 'custom', position: { x: 450, y: 650 }, data: { label: 'Image Storage', type: 'storage', icon: 'Cloud' } },
  { id: 'analytics', type: 'custom', position: { x: 650, y: 650 }, data: { label: 'Analytics', type: 'storage', icon: 'PieChart' } },
];

const ecommerceEdges = [
  { id: 'e-u-f', source: 'users', target: 'frontend' },
  { id: 'e-f-a', source: 'frontend', target: 'api' },
  
  { id: 'e-a-auth', source: 'api', target: 'auth-svc' },
  { id: 'e-a-cat', source: 'api', target: 'catalog-svc' },
  { id: 'e-a-search', source: 'api', target: 'search-svc' },
  { id: 'e-a-rec', source: 'api', target: 'recommend-svc' },
  
  { id: 'e-cat-cart', source: 'catalog-svc', target: 'cart-svc' },
  { id: 'e-search-idx', source: 'search-svc', target: 'search-idx' },
  { id: 'e-rec-llm', source: 'recommend-svc', target: 'llm-svc' },
  
  { id: 'e-cart-order', source: 'cart-svc', target: 'order-svc' },
  { id: 'e-order-pay', source: 'order-svc', target: 'payment-svc' },
  { id: 'e-order-del', source: 'order-svc', target: 'delivery-svc' },
  
  { id: 'e-pay-gw', source: 'payment-svc', target: 'payment-gw' },
  { id: 'e-cat-db', source: 'catalog-svc', target: 'postgres' },
  { id: 'e-order-db', source: 'order-svc', target: 'postgres' },
  { id: 'e-cat-img', source: 'catalog-svc', target: 'img-store' },
  { id: 'e-order-ana', source: 'order-svc', target: 'analytics' }
];

const healthcareNodes = [
  { id: 'users', type: 'custom', position: { x: 350, y: 50 }, data: { label: 'PATIENTS & DOCTORS', type: 'external', icon: 'Users' } },
  { id: 'frontend', type: 'custom', position: { x: 350, y: 150 }, data: { label: 'React Web / Mobile', type: 'frontend', icon: 'Monitor' } },
  { id: 'api', type: 'custom', position: { x: 350, y: 250 }, data: { label: 'FastAPI API', type: 'backend', icon: 'Server' } },
  
  { id: 'auth-svc', type: 'custom', position: { x: 50, y: 350 }, data: { label: 'Auth Service', type: 'backend', icon: 'Lock' } },
  { id: 'patient-svc', type: 'custom', position: { x: 250, y: 350 }, data: { label: 'Patient Service', type: 'backend', icon: 'Users' } },
  { id: 'doctor-svc', type: 'custom', position: { x: 450, y: 350 }, data: { label: 'Doctor Service', type: 'backend', icon: 'Server' } },
  { id: 'ai-svc', type: 'custom', position: { x: 650, y: 350 }, data: { label: 'AI Assistant', type: 'backend', icon: 'Bot' } },
  
  { id: 'appt-svc', type: 'custom', position: { x: 250, y: 450 }, data: { label: 'Appointment Service', type: 'backend', icon: 'Server' } },
  { id: 'sched-svc', type: 'custom', position: { x: 450, y: 450 }, data: { label: 'Scheduling Service', type: 'backend', icon: 'Server' } },
  { id: 'llm-svc', type: 'custom', position: { x: 650, y: 450 }, data: { label: 'LLM Service', type: 'ai', icon: 'Brain' } },
  
  { id: 'notif-svc', type: 'custom', position: { x: 450, y: 550 }, data: { label: 'Notification Service', type: 'backend', icon: 'Server' } },
  
  { id: 'postgres', type: 'custom', position: { x: 250, y: 650 }, data: { label: 'PostgreSQL', type: 'database', icon: 'Database' } },
  { id: 'notif-prov', type: 'custom', position: { x: 450, y: 650 }, data: { label: 'Notification Provider', type: 'external', icon: 'ExternalLink' } },
  { id: 'secure-store', type: 'custom', position: { x: 50, y: 650 }, data: { label: 'Secure Storage', type: 'storage', icon: 'Shield' } },
  { id: 'analytics', type: 'custom', position: { x: 650, y: 650 }, data: { label: 'Analytics', type: 'storage', icon: 'PieChart' } },
];

const healthcareEdges = [
  { id: 'h-u-f', source: 'users', target: 'frontend' },
  { id: 'h-f-a', source: 'frontend', target: 'api' },
  
  { id: 'h-a-auth', source: 'api', target: 'auth-svc' },
  { id: 'h-a-pat', source: 'api', target: 'patient-svc' },
  { id: 'h-a-doc', source: 'api', target: 'doctor-svc' },
  { id: 'h-a-ai', source: 'api', target: 'ai-svc' },
  
  { id: 'h-pat-appt', source: 'patient-svc', target: 'appt-svc' },
  { id: 'h-doc-sched', source: 'doctor-svc', target: 'sched-svc' },
  { id: 'h-ai-llm', source: 'ai-svc', target: 'llm-svc' },
  
  { id: 'h-appt-sched', source: 'appt-svc', target: 'sched-svc' },
  { id: 'h-appt-notif', source: 'appt-svc', target: 'notif-svc' },
  
  { id: 'h-pat-db', source: 'patient-svc', target: 'postgres' },
  { id: 'h-doc-db', source: 'doctor-svc', target: 'postgres' },
  { id: 'h-appt-db', source: 'appt-svc', target: 'postgres' },
  
  { id: 'h-notif-prov', source: 'notif-svc', target: 'notif-prov' },
  { id: 'h-pat-store', source: 'patient-svc', target: 'secure-store' },
  { id: 'h-appt-ana', source: 'appt-svc', target: 'analytics' }
];

export const scenarios: Record<ScenarioId, Scenario> = {
  'online-learning': {
    id: 'online-learning',
    projectName: 'Online Learning Platform',
    shortDescription: 'Scalable AI-powered learning platform for students.',
    requirement: "Build a scalable online learning platform where students can register and log in, browse and purchase courses, watch video lectures, take quizzes, track their progress, and interact with an AI tutor. The system should support secure payments, protect student data, handle increasing users, and keep infrastructure costs optimized.",
    tags: ['Scalable', 'Secure', 'AI-Powered', 'Cost Optimized'],
    requirementsAnalysis: {
      application: 'Online Learning Platform',
      users: 'Students',
      authentication: 'Registration + Login',
      coreFeatures: 'Courses, Video Lectures, Quizzes',
      customFields: {
        'Payment': 'Online Payment',
        'AI': 'AI Tutor',
      },
      requirements: [
        { id: 'req-1', category: 'USERS', title: 'Students', icon: 'Users' },
        { id: 'req-2', category: 'SECURITY', title: 'Authentication + Data Protection', icon: 'Shield' },
        { id: 'req-3', category: 'AI', title: 'AI Tutor', icon: 'Bot' },
        { id: 'req-4', category: 'PAYMENT', title: 'Secure Payments', icon: 'CreditCard' },
        { id: 'req-5', category: 'SCALABILITY', title: 'Increasing Users', icon: 'TrendingUp' },
        { id: 'req-6', category: 'DATA', title: 'Courses + Progress + Analytics', icon: 'Database' }
      ]
    },
    ragResults: [
      { id: 'rag-1', title: 'Scalable Web Architecture', relevance: 96 },
      { id: 'rag-2', title: 'Secure Authentication Patterns', relevance: 94 },
      { id: 'rag-3', title: 'Payment Security Practices', relevance: 92 },
      { id: 'rag-4', title: 'AI Service Integration', relevance: 90 },
      { id: 'rag-5', title: 'Database Scalability', relevance: 88 },
      { id: 'rag-6', title: 'Cloud Cost Optimization', relevance: 86 }
    ],
    agents: [
      {
        id: 'architect', title: 'ARCHITECT AGENT', icon: 'Building2',
        analyzing: ['System components', 'Frontend', 'Backend', 'Database', 'APIs', 'Scalability'],
        recommendation: 'Modular service-based architecture',
        technologyFocus: 'React + FastAPI + PostgreSQL'
      },
      {
        id: 'security', title: 'SECURITY AGENT', icon: 'ShieldAlert',
        analyzing: ['Authentication', 'Authorization', 'Payment security', 'Student data', 'API security'],
        recommendation: 'JWT authentication + RBAC + encrypted sensitive data',
        technologyFocus: 'JWT + RBAC + API Security'
      },
      {
        id: 'cost', title: 'COST AGENT', icon: 'Coins',
        analyzing: ['Infrastructure', 'Database', 'AI usage', 'Storage', 'Cloud resources'],
        recommendation: 'Use scalable managed infrastructure and control AI/service usage.',
        costLevel: 'OPTIMIZABLE'
      }
    ],
    architectureNodes: onlineLearningNodes,
    architectureEdges: onlineLearningEdges,
    refinedArchitectureNodes: onlineLearningNodes,
    refinedArchitectureEdges: onlineLearningEdges,
    nodeDetails: {
      'users': { purpose: 'Students and administrators accessing the platform.', technology: 'Web / Mobile Browser', integration: 'React Client', security: 'HTTPS', scaling: 'Global CDN' },
      'frontend': { purpose: 'User interface for the platform.', technology: 'React + Tailwind CSS', integration: 'REST APIs', security: 'Content Security Policy, XSS Protection', scaling: 'Static hosting via CDN' },
      'api': { purpose: 'Main API Gateway and router.', technology: 'FastAPI (Python)', integration: 'Microservices', security: 'Rate limiting, API Key / JWT verification', scaling: 'Auto-scaling groups behind load balancer' },
      'auth-svc': { purpose: 'Manages user identities and sessions.', technology: 'Node.js or Python', integration: 'Database, Third-party OAuth', security: 'Argon2 password hashing, JWT', scaling: 'Stateless, scalable horizontally' },
      'course-svc': { purpose: 'Handles course catalog, enrollment, and content delivery.', technology: 'FastAPI', integration: 'PostgreSQL, Video Storage', security: 'Role-based access control', scaling: 'High read throughput caching (Redis)' },
      'ai-svc': { purpose: 'Provides personalized assistance to students.', technology: 'Python + FastAPI', integration: 'LLM Service', security: 'Authenticated API access', scaling: 'Independent service scaling' },
      'llm': { purpose: 'Generative AI model for tutoring.', technology: 'OpenAI/Gemini API', integration: 'AI Tutor Service', security: 'API Key rotation, data privacy agreements', scaling: 'Managed provider limits' },
      'payment-svc': { purpose: 'Processes secure payments and subscriptions.', technology: 'Node.js', integration: 'Stripe / Payment Gateway', security: 'PCI-DSS compliance, tokenization', scaling: 'High availability, queue-based processing' },
      'quiz-svc': { purpose: 'Manages assessments and grading.', technology: 'FastAPI', integration: 'PostgreSQL', security: 'Anti-cheating measures', scaling: 'Scales during exam periods' },
      'progress-svc': { purpose: 'Tracks student progress and metrics.', technology: 'FastAPI', integration: 'PostgreSQL, Analytics', security: 'Data isolation per student', scaling: 'Event-driven updates' },
      'payment-gateway': { purpose: 'External payment processor.', technology: 'Stripe / PayPal', integration: 'Payment Service', security: 'External PCI compliance', scaling: 'Managed by provider' },
      'postgres': { purpose: 'Primary relational data store.', technology: 'PostgreSQL', integration: 'All microservices', security: 'Encryption at rest, VPC isolation', scaling: 'Read replicas, connection pooling' },
      'storage': { purpose: 'Stores video lectures and assets.', technology: 'AWS S3 / Cloud Storage', integration: 'CDN, Course Service', security: 'Signed URLs, Private Buckets', scaling: 'Virtually infinite storage' },
      'analytics': { purpose: 'Data warehouse for platform metrics.', technology: 'Snowflake / BigQuery', integration: 'Data pipelines', security: 'Anonymized data pipelines', scaling: 'Compute separated from storage' }
    },
    securityInsights: ['Secure authentication', 'Role-based access control', 'Protected payment flow', 'Encrypted sensitive data', 'API security'],
    scalabilityInsights: ['Modular services', 'Independent service scaling', 'Database optimization', 'Caching where required', 'Stateless API design'],
    costInsights: { infrastructure: 'MEDIUM', database: 'MEDIUM', aiUsage: 'MEDIUM', storage: 'HIGH', overall: 'OPTIMIZABLE' },
    technologyStack: { Frontend: 'React', Backend: 'FastAPI / Python', Database: 'PostgreSQL', AI: 'LLM Service', Authentication: 'JWT + RBAC', Storage: 'Object Storage' },
    humanFeedback: {
      suggestion: 'Use PostgreSQL instead of the suggested database and add a dedicated payment service.',
      beforeText: ['Backend', 'Database'],
      afterText: 'learning'
    }
  },
  'ecommerce': {
    id: 'ecommerce',
    projectName: 'E-Commerce Platform',
    shortDescription: 'Scalable online shopping platform with secure payments and AI recommendations.',
    requirement: "Build a scalable e-commerce platform where customers can register and log in, browse products, search and filter products, add items to a cart, place orders, make secure online payments, track deliveries, and receive AI-powered product recommendations. The system should protect customer data, support increasing traffic during high-demand sales, and keep infrastructure costs optimized.",
    tags: ['Scalable', 'Secure', 'AI Recommendations', 'Payment'],
    requirementsAnalysis: {
      application: 'E-Commerce Platform',
      users: 'Customers and Administrators',
      authentication: 'Registration + Login',
      coreFeatures: 'Product Catalog, Search, Cart, Orders, Delivery Tracking',
      customFields: {
        'Payment': 'Secure Online Payment',
        'AI': 'Product Recommendation Service',
        'Scalability': 'High Traffic During Sales'
      },
      requirements: [
        { id: 'req-1', category: 'USERS', title: 'Customers', icon: 'Users' },
        { id: 'req-2', category: 'SECURITY', title: 'Data + Payment Protection', icon: 'Shield' },
        { id: 'req-3', category: 'AI', title: 'Recommendations', icon: 'Brain' },
        { id: 'req-4', category: 'PAYMENT', title: 'Online Payments', icon: 'CreditCard' },
        { id: 'req-5', category: 'SCALABILITY', title: 'High Traffic', icon: 'TrendingUp' },
        { id: 'req-6', category: 'FEATURES', title: 'Catalog, Cart, Orders', icon: 'Database' }
      ]
    },
    ragResults: [
      { id: 'rag-1', title: 'Scalable E-Commerce Architecture', relevance: 97 },
      { id: 'rag-2', title: 'Secure Payment Processing Patterns', relevance: 95 },
      { id: 'rag-3', title: 'Product Search and Catalog Architecture', relevance: 93 },
      { id: 'rag-4', title: 'Recommendation System Integration', relevance: 91 },
      { id: 'rag-5', title: 'High-Traffic Scalability Patterns', relevance: 89 },
      { id: 'rag-6', title: 'Cloud Infrastructure Cost Optimization', relevance: 87 }
    ],
    agents: [
      {
        id: 'architect', title: 'ARCHITECT AGENT', icon: 'Building2',
        analyzing: ['Product catalog', 'Search', 'Shopping cart', 'Order management', 'Database', 'Scalability'],
        recommendation: 'Modular service-based architecture with independently scalable product, order and payment services.',
        technologyFocus: 'React + FastAPI + PostgreSQL'
      },
      {
        id: 'security', title: 'SECURITY AGENT', icon: 'ShieldAlert',
        analyzing: ['Customer authentication', 'Authorization', 'Payment security', 'Customer data', 'API protection'],
        recommendation: 'JWT authentication + RBAC + secure payment gateway integration + encrypted sensitive data.',
        technologyFocus: 'JWT + RBAC + API Security'
      },
      {
        id: 'cost', title: 'COST AGENT', icon: 'Coins',
        analyzing: ['Compute infrastructure', 'Database', 'Product storage', 'Search infrastructure', 'AI recommendation usage'],
        recommendation: 'Scale high-traffic services independently and optimize AI recommendation usage.',
        costLevel: 'OPTIMIZABLE'
      }
    ],
    architectureNodes: ecommerceNodes,
    architectureEdges: ecommerceEdges,
    refinedArchitectureNodes: ecommerceNodes,
    refinedArchitectureEdges: ecommerceEdges,
    nodeDetails: {
      'catalog-svc': { purpose: 'Manages product information, categories and inventory-related data.', technology: 'FastAPI / Python', integration: 'Database, Image Storage', security: 'Role-based access control', scaling: 'High read throughput scaling' },
      'search-svc': { purpose: 'Provides product search and filtering.', technology: 'Search index + API service', integration: 'Search Index', security: 'Rate limiting', scaling: 'Can scale independently during high traffic.' },
      'payment-svc': { purpose: 'Handles secure payment workflow.', technology: 'Node.js', integration: 'Payment Gateway', security: 'Protected payment requests and authenticated access.', scaling: 'High availability' },
      'recommend-svc': { purpose: 'Provides AI-powered product recommendations.', technology: 'Python + FastAPI', integration: 'LLM / recommendation service', security: 'Authenticated service-to-service communication.', scaling: 'GPU/compute optimized scaling' }
    },
    securityInsights: ['PCI-DSS compliant payment flow', 'Encrypted customer PII', 'Secure session management', 'API rate limiting against bots', 'Role-based access control'],
    scalabilityInsights: ['Search index decoupling', 'Independent service scaling during sales', 'Read-heavy catalog caching', 'Asynchronous order processing', 'CDN for product images'],
    costInsights: { infrastructure: 'HIGH', database: 'MEDIUM', aiUsage: 'MEDIUM', storage: 'MEDIUM', overall: 'OPTIMIZABLE' },
    technologyStack: { Frontend: 'React', Backend: 'FastAPI / Node', Database: 'PostgreSQL', AI: 'Recommendation Engine', Authentication: 'JWT + OAuth', Storage: 'Object Storage' },
    humanFeedback: {
      suggestion: 'Add a dedicated search service and keep payment processing isolated from the order service.',
      beforeText: ['Application', 'Product + Order + Payment'],
      afterText: 'ecommerce'
    }
  },
  'healthcare': {
    id: 'healthcare',
    projectName: 'Healthcare Appointment Platform',
    shortDescription: 'Secure appointment and healthcare service platform.',
    requirement: "Build a secure healthcare appointment platform where patients can register and log in, search for doctors, view available time slots, book and cancel appointments, receive notifications, and interact with an AI assistant for basic appointment guidance. Doctors should be able to manage their schedules, while the system must protect sensitive patient information, support increasing users, and maintain optimized infrastructure costs.",
    tags: ['Secure', 'Privacy', 'Scalable', 'AI-Assisted'],
    requirementsAnalysis: {
      application: 'Healthcare Appointment Platform',
      users: 'Patients, Doctors, Administrators',
      authentication: 'Secure Registration + Login',
      coreFeatures: 'Doctor Search, Availability, Appointment Booking, Cancellation',
      customFields: {
        'Scheduling': 'Doctor Schedule Management',
        'AI': 'AI Appointment Assistant',
        'Notifications': 'Appointment Reminders',
        'Security': 'Sensitive Patient Data Protection'
      },
      requirements: [
        { id: 'req-1', category: 'USERS', title: 'Patients & Doctors', icon: 'Users' },
        { id: 'req-2', category: 'SECURITY', title: 'Patient Data Privacy', icon: 'Shield' },
        { id: 'req-3', category: 'AI', title: 'Appointment Assistant', icon: 'Bot' },
        { id: 'req-4', category: 'SCHEDULING', title: 'Availability & Booking', icon: 'CheckSquare' },
        { id: 'req-5', category: 'NOTIFICATIONS', title: 'Reminders', icon: 'Server' },
        { id: 'req-6', category: 'SCALABILITY', title: 'Increasing Users', icon: 'TrendingUp' }
      ]
    },
    ragResults: [
      { id: 'rag-1', title: 'Secure Healthcare Application Architecture', relevance: 98 },
      { id: 'rag-2', title: 'Privacy-Aware Authentication Patterns', relevance: 96 },
      { id: 'rag-3', title: 'Appointment Scheduling Architecture', relevance: 94 },
      { id: 'rag-4', title: 'Notification Service Integration', relevance: 91 },
      { id: 'rag-5', title: 'Scalable Database Design', relevance: 89 },
      { id: 'rag-6', title: 'AI Assistant Integration Patterns', relevance: 87 }
    ],
    agents: [
      {
        id: 'architect', title: 'ARCHITECT AGENT', icon: 'Building2',
        analyzing: ['Patient portal', 'Doctor portal', 'Appointment service', 'Scheduling', 'Database', 'Notifications', 'Scalability'],
        recommendation: 'Modular service architecture separating appointment, user and notification responsibilities.',
        technologyFocus: 'React + FastAPI + PostgreSQL'
      },
      {
        id: 'security', title: 'SECURITY AGENT', icon: 'ShieldAlert',
        analyzing: ['Patient authentication', 'Role-based access', 'Sensitive information', 'API security', 'Data protection'],
        recommendation: 'JWT authentication + RBAC + encrypted sensitive data + protected APIs.',
        technologyFocus: 'HIPAA Compliant Security'
      },
      {
        id: 'cost', title: 'COST AGENT', icon: 'Coins',
        analyzing: ['Application infrastructure', 'Database', 'Notification services', 'AI assistant usage', 'Storage'],
        recommendation: 'Use independently scalable services and control AI usage according to demand.',
        costLevel: 'OPTIMIZABLE'
      }
    ],
    architectureNodes: healthcareNodes,
    architectureEdges: healthcareEdges,
    refinedArchitectureNodes: healthcareNodes,
    refinedArchitectureEdges: healthcareEdges,
    nodeDetails: {
      'patient-svc': { purpose: 'Manages patient records and profiles.', technology: 'FastAPI / Python', integration: 'Database, Secure Storage', security: 'HIPAA compliant encryption', scaling: 'Standard scaling' },
      'doctor-svc': { purpose: 'Manages doctor profiles, specialties and availability.', technology: 'FastAPI / Python', integration: 'Database', security: 'Role-based access', scaling: 'Standard scaling' },
      'appt-svc': { purpose: 'Handles appointment booking, cancellation and history.', technology: 'FastAPI / Python', integration: 'Scheduling Service, Notification Service', security: 'Authenticated patient/doctor access', scaling: 'High availability' },
      'sched-svc': { purpose: 'Complex logic for time slots and conflicts.', technology: 'FastAPI / Python', integration: 'Appointment Service', security: 'Internal API access', scaling: 'Compute optimized scaling' },
      'notif-svc': { purpose: 'Sends SMS/Email reminders for appointments.', technology: 'Node.js', integration: 'External Notification Provider', security: 'Encrypted message payload', scaling: 'Queue-based asynchronous scaling' }
    },
    securityInsights: ['HIPAA compliant data storage', 'End-to-end encryption for patient data', 'Strict Role-Based Access Control', 'Audit logging for health records', 'Secure API gateways'],
    scalabilityInsights: ['Asynchronous notification queues', 'Decoupled scheduling logic', 'Independent portal scaling', 'Read replicas for doctor search', 'Stateless service design'],
    costInsights: { infrastructure: 'MEDIUM', database: 'HIGH', aiUsage: 'LOW', storage: 'MEDIUM', overall: 'OPTIMIZABLE' },
    technologyStack: { Frontend: 'React', Backend: 'FastAPI / Python', Database: 'PostgreSQL', AI: 'AI Assistant', Authentication: 'Secure JWT', Storage: 'Encrypted Storage' },
    humanFeedback: {
      suggestion: 'Separate appointment scheduling from the main API and add a dedicated notification service.',
      beforeText: ['API', 'Appointments'],
      afterText: 'healthcare'
    }
  }
};
