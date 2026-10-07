import { useState, useRef } from 'react'
import {
  Briefcase,
  Building2,
  PenTool,
  Sparkles,
  User,
  ChevronLeft,
  MapPin,
  Banknote,
  ShieldCheck,
  Home,
  HeartHandshake,
  Check,
  X,
  RotateCcw,
  Send,
  Star,
  Clock,
  ArrowRight,
  MessageCircle,
  Phone,
  FileText,
  Download,
  Upload,
  CheckCircle2,
  Calendar,
  Layers,
  Search,
  LogIn,
  UserPlus,
  HelpCircle,
  Eye,
  Award,
  Bell,
  Plus,
  Wrench,
  Hammer,
  Zap,
  ChevronRight,
  ThumbsUp,
  Lock,
  Unlock,
  CreditCard,
  Users,
  Filter,
  ClipboardList,
  BarChart2,
  BadgeCheck,
  Settings
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// ==========================================
// DATOS REALISTAS — ANDAHUAYLAS / APURÍMAC
// ==========================================
const INITIAL_JOBS = [
  {
    id: 1,
    title: "Asistente de almacén",
    company: "Distribuidora Andina",
    location: "Andahuaylas",
    modality: "Presencial",
    schedule: "Tiempo completo",
    salary: "S/ 1,200 - S/ 1,800",
    matchScore: 96,
    match: "96% Compatibilidad",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
    desc: "Recepción, control de inventarios, registro en kardex y despacho de abarrotes al por mayor en almacén central de Andahuaylas.",
    requirements: ["Secundaria completa o técnico trunco", "Conocimiento básico de guías de remisión", "Puntualidad y compromiso"],
    verified: true,
    contactPerson: "Lic. Carlos Vivanco (RRHH)"
  },
  {
    id: 2,
    title: "Técnico en Computación y Redes",
    company: "Cooperativa San Jerónimo",
    location: "San Jerónimo · Andahuaylas",
    modality: "Presencial",
    schedule: "Tiempo completo",
    salary: "S/ 1,800 - S/ 2,400",
    matchScore: 92,
    match: "92% Compatibilidad",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800",
    desc: "Mantenimiento preventivo de computadoras, soporte a usuarios y configuración de redes locales en agencias del valle del Chumbao.",
    requirements: ["Egresado de Instituto o Universidad", "Experiencia mínima 1 año", "Residencia en Andahuaylas o San Jerónimo"],
    verified: true,
    contactPerson: "Ing. Rosa Palomino"
  },
  {
    id: 3,
    title: "Auxiliar Contable y Caja",
    company: "Agroindustrias Apurímac SAC",
    location: "Talavera · Andahuaylas",
    modality: "Híbrido",
    schedule: "Tiempo completo",
    salary: "S/ 1,500 - S/ 2,000",
    matchScore: 90,
    match: "90% Compatibilidad",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
    desc: "Emisión de comprobantes electrónicos, conciliación bancaria y liquidación de gastos de acopio agrícola.",
    requirements: ["Estudiante técnico o universitario en Contabilidad", "Excel intermedio", "Manejo de sistemas contables"],
    verified: true,
    contactPerson: "CPCC Miguel Ángel Castro"
  },
  {
    id: 4,
    title: "Asesora de Ventas y Atención",
    company: "Comercial Chumbao",
    location: "Andahuaylas Centro",
    modality: "Presencial",
    schedule: "Tiempo completo",
    salary: "S/ 1,300 - S/ 1,900",
    matchScore: 94,
    match: "94% Compatibilidad",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
    desc: "Atención cálida a clientes en mostrador, asesoramiento sobre productos para el hogar y cobranza en tienda física.",
    requirements: ["Facilidad de palabra y trato amable", "Deseable experiencia en retail o tiendas", "Disponibilidad para horario comercial"],
    verified: true,
    contactPerson: "Sra. Elena Hurtado"
  },
  {
    id: 5,
    title: "Operario de Mantenimiento y Logística",
    company: "Molinera Los Andes",
    location: "Andahuaylas",
    modality: "Presencial",
    schedule: "Tiempo completo",
    salary: "S/ 1,400 - S/ 1,750",
    matchScore: 88,
    match: "88% Compatibilidad",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800",
    desc: "Mantenimiento básico de maquinaria de molienda, estiba responsable de granos andinos y apoyo en despacho.",
    requirements: ["Experiencia en labores operativas", "Buenas condiciones físicas", "Valores de responsabilidad y trabajo en equipo"],
    verified: true,
    contactPerson: "Sr. Walter Barrientos"
  }
];

const INITIAL_APPLICATIONS = [
  {
    id: 101,
    title: "Asistente de almacén",
    company: "Distribuidora Andina",
    salary: "S/ 1,200 - S/ 1,800",
    location: "Andahuaylas · Presencial",
    status: "Match / Entrevista",
    statusType: "match",
    date: "Hoy, 10:30 am",
    note: "La empresa mostró interés y habilitó el chat directo.",
    hasChat: true
  },
  {
    id: 102,
    title: "Auxiliar Contable y Caja",
    company: "Agroindustrias Apurímac SAC",
    salary: "S/ 1,500 - S/ 2,000",
    location: "Talavera · Híbrido",
    status: "En revisión",
    statusType: "review",
    date: "Ayer, 04:15 pm",
    note: "El equipo de selección está revisando tu CV con IA.",
    hasChat: false
  },
  {
    id: 103,
    title: "Técnico en Computación y Redes",
    company: "Cooperativa San Jerónimo",
    salary: "S/ 1,800 - S/ 2,400",
    location: "San Jerónimo · Presencial",
    status: "CV Enviado",
    statusType: "sent",
    date: "Hace 2 días",
    note: "Postulación recibida en plataforma.",
    hasChat: false
  }
];

// Candidatos para la vista de Empresa
const CANDIDATES = [
  {
    id: 1,
    name: "Rosa Quispe Flores",
    age: 24,
    location: "Andahuaylas",
    title: "Auxiliar Contable",
    match: "94%",
    matchScore: 94,
    salary: "S/ 1,500",
    skills: ["Excel", "Kardex", "Contabilidad"],
    experience: "2 años",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=200",
    verified: true,
    available: "Inmediata"
  },
  {
    id: 2,
    name: "Carlos Huamán Rojas",
    age: 28,
    location: "San Jerónimo",
    title: "Técnico en Redes",
    match: "89%",
    matchScore: 89,
    salary: "S/ 1,800",
    skills: ["Redes LAN", "Windows Server", "Soporte técnico"],
    experience: "3 años",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200",
    verified: true,
    available: "En 1 semana"
  },
  {
    id: 3,
    name: "María Ccahuana López",
    age: 22,
    location: "Talavera",
    title: "Asesora de ventas",
    match: "87%",
    matchScore: 87,
    salary: "S/ 1,300",
    skills: ["Atención al cliente", "Caja", "Inventario"],
    experience: "1 año",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    verified: false,
    available: "Inmediata"
  },
  {
    id: 4,
    name: "Pedro Condori Bautista",
    age: 32,
    location: "Andahuaylas",
    title: "Operario de almacén",
    match: "82%",
    matchScore: 82,
    salary: "S/ 1,200",
    skills: ["Despacho", "Embalaje", "Guías de remisión"],
    experience: "4 años",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200",
    verified: true,
    available: "En 2 semanas"
  }
];

// Técnicos para Persona Natural
const TECHNICIANS = [
  {
    id: 1,
    name: "Víctor Huamaní Soto",
    trade: "Gasfitería y Sanitarios",
    icon: "🔧",
    rating: 4.9,
    reviews: 38,
    price: "S/ 50 - S/ 80 / hora",
    location: "Andahuaylas Centro",
    distance: "1.2 km",
    verified: true,
    image: "https://images.unsplash.com/photo-1537511446984-935f663eb1f4?auto=format&fit=crop&q=80&w=200",
    works: ["Instalación de tuberías", "Reparación de fugas", "Colocación de sanitarios"],
    bio: "Gasfitero certificado con 8 años de experiencia en Andahuaylas. Trabajo garantizado.",
    completedJobs: 143
  },
  {
    id: 2,
    name: "Juan Palomino Vera",
    trade: "Electricista Domiciliario",
    icon: "⚡",
    rating: 4.8,
    reviews: 52,
    price: "S/ 45 - S/ 70 / hora",
    location: "San Jerónimo",
    distance: "3.5 km",
    verified: true,
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=200",
    works: ["Instalaciones eléctricas", "Cambio de tablero", "Puntos de luz"],
    bio: "Electricista certificado por el MTC. Instalaciones seguras y normalizadas.",
    completedJobs: 201
  },
  {
    id: 3,
    name: "Ana Quispe Mendoza",
    trade: "Pintora de Interiores",
    icon: "🎨",
    rating: 4.7,
    reviews: 29,
    price: "S/ 35 - S/ 60 / hora",
    location: "Talavera",
    distance: "6 km",
    verified: true,
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=200",
    works: ["Pintura interior y exterior", "Empaste y masilla", "Decoración mural"],
    bio: "10 años de experiencia en pintura de interiores. Acabados finos y durables.",
    completedJobs: 88
  },
  {
    id: 4,
    name: "Roberto Ccama Torres",
    trade: "Maestro de Obra",
    icon: "🏗️",
    rating: 4.6,
    reviews: 41,
    price: "S/ 80 - S/ 150 / día",
    location: "Andahuaylas",
    distance: "2.1 km",
    verified: true,
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=200",
    works: ["Construcción y refacción", "Tarrajeo y enlucido", "Cimientos"],
    bio: "Maestro de obra con proyectos en toda la región Apurímac. Presupuesto sin costo.",
    completedJobs: 67
  }
];

// Notificaciones de ejemplo
const INITIAL_NOTIFICATIONS = [
  { id: 1, type: 'match', title: '¡Nuevo Match!', body: 'Distribuidora Andina quiere conocerte.', time: 'Hace 5 min', read: false },
  { id: 2, type: 'message', title: 'Mensaje recibido', body: 'Cooperativa San Jerónimo te escribió.', time: 'Hace 1 h', read: false },
  { id: 3, type: 'payment', title: 'Pago liberado', body: 'S/ 150 transferidos a tu cuenta.', time: 'Ayer', read: true },
  { id: 4, type: 'review', title: 'Nueva reseña', body: 'Rosa te dejó 5 estrellas ⭐️.', time: 'Hace 2 días', read: true },
];

export default function App() {
  // --- SESIÓN Y REGISTRO ---
  const [currentUser, setCurrentUser] = useState({
    name: "Juan Quispe Huamán",
    phone: "983 456 789",
    district: "Andahuaylas",
    profileType: "empleado", // 'empleado' | 'empresa' | 'persona'
    occupation: "Asistente de almacén y logística",
    isRegistered: true
  });
  const [authStep, setAuthStep] = useState(null);

  // --- NAVEGACIÓN ---
  const [activeTab, setActiveTab] = useState('inicio');

  // --- EMPLEADO ---
  const [jobs, setJobs] = useState([...INITIAL_JOBS].reverse());
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchedJob, setMatchedJob] = useState(null);
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);

  // --- EMPRESA ---
  const [candidates, setCandidates] = useState([...CANDIDATES]);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [publishedJobs, setPublishedJobs] = useState([
    { id: 'j1', title: 'Asistente de almacén', candidates: 12, status: 'Activo', date: 'Hace 2 días' },
    { id: 'j2', title: 'Auxiliar Contable', candidates: 7, status: 'Activo', date: 'Hace 5 días' },
  ]);

  // --- PERSONA NATURAL ---
  const [technicians] = useState(TECHNICIANS);
  const [selectedTech, setSelectedTech] = useState(null);
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);
  const [escrowStep, setEscrowStep] = useState(null); // null | 0..3
  const [myServices, setMyServices] = useState([
    {
      id: 's1', tech: 'Víctor Huamaní Soto', trade: 'Gasfitería', amount: 'S/ 120',
      escrow: 2, // 0=pagado 1=en proceso 2=confirmado 3=liberado
      date: 'Hoy, 09:15 am'
    }
  ]);

  // --- NOTIFICACIONES ---
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const unreadCount = notifications.filter(n => !n.read).length;

  // --- CHAT ---
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatTarget, setChatTarget] = useState({ name: 'Asistente TrabajaYA', subtitle: 'Orientación en Andahuaylas', isCompany: false });

  // --- CV ---
  const [userCv, setUserCv] = useState({
    name: "Juan Quispe Huamán",
    title: "Asistente de Almacén y Control de Inventarios",
    phone: "983 456 789",
    email: "juan.quispe.h@gmail.com",
    location: "Andahuaylas, Apurímac",
    summary: "Profesional responsable y proactivo con sólida experiencia en control de inventarios, recepción y despacho de mercadería en empresas comerciales de Andahuaylas. Enfocado en la optimización de tiempos, orden de almacén y manejo ético de guías de remisión.",
    skills: ["Control de Inventarios (Kardex)", "Recepción y Despacho", "Guías de Remisión", "Excel y Hojas de Cálculo", "Manejo de Proveedores", "Trabajo en Equipo y Puntualidad"],
    experience: [
      {
        role: "Auxiliar de Almacén",
        company: "Comercializadora Chanka - Andahuaylas",
        period: "2023 - 2024",
        location: "Andahuaylas",
        description: "Recepción de pedidos mayoristas, verificación de inventarios físicos mensuales y coordinación de despacho a tiendas de Talavera y San Jerónimo."
      },
      {
        role: "Operario de Despacho",
        company: "Distribuciones del Sur",
        period: "2022 - 2023",
        location: "Andahuaylas",
        description: "Control de entradas y salidas de mercadería, embalaje seguro y atención cordial a transportistas locales."
      }
    ],
    education: [
      {
        title: "Certificación en Gestión de Almacenes e Inventarios",
        institution: "Centro de Capacitación Técnica Apurímac",
        year: "2023"
      },
      {
        title: "Educación Secundaria Completa",
        institution: "Colegio Juan Espinoza Medrano - Andahuaylas",
        year: "2021"
      }
    ],
    isAiGenerated: true,
    score: 96
  });

  // --- HANDLERS ---
  const handleJobAction = (direction) => {
    if (jobs.length === 0) return;
    const newJobs = [...jobs];
    const topJob = newJobs.pop();
    setJobs(newJobs);
    if (direction === 'right') {
      const newApp = {
        id: Date.now(),
        title: topJob.title,
        company: topJob.company,
        salary: topJob.salary,
        location: `${topJob.location} · ${topJob.modality}`,
        status: "Match / Entrevista",
        statusType: "match",
        date: "Justo ahora",
        note: "¡La empresa también mostró interés en tu perfil!",
        hasChat: true
      };
      setApplications(prev => [newApp, ...prev]);
      setMatchedJob(topJob);
      setTimeout(() => setShowMatchModal(true), 300);
    }
  };

  const reloadJobs = () => setJobs([...INITIAL_JOBS].reverse());

  const handleCandidateAction = (id, action) => {
    setCandidates(prev => prev.filter(c => c.id !== id));
    if (action === 'accept') {
      openChatWith(CANDIDATES.find(c => c.id === id)?.name || 'Candidato', 'Candidato seleccionado', false);
    }
  };

  const openChatWith = (name, subtitle, isCompany = true) => {
    setChatTarget({ name, subtitle, isCompany });
    setIsChatOpen(true);
  };

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  const handleDownloadCv = () => {
    const content = `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><title>CV - ${userCv.name} · TrabajaYA</title><style>body{font-family:'Segoe UI',sans-serif;padding:40px;color:#1F2937;max-width:800px;margin:auto}.header{border-bottom:3px solid #00B894;padding-bottom:18px;margin-bottom:24px}h1{color:#0E2A47;margin:0 0 6px;font-size:28px;font-weight:800}.subtitle{color:#00B894;font-weight:700;font-size:16px;margin-bottom:8px}.contact{font-size:13px;color:#6B7280}.section{margin-bottom:22px}.section-title{color:#0E2A47;font-size:15px;font-weight:800;border-bottom:1.5px solid #E5E7EB;padding-bottom:4px;margin-bottom:10px;text-transform:uppercase}.badge{display:inline-block;background:#E8F8F1;color:#00B894;font-weight:700;padding:4px 10px;border-radius:12px;font-size:12px;margin:3px 2px}.job{margin-bottom:14px}.job-title{font-weight:700;color:#1F2937;font-size:14px}.job-meta{font-size:12px;color:#6B7280;margin-bottom:4px}.summary-text{font-size:13px;line-height:1.6;color:#374151}.footer{margin-top:35px;text-align:center;font-size:11px;color:#9CA3AF;border-top:1px solid #E5E7EB;padding-top:15px}</style></head><body><div class="header"><h1>${userCv.name}</h1><div class="subtitle">${userCv.title}</div><div class="contact">📍 ${userCv.location} | 📞 ${userCv.phone} | ✉️ ${userCv.email}</div></div><div class="section"><div class="section-title">Resumen Profesional</div><div class="summary-text">${userCv.summary}</div></div><div class="section"><div class="section-title">Habilidades</div><div>${userCv.skills.map(s=>`<span class="badge">${s}</span>`).join('')}</div></div><div class="section"><div class="section-title">Experiencia</div>${userCv.experience.map(e=>`<div class="job"><div class="job-title">${e.role} · ${e.company}</div><div class="job-meta">${e.period} | ${e.location}</div><div class="summary-text">${e.description}</div></div>`).join('')}</div><div class="footer">Generado con IA por <strong>TrabajaYA</strong> · Andahuaylas, Apurímac</div></body></html>`;
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CV_${userCv.name.replace(/\s+/g, '_')}_TrabajaYA.html`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const pt = currentUser.profileType;

  // Nav items por perfil
  const navItems = pt === 'empresa'
    ? [
        { id: 'inicio', icon: <Home size={20} />, label: 'Inicio' },
        { id: 'candidatos', icon: <Users size={20} />, label: 'Candidatos', badge: candidates.length },
        { id: 'vacantes', icon: <ClipboardList size={20} />, label: 'Vacantes', badge: publishedJobs.length },
        { id: 'match', icon: <HeartHandshake size={20} />, label: 'Match', badge: 2 },
        { id: 'perfil', icon: <User size={20} />, label: 'Perfil' },
      ]
    : pt === 'persona'
    ? [
        { id: 'inicio', icon: <Home size={20} />, label: 'Inicio' },
        { id: 'tecnicos', icon: <Wrench size={20} />, label: 'Técnicos' },
        { id: 'servicios', icon: <ClipboardList size={20} />, label: 'Mis Servicios', badge: myServices.length },
        { id: 'notificaciones', icon: <Bell size={20} />, label: 'Avisos', badge: unreadCount || null },
        { id: 'perfil', icon: <User size={20} />, label: 'Perfil' },
      ]
    : [
        { id: 'inicio', icon: <Home size={20} />, label: 'Inicio' },
        { id: 'trabajos', icon: <Briefcase size={20} />, label: 'Trabajos', badge: jobs.length || null },
        { id: 'postulaciones', icon: <FileText size={20} />, label: 'Postulaciones', badge: applications.length || null },
        { id: 'match', icon: <HeartHandshake size={20} />, label: 'Match', badge: applications.filter(a => a.statusType === 'match').length || null },
        { id: 'perfil', icon: <User size={20} />, label: 'Perfil' },
      ];

  return (
    <div className="flex h-screen bg-[#F0F4F8] text-[#1F2937] overflow-hidden justify-center items-center w-full relative font-sans select-none"
      style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(14,42,71,0.05) 1px, transparent 0)', backgroundSize: '28px 28px' }}
    >
      {/* SIDEBAR DESKTOP */}
      <div className="hidden xl:flex fixed top-10 left-10 flex-col z-0 max-w-xs">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-13 h-13 rounded-3xl bg-gradient-to-br from-[#00B894] to-[#0E2A47] flex items-center justify-center text-white shadow-card">
            <Briefcase size={26} />
          </div>
          <div>
            <h1 className="text-4xl font-black text-[#0E2A47] tracking-tight leading-none">
              Trabaja<span className="text-[#00B894]">YA</span>
            </h1>
            <p className="text-[#00B894] font-bold text-xs uppercase tracking-widest mt-0.5">Andahuaylas · Apurímac</p>
          </div>
        </div>
        <div className="brand-stripe w-16 mb-3"></div>
        <p className="text-[#6B7280] text-sm leading-relaxed">"El talento también trabaja". Conectamos personas, empresas y servicios desde Andahuaylas hacia todo Apurímac.</p>
        <div className="mt-5 space-y-2.5">
          <div className="p-3.5 bg-white rounded-2xl border border-[#E5E7EB] shadow-soft flex items-center gap-3">
            <div className="relative">
              <div className="w-2.5 h-2.5 rounded-full bg-[#00B894]"></div>
              <div className="absolute inset-0 rounded-full bg-[#00B894] animate-ping opacity-60"></div>
            </div>
            <span className="text-xs font-bold text-[#0E2A47]">Sistema de Empleabilidad Local Activo</span>
          </div>
          <div className="p-3.5 bg-white rounded-2xl border border-[#E5E7EB] shadow-soft flex items-center gap-3">
            <Star size={14} className="text-[#FFC107] flex-shrink-0" fill="#FFC107" />
            <span className="text-xs font-semibold text-[#6B7280]">Conecta · Trabaja · Crece</span>
          </div>
        </div>
      </div>

      {/* APP FRAME */}
      <div className="app-frame z-10 shadow-2xl relative bg-white flex flex-col">

        {authStep !== null ? (
          <AuthFlowModal
            step={authStep}
            onSetStep={setAuthStep}
            onCompleteRegistration={(userData) => {
              setCurrentUser({ ...userData, isRegistered: true });
              setActiveTab('inicio');
              setAuthStep(null);
            }}
          />
        ) : (
          <>
            <div className="flex-1 overflow-hidden relative flex flex-col">
              <AnimatePresence mode="wait">

                {/* ===== EMPLEADO SCREENS ===== */}
                {activeTab === 'inicio' && pt === 'empleado' && (
                  <HomeScreen
                    key="home-emp"
                    user={currentUser}
                    onOpenCvModal={() => setIsCvModalOpen(true)}
                    onGoToJobs={() => setActiveTab('trabajos')}
                    onGoToApplications={() => setActiveTab('postulaciones')}
                    onOpenChat={() => openChatWith('Asistente TrabajaYA', 'Orientación en Andahuaylas', false)}
                    onOpenAuth={() => setAuthStep('welcome')}
                  />
                )}
                {activeTab === 'trabajos' && pt === 'empleado' && (
                  <JobsSwipeScreen
                    key="trabajos"
                    jobs={jobs}
                    onAction={handleJobAction}
                    onReload={reloadJobs}
                    onOpenChat={(job) => openChatWith(job.company, `Puesto: ${job.title}`, true)}
                    onGoToApplications={() => setActiveTab('postulaciones')}
                  />
                )}
                {activeTab === 'postulaciones' && pt === 'empleado' && (
                  <ApplicationsScreen
                    key="postulaciones"
                    applications={applications}
                    onOpenChat={(app) => openChatWith(app.company, `Postulación: ${app.title}`, true)}
                    onGoToJobs={() => setActiveTab('trabajos')}
                  />
                )}
                {activeTab === 'match' && pt === 'empleado' && (
                  <MatchTabScreen
                    key="match-emp"
                    applications={applications.filter(a => a.statusType === 'match')}
                    onOpenChat={(app) => openChatWith(app.company, `Match: ${app.title}`, true)}
                    onGoToJobs={() => setActiveTab('trabajos')}
                  />
                )}

                {/* ===== EMPRESA SCREENS ===== */}
                {activeTab === 'inicio' && pt === 'empresa' && (
                  <EmpresaHomeScreen
                    key="home-emp2"
                    user={currentUser}
                    publishedJobs={publishedJobs}
                    candidates={candidates}
                    onPublish={() => setIsPublishModalOpen(true)}
                    onGoToCandidatos={() => setActiveTab('candidatos')}
                    onGoToVacantes={() => setActiveTab('vacantes')}
                    onOpenAuth={() => setAuthStep('welcome')}
                  />
                )}
                {activeTab === 'candidatos' && pt === 'empresa' && (
                  <CandidatesSwipeScreen
                    key="candidatos"
                    candidates={candidates}
                    onAction={handleCandidateAction}
                    onOpenChat={(c) => openChatWith(c.name, c.title, false)}
                  />
                )}
                {activeTab === 'vacantes' && pt === 'empresa' && (
                  <VacantesScreen
                    key="vacantes"
                    jobs={publishedJobs}
                    onPublish={() => setIsPublishModalOpen(true)}
                  />
                )}
                {activeTab === 'match' && pt === 'empresa' && (
                  <MatchTabScreen
                    key="match-empresa"
                    applications={[
                      { id: 201, company: 'Rosa Quispe', title: 'Auxiliar Contable · Candidata', salary: 'S/ 1,500', statusType: 'match', hasChat: true, status: 'Match', date: 'Hoy' },
                      { id: 202, company: 'Carlos Huamán', title: 'Técnico en Redes · Candidato', salary: 'S/ 1,800', statusType: 'match', hasChat: true, status: 'Match', date: 'Ayer' },
                    ]}
                    onOpenChat={(app) => openChatWith(app.company, app.title, false)}
                    onGoToJobs={() => setActiveTab('candidatos')}
                    labelEmpty="Aún no tienes matches con candidatos"
                    ctaLabel="Ver candidatos"
                  />
                )}

                {/* ===== PERSONA NATURAL SCREENS ===== */}
                {activeTab === 'inicio' && pt === 'persona' && (
                  <PersonaHomeScreen
                    key="home-persona"
                    user={currentUser}
                    myServices={myServices}
                    onGoToTecnicos={() => setActiveTab('tecnicos')}
                    onGoToServicios={() => setActiveTab('servicios')}
                    onOpenAuth={() => setAuthStep('welcome')}
                    onOpenChat={() => openChatWith('Asistente TrabajaYA', 'Servicios en Andahuaylas', false)}
                  />
                )}
                {activeTab === 'tecnicos' && pt === 'persona' && (
                  <TecnicosScreen
                    key="tecnicos"
                    technicians={technicians}
                    onSelect={(tech) => { setSelectedTech(tech); setIsHireModalOpen(true); }}
                  />
                )}
                {activeTab === 'servicios' && pt === 'persona' && (
                  <MisServiciosScreen
                    key="servicios"
                    services={myServices}
                    onViewEscrow={(s) => { setEscrowStep(s.escrow); setSelectedTech({ name: s.tech, trade: s.trade }); }}
                    onOpenChat={(s) => openChatWith(s.tech, s.trade, false)}
                    onGoToTecnicos={() => setActiveTab('tecnicos')}
                  />
                )}
                {activeTab === 'notificaciones' && pt === 'persona' && (
                  <NotificacionesScreen
                    key="notif"
                    notifications={notifications}
                    onMarkAllRead={markAllRead}
                  />
                )}

                {/* ===== PERFIL (todos los perfiles) ===== */}
                {activeTab === 'perfil' && (
                  <ProfileScreen
                    key="perfil"
                    user={currentUser}
                    cv={userCv}
                    onOpenCvModal={() => setIsCvModalOpen(true)}
                    onDownloadCv={handleDownloadCv}
                    onLogout={() => setAuthStep('welcome')}
                  />
                )}

              </AnimatePresence>
            </div>

            {/* NAV INFERIOR DINÁMICA */}
            <nav className="h-[72px] bg-white border-t border-[#E5E7EB] px-1 flex items-center justify-around z-30"
              style={{ boxShadow: '0 -4px 24px rgba(14,42,71,0.07)' }}>
              {navItems.map(item => (
                <NavButton
                  key={item.id}
                  active={activeTab === item.id}
                  onClick={() => setActiveTab(item.id)}
                  icon={item.icon}
                  label={item.label}
                  badge={item.badge}
                />
              ))}
            </nav>
          </>
        )}

        {/* MODAL MATCH */}
        <AnimatePresence>
          {showMatchModal && matchedJob && (
            <MatchModal
              job={matchedJob}
              onClose={() => setShowMatchModal(false)}
              onChat={() => {
                setShowMatchModal(false);
                openChatWith(matchedJob.company, `Puesto: ${matchedJob.title}`, true);
              }}
            />
          )}
        </AnimatePresence>

        {/* MODAL CV IA */}
        <AnimatePresence>
          {isCvModalOpen && (
            <CvAiBuilderModal
              initialCv={userCv}
              onClose={() => setIsCvModalOpen(false)}
              onSaveCv={(newCv) => { setUserCv(newCv); setIsCvModalOpen(false); setActiveTab('trabajos'); }}
              onDownloadCv={handleDownloadCv}
            />
          )}
        </AnimatePresence>

        {/* MODAL PUBLICAR VACANTE */}
        <AnimatePresence>
          {isPublishModalOpen && (
            <PublishJobModal
              onClose={() => setIsPublishModalOpen(false)}
              onPublish={(job) => {
                setPublishedJobs(prev => [{ id: `j${Date.now()}`, title: job.title, candidates: 0, status: 'Activo', date: 'Recién publicado' }, ...prev]);
                setIsPublishModalOpen(false);
              }}
            />
          )}
        </AnimatePresence>

        {/* MODAL CONTRATAR TÉCNICO */}
        <AnimatePresence>
          {isHireModalOpen && selectedTech && (
            <HireServiceModal
              tech={selectedTech}
              onClose={() => { setIsHireModalOpen(false); setSelectedTech(null); }}
              onHire={(details) => {
                setMyServices(prev => [{
                  id: `s${Date.now()}`,
                  tech: selectedTech.name,
                  trade: selectedTech.trade,
                  amount: details.amount,
                  escrow: 0,
                  date: 'Justo ahora'
                }, ...prev]);
                setIsHireModalOpen(false);
                setSelectedTech(null);
                setActiveTab('servicios');
              }}
            />
          )}
        </AnimatePresence>

        {/* MODAL ESCROW */}
        <AnimatePresence>
          {escrowStep !== null && selectedTech && (
            <EscrowModal
              tech={selectedTech}
              step={escrowStep}
              onClose={() => { setEscrowStep(null); setSelectedTech(null); }}
              onAdvance={() => setEscrowStep(prev => Math.min(prev + 1, 3))}
            />
          )}
        </AnimatePresence>

        {/* MODAL CHAT */}
        <AnimatePresence>
          {isChatOpen && (
            <ChatModal
              target={chatTarget}
              onClose={() => setIsChatOpen(false)}
            />
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}

// ==========================================
// COMPONENTE: PANTALLA DE INICIO (BIENVENIDA)
// ==========================================
function HomeScreen({ user, onOpenCvModal, onGoToJobs, onGoToApplications, onOpenChat, onOpenAuth }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full bg-[#F9FAFB] overflow-y-auto hide-scroll"
    >
      {/* Cabecera Principal */}
      <div className="bg-white px-5 pt-5 pb-3 border-b border-[#E5E7EB] sticky top-0 z-20" style={{ boxShadow: '0 1px 10px rgba(14,42,71,0.06)' }}>
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-[14px] bg-gradient-to-br from-[#00B894] to-[#0E2A47] flex items-center justify-center text-white shadow-soft">
              <Briefcase size={19} />
            </div>
            <div>
              <h1 className="text-[22px] font-black text-[#0E2A47] tracking-tight leading-none">
                Trabaja<span className="text-[#00B894]">YA</span>
              </h1>
              <p className="text-[10px] font-bold text-[#00B894] tracking-widest mt-0.5 uppercase">
                Conecta · Trabaja · Crece
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-[#E8F8F1] text-[#0E2A47] text-[11px] font-bold border border-[#00B894]/20 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00B894] animate-pulse"></span>
              Andahuaylas
            </span>
            <button
              onClick={onOpenAuth}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#E8F8F1] text-[#6B7280] hover:text-[#00B894] flex items-center justify-center transition-colors"
              title="Cuenta o cambiar sesión"
            >
              <User size={16} />
            </button>
          </div>
        </div>
        <div className="brand-stripe"></div>
      </div>

      <div className="p-4 space-y-3.5 flex-1">

        {/* HERO CARD CON MASCOTA CAPIBARA */}
        <div className="hero-card shadow-soft">
          <div className="flex items-center gap-4">
            <div className="relative flex-shrink-0">
              <div className="w-[88px] h-[88px] rounded-3xl overflow-hidden bg-white shadow-card border-2 border-white">
                <img
                  src="/mascot/welcome.jpg"
                  alt="Capibara Mascota TrabajaYA"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-[#FFC107] text-[#0E2A47] rounded-full p-1.5 shadow-soft border-2 border-white">
                <Star size={10} fill="#0E2A47" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#00B894] to-[#0E2A47] text-white text-[10px] font-bold uppercase tracking-wider mb-1.5">
                <span className="w-1 h-1 bg-white rounded-full opacity-80"></span>
                ¡HOLA, {user.name.split(' ')[0]}!
              </span>
              <h2 className="text-[17px] font-black text-[#0E2A47] leading-snug">
                "El talento también trabaja"
              </h2>
              <p className="text-[11px] text-[#6B7280] mt-1 leading-relaxed">
                Tu perfil está activo. Revisa empleos o mejora tu CV con IA.
              </p>
            </div>
          </div>
        </div>

        {/* ACCIÓN PRINCIPAL 1: CREAR O MEJORAR CV CON IA */}
        <div className="bg-white border-2 border-[#00B894] p-4.5 rounded-3xl shadow-card relative overflow-hidden">
          {/* Decorativo verde sutil */}
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-[#00B894]/5 -translate-y-6 translate-x-6 pointer-events-none"></div>
          <div className="flex items-start justify-between gap-3 mb-2 relative">
            <div className="flex items-center gap-2.5">
              <div className="w-11 h-11 rounded-[14px] bg-gradient-to-br from-[#4DA3FF] to-[#7C3AED] text-white flex items-center justify-center shadow-soft">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="font-black text-[#0E2A47] text-[15px] leading-tight">Crear o Mejorar CV con IA</h3>
                <span className="text-[11px] font-bold text-[#00B894]">Recomendado para postular</span>
              </div>
            </div>
            <span className="px-2 py-1 rounded-lg bg-[#E8F8F1] text-[#00B894] text-[10px] font-black uppercase tracking-wide border border-[#00B894]/20 flex-shrink-0">
              IA Activa
            </span>
          </div>

          <p className="text-[11px] text-[#6B7280] leading-relaxed mb-3.5 relative">
            Escribe tus habilidades o sube tu CV. La IA lo optimizará para empresas de Andahuaylas.
          </p>

          <button
            onClick={onOpenCvModal}
            className="btn-primary w-full py-3.5 text-sm flex items-center justify-center gap-2 glow-green"
          >
            <Sparkles size={15} />
            <span>Optimizar mi CV con IA ahora</span>
            <ArrowRight size={15} />
          </button>
        </div>

        {/* ACCIÓN PRINCIPAL 2: EXPLORAR TRABAJOS EN TARJETAS */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onGoToJobs}
            className="bg-white p-4 rounded-3xl border border-[#E5E7EB] hover:border-[#00B894] hover:shadow-card transition-all duration-200 shadow-soft text-left group flex flex-col"
          >
            <div className="w-10 h-10 rounded-[12px] bg-[#E8F8F1] text-[#00B894] flex items-center justify-center mb-3 group-hover:bg-[#00B894] group-hover:text-white transition-all duration-200">
              <Briefcase size={20} />
            </div>
            <div className="flex-1">
              <h4 className="font-black text-[#0E2A47] text-[13px] leading-tight">Explorar Trabajos</h4>
              <p className="text-[11px] text-[#6B7280] mt-0.5">Tarjetas deslizables</p>
            </div>
            <div className="mt-2.5 flex items-center gap-1 text-[11px] font-bold text-[#00B894]">
              <span>Ver vacantes</span>
              <ArrowRight size={12} />
            </div>
          </button>

          <button
            onClick={onGoToApplications}
            className="bg-white p-4 rounded-3xl border border-[#E5E7EB] hover:border-[#FFC107] hover:shadow-card transition-all duration-200 shadow-soft text-left group flex flex-col"
          >
            <div className="w-10 h-10 rounded-[12px] bg-[#FFF8E1] text-amber-600 flex items-center justify-center mb-3 group-hover:bg-[#FFC107] group-hover:text-[#0E2A47] transition-all duration-200">
              <FileText size={20} />
            </div>
            <div className="flex-1">
              <h4 className="font-black text-[#0E2A47] text-[13px] leading-tight">Mis Postulaciones</h4>
              <p className="text-[11px] text-[#6B7280] mt-0.5">Estado en tiempo real</p>
            </div>
            <div className="mt-2.5 flex items-center gap-1 text-[11px] font-bold text-amber-600">
              <span>Revisar estado</span>
              <ArrowRight size={12} />
            </div>
          </button>
        </div>

        {/* ACCESO RÁPIDO ASISTENTE IA */}
        <button
          onClick={onOpenChat}
          className="w-full bg-white hover:bg-[#E8F8F1] p-3.5 rounded-2xl border border-[#E5E7EB] hover:border-[#00B894] flex items-center justify-between text-left transition-all duration-200 shadow-soft group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E8F8F1] group-hover:bg-[#00B894] text-[#00B894] group-hover:text-white flex items-center justify-center transition-all duration-200">
              <MessageCircle size={17} />
            </div>
            <div>
              <h5 className="font-bold text-[#0E2A47] text-[12px]">¿Dudas sobre cómo postular?</h5>
              <p className="text-[11px] text-[#6B7280]">Habla con el Asistente IA de TrabajaYA</p>
            </div>
          </div>
          <div className="w-7 h-7 rounded-full bg-[#E8F8F1] group-hover:bg-[#00B894] flex items-center justify-center transition-all duration-200">
            <ArrowRight size={14} className="text-[#00B894] group-hover:text-white" />
          </div>
        </button>

        {/* Espacio inferior para que el último elemento no quede pegado a la nav */}
        <div className="h-2"></div>
      </div>
    </motion.div>
  )
}

// =======================================================
// COMPONENTE: TRABAJOS EN TARJETAS DESLIZABLES (REQUERIDO)
// =======================================================
function JobsSwipeScreen({ jobs, onAction, onReload, onOpenChat, onGoToApplications }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full bg-[#F9FAFB] relative"
    >
      {/* Cabecera */}
      <div className="bg-white px-5 py-3.5 border-b border-[#E5E7EB] z-20 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-[#00B894] uppercase tracking-wider block">
              Oportunidades en Andahuaylas
            </span>
            <h2 className="text-lg font-black text-[#0E2A47] leading-tight">
              Trabajos Compatibles
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onGoToApplications}
              className="px-2.5 py-1 rounded-xl bg-[#E8F8F1] text-[#00B894] text-xs font-bold flex items-center gap-1 border border-[#00B894]/20"
            >
              <FileText size={13} />
              <span>Mis Postulaciones</span>
            </button>
          </div>
        </div>
      </div>

      {/* ÁREA DE TARJETAS */}
      <div className="flex-1 relative p-4 flex flex-col justify-center overflow-hidden">
        {jobs.length === 0 ? (
          /* PANTALLA VACÍA: MASCOTA CAPIBARA CON LUPA */
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center text-center p-6 bg-white rounded-4xl border border-[#E5E7EB] shadow-soft max-w-sm mx-auto"
          >
            <div className="w-28 h-28 rounded-3xl overflow-hidden bg-[#E8F8F1] p-1 mb-3 shadow-xs relative border-2 border-white">
              <img
                src="/mascot/empty.jpg"
                alt="Capibara Buscando Oportunidades"
                className="w-full h-full object-cover"
              />
            </div>

            <span className="px-3 py-1 rounded-full bg-[#E8F8F1] text-[#00B894] font-bold text-xs mb-1.5">
              Búsqueda en Andahuaylas
            </span>

            <h3 className="text-xl font-black text-[#0E2A47]">
              ¡Estás al día!
            </h3>
            <p className="text-xs text-[#6B7280] mt-1 leading-relaxed mb-4 max-w-xs">
              Has revisado todas las vacantes disponibles en este momento. Nuestro capibara y la IA siguen rastreando nuevas oportunidades en la zona.
            </p>

            <div className="flex flex-col gap-2 w-full">
              <button
                onClick={onReload}
                className="btn-primary w-full py-3 text-sm flex items-center justify-center gap-2"
              >
                <RotateCcw size={16} />
                <span>Volver a ver vacantes</span>
              </button>
              <button
                onClick={onGoToApplications}
                className="btn-secondary w-full py-3 text-sm flex items-center justify-center gap-2"
              >
                <FileText size={16} />
                <span>Ver mis postulaciones enviadas</span>
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="relative w-full h-[475px] max-w-sm mx-auto">
            {jobs.map((job, index) => (
              <JobCard
                key={job.id}
                job={job}
                index={index}
                total={jobs.length}
                onAction={onAction}
                onOpenChat={onOpenChat}
              />
            ))}
          </div>
        )}
      </div>

      {/* BOTONES DE ACCIÓN AMPLIOS */}
      {jobs.length > 0 && (
        <div className="px-6 pb-5 pt-1 flex items-center justify-center gap-8 z-20">
          {/* BOTÓN IZQUIERDO: DESCARTAR */}
          <button
            onClick={() => onAction('left')}
            className="w-[60px] h-[60px] rounded-full bg-white border-2 border-[#FF5B5B]/25 text-[#FF5B5B] hover:bg-[#FFF0F0] hover:border-[#FF5B5B]/50 flex items-center justify-center active:scale-90 transition-all duration-150"
            style={{ boxShadow: '0 4px 16px rgba(255,91,91,0.18)' }}
            title="Descartar (desliza a la izquierda)"
          >
            <X size={26} strokeWidth={2.5} />
          </button>

          {/* INDICADOR CENTRAL */}
          <div className="text-center">
            <div className="text-[10px] font-black text-[#6B7280] uppercase tracking-widest">
              {jobs.length} {jobs.length === 1 ? 'vacante' : 'vacantes'}
            </div>
            <div className="text-[9px] text-[#9CA3AF] mt-0.5">desliza para elegir</div>
          </div>

          {/* BOTÓN DERECHO: POSTULAR */}
          <button
            onClick={() => onAction('right')}
            className="w-[68px] h-[68px] rounded-full text-white flex items-center justify-center active:scale-90 transition-all duration-150"
            style={{
              background: 'linear-gradient(135deg, #00B894 0%, #0E2A47 100%)',
              boxShadow: '0 6px 22px rgba(0,184,148,0.45), 0 2px 8px rgba(14,42,71,0.2)'
            }}
            title="Postular (desliza a la derecha)"
          >
            <Check size={32} strokeWidth={3} />
          </button>
        </div>
      )}
    </motion.div>
  )
}

function JobCard({ job, index, total, onAction, onOpenChat }) {
  const isTop = index === total - 1;

  return (
    <motion.div
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(e, info) => {
        if (!isTop) return;
        if (info.offset.x > 90) onAction('right');
        else if (info.offset.x < -90) onAction('left');
      }}
      initial={{ scale: 0.95, y: 10, opacity: 0 }}
      animate={{
        scale: isTop ? 1 : 0.96 - (total - 1 - index) * 0.03,
        y: isTop ? 0 : (total - 1 - index) * 8,
        opacity: 1
      }}
      exit={{ x: 320, opacity: 0, transition: { duration: 0.2 } }}
      className="absolute inset-0 bg-white rounded-4xl border border-[#E5E7EB] overflow-hidden shadow-card flex flex-col cursor-grab active:cursor-grabbing"
      style={{ zIndex: index }}
    >
      {/* IMAGEN */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-100 flex-shrink-0">
        <img
          src={job.image}
          alt={job.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A47]/70 via-transparent to-transparent"></div>

        {/* BADGES SUPERIORES */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <div className="glass px-2.5 py-1 rounded-full text-[11px] font-bold text-[#0E2A47] flex items-center gap-1.5">
            <ShieldCheck size={12} className="text-[#00B894]" />
            <span>Empresa Verificada</span>
          </div>
          <div className="px-2.5 py-1 rounded-full text-[11px] font-black text-white flex items-center gap-1 ml-auto"
            style={{ background: 'linear-gradient(135deg,#00B894,#0E2A47)', boxShadow: '0 2px 8px rgba(0,184,148,0.4)' }}>
            <Sparkles size={11} />
            <span>{job.match}</span>
          </div>
        </div>

        {/* MODALIDAD SOBRE IMAGEN */}
        <div className="absolute bottom-3 left-3 flex gap-1.5">
          <span className="px-2.5 py-0.5 rounded-lg bg-black/55 backdrop-blur-sm text-white text-[11px] font-semibold">
            {job.modality}
          </span>
          <span className="px-2.5 py-0.5 rounded-lg bg-black/55 backdrop-blur-sm text-white text-[11px] font-semibold">
            {job.schedule}
          </span>
        </div>
      </div>

      {/* INFORMACIÓN DEL PUESTO */}
      <div className="p-4 flex-1 flex flex-col justify-between bg-white">
        <div>
          <h3 className="text-[17px] font-black text-[#0E2A47] leading-snug">
            {job.title}
          </h3>
          <p className="text-[11px] font-bold text-[#6B7280] mt-0.5">
            {job.company} · {job.location}
          </p>

          {/* SUELDO DESTACADO */}
          <div className="mt-2.5 flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-xl bg-[#E8F8F1] border border-[#00B894]/20 text-[#00B894] font-black text-[13px] flex items-center gap-1.5">
              <Banknote size={14} />
              <span>{job.salary}</span>
            </div>
            <span className="text-[10px] text-[#6B7280] font-medium">mensual estimado</span>
          </div>

          <p className="text-[11px] text-[#1F2937] mt-2.5 leading-relaxed line-clamp-2">
            {job.desc}
          </p>

          <div className="mt-2.5 space-y-1">
            {job.requirements.slice(0, 2).map((req, rIdx) => (
              <div key={rIdx} className="flex items-center gap-1.5 text-[11px] text-[#6B7280]">
                <CheckCircle2 size={11} className="text-[#00B894] flex-shrink-0" />
                <span className="truncate">{req}</span>
              </div>
            ))}
          </div>
        </div>

        {/* INDICADOR DE ACCIONES */}
        <div className="pt-2 border-t border-[#E5E7EB] flex items-center justify-between">
          <span className="text-[10px] text-[#FF5B5B] font-bold flex items-center gap-1">
            ← Descartar
          </span>
          <span className="text-[10px] text-[#6B7280] font-medium">desliza</span>
          <span className="text-[10px] text-[#00B894] font-bold flex items-center gap-1">
            Postular →
          </span>
        </div>
      </div>
    </motion.div>
  )
}

// ========================================================
// COMPONENTE: MIS POSTULACIONES (REQUERIDO)
// ========================================================
function ApplicationsScreen({ applications, onOpenChat, onGoToJobs }) {
  const getBadgeStyle = (statusType) => {
    switch (statusType) {
      case 'match':
        return 'bg-[#E8F8F1] text-[#00B894] border-[#00B894]/30';
      case 'review':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'sent':
      default:
        return 'bg-blue-50 text-blue-800 border-blue-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full bg-[#F9FAFB]"
    >
      {/* Cabecera */}
      <div className="bg-white px-5 py-4 border-b border-[#E5E7EB] shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-[#00B894] uppercase tracking-wider block">
              Tus Oportunidades
            </span>
            <h2 className="text-xl font-black text-[#0E2A47]">
              Mis Postulaciones
            </h2>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#E8F8F1] text-[#00B894] font-bold text-xs">
            {applications.length} registradas
          </span>
        </div>
      </div>

      <div className="p-4 flex-1 overflow-y-auto space-y-3.5 hide-scroll">

        {/* BANNER INFORMATIVO */}
        <div className="bg-gradient-to-r from-[#00B894] to-[#0E2A47] text-white p-4 rounded-3xl shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0">
            <Briefcase size={22} className="text-white" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm leading-snug">Seguimiento en Andahuaylas</h4>
            <p className="text-xs text-white/80">Las empresas revisan los perfiles con CV optimizado por IA.</p>
          </div>
        </div>

        {/* LISTADO DE POSTULACIONES */}
        {applications.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-3xl border border-[#E5E7EB] p-6">
            <FileText size={36} className="mx-auto text-slate-300 mb-2" />
            <h3 className="font-bold text-[#0E2A47]">Aún no has postulado</h3>
            <p className="text-xs text-[#6B7280] mt-1 mb-4">Desliza tarjetas a la derecha en la pestaña Trabajos.</p>
            <button onClick={onGoToJobs} className="btn-primary py-2.5 px-5 text-xs">
              Ver trabajos disponibles
            </button>
          </div>
        ) : (
          applications.map((app) => (
            <div
              key={app.id}
              className="bg-white p-4 rounded-3xl border border-[#E5E7EB] shadow-soft hover:border-[#00B894] transition-all"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h4 className="font-extrabold text-[#0E2A47] text-base leading-snug">
                    {app.title}
                  </h4>
                  <p className="text-xs font-semibold text-[#6B7280]">
                    {app.company}
                  </p>
                </div>

                {/* BADGE DE ESTADO */}
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${getBadgeStyle(app.statusType)} flex items-center gap-1 flex-shrink-0`}>
                  {app.statusType === 'match' && <HeartHandshake size={12} />}
                  {app.statusType === 'review' && <Clock size={12} />}
                  {app.statusType === 'sent' && <Check size={12} />}
                  <span>{app.status}</span>
                </span>
              </div>

              {/* DETALLES DE SUELDO Y UBICACIÓN */}
              <div className="flex items-center gap-2 flex-wrap text-xs text-[#1F2937] mt-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-lg bg-[#E8F8F1] text-[#00B894] font-bold">
                  {app.salary}
                </span>
                <span className="text-[#6B7280]">·</span>
                <span className="text-[#6B7280]">{app.location}</span>
                <span className="text-[#6B7280]">·</span>
                <span className="text-[11px] text-[#6B7280]">{app.date}</span>
              </div>

              {/* NOTA O ESTADO */}
              <p className="text-xs text-[#6B7280] bg-[#F9FAFB] p-2.5 rounded-xl border border-[#E5E7EB] mb-3">
                {app.note}
              </p>

              {/* ACCIÓN: CHATEAR SI HAY MATCH */}
              {app.hasChat && (
                <button
                  onClick={() => onOpenChat(app)}
                  className="btn-gradient w-full py-2.5 text-xs flex items-center justify-center gap-1.5"
                >
                  <MessageCircle size={15} />
                  <span>Chatear con la empresa</span>
                </button>
              )}
            </div>
          ))
        )}

      </div>
    </motion.div>
  )
}

