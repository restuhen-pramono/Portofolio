// ============================================
// Portfolio Data - Customize all content here
// ============================================

export const personalInfo = {
  name: "Restu Hendra Pramono",
  title: "Mechatronics Engineer",
  tagline: "Bridging Physical & Digital Worlds",
  subtitle: "Otomasi Industri · IoT · Embedded System · Web-Based HMI",
  description:
    "Mahasiswa Teknik Mekatronika dengan passion mendalam di bidang otomasi industri, Internet of Things, dan pengembangan sistem cerdas. Saya menggabungkan dunia hardware dan software untuk menciptakan solusi inovatif di era Industry 4.0.",
  location: "Sleman, Daerah Istimewa Yogyakarta, Indonesia",
  email: "sipramono24@email.com",
  whatsapp: "+62 878 0382 2756",
  linkedin: "https://linkedin.com/in/restuhend",
  github: "https://github.com/restuhend",
  cv_url: "#",
};

export const skills = [
  { name: "Arduino", level: 92, category: "embedded", icon: "⚡" },
  { name: "ESP32 / ESP8266", level: 88, category: "embedded", icon: "📡" },
  { name: "PLC (Siemens/Omron)", level: 78, category: "automation", icon: "🏭" },
  { name: "React.js", level: 85, category: "web", icon: "⚛️" },
  { name: "JavaScript", level: 80, category: "web", icon: "🟨" },
  { name: "Tailwind CSS", level: 88, category: "web", icon: "🎨" },
  { name: "Sensor & IoT", level: 90, category: "iot", icon: "🔌" },
  { name: "UI/UX Design", level: 75, category: "design", icon: "✦" },
  { name: "MQTT / WebSocket", level: 82, category: "iot", icon: "🔄" },
  { name: "Python", level: 72, category: "software", icon: "🐍" },
  { name: "Node.js", level: 70, category: "web", icon: "🟢" },
  { name: "CAD (SolidWorks)", level: 68, category: "mechanical", icon: "📐" },
];

export const focusAreas = [
  {
    icon: "🏭",
    title: "Otomasi Industri",
    description: "Perancangan sistem otomasi dengan PLC, SCADA, dan HMI untuk efisiensi produksi Industry 4.0",
    color: "from-cyan-500/20 to-blue-600/20",
    border: "border-cyan-500/30",
  },
  {
    icon: "📡",
    title: "Internet of Things",
    description: "Pengembangan ekosistem IoT end-to-end: sensor, gateway, cloud, dan dashboard monitoring real-time",
    color: "from-blue-500/20 to-indigo-600/20",
    border: "border-blue-500/30",
  },
  {
    icon: "⚡",
    title: "Embedded System",
    description: "Pemrograman mikrokontroler Arduino, ESP32, STM32 untuk aplikasi kontrol dan akuisisi data",
    color: "from-teal-500/20 to-cyan-600/20",
    border: "border-teal-500/30",
  },
  {
    icon: "🖥️",
    title: "Web-Based HMI",
    description: "Antarmuka kontrol mesin berbasis web yang responsif, real-time, dan intuitif menggunakan React",
    color: "from-indigo-500/20 to-purple-600/20",
    border: "border-indigo-500/30",
  },
  {
    icon: "🔧",
    title: "PLC & Smart Factory",
    description: "Integrasi sistem PLC dengan jaringan industri (Profinet, Modbus) untuk smart manufacturing",
    color: "from-cyan-600/20 to-teal-500/20",
    border: "border-cyan-600/30",
  },
];

