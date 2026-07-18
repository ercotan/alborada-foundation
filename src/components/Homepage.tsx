import React, { useState, useEffect, useRef } from "react";
import { 
  BookOpen, 
  Shield, 
  Award, 
  Landmark, 
  Send, 
  ArrowLeft, 
  RefreshCw, 
  Calendar, 
  MapPin, 
  Users, 
  CheckCircle2, 
  ChevronDown, 
  Sparkles, 
  Cpu, 
  Globe, 
  Heart, 
  Sprout, 
  Flame, 
  TrendingUp, 
  Compass, 
  Navigation2, 
  VolumeX, 
  Volume2, 
  Play, 
  Pause, 
  FileText, 
  ChevronRight, 
  DollarSign, 
  Layers, 
  Clock, 
  Zap, 
  School,
  Database,
  Eye,
  EyeOff
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CinematicCanvas } from "./CinematicCanvas";
import { CinematicAudioEngine } from "../utils/audio";
import { CinematicState } from "../types";

export const Homepage: React.FC = () => {
  // 1. Cinematic Hero / Sun Timeline State
  const [cinematicState, setCinematicState] = useState<CinematicState>({
    progress: 0.2,       // Start at pre-dawn twilight
    isPlaying: true,     // Autoplay active
    speed: 1.0,          // Time scale
    isMuted: true,       // Browsers block autoplay audio
    cameraDolly: true,
  });

  const [showHUD, setShowHUD] = useState(true);
  const [activeModelTab, setActiveModelTab] = useState<string>("education");
  const [activeCampusNode, setActiveCampusNode] = useState<string>("school");
  
  // Form states
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    organization: "",
    interest: "alliance",
    message: ""
  });

  const [donationInputs, setDonationInputs] = useState<Record<string, number>>({
    education: 150,
    library: 500,
    ailab: 1000,
    residence: 350,
    sustainability: 200
  });
  const [activeDonationSuccess, setActiveDonationSuccess] = useState<string | null>(null);

  const audioEngineRef = useRef<CinematicAudioEngine | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Core Timeline Animation Loop
  useEffect(() => {
    if (!cinematicState.isPlaying) return;

    let lastTime = performance.now();
    let animationId: number;

    const tick = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      setCinematicState((prev) => {
        if (prev.progress >= 1.0) {
          return { ...prev, isPlaying: false, progress: 1.0 };
        }
        // Steady progression
        const step = 0.0001 * prev.speed * (delta / 16.67);
        const nextProgress = Math.min(1.0, prev.progress + step);
        return { ...prev, progress: nextProgress };
      });

      animationId = requestAnimationFrame(tick);
    };

    animationId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationId);
  }, [cinematicState.isPlaying, cinematicState.speed]);

  // Audio Engine Management
  useEffect(() => {
    if (!cinematicState.isMuted) {
      if (!audioEngineRef.current) {
        audioEngineRef.current = new CinematicAudioEngine();
      }
      audioEngineRef.current.init();
      audioEngineRef.current.setMute(false);
    } else {
      if (audioEngineRef.current) {
        audioEngineRef.current.setMute(true);
      }
    }
  }, [cinematicState.isMuted]);

  useEffect(() => {
    if (audioEngineRef.current && !cinematicState.isMuted) {
      audioEngineRef.current.updateState(cinematicState.progress);
    }
  }, [cinematicState.progress, cinematicState.isMuted]);

  useEffect(() => {
    return () => {
      if (audioEngineRef.current) {
        audioEngineRef.current.stop();
      }
    };
  }, []);

  // Format progression to symbolic clock
  const formatTime = (p: number) => {
    const totalMinutes = Math.round(p * 32);
    const startHour = 5;
    const startMinute = 40;
    let currentMinute = startMinute + totalMinutes;
    let currentHour = startHour;
    if (currentMinute >= 60) {
      currentHour += 1;
      currentMinute -= 60;
    }
    return `${currentHour.toString().padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")} AM`;
  };

  const getSunAltitude = (p: number) => {
    const alt = -10.0 + p * 15.0;
    return `${alt > 0 ? "+" : ""}${alt.toFixed(1)}°`;
  };

  const getPhaseName = (p: number) => {
    if (p < 0.25) return "Astronomic Twilight";
    if (p < 0.55) return "Nautical Dawn";
    if (p < 0.8) return "Alborada Sunrise";
    return "Golden Hour of Wisdom";
  };

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactData.name || !contactData.email || !contactData.message) return;
    setContactSubmitted(true);
  };

  const handleDonationSubmit = (key: string) => {
    setActiveDonationSuccess(key);
    setTimeout(() => {
      setActiveDonationSuccess(null);
    }, 4000);
  };

  return (
    <div className="bg-navy-950 text-white selection:bg-gold-500/30 selection:text-gold-200 relative flex flex-col min-h-screen">
      
      {/* Structural Symmetry lines behind content */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-white/[0.02] -z-10 pointer-events-none hidden md:block" />
      <div className="absolute left-12 top-0 bottom-0 w-[1px] bg-white/[0.01] -z-10 pointer-events-none hidden lg:block" />
      <div className="absolute right-12 top-0 bottom-0 w-[1px] bg-white/[0.01] -z-10 pointer-events-none hidden lg:block" />

      {/* ==========================================
          1. CINEMATIC HERO (INTEGRATED CANVAS HERO)
         ========================================== */}
      <section id="hero" ref={heroRef} className="relative w-full h-screen overflow-hidden flex flex-col justify-between">
        
        {/* Background Canvas Component */}
        <CinematicCanvas
          progress={cinematicState.progress}
          isPlaying={cinematicState.isPlaying}
          speed={cinematicState.speed}
          cameraDolly={cinematicState.cameraDolly}
        />

        {/* Cinematic Letterboxes */}
        <div className="absolute top-0 left-0 w-full h-8 bg-black/80 z-20 pointer-events-auto border-b border-white/5 flex items-center justify-between px-8 text-[10px] tracking-[0.3em] text-white/30 font-mono select-none">
          <span>ALBORADA SECURE SPACEWAY v2.6</span>
          <span className="hidden sm:inline">ANAMORPHIC WIDESCREEN RATIO 2.39:1</span>
          <span>COLOMBIA</span>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-8 bg-black/80 z-20 pointer-events-auto border-t border-white/5 flex items-center justify-between px-8 text-[10px] tracking-[0.3em] text-white/30 font-mono select-none">
          <span>IMAX 8K CAPTURE MASTER</span>
          <span className="hidden sm:inline">VOLUMETRIC RAYTRACED ATMOSPHERE</span>
          <span>SOLAR COGNITION</span>
        </div>

        {/* Header inside Hero Section */}
        <header className="w-full z-10 px-8 pt-12 flex justify-between items-center">
          <div className="flex flex-col select-none">
            <span className="font-serif font-light text-xl letter-spacing-xl text-white leading-none">
              ALBORADA
            </span>
            <span className="font-mono text-[8px] tracking-[0.5em] text-gold-500/80 uppercase mt-2">
              EDUCATIONAL FOUNDATION
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-6 font-mono text-[9px] tracking-[0.25em] text-white/40 uppercase">
            <button onClick={() => scrollToSection("mission")} className="hover:text-gold-400 transition-colors">LA MISIÓN</button>
            <span className="w-1 h-1 rounded-full bg-gold-500/40" />
            <button onClick={() => scrollToSection("model")} className="hover:text-gold-400 transition-colors">EL MODELO</button>
            <span className="w-1 h-1 rounded-full bg-gold-500/40" />
            <button onClick={() => scrollToSection("campus")} className="hover:text-gold-400 transition-colors">CAMPUS ELITE</button>
            <span className="w-1 h-1 rounded-full bg-gold-500/40" />
            <button onClick={() => scrollToSection("donations")} className="hover:text-gold-400 transition-colors">DONACIONES</button>
          </div>
          <div>
            <button 
              onClick={() => setCinematicState(prev => ({ ...prev, progress: 0.2, isPlaying: true }))}
              className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.2em] uppercase text-gold-400/85 hover:text-white transition-all bg-white/5 hover:bg-gold-500/10 border border-gold-500/20 px-3 py-1.5 rounded"
            >
              <RefreshCw className="w-3 h-3 animate-spin-slow" />
              <span>REINICIAR ALBA</span>
            </button>
          </div>
        </header>

        {/* Centered Brand Callout */}
        <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none p-6">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-center flex flex-col items-center gap-4 max-w-2xl"
          >
            <span className="text-[10px] uppercase tracking-[0.6em] text-gold-500 font-mono animate-pulse">
              COHORTE COMIENZA EL AMANECER
            </span>
            <h1 className="font-serif font-light text-white text-5xl sm:text-7xl lg:text-8xl tracking-[0.2em] text-indent-[0.2em] uppercase leading-none gold-glow-subtle select-none">
              ALBORADA
            </h1>
            <div className="w-16 h-[1px] bg-gold-500/40 my-2" />
            <p className="font-serif text-lg sm:text-2xl text-white/95 tracking-wide max-w-xl leading-relaxed italic">
              “El futuro comienza al amanecer.”
            </p>
            
            {/* Elegant action triggers */}
            <div className="flex flex-wrap justify-center gap-4 mt-6 pointer-events-auto">
              <button
                onClick={() => scrollToSection("mission")}
                className="px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 font-serif font-semibold text-xs tracking-[0.2em] uppercase rounded shadow-[0_4px_25px_rgba(212,175,55,0.25)] hover:shadow-[0_4px_30px_rgba(212,175,55,0.45)] transition-all cursor-pointer flex items-center gap-2"
              >
                <span>DESCUBRIR LA MISIÓN</span>
                <ChevronRight className="w-3.5 h-3.5 stroke-[2.5px]" />
              </button>
              <button
                onClick={() => scrollToSection("donations")}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-gold-500/40 text-white font-mono text-xs tracking-[0.2em] uppercase rounded transition-all cursor-pointer"
              >
                UNIRSE AL PROYECTO
              </button>
            </div>
          </motion.div>
        </div>

        {/* Integrated Floating Controls Toolbar (HUD) */}
        <AnimatePresence>
          {showHUD && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="w-full max-w-4xl mx-auto px-8 mb-12 z-10 pointer-events-auto flex flex-col gap-4"
            >
              {/* Scrub Track */}
              <div className="w-full flex flex-col gap-1.5 bg-black/30 backdrop-blur-md rounded-lg p-3 border border-white/5">
                <div className="flex justify-between items-center text-[9px] font-mono tracking-wider text-white/40">
                  <span>ORBITAL FLUX: {getPhaseName(cinematicState.progress)}</span>
                  <span>TIME: {formatTime(cinematicState.progress)} | SUN ALTITUDE: {getSunAltitude(cinematicState.progress)}</span>
                </div>
                <div className="relative w-full h-1 bg-white/10 rounded-full cursor-pointer hover:h-1.5 transition-all">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.001"
                    value={cinematicState.progress}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      setCinematicState(prev => ({ ...prev, progress: val }));
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-navy-500 to-gold-400 rounded-full"
                    style={{ width: `${cinematicState.progress * 100}%` }}
                  />
                </div>
              </div>

              {/* Toolbar Buttons block */}
              <div className="flex flex-wrap gap-4 items-center justify-between bg-black/60 border border-white/5 rounded-xl px-6 py-3 backdrop-blur-md">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setCinematicState(prev => ({ ...prev, isPlaying: !prev.isPlaying }))}
                    className="p-2 bg-white/5 border border-white/10 rounded-full text-white hover:text-gold-400 transition-colors"
                  >
                    {cinematicState.isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>
                  <div className="flex items-center gap-1">
                    <span className="font-mono text-[9px] text-white/30 tracking-wider">SPEED:</span>
                    {([0.5, 1.0, 2.0] as const).map(spd => (
                      <button
                        key={spd}
                        onClick={() => setCinematicState(prev => ({ ...prev, speed: spd }))}
                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${cinematicState.speed === spd ? "bg-gold-500/25 text-gold-400 border border-gold-500/20" : "text-white/40 hover:text-white"}`}
                      >
                        {spd}x
                      </button>
                    ))}
                  </div>
                </div>

                <div className="font-mono text-[11px] tracking-widest text-gold-400/90 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                  <span>HORIZON CLOCK • {formatTime(cinematicState.progress)}</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setCinematicState(prev => ({ ...prev, isMuted: !prev.isMuted }))}
                    className={`flex items-center gap-1.5 font-mono text-[9px] px-3 py-1.5 rounded border transition-all ${
                      !cinematicState.isMuted 
                        ? "border-gold-500/40 text-gold-400 bg-gold-500/10 shadow-[0_0_10px_rgba(212,175,55,0.1)]" 
                        : "border-white/10 text-white/40 hover:border-white/20"
                    }`}
                  >
                    {cinematicState.isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-gold-400 animate-pulse" />}
                    <span>{cinematicState.isMuted ? "SONIDO: OFF" : "SONIDO: ON"}</span>
                  </button>
                  <button
                    onClick={() => setShowHUD(false)}
                    className="text-[9px] font-mono px-2 py-1 border border-white/10 text-white/40 rounded hover:text-white hover:border-white/20 flex items-center gap-1"
                  >
                    <EyeOff className="w-3 h-3" /> OCULTAR CONTROLES
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Clean Mode Restorer Button */}
        {!showHUD && (
          <button
            onClick={() => setShowHUD(true)}
            className="absolute bottom-12 right-12 p-3 bg-black/70 border border-white/10 rounded-full text-white/50 hover:text-white backdrop-blur-md transition-all z-30"
          >
            <Eye className="w-4 h-4" />
          </button>
        )}

        {/* Smooth scroll anchor at bottom center */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center animate-bounce">
          <span className="font-mono text-[8px] tracking-[0.3em] text-white/35 uppercase mb-1">
            EXPLORAR FUNDACIÓN
          </span>
          <button onClick={() => scrollToSection("mission")} className="text-white/45 hover:text-gold-400 transition-colors">
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

      </section>

      {/* ==========================================
          2. MISSION (LA MISIÓN DE ALBORADA)
         ========================================== */}
      <section id="mission" className="relative w-full py-24 px-6 md:px-12 bg-navy-950 flex flex-col justify-center items-center border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
          
          <span className="font-mono text-[10px] tracking-[0.4em] text-gold-500 uppercase">
            01 / PROPÓSITO SUPREMO
          </span>
          
          <h2 className="font-serif font-light text-4xl md:text-5xl lg:text-6xl text-white tracking-[0.05em] leading-tight">
            Forjando las líderes de la próxima era.
          </h2>
          
          <div className="w-16 h-[1px] bg-gold-500/30 my-2" />
          
          <p className="text-white/80 font-sans text-base md:text-xl leading-relaxed font-light max-w-3xl">
            La <strong className="text-white font-medium">Fundación Alborada</strong> no es una caridad convencional; es un ecosistema educativo de alto rendimiento y residencia de élite diseñado específicamente para un grupo fundador de <strong className="text-gold-400 font-medium">15 niñas de entre 10 y 12 años</strong> en situación de vulnerabilidad extrema pero con talentos excepcionales. 
          </p>
          
          <p className="text-white/60 font-sans text-sm md:text-base leading-relaxed font-light max-w-2xl">
            A través de un modelo de protección integral, residencia permanente y un plan de estudios riguroso que abarca desde la filosofía clásica hasta la inteligencia artificial y blockchain, preparamos a estas niñas para liderar iniciativas de impacto social, cultural, científico e industrial en Colombia y el mundo entero. El cambio comienza dotando a las mentes más brillantes de las herramientas del futuro bajo una sólida disciplina de carácter.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-12 text-left">
            <div className="bg-black/25 border border-white/5 p-6 rounded-lg backdrop-blur-sm">
              <span className="font-mono text-gold-500 text-xs tracking-wider block mb-2">INTEGRIDAD</span>
              <p className="text-xs text-white/50 leading-relaxed font-light">
                Brindamos un entorno residencial de seguridad absoluta, nutrición científica y cuidado emocional las 24 horas del día.
              </p>
            </div>
            <div className="bg-black/25 border border-white/5 p-6 rounded-lg backdrop-blur-sm">
              <span className="font-mono text-gold-500 text-xs tracking-wider block mb-2">EDUCACIÓN DE ÉLITE</span>
              <p className="text-xs text-white/50 leading-relaxed font-light">
                Un plan de estudios multilingüe que rivaliza con las instituciones más exclusivas del mundo, libre de barreras económicas.
              </p>
            </div>
            <div className="bg-black/25 border border-white/5 p-6 rounded-lg backdrop-blur-sm">
              <span className="font-mono text-gold-500 text-xs tracking-wider block mb-2">LIDERAZGO ACTIVO</span>
              <p className="text-xs text-white/50 leading-relaxed font-light">
                Formamos tomadoras de decisiones con espíritu emprendedor, solvencia tecnológica y un gran compromiso moral.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ==========================================
          3. VISION (NUESTRA VISIÓN INTEGRAL)
         ========================================== */}
      <section id="vision" className="relative w-full py-24 px-6 md:px-12 bg-[#020408] border-t border-b border-white/5 overflow-hidden">
        
        {/* Soft atmospheric background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="flex flex-col gap-6">
            <span className="font-mono text-[10px] tracking-[0.4em] text-gold-500 uppercase">
              02 / COGNITIVE HORIZON
            </span>
            <h2 className="font-serif font-light text-3xl md:text-4xl lg:text-5xl text-white tracking-wide leading-tight">
              Un santuario educativo donde la sabiduría clásica y la tecnología convergen.
            </h2>
            <div className="w-12 h-[1px] bg-gold-500/30" />
            <p className="text-white/70 font-sans text-sm md:text-base leading-relaxed font-light">
              Nuestra visión es consolidar un modelo pedagógico de vanguardia que sirva como faro mundial de excelencia. Concebimos un campus auto-suficiente donde las líderes no solo estudian el mañana, sino que lo cultivan en la tierra, lo programan en redes neuronales, lo financian éticamente y lo custodian a través de cadenas de bloques.
            </p>
            <p className="text-white/50 font-sans text-xs leading-relaxed font-light">
              Para el año 2035, el modelo Alborada demostrará que el florecimiento intelectual y moral absoluto de una comunidad puede germinar desde las bases más humildes de la sociedad si se les provee del ecosistema de recursos adecuado.
            </p>

            <div className="flex items-center gap-4 mt-4 font-mono text-[10px] tracking-widest text-gold-400">
              <Globe className="w-4 h-4 animate-spin-slow" />
              <span>SOCIODEMOCRACIA Y PROYECCIÓN MUNDIAL</span>
            </div>
          </div>

          {/* Interactive visual matrix representation */}
          <div className="bg-black/40 border border-white/10 rounded-2xl p-8 backdrop-blur-md grid grid-cols-2 gap-4">
            <div className="border border-white/5 p-4 rounded bg-white/[0.01]">
              <span className="text-[28px] font-serif text-gold-400 leading-none">100%</span>
              <span className="font-mono text-[9px] text-white/40 block tracking-wider mt-1 uppercase">Sostenible</span>
              <p className="text-[10px] text-white/60 font-light mt-1.5">Campus alimentado por energía solar e hidratación inteligente.</p>
            </div>
            <div className="border border-white/5 p-4 rounded bg-white/[0.01]">
              <span className="text-[28px] font-serif text-gold-400 leading-none">1:1</span>
              <span className="font-mono text-[9px] text-white/40 block tracking-wider mt-1 uppercase">Mentoría IA</span>
              <p className="text-[10px] text-white/60 font-light mt-1.5">Tutoría hiper-personalizada para el desarrollo acelerado.</p>
            </div>
            <div className="border border-white/5 p-4 rounded bg-white/[0.01]">
              <span className="text-[28px] font-serif text-gold-400 leading-none">3</span>
              <span className="font-mono text-[9px] text-white/40 block tracking-wider mt-1 uppercase">Idiomas</span>
              <p className="text-[10px] text-white/60 font-light mt-1.5">Fluidez técnica y literaria en Español, Inglés y Mandarín.</p>
            </div>
            <div className="border border-white/5 p-4 rounded bg-white/[0.01]">
              <span className="text-[28px] font-serif text-gold-400 leading-none">∞</span>
              <span className="font-mono text-[9px] text-white/40 block tracking-wider mt-1 uppercase">Compromiso</span>
              <p className="text-[10px] text-white/60 font-light mt-1.5">Formación de por vida y tutoría constante hasta la madurez.</p>
            </div>
          </div>

        </div>
      </section>

      {/* ==========================================
          4. THE ALBORADA MODEL (EL MODELO INTEGRAL)
         ========================================== */}
      <section id="model" className="py-24 px-6 md:px-12 bg-[#050a1a] relative">
        <div className="max-w-6xl mx-auto flex flex-col gap-12">
          
          <div className="text-center flex flex-col items-center gap-3 max-w-2xl mx-auto">
            <span className="font-mono text-[10px] tracking-[0.4em] text-gold-500 uppercase">
              03 / PILARES PEDAGÓGICOS
            </span>
            <h2 className="font-serif font-light text-3xl md:text-4xl lg:text-5xl text-white tracking-wide">
              El Modelo Alborada
            </h2>
            <div className="w-12 h-[1px] bg-gold-500/20 my-1" />
            <p className="text-white/40 font-sans text-xs md:text-sm leading-relaxed font-light">
              Un enfoque revolucionario que sustituye la memorización tradicional por la síntesis crítica, la soberanía tecnológica y el temple estoico.
            </p>
          </div>

          {/* Symmetrical interactive tab grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-4">
            
            {/* Tabs selector */}
            <div className="lg:col-span-4 flex flex-col gap-2">
              {[
                { id: "education", title: "Educación de Élite", desc: "Rigurosidad académica, lenguas extranjeras y artes clásicas.", icon: BookOpen },
                { id: "ai", title: "Inteligencia Artificial", desc: "Soberanía en programación, modelos masivos de lenguaje y ciencia de datos.", icon: Cpu },
                { id: "leadership", title: "Liderazgo & Disciplina", desc: "Oratoria, retórica, ética y estoicismo aplicado al carácter.", icon: Shield },
                { id: "finance", title: "Finanzas & Blockchain", desc: "Educación financiera, tokenización, smart contracts y micro-empresa.", icon: TrendingUp },
                { id: "sustainability", title: "Sostenibilidad & Campo", desc: "Producción de alimentos orgánicos, bio-sistemas y energías limpias.", icon: Sprout },
                { id: "character", title: "Desarrollo de Carácter", desc: "Salud emocional, autogobierno intelectual y hábitos óptimos.", icon: Award }
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = activeModelTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveModelTab(tab.id)}
                    className={`text-left p-4 rounded-xl border transition-all flex items-start gap-4 cursor-pointer ${
                      isActive 
                        ? "bg-gold-500/10 border-gold-500/40 text-gold-400 shadow-lg" 
                        : "bg-black/20 border-white/5 text-white/50 hover:border-white/10 hover:text-white"
                    }`}
                  >
                    <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${isActive ? "text-gold-400" : "text-white/30"}`} />
                    <div>
                      <h4 className="font-serif font-light text-sm tracking-wide">{tab.title}</h4>
                      <p className="text-[11px] opacity-60 leading-relaxed mt-0.5 line-clamp-1">{tab.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Displaying selected tab description with luxury layout */}
            <div className="lg:col-span-8 bg-black/40 border border-white/10 rounded-2xl p-8 backdrop-blur-md min-h-[380px] flex flex-col justify-between">
              
              <AnimatePresence mode="wait">
                {activeModelTab === "education" && (
                  <motion.div
                    key="education"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex flex-col gap-6"
                  >
                    <div>
                      <span className="font-mono text-[9px] tracking-[0.2em] text-gold-400 uppercase">CULTURA CLÁSICA Y CIENTÍFICA</span>
                      <h3 className="font-serif font-light text-2xl text-white mt-1">Educación Superior Progresiva</h3>
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed font-light">
                      El plan de formación académica está inspirado en el Trivium y Quadrivium clásicos, pero enriquecido con matemáticas avanzadas, lógica algorítmica y oratoria. No formamos para responder exámenes estandarizados, sino para formular hipótesis complejas y defenderlas con elegancia intelectual.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-white/60">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                        <span>Español, Inglés y Mandarín fluido en entornos técnicos.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                        <span>Seminarios de lógica, dialéctica clásica e historia.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                        <span>Física cuántica experimental y astrofísica recreada.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                        <span>Literatura universal, dramaturgia e historia del arte.</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeModelTab === "ai" && (
                  <motion.div
                    key="ai"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex flex-col gap-6"
                  >
                    <div>
                      <span className="font-mono text-[9px] tracking-[0.2em] text-gold-400 uppercase">TECNOLOGÍA EXPONENCIAL</span>
                      <h3 className="font-serif font-light text-2xl text-white mt-1">Soberanía e Inteligencia Artificial</h3>
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed font-light">
                      La inteligencia artificial no es vista como un simple atajo automatizado, sino como la infraestructura mental de esta era. Las alumnas de Alborada no solo utilizan herramientas de IA, sino que entienden las arquitecturas de redes neuronales, programan agentes inteligentes de resolución lógica y usan la computación para resolver problemas globales.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-white/60">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                        <span>Estructuras de Deep Learning e ingenierías de prompts avanzados.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                        <span>Desarrollo de asistentes personalizados para investigación.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                        <span>Fundamentos de Python y estructuración de bases de datos.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                        <span>Ética de los sistemas artificiales y gobernabilidad digital.</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeModelTab === "leadership" && (
                  <motion.div
                    key="leadership"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex flex-col gap-6"
                  >
                    <div>
                      <span className="font-mono text-[9px] tracking-[0.2em] text-gold-400 uppercase">TEMPLE Y ETICA</span>
                      <h3 className="font-serif font-light text-2xl text-white mt-1">Liderazgo & Disciplina Clásica</h3>
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed font-light">
                      El verdadero liderazgo es el arte de la templanza moral y el ejemplo público. Estudiamos el estoicismo antiguo y contemporáneo de Marco Aurelio y Séneca para condicionar la mente frente a la incertidumbre y preparar a las niñas como tomadoras de decisiones sabias, compasivas y rigurosas.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-white/60">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                        <span>Entrenamiento en retórica clásica y debate forense.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                        <span>Gestión y resolución de crisis en simulaciones simuladas.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                        <span>Psicología organizacional y dinámicas de grupo sanas.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                        <span>Stoic resilience: control interno y templanza emocional.</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeModelTab === "finance" && (
                  <motion.div
                    key="finance"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex flex-col gap-6"
                  >
                    <div>
                      <span className="font-mono text-[9px] tracking-[0.2em] text-gold-400 uppercase">SISTEMAS DESCENTRALIZADOS</span>
                      <h3 className="font-serif font-light text-2xl text-white mt-1">Soberanía Financiera & Blockchain</h3>
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed font-light">
                      Preparamos a las alumnas para el nuevo paradigma financiero mundial. El conocimiento de los mercados, la tokenización de activos ecológicos, el desarrollo de contratos inteligentes y la creación de micro-empresas productivas locales forman la base de la soberanía material del campus y de las niñas.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-white/60">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                        <span>Fundamentos de Ethereum, EVM y contratos inteligentes.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                        <span>Gestión y administración de recursos bajo modelos DAO.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                        <span>Educación de inversiones y balances contables éticos.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                        <span>Incubación de micro-proyectos productivos autosuficientes.</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeModelTab === "sustainability" && (
                  <motion.div
                    key="sustainability"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex flex-col gap-6"
                  >
                    <div>
                      <span className="font-mono text-[9px] tracking-[0.2em] text-gold-400 uppercase">AUTOSUFICIENCIA PRÁCTICA</span>
                      <h3 className="font-serif font-light text-2xl text-white mt-1">Sostenibilidad Aplicada & Agricultura</h3>
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed font-light">
                      El liderazgo sostenible no es una teoría corporativa; se aprende con las manos en la tierra. Las niñas participan directamente en la apicultura, la producción de cacao, moringa, hortalizas hidropónicas y la gestión de la granja avícola. Esto les enseña el valor del ecosistema viviente, la soberanía alimentaria y la biotecnología.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-white/60">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                        <span>Sistemas hidropónicos de ciclo cerrado automatizados por IoT.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                        <span>Gestión de colmenas de abejas para polinización local.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                        <span>Ingeniería solar y captación pluvial inteligente.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                        <span>Bio-reconstrucción de suelos agrícolas degradados.</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeModelTab === "character" && (
                  <motion.div
                    key="character"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex flex-col gap-6"
                  >
                    <div>
                      <span className="font-mono text-[9px] tracking-[0.2em] text-gold-400 uppercase">DESARROLLO HUMANO</span>
                      <h3 className="font-serif font-light text-2xl text-white mt-1">Formación Integral de Carácter</h3>
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed font-light">
                      La verdadera excelencia descansa sobre una mente y un cuerpo en perfecto equilibrio. Estructuramos un programa riguroso de acondicionamiento físico, yoga, meditación y apoyo psicológico clínico constante para asegurar que el avance cognitivo se sostenga en una estructura emocional robusta, empática y profundamente resiliente.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-white/60">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                        <span>Acondicionamiento físico personalizado de alta disciplina.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                        <span>Acompañamiento psicoterapéutico preventivo y clínico.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                        <span>Nutrición funcional de alta densidad para crecimiento óptimo.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                        <span>Entrenamiento de hábitos del sueño y salud mental profunda.</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="w-full h-[1px] bg-white/10 my-6" />

              <div className="flex justify-between items-center text-[10px] font-mono tracking-wider text-gold-400/80">
                <span>MODELO PATENTADO PARA COHORTE DE LÍDERES</span>
                <span>METODOLOGÍA INSTITUCIONAL ALBORADA</span>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ==========================================
          5. THE GIRLS (LAS NIÑAS / PRIMERA COHORTE)
         ========================================== */}
      <section id="girls" className="py-24 px-6 md:px-12 bg-black border-t border-b border-white/5 relative">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
          
          <span className="font-mono text-[10px] tracking-[0.4em] text-gold-500 uppercase">
            04 / LAS PROTAGONISTAS DE LA AURORA
          </span>
          
          <h2 className="font-serif font-light text-3xl md:text-4xl lg:text-5xl text-white tracking-wide leading-tight">
            Nuestra Primera Cohorte: 15 Semillas del Mañana
          </h2>
          
          <div className="w-16 h-[1px] bg-gold-500/30 my-2" />
          
          <p className="text-white/70 font-sans text-sm md:text-base leading-relaxed font-light max-w-2xl">
            Por estrictas razones de seguridad y con absoluto respeto a las normativas internacionales de protección al menor, <strong className="text-white font-medium">Fundación Alborada no expone rostros, nombres reales ni datos personales de las niñas beneficiarias.</strong> Ellas son tuteladas bajo un protocolo diplomático de privacidad.
          </p>
          
          <div className="bg-gradient-to-br from-navy-900/60 to-navy-950/80 border border-white/10 rounded-2xl p-8 text-left mt-8 max-w-3xl">
            <h3 className="font-serif font-light text-lg text-gold-400 mb-4 tracking-wide flex items-center gap-2">
              <Shield className="w-5 h-5 text-gold-400 shrink-0" />
              <span>Protocolo de Protección Institucional Alborada</span>
            </h3>
            <ul className="space-y-4 text-xs text-white/60 font-light">
              <li className="flex items-start gap-3">
                <span className="font-mono text-gold-500 font-bold shrink-0">I.</span>
                <p><strong>Identidad Privada:</strong> Cada alumna es asignada a un tutor de proyección académica y se le asigna un código simbólico del amanecer para su desarrollo científico y publicación de informes.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-mono text-gold-500 font-bold shrink-0">II.</span>
                <p><strong>Seguridad Residencial:</strong> El campus de la fundación cuenta con sistemas avanzados de seguridad perimetral, monitoreo autónomo y personal de seguridad altamente capacitado las 24 horas del día.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-mono text-gold-500 font-bold shrink-0">III.</span>
                <p><strong>Desarrollo Cohesivo:</strong> El grupo inicial de 15 niñas (edades de 10 a 12 años) convive bajo un modelo familiar de sororidad, donde desarrollan hábitos sanos, apoyo recíproco y dinámicas de respeto intelectual.</p>
              </li>
            </ul>
          </div>

          <div className="font-mono text-[9px] tracking-[0.2em] text-white/30 uppercase mt-4">
            REGULADO POR PROTOCOLO INTERNACIONAL DE PROTECCIÓN DE INFANCIA • 2026
          </div>

        </div>
      </section>

      {/* ==========================================
          6. CAMPUS (EL PLAN MAESTRO DEL CAMPUS)
         ========================================== */}
      <section id="campus" className="py-24 px-6 md:px-12 bg-navy-950 relative overflow-hidden">
        
        {/* Map grid aesthetic */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(212,175,55,0.03)_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none opacity-40" />

        <div className="max-w-6xl mx-auto flex flex-col gap-12 relative">
          
          <div className="text-center flex flex-col items-center gap-3 max-w-2xl mx-auto">
            <span className="font-mono text-[10px] tracking-[0.4em] text-gold-500 uppercase">
              05 / ARQUITECTURA CIVICA
            </span>
            <h2 className="font-serif font-light text-3xl md:text-4xl lg:text-5xl text-white tracking-wide">
              Plan Maestro del Campus Elite
            </h2>
            <div className="w-12 h-[1px] bg-gold-500/20 my-1" />
            <p className="text-white/40 font-sans text-xs md:text-sm leading-relaxed font-light">
              Un santuario de alta arquitectura diseñado para la máxima concentración, eficiencia energética y conexión profunda con los sistemas biológicos.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Campus Nodes Map Grid Selector */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { id: "school", label: "Escuela Central", desc: "Aulas de síntesis conceptual", icon: School },
                { id: "ailab", label: "Laboratorio IA", desc: "Clúster de computación cognitiva", icon: Cpu },
                { id: "library", label: "Biblioteca", desc: "Textos clásicos e históricos", icon: BookOpen },
                { id: "residence", label: "Residencia", desc: "Hogar de sororidad de élite", icon: Shield },
                { id: "dining", label: "Comedor Sostenible", desc: "Nutrición celular y orgánica", icon: Heart },
                { id: "sports", label: "Área Deportiva", desc: "Acondicionamiento físico", icon: Flame },
                { id: "farm", label: "Granja Bio", desc: "Cacao, vainilla y moringa", icon: Sprout },
                { id: "solar", label: "Energía Solar", desc: "Autosuficiencia fotovoltaica", icon: Zap },
                { id: "greenhouse", label: "Invernaderos", desc: "Sistemas hidropónicos IoT", icon: Layers },
                { id: "auditorium", label: "Auditorio", desc: "Debate, retórica e informes", icon: Landmark },
                { id: "wellness", label: "Centro de Salud", desc: "Medicina preventiva y mental", icon: Award }
              ].map(node => {
                const Icon = node.icon;
                const isActive = activeCampusNode === node.id;
                return (
                  <button
                    key={node.id}
                    onClick={() => setActiveCampusNode(node.id)}
                    className={`p-4 rounded-xl border text-left flex flex-col justify-between h-28 transition-all cursor-pointer ${
                      isActive 
                        ? "bg-gold-500/10 border-gold-500/50 text-gold-400 shadow-[0_0_20px_rgba(212,175,55,0.15)]" 
                        : "bg-black/30 border-white/5 text-white/50 hover:border-white/10 hover:text-white"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? "text-gold-400" : "text-white/20"}`} />
                    <div className="mt-2">
                      <span className="font-serif font-light text-xs tracking-wide block leading-tight">{node.label}</span>
                      <span className="font-mono text-[8px] opacity-40 block truncate mt-0.5">{node.desc}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Node Premium Highlight Display */}
            <div className="lg:col-span-5 bg-black/50 border border-white/10 rounded-2xl p-8 backdrop-blur-md min-h-[350px] flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 rounded-full blur-2xl -z-10" />
              
              <AnimatePresence mode="wait">
                {activeCampusNode === "school" && (
                  <motion.div key="school" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4">
                    <span className="font-mono text-[9px] tracking-widest text-gold-500">CAMPUS COGNITIVO</span>
                    <h3 className="font-serif text-2xl font-light text-white leading-tight">Escuela Central Alborada</h3>
                    <p className="text-xs text-white/70 leading-relaxed font-light">
                      El epicentro académico. Un edificio diseñado acústicamente para eliminar las distracciones auditivas, maximizando el flujo de luz natural que representa el amanecer de las ideas. Equipada con pizarras interconectadas, salas de diálogo socrático y mobiliario ergonómico de madera noble sostenible.
                    </p>
                    <div className="text-[11px] text-gold-400/80 font-mono">ESTADO: PLANOS COMPLETADOS Y VALIDACIÓN BIOCLIMÁTICA</div>
                  </motion.div>
                )}

                {activeCampusNode === "ailab" && (
                  <motion.div key="ailab" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4">
                    <span className="font-mono text-[9px] tracking-widest text-gold-500">CAMPUS DIGITAL</span>
                    <h3 className="font-serif text-2xl font-light text-white leading-tight">Laboratorio IA & Clúster</h3>
                    <p className="text-xs text-white/70 leading-relaxed font-light">
                      Un santuario de cómputo donde las niñas interactúan con servidores dedicados para entrenamiento de pequeños modelos locales de lenguaje. Las terminales están adaptadas con pantallas de protección ocular y sistemas operativos Linux minimalistas para fomentar la comprensión estructural de la tecnología.
                    </p>
                    <div className="text-[11px] text-gold-400/80 font-mono">ESTADO: ARQUITECTURA DE DATOS PRE-DISEÑADA Y ALLIANCE READY</div>
                  </motion.div>
                )}

                {activeCampusNode === "library" && (
                  <motion.div key="library" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4">
                    <span className="font-mono text-[9px] tracking-widest text-gold-500">CAMPUS LITERARIO</span>
                    <h3 className="font-serif text-2xl font-light text-white leading-tight">La Biblioteca de los Fundadores</h3>
                    <p className="text-xs text-white/70 leading-relaxed font-light">
                      Un espacio que custodia textos clásicos de filosofía, tomos históricos de ciencia universal y literatura en tres idiomas. Las estanterías están hechas de arcilla y madera aromática, con puestos de estudio privados para potenciar la asimilación conceptual profunda y libre de ruido digital.
                    </p>
                    <div className="text-[11px] text-gold-400/80 font-mono">ESTADO: COMPILACIÓN DE CATÁLOGO CLÁSICO EN PROCESO</div>
                  </motion.div>
                )}

                {activeCampusNode === "residence" && (
                  <motion.div key="residence" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4">
                    <span className="font-mono text-[9px] tracking-widest text-gold-500">CAMPUS FAMILIAR</span>
                    <h3 className="font-serif text-2xl font-light text-white leading-tight">La Residencia de Sororidad</h3>
                    <p className="text-xs text-white/70 leading-relaxed font-light">
                      El hogar seguro de nuestras 15 líderes. Diseñada con un estilo minimalista, acogedor y cálido. Cada niña dispone de un área de estudio personal y áreas compartidas para el fomento de la convivencia familiar, la resolución de conflictos empática y las tertulias nocturnas sobre el futuro.
                    </p>
                    <div className="text-[11px] text-gold-400/80 font-mono">ESTADO: DISEÑO ESTRUCTURAL PREMIUM DE BAJO IMPACTO</div>
                  </motion.div>
                )}

                {/* Fallback support for other nodes to ensure no crash */}
                {!["school", "ailab", "library", "residence"].includes(activeCampusNode) && (
                  <motion.div key="generic" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4">
                    <span className="font-mono text-[9px] tracking-widest text-gold-500">MAESTRO INTEGRAL</span>
                    <h3 className="font-serif text-2xl font-light text-white leading-tight">Sistemas Bioclimáticos & Productivos</h3>
                    <p className="text-xs text-white/70 leading-relaxed font-light">
                      Este nodo representa el compromiso de Fundación Alborada con la autosuficiencia operativa y la ecología inteligente. Todas las estructuras están diseñadas para funcionar de manera sinérgica, conectando el consumo fotovoltaico de energía con los invernaderos y la nutrición óptima de las alumnas.
                    </p>
                    <div className="text-[11px] text-gold-400/80 font-mono">ESTADO: INGENIERÍA COMPLETA DE SOSTENIBILIDAD Y ENERGÍA</div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="w-full h-[1px] bg-white/10 my-4" />
              <div className="text-[10px] font-mono tracking-widest text-white/30 text-right">
                ALBORADA PLAN 2026-2028
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ==========================================
          7. ARTIFICIAL INTELLIGENCE (INTELEGENCIA ARTIFICIAL)
         ========================================== */}
      <section id="ai-section" className="py-24 px-6 md:px-12 bg-black relative border-t border-b border-white/5">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-gold-500/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto flex flex-col gap-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="flex flex-col gap-6">
              <span className="font-mono text-[10px] tracking-[0.4em] text-gold-500 uppercase">
                06 / LA INFRAESTRUCTURA MENTAL
              </span>
              <h2 className="font-serif font-light text-3xl md:text-4xl text-white tracking-wide leading-tight">
                La Inteligencia Artificial al servicio de la Excelencia Pedagógica
              </h2>
              <div className="w-12 h-[1px] bg-gold-500/30" />
              <p className="text-sm text-white/70 leading-relaxed font-light">
                No enseñamos IA como un atajo de automatización rápida ni como una novedad lúdica. Para nosotros, la IA es el microscopio cognitivo de esta era: una extensión analítica que permite a las niñas asimilar conocimientos complejos en tiempo récord, personalizar su velocidad de aprendizaje y dotarlas de soberanía tecnológica.
              </p>
              <p className="text-xs text-white/50 leading-relaxed font-light">
                La cohorte interactuará de manera segura y controlada con modelos locales de lenguaje adaptados por la fundación, utilizándolos como socráticos tutores privados en campos de historia, codificación y lenguas universales.
              </p>
            </div>

            {/* Neural Particles Simulator Display */}
            <div className="bg-navy-950/60 border border-white/10 rounded-2xl p-6 backdrop-blur-md flex flex-col justify-between h-[320px]">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <span className="font-mono text-[9px] tracking-widest text-gold-400">CLÚSTER: ACTIVO</span>
                <span className="font-mono text-[9px] text-white/40">SISTEMA SOCRÁTICO LOCAL</span>
              </div>

              {/* Graphical placeholder representing elegant neuron connections */}
              <div className="relative w-full flex-grow flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 to-transparent z-10" />
                
                {/* Micro neural network vector visualization using static CSS/HTML elements */}
                <div className="absolute w-44 h-44 rounded-full border border-gold-500/10 flex items-center justify-center animate-spin-slow">
                  <div className="w-32 h-32 rounded-full border border-gold-500/20 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border border-gold-500/30 flex items-center justify-center">
                      <Cpu className="w-6 h-6 text-gold-400 animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Symmetrical glowing target nodes representing personalized fields */}
                <div className="absolute top-8 left-12 p-1.5 bg-black/60 rounded border border-white/10 text-[9px] font-mono text-white/60 tracking-wider">
                  SÍNTESIS DE HISTORIA
                </div>
                <div className="absolute bottom-8 right-12 p-1.5 bg-black/60 rounded border border-white/10 text-[9px] font-mono text-white/60 tracking-wider">
                  LENGUAJE NATURAL
                </div>
                <div className="absolute top-1/2 right-4 -translate-y-1/2 p-1.5 bg-black/60 rounded border border-white/10 text-[9px] font-mono text-white/60 tracking-wider">
                  LÓGICA MATEMÁTICA
                </div>

              </div>

              <div className="flex justify-between items-center text-[9px] font-mono text-white/40 pt-2 border-t border-white/5">
                <span>SECUENCIA SOCRÁTICA COMPLETA</span>
                <span>MODELO DE CÓMPUTO SEGURO</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==========================================
          8. SUSTAINABILITY AND FARM (SOSTENIBILIDAD Y GRANJA)
         ========================================== */}
      <section id="sustainability" className="py-24 px-6 md:px-12 bg-[#050a1a] relative border-b border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col gap-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="bg-black/30 border border-white/5 rounded-2xl p-8 backdrop-blur-sm order-2 lg:order-1 grid grid-cols-2 gap-4">
              <div className="border border-white/5 p-4 rounded bg-[#010204]/40">
                <Sprout className="w-5 h-5 text-gold-400 mb-2" />
                <h4 className="font-serif font-light text-xs text-white">Cacao y Moringa</h4>
                <p className="text-[10px] text-white/50 leading-relaxed font-light mt-1">Soberanía agraria y procesamiento ético de derivados nutricionales.</p>
              </div>
              <div className="border border-white/5 p-4 rounded bg-[#010204]/40">
                <Globe className="w-5 h-5 text-gold-400 mb-2" />
                <h4 className="font-serif font-light text-xs text-white">Miel de Abejas</h4>
                <p className="text-[10px] text-white/50 leading-relaxed font-light mt-1">Manejo apícola inteligente para fomento biológico local.</p>
              </div>
              <div className="border border-white/5 p-4 rounded bg-[#010204]/40">
                <Zap className="w-5 h-5 text-gold-400 mb-2" />
                <h4 className="font-serif font-light text-xs text-white">Sistemas Solares</h4>
                <p className="text-[10px] text-white/50 leading-relaxed font-light mt-1">Infraestructura fotovoltaica autónoma para el 100% de operaciones.</p>
              </div>
              <div className="border border-white/5 p-4 rounded bg-[#010204]/40">
                <Layers className="w-5 h-5 text-gold-400 mb-2" />
                <h4 className="font-serif font-light text-xs text-white">Ciclo del Agua</h4>
                <p className="text-[10px] text-white/50 leading-relaxed font-light mt-1">Tratamiento y recolección inteligente de aguas pluviales.</p>
              </div>
            </div>

            <div className="flex flex-col gap-6 order-1 lg:order-2">
              <span className="font-mono text-[10px] tracking-[0.4em] text-gold-500 uppercase">
                07 / AUTO-SUFICIENCIA Y ARMONÍA
              </span>
              <h2 className="font-serif font-light text-3xl md:text-4xl text-white tracking-wide leading-tight">
                Soberanía Agrícola y Sostenibilidad Aplicada
              </h2>
              <div className="w-12 h-[1px] bg-gold-500/30" />
              <p className="text-sm text-white/70 leading-relaxed font-light">
                Un líder integral no ignora el origen de su sustento. En la Fundación Alborada, el trabajo con la tierra no es una labor de castigo, sino una ciencia de soberanía. El campus cuenta con una granja ecológica donde las niñas experimentan el ciclo completo de la materia orgánica, colaborando activamente en la apicultura, cuidado avícola y cultivos de cacao, moringa y vainilla.
              </p>
              <p className="text-xs text-white/50 leading-relaxed font-light">
                Esta sinergia entre tierra y ciencia les enseña nociones avanzadas de termodinámica, biología de suelos, micro-negocios y fomento ecológico integral.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ==========================================
          9. IMPACT (IMPACTO E ALLIANCES EN CIFRAS)
         ========================================== */}
      <section id="impact" className="py-24 px-6 md:px-12 bg-black border-b border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col gap-12">
          
          <div className="text-center flex flex-col items-center gap-3 max-w-2xl mx-auto">
            <span className="font-mono text-[10px] tracking-[0.4em] text-gold-500 uppercase">
              08 / RESULTADOS COMPROMETIDOS
            </span>
            <h2 className="font-serif font-light text-3xl md:text-4xl text-white tracking-wide">
              El Impacto de Alborada en Cifras
            </h2>
            <div className="w-12 h-[1px] bg-gold-500/20 my-1" />
            <p className="text-white/40 font-sans text-xs md:text-sm leading-relaxed font-light">
              Métricas auditadas que representan nuestra dedicación incondicional a la transformación humana.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-center mt-6">
            
            <div className="bg-[#050a1a] border border-white/5 p-8 rounded-2xl backdrop-blur-sm">
              <span className="text-4xl md:text-5xl font-serif text-gold-400 font-light block mb-2">15</span>
              <span className="font-mono text-[9px] tracking-wider text-white/40 uppercase block mb-1">Niñas Lideresas</span>
              <p className="text-[11px] text-white/60 leading-relaxed font-light">Primera cohorte seleccionada bajo criterios estrictos de talento.</p>
            </div>

            <div className="bg-[#050a1a] border border-white/5 p-8 rounded-2xl backdrop-blur-sm">
              <span className="text-4xl md:text-5xl font-serif text-gold-400 font-light block mb-2">100%</span>
              <span className="font-mono text-[9px] tracking-wider text-white/40 uppercase block mb-1">Becas de Élite</span>
              <p className="text-[11px] text-white/60 leading-relaxed font-light">Financiación total de residencia, alimentación y educación internacional.</p>
            </div>

            <div className="bg-[#050a1a] border border-white/5 p-8 rounded-2xl backdrop-blur-sm">
              <span className="text-4xl md:text-5xl font-serif text-gold-400 font-light block mb-2">24/7</span>
              <span className="font-mono text-[9px] tracking-wider text-white/40 uppercase block mb-1">Ecosistema Seguro</span>
              <p className="text-[11px] text-white/60 leading-relaxed font-light">Acompañamiento familiar, nutricional y residencial ininterrumpido.</p>
            </div>

            <div className="bg-[#050a1a] border border-white/5 p-8 rounded-2xl backdrop-blur-sm">
              <span className="text-4xl md:text-5xl font-serif text-gold-400 font-light block mb-2">10+</span>
              <span className="font-mono text-[9px] tracking-wider text-white/40 uppercase block mb-1">Años de Formación</span>
              <p className="text-[11px] text-white/60 leading-relaxed font-light">Tutoría ininterrumpida desde la niñez hasta el desarrollo profesional adulto.</p>
            </div>

            <div className="bg-[#050a1a] border border-white/5 p-8 rounded-2xl backdrop-blur-sm">
              <span className="text-4xl md:text-5xl font-serif text-gold-400 font-light block mb-2">4+</span>
              <span className="font-mono text-[9px] tracking-wider text-white/40 uppercase block mb-1">Alianzas Globales</span>
              <p className="text-[11px] text-white/60 leading-relaxed font-light">Convenios con clústeres de tecnología, universidades y entes éticos.</p>
            </div>

          </div>

        </div>
      </section>

      {/* ==========================================
          10. TIMELINE (HOJA DE RUTA / ROADMAP)
         ========================================== */}
      <section id="timeline" className="py-24 px-6 md:px-12 bg-navy-950 relative overflow-hidden">
        <div className="max-w-4xl mx-auto flex flex-col gap-12">
          
          <div className="text-center flex flex-col items-center gap-3 max-w-2xl mx-auto">
            <span className="font-mono text-[10px] tracking-[0.4em] text-gold-500 uppercase">
              09 / CRONOLOGÍA DE DESARROLLO
            </span>
            <h2 className="font-serif font-light text-3xl md:text-4xl text-white tracking-wide">
              Hoja de Ruta de Alborada
            </h2>
            <div className="w-12 h-[1px] bg-gold-500/20 my-1" />
            <p className="text-white/40 font-sans text-xs md:text-sm leading-relaxed font-light">
              Nuestra planificación estratégica a largo plazo para asegurar un impacto multigeneracional duradero.
            </p>
          </div>

          {/* Elegant vertical timeline */}
          <div className="relative border-l border-gold-500/20 pl-8 ml-4 md:ml-12 space-y-12">
            
            <div className="relative">
              <div className="absolute -left-[37px] top-1.5 w-4 h-4 rounded-full bg-gold-500 border-4 border-navy-950 shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
              <div className="flex flex-col gap-1">
                <span className="font-serif font-bold text-lg text-gold-400">2026</span>
                <span className="font-mono text-[10px] tracking-wider text-white/50 uppercase">Constitución Institucional y Primera Cohorte</span>
                <p className="text-xs text-white/70 font-light leading-relaxed mt-1">
                  Fundación formal del estamento legal, compra de tierras y selección estricta bajo protocolo de protección de las primeras 15 niñas fundadoras. Inicio de residencia temporal adaptada.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-[37px] top-1.5 w-4 h-4 rounded-full bg-navy-500 border-4 border-navy-950" />
              <div className="flex flex-col gap-1">
                <span className="font-serif font-bold text-lg text-gold-400">2027</span>
                <span className="font-mono text-[10px] tracking-wider text-white/50 uppercase">Campus Inicial y Modelo Pedagógico Unificado</span>
                <p className="text-xs text-white/70 font-light leading-relaxed mt-1">
                  Inicio de obras del campus definitivo bioclimático. Consolidación de currículo socrático y mentorías en lenguas universales con profesores internacionales.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-[37px] top-1.5 w-4 h-4 rounded-full bg-navy-500 border-4 border-navy-950" />
              <div className="flex flex-col gap-1">
                <span className="font-serif font-bold text-lg text-gold-400">2028</span>
                <span className="font-mono text-[10px] tracking-wider text-white/50 uppercase">Laboratorio de Cómputo IA & Plataforma Descentralizada</span>
                <p className="text-xs text-white/70 font-light leading-relaxed mt-1">
                  Inauguración del nodo de Inteligencia Artificial Clúster. Programación de asistentes socráticos y primeros micro-negocios apícolas tutelados por las alumnas.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-[37px] top-1.5 w-4 h-4 rounded-full bg-navy-500 border-4 border-navy-950" />
              <div className="flex flex-col gap-1">
                <span className="font-serif font-bold text-lg text-gold-400">2030</span>
                <span className="font-mono text-[10px] tracking-wider text-white/50 uppercase">Expansión del Campus Autosuficiente</span>
                <p className="text-xs text-white/70 font-light leading-relaxed mt-1">
                  Habilitación al 100% de la soberanía fotovoltaica y sistema de invernaderos IoT. Consolidación del cacao de exportación solidaria y fomento del fondo soberano Alborada.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-[37px] top-1.5 w-4 h-4 rounded-full bg-navy-500 border-4 border-navy-950" />
              <div className="flex flex-col gap-1">
                <span className="font-serif font-bold text-lg text-gold-400">2035</span>
                <span className="font-mono text-[10px] tracking-wider text-white/50 uppercase">Primera Generación de Líderes Adultas</span>
                <p className="text-xs text-white/70 font-light leading-relaxed mt-1">
                  Graduación de las 15 fundadoras originales, quienes asumen el control operativo de proyectos de desarrollo industrial, científico o cultural con alianzas académicas internacionales.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-[37px] top-1.5 w-4 h-4 rounded-full bg-navy-500 border-4 border-navy-950" />
              <div className="flex flex-col gap-1">
                <span className="font-serif font-bold text-lg text-gold-400">2040+</span>
                <span className="font-mono text-[10px] tracking-wider text-white/50 uppercase">Replicabilidad Internacional</span>
                <p className="text-xs text-white/70 font-light leading-relaxed mt-1">
                  Exportación del modelo de educación Alborada a otros continentes, sirviendo como asesores globales para gobiernos y fundaciones de impacto moral.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==========================================
          11. TRANSPARENCY (SITUACIÓN INSTITUCIONAL)
         ========================================== */}
      <section id="transparency" className="py-24 px-6 md:px-12 bg-[#020408] border-t border-b border-white/5 relative">
        <div className="max-w-6xl mx-auto flex flex-col gap-12">
          
          <div className="text-center flex flex-col items-center gap-3 max-w-2xl mx-auto">
            <span className="font-mono text-[10px] tracking-[0.4em] text-gold-500 uppercase">
              10 / AUDITORÍA PÚBLICA Y ÉTICA
            </span>
            <h2 className="font-serif font-light text-3xl md:text-4xl text-white tracking-wide">
              Transparencia Institucional
            </h2>
            <div className="w-12 h-[1px] bg-gold-500/20 my-1" />
            <p className="text-white/40 font-sans text-xs md:text-sm leading-relaxed font-light">
              Mantenemos altos estándares de gobernanza y trazabilidad material para cada recurso invertido.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-black/40 border border-white/5 p-6 rounded-xl backdrop-blur-sm flex flex-col justify-between h-56">
              <div>
                <div className="flex justify-between items-start">
                  <span className="font-serif text-white text-base font-light">Gobernanza de Élite</span>
                  <Landmark className="w-4 h-4 text-gold-400" />
                </div>
                <p className="text-xs text-white/60 leading-relaxed font-light mt-3">
                  Dirigida por un consejo consultor independiente de científicos, académicos morales y líderes éticos que garantizan el norte moral del campus.
                </p>
              </div>
              <span className="font-mono text-[9px] text-gold-500/70 tracking-wider">ESTRUCTURA DE CONSEJO ESTRICTO</span>
            </div>

            <div className="bg-black/40 border border-white/5 p-6 rounded-xl backdrop-blur-sm flex flex-col justify-between h-56">
              <div>
                <div className="flex justify-between items-start">
                  <span className="font-serif text-white text-base font-light">Uso de Fondos Directo</span>
                  <DollarSign className="w-4 h-4 text-gold-400" />
                </div>
                <p className="text-xs text-white/60 leading-relaxed font-light mt-3">
                  El 92% de cada recurso donado se destina de manera directa al desarrollo del campus y el bienestar vital o educativo de las 15 alumnas beneficiarias.
                </p>
              </div>
              <span className="font-mono text-[9px] text-gold-500/70 tracking-wider">AUDITADO EXTERNAMENTE</span>
            </div>

            <div className="bg-black/40 border border-white/5 p-6 rounded-xl backdrop-blur-sm flex flex-col justify-between h-56">
              <div>
                <div className="flex justify-between items-start">
                  <span className="font-serif text-white text-base font-light">Evolución de Obras</span>
                  <Layers className="w-4 h-4 text-gold-400" />
                </div>
                <p className="text-xs text-white/60 leading-relaxed font-light mt-3">
                  Informes mensuales en video de modelado 3D y avance de obra bioclimática en el lote definitivo de construcción.
                </p>
              </div>
              <span className="font-mono text-[9px] text-gold-500/70 tracking-wider">PLANES DE CONSTRUCCIÓN DISPONIBLES</span>
            </div>

            <div className="bg-black/40 border border-white/5 p-6 rounded-xl backdrop-blur-sm flex flex-col justify-between h-56">
              <div>
                <div className="flex justify-between items-start">
                  <span className="font-serif text-white text-base font-light">Evolución Pedagógica</span>
                  <BookOpen className="w-4 h-4 text-gold-400" />
                </div>
                <p className="text-xs text-white/60 leading-relaxed font-light mt-3">
                  Avances científicos publicados bajo seudónimo académico, midiendo el desarrollo de las alumnas en lenguas, cómputo y lógica dialéctica.
                </p>
              </div>
              <span className="font-mono text-[9px] text-gold-500/70 tracking-wider">100% REGULADO POR PRIVACIDAD</span>
            </div>

            <div className="bg-black/40 border border-white/5 p-6 rounded-xl backdrop-blur-sm flex flex-col justify-between h-56">
              <div>
                <div className="flex justify-between items-start">
                  <span className="font-serif text-white text-base font-light">Alianzas de Datos</span>
                  <Cpu className="w-4 h-4 text-gold-400" />
                </div>
                <p className="text-xs text-white/60 leading-relaxed font-light mt-3">
                  Monitoreo tecnológico transparente de los sistemas de energía solar y datos biológicos del suelo agrícola mediante APIs públicas.
                </p>
              </div>
              <span className="font-mono text-[9px] text-gold-500/70 tracking-wider">API DE CÓMPUTO AUTÓNOMO</span>
            </div>

            <div className="bg-black/40 border border-white/5 p-6 rounded-xl backdrop-blur-sm flex flex-col justify-between h-56">
              <div>
                <div className="flex justify-between items-start">
                  <span className="font-serif text-white text-base font-light">Reportes Anuales</span>
                  <FileText className="w-4 h-4 text-gold-400" />
                </div>
                <p className="text-xs text-white/60 leading-relaxed font-light mt-3">
                  Descarga pública de balances generales de contabilidad, reportes de impacto social y certificaciones estatales de exención fiscal colombianas.
                </p>
              </div>
              <span className="font-mono text-[9px] text-gold-500/70 tracking-wider">DESCARGAR INFORME ANUAL 2025 (PDF)</span>
            </div>

          </div>

        </div>
      </section>

      {/* ==========================================
          12. DONATIONS (CONSTRUCCIÓN COLECTIVA)
         ========================================== */}
      <section id="donations" className="py-24 px-6 md:px-12 bg-[#050a1a] relative">
        <div className="max-w-5xl mx-auto flex flex-col gap-12">
          
          <div className="text-center flex flex-col items-center gap-3 max-w-2xl mx-auto">
            <span className="font-mono text-[10px] tracking-[0.4em] text-gold-500 uppercase">
              11 / UNIRSE AL AMANECER
            </span>
            <h2 className="font-serif font-light text-3xl md:text-4xl text-white tracking-wide">
              Respaldar la Misión Alborada
            </h2>
            <div className="w-12 h-[1px] bg-gold-500/20 my-1" />
            <p className="text-white/40 font-sans text-xs md:text-sm leading-relaxed font-light">
              Su aporte material no alimenta un gasto administrativo efímero; construye ladrillos cognitivos y soberanía real de por vida.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Donation Card 1 */}
            <div className="bg-black/40 border border-white/5 hover:border-gold-500/25 p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden group transition-all duration-300">
              <div className="flex flex-col gap-4">
                <span className="font-mono text-[9px] tracking-widest text-gold-500 uppercase block">DESARROLLO HUMANO</span>
                <h3 className="font-serif text-lg font-light text-white group-hover:text-gold-400 transition-colors">Sponsor de Educación Élite</h3>
                <p className="text-xs text-white/60 leading-relaxed font-light">
                  Aporte destinado al fondo de becas completas de las niñas, cubriendo mentorías internacionales, licencias especializadas de cómputo y tutorías bilingües de alta exigencia.
                </p>
                
                {/* Custom dynamic interactive donation state selector */}
                <div className="flex items-center gap-2 mt-2 bg-black/40 p-2 rounded border border-white/5">
                  <span className="font-mono text-[10px] text-white/40">Monto:</span>
                  <input
                    type="number"
                    value={donationInputs.education}
                    onChange={(e) => setDonationInputs(prev => ({ ...prev, education: Number(e.target.value) }))}
                    className="bg-transparent text-gold-400 font-mono text-sm w-20 focus:outline-none border-b border-white/10"
                  />
                  <span className="font-mono text-[10px] text-white/40">USD/mes</span>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                  <div className="bg-gold-500 h-full w-[78%]" />
                </div>
                <div className="flex justify-between text-[9px] font-mono text-white/40">
                  <span>META: 15 BECEADOS</span>
                  <span>78% FINANCIADO</span>
                </div>
                <button
                  onClick={() => handleDonationSubmit("education")}
                  className="w-full py-2 border border-gold-500/30 hover:bg-gold-500/10 text-gold-400 rounded text-[10px] font-mono tracking-widest uppercase transition-colors"
                >
                  {activeDonationSuccess === "education" ? "✓ TRANSACCIÓN COMPLETA" : "DONAR AHORA"}
                </button>
              </div>
            </div>

            {/* Donation Card 2 */}
            <div className="bg-black/40 border border-white/5 hover:border-gold-500/25 p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden group transition-all duration-300">
              <div className="flex flex-col gap-4">
                <span className="font-mono text-[9px] tracking-widest text-gold-500 uppercase block">CAMPUS ACADÉMICO</span>
                <h3 className="font-serif text-lg font-light text-white group-hover:text-gold-400 transition-colors">Construir la Biblioteca</h3>
                <p className="text-xs text-white/60 leading-relaxed font-light">
                  Aporte enfocado en la adquisición de textos históricos de filosofía, astrofísica, historia universal y el mobiliario bioclimático óptimo para el puesto de lectura profunda de las líderes.
                </p>
                
                <div className="flex items-center gap-2 mt-2 bg-black/40 p-2 rounded border border-white/5">
                  <span className="font-mono text-[10px] text-white/40">Monto:</span>
                  <input
                    type="number"
                    value={donationInputs.library}
                    onChange={(e) => setDonationInputs(prev => ({ ...prev, library: Number(e.target.value) }))}
                    className="bg-transparent text-gold-400 font-mono text-sm w-20 focus:outline-none border-b border-white/10"
                  />
                  <span className="font-mono text-[10px] text-white/40">USD único</span>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                  <div className="bg-gold-500 h-full w-[45%]" />
                </div>
                <div className="flex justify-between text-[9px] font-mono text-white/40">
                  <span>META: 8,000 LIBROS</span>
                  <span>45% COMPLETADO</span>
                </div>
                <button
                  onClick={() => handleDonationSubmit("library")}
                  className="w-full py-2 border border-gold-500/30 hover:bg-gold-500/10 text-gold-400 rounded text-[10px] font-mono tracking-widest uppercase transition-colors"
                >
                  {activeDonationSuccess === "library" ? "✓ TRANSACCIÓN COMPLETA" : "DONAR AHORA"}
                </button>
              </div>
            </div>

            {/* Donation Card 3 */}
            <div className="bg-black/40 border border-white/5 hover:border-gold-500/25 p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden group transition-all duration-300">
              <div className="flex flex-col gap-4">
                <span className="font-mono text-[9px] tracking-widest text-gold-500 uppercase block">TECNOLOGÍA COGNITIVA</span>
                <h3 className="font-serif text-lg font-light text-white group-hover:text-gold-400 transition-colors">Equipar Laboratorio IA</h3>
                <p className="text-xs text-white/60 leading-relaxed font-light">
                  Sustenta la compra de servidores dedicados de cómputo local de baja radiación y periféricos ergonómicos para la programación de algoritmos neuronales por parte de la cohorte.
                </p>
                
                <div className="flex items-center gap-2 mt-2 bg-black/40 p-2 rounded border border-white/5">
                  <span className="font-mono text-[10px] text-white/40">Monto:</span>
                  <input
                    type="number"
                    value={donationInputs.ailab}
                    onChange={(e) => setDonationInputs(prev => ({ ...prev, ailab: Number(e.target.value) }))}
                    className="bg-transparent text-gold-400 font-mono text-sm w-20 focus:outline-none border-b border-white/10"
                  />
                  <span className="font-mono text-[10px] text-white/40">USD único</span>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                  <div className="bg-gold-500 h-full w-[60%]" />
                </div>
                <div className="flex justify-between text-[9px] font-mono text-white/40">
                  <span>META: CLÚSTER 4 GPU</span>
                  <span>60% FINANCIADO</span>
                </div>
                <button
                  onClick={() => handleDonationSubmit("ailab")}
                  className="w-full py-2 border border-gold-500/30 hover:bg-gold-500/10 text-gold-400 rounded text-[10px] font-mono tracking-widest uppercase transition-colors"
                >
                  {activeDonationSuccess === "ailab" ? "✓ TRANSACCIÓN COMPLETA" : "DONAR AHORA"}
                </button>
              </div>
            </div>

            {/* Donation Card 4 */}
            <div className="bg-black/40 border border-white/5 hover:border-gold-500/25 p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden group transition-all duration-300">
              <div className="flex flex-col gap-4">
                <span className="font-mono text-[9px] tracking-widest text-gold-500 uppercase block">PROTECCIÓN VITAL</span>
                <h3 className="font-serif text-lg font-light text-white group-hover:text-gold-400 transition-colors">Sostener la Residencia</h3>
                <p className="text-xs text-white/60 leading-relaxed font-light">
                  Aporte directo a la alimentación de alta densidad nutricional de las niñas, vestimenta institucional y el cuidado psicoterapéutico preventivo diario 24/7.
                </p>
                
                <div className="flex items-center gap-2 mt-2 bg-black/40 p-2 rounded border border-white/5">
                  <span className="font-mono text-[10px] text-white/40">Monto:</span>
                  <input
                    type="number"
                    value={donationInputs.residence}
                    onChange={(e) => setDonationInputs(prev => ({ ...prev, residence: Number(e.target.value) }))}
                    className="bg-transparent text-gold-400 font-mono text-sm w-20 focus:outline-none border-b border-white/10"
                  />
                  <span className="font-mono text-[10px] text-white/40">USD/mes</span>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                  <div className="bg-gold-500 h-full w-[90%]" />
                </div>
                <div className="flex justify-between text-[9px] font-mono text-white/40">
                  <span>META: BIENESTAR COMPLETO</span>
                  <span>90% FINANCIADO</span>
                </div>
                <button
                  onClick={() => handleDonationSubmit("residence")}
                  className="w-full py-2 border border-gold-500/30 hover:bg-gold-500/10 text-gold-400 rounded text-[10px] font-mono tracking-widest uppercase transition-colors"
                >
                  {activeDonationSuccess === "residence" ? "✓ TRANSACCIÓN COMPLETA" : "DONAR AHORA"}
                </button>
              </div>
            </div>

            {/* Donation Card 5 */}
            <div className="bg-black/40 border border-white/5 hover:border-gold-500/25 p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden group transition-all duration-300 col-span-1 md:col-span-2 lg:col-span-1">
              <div className="flex flex-col gap-4">
                <span className="font-mono text-[9px] tracking-widest text-gold-500 uppercase block">SOBERANÍA AMBIENTAL</span>
                <h3 className="font-serif text-lg font-light text-white group-hover:text-gold-400 transition-colors">Fomentar Granja Bio</h3>
                <p className="text-xs text-white/60 leading-relaxed font-light">
                  Inversión en colmenas apícolas, optimización de hidropónicos IoT, compra de semillas orgánicas para cacao y moringa, y la expansión fotovoltaica del campus de la fundación.
                </p>
                
                <div className="flex items-center gap-2 mt-2 bg-black/40 p-2 rounded border border-white/5">
                  <span className="font-mono text-[10px] text-white/40">Monto:</span>
                  <input
                    type="number"
                    value={donationInputs.sustainability}
                    onChange={(e) => setDonationInputs(prev => ({ ...prev, sustainability: Number(e.target.value) }))}
                    className="bg-transparent text-gold-400 font-mono text-sm w-20 focus:outline-none border-b border-white/10"
                  />
                  <span className="font-mono text-[10px] text-white/40">USD único</span>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                  <div className="bg-gold-500 h-full w-[35%]" />
                </div>
                <div className="flex justify-between text-[9px] font-mono text-white/40">
                  <span>META: 10 APICULTURAS</span>
                  <span>35% COMPLETADO</span>
                </div>
                <button
                  onClick={() => handleDonationSubmit("sustainability")}
                  className="w-full py-2 border border-gold-500/30 hover:bg-gold-500/10 text-gold-400 rounded text-[10px] font-mono tracking-widest uppercase transition-colors"
                >
                  {activeDonationSuccess === "sustainability" ? "✓ TRANSACCIÓN COMPLETA" : "DONAR AHORA"}
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==========================================
          13. ALLIANCES (ALIANZAS INSTITUCIONALES)
         ========================================== */}
      <section id="alliances" className="py-24 px-6 md:px-12 bg-black relative border-t border-b border-white/5 overflow-hidden">
        
        {/* Soft atmospheric background glow */}
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-8 relative">
          
          <span className="font-mono text-[10px] tracking-[0.4em] text-gold-500 uppercase">
            12 / CONVERGENCIA GLOBAL
          </span>
          
          <h2 className="font-serif font-light text-3xl md:text-4xl text-white tracking-wide leading-tight">
            Invitación a Alianzas Globales de Impacto
          </h2>
          
          <div className="w-16 h-[1px] bg-gold-500/30 my-2" />
          
          <p className="text-white/70 font-sans text-sm md:text-base leading-relaxed font-light max-w-2xl">
            La Fundación Alborada convoca de manera permanente a <strong className="text-white font-medium">empresas de vanguardia tecnológica, universidades prestigiosas, agencias de cooperación internacional y gobiernos locales</strong> para la consolidación de este modelo formativo.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full mt-8 opacity-80">
            <div className="p-4 border border-white/5 bg-navy-950/40 rounded flex flex-col items-center justify-center">
              <span className="font-serif font-light text-white text-sm">UNIVERSIDADES</span>
              <span className="font-mono text-[8px] text-white/30 tracking-widest mt-1 uppercase">Intercambio Científico</span>
            </div>
            <div className="p-4 border border-white/5 bg-navy-950/40 rounded flex flex-col items-center justify-center">
              <span className="font-serif font-light text-white text-sm">TECH COMPANIES</span>
              <span className="font-mono text-[8px] text-white/30 tracking-widest mt-1 uppercase">Clúster & Cloud Cómputo</span>
            </div>
            <div className="p-4 border border-white/5 bg-navy-950/40 rounded flex flex-col items-center justify-center">
              <span className="font-serif font-light text-white text-sm">GOBIERNOS</span>
              <span className="font-mono text-[8px] text-white/30 tracking-widest mt-1 uppercase">Políticas Públicas</span>
            </div>
            <div className="p-4 border border-white/5 bg-navy-950/40 rounded flex flex-col items-center justify-center">
              <span className="font-serif font-light text-white text-sm">ONG ETICAS</span>
              <span className="font-mono text-[8px] text-white/30 tracking-widest mt-1 uppercase">Fondo Multilateral</span>
            </div>
          </div>

        </div>
      </section>

      {/* ==========================================
          14. CONTACT (FORMULARIO DE CONTACTO)
         ========================================== */}
      <section id="contact" className="py-24 px-6 md:px-12 bg-[#050a1a] relative">
        <div className="max-w-4xl mx-auto flex flex-col gap-12">
          
          <div className="text-center flex flex-col items-center gap-3 max-w-2xl mx-auto">
            <span className="font-mono text-[10px] tracking-[0.4em] text-gold-500 uppercase">
              13 / MESA DE INQUIRIDORES
            </span>
            <h2 className="font-serif font-light text-3xl md:text-4xl text-white tracking-wide">
              Mesa de Contacto Alborada
            </h2>
            <div className="w-12 h-[1px] bg-gold-500/20 my-1" />
            <p className="text-white/40 font-sans text-xs md:text-sm leading-relaxed font-light">
              Deje su mensaje e intención de vinculación. Nuestro comité directivo revisa de manera selectiva las solicitudes.
            </p>
          </div>

          <div className="bg-black/30 border border-white/10 rounded-2xl p-8 backdrop-blur-md relative max-w-2xl mx-auto w-full">
            
            <AnimatePresence mode="wait">
              {!contactSubmitted ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleContactSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[10px] tracking-wider text-white/50 uppercase">Nombre Completo *</label>
                      <input
                        type="text"
                        required
                        value={contactData.name}
                        onChange={(e) => setContactData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Dr. Alberto Casas"
                        className="bg-white/5 border border-white/10 rounded p-3 text-sm focus:outline-none focus:border-gold-500/40 text-white placeholder-white/20"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[10px] tracking-wider text-white/50 uppercase">Correo Electrónico *</label>
                      <input
                        type="email"
                        required
                        value={contactData.email}
                        onChange={(e) => setContactData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="casas@universidad.edu"
                        className="bg-white/5 border border-white/10 rounded p-3 text-sm focus:outline-none focus:border-gold-500/40 text-white placeholder-white/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[10px] tracking-wider text-white/50 uppercase">Organización / Entidad</label>
                      <input
                        type="text"
                        value={contactData.organization}
                        onChange={(e) => setContactData(prev => ({ ...prev, organization: e.target.value }))}
                        placeholder="Clúster de Tecnología de Bogotá"
                        className="bg-white/5 border border-white/10 rounded p-3 text-sm focus:outline-none focus:border-gold-500/40 text-white placeholder-white/20"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[10px] tracking-wider text-white/50 uppercase">Eje de Interés *</label>
                      <select
                        value={contactData.interest}
                        onChange={(e) => setContactData(prev => ({ ...prev, interest: e.target.value }))}
                        className="bg-navy-950 border border-white/10 rounded p-3 text-sm focus:outline-none focus:border-gold-500/40 text-white"
                      >
                        <option value="alliance">Alianza Institucional</option>
                        <option value="donation">Donación Especial</option>
                        <option value="press">Prensa & Divulgación</option>
                        <option value="volunteer">Académico / Tutoría</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] tracking-wider text-white/50 uppercase">Mensaje e Intención *</label>
                    <textarea
                      required
                      rows={4}
                      value={contactData.message}
                      onChange={(e) => setContactData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Describa de manera detallada cómo su institución puede integrarse constructivamente..."
                      className="bg-white/5 border border-white/10 rounded p-3 text-sm focus:outline-none focus:border-gold-500/40 text-white placeholder-white/20 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 font-serif font-semibold text-xs tracking-[0.2em] uppercase rounded shadow-lg hover:shadow-[0_4px_20px_rgba(212,175,55,0.25)] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>ENVIAR DECLARACIÓN</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>

                </motion.form>
              ) : (
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 flex flex-col items-center gap-4"
                >
                  <div className="w-12 h-12 bg-gold-500/10 rounded-full flex items-center justify-center border border-gold-500/30 mb-2">
                    <CheckCircle2 className="w-6 h-6 text-gold-400" />
                  </div>
                  <h3 className="font-serif text-xl text-white">Declaración Recibida Con Éxito</h3>
                  <p className="text-xs text-white/50 leading-relaxed font-light max-w-md">
                    Agradecemos su deferencia intelectual e interés institucional. El comité académico directivo de la <strong className="text-white font-medium">Fundación Alborada</strong> procesará su solicitud de manera confidencial y se pondrá en contacto en un plazo máximo de 72 horas.
                  </p>
                  <button
                    onClick={() => setContactSubmitted(false)}
                    className="font-mono text-[10px] text-gold-400 hover:text-white mt-4 border border-gold-500/20 hover:border-white/30 px-3 py-1.5 rounded transition-all"
                  >
                    ENVIAR OTRO MENSAJE
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Institutional Information footer links */}
            <div className="w-full h-[1px] bg-white/10 my-8" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[11px] font-mono text-white/50">
              <div className="flex items-center gap-2">
                <Send className="w-3.5 h-3.5 text-gold-500/50" />
                <span>contacto@alboradafoundation.org</span>
              </div>
              <div className="flex items-center gap-2 sm:justify-end">
                <Globe className="w-3.5 h-3.5 text-gold-500/50" />
                <span>alboradafoundation.org</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==========================================
          15. FOOTER (PIE DE PÁGINA)
         ========================================== */}
      <footer className="w-full bg-[#020408] border-t border-white/5 py-16 px-8 relative overflow-hidden">
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Logo element */}
          <div className="md:col-span-4 flex flex-col select-none">
            <span className="font-serif font-light text-2xl letter-spacing-xl text-white">
              ALBORADA
            </span>
            <span className="font-mono text-[9px] tracking-[0.5em] text-gold-500/80 uppercase mt-2">
              EDUCATIONAL FOUNDATION
            </span>
            <p className="text-white/40 font-sans text-xs font-light leading-relaxed mt-4 max-w-sm">
              Santuario pedagógico residencial de alto rendimiento para el fomento cognitivo de 15 lideresas excepcionales de Colombia y el mundo.
            </p>
          </div>

          {/* Quick links block */}
          <div className="md:col-span-3 flex flex-col gap-3 text-xs">
            <span className="font-mono text-[9px] tracking-[0.2em] text-gold-500 uppercase">LA INSTITUCIÓN</span>
            <button onClick={() => scrollToSection("hero")} className="text-white/50 hover:text-white transition-colors text-left">Inicio</button>
            <button onClick={() => scrollToSection("mission")} className="text-white/50 hover:text-white transition-colors text-left">Nuestra Misión</button>
            <button onClick={() => scrollToSection("model")} className="text-white/50 hover:text-white transition-colors text-left">Ejes Pedagógicos</button>
            <button onClick={() => scrollToSection("campus")} className="text-white/50 hover:text-white transition-colors text-left">Campus Masterplan</button>
          </div>

          <div className="md:col-span-3 flex flex-col gap-3 text-xs">
            <span className="font-mono text-[9px] tracking-[0.2em] text-gold-500 uppercase">TRANSPARENCIA</span>
            <button onClick={() => scrollToSection("girls")} className="text-white/50 hover:text-white transition-colors text-left">Protección de Menores</button>
            <button onClick={() => scrollToSection("transparency")} className="text-white/50 hover:text-white transition-colors text-left">Gobernanza y Auditoría</button>
            <button onClick={() => scrollToSection("donations")} className="text-white/50 hover:text-white transition-colors text-left">Soporte y Becas</button>
            <button onClick={() => scrollToSection("alliances")} className="text-white/50 hover:text-white transition-colors text-left">Solicitud de Convenios</button>
          </div>

          {/* Location / Meta block */}
          <div className="md:col-span-2 flex flex-col gap-2 font-mono text-[10px] text-white/40 text-right md:items-end">
            <span className="tracking-widest uppercase text-gold-500">COLOMBIA NODE</span>
            <span>COORD: 5°41&apos;36&quot; N | 72°56&apos;22&quot; W</span>
            <span>GMT-5 TIMEZONE</span>
          </div>

        </div>

        <div className="max-w-6xl mx-auto h-[1px] bg-white/5 my-12" />

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-[9px] text-white/30 tracking-wider">
          <span>© 2026 FUNDACIÓN ALBORADA. TODOS LOS DERECHOS RESERVADOS.</span>
          <span className="flex gap-4">
            <a href="#hero" className="hover:text-white transition-colors">POLÍTICA DE PRIVACIDAD</a>
            <span>•</span>
            <a href="#hero" className="hover:text-white transition-colors">ESTATUTOS DE ÉTICA</a>
          </span>
        </div>

      </footer>

    </div>
  );
};
