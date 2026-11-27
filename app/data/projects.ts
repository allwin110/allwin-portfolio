export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  contextTitle: string;
  context: string;
  challenge: string;
  solution: string;
  designWork: string[];
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
    description: "A shared workspace for cloud environments, deployment activity, and infrastructure operations.",
    contextTitle: "Operators need one view of a moving system.",
    context: "Operations teams needed to manage environments, solutions, and deployments from one enterprise console.",
    challenge: "Provisioning, role permissions, and deployment states were difficult to follow across dense operational flows.",
    solution: "I designed the workspace overview and supporting flows to make system status and the next action easier to find.",
    designWork: [
      "Mapped the operator journey across setup, access, and deployment monitoring.",
      "Grouped environment and pipeline status into a single overview.",
      "Designed a solution catalogue and clearer role-based access patterns."
    ],
    results: "The console brings deployment status, environments, and catalogue access into one operational workspace.",
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
    description: "An AI-assisted onboarding workflow that gives HR and IT a shared view of tasks and progress.",
    contextTitle: "A new hire journey crosses many teams.",
    context: "HR and IT teams coordinated new-hire setup across email, spreadsheets, chat, and manual status updates.",
    challenge: "Ownership and progress were spread across separate tools, making hand-offs and outstanding tasks difficult to follow.",
    solution: "I designed a unified onboarding workflow that makes ownership, task status, and follow-up visible to the people involved.",
    designWork: [
      "Mapped the hand-offs between HR, IT, and the new hire.",
      "Grouped onboarding tasks by owner and status in a shared workspace.",
      "Designed dashboard and assistant states to support progress updates."
    ],
    results: "HR and IT get one place to assign onboarding work and review progress across the new-hire journey.",
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
    description: "A consistent experience across three enterprise infrastructure applications.",
    contextTitle: "Three tools had three operating models.",
    context: "Three legacy applications supported related infrastructure tasks but had grown with separate patterns.",
    challenge: "People had to relearn navigation and controls when moving between products.",
    solution: "I aligned the experience around Carbon Design System patterns and a shared navigation model.",
    designWork: [
      "Reviewed the three applications to identify repeated tasks and inconsistent patterns.",
      "Applied shared Carbon components to navigation, forms, and data views.",
      "Clarified paths for environment setup and infrastructure management."
    ],
    results: "Shared patterns make related infrastructure tasks feel more consistent across the product family.",
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
    description: "A clearer operations view for Kubernetes clusters, GPU workloads, and infrastructure health.",
    contextTitle: "Infrastructure teams need signal in the noise.",
    context: "Infrastructure teams needed to configure clusters and GPU workloads while keeping track of system health.",
    challenge: "Configuration-heavy flows and dense administration tables made workload and telemetry information difficult to scan.",
    solution: "I organized provisioning and monitoring around the decisions operators need to make at each stage.",
    designWork: [
      "Structured cluster, workload, and resource information into clear groups.",
      "Used progressive disclosure to make configuration steps easier to follow.",
      "Designed monitoring views that bring health and utilization signals together."
    ],
    results: "Operators can review cluster health, workload status, and resource signals within one operations view.",
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

