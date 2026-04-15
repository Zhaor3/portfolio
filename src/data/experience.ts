export type Experience = {
  role: string;
  company: string;
  location?: string;
  date: string;
  summary: string;
  details?: string[];
  skills?: string[];
};

// Ordered reverse-chronological: ongoing roles first (most recent start wins
// the tiebreak), then completed roles sorted by end date descending.
export const experience: Experience[] = [
  {
    role: 'Undergraduate Research Assistant',
    company: 'XAL Research Lab · Rensselaer Polytechnic Institute',
    location: 'Troy, NY',
    date: 'Feb 2025 – Present',
    summary:
      'Contributing to autonomous-vehicle research under Prof. Franck Djeumou, including the Can-Am X3 project presented to Toyota Research Institute.',
    details: [
      'Designing a self-driving Can-Am X3 focused on achieving stable control under slipping conditions.',
      'Developing autonomous braking, steering, and sensor subsystems for the vehicle.',
      'Using MATLAB and Simulink to model, simulate, and optimize control strategies.',
      'Designing custom mechanical components for autonomous systems via CAD and 3D printing.',
      'Exploring vehicle dynamics, control algorithms, and AI-based navigation.',
    ],
    skills: [
      'ROS 2',
      'Python',
      'MATLAB',
      'Simulink',
      'Vehicle Dynamics',
      'Control Systems',
      'Rapid Prototyping',
      'Robotics',
    ],
  },
  {
    role: 'Shop Manager',
    company: 'Rensselaer Student Auto Shop (RSAS)',
    location: 'Troy, NY',
    date: 'Sep 2022 – Present',
    summary:
      'Manage weekly operations of a student-run auto shop and provide hands-on support for student vehicle work.',
    details: [
      'Maintain a safe, organized environment for students doing maintenance, modification, and repair.',
      'Provide hands-on technical support across a wide range of vehicle systems.',
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
];
