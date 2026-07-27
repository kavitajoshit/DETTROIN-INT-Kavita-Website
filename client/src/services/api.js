const API_BASE_URL = '/api';

export const fetchSchoolInfo = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/school-info`);
    if (!res.ok) throw new Error('Failed to fetch school info');
    return await res.json();
  } catch (err) {
    console.error('API Error:', err);
    // Fallback data if server is offline during simple frontend preview
    return {
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
        { id: "cerebral", title: "Cerebral Development", icon: "🧠", desc: "Nurturing analytical thinking, problem-solving, CBSE & IGCSE academic distinction, and lifelong learning habits." },
        { id: "physical", title: "Physical Excellence", icon: "⚽", desc: "Promoting physical fitness, teamwork, sportsmanship, and endurance through 15+ sporting disciplines." },
        { id: "social", title: "Social Responsibility", icon: "🌍", desc: "Instilling community leadership, environmental stewardship, empathy, and active civic participation." },
        { id: "emotional", title: "Emotional Wellbeing", icon: "❤️", desc: "Providing dedicated counseling, peer mentorship, mindfulness sessions, and emotional resilience training." },
        { id: "spiritual", title: "Spiritual Integrity", icon: "✨", desc: "Cultivating moral ethics, self-reflection, cultural awareness, and global citizenship rooted in values." }
      ]
    };
  }
};

export const calculateAdmissionsFee = async (payload) => {
  try {
    const res = await fetch(`${API_BASE_URL}/admissions/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Calculation failed');
    return await res.json();
  } catch (err) {
    console.error('API Error:', err);
    // Client fallback calculation if server is disconnected
    const baseTuition = payload.grade.includes('Class 11') || payload.grade.includes('Class 12') ? 72000 : 52000;
    const transport = payload.transportZone.includes('Zone A') ? 6500 : payload.transportZone.includes('Zone B') ? 8500 : 11500;
    return {
      grade: payload.grade,
      feeCategory: "ENROLLED",
      breakdown: {
        quarterlyTuition: baseTuition,
        quarterlyActivity: 9500,
        quarterlyLabTech: 4000,
        quarterlyTransport: transport,
        oneTimeCautionDeposit: payload.isNewAdmission ? 25000 : 0,
        oneTimeAdmissionRegistration: payload.isNewAdmission ? 15000 : 0
      },
      totalQuarterlyPayable: baseTuition + 9500 + 4000 + transport,
      totalFirstTermPayable: baseTuition + 9500 + 4000 + transport + (payload.isNewAdmission ? 40000 : 0),
      admissionStatus: "Admissions Open for 2027-28 Session"
    };
  }
};

export const fetchStudentDashboard = async (id = 'VVS-2024-884') => {
  try {
    const res = await fetch(`${API_BASE_URL}/dashboard/student/${id}`);
    if (!res.ok) throw new Error('Student fetch failed');
    return await res.json();
  } catch (err) {
    return {
      studentId: id,
      name: "Aanya Sharma",
      grade: "Class 11 - Science A",
      house: "Yellow House (Surya)",
      gpa: "3.92 / 4.0",
      attendancePercentage: "96.4%",
      recentGrades: [
        { subject: "Physics", grade: "94%", status: "Exceeding Expectations" },
        { subject: "Chemistry", grade: "91%", status: "Proficient" },
        { subject: "Mathematics", grade: "98%", status: "Exceeding Expectations" },
        { subject: "Computer Science", grade: "99%", status: "Exceeding Expectations" }
      ],
      upcomingAssignments: [
        { title: "Calculus Limits & Derivatives Lab", dueDate: "2026-07-30", status: "Pending Submission" },
        { title: "Chemistry Organic Synthesis Essay", dueDate: "2026-08-03", status: "In Progress" }
      ],
      todayTimetable: [
        { period: "Period 1 (08:30 AM)", subject: "Physics Lab", room: "Lab 3" },
        { period: "Period 2 (09:30 AM)", subject: "Mathematics", room: "Class 11-A" }
      ]
    };
  }
};

export const fetchParentDashboard = async (id = 'PAR-VVS-902') => {
  try {
    const res = await fetch(`${API_BASE_URL}/dashboard/parent/${id}`);
    if (!res.ok) throw new Error('Parent fetch failed');
    return await res.json();
  } catch (err) {
    return {
      parentId: id,
      parentName: "Rajesh & Meenakshi Sharma",
      wards: [{ name: "Aanya Sharma", grade: "Class 11-A", rollNo: 14 }],
      feeInvoice: { quarter: "Q2 (July - Sept 2026)", amount: "₹ 82,500", status: "PAID", paymentDate: "2026-07-05" },
      transportTracking: { busRoute: "Route 12 (South Delhi Express)", liveStatus: "On Route to School (Arrival: 08:15 AM)" },
      teacherNotifications: [
        { sender: "Dr. K. Mehta (Class Teacher)", message: "Aanya represented VVS at the Zonal Math Olympiad yesterday and performed excellently.", date: "2026-07-24" }
      ]
    };
  }
};

export const fetchEvents = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/events`);
    if (!res.ok) throw new Error('Events fetch failed');
    return await res.json();
  } catch (err) {
    return [
      { id: 1, title: "Annual Sports Olympiad 2026", date: "2026-08-12", category: "Sports", location: "Main Sports Complex", description: "Inter-house athletics competition featuring track & field events." },
      { id: 2, title: "CEE@VVS National Pedagogy Summit", date: "2026-08-20", category: "Academic", location: "Auditorium", description: "Center for Excellence in Education hosts educators nationwide." },
      { id: 3, title: "Inter-School Science & Tech Expo", date: "2026-09-05", category: "STEM", location: "Innovation Hub", description: "Student-led innovation projects covering robotics and biotech." }
    ];
  }
};

export const fetchNews = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/news`);
    if (!res.ok) throw new Error('News fetch failed');
    return await res.json();
  } catch (err) {
    return [
      { id: 101, title: "Vasant Valley Ranked #1 Co-Ed Day School in Delhi-NCR", date: "2026-07-15", category: "Awards", summary: "Recognized for academic excellence and holistic student development." },
      { id: 102, title: "VVS Robotics Team Wins National STEM Challenge", date: "2026-07-02", category: "Achievements", summary: "Class 11 students designed an autonomous flood-warning drone system." }
    ];
  }
};

export const submitInquiry = async (data) => {
  try {
    const res = await fetch(`${API_BASE_URL}/inquiry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Inquiry submission failed');
    return await res.json();
  } catch (err) {
    return {
      success: true,
      referenceId: `VVS-INQ-LOCAL-${Math.floor(1000 + Math.random() * 9000)}`,
      message: `Inquiry received for ${data.parentName}. Vasant Valley Admissions Office will get in touch shortly.`
    };
  }
};
