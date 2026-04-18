export const currentUser = {
  name: 'Shraddha Jain',
  email: 'shraddha@docuwise.ai',
  role: 'Free plan',
  initials: 'SJ',
}

export const topNavItems = [
  { id: 'home', label: 'Home' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'analyse', label: 'Analyse' },
  { id: 'collaboration', label: 'Collaboration' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'api', label: 'API' },
]

export const workspaceNav = {
  workspace: [
    { id: 'dashboard', label: 'Overview', icon: '◫' },
    { id: 'upload', label: 'New analysis', icon: '↯' },
    { id: 'library', label: 'Document library', icon: '▣', badge: '24' },
  ],
  tools: [
    { id: 'collaboration', label: 'Collaboration', icon: 'Co' },
    { id: 'analytics', label: 'Analytics', icon: '◌' },
    { id: 'compare', label: 'Compare docs', icon: '⋮' },
    { id: 'batchupload', label: 'Batch upload', icon: '⇪' },
    { id: 'api', label: 'API & webhooks', icon: '⌁' },
  ],
  account: [{ id: 'profile', label: 'Settings', icon: '⚙' }],
}

export const notifications = [
  {
    id: 1,
    title: 'New analysis complete',
    message: 'report_q3_2024.pdf summary is ready to review.',
    time: 'Just now',
    read: false,
  },
  {
    id: 2,
    title: 'Library updated',
    message: 'market_research.docx was added to your workspace.',
    time: '10 min ago',
    read: false,
  },
  {
    id: 3,
    title: 'Weekly usage',
    message: 'Unlimited analyses available',
    time: '1 hr ago',
    read: true,
  },
]

export const heroFeatures = [
  'No signup required to try',
  'Files deleted after processing',
  'End-to-end encrypted',
]

export const analysisModes = [
  {
    title: 'Categorization',
    description: 'Topics, domain, document type, auto-labelled',
    accent: 'bg-emerald-50 text-emerald-600',
  },
  {
    title: 'Summarization',
    description: 'Key points distilled into a clear, readable summary',
    accent: 'bg-amber-50 text-amber-600',
  },
  {
    title: 'Sentiment analysis',
    description: 'Positive, negative, neutral with confidence scores',
    accent: 'bg-rose-50 text-rose-600',
  },
  {
    title: 'Entity extraction',
    description: 'Names, dates, organizations, and locations pulled out',
    accent: 'bg-violet-50 text-violet-600',
  },
  {
    title: 'Document Q&A',
    description: 'Ask questions and get grounded answers from the text',
    accent: 'bg-sky-50 text-sky-600',
  },
  {
    title: 'Keyword extraction',
    description: 'Ranked key phrases and concepts from full text',
    accent: 'bg-emerald-50 text-emerald-600',
  },
  {
    title: 'Translation',
    description: 'Get results translated into any supported language',
    accent: 'bg-amber-50 text-amber-600',
  },
  {
    title: 'Batch processing',
    description: 'Upload and analyze multiple documents at once',
    accent: 'bg-rose-50 text-rose-600',
  },
]

export const workflowSteps = [
  {
    id: '1',
    title: 'Upload your file',
    description:
      'Drag and drop or browse to upload any .txt, .pdf, or .docx document. Files up to 50MB are supported.',
  },
  {
    id: '2',
    title: 'Choose your analysis',
    description:
      'Select categorization, summarization, sentiment analysis, Q&A, entity extraction, or run them together.',
  },
  {
    id: '3',
    title: 'Export and share',
    description:
      'Copy your results, download as PDF or DOCX, share a link, or push to your own systems via webhook.',
  },
]

