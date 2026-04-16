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
  /** Ordered image paths relative to /public/images/. First image is the hero/showcase. */
  images: string[];
  featured?: boolean;
  /** Optional GitHub repo link — renders a clickable "View on GitHub" overlay on the card */
  github?: string;
  /** Optional live/demo URL */
  live?: string;
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
    images: [
      'canam-brake/hero.jpg',
      'canam-brake/actuator-closeup.jpg',
      'canam-brake/actuator-installed.jpg',
      'canam-brake/pedal-mount.jpg',
    ],
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
    images: [
      'canam-wheel-speed/sensor-parts.jpg',
      'canam-wheel-speed/installed.jpg',
    ],
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
    images: [
      'robotic-arm/arm-side.jpg',
      'robotic-arm/mounted.jpg',
    ],
  },
  {
    id: 'cycloidal-gearbox',
    title: 'Cycloidal Drive Gearbox (NEMA 17)',
    category: 'Robotics & Autonomous Systems',
    date: 'Aug 2024 – Jan 2025',
    description:
      'Designed a cycloidal drive gearbox for compact high-reduction actuation in robotics applications. Full CAD, tolerance analysis, and prototype validation.',
    tags: ['CAD', 'Siemens NX', 'Mechanical Design', '3D Printing'],
    images: ['cycloidal-gearbox/hero.jpg'],
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
    images: [
      'capstone-dispenser/dashboard.png',
      'capstone-dispenser/student-dispense.png',
      'capstone-dispenser/staff-controls.png',
      'capstone-dispenser/student-return.png',
      'capstone-dispenser/worker-return.png',
    ],
  },
  {
    id: 'beamng-ros2',
    title: 'BeamNG.tech + ROS 2 Vehicle Controls',
    category: 'Mechanical Design & Controls',
    date: 'MANE 4500',
    description:
      'Implemented feedforward + PI speed controllers for a vehicle in BeamNG.tech using ROS 2. Used PlotJuggler for log analysis and controller tuning.',
    tags: ['ROS 2', 'Python', 'Control Systems', 'PlotJuggler'],
    images: [
      'beamng-ros2/hero.png',
      'beamng-ros2/sim-plotjuggler.png',
      'beamng-ros2/mpc-horizon.png',
    ],
    featured: true,
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
    images: ['leaf-vacuum/hero.jpg'],
  },
  {
    id: 'heartbeat-sensor',
    title: 'Heartbeat Sensor',
    category: 'Mechanical Design & Controls',
    date: 'Coursework',
    description:
      'Analog circuit with amplifiers and filters to detect heartbeats in the 60–180 bpm range. Signal conditioning and noise rejection from first principles.',
    tags: ['Analog Circuits', 'Signal Processing', 'Electronics'],
    images: [
      'heartbeat-sensor/hero.jpg',
      'heartbeat-sensor/top-angle.jpg',
    ],
  },

  // --- Software & Maker ---
  {
    id: 'tokenjar',
    title: 'TokenJar — ESP32 API Usage Gadget',
    category: 'Software & Maker',
    date: 'Personal Project',
    context: 'Hardware + Firmware',
    description:
      'Desk gadget on an ESP32-S3 SuperMini that shows real-time Anthropic and OpenAI API spend on a 2" ST7789 IPS LCD. EC11 encoder UI, 24-hour sparkline, budget bar, and direct calls to each platform\u2019s Admin API — built with PlatformIO and custom display rendering.',
    tags: ['ESP32-S3', 'C++', 'PlatformIO', 'SPI Display', 'REST API'],
    images: [
      'tokenjar/screen-1.png',
      'tokenjar/screen-2.png',
      'tokenjar/screen-3.png',
    ],
    github: 'https://github.com/Zhaor3/tokenjar',
    featured: true,
  },
  {
    id: 'geoagent',
    title: 'GeoAgent — Image Geolocation Pipeline',
    category: 'Software & Maker',
    date: 'Personal Project',
    context: 'AI / Vision',
    description:
      'Determines where a photo was taken using a 6-stage pipeline: EXIF extraction, two-pass visual analysis with extended thinking, hypothesis generation, self-verification, external tool verification (Google Places, reverse geocoding), and final scoring. CLI plus Telegram bot.',
    tags: ['Python', 'Claude Vision', 'Computer Vision', 'Reasoning'],
    images: ['geoagent.jpg'],
    github: 'https://github.com/Zhaor3/GeoAgent',
  },
  {
    id: 'voron-3d-printers',
    title: 'Voron 3D Printer Build & Customization',
    category: 'Software & Maker',
    date: 'Sep 2023 – Present',
    description:
      'Self-assembled two Vorons from scratch for high-speed, high-quality printing. Customized G-code, upgraded a Voron 2.4 with a carbon fiber gantry and metal components, and designed custom camera and LED mounts in CAD.',
    tags: ['Voron', 'G-code', 'CAD', 'Hardware'],
    images: [
      'voron/voron-1.jpg',
      'voron/voron-2.jpg',
      'voron/voron-3.jpg',
    ],
  },
  {
    id: 'daytradeagents',
    title: 'DayTradeAgents — Multi-Agent LLM Framework',
    category: 'Software & Maker',
    date: 'Personal Project',
    context: 'AI / System Design',
    description:
      'Trading-research framework where 11 specialized LLM agents debate, challenge, and stress-test every trade through a 6-phase pipeline (data \u2192 analyst team \u2192 bull/bear debate \u2192 trader \u2192 risk stress-test \u2192 portfolio manager). Delivers a full trade dashboard and price-prediction chart to Telegram.',
    tags: ['Python', 'Claude', 'GPT-5', 'Multi-Agent', 'Telegram'],
    images: [
      'daytradeagents/banner.png',
      'daytradeagents/chart_preview.png',
      'daytradeagents/telegram_demo.png',
    ],
    github: 'https://github.com/Zhaor3/DayTradeAgents',
    featured: true,
  },
];

export const projectCategories: ProjectCategory[] = [
  'Robotics & Autonomous Systems',
  'Mechanical Design & Controls',
  'Software & Maker',
];
