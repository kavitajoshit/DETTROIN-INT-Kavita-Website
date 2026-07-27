import express from 'express';
import cors from 'cors';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const PORT = process.env.PORT || 5173;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientBuildPath = path.resolve(__dirname, '../client/dist');

app.use(cors());
app.use(express.json());

if (existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));
}

// Mock DB Data for Vasant Valley School
const SCHOOL_DATA = {
  stats: {
    established: 1990,
    motto: "Excellence in Deed",
    mottoSanskrit: "Shreshtha Tamaya Karmane",
    distinctionRate: "100%",
    studentTeacherRatio: "10:1",
    cbseRank: "#1 Co-ed Day School in New Delhi",
    alumniCount: "4,500+"
  },
  pillars: [
    {
      id: "cerebral",
      title: "Cerebral Development",
      icon: "🧠",
      desc: "Nurturing analytical thinking, problem-solving, CBSE & IGCSE academic distinction, and lifelong learning habits.",
      highlights: ["Stem & Robotics Lab", "Inter-school Debating Forum", "Research Grants at CEE@VVS"]
    },
    {
      id: "physical",
      title: "Physical Excellence",
      icon: "⚽",
      desc: "Promoting physical fitness, teamwork, sportsmanship, and endurance through 15+ sporting disciplines.",
      highlights: ["Olympic-size Swimming Pool", "National Level Football Turf", "Annual Sports Olympiad"]
    },
    {
      id: "social",
      title: "Social Responsibility",
      icon: "🌍",
      desc: "Instilling community leadership, environmental stewardship, empathy, and active civic participation.",
      highlights: ["Community Outreach Programs", "Zero-Waste Campus Drive", "Student Council Initiatives"]
    },
    {
      id: "emotional",
      title: "Emotional Wellbeing",
      icon: "❤️",
      desc: "Providing dedicated counseling, peer mentorship, mindfulness sessions, and emotional resilience training.",
      highlights: ["Dedicated Wellness Centre", "Peer Support Network", "Art & Expressive Therapies"]
    },
    {
      id: "spiritual",
      title: "Spiritual Integrity",
      icon: "✨",
      desc: "Cultivating moral ethics, self-reflection, cultural awareness, and global citizenship rooted in values.",
      highlights: ["Morning Assembly Reflections", "Ethics & Values Workshops", "Cultural Exchange Assemblies"]
    }
  ],
  events: [
    {
      id: 1,
      title: "Annual Sports Olympiad 2026",
      date: "2026-08-12",
      category: "Sports",
      location: "Main Sports Complex",
      description: "Inter-house athletics competition featuring track & field events, swimming championships, and gymnastics displays."
    },
    {
      id: 2,
      title: "CEE@VVS National Pedagogy Summit",
      date: "2026-08-20",
      category: "Academic",
      location: "Auditorium",
      description: "Center for Excellence in Education hosts educators nationwide to discuss AI in K-12 education."
    },
    {
      id: 3,
      title: "Inter-School Science & Tech Expo",
      date: "2026-09-05",
      category: "STEM",
      location: "Innovation Hub",
      description: "Student-led innovation projects covering robotics, environmental tech, and biotech simulations."
    },
    {
      id: 4,
      title: "Autumn Performing Arts Gala",
      date: "2026-09-18",
      category: "Cultural",
      location: "Open Air Theatre",
      description: "An evening of classical Indian music, contemporary drama, and orchestral performances by VVS students."
    }
  ],
  news: [
    {
      id: 101,
      title: "Vasant Valley Ranked #1 Co-Ed Day School in Delhi-NCR",
      date: "2026-07-15",
      category: "Awards",
      summary: "Recognized for academic excellence, holistic student development, and innovative pedagogical practices."
    },
    {
      id: 102,
      title: "VVS Robotics Team Wins National Stem Challenge",
      date: "2026-07-02",
      category: "Achievements",
      summary: "Class 11 students designed an autonomous flood-warning drone system for urban safety."
    },
    {
      id: 103,
      title: "Admissions Open for Academic Year 2027-28",
      date: "2026-06-20",
      category: "Admissions",
      summary: "Application forms for Foundation 1 and Class 11 are now live on the interactive admissions portal."
    }
  ],
  feesStructure: {
    foundation: { baseTuition: 45000, activityFee: 8000, labFee: 2000, cautionDeposit: 25000 },
    primary: { baseTuition: 52000, activityFee: 9500, labFee: 4000, cautionDeposit: 25000 },
    middle: { baseTuition: 60000, activityFee: 11000, labFee: 6500, cautionDeposit: 25000 },
    senior: { baseTuition: 72000, activityFee: 12500, labFee: 9000, cautionDeposit: 25000 }
  }
};

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Vasant Valley Express Backend is running smoothly', time: new Date().toISOString() });
});

// School Stats & Info API
app.get('/api/school-info', (req, res) => {
  res.json({ stats: SCHOOL_DATA.stats, pillars: SCHOOL_DATA.pillars });
});