export const pricingTiers = [
  {
    name: 'Free',
    price: '$0',
    meta: '/ month',
    description: 'Perfect for trying DocuWise',
    cta: 'Get started free',
    featured: false,
    features: [
      '5 analyses per month',
      'All 3 core modes',
      'Up to 10MB per file',
      'Basic document Q&A',
      'Export as text',
    ],
  },
  {
    name: 'Pro',
    price: '$19',
    meta: '/ month',
    description: 'For individuals and professionals',
    cta: 'Start Pro trial',
    featured: true,
    features: [
      'Unlimited analyses',
      'All AI modes + entity extraction',
      'Up to 50MB per file',
      'Document history & library',
      'Export PDF, DOCX, CSV',
      'Priority processing',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    meta: '',
    description: 'For teams and organizations',
    cta: 'Contact sales',
    featured: false,
    features: [
      'Everything in Pro',
      'Team workspace & roles',
      'SSO / SAML auth',
      'REST API + webhooks',
      'Audit logs & compliance',
      'SLA & dedicated support',
    ],
  },
]

export const documents = [
  {
    id: 'doc-1',
    title: 'annual_report_2024.pdf',
    uploadDate: 'Apr 11, 2026',
    category: 'Financial report',
    sentiment: 'Positive',
    summary:
      'The Q3 2024 report highlights 18% YoY revenue growth led by North America and a 94% retention rate.',
    textPreview:
      'This quarterly report covers the period from July 2024 to September 2024. Overall, the company has shown strong performance...',
    fullText:
      'This quarterly report covers the period from July 2024 to September 2024. Overall, the company has shown strong performance across all major business units, with revenue growing 18% year-over-year. The North American division reported exceptional growth in SaaS subscriptions, while EMEA faced headwinds due to macroeconomic pressures and currency fluctuations. Looking forward, Q4 guidance has been revised upward with strong pipeline momentum.',
    keywords: ['Revenue growth', 'North America', 'EMEA', 'Q3 2024', 'SaaS'],
    related: ['market_research.docx', 'board_update_q4.pdf'],
    type: 'PDF',
    mode: 'Summarization',
    dateBucket: 'Last 7 days',
  },
  {
    id: 'doc-2',
    title: 'customer_feedback.docx',
    uploadDate: 'Apr 10, 2026',
    category: 'Customer insights',
    sentiment: 'Negative',
    summary:
      'Feedback clusters around onboarding friction, slower support response, and requests for better reporting.',
    textPreview:
      'Customer sentiment trends show recurring complaints around implementation time and inconsistent success handoffs...',
    fullText:
      'Customer sentiment trends show recurring complaints around implementation time and inconsistent success handoffs. Positive feedback focused on product flexibility, while negative feedback centered on response time and dashboard complexity.',
    keywords: ['Onboarding', 'Support', 'Reporting', 'Retention'],
    related: ['meeting_notes_q1.txt', 'product_spec_v3.txt'],
    type: 'DOCX',
    mode: 'Sentiment',
    dateBucket: 'Last 7 days',
  },
  {
    id: 'doc-3',
    title: 'product_spec_v3.txt',
    uploadDate: 'Apr 9, 2026',
    category: 'Product spec',
    sentiment: 'Neutral',
    summary:
      'The product spec outlines taxonomy changes, new metadata rules, and a revised upload workflow.',
    textPreview:
      'Version three introduces a modular ingestion layer, category confidence thresholds, and document relationship mapping...',
    fullText:
      'Version three introduces a modular ingestion layer, category confidence thresholds, and document relationship mapping. The spec clarifies ingestion rules, validation states, and taxonomy controls for enterprise workspaces.',
    keywords: ['Taxonomy', 'Metadata', 'Workflow'],
    related: ['annual_report_2024.pdf', 'legal_agreement.pdf'],
    type: 'TXT',
    mode: 'Categorization',
    dateBucket: 'Last 7 days',
  },
  {
    id: 'doc-4',
    title: 'legal_agreement.pdf',
    uploadDate: 'Apr 8, 2026',
    category: 'Legal',
    sentiment: 'Neutral',
    summary:
      'Contract highlights include updated indemnity terms, revised SLAs, and a tighter renewal timeline.',
    textPreview:
      'The agreement revises liability caps, clarifies notice periods, and standardizes renewal milestones for both parties...',
    fullText:
      'The agreement revises liability caps, clarifies notice periods, and standardizes renewal milestones for both parties. A new escalation clause is included for data breach notifications and service disruption events.',
    keywords: ['SLA', 'Renewal', 'Liability'],
    related: ['annual_report_2024.pdf', 'meeting_notes_q1.txt'],
    type: 'PDF',
    mode: 'Summarization',
    dateBucket: 'Last 7 days',
  },
  {
    id: 'doc-5',
    title: 'market_research.docx',
    uploadDate: 'Apr 7, 2026',
    category: 'Research',
    sentiment: 'Positive',
    summary:
      'Market signals show strong expansion in AI document tooling, especially in regulated workflows.',
    textPreview:
      'Research indicates rising demand for explainable AI outputs, compliance-friendly storage, and retrieval-augmented interfaces...',
    fullText:
      'Research indicates rising demand for explainable AI outputs, compliance-friendly storage, and retrieval-augmented interfaces. Buyers increasingly value auditability, workflow integrations, and strong export options.',
    keywords: ['AI tooling', 'Compliance', 'Exports'],
    related: ['annual_report_2024.pdf', 'product_spec_v3.txt'],
    type: 'DOCX',
    mode: 'Sentiment',
    dateBucket: 'Last 7 days',
  },
  {
    id: 'doc-6',
    title: 'meeting_notes_q1.txt',
    uploadDate: 'Apr 6, 2026',
    category: 'Operations',
    sentiment: 'Neutral',
    summary:
      'Meeting notes summarize roadmap tradeoffs, enterprise asks, and documentation gaps that need resolution.',
    textPreview:
      'The team aligned on prioritizing batch upload, shared libraries, and export workflows ahead of advanced automations...',
    fullText:
      'The team aligned on prioritizing batch upload, shared libraries, and export workflows ahead of advanced automations. Open questions remain around permissions, audit views, and template handling.',
    keywords: ['Roadmap', 'Enterprise', 'Permissions'],
    related: ['market_research.docx', 'legal_agreement.pdf'],
    type: 'TXT',
    mode: 'Categorization',
    dateBucket: 'Last 30 days',
  },
]

export const defaultFilters = {
  category: 'All',
  sentiment: 'All',
  dateRange: 'Any time',
}

export const filterOptions = {
  category: ['All', 'Financial report', 'Customer insights', 'Product spec', 'Legal', 'Research', 'Operations'],
  sentiment: ['All', 'Positive', 'Neutral', 'Negative'],
  dateRange: ['Any time', 'Last 7 days', 'Last 30 days', 'This year'],
}

export const dashboardStats = [
  { label: 'Documents analysed', value: '24', hint: '↑ 8 this week', tone: 'text-emerald-600' },
{ label: 'Analyses', value: 'Unlimited',tone: 'text-emerald-600' },
  { label: 'Avg. analysis time', value: '1.2s', hint: '↑ 12% faster', tone: 'text-emerald-600' },
  { label: 'Accuracy score', value: '97%', hint: 'Excellent', tone: 'text-emerald-600' },
]

export const analyticsData = {
  categories: [
    { label: 'Financial', value: 24, color: 'bg-[#5a9be0]' },
    { label: 'Research', value: 18, color: 'bg-[#f2b75e]' },
    { label: 'Legal', value: 14, color: 'bg-[#7cc6a8]' },
    { label: 'Product', value: 22, color: 'bg-[#ef8f7a]' },
    { label: 'Other', value: 22, color: 'bg-[#b8c0d9]' },
  ],
  sentiment: [
    { label: 'Positive', value: 68 },
    { label: 'Neutral', value: 20 },
    { label: 'Negative', value: 12 },
  ],
  uploads: [
    { label: 'Mon', value: 4 },
    { label: 'Tue', value: 7 },
    { label: 'Wed', value: 5 },
    { label: 'Thu', value: 9 },
    { label: 'Fri', value: 6 },
    { label: 'Sat', value: 3 },
    { label: 'Sun', value: 2 },
  ],
  keywords: [
    'Revenue growth',
    'North America',
    'Compliance',
    'Onboarding',
    'SaaS',
    'Exports',
    'EMEA',
    'Retention',
    'Metadata',
    'Roadmap',
  ],
}

export const analysisSummary = {
  summary:
    'The Q3 2024 report highlights 18% YoY revenue growth led by North America\'s enterprise SaaS gains and 94% retention rate. EMEA declined 3% due to macro pressures. Q4 guidance was revised upward with strong pipeline and November product launches ahead.',
  sentimentBreakdown: [
    { label: 'Positive', value: 68, tone: 'bg-emerald-500 text-emerald-600' },
    { label: 'Neutral', value: 20, tone: 'bg-stone-400 text-stone-500' },
    { label: 'Negative', value: 12, tone: 'bg-rose-500 text-rose-500' },
  ],
  categories: ['Financial report', 'Q3 2024', 'SaaS', 'Revenue growth', 'Enterprise', 'EMEA'],
  entities: ['Sarah Chen', 'North America', 'EMEA', 'November', 'Q4 guidance'],
}

export const highlightedParagraphs = [
  [
    { text: 'This quarterly report', tone: 'bg-sky-100' },
    { text: ' covers the period from July 2024 to September 2024. Overall, the company has shown ' },
    { text: 'strong performance', tone: 'bg-emerald-100' },
    { text: ' across all major business units, with ' },
    { text: 'revenue growing 18% year-over-year', tone: 'bg-emerald-100' },
    { text: '.' },
  ],
  [
    { text: 'The North American division', tone: 'bg-sky-100' },
    { text: ', led by Sarah Chen, reported ' },
    { text: 'exceptional growth in SaaS subscriptions', tone: 'bg-emerald-100' },
    { text: ', driven by increased demand in the enterprise segment. ' },
    { text: 'Customer retention', tone: 'bg-sky-100' },
    { text: ' remains at an ' },
    { text: 'all-time high of 94%', tone: 'bg-emerald-100' },
    { text: '.' },
  ],
  [
    { text: 'However, the EMEA region', tone: 'bg-sky-100' },
    { text: ' faced ' },
    { text: 'headwinds due to macroeconomic pressures', tone: 'bg-rose-100' },
    { text: ' and ' },
    { text: 'currency fluctuations', tone: 'bg-rose-100' },
    { text: ', resulting in a ' },
    { text: 'modest 3% decline in local currency terms', tone: 'bg-rose-100' },
    { text: '.' },
  ],
  [
    { text: 'Looking forward, Q4 guidance', tone: 'bg-sky-100' },
    { text: ' has been revised upward to reflect ' },
    { text: 'strong pipeline momentum', tone: 'bg-emerald-100' },
    { text: ' and ' },
    { text: 'new product launches', tone: 'bg-sky-100' },
    { text: ' planned for November. The board remains ' },
    { text: 'confident in the company’s long-term strategy', tone: 'bg-emerald-100' },
    { text: '.' },
  ],
]