export const projects = [
  {
    id: 1,
    title: "Smart Factory Trainer Kit",
    subtitle: "Web-Based HMI & PLC Integration",
    description:
      "Trainer kit industri cerdas dengan HMI berbasis web yang terintegrasi dengan PLC Siemens S7-1200. Menampilkan monitoring real-time, kontrol conveyor, dan visualisasi data produksi secara live.",
    tech: ["React", "Node.js", "MQTT", "PLC Siemens", "WebSocket", "Tailwind"],
    github: "https://github.com/restu-hendra/smart-factory-trainer",
    demo: "#",
    color: "from-cyan-500 to-blue-600",
    featured: true,
    image: "factory",
  },
  {
    id: 2,
    title: "Smart Headband Neurodegeneratif",
    subtitle: "EEG Signal Processing & AI Detection",
    description:
      "Headband cerdas berbasis EEG untuk deteksi dini penyakit neurodegeneratif menggunakan machine learning. Data brainwave diproses real-time dan ditampilkan via dashboard web interaktif.",
    tech: ["ESP32", "Python", "TensorFlow", "BLE", "React", "Flask API"],
    github: "https://github.com/restu-hendra/smart-headband",
    demo: "#",
    color: "from-purple-500 to-indigo-600",
    featured: true,
    image: "headband",
  },
  {
    id: 3,
    title: "Dashboard Monitoring IoT",
    subtitle: "Real-Time Industrial Monitoring",
    description:
      "Platform monitoring industri multi-sensor dengan visualisasi data real-time, alert system, dan laporan otomatis. Menangani 50+ sensor dari berbagai node dengan protokol MQTT.",
    tech: ["React", "MQTT", "InfluxDB", "Grafana", "ESP32", "Node-RED"],
    github: "https://github.com/restu-hendra/iot-dashboard",
    demo: "#",
    color: "from-teal-500 to-cyan-600",
    featured: false,
    image: "dashboard",
  },
  {
    id: 4,
    title: "Sistem Conveyor Otomatis",
    subtitle: "PLC & Vision System Integration",
    description:
      "Sistem sortasi produk otomatis berbasis PLC dengan computer vision untuk quality control. Menggunakan sensor proximity, vision camera, dan aktuator pneumatik terintegrasi.",
    tech: ["PLC Omron", "OpenCV", "Python", "Modbus", "HMI Panel", "Pneumatic"],
    github: "https://github.com/restu-hendra/auto-conveyor",
    demo: "#",
    color: "from-blue-500 to-cyan-600",
    featured: false,
    image: "conveyor",
  },
  {
    id: 5,
    title: "Website Monitoring Industri",
    subtitle: "Full-Stack Industrial Web App",
    description:
      "Aplikasi web full-stack untuk monitoring parameter industri seperti suhu, tekanan, kelembaban, dan konsumsi energi. Dilengkapi report generator dan notifikasi WhatsApp otomatis.",
    tech: ["React", "Express.js", "MongoDB", "Chart.js", "Twilio API", "JWT"],
    github: "https://github.com/restu-hendra/industrial-monitor",
    demo: "#",
    color: "from-indigo-500 to-blue-600",
    featured: false,
    image: "monitoring",
  },
];

export const timeline = [
  {
    year: "2024 - Sekarang",
    title: "Peneliti & Developer",
    place: "Lab Otomasi Industri - Politeknik",
    description:
      "Mengembangkan sistem trainer kit Smart Factory dengan integrasi PLC-Web HMI sebagai tugas akhir dan riset laboratorium.",
    type: "work",
  },
  {
    year: "2023",
    title: "IoT Engineer Intern",
    place: "PT. Industri Cerdas Indonesia",
    description:
      "Magang selama 6 bulan mengerjakan proyek monitoring energi berbasis IoT untuk 3 pabrik di kawasan industri Karawang.",
    type: "work",
  },
  {
    year: "2022",
    title: "Juara 1 - Lomba Robotika Nasional",
    place: "Politeknik Negeri Bandung",
    description:
      "Meraih juara pertama dalam kategori Robot Industri pada kompetisi robotika tingkat nasional antar politeknik se-Indonesia.",
    type: "achievement",
  },
  {
    year: "2021 - Sekarang",
    title: "Mahasiswa Teknik Mekatronika",
    place: "Politeknik Negeri Bandung",
    description:
      "Program studi D4 Teknik Mekatronika dengan konsentrasi Otomasi Industri dan Sistem Cerdas. IPK: 3.87/4.00.",
    type: "education",
  },
  {
    year: "2021",
    title: "Finalis ASEAN Engineering Championship",
    place: "Universitas Teknologi Malaysia",
    description:
      "Mewakili Indonesia sebagai finalis dalam kompetisi rekayasa teknik tingkat ASEAN di bidang otomasi dan robotika.",
    type: "achievement",
  },
];

export const stats = [
  { label: "Projects Completed", value: 15, suffix: "+" },
  { label: "GitHub Repositories", value: 28, suffix: "" },
  { label: "Skills Mastered", value: 12, suffix: "+" },
  { label: "Awards Won", value: 5, suffix: "" },
];
