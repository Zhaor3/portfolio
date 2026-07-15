export type Experience = {
  role: string;
  company: string;
  location?: string;
  date: string;
  summary: string;
  details?: string[];
  skills?: string[];
};

// Manually ordered to surface the current role first, followed by the most
// relevant completed engineering, research, and leadership experience.
export const experience: Experience[] = [
  {
    role: 'Robotics Engineering Intern, Dexterous Hand R&D',
    company: 'Stella Robotics',
    location: 'Remote',
    date: 'Jul 2026 – Aug 2026',
    summary:
      'Sole structural designer of a hollow-bore, tendon-routed 3-DoF robotic wrist for a humanoid dexterous hand, combining 2-DoF wrist pitch/yaw with a wrist-linked thumb-adduction axis for high thumb force in a compact package.',
    details: [
      'Designing the central tendon pass-through—routing paths, guides, and anchors—to keep cables pinch-free with stable tension while verifying clearance and interference across the full range of motion.',
      'Quantifying tendon-length change versus wrist pose through multi-pose motion simulation and mechanics calculations.',
      'Delivering complete 3D CAD, 2D production drawings, and a simulation report on a five-week cycle.',
    ],
    skills: [
      'Mechanical Design',
      'Robotics',
      'CAD',
      'Motion Simulation',
      'Engineering Drawings',
      'Tendon-Driven Mechanisms',
    ],
  },
  {
    role: 'Engineering Department Intern',
    company: 'Tesla',
    location: 'Remote (China)',
    date: 'Jul 2025 – Aug 2025',
    summary:
      'Reverse-engineered the Tesla Model 3 battery pack coolant distribution manifold and produced CAD redesigns, plus an integrated mounting bracket for autonomous driving sensors.',
    details: [
      'Analyzed manufacturing process and potential failure modes and delivered an optimization assessment report.',
      'Created refined 3D CAD models of the coolant manifold for enhanced thermal dissipation efficiency; produced design documentation and renderings.',
      'Conducted simulation analysis on the improved manifold to validate thermal performance.',
      'Designed an integrated mounting bracket and cover for Tesla autonomous driving sensors, with a major focus on manufacturability and assembly efficiency.',
    ],
    skills: ['Siemens NX', 'CAD', 'Thermal Simulation', 'DFM', 'Mechanical Engineering'],
  },
  {
    role: 'Undergraduate Researcher, Autonomous Vehicles',
    company: 'XAL Research Lab · Rensselaer Polytechnic Institute',
    location: 'Troy, NY',
    date: 'Feb 2025 – May 2026',
    summary:
      'Developed autonomous braking, steering, and wheel-speed sensing systems for a self-driving Can-Am X3 focused on stable control under slipping conditions; presented the work to Toyota Research Institute.',
    details: [
      'Built brake-automation, steering, and encoder-based wheel-speed sensing subsystems using ROS 2 and Python.',
      'Modeled vehicle dynamics and tuned control strategies in MATLAB and Simulink.',
      'Designed and 3D-printed custom actuator and sensor mounts for the autonomy retrofit.',
    ],
    skills: [
      'ROS 2',
      'Python',
      'MATLAB',
      'Simulink',
      'Vehicle Dynamics',
      'Control Systems',
      'Rapid Prototyping',
    ],
  },
  {
    role: 'Shop Manager',
    company: 'Rensselaer Student Auto Shop (RSAS)',
    location: 'Troy, NY',
    date: 'Sep 2022 – May 2026',
    summary:
      'Ran weekly operations for a student-run auto shop and provided hands-on support for student vehicle work.',
    details: [
      'Maintained a safe, organized environment for students performing maintenance, modification, and repair.',
      'Provided hands-on technical support across a wide range of vehicle systems.',
    ],
    skills: ['Mechanical Engineering', 'Vehicle Maintenance', 'Leadership'],
  },
  {
    role: 'Team Member',
    company: 'Rensselaer Motorsport (Formula SAE)',
    location: 'Troy, NY',
    date: 'Sep 2022 – Dec 2025',
    summary:
      'Contributed to design and fabrication of the team\u2019s Formula SAE race car.',
    details: [
      'Designed CAD files for wheel hubs for the race car.',
      'Helped design and develop an actuator system focused on battery cooling.',
    ],
    skills: ['CAD', 'FSAE', 'Fabrication', 'Vehicle Design'],
  },
];
