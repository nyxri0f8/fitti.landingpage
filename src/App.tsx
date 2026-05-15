import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from "motion/react";
import { 
  Plus, Star, Menu, X, ChefHat, UserCircle, FlaskConical, 
  Dumbbell, Activity, HeartPulse, Stethoscope, UtensilsCrossed, 
  Coffee, Timer, Gauge, Check, ChevronRight, ChevronLeft, Loader2,
  Dna, Zap, ShieldCheck
} from "lucide-react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  key?: React.Key;
  intensity?: number;
}

function TiltCard({ children, className }: TiltCardProps) {
  return (
    <div className={className}>
      <div>{children}</div>
    </div>
  );
}

import GreenGlow from "./GreenGlow";
import FittiCursor from "./FittiCursor";

function CustomSelect({ options, value, onChange, name, label }: { options: string[], value: string, onChange: (name: string, val: string) => void, name: string, label: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="space-y-6 relative" ref={containerRef}>
      <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">{label}</label>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-transparent border-b border-black/10 hover:border-fitti-forest cursor-pointer text-3xl md:text-5xl font-black uppercase tracking-tighter py-6 flex justify-between items-center group transition-colors"
      >
        <span className={value ? "text-zinc-900" : "text-zinc-200"}>{value || "Select Option"}</span>
        <motion.div animate={{ rotate: isOpen ? 90 : 0 }}>
          <ChevronRight size={32} className="text-zinc-200 group-hover:text-fitti-forest transition-colors" />
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute z-[100] left-0 right-0 top-full mt-4 bg-white/90 backdrop-blur-3xl border border-black/5 shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden rounded-[2.5rem] p-3"
          >
            <div className="space-y-1">
              {options.map((opt) => (
                <div
                  key={opt}
                  onClick={() => {
                    onChange(name, opt);
                    setIsOpen(false);
                  }}
                  className="px-8 py-5 text-2xl font-black uppercase tracking-tighter text-zinc-400 hover:text-fitti-forest hover:bg-fitti-forest/5 cursor-pointer rounded-[1.5rem] transition-all relative flex items-center justify-between group"
                >
                  <span className="relative z-10">{opt}</span>
                  {value === opt && (
                    <motion.div 
                      layoutId={`accent-${name}`}
                      className="absolute left-0 w-1.5 h-10 bg-fitti-forest rounded-full"
                    />
                  )}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                     <Plus size={16} className="text-fitti-forest" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Form State
  const [formStep, setFormStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [membershipTab, setMembershipTab] = useState("Fat Loss");
  
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    goal: "Weight Loss",
    age: "",
    height: "",
    weight: "",
    foodPreference: "Veg",
    hasMedicalCondition: "No",
    medicalDescription: "",
    location: "",
    planInterest: "Weekly Trial",
    requestConsultation: "No",
    gymAccess: "No",
    workoutExperience: "Beginner",
    isSportsPerson: "No",
    allergies: ""
  });

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  


  const rotateX = useTransform(smoothProgress, [0, 0.2], [0, 15]);
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.8]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);

  const shape1Y = useTransform(smoothProgress, [0, 1], [0, -800]);
  const shape1Rotate = useTransform(smoothProgress, [0, 1], [0, 360]);
  const shape2Y = useTransform(smoothProgress, [0, 1], [0, 400]);
  const shape2Rotate = useTransform(smoothProgress, [0, 1], [0, -180]);
  const shape3X = useTransform(smoothProgress, [0.3, 0.6], [-200, 200]);

  // Deep Parallax Layers
  const layer1Y = useTransform(smoothProgress, [0, 1], [0, -1200]);
  const layer2Y = useTransform(smoothProgress, [0, 1], [0, -600]);
  const layer3Y = useTransform(smoothProgress, [0, 1], [0, -300]);
  const bgRotation = useTransform(smoothProgress, [0, 1], [0, 45]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (formStep === 1 && (!formData.fullName || !formData.phone)) {
      alert("Please enter your name and phone.");
      return;
    }
    setFormStep(prev => prev + 1);
  };

  const prevStep = () => setFormStep(prev => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Only allow submission on the final step (Step 5)
    if (formStep < 5) {
      nextStep();
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(`Submission failed: ${errorData.message || "Please try again."}`);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col selection:bg-fitti-forest selection:text-white overflow-x-hidden bg-white text-zinc-900">
      <GreenGlow />
      <FittiCursor />
      <div className="noise-overlay" />

      {/* Blueprint Static Elements */}
      <div className="fixed inset-0 grid-overlay -z-20 pointer-events-none" />
      <div className="fixed inset-0 grid-overlay-sub -z-20 pointer-events-none opacity-40 md:opacity-50" />
      
      {/* Floating 3D Graphic Accents & Themed Icons */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 perspective-2000">
        <motion.div 
          style={{ y: layer1Y, rotate: bgRotation }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.012]"
        >
          <Dumbbell size={800} strokeWidth={0.1} className="rotate-45" />
        </motion.div>

        {/* Distributed Technical Accents */}
        <motion.div 
          style={{ y: layer2Y, rotate: shape1Rotate }}
          className="absolute top-[10%] -right-32 w-[35rem] h-[35rem] border border-black/5 rounded-[6rem] blur-[1px] opacity-[0.08]"
        />
        
        <motion.div 
          style={{ y: useTransform(smoothProgress, [0, 1], [400, -1000]), rotate: 15, scale: 1.2 }}
          className="absolute top-[5%] left-[10%] opacity-[0.015] text-fitti-forest"
        >
          <Activity size={400} strokeWidth={0.2} />
        </motion.div>

        <motion.div 
          style={{ y: useTransform(smoothProgress, [0, 1], [1200, -800]), rotate: -25 }}
          className="absolute top-[15%] right-[15%] opacity-[0.01] text-zinc-900"
        >
          <Dna size={500} strokeWidth={0.1} />
        </motion.div>

        <motion.div 
          style={{ y: useTransform(smoothProgress, [0, 1], [2000, -400]), rotate: 45 }}
          className="absolute top-[30%] left-[5%] opacity-[0.01] text-fitti-forest"
        >
          <Zap size={300} strokeWidth={0.1} />
        </motion.div>
        
        <motion.div 
          style={{ y: useTransform(smoothProgress, [0, 1], [800, -500]), rotate: -10, scale: 0.8 }}
          className="absolute top-[40%] right-[5%] opacity-[0.015] text-black"
        >
          <Stethoscope size={350} strokeWidth={0.2} />
        </motion.div>

        <motion.div 
          style={{ y: useTransform(smoothProgress, [0, 1], [3500, -200]), rotate: 10 }}
          className="absolute top-[50%] left-[20%] opacity-[0.01] text-zinc-900"
        >
          <FlaskConical size={450} strokeWidth={0.1} />
        </motion.div>

        <motion.div 
          style={{ y: useTransform(smoothProgress, [0, 1], [4500, 200]), rotate: -15 }}
          className="absolute top-[65%] right-[20%] opacity-[0.01] text-fitti-forest"
        >
          <ShieldCheck size={350} strokeWidth={0.1} />
        </motion.div>

        <motion.div 
          style={{ y: useTransform(smoothProgress, [0, 1], [5500, 800]), rotate: 30 }}
          className="absolute top-[80%] left-[15%] opacity-[0.01] text-zinc-900"
        >
          <HeartPulse size={400} strokeWidth={0.1} />
        </motion.div>

        <motion.div 
          style={{ x: shape3X }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-fitti-forest/10 to-transparent opacity-15"
        />
      </div>

      <div className="scanline" />

      {/* Navigation - Floating Island Design */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-6 pointer-events-none">
        <motion.div 
          className={`pointer-events-auto flex items-center justify-between px-6 py-3 glass-pill transition-all duration-700 ${scrolled ? "bg-white/80 shadow-lg scale-[0.98]" : "bg-white/40"}`}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
        >
          <button 
             onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
             className="text-xl font-black tracking-tighter text-fitti-forest cursor-pointer"
          >
            Fitti.
          </button>

          <div className="hidden md:flex items-center gap-8 font-sans font-bold text-[10px] uppercase tracking-[0.2em] text-zinc-500">
            <button onClick={() => scrollToSection("system")} className="hover:text-fitti-forest transition-colors cursor-pointer">Execution</button>
            <button onClick={() => scrollToSection("workflow")} className="hover:text-fitti-forest transition-colors cursor-pointer">Workflow</button>
            <button onClick={() => scrollToSection("pricing")} className="hover:text-fitti-forest transition-colors cursor-pointer">Plans</button>
            <button 
              onClick={() => scrollToSection("apply")} 
              className="px-5 py-2 bg-fitti-forest text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-sm"
            >
              Apply
            </button>
          </div>

          <button className="md:hidden p-2 text-zinc-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </motion.div>
      </nav>


      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, y: 0, backdropFilter: "blur(40px)" }}
            exit={{ opacity: 0, y: -20, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[60] bg-black/80 flex flex-col items-center justify-center p-12 md:hidden"
          >
            <div className="flex flex-col gap-8 sm:gap-12 text-center">
              <button onClick={() => scrollToSection("system")} className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-white/20 hover:text-fitti-forest transition-colors">System</button>
              <button onClick={() => scrollToSection("pricing")} className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-white/20 hover:text-fitti-forest transition-colors">Pricing</button>
              <button onClick={() => scrollToSection("outcomes")} className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-white/20 hover:text-fitti-forest transition-colors">Outcomes</button>
              <button onClick={() => scrollToSection("apply")} className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-white/20 hover:text-fitti-forest transition-colors">Apply</button>
              <button onClick={() => setIsMenuOpen(false)} className="mt-12 text-white/40 uppercase tracking-[0.4em] text-xs">Close</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      <main className="flex-1 flex flex-col relative z-10">
        <section id="hero" className="min-h-[100dvh] flex flex-col items-center justify-center text-center px-6 pt-20 sticky top-0 overflow-hidden perspective-2000">
          <motion.div
            style={{ opacity: heroOpacity, scale: heroScale, rotateX }}
            className="flex flex-col items-center"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 100, filter: "blur(20px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.5, ease: [0.32, 0.72, 0, 1] }}
              className="text-[18vw] md:text-[15vw] lg:text-[22rem] font-black tracking-tighter text-fitti-forest leading-[0.75] px-4"
            >
              Fitti.
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1, ease: [0.32, 0.72, 0, 1] }}
              className="flex flex-col items-center gap-12 mt-12"
            >
              <p className="text-xl sm:text-2xl md:text-5xl font-serif italic tracking-tight text-zinc-400">
                Evolve Your Fitness.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-4">
                <button onClick={() => scrollToSection("apply")} className="px-8 sm:px-10 py-4 sm:py-5 bg-fitti-forest text-white rounded-full font-black uppercase tracking-widest text-[10px] sm:text-xs hover:scale-105 active:scale-95 transition-all shadow-xl shadow-fitti-forest/20">Start Your Assessment</button>
                <button onClick={() => scrollToSection("pricing")} className="px-8 sm:px-10 py-4 sm:py-5 border border-black/10 text-zinc-900 rounded-full font-black uppercase tracking-widest text-[10px] sm:text-xs hover:bg-black/5 transition-all">Explore Plans</button>
              </div>
            </motion.div>
          </motion.div>

        </section>

        <section id="system" className="flex flex-col justify-center py-16 md:py-24 px-4 md:px-12 lg:px-24 relative z-20">
          <div className="w-full">
            <div className="max-w-6xl mb-12 space-y-8">
              <div className="inline-block px-3 py-1 rounded-full bg-fitti-forest/10 border border-fitti-forest/20 text-[10px] font-black uppercase tracking-[0.3em] text-fitti-forest mb-6">
                The Protocol
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-[10rem] font-black tracking-tighter leading-[0.9] lg:leading-[0.8] text-zinc-900 uppercase">
                A Complete Fitness <span className="text-fitti-forest">Execution System.</span>
              </h2>
              <p className="text-xl md:text-3xl font-serif italic text-zinc-400 max-w-4xl leading-tight">
                Unlike traditional fitness programs that only give advice, FITTI manages your transformation end-to-end.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {/* Feature 1: Coaching */}
              <motion.div 
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                viewport={{ once: true }}
                className="double-bezel group"
              >
                <div className="double-bezel-inner p-6 sm:p-8 md:p-12 space-y-8 relative overflow-hidden">
                   <div className="crosshair crosshair-tl" />
                   <div className="crosshair crosshair-tr" />
                   <div className="crosshair crosshair-bl" />
                   <div className="crosshair crosshair-br" />
                   
                   <div className="flex justify-between items-start">
                     <div className="w-16 h-16 rounded-2xl bg-fitti-forest/10 flex items-center justify-center border border-fitti-forest/20 group-hover:scale-110 transition-transform duration-500">
                       <UserCircle className="text-fitti-forest" size={32} />
                     </div>
                     <div className="status-tag">
                        <div className="status-dot animate-pulse" />
                        Live Protocol
                     </div>
                   </div>
                   <div className="space-y-6">
                     <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-zinc-900 leading-[0.8]">Personalized<br/>Coaching.</h3>
                     <p className="text-xl md:text-2xl text-zinc-500 font-serif italic leading-relaxed max-w-sm">
                       Structured training programs designed around your goals, schedule, and body condition.
                     </p>
                   </div>
                </div>
              </motion.div>

              {/* Feature 2: Nutrition */}
              <motion.div 
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
                viewport={{ once: true }}
                className="double-bezel group"
              >
                <div className="double-bezel-inner p-8 md:p-12 space-y-8 relative overflow-hidden">
                   <div className="crosshair crosshair-tl" />
                   <div className="crosshair crosshair-tr" />
                   
                   <div className="flex justify-between items-start">
                     <div className="w-16 h-16 rounded-2xl bg-fitti-forest/10 flex items-center justify-center border border-fitti-forest/20 group-hover:scale-110 transition-transform duration-500">
                       <ChefHat className="text-fitti-forest" size={32} />
                     </div>
                     <div className="status-tag">
                        Daily Fresh
                     </div>
                   </div>
                   <div className="space-y-6">
                     <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-zinc-900 leading-[0.8]">Precision<br/>Nutrition.</h3>
                     <p className="text-xl md:text-2xl text-zinc-500 font-serif italic leading-relaxed max-w-sm">
                       Fresh meals prepared daily according to your calorie and macro requirements.
                     </p>
                   </div>
                </div>
              </motion.div>

              {/* Feature 3: Medical */}
              <motion.div 
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.32, 0.72, 0, 1] }}
                viewport={{ once: true }}
                className="double-bezel group"
              >
                <div className="double-bezel-inner p-8 md:p-12 space-y-8 relative overflow-hidden">
                   <div className="crosshair crosshair-bl" />
                   <div className="crosshair crosshair-br" />
                   
                   <div className="flex justify-between items-start">
                     <div className="w-16 h-16 rounded-2xl bg-fitti-forest/10 flex items-center justify-center border border-fitti-forest/20 group-hover:scale-110 transition-transform duration-500">
                       <Stethoscope className="text-fitti-forest" size={32} />
                     </div>
                     <div className="status-tag">
                        Doctor Led
                     </div>
                   </div>
                   <div className="space-y-6">
                     <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-zinc-900 leading-[0.8]">Medical<br/>Oversight.</h3>
                     <p className="text-xl md:text-2xl text-zinc-500 font-serif italic leading-relaxed max-w-sm">
                       Doctor-led monitoring to ensure your transformation remains safe and sustainable.
                     </p>
                   </div>
                </div>
              </motion.div>

              {/* Feature 4: Progress */}
              <motion.div 
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.32, 0.72, 0, 1] }}
                viewport={{ once: true }}
                className="double-bezel group"
              >
                <div className="double-bezel-inner p-8 md:p-12 space-y-8 relative overflow-hidden">
                   <div className="crosshair crosshair-tl" />
                   <div className="crosshair crosshair-br" />
                   
                   <div className="flex justify-between items-start">
                     <div className="w-16 h-16 rounded-2xl bg-fitti-forest/10 flex items-center justify-center border border-fitti-forest/20 group-hover:scale-110 transition-transform duration-500">
                       <Activity className="text-fitti-forest" size={32} />
                     </div>
                     <div className="status-tag">
                        Active Loop
                     </div>
                   </div>
                   <div className="space-y-6">
                     <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-zinc-900 leading-[0.8]">Progress<br/>Tracking.</h3>
                     <p className="text-xl md:text-2xl text-zinc-500 font-serif italic leading-relaxed max-w-sm">
                       Constant adjustments based on measurable performance and body response.
                     </p>
                   </div>
                </div>
              </motion.div>
            </div>

            <div id="workflow" className="max-w-6xl mb-12 space-y-12 mt-64">
              <div className="inline-block px-4 py-2 rounded-full bg-zinc-100 border border-black/5 text-[12px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-6">
                The Missing Layer
              </div>
              <h2 className="text-[10vw] md:text-[12rem] font-black tracking-tighter leading-[0.75] text-zinc-900 uppercase">
                Fitness Is Hard <br/><span className="text-fitti-forest italic">To Sustain Alone.</span>
              </h2>
              <p className="text-lg md:text-2xl text-zinc-400 font-serif italic max-w-4xl leading-tight">
                Most people fail not because they lack motivation. They fail because fitness demands too much execution.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center mb-32">
              <div className="space-y-12">
                <p className="text-xl font-serif italic text-zinc-500">You are expected to manage everything while balancing work, stress, and life:</p>
                <div className="space-y-4">
                  {["Plan workouts", "Cook healthy meals", "Count calories", "Stay disciplined", "Track progress"].map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                      className="group flex items-center gap-6 py-5 border-b border-black/5 hover:border-fitti-forest/20 transition-colors"
                    >
                      <span className="font-mono text-xs font-medium text-fitti-forest/40 group-hover:text-fitti-forest transition-colors">
                        [ 0{i+1} ]
                      </span>
                      <span className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-zinc-300 group-hover:text-zinc-900 transition-colors">
                        {item}
                      </span>
                      <div className="ml-auto w-12 h-px bg-black/5 group-hover:w-24 group-hover:bg-fitti-forest/20 transition-all duration-700" />
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="double-bezel relative overflow-hidden h-full">
                <div className="double-bezel-inner bg-zinc-900 p-12 md:p-20 text-white space-y-12 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-12 opacity-5">
                     <Activity size={400} />
                  </div>
                  <h3 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none">We Built <br/><span className="text-fitti-forest">Execution.</span></h3>
                  <p className="text-xl md:text-4xl font-serif italic text-zinc-400 leading-relaxed relative z-10">
                    Instead of simply giving you a workout plan or diet chart, we execute the process for you. You train. We manage the system.
                  </p>
                  <div className="pt-8 flex gap-12">
                    <div className="flex flex-col">
                      <span className="text-4xl font-black uppercase tracking-tighter">Train.</span>
                    </div>
                    <div className="h-16 w-px bg-white/10" />
                    <div className="flex flex-col">
                      <span className="text-4xl font-black uppercase tracking-tighter">Execute.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-6xl mb-12 space-y-8 mt-48">
              <div className="inline-block px-3 py-1 rounded-full bg-fitti-forest/10 border border-fitti-forest/20 text-[10px] font-black uppercase tracking-[0.3em] text-fitti-forest mb-6">
                Execution Flow
              </div>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.8] text-zinc-900 uppercase">
                How FITTI <span className="text-fitti-forest italic">Works.</span>
              </h2>
            </div>

            <div className="space-y-0 w-full relative">
               <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-100 hidden md:block" />
               {[
                { 
                  id: "01", 
                  title: "Assessment & Consultation.", 
                  desc: "Meet your trainer and doctor. We analyze your fitness goals, body condition, health profile, schedule, and lifestyle." 
                },
                { 
                  id: "02", 
                  title: "Personalized Blueprint.", 
                  desc: "A structured plan is created including calorie targets, meal structure, workout roadmap, and specific transformation goals." 
                },
                { 
                  id: "03", 
                  title: "Daily Nutrition Execution.", 
                  desc: "Fresh meals are prepared and delivered daily according to your personalized requirement. No calorie counting. No meal preparation. No guesswork." 
                },
                { 
                  id: "04", 
                  title: "Coaching & Accountability.", 
                  desc: "Your trainer keeps you consistent through structured sessions, monitoring, and weekly adjustments to your protocol." 
                },
                { 
                  id: "05", 
                  title: "Track. Optimize. Transform.", 
                  desc: "Every week we monitor progress, performance, recovery, and body changes. Then we optimize your plan accordingly for continuous evolution." 
                }
               ].map((p, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, x: -50 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   transition={{ duration: 1.2, delay: i * 0.1, ease: [0.32, 0.72, 0, 1] }}
                   viewport={{ once: true, margin: "-100px" }}
                   className="flex flex-col md:flex-row gap-16 items-start group relative border-l-4 border-transparent hover:border-fitti-forest/40 pl-16 py-32 transition-colors first:pt-0 last:pb-0"
                 >
                   <div className="absolute left-[-4px] top-0 bottom-0 w-1 bg-fitti-forest scale-y-0 group-hover:scale-y-100 transition-transform duration-1000 origin-top" />
                   <span className="font-mono text-[15rem] font-black opacity-[0.02] group-hover:opacity-[0.08] group-hover:text-fitti-forest transition-all duration-1000 select-none text-zinc-900 absolute -left-8 top-1/2 -translate-y-1/2">{p.id}</span>
                   <div className="space-y-8 relative z-10 w-full">
                     <div className="flex items-center gap-6">
                        <span className="font-mono text-xs font-bold text-fitti-forest uppercase tracking-[0.6em] bg-fitti-forest/5 px-4 py-1 rounded-full border border-fitti-forest/10">STAGE {p.id}</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-fitti-forest/30 to-transparent" />
                     </div>
                     <h5 className="text-6xl md:text-[8rem] font-black tracking-tighter group-hover:translate-x-4 transition-transform duration-1000 text-zinc-900 uppercase leading-[0.8]">{p.title}</h5>
                     <p className="text-2xl md:text-5xl text-zinc-400 max-w-6xl font-serif italic leading-[1.1] tracking-tight">{p.desc}</p>
                   </div>
                 </motion.div>
               ))}
            </div>
          </div>
        </section>

        <section id="why" className="py-32 px-6 md:px-12 lg:px-24 bg-zinc-50/50 relative overflow-hidden">
          <div className="absolute inset-0 grid-overlay opacity-[0.02]" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="mb-32">
              <div className="inline-block px-4 py-2 rounded-full bg-fitti-forest/10 border border-fitti-forest/20 text-[12px] font-black uppercase tracking-[0.4em] text-fitti-forest mb-8 shadow-sm">
                The Advantage
              </div>
              <h2 className="text-[12vw] md:text-[14rem] font-black tracking-tighter uppercase leading-[0.75] text-zinc-900 mb-8">
                Why <span className="text-fitti-forest italic">FITTI.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                { title: "Built For Busy Lives", desc: "Designed exclusively for professionals and people who struggle with time. We manage the complexity so you don't have to." },
                { title: "Real Accountability", desc: "Consistency is monitored by experts, not left to fleeting motivation. We ensure you stay on the path every single day." },
                { title: "Personalized Execution", desc: "Everything is tailored around your unique body and lifestyle. This isn't a template; it's a dedicated system built for you." },
                { title: "Science-Led", desc: "Our approach combines expert trainers, clinical oversight, and precision nutrition into one cohesive results machine." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 40 }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="double-bezel group"
                >
                  <div className="double-bezel-inner p-12 md:p-20 space-y-8 relative overflow-hidden">
                    <div className="crosshair crosshair-tl" />
                    <div className="crosshair crosshair-br" />
                    <span className="font-mono text-8xl font-black opacity-[0.02] absolute -right-4 -bottom-4 group-hover:opacity-10 transition-opacity">0{i+1}</span>
                    <h4 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-zinc-900 leading-none group-hover:text-fitti-forest transition-colors">{item.title}</h4>
                    <p className="text-xl md:text-3xl text-zinc-400 font-serif italic leading-tight">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="outcomes" className="flex flex-col justify-center py-24 px-6 md:px-12 lg:px-24">
          <div className="w-full text-center perspective-2000">
            <h2 className="text-[15vw] md:text-[10rem] font-black tracking-tighter leading-[0.8] text-zinc-900 mb-16 uppercase">
              Built for <br/>
              <span className="text-fitti-forest">Busy Lives.</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-24">
               {[
                 { 
                   label: "Professionals", 
                   title: "Busy Professionals", 
                   icon: <Timer className="text-fitti-forest" size={20} />,
                   desc: "No time to manage fitness properly." 
                 },
                 { 
                   label: "Fat Loss", 
                   title: "Weight Loss & Fat Reduction", 
                   icon: <HeartPulse className="text-fitti-forest" size={20} />,
                   desc: "Structured support for sustainable transformation." 
                 },
                 { 
                   label: "Performance", 
                   title: "Muscle Gain & Performance", 
                   icon: <Zap className="text-fitti-forest" size={20} />,
                   desc: "Nutrition and training aligned for measurable growth." 
                 },
                 { 
                   label: "Health", 
                   title: "Lifestyle & Health Optimization", 
                   icon: <Activity className="text-fitti-forest" size={20} />,
                   desc: "Build sustainable habits with guided support." 
                 }
               ].map((item, i) => (
                 <motion.div 
                   key={i}
                   whileInView={{ opacity: 1, y: 0 }}
                   initial={{ opacity: 0, y: 20 }}
                   transition={{ duration: 0.8, delay: i * 0.1 }}
                   viewport={{ once: true }}
                   className="double-bezel"
                 >
                   <div className="double-bezel-inner p-8 text-left space-y-6 h-full flex flex-col justify-between group">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                           <div className="p-3 bg-fitti-forest/5 rounded-xl border border-fitti-forest/10">
                              {item.icon}
                           </div>
                           <span className="font-mono text-[9px] text-zinc-300 uppercase tracking-[0.4em]">{item.label}</span>
                        </div>
                        <h4 className="text-2xl font-black tracking-tighter text-zinc-900 uppercase group-hover:text-fitti-forest transition-colors">{item.title}</h4>
                        <p className="text-sm text-zinc-400 font-serif italic leading-relaxed">{item.desc}</p>
                      </div>
                   </div>
                 </motion.div>
               ))}
            </div>
          </div>
        </section>

        <section id="proof" className="py-24 px-6 md:px-12 lg:px-24 bg-white overflow-hidden">
          <div className="max-w-6xl mx-auto">
             <div className="flex flex-col md:flex-row items-end justify-between gap-12 mb-24">
                <div className="space-y-6">
                  <div className="inline-block px-3 py-1 rounded-full bg-zinc-100 border border-black/5 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Social Proof</div>
                  <h2 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8] text-zinc-900">Real <br/><span className="text-fitti-forest">Consistency.</span></h2>
                </div>
                <p className="text-3xl font-serif italic text-zinc-300">Real Transformations. Real Results.</p>
             </div>
             
             <div className="p-20 border border-dashed border-zinc-200 rounded-[4rem] text-center">
                <p className="text-xl font-serif italic text-zinc-400">Coming Soon: Client stories, progress metrics, before-after transformations.</p>
             </div>
          </div>
        </section>

        <section id="pricing" className="flex flex-col justify-center py-16 md:py-24 px-6 md:px-12 lg:px-24 relative z-20">
          <div className="w-full">
            <div className="max-w-6xl mb-12 space-y-8">
              <div className="inline-block px-3 py-1 rounded-full bg-fitti-forest/10 border border-fitti-forest/20 text-[10px] font-black uppercase tracking-[0.3em] text-fitti-forest mb-6">
                Investment
              </div>
              <h2 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.8] text-zinc-900 uppercase">
                Choose Your <br/><span className="text-fitti-forest italic">Transformation</span> Plan.
              </h2>
              <p className="text-2xl md:text-3xl text-zinc-400 font-serif italic max-w-4xl leading-tight">
                Built around different levels of support — with one commitment: <span className="text-zinc-900">Real Results.</span>
              </p>
            </div>

            {/* 6-Day Trial - The Hook */}
            <div className="mb-24">
              <div className="flex items-center gap-6 mb-16">
                <h3 className="text-4xl font-black tracking-tighter text-zinc-900 uppercase">01. The 6-Day Trial</h3>
                <div className="h-px flex-1 bg-black/5" />
                <span className="font-mono text-[10px] text-zinc-300 uppercase tracking-widest">[ Low Barrier Entry ]</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { name: "Lean", price: "5,099", icon: <Activity size={24} /> },
                  { name: "Optimize", price: "5,499", icon: <Zap size={24} /> },
                  { name: "Bulk", price: "5,999", icon: <Dumbbell size={24} /> }
                ].map((plan, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -10 }}
                    className="double-bezel group cursor-pointer"
                  >
                    <div className="double-bezel-inner p-10 space-y-8 relative overflow-hidden">
                      <div className="crosshair crosshair-tl" />
                      <div className="crosshair crosshair-br" />
                      <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                        {plan.icon}
                      </div>
                      <div className="space-y-2">
                        <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">Protocol</span>
                        <h4 className="text-3xl font-black tracking-tighter text-zinc-900 uppercase">{plan.name}</h4>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm font-black text-zinc-400">₹</span>
                        <span className="text-6xl font-black tracking-tighter text-fitti-forest">{plan.price}</span>
                      </div>
                      <div className="pt-6 border-t border-black/5 space-y-4">
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-relaxed">
                          Included: 3 Meals, 3 Deliveries, Online Doctor Consultation, and Packing.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Core Memberships - The Main Plans */}
            <div>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16">
                <div className="space-y-4">
                  <h3 className="text-2xl sm:text-4xl font-black tracking-tighter text-zinc-900 uppercase">02. Core Memberships</h3>
                  <p className="font-serif italic text-lg sm:text-xl text-zinc-400">Monthly architectural scaling for sustained results.</p>
                </div>
                
                <div className="flex p-1 bg-zinc-100 rounded-full">
                  {["Fat Loss", "Optimize", "Bulk"].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setMembershipTab(tab)}
                      className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${membershipTab === tab ? "bg-white text-fitti-forest shadow-sm" : "text-zinc-400 hover:text-zinc-600"}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div 
                  key={membershipTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                  {(
                    membershipTab === "Fat Loss" ? [
                      { name: "Lite", price: "13,999", desc: "Essential execution for fat reduction." },
                      { name: "Plus", price: "21,999", desc: "Advanced body recomposition protocol." },
                      { name: "Elite", price: "27,999", desc: "Maximum biological optimization." }
                    ] : membershipTab === "Optimize" ? [
                      { name: "Lite", price: "14,999", desc: "Steady-state vitality and energy optimization." },
                      { name: "Plus", price: "23,999", desc: "Peak performance homeostasis protocol." },
                      { name: "Elite", price: "28,999", desc: "Full spectrum metabolic and lifestyle balance." }
                    ] : [
                      { name: "Lite", price: "15,999", desc: "Structured mass accumulation." },
                      { name: "Plus", price: "25,999", desc: "Hypertrophy specialized directive." },
                      { name: "Elite", price: "29,999", desc: "Total structural reconstruction." }
                    ]
                  ).map((plan, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      className={`double-bezel group ${plan.name === "Plus" ? "border-fitti-forest/20 shadow-2xl shadow-fitti-forest/5" : ""}`}
                    >
                      <div className="double-bezel-inner p-12 space-y-10 relative overflow-hidden">
                        {plan.name === "Plus" && (
                          <div className="absolute top-0 left-0 w-full h-1 bg-fitti-forest" />
                        )}
                        <div className="space-y-4">
                          <div className="flex justify-between items-start">
                            <h4 className="text-4xl font-black tracking-tighter text-zinc-900 uppercase">{plan.name}</h4>
                            {plan.name === "Plus" && (
                              <span className="px-3 py-1 bg-fitti-forest text-white text-[8px] font-black uppercase tracking-widest rounded-full">Recommended</span>
                            )}
                          </div>
                          <p className="text-lg text-zinc-500 font-serif italic">{plan.desc}</p>
                        </div>

                        <div className="flex items-baseline gap-1">
                          <span className="text-lg font-black text-zinc-400">₹</span>
                          <span className="text-7xl font-black tracking-tighter text-zinc-900 group-hover:text-fitti-forest transition-colors">{plan.price}</span>
                          <span className="text-sm font-mono text-zinc-300 ml-2">/ MO</span>
                        </div>

                        <ul className="space-y-4 pt-8 border-t border-black/5">
                          {[
                            "Precision Macro Tracking",
                            "Daily Performance Meals",
                            "Specialist Access",
                            "Biometric Analysis"
                          ].map((item, idx) => (
                            <li key={idx} className="flex items-center gap-3 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                              <Check size={12} className="text-fitti-forest" /> {item}
                            </li>
                          ))}
                        </ul>

                        <button className={`w-full py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${plan.name === "Plus" ? "bg-fitti-forest text-white shadow-lg shadow-fitti-forest/20" : "bg-zinc-900 text-white hover:bg-black"}`}>
                          Deploy Plan
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        <section id="apply" className="flex flex-col justify-center py-16 md:py-24 px-6 md:px-12 lg:px-24">
          <div className="w-full">
            <div className="max-w-6xl mb-12 space-y-8 relative z-10">
              <div className="inline-block px-3 py-1 rounded-full bg-fitti-forest/10 border border-fitti-forest/20 text-[10px] font-black uppercase tracking-[0.3em] text-fitti-forest mb-6">
                Onboarding
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-[10rem] font-black tracking-tighter leading-[0.9] lg:leading-[0.8] text-zinc-900 uppercase">
                Stop Planning. <br/><span className="text-fitti-forest italic">Start Executing.</span>
              </h2>
              <p className="text-2xl md:text-3xl text-zinc-400 font-serif italic max-w-4xl leading-tight">
                The hardest part of fitness isn’t knowing what to do. It’s doing it consistently. <span className="text-zinc-900">FITTI makes consistency effortless.</span>
              </p>
            </div>

            <div className="absolute top-0 right-0 w-[60rem] h-[60rem] bg-fitti-forest/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none -z-10" />
            <div className="absolute bottom-0 left-0 w-[50rem] h-[50rem] bg-fitti-forest/20 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none -z-10" />

            <div className="max-w-6xl mx-auto perspective-2000">
               <div className="double-bezel">
                <div className="double-bezel-inner p-6 sm:p-10 md:p-20 relative overflow-hidden bg-white">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-fitti-forest/[0.03] to-transparent pointer-events-none" />
                  
                  {isSubmitted ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-20 space-y-10"
                    >
                      <div className="w-16 h-16 sm:w-24 sm:h-24 bg-fitti-forest text-white rounded-full flex items-center justify-center mx-auto mb-10 shadow-[0_0_50px_rgba(118,185,0,0.2)]">
                        <Check size={32} strokeWidth={3} className="sm:hidden" />
                        <Check size={48} strokeWidth={3} className="hidden sm:block" />
                      </div>
                      <h3 className="text-3xl sm:text-6xl font-black tracking-tighter text-zinc-900">SUCCESSFULLY LOGGED.</h3>
                      <p className="text-xl text-zinc-500 font-serif italic max-w-sm mx-auto">Our team will reach out within 24 hours to begin your transformation.</p>
                      <button 
                        onClick={() => setIsSubmitted(false)}
                        className="mt-12 px-10 py-5 bg-zinc-900 text-white rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-transform"
                      >
                        Reset Form
                      </button>
                    </motion.div>
                  ) : (
                    <div className="space-y-12">
                      <div className="flex justify-between items-center border-b border-black/5 pb-10">
                        <div className="flex flex-col">
                          <span className="font-mono text-[10px] text-zinc-300 uppercase tracking-[0.5em]">Phase</span>
                          <span className="text-5xl font-black tracking-tighter text-fitti-forest">0{formStep}</span>
                        </div>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map(s => (
                            <div key={s} className={`w-12 h-1 rounded-full transition-all duration-700 ${s <= formStep ? "bg-fitti-forest shadow-[0_0_10px_rgba(118,185,0,0.2)]" : "bg-zinc-100"}`} />
                          ))}
                        </div>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-12">
                        <AnimatePresence mode="wait">
                          {formStep === 1 && (
                            <motion.div 
                              key="step1"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              className="space-y-10"
                            >
                              <div className="space-y-6">
                                <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Identified As</label>
                                <input 
                                  required={formStep === 1}
                                  type="text" 
                                  name="fullName"
                                  placeholder="SURNAME, GIVEN NAME"
                                  value={formData.fullName}
                                  onChange={handleInputChange}
                                  className="w-full bg-transparent border-b border-black/10 focus:border-fitti-forest outline-none text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter transition-all py-6 placeholder:text-zinc-100 text-zinc-900"
                                />
                              </div>
                              <div className="space-y-6">
                                <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Direct Communication Node</label>
                                <input 
                                  required={formStep === 1}
                                  type="tel" 
                                  name="phone"
                                  placeholder="+91 // 00000 00000"
                                  value={formData.phone}
                                  onChange={handleInputChange}
                                  className="w-full bg-transparent border-b border-black/10 focus:border-fitti-forest outline-none text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter transition-all py-6 placeholder:text-zinc-100 text-zinc-900"
                                />
                              </div>
                            </motion.div>
                          )}

                          {formStep === 2 && (
                            <motion.div 
                              key="step2"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              className="grid grid-cols-1 md:grid-cols-2 gap-16"
                            >
                              <div className="space-y-6">
                                <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Age</label>
                                <input name="age" type="number" onChange={handleInputChange} className="w-full bg-transparent border-b border-black/10 focus:border-fitti-forest outline-none text-5xl font-black p-6 transition-all text-zinc-900" />
                              </div>
                              <div className="space-y-6">
                                <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Height (CM)</label>
                                <input name="height" type="number" onChange={handleInputChange} className="w-full bg-transparent border-b border-black/10 focus:border-fitti-forest outline-none text-5xl font-black p-6 transition-all text-zinc-900" />
                              </div>
                              <div className="space-y-6">
                                <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Weight (KG)</label>
                                <input name="weight" type="number" onChange={handleInputChange} className="w-full bg-transparent border-b border-black/10 focus:border-fitti-forest outline-none text-5xl font-black p-6 transition-all text-zinc-900" />
                              </div>
                              <div className="space-y-6">
                                <CustomSelect 
                                  name="goal"
                                  label="Objective"
                                  value={formData.goal}
                                  options={["Weight Loss", "Muscle Gain", "Lifestyle Optimization"]}
                                  onChange={(name, val) => setFormData(p => ({ ...p, [name]: val }))}
                                />
                              </div>
                            </motion.div>
                          )}

                          {formStep === 3 && (
                            <motion.div 
                              key="step3"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              className="space-y-16"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                                <div className="space-y-6">
                                  <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Dietary Protocol</label>
                                  <div className="flex gap-4">
                                    {["Veg", "Non-veg"].map(o => (
                                      <button 
                                        type="button"
                                        key={o}
                                        onClick={() => setFormData(p => ({ ...p, foodPreference: o }))}
                                        className={`flex-1 py-5 border rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${formData.foodPreference === o ? "bg-fitti-forest text-white border-fitti-forest" : "border-black/10 text-zinc-400 hover:border-black/20"}`}
                                      >
                                        {o}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                                <div className="space-y-6">
                                  <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Medical History</label>
                                  <div className="flex gap-4">
                                    {["Yes", "No"].map(o => (
                                      <button 
                                        type="button"
                                        key={o}
                                        onClick={() => setFormData(p => ({ ...p, hasMedicalCondition: o }))}
                                        className={`flex-1 py-5 border rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${formData.hasMedicalCondition === o ? "bg-fitti-forest text-white border-fitti-forest" : "border-black/10 text-zinc-400 hover:border-black/20"}`}
                                      >
                                        {o}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-8">
                                <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Allergic Conditions</label>
                                <input 
                                  name="allergies" 
                                  placeholder="LIST ANY FOOD OR ENVIRONMENTAL ALLERGIES" 
                                  onChange={handleInputChange} 
                                  className="w-full bg-transparent border-b border-black/10 focus:border-fitti-forest outline-none text-xl font-medium py-4 transition-all text-zinc-900" 
                                />
                              </div>
                              {formData.hasMedicalCondition === "Yes" && (
                                <textarea 
                                  name="medicalDescription"
                                  placeholder="BRIEF CLINICAL OVERVIEW"
                                  onChange={handleInputChange}
                                  className="w-full bg-transparent border border-black/10 focus:border-fitti-forest outline-none text-xl font-medium p-8 rounded-3xl min-h-[150px] transition-all text-zinc-900"
                                />
                              )}
                            </motion.div>
                          )}

                          {formStep === 4 && (
                            <motion.div 
                              key="step4"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              className="space-y-16"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                                <div className="space-y-6">
                                  <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Gym Access / Subscription</label>
                                  <div className="flex gap-4">
                                    {["Yes", "No"].map(o => (
                                      <button 
                                        type="button"
                                        key={o}
                                        onClick={() => setFormData(p => ({ ...p, gymAccess: o }))}
                                        className={`flex-1 py-5 border rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${formData.gymAccess === o ? "bg-fitti-forest text-white border-fitti-forest" : "border-black/10 text-zinc-400 hover:border-black/20"}`}
                                      >
                                        {o}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                                <div className="space-y-6">
                                  <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Are you a Sports Person?</label>
                                  <div className="flex gap-4">
                                    {["Yes", "No"].map(o => (
                                      <button 
                                        type="button"
                                        key={o}
                                        onClick={() => setFormData(p => ({ ...p, isSportsPerson: o }))}
                                        className={`flex-1 py-5 border rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${formData.isSportsPerson === o ? "bg-fitti-forest text-white border-fitti-forest" : "border-black/10 text-zinc-400 hover:border-black/20"}`}
                                      >
                                        {o}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-6">
                                <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Workout Experience</label>
                                <div className="flex flex-wrap gap-4">
                                  {["Beginner", "Intermediate", "Advanced"].map(o => (
                                    <button 
                                      type="button"
                                      key={o}
                                      onClick={() => setFormData(p => ({ ...p, workoutExperience: o }))}
                                      className={`flex-1 min-w-[140px] py-5 border rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${formData.workoutExperience === o ? "bg-fitti-forest text-white border-fitti-forest" : "border-black/10 text-zinc-400 hover:border-black/20"}`}
                                    >
                                      {o}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                          {formStep === 5 && (
                            <motion.div 
                              key="step5"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              className="space-y-16"
                            >
                              <div className="space-y-8">
                                <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Logistics (Area / Pincode)</label>
                                <input required={formStep === 5} name="location" onChange={handleInputChange} className="w-full bg-transparent border-b border-black/10 focus:border-fitti-forest outline-none text-2xl md:text-6xl font-black py-6 uppercase transition-all text-zinc-900" />
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                                <CustomSelect 
                                  name="planInterest"
                                  label="Intervention Level"
                                  value={formData.planInterest}
                                  options={["Weekly Trial", "Monthly Plan"]}
                                  onChange={(name, val) => setFormData(p => ({ ...p, [name]: val }))}
                                />
                                <div className="space-y-6">
                                  <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Consultation Required</label>
                                  <div className="flex gap-4">
                                    {["Yes", "No"].map(o => (
                                      <button 
                                        type="button"
                                        key={o}
                                        onClick={() => setFormData(p => ({ ...p, requestConsultation: o }))}
                                        className={`flex-1 py-5 border rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${formData.requestConsultation === o ? "bg-fitti-forest text-white border-fitti-forest" : "border-black/10 text-zinc-400 hover:border-black/20"}`}
                                      >
                                        {o}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div className="flex justify-between items-center pt-16 border-t border-black/5">
                          {formStep > 1 ? (
                            <button 
                              type="button"
                              onClick={prevStep}
                              className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 hover:text-zinc-900 transition-colors"
                            >
                              <ChevronLeft size={14} /> Previous
                            </button>
                          ) : <div />}

                          {formStep < 5 ? (
                            <button 
                              type="submit"
                              className="flex items-center gap-4 bg-fitti-forest text-white px-12 py-6 rounded-full font-black uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_rgba(118,185,0,0.2)]"
                            >
                              Next Phase <ChevronRight size={14} />
                            </button>
                          ) : (
                            <button 
                              disabled={isSubmitting}
                              type="submit"
                              className="flex items-center gap-4 bg-fitti-forest text-white px-12 py-6 rounded-full font-black uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 transition-all disabled:opacity-50 shadow-[0_10px_30px_rgba(118,185,0,0.2)]"
                            >
                              {isSubmitting ? (
                                <>Processing <Loader2 size={14} className="animate-spin" /></>
                              ) : (
                                <>Submit Application <Check size={14} /> </>
                              )}
                            </button>
                          )}
                        </div>
                      </form>
                    </div>
                  )}
                </div>
               </div>
            </div>

            <div className="text-center space-y-12 mt-64">
               <motion.div 
                 initial={{ opacity: 0 }}
                 whileInView={{ opacity: 1 }}
                 className="text-3xl sm:text-5xl md:text-7xl font-black italic tracking-tighter text-zinc-200"
               >
                 "Performance. Privacy. Perfection."
               </motion.div>
               <div className="font-mono text-[9px] uppercase tracking-[0.8em] text-zinc-300">[ End Operational Blueprint ]</div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-50 w-full border-t border-black/5 bg-white overflow-hidden">
        {/* Large subtle watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03] z-0">
          <span className="text-[20vw] font-black tracking-tighter text-zinc-900 leading-none">FITTI.</span>
        </div>

        <div className="relative z-10 p-6 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex gap-4">
            <div className="w-6 h-6 bg-fitti-forest/20 rounded-sm border border-fitti-forest/40" />
            <div className="w-6 h-6 bg-black/5 rounded-sm border border-black/10" />
            <div className="w-6 h-6 bg-black/10 rounded-sm border border-black/20" />
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="flex items-center gap-6">
              <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
                 <span className="hover:text-fitti-forest cursor-pointer transition-colors">Twitter</span>
                 <a href="https://www.instagram.com/fitti_._?utm_source=qr&igsh=MXhmd2R6bnl6a2Y4Zg%3D%3D" target="_blank" rel="noopener noreferrer" className="hover:text-fitti-forest cursor-pointer transition-colors">Instagram</a>
                 <span className="hover:text-fitti-forest cursor-pointer transition-colors">Privacy</span>
              </div>
              <Star className="w-4 h-4 text-fitti-forest/40" />
            </div>
            <div className="flex flex-col items-center md:items-end">
              <span className="font-mono text-[9px] font-black uppercase tracking-[0.4em] text-zinc-900">We Don’t Just Plan Fitness. We Execute It.</span>
              <span className="font-mono text-[9px] opacity-20 uppercase tracking-[0.4em] mt-2">
                © 2026 Fitti Operations // All Rights Reserved
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