// ========================================================
// COMPONENTE: MODAL DE CELEBRACIÓN DE MATCH (REQUERIDO)
// ========================================================
function MatchModal({ job, onClose, onChat }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex flex-col items-center justify-center p-5 text-center"
      style={{ background: 'rgba(14,42,71,0.88)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
    >
      {/* Partículas decorativas */}
      <div className="absolute top-8 left-8 w-3 h-3 rounded-full bg-[#FFC107] opacity-70 animate-bounce"></div>
      <div className="absolute top-16 right-12 w-2 h-2 rounded-full bg-[#00B894] opacity-60" style={{ animationDelay: '0.3s', animation: 'bounce 1.4s ease-in-out infinite' }}></div>
      <div className="absolute bottom-20 left-14 w-2 h-2 rounded-full bg-[#4DA3FF] opacity-60" style={{ animationDelay: '0.6s', animation: 'bounce 1.8s ease-in-out infinite' }}></div>

      <motion.div
        initial={{ scale: 0.75, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', damping: 18, stiffness: 280 }}
        className="w-full max-w-sm bg-white rounded-4xl p-6 shadow-float border-2 border-[#00B894]/40 flex flex-col items-center relative overflow-hidden"
      >
        {/* Decorativo en la tarjeta */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00B894] to-[#0E2A47] rounded-t-4xl"></div>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#00B894]/5 -translate-y-12 translate-x-12 pointer-events-none"></div>

        {/* MASCOTA CAPIBARA CELEBRANDO */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-28 h-28 rounded-3xl overflow-hidden border-4 border-[#00B894]/25 shadow-card mb-3 relative"
        >
          <img
            src="/mascot/celebrate.jpg"
            alt="Capibara Festejando Match"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <span className="px-3.5 py-1 rounded-full bg-[#E8F8F1] text-[#00B894] text-[11px] font-black uppercase tracking-wider mb-2 border border-[#00B894]/20">
          ¡INTERÉS MUTUO!
        </span>

        <h3 className="text-[26px] font-black text-[#0E2A47] tracking-tight">
          ¡Es un Match!
        </h3>

        <p className="text-[12px] text-[#6B7280] mt-1.5 mb-3.5 leading-relaxed max-w-xs">
          <strong className="text-[#0E2A47]">{job.company}</strong> mostró interés en tu perfil para{' '}
          <strong className="text-[#00B894]">{job.title}</strong>.
        </p>

        {/* RESUMEN DE LA OFERTA */}
        <div className="w-full bg-[#F9FAFB] p-3 rounded-2xl border border-[#E5E7EB] text-left mb-4">
          <h4 className="font-black text-[#0E2A47] text-[13px]">{job.title}</h4>
          <p className="text-[12px] text-[#00B894] font-bold mt-0.5">{job.salary}</p>
          <p className="text-[11px] text-[#6B7280] mt-0.5">{job.location} · {job.modality}</p>
        </div>

        {/* BOTONES */}
        <div className="w-full space-y-2.5">
          <button
            onClick={onChat}
            className="btn-gradient w-full py-3.5 text-sm flex items-center justify-center gap-2"
          >
            <MessageCircle size={18} />
            <span>Chatear con la empresa</span>
          </button>

          <button
            onClick={onClose}
            className="btn-secondary w-full py-3 text-sm flex items-center justify-center gap-2"
          >
            <span>Seguir viendo trabajos</span>
          </button>
        </div>

        <p className="text-[10px] text-[#9CA3AF] mt-3 font-semibold tracking-wide uppercase">
          Conecta · Trabaja · Crece
        </p>
      </motion.div>
    </motion.div>
  )
}

// ========================================================
// COMPONENTE: CREAR O MEJORAR CV CON IA (REQUERIDO)
// ========================================================
function CvAiBuilderModal({ initialCv, onClose, onSaveCv, onDownloadCv }) {
  const [tabMode, setTabMode] = useState('write'); // 'write' | 'upload'
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStep, setProcessStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  // Campos de formulario
  const [desiredJob, setDesiredJob] = useState(initialCv.title || "Asistente de almacén y logística");
  const [skillsText, setSkillsText] = useState("Control de inventarios, Kardex, recepción de mercadería, guías de remisión, atención a proveedores, puntualidad, Excel básico.");
  const [experienceText, setExperienceText] = useState("2 años en tienda comercial de abarrotes en Andahuaylas organizando mercadería y coordinando despacho a tiendas locales.");
  const [educationText, setEducationText] = useState("Certificado en Gestión de Almacenes - Instituto Apurímac, Secundaria completa en Andahuaylas.");
  const [uploadedFileName, setUploadedFileName] = useState(null);

  // CV Generado
  const [generatedCv, setGeneratedCv] = useState(initialCv);

  const stepsText = [
    "Analizando tus habilidades y experiencia...",
    "Adaptando palabras clave para empresas de Andahuaylas...",
    "Redactando resumen profesional de alto impacto...",
    "¡CV Profesional completado con 96% de compatibilidad!"
  ];

  const handleGenerateCv = () => {
    setIsProcessing(true);
    setProcessStep(0);

    const interval = setInterval(() => {
      setProcessStep(prev => {
        if (prev >= 3) {
          clearInterval(interval);
          setIsProcessing(false);
          setShowPreview(true);
          // Actualizar CV con datos mejorados
          setGeneratedCv({
            ...initialCv,
            title: desiredJob,
            summary: `Profesional comprometido y proactivo con sólida experiencia en ${desiredJob.toLowerCase()} en la provincia de Andahuaylas. Especialista en optimización de operaciones, gestión de recursos y cumplimiento riguroso de metas laborales. Habilidad comprobada para trabajar en equipo y rápida adaptabilidad.`,
            skills: skillsText.split(',').map(s => s.trim()).filter(Boolean),
            isAiGenerated: true,
            score: 96
          });
          return 3;
        }
        return prev + 1;
      });
    }, 700);
  };

  const handleSimulateUpload = () => {
    setUploadedFileName("CV_Juan_Quispe_Borrador.pdf");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-[#0E2A47]/80 backdrop-blur-md z-50 flex flex-col justify-end sm:justify-center p-0 sm:p-4"
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25 }}
        className="w-full max-w-md bg-white rounded-t-4xl sm:rounded-4xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl mx-auto"
      >
        {/* Cabecera del Modal */}
        <div className="p-4 bg-white border-b border-[#E5E7EB] flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#4DA3FF] to-[#7C3AED] text-white flex items-center justify-center shadow-xs">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="font-extrabold text-[#0E2A47] text-base leading-tight">
                Crear o Mejorar CV con IA
              </h3>
              <p className="text-[11px] text-[#00B894] font-bold">
                Optimizado para Andahuaylas · Apurímac
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-[#6B7280] flex items-center justify-center hover:bg-slate-200"
          >
            <X size={18} />
          </button>
        </div>

        {/* CONTENIDO INTERNO */}
        <div className="p-4 overflow-y-auto flex-1 hide-scroll">

          {isProcessing ? (
            /* ANIMACIÓN DE ANÁLISIS DE LA IA */
            <div className="py-12 px-4 flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 rounded-3xl overflow-hidden bg-[#E8F8F1] p-1 mb-4 shadow-sm relative">
                <img src="/mascot/welcome.jpg" alt="Capibara IA" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#00B894]/10 animate-pulse"></div>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#E8F8F1] text-[#00B894] text-xs font-bold mb-3 flex items-center gap-1.5">
                <Sparkles size={14} className="animate-spin" />
                Inteligencia Artificial TrabajaYA
              </span>
              <h4 className="text-base font-extrabold text-[#0E2A47] mb-2">
                {stepsText[processStep]}
              </h4>
              <div className="w-48 h-2 bg-slate-100 rounded-full overflow-hidden mt-2">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#00B894] to-[#0E2A47]"
                  initial={{ width: '20%' }}
                  animate={{ width: `${(processStep + 1) * 25}%` }}
                />
              </div>
            </div>
          ) : showPreview ? (
            /* VISTA PREVIA DEL CV GENERADO */
            <div className="space-y-4">
              <div className="bg-[#E8F8F1] p-3.5 rounded-2xl border border-[#00B894]/30 flex items-center gap-3">
                <CheckCircle2 size={24} className="text-[#00B894] flex-shrink-0" />
                <div>
                  <h4 className="font-extrabold text-[#0E2A47] text-xs">¡CV Potenciado con éxito!</h4>
                  <p className="text-[11px] text-[#6B7280]">Tu perfil ahora destaca palabras clave que buscan los empleadores locales.</p>
                </div>
              </div>

              {/* TARJETA DEL CV FORMATEADO */}
              <div className="bg-[#F9FAFB] p-4.5 rounded-3xl border border-[#E5E7EB] text-left space-y-3">
                <div className="border-b border-[#E5E7EB] pb-3">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#00B894] text-white text-[10px] font-bold uppercase tracking-wider">
                    CV Verificado IA · 96%
                  </span>
                  <h3 className="text-lg font-black text-[#0E2A47] mt-1.5">{generatedCv.name}</h3>
                  <p className="text-xs font-bold text-[#00B894]">{generatedCv.title}</p>
                  <p className="text-[11px] text-[#6B7280] mt-0.5">📍 {generatedCv.location} · 📞 {generatedCv.phone}</p>
                </div>

                <div>
                  <h5 className="text-[11px] font-black text-[#0E2A47] uppercase tracking-wide mb-1">Resumen Ejecutivo</h5>
                  <p className="text-xs text-[#1F2937] leading-relaxed bg-white p-3 rounded-xl border border-[#E5E7EB]">
                    {generatedCv.summary}
                  </p>
                </div>

                <div>
                  <h5 className="text-[11px] font-black text-[#0E2A47] uppercase tracking-wide mb-1.5">Habilidades Destacadas</h5>
                  <div className="flex flex-wrap gap-1.5">
                    {generatedCv.skills.map((s, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-white border border-[#E5E7EB] text-[11px] font-semibold text-[#0E2A47]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-[11px] font-black text-[#0E2A47] uppercase tracking-wide mb-1">Experiencia Estructurada</h5>
                  <div className="space-y-1.5">
                    {generatedCv.experience.map((exp, eIdx) => (
                      <div key={eIdx} className="bg-white p-2.5 rounded-xl border border-[#E5E7EB] text-xs">
                        <strong className="text-[#0E2A47]">{exp.role}</strong> · <span className="text-[#6B7280]">{exp.company}</span>
                        <p className="text-[11px] text-[#6B7280] mt-0.5">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* BOTONES DE ACCIÓN: DESCARGAR Y VER TRABAJOS */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={onDownloadCv}
                  className="btn-secondary w-full py-3 text-sm flex items-center justify-center gap-2"
                >
                  <Download size={16} />
                  <span>Descargar CV (PDF / Imprimir)</span>
                </button>

                <button
                  onClick={() => onSaveCv(generatedCv)}
                  className="btn-gradient w-full py-3.5 text-sm flex items-center justify-center gap-2"
                >
                  <Briefcase size={16} />
                  <span>Ver los trabajos más adecuados para mi perfil</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ) : (
            /* FORMULARIO DE ENTRADA (ESCRIBIR O SUBIR) */
            <div className="space-y-4">
              {/* SWITCH DE PESTAÑAS */}
              <div className="flex bg-[#F0F4F8] p-1 rounded-2xl border border-[#E5E7EB]">
                <button
                  onClick={() => setTabMode('write')}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${tabMode === 'write' ? 'bg-[#00B894] text-white shadow-xs' : 'text-[#6B7280]'}`}
                >
                  Escribir mis habilidades
                </button>
                <button
                  onClick={() => setTabMode('upload')}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${tabMode === 'upload' ? 'bg-[#00B894] text-white shadow-xs' : 'text-[#6B7280]'}`}
                >
                  Subir mi CV actual
                </button>
              </div>

              {tabMode === 'write' ? (
                /* MODO 1: ESCRIBIR HABILIDADES */
                <div className="space-y-3.5 text-left">
                  <div>
                    <label className="text-xs font-bold text-[#0E2A47] block mb-1">
                      Puesto u oficio que buscas:
                    </label>
                    <input
                      value={desiredJob}
                      onChange={(e) => setDesiredJob(e.target.value)}
                      placeholder="Ej: Asistente de almacén, Gasfitero, Vendedor..."
                      className="w-full bg-[#F0F4F8] rounded-xl px-3.5 py-2.5 text-xs text-[#1F2937] outline-none border border-transparent focus:border-[#00B894]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#0E2A47] block mb-1">
                      Habilidades y conocimientos:
                    </label>
                    <textarea
                      rows={3}
                      value={skillsText}
                      onChange={(e) => setSkillsText(e.target.value)}
                      placeholder="Ej: Manejo de inventarios, atención al cliente, Excel, brevete..."
                      className="w-full bg-[#F0F4F8] rounded-xl p-3 text-xs text-[#1F2937] outline-none border border-transparent focus:border-[#00B894] resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#0E2A47] block mb-1">
                      Experiencia laboral previa:
                    </label>
                    <textarea
                      rows={2}
                      value={experienceText}
                      onChange={(e) => setExperienceText(e.target.value)}
                      placeholder="Ej: 2 años en bodega o tienda en Andahuaylas..."
                      className="w-full bg-[#F0F4F8] rounded-xl p-3 text-xs text-[#1F2937] outline-none border border-transparent focus:border-[#00B894] resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#0E2A47] block mb-1">
                      Estudios o certificaciones:
                    </label>
                    <input
                      value={educationText}
                      onChange={(e) => setEducationText(e.target.value)}
                      placeholder="Ej: Secundaria completa, curso de almacén..."
                      className="w-full bg-[#F0F4F8] rounded-xl px-3.5 py-2.5 text-xs text-[#1F2937] outline-none border border-transparent focus:border-[#00B894]"
                    />
                  </div>
                </div>
              ) : (
                /* MODO 2: SUBIR CV ACTUAL */
                <div className="space-y-3.5 text-left">
                  <div
                    onClick={handleSimulateUpload}
                    className="border-2 border-dashed border-[#00B894] bg-[#E8F8F1]/50 p-6 rounded-3xl text-center cursor-pointer hover:bg-[#E8F8F1] transition-colors"
                  >
                    <Upload size={32} className="mx-auto text-[#00B894] mb-2" />
                    <h4 className="font-extrabold text-[#0E2A47] text-sm">
                      {uploadedFileName ? uploadedFileName : "Arrastra o toca para subir tu CV"}
                    </h4>
                    <p className="text-xs text-[#6B7280] mt-1">
                      Formatos compatibles: PDF, Word (.docx) o imagen
                    </p>
                    {uploadedFileName && (
                      <span className="inline-block mt-3 px-3 py-1 bg-[#00B894] text-white text-xs font-bold rounded-full">
                        ✓ Archivo cargado correctamente
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#6B7280] leading-relaxed">
                    La IA extraerá tu historial, corregirá la redacción y potenciará tus puntos fuertes para que coincidan con las mejores ofertas de Andahuaylas.
                  </p>
                </div>
              )}

              {/* BOTÓN PARA DISPARAR LA IA */}
              <div className="pt-2">
                <button
                  onClick={handleGenerateCv}
                  className="btn-primary w-full py-3.5 text-sm flex items-center justify-center gap-2"
                >
                  <Sparkles size={16} />
                  <span>Crear / Optimizar CV con IA</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </motion.div>
    </motion.div>
  )
}

// ========================================================
// COMPONENTE: MODAL DE BIENVENIDA Y REGISTRO (REQUERIDO)
// ========================================================
function AuthFlowModal({ step, onSetStep, onCompleteRegistration }) {
  const [selectedProfile, setSelectedProfile] = useState('empleado');
  const [name, setName] = useState('Juan Quispe Huamán');
  const [phone, setPhone] = useState('983 456 789');
  const [district, setDistrict] = useState('Andahuaylas');
  const [occupation, setOccupation] = useState('Asistente de almacén y logística');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-[#0E2A47]/85 backdrop-blur-md z-50 flex flex-col justify-end sm:justify-center p-0 sm:p-4"
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        className="w-full max-w-md bg-white rounded-t-4xl sm:rounded-4xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl mx-auto"
      >
        {/* PANTALLA 1: BIENVENIDA */}
        {step === 'welcome' && (
          <div className="p-6 text-center overflow-y-auto">
            {/* LOGO */}
            <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-[#00B894] to-[#0E2A47] text-white flex items-center justify-center mx-auto mb-3 shadow-md">
              <Briefcase size={28} />
            </div>
            <h2 className="text-3xl font-black text-[#0E2A47] tracking-tight">
              Trabaja<span className="text-[#00B894]">YA</span>
            </h2>
            <p className="text-xs font-bold text-[#00B894] uppercase tracking-wider mt-1">
              Conecta · Trabaja · Crece
            </p>

            {/* MASCOTA CAPIBARA */}
            <div className="w-28 h-28 rounded-3xl overflow-hidden bg-[#E8F8F1] border-2 border-[#00B894]/20 shadow-xs mx-auto my-4 relative">
              <img
                src="/mascot/welcome.jpg"
                alt="Capibara Mascota TrabajaYA"
                className="w-full h-full object-cover"
              />
            </div>

            <span className="px-3 py-1 rounded-full bg-[#E8F8F1] text-[#0E2A47] text-xs font-bold inline-block mb-3">
              📍 Andahuaylas · Apurímac
            </span>

            <p className="text-xs text-[#6B7280] leading-relaxed max-w-xs mx-auto mb-6">
              "El talento también trabaja". Conectamos personas que buscan trabajo con empresas y clientes que necesitan servicios.
            </p>

            {/* BOTONES "COMENZAR" E "INICIAR SESIÓN" (REQUERIDOS) */}
            <div className="space-y-2.5">
              <button
                onClick={() => onSetStep('select-profile')}
                className="btn-gradient w-full py-3.5 text-sm flex items-center justify-center gap-2"
              >
                <UserPlus size={18} />
                <span>Comenzar</span>
              </button>

              <button
                onClick={() => onSetStep('login')}
                className="btn-secondary w-full py-3 text-sm flex items-center justify-center gap-2"
              >
                <LogIn size={18} />
                <span>Iniciar sesión</span>
              </button>
            </div>
          </div>
        )}

        {/* PANTALLA 2: ELEGIR PERFIL (EMPLEADO, EMPRESA, PERSONA NATURAL) */}
        {step === 'select-profile' && (
          <div className="p-6 overflow-y-auto">
            <button
              onClick={() => onSetStep('welcome')}
              className="text-xs text-[#6B7280] font-bold flex items-center gap-1 mb-3 hover:text-[#0E2A47]"
            >
              <ChevronLeft size={16} /> Volver
            </button>

            <h3 className="text-2xl font-black text-[#0E2A47]">
              Elige tu perfil
            </h3>
            <p className="text-xs text-[#6B7280] mt-1 mb-5">
              ¿Cómo quieres usar TrabajaYA en Andahuaylas?
            </p>

            <div className="space-y-3">
              <ProfileOptionCard
                active={selectedProfile === 'empleado'}
                icon={<Briefcase size={22} className="text-[#00B894]" />}
                title="Empleado"
                desc="Busco empleo formal o trabajo profesional en empresas locales."
                onClick={() => setSelectedProfile('empleado')}
              />

              <ProfileOptionCard
                active={selectedProfile === 'empresa'}
                icon={<Building2 size={22} className="text-[#4DA3FF]" />}
                title="Empresa"
                desc="Busco publicar ofertas y contratar talento con filtrado por IA."
                onClick={() => setSelectedProfile('empresa')}
              />

              <ProfileOptionCard
                active={selectedProfile === 'persona'}
                icon={<PenTool size={22} className="text-[#FFC107]" />}
                title="Persona natural"
                desc="Ofrezco mis servicios técnicos u oficios, o busco contratar servicios."
                onClick={() => setSelectedProfile('persona')}
              />
            </div>

            <div className="pt-6">
              <button
                onClick={() => onSetStep('register')}
                className="btn-primary w-full py-3.5 text-sm flex items-center justify-center gap-2"
              >
                <span>Continuar al registro</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* PANTALLA 3: REGISTRO CORTO */}
        {step === 'register' && (
          <div className="p-6 overflow-y-auto text-left">
            <button
              onClick={() => onSetStep('select-profile')}
              className="text-xs text-[#6B7280] font-bold flex items-center gap-1 mb-3 hover:text-[#0E2A47]"
            >
              <ChevronLeft size={16} /> Cambiar perfil
            </button>

            <h3 className="text-2xl font-black text-[#0E2A47]">
              Registro rápido
            </h3>
            <p className="text-xs text-[#6B7280] mt-1 mb-4">
              Solo unos datos para conectar con oportunidades en Andahuaylas.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-[#0E2A47] block mb-1">Nombre y Apellidos:</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej: Juan Quispe Huamán"
                  className="w-full bg-[#F0F4F8] rounded-xl px-3.5 py-2.5 text-xs text-[#1F2937] outline-none border border-transparent focus:border-[#00B894]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#0E2A47] block mb-1">Celular / WhatsApp:</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ej: 983 456 789"
                  className="w-full bg-[#F0F4F8] rounded-xl px-3.5 py-2.5 text-xs text-[#1F2937] outline-none border border-transparent focus:border-[#00B894]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#0E2A47] block mb-1">Distrito en Apurímac:</label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-[#F0F4F8] rounded-xl px-3.5 py-2.5 text-xs text-[#1F2937] outline-none border border-transparent focus:border-[#00B894]"
                >
                  <option value="Andahuaylas">Andahuaylas</option>
                  <option value="San Jerónimo">San Jerónimo</option>
                  <option value="Talavera">Talavera</option>
                  <option value="Huancaray">Huancaray</option>
                  <option value="Chincheros">Chincheros</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#0E2A47] block mb-1">Ocupación o Rubro de interés:</label>
                <input
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  placeholder="Ej: Almacén, Ventas, Gasfitería..."
                  className="w-full bg-[#F0F4F8] rounded-xl px-3.5 py-2.5 text-xs text-[#1F2937] outline-none border border-transparent focus:border-[#00B894]"
                />
              </div>
            </div>

            <div className="pt-5 space-y-2">
              <button
                onClick={() => onCompleteRegistration({ name, phone, district, profileType: selectedProfile, occupation })}
                className="btn-gradient w-full py-3.5 text-sm flex items-center justify-center gap-2"
              >
                <span>Crear cuenta y comenzar</span>
                <Check size={16} />
              </button>
            </div>
          </div>
        )}

        {/* PANTALLA 4: INICIAR SESIÓN */}
        {step === 'login' && (
          <div className="p-6 overflow-y-auto text-left">
            <button
              onClick={() => onSetStep('welcome')}
              className="text-xs text-[#6B7280] font-bold flex items-center gap-1 mb-3 hover:text-[#0E2A47]"
            >
              <ChevronLeft size={16} /> Volver
            </button>

            <h3 className="text-2xl font-black text-[#0E2A47]">
              Iniciar sesión
            </h3>
            <p className="text-xs text-[#6B7280] mt-1 mb-4">
              Ingresa con tu número registrado en TrabajaYA.
            </p>

            <div className="space-y-3 mb-5">
              <div>
                <label className="text-xs font-bold text-[#0E2A47] block mb-1">Celular:</label>
                <input
                  defaultValue="983 456 789"
                  className="w-full bg-[#F0F4F8] rounded-xl px-3.5 py-2.5 text-xs text-[#1F2937] outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#0E2A47] block mb-1">Código o Contraseña:</label>
                <input
                  type="password"
                  defaultValue="••••••••"
                  className="w-full bg-[#F0F4F8] rounded-xl px-3.5 py-2.5 text-xs text-[#1F2937] outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => onCompleteRegistration({ name: "Juan Quispe Huamán", phone: "983 456 789", district: "Andahuaylas", profileType: "empleado", occupation: "Asistente de almacén" })}
                className="btn-primary w-full py-3 text-sm flex items-center justify-center gap-2"
              >
                <span>Entrar como Juan Quispe (Demo)</span>
              </button>
              <button
                onClick={() => onSetStep('select-profile')}
                className="btn-secondary w-full py-2.5 text-xs flex items-center justify-center gap-1.5"
              >
                <span>¿No tienes cuenta? Regístrate aquí</span>
              </button>
            </div>
          </div>
        )}

      </motion.div>
    </motion.div>
  )
}

function ProfileOptionCard({ active, icon, title, desc, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-3xl border text-left transition-all flex items-start gap-3.5 ${
        active
          ? 'bg-[#E8F8F1] border-[#00B894] shadow-xs'
          : 'bg-white border-[#E5E7EB] hover:border-[#00B894]'
      }`}
    >
      <div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center shadow-xs flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="font-extrabold text-[#0E2A47] text-sm">{title}</h4>
        <p className="text-xs text-[#6B7280] mt-0.5 leading-relaxed">{desc}</p>
      </div>
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1 ${active ? 'border-[#00B894] bg-[#00B894] text-white' : 'border-slate-300'}`}>
        {active && <Check size={12} strokeWidth={3} />}
      </div>
    </button>
  )
}

// ========================================================
// COMPONENTE: PANTALLA DE MATCH / CONEXIONES ACTIVAS
// ========================================================
function MatchTabScreen({ applications, onOpenChat, onGoToJobs }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full bg-[#F9FAFB]"
    >
      <div className="bg-white px-5 py-4 border-b border-[#E5E7EB] shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-[#00B894] uppercase tracking-wider block">
              Conexiones de Empleo
            </span>
            <h2 className="text-xl font-black text-[#0E2A47]">
              Matches Confirmados
            </h2>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#E8F8F1] text-[#00B894] font-bold text-xs">
            {applications.length} Activos
          </span>
        </div>
      </div>

      <div className="p-4 flex-1 overflow-y-auto space-y-3.5 hide-scroll">
        <div className="bg-gradient-to-r from-[#00B894] to-[#0E2A47] text-white p-4 rounded-3xl shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0">
            <HeartHandshake size={22} className="text-white" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm leading-snug">"El talento también trabaja"</h4>
            <p className="text-xs text-white/80">Comunícate directamente por chat con las empresas interesadas.</p>
          </div>
        </div>

        {applications.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-3xl border border-[#E5E7EB] p-6">
            <HeartHandshake size={36} className="mx-auto text-slate-300 mb-2" />
            <h3 className="font-bold text-[#0E2A47]">Aún no tienes matches</h3>
            <p className="text-xs text-[#6B7280] mt-1 mb-4">Postula a más trabajos en la pestaña Trabajos.</p>
            <button onClick={onGoToJobs} className="btn-primary py-2.5 px-5 text-xs">
              Explorar vacantes
            </button>
          </div>
        ) : (
          applications.map((app) => (
            <div
              key={app.id}
              className="bg-white p-4 rounded-3xl border border-[#00B894]/30 shadow-soft flex items-center justify-between gap-3"
            >
              <div>
                <span className="text-[10px] font-bold text-[#00B894] uppercase">Match Confirmado</span>
                <h4 className="font-extrabold text-[#0E2A47] text-base">{app.company}</h4>
                <p className="text-xs text-[#6B7280]">{app.title}</p>
                <p className="text-[11px] text-[#00B894] font-bold mt-0.5">{app.salary}</p>
              </div>

              <button
                onClick={() => onOpenChat(app)}
                className="w-11 h-11 rounded-2xl bg-[#00B894] text-white flex items-center justify-center shadow-btn active:scale-95 transition-transform flex-shrink-0"
                title="Chatear"
              >
                <MessageCircle size={20} />
              </button>
            </div>
          ))
        )}
      </div>
    </motion.div>
  )
}

// ========================================================
// COMPONENTE: PERFIL DEL USUARIO
// ========================================================
function ProfileScreen({ user, cv, onOpenCvModal, onDownloadCv, onLogout }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-full bg-[#F9FAFB] overflow-y-auto hide-scroll"
    >
      <div className="bg-white px-5 pt-6 pb-5 border-b border-[#E5E7EB] text-center shadow-xs">
        <div className="relative w-20 h-20 mx-auto mb-3">
          <div className="w-20 h-20 rounded-3xl bg-[#0E2A47] text-white flex items-center justify-center font-black text-2xl border-4 border-white shadow-soft">
            <User size={36} />
          </div>
          <div className="absolute bottom-0 right-0 bg-[#00B894] text-white p-1 rounded-full border-2 border-white shadow-xs">
            <Check size={12} strokeWidth={3} />
          </div>
        </div>

        <h2 className="text-xl font-black text-[#0E2A47]">{user.name}</h2>
        <p className="text-xs text-[#6B7280] mt-0.5">
          {user.district}, Apurímac · {user.phone}
        </p>

        <div className="mt-3 flex items-center justify-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[#E8F8F1] text-[#00B894] font-bold text-xs flex items-center gap-1.5 border border-[#00B894]/20">
            <ShieldCheck size={14} /> Identidad Verificada
          </span>
          <span className="px-3 py-1 rounded-full bg-[#F0F4F8] text-[#0E2A47] font-bold text-xs uppercase">
            {user.profileType}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-3.5">
        {/* TARJETA CV CON IA */}
        <div className="bg-white p-4.5 rounded-3xl border border-[#00B894]/30 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-[#00B894]" />
              <h4 className="font-extrabold text-[#0E2A47] text-sm">Mi CV Digital con IA</h4>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-[#E8F8F1] text-[#00B894] text-[10px] font-bold">
              {cv.score}% Potenciado
            </span>
          </div>
          <p className="text-xs text-[#6B7280] leading-relaxed mb-3">
            {cv.title} · Actualizado para empresas de Andahuaylas.
          </p>
          <div className="flex gap-2">
            <button
              onClick={onOpenCvModal}
              className="btn-primary flex-1 py-2.5 text-xs flex items-center justify-center gap-1.5"
            >
              <Sparkles size={14} />
              <span>Editar con IA</span>
            </button>
            <button
              onClick={onDownloadCv}
              className="btn-secondary py-2.5 px-3.5 text-xs flex items-center justify-center gap-1.5"
              title="Descargar archivo"
            >
              <Download size={14} />
              <span>Descargar</span>
            </button>
          </div>
        </div>

        {/* ACCIONES DE CUENTA */}
        <div className="bg-white rounded-3xl border border-[#E5E7EB] overflow-hidden shadow-soft">
          <button
            onClick={onLogout}
            className="w-full p-4 flex items-center justify-between hover:bg-slate-50 text-left border-b border-[#E5E7EB] last:border-0"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-[#6B7280]">
                <LogIn size={16} />
              </div>
              <div>
                <h5 className="font-bold text-[#0E2A47] text-xs">Cambiar de perfil o usuario</h5>
                <p className="text-[11px] text-[#6B7280]">Empleado, Empresa o Persona natural</p>
              </div>
            </div>
            <ArrowRight size={16} className="text-[#6B7280]" />
          </button>
        </div>

        <div className="text-center pt-2 pb-4">
          <p className="text-xs font-bold text-[#0E2A47]">TrabajaYA Andahuaylas</p>
          <p className="text-[11px] text-[#00B894] font-semibold mt-0.5">"Conecta · Trabaja · Crece"</p>
        </div>
      </div>
    </motion.div>
  )
}

// ========================================================
// COMPONENTE: MODAL DE CHAT INTERACTIVO
// ========================================================
function ChatModal({ target, onClose }) {
  const [messages, setMessages] = useState([
    {
      role: 'company',
      text: target.isCompany
        ? `¡Hola! Hemos revisado tu postulación para ${target.subtitle}. Nos interesa tu perfil y tu CV optimizado. ¿Cuándo tendrías disponibilidad para una breve entrevista?`
        : '¡Hola! Soy tu asistente de TrabajaYA en Andahuaylas. ¿En qué te puedo orientar hoy con respecto a tus postulaciones o empleos?'
    }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: inputText }]);
    const sentText = inputText;
    setInputText('');

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          role: 'company',
          text: target.isCompany
            ? `Muchas gracias por responder. Hemos registrado tu mensaje: "${sentText}". Coordinaremos los detalles y te llamaremos al 983 456 789.`
            : 'Excelente. Recuerda que puedes postular a varias vacantes al mismo tiempo deslizando a la derecha.'
        }
      ]);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25 }}
      className="absolute inset-0 bg-white z-50 flex flex-col"
    >
      {/* Cabecera del Chat */}
      <div className="p-4 bg-white border-b border-[#E5E7EB] flex items-center gap-3 shadow-xs">
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-[#0E2A47]"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="w-10 h-10 rounded-2xl bg-[#E8F8F1] border border-[#00B894]/30 flex items-center justify-center text-[#00B894] font-black text-sm flex-shrink-0">
          {target.isCompany ? <Building2 size={20} /> : <Sparkles size={20} />}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-extrabold text-[#0E2A47] text-sm truncate">{target.name}</h4>
          <p className="text-[11px] text-[#00B894] font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00B894] animate-pulse"></span>
            En línea · Andahuaylas
          </p>
        </div>
      </div>

      {/* Mensajes */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 hide-scroll bg-[#F9FAFB]">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] p-3.5 rounded-3xl text-xs leading-relaxed shadow-soft ${
                m.role === 'user'
                  ? 'bg-gradient-to-r from-[#00B894] to-[#0E2A47] text-white rounded-br-none'
                  : 'bg-white text-[#1F2937] border border-[#E5E7EB] rounded-bl-none'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* Barra de envío */}
      <form onSubmit={handleSend} className="p-3 bg-white border-t border-[#E5E7EB] flex gap-2">
        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Escribe tu mensaje aquí..."
          className="flex-1 bg-[#F0F4F8] text-xs text-[#1F2937] px-4 py-3 rounded-full outline-none border border-transparent focus:border-[#00B894]"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="w-11 h-11 rounded-full bg-[#00B894] disabled:opacity-50 text-white flex items-center justify-center flex-shrink-0 shadow-btn"
        >
          <Send size={16} />
        </button>
      </form>
    </motion.div>
  )
}

// ========================================================
// COMPONENTE: BOTÓN DE NAVEGACIÓN INFERIOR
// ========================================================
function NavButton({ active, onClick, icon, label, badge }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl relative transition-all ${
        active ? 'text-[#00B894] font-bold' : 'text-[#6B7280] hover:text-[#0E2A47]'
      }`}
    >
      <div className="relative">
        <div className={`p-1 rounded-xl transition-all ${active ? 'bg-[#E8F8F1]' : ''}`}>
          {icon}
        </div>
        {badge && (
          <span className="absolute -top-1 -right-1 bg-[#FFC107] text-[#0E2A47] font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
            {badge}
          </span>
        )}
      </div>
      <span className={`text-[10px] mt-0.5 tracking-tight ${active ? 'font-black text-[#00B894]' : 'font-medium'}`}>
        {label}
      </span>
      {active && (
        <motion.div
          layoutId="active-nav-indicator"
          className="w-1.5 h-1.5 rounded-full bg-[#00B894] absolute -bottom-1"
        />
      )}
    </button>
  )
}

// ========================================================
// EMPRESA: PANTALLA DE INICIO
// ========================================================
function EmpresaHomeScreen({ user, publishedJobs, candidates, onPublish, onGoToCandidatos, onGoToVacantes, onOpenAuth }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="flex flex-col h-full bg-[#F9FAFB] overflow-y-auto hide-scroll">
      {/* Header */}
      <div className="bg-white px-5 pt-5 pb-3 border-b border-[#E5E7EB] sticky top-0 z-20" style={{ boxShadow: '0 1px 10px rgba(14,42,71,0.06)' }}>
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-[14px] bg-gradient-to-br from-[#0E2A47] to-[#4DA3FF] flex items-center justify-center text-white shadow-soft">
              <Building2 size={19} />
            </div>
            <div>
              <h1 className="text-[20px] font-black text-[#0E2A47] leading-none">Panel <span className="text-[#00B894]">Empresa</span></h1>
              <p className="text-[10px] font-bold text-[#4DA3FF] tracking-widest mt-0.5 uppercase">{user.name || 'Mi Empresa'} · Andahuaylas</p>
            </div>
          </div>
          <button onClick={onOpenAuth} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#E8F8F1] text-[#6B7280] flex items-center justify-center transition-colors">
            <User size={16} />
          </button>
        </div>
        <div className="brand-stripe"></div>
      </div>

      <div className="p-4 space-y-3.5">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { label: 'Vacantes', value: publishedJobs.length, color: '#4DA3FF', bg: '#EBF4FF' },
            { label: 'Candidatos', value: candidates.length, color: '#00B894', bg: '#E8F8F1' },
            { label: 'Matches', value: 2, color: '#7C3AED', bg: '#F3EEFF' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-3 border border-[#E5E7EB] shadow-soft text-center">
              <div className="text-2xl font-black" style={{ color: s.color }}>{s.value}</div>
              <div className="text-[10px] font-bold text-[#6B7280] mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Publicar */}
        <button onClick={onPublish}
          className="w-full flex items-center gap-3 p-4 rounded-3xl border-2 border-[#00B894] bg-white shadow-card relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-[#00B894]/5 -translate-y-6 translate-x-6 pointer-events-none"></div>
          <div className="w-11 h-11 rounded-[14px] bg-gradient-to-br from-[#00B894] to-[#0E2A47] text-white flex items-center justify-center flex-shrink-0">
            <Plus size={22} />
          </div>
          <div className="flex-1 text-left">
            <h3 className="font-black text-[#0E2A47] text-[15px]">Publicar nueva vacante</h3>
            <p className="text-[11px] text-[#6B7280] mt-0.5">La IA filtra candidatos por ti automáticamente</p>
          </div>
          <ArrowRight size={18} className="text-[#00B894] flex-shrink-0" />
        </button>

        {/* Candidatos destacados */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-black text-[#0E2A47] text-[13px]">Candidatos compatibles</h3>
            <button onClick={onGoToCandidatos} className="text-[11px] font-bold text-[#00B894] flex items-center gap-1">
              Ver todos <ArrowRight size={12} />
            </button>
          </div>
          <div className="space-y-2.5">
            {candidates.slice(0, 2).map(c => (
              <div key={c.id} className="bg-white p-3.5 rounded-2xl border border-[#E5E7EB] shadow-soft flex items-center gap-3">
                <img src={c.image} alt={c.name} className="w-11 h-11 rounded-2xl object-cover flex-shrink-0 border-2 border-white shadow-soft" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="font-black text-[#0E2A47] text-[13px] truncate">{c.name}</p>
                    {c.verified && <ShieldCheck size={12} className="text-[#00B894] flex-shrink-0" />}
                  </div>
                  <p className="text-[11px] text-[#6B7280]">{c.title} · {c.location}</p>
                </div>
                <div className="flex-shrink-0 px-2.5 py-1 rounded-xl text-[11px] font-black" style={{ background: '#E8F8F1', color: '#00B894' }}>
                  {c.match}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vacantes activas */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-black text-[#0E2A47] text-[13px]">Mis vacantes activas</h3>
            <button onClick={onGoToVacantes} className="text-[11px] font-bold text-[#00B894] flex items-center gap-1">
              Gestionar <ArrowRight size={12} />
            </button>
          </div>
          <div className="space-y-2">
            {publishedJobs.map(j => (
              <div key={j.id} className="bg-white p-3.5 rounded-2xl border border-[#E5E7EB] shadow-soft flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#0E2A47] text-[13px]">{j.title}</p>
                  <p className="text-[11px] text-[#6B7280]">{j.candidates} candidatos · {j.date}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#E8F8F1] text-[#00B894] text-[10px] font-black border border-[#00B894]/20">{j.status}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="h-2"></div>
      </div>
    </motion.div>
  )
}

// ========================================================
// EMPRESA: CANDIDATOS EN TARJETAS (SWIPE)
// ========================================================
function CandidatesSwipeScreen({ candidates, onAction, onOpenChat }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="flex flex-col h-full bg-[#F9FAFB]">
      <div className="bg-white px-5 py-3.5 border-b border-[#E5E7EB]" style={{ boxShadow: '0 1px 8px rgba(14,42,71,0.06)' }}>
        <span className="text-[10px] font-bold text-[#4DA3FF] uppercase tracking-wider block">Filtrados por IA · Andahuaylas</span>
        <h2 className="text-[18px] font-black text-[#0E2A47]">Candidatos Compatibles</h2>
      </div>

      <div className="flex-1 p-4 overflow-y-auto hide-scroll space-y-3.5">
        {candidates.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-[#E5E7EB] p-6 shadow-soft">
            <Users size={40} className="mx-auto text-slate-300 mb-3" />
            <h3 className="font-bold text-[#0E2A47]">Sin candidatos pendientes</h3>
            <p className="text-xs text-[#6B7280] mt-1">Ya revisaste todos los candidatos filtrados.</p>
          </div>
        ) : (
          candidates.map(c => (
            <motion.div key={c.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl border border-[#E5E7EB] shadow-card overflow-hidden">
              {/* Foto + header */}
              <div className="flex items-start gap-3.5 p-4">
                <div className="relative flex-shrink-0">
                  <img src={c.image} alt={c.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-soft" />
                  {c.verified && (
                    <div className="absolute -bottom-1 -right-1 bg-[#00B894] rounded-full p-1 border-2 border-white">
                      <ShieldCheck size={10} className="text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-black text-[#0E2A47] text-[15px] leading-tight">{c.name}</h3>
                      <p className="text-[11px] text-[#6B7280]">{c.title} · {c.age} años · {c.location}</p>
                    </div>
                    <div className="px-2.5 py-1 rounded-xl font-black text-[12px] flex-shrink-0"
                      style={{ background: '#E8F8F1', color: '#00B894' }}>
                      {c.match}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[11px] font-bold text-[#0E2A47] bg-[#F0F4F8] px-2 py-0.5 rounded-lg">{c.salary} esperado</span>
                    <span className="text-[10px] text-[#6B7280]">Exp: {c.experience}</span>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="px-4 pb-3 flex flex-wrap gap-1.5">
                {c.skills.map((sk, i) => (
                  <span key={i} className="px-2.5 py-0.5 rounded-lg bg-[#F0F4F8] text-[#0E2A47] text-[11px] font-semibold border border-[#E5E7EB]">{sk}</span>
                ))}
                <span className="px-2.5 py-0.5 rounded-lg bg-[#FFF8E1] text-amber-700 text-[11px] font-bold border border-amber-200">Disponible: {c.available}</span>
              </div>

              {/* Acciones */}
              <div className="px-4 pb-4 flex gap-2.5">
                <button onClick={() => onAction(c.id, 'discard')}
                  className="flex-1 py-2.5 rounded-2xl border-2 border-[#FF5B5B]/30 text-[#FF5B5B] font-bold text-[12px] flex items-center justify-center gap-1.5 hover:bg-[#FFF0F0] transition-colors"
                  style={{ boxShadow: '0 2px 10px rgba(255,91,91,0.12)' }}>
                  <X size={16} /> Descartar
                </button>
                <button onClick={() => onOpenChat(c)}
                  className="flex-1 py-2.5 rounded-2xl border border-[#4DA3FF]/30 text-[#4DA3FF] font-bold text-[12px] flex items-center justify-center gap-1.5 hover:bg-[#EBF4FF] transition-colors">
                  <MessageCircle size={15} /> Escribir
                </button>
                <button onClick={() => onAction(c.id, 'accept')}
                  className="flex-1 py-2.5 rounded-2xl font-bold text-[12px] text-white flex items-center justify-center gap-1.5 transition-all"
                  style={{ background: 'linear-gradient(135deg,#00B894,#0E2A47)', boxShadow: '0 4px 14px rgba(0,184,148,0.35)' }}>
                  <Check size={16} /> Aceptar
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  )
}

// ========================================================
// EMPRESA: MIS VACANTES
// ========================================================
function VacantesScreen({ jobs, onPublish }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="flex flex-col h-full bg-[#F9FAFB]">
      <div className="bg-white px-5 py-3.5 border-b border-[#E5E7EB] flex items-center justify-between" style={{ boxShadow: '0 1px 8px rgba(14,42,71,0.06)' }}>
        <div>
          <span className="text-[10px] font-bold text-[#4DA3FF] uppercase tracking-wider block">Gestión de</span>
          <h2 className="text-[18px] font-black text-[#0E2A47]">Mis Vacantes</h2>
        </div>
        <button onClick={onPublish}
          className="flex items-center gap-1.5 px-3 py-2 rounded-2xl text-white text-[12px] font-bold"
          style={{ background: 'linear-gradient(135deg,#00B894,#0E2A47)', boxShadow: '0 3px 12px rgba(0,184,148,0.3)' }}>
          <Plus size={15} /> Nueva
        </button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto hide-scroll space-y-3">
        {jobs.map(j => (
          <div key={j.id} className="bg-white rounded-3xl border border-[#E5E7EB] shadow-soft p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-black text-[#0E2A47] text-[14px]">{j.title}</h3>
                <p className="text-[11px] text-[#6B7280] mt-0.5">Publicada {j.date} · Andahuaylas</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#E8F8F1] text-[#00B894] text-[10px] font-black border border-[#00B894]/20">{j.status}</span>
            </div>
            <div className="flex items-center gap-3 pt-2 border-t border-[#E5E7EB]">
              <div className="flex items-center gap-1.5 text-[12px] font-bold text-[#0E2A47]">
                <Users size={14} className="text-[#4DA3FF]" />
                <span>{j.candidates} candidatos</span>
              </div>
              <div className="flex items-center gap-1.5 text-[12px] font-bold text-[#00B894]">
                <HeartHandshake size={14} />
                <span>2 matches</span>
              </div>
            </div>
          </div>
        ))}
        <button onClick={onPublish}
          className="w-full py-4 rounded-3xl border-2 border-dashed border-[#00B894]/40 text-[#00B894] font-bold text-[13px] flex items-center justify-center gap-2 hover:bg-[#E8F8F1] transition-colors">
          <Plus size={18} /> Publicar otra vacante
        </button>
      </div>
    </motion.div>
  )
}

// ========================================================
// EMPRESA: MODAL PUBLICAR VACANTE
// ========================================================
function PublishJobModal({ onClose, onPublish }) {
  const [form, setForm] = useState({
    title: '', area: 'Almacén y Logística', salary: '', modality: 'Presencial',
    schedule: 'Tiempo completo', description: '', requirements: ''
  });
  const [step, setStep] = useState(1);

  const areas = ['Almacén y Logística', 'Contabilidad y Finanzas', 'Ventas y Atención', 'Tecnología', 'Construcción', 'Educación', 'Salud', 'Otros'];

  const handleSubmit = () => {
    if (!form.title.trim()) return;
    onPublish(form);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex flex-col justify-end"
      style={{ background: 'rgba(14,42,71,0.82)', backdropFilter: 'blur(14px)' }}>
      <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 26 }}
        className="w-full bg-white rounded-t-[36px] max-h-[92vh] flex flex-col overflow-hidden shadow-float">

        {/* Header */}
        <div className="p-4 border-b border-[#E5E7EB] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-[14px] bg-gradient-to-br from-[#0E2A47] to-[#4DA3FF] text-white flex items-center justify-center">
              <ClipboardList size={19} />
            </div>
            <div>
              <h3 className="font-black text-[#0E2A47] text-[15px]">Publicar Vacante</h3>
              <p className="text-[10px] text-[#00B894] font-bold">La IA filtrará candidatos automáticamente</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[#6B7280]">
            <X size={17} />
          </button>
        </div>

        {/* Progress */}
        <div className="px-4 pt-3 pb-1 flex gap-2">
          {[1, 2].map(s => (
            <div key={s} className={`h-1.5 flex-1 rounded-full transition-all ${step >= s ? 'bg-[#00B894]' : 'bg-[#E5E7EB]'}`}></div>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 hide-scroll">
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-3.5">
              <div>
                <label className="text-[11px] font-black text-[#0E2A47] uppercase tracking-wide block mb-1.5">Puesto de trabajo *</label>
                <input className="input-base text-sm" placeholder="Ej: Asistente de almacén, Cajera..."
                  value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
              </div>
              <div>
                <label className="text-[11px] font-black text-[#0E2A47] uppercase tracking-wide block mb-1.5">Área</label>
                <div className="flex flex-wrap gap-2">
                  {areas.map(a => (
                    <button key={a} onClick={() => setForm(f => ({ ...f, area: a }))}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-bold border transition-all ${form.area === a ? 'bg-[#00B894] text-white border-[#00B894]' : 'bg-white text-[#6B7280] border-[#E5E7EB]'}`}>
                      {a}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[11px] font-black text-[#0E2A47] uppercase tracking-wide block mb-1.5">Sueldo mensual (S/)</label>
                <input className="input-base text-sm" placeholder="Ej: 1,200 - 1,800"
                  value={form.salary} onChange={e => setForm(f => ({ ...f, salary: e.target.value }))} />
              </div>
              <div className="flex gap-2.5">
                {['Presencial', 'Híbrido', 'Remoto'].map(m => (
                  <button key={m} onClick={() => setForm(f => ({ ...f, modality: m }))}
                    className={`flex-1 py-2.5 rounded-2xl text-[11px] font-bold border transition-all ${form.modality === m ? 'bg-[#0E2A47] text-white border-[#0E2A47]' : 'bg-white text-[#6B7280] border-[#E5E7EB]'}`}>
                    {m}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-3.5">
              <div>
                <label className="text-[11px] font-black text-[#0E2A47] uppercase tracking-wide block mb-1.5">Descripción del puesto</label>
                <textarea className="input-base text-sm resize-none" rows={4}
                  placeholder="¿Qué hará la persona? ¿En qué ambiente trabajará?..."
                  value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
              </div>
              <div>
                <label className="text-[11px] font-black text-[#0E2A47] uppercase tracking-wide block mb-1.5">Requisitos principales</label>
                <textarea className="input-base text-sm resize-none" rows={3}
                  placeholder="Ej: Secundaria completa, experiencia mínima 1 año, puntualidad..."
                  value={form.requirements} onChange={e => setForm(f => ({ ...f, requirements: e.target.value }))} />
              </div>
              <div className="p-3.5 bg-[#E8F8F1] rounded-2xl border border-[#00B894]/20 flex items-start gap-3">
                <Sparkles size={16} className="text-[#00B894] flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-[#0E2A47] leading-relaxed">
                  <strong>IA TrabajaYA</strong> analizará tu vacante y filtrará automáticamente los candidatos más compatibles por habilidades, experiencia y ubicación.
                </p>
              </div>
            </motion.div>
          )}
        </div>

        <div className="p-4 border-t border-[#E5E7EB] flex gap-2.5">
          {step > 1 && (
            <button onClick={() => setStep(s => s - 1)}
              className="flex-1 py-3 rounded-2xl border-2 border-[#E5E7EB] text-[#6B7280] font-bold text-[13px] flex items-center justify-center gap-1.5">
              <ChevronLeft size={16} /> Anterior
            </button>
          )}
          {step < 2 ? (
            <button onClick={() => setStep(s => s + 1)} disabled={!form.title.trim()}
              className="flex-1 py-3 rounded-2xl text-white font-bold text-[13px] flex items-center justify-center gap-1.5 disabled:opacity-40 transition-all"
              style={{ background: 'linear-gradient(135deg,#00B894,#0E2A47)', boxShadow: '0 4px 16px rgba(0,184,148,0.35)' }}>
              Siguiente <ArrowRight size={16} />
            </button>
          ) : (
            <button onClick={handleSubmit}
              className="flex-1 py-3 rounded-2xl text-white font-bold text-[13px] flex items-center justify-center gap-1.5 transition-all"
              style={{ background: 'linear-gradient(135deg,#00B894,#0E2A47)', boxShadow: '0 4px 16px rgba(0,184,148,0.35)' }}>
              <Check size={16} /> Publicar Vacante
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

// ========================================================
// PERSONA NATURAL: PANTALLA DE INICIO
// ========================================================
function PersonaHomeScreen({ user, myServices, onGoToTecnicos, onGoToServicios, onOpenAuth, onOpenChat }) {
  const escrowLabels = ['Pago realizado', 'En proceso', 'Servicio confirmado', 'Dinero liberado'];
  const escrowColors = ['#4DA3FF', '#FFC107', '#7C3AED', '#00B894'];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="flex flex-col h-full bg-[#F9FAFB] overflow-y-auto hide-scroll">
      <div className="bg-white px-5 pt-5 pb-3 border-b border-[#E5E7EB] sticky top-0 z-20" style={{ boxShadow: '0 1px 10px rgba(14,42,71,0.06)' }}>
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-[14px] bg-gradient-to-br from-[#7C3AED] to-[#4DA3FF] flex items-center justify-center text-white shadow-soft">
              <Wrench size={18} />
            </div>
            <div>
              <h1 className="text-[20px] font-black text-[#0E2A47] leading-none">Trabaja<span className="text-[#00B894]">YA</span></h1>
              <p className="text-[10px] font-bold text-[#7C3AED] tracking-widest mt-0.5 uppercase">Servicios · Andahuaylas</p>
            </div>
          </div>
          <button onClick={onOpenAuth} className="w-8 h-8 rounded-full bg-slate-100 text-[#6B7280] flex items-center justify-center">
            <User size={16} />
          </button>
        </div>
        <div className="h-[3px] rounded-full" style={{ background: 'linear-gradient(90deg,#7C3AED,#4DA3FF,#00B894)' }}></div>
      </div>

      <div className="p-4 space-y-3.5">
        {/* Hero */}
        <div className="p-4 rounded-3xl border border-[#7C3AED]/20 relative overflow-hidden" style={{ background: 'linear-gradient(145deg,#F3EEFF,#FFFFFF,#EBF4FF)' }}>
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-[#7C3AED]/5 -translate-y-8 translate-x-8 pointer-events-none"></div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 text-white" style={{ background: 'linear-gradient(135deg,#7C3AED,#4DA3FF)' }}>
            <span className="w-1 h-1 bg-white rounded-full"></span>
            ¡Hola, {user.name?.split(' ')[0]}!
          </span>
          <h2 className="text-[17px] font-black text-[#0E2A47]">¿Qué necesitas hoy?</h2>
          <p className="text-[11px] text-[#6B7280] mt-1">Encuentra técnicos verificados en Andahuaylas. Pago seguro garantizado.</p>
        </div>

        {/* CTA principal */}
        <button onClick={onGoToTecnicos}
          className="w-full flex items-center gap-3 p-4 rounded-3xl border-2 text-left shadow-card relative overflow-hidden"
          style={{ borderColor: '#7C3AED', background: '#FFFFFF' }}>
          <div className="absolute top-0 right-0 w-16 h-16 rounded-full opacity-5 -translate-y-4 translate-x-4 pointer-events-none" style={{ background: '#7C3AED' }}></div>
          <div className="w-11 h-11 rounded-[14px] text-white flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg,#7C3AED,#4DA3FF)' }}>
            <Search size={20} />
          </div>
          <div className="flex-1">
            <h3 className="font-black text-[#0E2A47] text-[15px]">Buscar un técnico</h3>
            <p className="text-[11px] text-[#6B7280] mt-0.5">Gasfiteros, electricistas, pintores y más</p>
          </div>
          <ArrowRight size={18} className="text-[#7C3AED] flex-shrink-0" />
        </button>

        {/* Servicios recientes */}
        {myServices.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-black text-[#0E2A47] text-[13px]">Mis servicios contratados</h3>
              <button onClick={onGoToServicios} className="text-[11px] font-bold text-[#7C3AED] flex items-center gap-1">
                Ver todos <ArrowRight size={12} />
              </button>
            </div>
            {myServices.slice(0, 1).map(s => (
              <div key={s.id} className="bg-white p-4 rounded-3xl border border-[#E5E7EB] shadow-soft">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-black text-[#0E2A47] text-[13px]">{s.tech}</p>
                    <p className="text-[11px] text-[#6B7280]">{s.trade} · {s.date}</p>
                  </div>
                  <span className="text-[13px] font-black" style={{ color: '#00B894' }}>{s.amount}</span>
                </div>
                {/* Mini escrow stepper */}
                <div className="flex items-center gap-1">
                  {[0, 1, 2, 3].map(i => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className={`w-full h-1.5 rounded-full transition-all ${i <= s.escrow ? '' : 'bg-[#E5E7EB]'}`}
                        style={i <= s.escrow ? { background: escrowColors[i] } : {}}></div>
                      {i === s.escrow && (
                        <span className="text-[9px] font-bold text-center leading-tight" style={{ color: escrowColors[i] }}>
                          {escrowLabels[i]}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Chat asistente */}
        <button onClick={onOpenChat}
          className="w-full bg-white hover:bg-[#F3EEFF] p-3.5 rounded-2xl border border-[#E5E7EB] hover:border-[#7C3AED] flex items-center justify-between text-left transition-all shadow-soft group">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#F3EEFF] group-hover:bg-[#7C3AED] text-[#7C3AED] group-hover:text-white flex items-center justify-center transition-all">
              <MessageCircle size={17} />
            </div>
            <div>
              <h5 className="font-bold text-[#0E2A47] text-[12px]">¿No sabes qué técnico necesitas?</h5>
              <p className="text-[11px] text-[#6B7280]">El asistente IA te orienta</p>
            </div>
          </div>
          <ArrowRight size={14} className="text-[#7C3AED]" />
        </button>
        <div className="h-2"></div>
      </div>
    </motion.div>
  )
}

// ========================================================
// PERSONA NATURAL: LISTA DE TÉCNICOS
// ========================================================
function TecnicosScreen({ technicians, onSelect }) {
  const [searchQ, setSearchQ] = useState('');
  const filtered = technicians.filter(t =>
    t.name.toLowerCase().includes(searchQ.toLowerCase()) ||
    t.trade.toLowerCase().includes(searchQ.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="flex flex-col h-full bg-[#F9FAFB]">
      <div className="bg-white px-4 pt-4 pb-3 border-b border-[#E5E7EB]" style={{ boxShadow: '0 1px 8px rgba(14,42,71,0.06)' }}>
        <span className="text-[10px] font-bold text-[#7C3AED] uppercase tracking-wider block">Verificados en Andahuaylas</span>
        <h2 className="text-[18px] font-black text-[#0E2A47] mb-2">Técnicos Disponibles</h2>
        <div className="flex items-center gap-2 bg-[#F0F4F8] rounded-2xl px-3 py-2 border border-transparent focus-within:border-[#7C3AED] transition-all">
          <Search size={15} className="text-[#9CA3AF] flex-shrink-0" />
          <input className="flex-1 bg-transparent text-[13px] text-[#1F2937] outline-none placeholder:text-[#9CA3AF]"
            placeholder="Buscar oficio o nombre..."
            value={searchQ} onChange={e => setSearchQ(e.target.value)} />
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto hide-scroll space-y-3">
        {filtered.map(tech => (
          <motion.div key={tech.id} layout
            className="bg-white rounded-3xl border border-[#E5E7EB] shadow-card overflow-hidden cursor-pointer hover:border-[#7C3AED] transition-all"
            onClick={() => onSelect(tech)}>
            <div className="flex gap-3.5 p-4">
              <div className="relative flex-shrink-0">
                <img src={tech.image} alt={tech.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-soft" />
                {tech.verified && (
                  <div className="absolute -bottom-1 -right-1 rounded-full p-1 border-2 border-white" style={{ background: '#00B894' }}>
                    <ShieldCheck size={10} className="text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-black text-[#0E2A47] text-[14px] leading-tight">{tech.name}</h3>
                    <p className="text-[11px] font-bold text-[#7C3AED] mt-0.5">{tech.icon} {tech.trade}</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Star size={13} fill="#FFC107" className="text-[#FFC107]" />
                    <span className="font-black text-[#0E2A47] text-[13px]">{tech.rating}</span>
                    <span className="text-[10px] text-[#6B7280]">({tech.reviews})</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                  <span className="text-[10px] text-[#6B7280] flex items-center gap-0.5">
                    <MapPin size={10} /> {tech.distance}
                  </span>
                  <span className="text-[#E5E7EB]">·</span>
                  <span className="text-[10px] font-bold text-[#00B894]">{tech.price}</span>
                  <span className="text-[#E5E7EB]">·</span>
                  <span className="text-[10px] text-[#6B7280]">{tech.completedJobs} trabajos</span>
                </div>
              </div>
            </div>
            <div className="px-4 pb-4">
              <button className="w-full py-2.5 rounded-2xl text-white font-bold text-[13px] flex items-center justify-center gap-2 transition-all"
                style={{ background: 'linear-gradient(135deg,#7C3AED,#4DA3FF)', boxShadow: '0 3px 12px rgba(124,58,237,0.3)' }}>
                Contratar servicio <ArrowRight size={15} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// ========================================================
// PERSONA NATURAL: MIS SERVICIOS CONTRATADOS
// ========================================================
function MisServiciosScreen({ services, onViewEscrow, onOpenChat, onGoToTecnicos }) {
  const escrowLabels = ['Pago realizado', 'En proceso', 'Confirmado', 'Liberado'];
  const escrowColors = ['#4DA3FF', '#FFC107', '#7C3AED', '#00B894'];
  const escrowIcons = [<CreditCard size={13} />, <Wrench size={13} />, <CheckCircle2 size={13} />, <Unlock size={13} />];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="flex flex-col h-full bg-[#F9FAFB]">
      <div className="bg-white px-5 py-3.5 border-b border-[#E5E7EB]" style={{ boxShadow: '0 1px 8px rgba(14,42,71,0.06)' }}>
        <span className="text-[10px] font-bold text-[#7C3AED] uppercase tracking-wider block">Seguimiento</span>
        <h2 className="text-[18px] font-black text-[#0E2A47]">Mis Servicios</h2>
      </div>

      <div className="flex-1 p-4 overflow-y-auto hide-scroll space-y-3.5">
        {services.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-[#E5E7EB] p-6 shadow-soft">
            <Wrench size={40} className="mx-auto text-slate-300 mb-3" />
            <h3 className="font-bold text-[#0E2A47]">Aún no has contratado servicios</h3>
            <p className="text-xs text-[#6B7280] mt-1 mb-4">Busca un técnico verificado cerca de ti.</p>
            <button onClick={onGoToTecnicos} className="btn-primary py-2.5 px-5 text-xs">Ver técnicos disponibles</button>
          </div>
        ) : (
          services.map(s => (
            <div key={s.id} className="bg-white rounded-3xl border border-[#E5E7EB] shadow-card p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-black text-[#0E2A47] text-[14px]">{s.tech}</h3>
                  <p className="text-[11px] text-[#6B7280]">{s.trade} · {s.date}</p>
                </div>
                <span className="text-[15px] font-black text-[#00B894]">{s.amount}</span>
              </div>

              {/* Escrow stepper visual */}
              <div className="mb-3">
                <div className="flex items-center gap-0 mb-2">
                  {[0, 1, 2, 3].map(i => (
                    <div key={i} className="flex items-center flex-1">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all flex-shrink-0 ${i <= s.escrow ? 'text-white border-transparent' : 'text-[#9CA3AF] border-[#E5E7EB] bg-white'}`}
                        style={i <= s.escrow ? { background: escrowColors[i], borderColor: escrowColors[i] } : {}}>
                        {escrowIcons[i]}
                      </div>
                      {i < 3 && <div className={`h-0.5 flex-1 mx-0.5 transition-all ${i < s.escrow ? '' : 'bg-[#E5E7EB]'}`}
                        style={i < s.escrow ? { background: escrowColors[i + 1] } : {}}></div>}
                    </div>
                  ))}
                </div>
                <p className="text-[11px] font-black" style={{ color: escrowColors[s.escrow] }}>
                  Estado: {escrowLabels[s.escrow]}
                </p>
              </div>

              <div className="flex gap-2">
                <button onClick={() => onViewEscrow(s)}
                  className="flex-1 py-2.5 rounded-2xl font-bold text-[12px] text-white flex items-center justify-center gap-1.5 transition-all"
                  style={{ background: `linear-gradient(135deg,${escrowColors[s.escrow]},#0E2A47)` }}>
                  <Lock size={14} /> Ver estado de pago
                </button>
                <button onClick={() => onOpenChat(s)}
                  className="py-2.5 px-3.5 rounded-2xl border border-[#E5E7EB] text-[#6B7280] hover:bg-[#F0F4F8] transition-colors">
                  <MessageCircle size={16} />
                </button>
              </div>
            </div>
          ))
        )}
        <button onClick={onGoToTecnicos}
          className="w-full py-4 rounded-3xl border-2 border-dashed border-[#7C3AED]/30 text-[#7C3AED] font-bold text-[13px] flex items-center justify-center gap-2 hover:bg-[#F3EEFF] transition-colors">
          <Plus size={18} /> Contratar otro servicio
        </button>
      </div>
    </motion.div>
  )
}

// ========================================================
// PERSONA NATURAL: MODAL CONTRATAR TÉCNICO
// ========================================================
function HireServiceModal({ tech, onClose, onHire }) {
  const [step, setStep] = useState(1);
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('09:00');
  const [agreed, setAgreed] = useState(false);
  const amount = tech.price?.split('-')[0]?.trim() || 'S/ 60';

  const handlePay = () => {
    if (!agreed) return;
    onHire({ amount, date, desc });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex flex-col justify-end"
      style={{ background: 'rgba(14,42,71,0.84)', backdropFilter: 'blur(14px)' }}>
      <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 26 }}
        className="w-full bg-white rounded-t-[36px] max-h-[94vh] flex flex-col overflow-hidden shadow-float">

        {/* Header técnico */}
        <div className="p-4 border-b border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-black text-[#0E2A47] text-[16px]">Contratar Servicio</h3>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[#6B7280]">
              <X size={17} />
            </button>
          </div>
          <div className="flex items-center gap-3 p-3 bg-[#F9FAFB] rounded-2xl border border-[#E5E7EB]">
            <img src={tech.image} alt={tech.name} className="w-12 h-12 rounded-xl object-cover border-2 border-white shadow-soft" />
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <p className="font-black text-[#0E2A47] text-[13px]">{tech.name}</p>
                {tech.verified && <ShieldCheck size={12} className="text-[#00B894]" />}
              </div>
              <p className="text-[11px] text-[#7C3AED] font-bold">{tech.icon} {tech.trade}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <Star size={11} fill="#FFC107" className="text-[#FFC107]" />
                <span className="text-[11px] font-bold text-[#0E2A47]">{tech.rating}</span>
                <span className="text-[10px] text-[#6B7280]">({tech.reviews} reseñas)</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[11px] font-black text-[#00B894]">{tech.price}</p>
              <p className="text-[10px] text-[#6B7280]">Precio aprox.</p>
            </div>
          </div>
          {/* Steps */}
          <div className="flex gap-2 mt-3">
            {[1, 2, 3].map(s => (
              <div key={s} className={`h-1.5 flex-1 rounded-full transition-all ${step >= s ? '' : 'bg-[#E5E7EB]'}`}
                style={step >= s ? { background: 'linear-gradient(90deg,#7C3AED,#4DA3FF)' } : {}}></div>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 hide-scroll">
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <div>
                <label className="text-[11px] font-black text-[#0E2A47] uppercase tracking-wide block mb-1.5">Describe el trabajo *</label>
                <textarea className="input-base text-sm resize-none" rows={4}
                  placeholder="Ej: Necesito reparar una fuga en el baño, se filtra agua por el caño del lavabo..."
                  value={desc} onChange={e => setDesc(e.target.value)} />
              </div>
              <div>
                <label className="text-[11px] font-black text-[#0E2A47] uppercase tracking-wide block mb-1.5">Trabajos que puede hacer</label>
                <div className="flex flex-wrap gap-1.5">
                  {tech.works?.map((w, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-[#F3EEFF] text-[#7C3AED] text-[11px] font-semibold border border-[#7C3AED]/20">{w}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <div>
                <label className="text-[11px] font-black text-[#0E2A47] uppercase tracking-wide block mb-1.5">Fecha del servicio *</label>
                <input type="date" className="input-base text-sm" value={date} onChange={e => setDate(e.target.value)} />
              </div>
              <div>
                <label className="text-[11px] font-black text-[#0E2A47] uppercase tracking-wide block mb-1.5">Hora de llegada</label>
                <div className="flex gap-2">
                  {['07:00', '09:00', '11:00', '14:00', '16:00'].map(t => (
                    <button key={t} onClick={() => setTime(t)}
                      className={`flex-1 py-2 rounded-xl text-[11px] font-bold border transition-all ${time === t ? 'text-white border-transparent' : 'bg-white text-[#6B7280] border-[#E5E7EB]'}`}
                      style={time === t ? { background: 'linear-gradient(135deg,#7C3AED,#4DA3FF)' } : {}}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-3.5 bg-[#F9FAFB] rounded-2xl border border-[#E5E7EB]">
                <p className="text-[11px] text-[#6B7280]">Dirección de servicio: <strong className="text-[#0E2A47]">Jr. Ayacucho 234, Andahuaylas</strong></p>
                <p className="text-[11px] text-[#6B7280] mt-1">Distancia al técnico: <strong className="text-[#00B894]">{tech.distance}</strong></p>
              </div>
            </motion.div>
          )}
          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              {/* Resumen */}
              <div className="p-3.5 bg-[#F9FAFB] rounded-2xl border border-[#E5E7EB] space-y-2">
                <h4 className="font-black text-[#0E2A47] text-[13px] mb-2">Resumen del servicio</h4>
                <div className="flex justify-between text-[12px]"><span className="text-[#6B7280]">Técnico</span><span className="font-bold text-[#0E2A47]">{tech.name}</span></div>
                <div className="flex justify-between text-[12px]"><span className="text-[#6B7280]">Servicio</span><span className="font-bold text-[#0E2A47]">{tech.trade}</span></div>
                <div className="flex justify-between text-[12px]"><span className="text-[#6B7280]">Fecha</span><span className="font-bold text-[#0E2A47]">{date || 'Por confirmar'}</span></div>
                <div className="flex justify-between text-[12px]"><span className="text-[#6B7280]">Hora</span><span className="font-bold text-[#0E2A47]">{time}</span></div>
                <div className="divider"></div>
                <div className="flex justify-between"><span className="font-black text-[#0E2A47]">Total a pagar</span><span className="font-black text-[#00B894] text-[16px]">{amount}</span></div>
              </div>
              {/* Pago en custodia info */}
              <div className="p-3.5 rounded-2xl border" style={{ background: '#EBF4FF', borderColor: '#4DA3FF' + '33' }}>
                <div className="flex items-start gap-2.5">
                  <Lock size={16} className="text-[#4DA3FF] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-black text-[#0E2A47] text-[12px]">Pago en custodia TrabajaYA</h5>
                    <p className="text-[11px] text-[#6B7280] mt-1 leading-relaxed">Tu dinero queda retenido de forma segura. Se libera al técnico <strong>solo cuando confirmes</strong> que el servicio fue completado.</p>
                  </div>
                </div>
              </div>
              {/* Pasos */}
              <div className="space-y-2">
                {[
                  { icon: <CreditCard size={14} />, label: 'Pagas ahora', desc: 'Monto retenido en custodia', color: '#4DA3FF' },
                  { icon: <Wrench size={14} />, label: 'Técnico realiza el trabajo', desc: 'Recibes el servicio acordado', color: '#FFC107' },
                  { icon: <CheckCircle2 size={14} />, label: 'Confirmas el servicio', desc: 'Apruebas que todo está bien', color: '#7C3AED' },
                  { icon: <Unlock size={14} />, label: 'Dinero liberado al técnico', desc: 'Transferencia automática', color: '#00B894' },
                ].map((step_item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-[#E5E7EB] bg-white">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-white flex-shrink-0" style={{ background: step_item.color }}>
                      {step_item.icon}
                    </div>
                    <div>
                      <p className="font-bold text-[#0E2A47] text-[12px]">{step_item.label}</p>
                      <p className="text-[10px] text-[#6B7280]">{step_item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <label className="flex items-start gap-2.5 cursor-pointer">
                <div onClick={() => setAgreed(a => !a)}
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${agreed ? 'border-[#00B894] bg-[#00B894]' : 'border-[#E5E7EB]'}`}>
                  {agreed && <Check size={12} className="text-white" />}
                </div>
                <span className="text-[11px] text-[#6B7280] leading-relaxed">Acepto los términos del pago en custodia de TrabajaYA. El dinero se liberará solo cuando confirme el servicio.</span>
              </label>
            </motion.div>
          )}
        </div>

        <div className="p-4 border-t border-[#E5E7EB] flex gap-2.5">
          {step > 1 && (
            <button onClick={() => setStep(s => s - 1)}
              className="py-3 px-4 rounded-2xl border-2 border-[#E5E7EB] text-[#6B7280] font-bold text-[13px] flex items-center gap-1.5">
              <ChevronLeft size={16} />
            </button>
          )}
          {step < 3 ? (
            <button onClick={() => setStep(s => s + 1)} disabled={step === 1 && !desc.trim()}
              className="flex-1 py-3 rounded-2xl text-white font-bold text-[13px] flex items-center justify-center gap-1.5 disabled:opacity-40"
              style={{ background: 'linear-gradient(135deg,#7C3AED,#4DA3FF)', boxShadow: '0 4px 16px rgba(124,58,237,0.3)' }}>
              Siguiente <ArrowRight size={16} />
            </button>
          ) : (
            <button onClick={handlePay} disabled={!agreed}
              className="flex-1 py-3 rounded-2xl text-white font-bold text-[13px] flex items-center justify-center gap-1.5 disabled:opacity-40 transition-all"
              style={{ background: 'linear-gradient(135deg,#00B894,#0E2A47)', boxShadow: '0 4px 16px rgba(0,184,148,0.35)' }}>
              <Lock size={15} /> Pagar en custodia {amount}
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

// ========================================================
// MODAL: ESTADO DE PAGO EN CUSTODIA (ESCROW)
// ========================================================
function EscrowModal({ tech, step, onClose, onAdvance }) {
  const steps = [
    { label: 'Pago realizado', desc: 'Tu dinero está seguro y retenido en custodia TrabajaYA.', icon: <CreditCard size={22} />, color: '#4DA3FF', bg: '#EBF4FF' },
    { label: 'Servicio en proceso', desc: `${tech.name} está realizando el trabajo acordado.`, icon: <Wrench size={22} />, color: '#FFC107', bg: '#FFF8E1' },
    { label: 'Servicio completado', desc: 'El técnico marcó el trabajo como finalizado. ¿Todo está bien?', icon: <CheckCircle2 size={22} />, color: '#7C3AED', bg: '#F3EEFF' },
    { label: '¡Dinero liberado!', desc: `El pago fue transferido a ${tech.name} exitosamente.`, icon: <Unlock size={22} />, color: '#00B894', bg: '#E8F8F1' },
  ];

  const current = steps[step];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex flex-col items-center justify-center p-5"
      style={{ background: 'rgba(14,42,71,0.88)', backdropFilter: 'blur(16px)' }}>
      <motion.div initial={{ scale: 0.85, y: 30 }} animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0 }} transition={{ type: 'spring', damping: 20 }}
        className="w-full max-w-sm bg-white rounded-[36px] overflow-hidden shadow-float">

        {/* Color top bar */}
        <div className="h-1.5" style={{ background: current.color }}></div>

        <div className="p-6 flex flex-col items-center text-center">
          {/* Icon */}
          <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-4" style={{ background: current.bg }}>
            <div style={{ color: current.color }}>{current.icon}</div>
          </div>

          <h3 className="text-[22px] font-black text-[#0E2A47]">{current.label}</h3>
          <p className="text-[12px] text-[#6B7280] mt-2 leading-relaxed max-w-xs">{current.desc}</p>

          {/* Stepper */}
          <div className="flex items-center gap-1.5 mt-5 mb-5">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all ${i <= step ? 'text-white border-transparent' : 'border-[#E5E7EB] text-[#9CA3AF] bg-white'}`}
                  style={i <= step ? { background: s.color, borderColor: s.color } : {}}>
                  <Check size={13} />
                </div>
                {i < 3 && <div className={`w-6 h-0.5 rounded-full ${i < step ? '' : 'bg-[#E5E7EB]'}`}
                  style={i < step ? { background: steps[i + 1].color } : {}}></div>}
              </div>
            ))}
          </div>

          {/* Info técnico */}
          <div className="w-full p-3 bg-[#F9FAFB] rounded-2xl border border-[#E5E7EB] text-left mb-5">
            <p className="text-[11px] font-black text-[#0E2A47]">{tech.name}</p>
            <p className="text-[10px] text-[#6B7280]">{tech.trade}</p>
          </div>

          <div className="w-full space-y-2.5">
            {step < 3 && (
              <button onClick={onAdvance}
                className="w-full py-3 rounded-2xl text-white font-bold text-[13px] flex items-center justify-center gap-2 transition-all"
                style={{ background: `linear-gradient(135deg,${current.color},#0E2A47)`, boxShadow: `0 4px 16px ${current.color}55` }}>
                {step === 2 ? <><CheckCircle2 size={16} /> Confirmar servicio recibido</> : <><ArrowRight size={16} /> Siguiente estado</>}
              </button>
            )}
            {step === 3 && (
              <div className="p-3 rounded-2xl text-center" style={{ background: '#E8F8F1', border: '1px solid #00B89433' }}>
                <p className="text-[12px] font-black text-[#00B894]">✅ Transacción completada</p>
                <p className="text-[10px] text-[#6B7280] mt-0.5">Puedes dejar una reseña al técnico</p>
              </div>
            )}
            <button onClick={onClose}
              className="w-full py-3 rounded-2xl border-2 border-[#E5E7EB] text-[#6B7280] font-bold text-[13px]">
              Cerrar
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ========================================================
// NOTIFICACIONES
// ========================================================
function NotificacionesScreen({ notifications, onMarkAllRead }) {
  const typeConfig = {
    match: { icon: <HeartHandshake size={16} />, color: '#00B894', bg: '#E8F8F1' },
    message: { icon: <MessageCircle size={16} />, color: '#4DA3FF', bg: '#EBF4FF' },
    payment: { icon: <Banknote size={16} />, color: '#7C3AED', bg: '#F3EEFF' },
    review: { icon: <Star size={16} />, color: '#FFC107', bg: '#FFF8E1' },
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="flex flex-col h-full bg-[#F9FAFB]">
      <div className="bg-white px-5 py-3.5 border-b border-[#E5E7EB] flex items-center justify-between" style={{ boxShadow: '0 1px 8px rgba(14,42,71,0.06)' }}>
        <div>
          <span className="text-[10px] font-bold text-[#7C3AED] uppercase tracking-wider block">Centro de</span>
          <h2 className="text-[18px] font-black text-[#0E2A47]">Notificaciones</h2>
        </div>
        <button onClick={onMarkAllRead} className="text-[11px] font-bold text-[#00B894] hover:underline">
          Marcar todas leídas
        </button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto hide-scroll space-y-2.5">
        {notifications.map(n => {
          const cfg = typeConfig[n.type] || typeConfig.message;
          return (
            <div key={n.id}
              className={`bg-white p-4 rounded-2xl border shadow-soft flex items-start gap-3 transition-all ${!n.read ? 'border-l-4' : 'border-[#E5E7EB]'}`}
              style={!n.read ? { borderLeftColor: cfg.color, borderTopColor: '#E5E7EB', borderRightColor: '#E5E7EB', borderBottomColor: '#E5E7EB' } : {}}>
              <div className="w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: cfg.bg, color: cfg.color }}>
                {cfg.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-black text-[#0E2A47] text-[13px]">{n.title}</p>
                  {!n.read && <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: cfg.color }}></span>}
                </div>
                <p className="text-[11px] text-[#6B7280] mt-0.5">{n.body}</p>
                <p className="text-[10px] text-[#9CA3AF] mt-1">{n.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  )
}
