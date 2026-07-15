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
    date: 'Aug 2026 – May 2028 (Expected)',
    location: 'Ann Arbor, MI',
    status: 'incoming',
  },
  {
    school: 'Rensselaer Polytechnic Institute',
    degree: 'B.S. Mechanical Engineering',
    date: 'Aug 2022 – May 2026',
    location: 'Troy, NY',
    honors: "Magna Cum Laude · Dean's Honor List (8 semesters)",
    activities: ['Rensselaer Motorsport', 'Rensselaer Student Auto Shop (RSAS)'],
    status: 'completed',
  },
];
