export type UserRole = 'brand' | 'creator' | 'admin';

export interface BrandDetails {
  industry?: string;
  companySize?: string;
  website?: string;
  budgetRange?: string;
  billingCountry?: string;
}

export interface CreatorVerificationData {
  verifiedTier: string;
  overallScore: number;
  certificateId: string;
  breakdown: {
    temporalConsistency: number;
    toolchainDepth: number;
    commercialIPCompliance: number;
    promptEngineering: number;
    deliverySLA: number;
  };
  summary: string;
  verifiedBadges: string[];
  recommendedProjectBudget?: string;
  tools?: string[];
  portfolioUrl?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  title: string;
  company?: string;
  avatar: string;
  badge?: string;
  brandDetails?: BrandDetails;
  creatorVerification?: CreatorVerificationData;
}

export interface PortfolioItem {
  id: string;
  title: string;
  tag: string;
  category: 'commercials' | 'narrative' | 'vfx';
  duration: string;
  resolution: string;
  verifiedStatus: string;
  tools: string[];
  description: string;
  workflow: string;
  generativePercentage: number;
  humanPercentage: number;
  humanLabel: string;
  format: string;
  licensing: string;
  thumbnail: string;
  altText: string;
  seedAudited: boolean;
  festivalCredit?: string;
}

export interface PricingPackage {
  tier: string;
  name: string;
  subtitle: string;
  price: number;
  turnaround: string;
  popular?: boolean;
  deliverables: string[];
}

export interface Review {
  id: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  date: string;
  project: string;
  comment: string;
}

export interface BrandBriefOpportunity {
  id: string;
  title: string;
  brandName: string;
  brandLogo: string;
  industry: string;
  budget: number;
  escrowStatus: 'Escrow Vault Funded' | 'Escrow Ready' | 'Active Milestone 1';
  duration: string;
  turnaroundDays: string;
  deadline: string;
  requiredTools: string[];
  deliverables: string[];
  objective: string;
  description: string;
  visualStyle: string;
  commercialIndemnityRequired: boolean;
  proposalsCount: number;
  hiringManager: {
    name: string;
    role: string;
    avatar: string;
  };
}

export interface BrandClientProfile {
  id: string;
  name: string;
  logo: string;
  industry: string;
  location: string;
  totalSpentOnGenerativeAI: string;
  campaignsCompleted: number;
  openBriefsCount: number;
  paymentScore: number;
  escrowReliability: string;
  description: string;
  verifiedEnterprise: boolean;
  activeBriefs: string[];
}

export interface Creator {
  id: string;
  name: string;
  avatar: string;
  specialization: string;
  roleDescription: string;
  rating: number;
  reviewCount: number;
  turnaroundDays: string;
  indicativeRate: number;
  rateUnit: string;
  location: string;
  availability: 'Available Now' | 'In 2 days' | 'Limited Spots';
  verifiedTier: string;
  tools: string[];
  workflowDescription: string;
  featuredProjectTitle: string;
  featuredProjectTag: string;
  featuredProjectMedia: string;
  featuredProjectFormat: string;
  mediaAlt: string;
  avatarAlt: string;
  bio?: string;
  yearsExperience?: number;
  commercialsDelivered?: number;
  primaryRig?: string;
  coloristCertified?: string;
  portfolio?: PortfolioItem[];
  packages?: PricingPackage[];
  reviews?: Review[];
  matchScore?: number;
  isSampleProfile?: boolean;
  demoNotice?: string;
  avatarFallback?: string;
  matchReasons?: {
    relevance: string;
    toolCompatibility: string;
    consistency: string;
    commercialSuitability: string;
  };
}

export interface ProjectBrief {
  id: string;
  title: string;
  brand: string;
  agency?: string;
  objective: string;
  targetAudience: string;
  description: string;
  contentType: string;
  visualStyle: string;
  deliverables: string[];
  format: string;
  aspectRatio?: string;
  preferredTools: string[];
  modelWorkflow: string;
  specialization: string;
  humanStandards: string;
  restrictions: string;
  budgetMin: number;
  budgetMax: number;
  deliveryDate: string;
  revisions: string;
  commercialRights: string;
  commercialRequirements?: string;
  referenceLinks?: string;
  sampleNotes?: string;
}

export interface TimecodedComment {
  id: string;
  authorName: string;
  authorRole: string;
  avatarText: string;
  avatarBg: string;
  timecode?: string;
  timestampText: string;
  message: string;
  attachment?: string;
  isCreator?: boolean;
}

export interface AuditLogItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'version' | 'escrow' | 'indemnity' | 'init';
}
