export type ProjectCategory =
  | 'Robotics & Autonomous Systems'
  | 'Mechanical Design & Controls'
  | 'Software & Maker';

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  date: string;
  context?: string;
  description: string;
  tags: string[];
  image: string;
  featured?: boolean;
};

export const projects: Project[] = [
  // --- Robotics & Autonomous Systems ---
  {
    id: 'canam-brake',
    title: 'Can-Am X3 Brake Automation System',
    category: 'Robotics & Autonomous Systems',
    date: 'Sep 2025 – Present',
    context: 'RPI · XAL Research Lab',
    description:
      'Brake-automation design for a Can-Am X3 supporting automated vehicle control and testing. Handles system design, actuation concepts, and practical integration for closed-loop control under slipping conditions.',
    tags: ['ROS 2', 'Python', 'Mechatronics', 'CAD', 'Vehicle Dynamics'],
    image: 'canam-brake.jpg',
    featured: true,
  },
  {
    id: 'canam-wheel-speed',
    title: 'Can-Am X3 Wheel Speed Sensor',
    category: 'Robotics & Autonomous Systems',
    date: 'Feb 2025 – Sep 2025',
    context: 'RPI · XAL Research Lab',
    description:
      'Encoder-based wheel speed sensing system with embedded hardware integration for vehicle data acquisition. Ties into the broader autonomous stack on the Can-Am X3 platform.',
    tags: ['Embedded', 'Sensors', 'Data Acquisition', 'CAD'],
    image: 'canam-wheel-speed.jpg',
  },
  {
    id: 'robotic-arm-4dof',
    title: '4-DOF Robotic Arm',
    category: 'Robotics & Autonomous Systems',
    date: 'Jan 2024 – Aug 2025',
    context: 'RCOS',
    description:
      'Designed and built a 4-DOF robotic arm with focus on mechanical structure, motion, and actuator integration. Planned AI-powered camera for object detection and pick-and-place; integrated onto the Leaf Vacuum robot platform.',
    tags: ['CAD', '3D Printing', 'Arduino', 'Mechatronics'],
    image: 'robotic-arm.jpg',
  },
  {
    id: 'cycloidal-gearbox',
    title: 'Cycloidal Drive Gearbox (NEMA 17)',
    category: 'Robotics & Autonomous Systems',
    date: 'Aug 2024 – Jan 2025',
    description:
      'Designed a cycloidal drive gearbox for compact high-reduction actuation in robotics applications. Full CAD, tolerance analysis, and prototype validation.',
    tags: ['CAD', 'Siemens NX', 'Mechanical Design', '3D Printing'],
    image: 'cycloidal-gearbox.jpg',
  },

  // --- Mechanical Design & Controls ---
  {
    id: 'capstone-dispenser',
    title: 'Automated To-Go Box Dispenser',
    category: 'Mechanical Design & Controls',
    date: 'Capstone · for Sodexo at RPI',
    description:
      'Senior capstone: a fully automated vertical magazine dispenser with escapement/indexer, lead screw lift, and NEMA 23 stepper actuation. End-to-end design, fabrication, and control.',
    tags: ['CAD', 'Mechatronics', 'Stepper Control', 'Capstone'],
    image: 'capstone-dispenser.jpg',
  },
  {
    id: 'beamng-ros2',
    title: 'BeamNG.tech + ROS 2 Vehicle Controls',
    category: 'Mechanical Design & Controls',
    date: 'MANE 4500',
    description:
      'Implemented feedforward + PI speed controllers for a vehicle in BeamNG.tech using ROS 2. Used PlotJuggler for log analysis and controller tuning.',
    tags: ['ROS 2', 'Python', 'Control Systems', 'PlotJuggler'],
    image: 'beamng-ros2.jpg',
  },
  {
    id: 'leaf-vacuum',
    title: 'Leaf Vacuum Robot',
    category: 'Mechanical Design & Controls',
    date: 'Aug 2023 – Dec 2023',
    context: 'IED · Team of six',
    description:
      'Award-winning 3D-printed yard-cleaning robot with tracked chassis, two motors, and vacuum system controlled by Arduino. Recognized as Best IED Project at RPI — recognized two years running.',
    tags: ['Siemens NX', '3D Printing', 'Arduino', 'Team Project'],
    image: 'leaf-vacuum.jpg',
  },
  {
    id: 'heartbeat-sensor',
    title: 'Heartbeat Sensor',
    category: 'Mechanical Design & Controls',
    date: 'Coursework',
    description:
      'Analog circuit with amplifiers and filters to detect heartbeats in the 60–180 bpm range. Signal conditioning and noise rejection from first principles.',
    tags: ['Analog Circuits', 'Signal Processing', 'Electronics'],
    image: 'heartbeat-sensor.jpg',
  },

  // --- Software & Maker ---
  {
    id: '3dprinthub',
    title: '3DPrintHub',
    category: 'Software & Maker',
    date: 'Personal Project',
    description:
      'Marketplace platform connecting hobbyists and print farms. STL auto-pricing, listings, and order flow built on Firebase.',
    tags: ['Firebase', 'Web', 'STL Parsing', 'Marketplace'],
    image: '3dprinthub.jpg',
  },
  {
    id: 'rxzlabs',
    title: 'RXZLabs',
    category: 'Software & Maker',
    date: 'Ongoing',
    description:
      'Etsy store for 3D-printed products. Covers design, production, listings, and fulfillment end-to-end.',
    tags: ['3D Printing', 'Product Design', 'E-commerce'],
    image: 'rxzlabs.jpg',
  },
  {
    id: 'voron-3d-printers',
    title: 'Voron 3D Printer Build & Customization',
    category: 'Software & Maker',
    date: 'Sep 2023 – Present',
    description:
      'Self-assembled two Vorons from scratch for high-speed, high-quality printing. Customized G-code, upgraded a Voron 2.4 with a carbon fiber gantry and metal components, and designed custom camera and LED mounts in CAD.',
    tags: ['Voron', 'G-code', 'CAD', 'Hardware'],
    image: 'voron.jpg',
  },
];

export const projectCategories: ProjectCategory[] = [
  'Robotics & Autonomous Systems',
  'Mechanical Design & Controls',
  'Software & Maker',
];
