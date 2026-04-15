export type Education = {
  school: string;
  degree: string;
  date: string;
  location?: string;
  gpa?: string;
  honors?: string;
  activities?: string[];
  status?: 'incoming' | 'current' | 'completed';
};

export const education: Education[] = [
  {
    school: 'University of Michigan',
    degree: 'M.S. Robotics · Rackham Graduate School',
    date: 'Fall 2026 (Incoming)',
    location: 'Ann Arbor, MI',
    status: 'incoming',
  },
  {
    school: 'Rensselaer Polytechnic Institute',
    degree: 'B.S. Mechanical Engineering',
    date: 'Aug 2022 – May 2026',
    location: 'Troy, NY',
    gpa: '3.87 / 4.0',
    honors: "Dean's Honor List · 7 semesters (Fall 2022 – Fall 2025)",
    activities: ['Rensselaer Motorsport', 'Rensselaer Student Auto Shop (RSAS)'],
    status: 'current',
  },
  {
    school: 'The Cambridge School of Weston',
    degree: 'High School Diploma',
    date: 'Aug 2020 – May 2022',
    location: 'Weston, MA',
    status: 'completed',
  },
];