// Admissions Calculator API
app.post('/api/admissions/calculate', (req, res) => {
  const { grade, transportZone, isNewAdmission } = req.body;

  if (!grade) {
    return res.status(400).json({ error: 'Grade is required' });
  }

  let feeCategory = 'primary';
  if (['Foundation 1', 'Foundation 2'].includes(grade)) feeCategory = 'foundation';
  else if (['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'].includes(grade)) feeCategory = 'primary';
  else if (['Class 6', 'Class 7', 'Class 8'].includes(grade)) feeCategory = 'middle';
  else feeCategory = 'senior';

  const base = SCHOOL_DATA.feesStructure[feeCategory];
  
  let transportFee = 0;
  if (transportZone === 'Zone A (Vasant Kunj / Munirka)') transportFee = 6500;
  else if (transportZone === 'Zone B (South Delhi / Saket / Hauz Khas)') transportFee = 8500;
  else if (transportZone === 'Zone C (Gurugram / Noida / Central Delhi)') transportFee = 11500;

  const totalQuarterlyFee = base.baseTuition + base.activityFee + base.labFee + transportFee;
  const oneTimeAdmissionFee = isNewAdmission ? base.cautionDeposit + 15000 : 0;

  res.json({
    grade,
    feeCategory: feeCategory.toUpperCase(),
    breakdown: {
      quarterlyTuition: base.baseTuition,
      quarterlyActivity: base.activityFee,
      quarterlyLabTech: base.labFee,
      quarterlyTransport: transportFee,
      oneTimeCautionDeposit: isNewAdmission ? base.cautionDeposit : 0,
      oneTimeAdmissionRegistration: isNewAdmission ? 15000 : 0
    },
    totalQuarterlyPayable: totalQuarterlyFee,
    totalFirstTermPayable: totalQuarterlyFee + oneTimeAdmissionFee,
    admissionStatus: "Admissions Open for 2027-28 Session",
    nextStep: "Proceed to Online Registration Portal"
  });
});

// Student ERP Dashboard API
app.get('/api/dashboard/student/:id', (req, res) => {
  res.json({
    studentId: req.params.id || "VVS-2024-884",
    name: "Aanya Sharma",
    grade: "Class 11 - Science A",
    house: "Yellow House (Surya)",
    veracrossStatus: "Active ERP Sync",
    gpa: "3.92 / 4.0",
    attendancePercentage: "96.4%",
    recentGrades: [
      { subject: "Physics", grade: "94%", status: "Exceeding Expectations" },
      { subject: "Chemistry", grade: "91%", status: "Proficient" },
      { subject: "Mathematics", grade: "98%", status: "Exceeding Expectations" },
      { subject: "English Literature", grade: "92%", status: "Proficient" },
      { subject: "Computer Science", grade: "99%", status: "Exceeding Expectations" }
    ],
    upcomingAssignments: [
      { title: "Calculus Limits & Derivatives Lab", dueDate: "2026-07-30", status: "Pending Submission" },
      { title: "Chemistry Organic Synthesis Essay", dueDate: "2026-08-03", status: "In Progress" },
      { title: "CS Python Data Structures Project", dueDate: "2026-08-10", status: "Submitted" }
    ],
    todayTimetable: [
      { period: "Period 1 (08:30 AM)", subject: "Physics Lab", room: "Lab 3" },
      { period: "Period 2 (09:30 AM)", subject: "Mathematics", room: "Class 11-A" },
      { period: "Period 3 (10:45 AM)", subject: "English Lit", room: "Humanities Wing" },
      { period: "Period 4 (11:45 AM)", subject: "Computer Science", room: "AI Lab" }
    ]
  });
});

// Parent ERP Dashboard API
app.get('/api/dashboard/parent/:id', (req, res) => {
  res.json({
    parentId: req.params.id || "PAR-VVS-902",
    parentName: "Rajesh & Meenakshi Sharma",
    wards: [
      { name: "Aanya Sharma", grade: "Class 11-A", rollNo: 14 }
    ],
    feeInvoice: {
      quarter: "Q2 (July - Sept 2026)",
      amount: "₹ 82,500",
      status: "PAID",
      paymentDate: "2026-07-05",
      receiptNo: "RCPT-2026-9921"
    },
    transportTracking: {
      busRoute: "Route 12 (South Delhi Express)",
      liveStatus: "On Route to School (Arrival: 08:15 AM)",
      driverContact: "+91 98765 43210"
    },
    teacherNotifications: [
      { sender: "Dr. K. Mehta (Class Teacher)", message: "Aanya represented VVS at the Zonal Math Olympiad yesterday and performed excellently.", date: "2026-07-24" },
      { sender: "Sports Dept", message: "Reminder: Annual Sports Olympiad permissions form due by Aug 5th.", date: "2026-07-22" }
    ]
  });
});

// Events API
app.get('/api/events', (req, res) => {
  res.json(SCHOOL_DATA.events);
});

// News API
app.get('/api/news', (req, res) => {
  res.json(SCHOOL_DATA.news);
});

// Inquiry Submission API
app.post('/api/inquiry', (req, res) => {
  const { parentName, email, phone, targetGrade, message } = req.body;
  
  if (!parentName || !email || !phone || !targetGrade) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  res.json({
    success: true,
    referenceId: `VVS-INQ-${Math.floor(100000 + Math.random() * 900000)}`,
    message: `Thank you, ${parentName}. Your inquiry for ${targetGrade} has been logged with Vasant Valley Admissions Office. An officer will contact you at ${email}.`
  });
});

// Serve the React portal from the root URL and let it handle its own navigation.
if (existsSync(clientBuildPath)) {
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) return next();
    res.sendFile(path.join(clientBuildPath, 'index.html'), next);
  });
} else {
  app.get('/', (req, res) => {
    res.json({ message: 'Backend running. Run "npm run build" to serve the portal on this port.' });
  });
}

const server = app.listen(PORT, () => {
  console.log(`Vasant Valley Backend Server running on http://localhost:${PORT}`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Stop the existing server or start this one with a different PORT.`);
    process.exit(1);
  }

  console.error('Unable to start the backend server:', error);
  process.exit(1);
});
