export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  challenge: string;
  solution: string;
  results: string;
  image: string;
  images?: string[];
  imageNames?: string[];
  tags: string[];
  demoUrl: string;
  githubUrl: string;
}

export const projectsData: Project[] = [
  {
    id: "cloud-orchestration",
    title: "Cloud Orchestration Platform",
    subtitle: "Enterprise Infrastructure Console",
    category: "Enterprise UX",
    description: "End-to-end UX design for enterprise cloud orchestration and infrastructure administration platforms.",
    challenge: "Operations teams faced massive, error-prone complexity provisioning multi-cloud services, validating role-based access controls (RBAC), and monitoring real-time active deployment states.",
    solution: "Simplified complex deployment setups and RBAC monitoring controls into a clean unified dashboard. Engineered accessible navigation paradigms and interactive, implementation-aware visual flows.",
    results: "Received exceptional usability audit scores for operational workflow clarity and infrastructure management experience.",
    image: "/images/cloud-orchestration-dashboard.png",
    images: [
      "/images/cloud-orchestration-dashboard.png",
      "/images/cloud-orchestration-catalogue.png"
    ],
    imageNames: [
      "Workspace Overview Dashboard",
      "Solution & Pipeline Catalogue"
    ],
    tags: ["Enterprise UX", "Figma", "SaaS Console", "WCAG AA", "React-aware Prototyping"],
    demoUrl: "https://www.behance.net/allwinalex",
    githubUrl: "https://linkedin.com/in/allwin"
  },
  {
    id: "ai-onboarding",
    title: "AI-Powered Onboarding Platform",
    subtitle: "Aziro Technologies Integration",
    category: "AI & Workflows",
    description: "Consolidating HR tools into a unified AI-assisted experience that reduced onboarding effort by 50% and improved stakeholder visibility.",
    challenge: "The onboarding experience was fragmented across email communication, Excel trackers, WhatsApp groups, and manual updates, generating process delays and coordination overhead.",
    solution: "Consolidated multiple HR and IT coordination channels into a single AI-assisted staging workflow, automating task assignment and real-time visibility.",
    results: "Manual onboarding effort was reduced by 50%, enabling instant progress tracking through a centralized dashboard.",
    image: "/images/onboarding-dashboard.png",
    images: [
      "/images/onboarding-dashboard.png",
      "/images/onboarding-tracker.png",
      "/images/onboarding-workspace.png",
      "/images/onboarding-assistant.png"
    ],
    imageNames: [
      "Executive Onboarding Dashboard",
      "New Hire Journey Tracker",
      "HR Operations Workspace",
      "AI Onboarding Assistant"
    ],
    tags: ["AI HR Workflows", "Workflow Automation", "Dashboard Design", "Systems Thinking"],
    demoUrl: "https://www.behance.net/allwinalex",
    githubUrl: "https://linkedin.com/in/allwin"
  },
  {
    id: "cloud-director",
    title: "Cloud Director Platform Modernization",
    subtitle: "Enterprise Infrastructure Framework",
    category: "SaaS UX",
    description: "Unifying enterprise infrastructure management through Carbon Design System adoption, workflow simplification, and cross-platform experience standardization.",
    challenge: "Each of three legacy applications followed inconsistent visual conventions, navigation patterns, and visual components, creating high cognitive load and design debt.",
    solution: "Migrated the platform ecosystem to a standardized Carbon Design System-based framework and unified navigation and interaction models.",
    results: "Redesign successfully reduced administrative setup and task completion times by approximately 50% and minimized context-switching.",
    image: "/images/cloud-director-dashboard.png",
    images: [
      "/images/cloud-director-dashboard.png",
      "/images/cloud-director-create.png",
      "/images/cloud-director-infra.png",
      "/images/cloud-director-workloads.png"
    ],
    imageNames: [
      "Overview Dashboard",
      "Create Environment Workflow",
      "Infrastructure View",
      "Workloads View"
    ],
    tags: ["Carbon Design System", "Platform Migration", "Cross-Platform UX", "SaaS Modernization"],
    demoUrl: "https://www.behance.net/allwinalex",
    githubUrl: "https://linkedin.com/in/allwin"
  },
  {
    id: "developer-experience",
    title: "Developer Experience",
    subtitle: "Kubernetes & GPU Workloads",
    category: "Enterprise UX",
    description: "Reimagining enterprise cloud and AI infrastructure management through Carbon Design System principles, operational UX, and scalable workflow architecture.",
    challenge: "Infrastructure and DevOps teams struggled with highly technical, configuration-heavy provisioning, limited telemetry visibility, and dense admin tables.",
    solution: "Optimized complex GPU resource allocation andGuided provisioning flows, leveraging Carbon layouts, progressive disclosure, and telemetry visualization.",
    results: "Drastically reduced RBAC permission confusion and established a highly scalable, developer-aware orchestration visual foundation.",
    image: "/images/developer-experience-dashboard.png",
    images: [
      "/images/developer-experience-dashboard.png",
      "/images/developer-experience-infra.png",
      "/images/developer-experience-workloads.png",
      "/images/developer-experience-monitoring.png"
    ],
    imageNames: [
      "Overview Dashboard",
      "Infrastructure Clusters View",
      "Workloads Management View",
      "Observability & Monitoring View"
    ],
    tags: ["Kubernetes UX", "GPU Workloads", "Information Architecture", "AI Orchestration"],
    demoUrl: "https://www.behance.net/allwinalex",
    githubUrl: "https://linkedin.com/in/allwin"
  }
];
