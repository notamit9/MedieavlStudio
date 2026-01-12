import gsap from "gsap";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle";
import { FaLinkedin, FaGithub, FaCode, FaGamepad, FaPalette } from "react-icons/fa";
import { SiUnity, SiUnrealengine, SiCsharp, SiPython } from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: "Ankit Sharma",
    role: "Core Developer & Engine Specialist",
    image: "/img/team-1.webp",
    skills: ["C#", "C", "Unity", "Unreal Engine"],
    icon: <FaCode className="text-2xl" />,
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Amit Kumar",
    role: "Technical Lead & Visual Developer",
    image: "/img/team-2.webp",
    skills: ["C#", "Python", "Unity", "Unreal Engine"],
    icon: <FaPalette className="text-2xl" />,
    color: "from-violet-500 to-purple-500",
  },
  {
    name: "India Pal",
    role: "Game Designer & Systems Developer",
    image: "/img/team-3.webp",
    skills: ["C#", "Python", "Unity", "Game Design"],
    icon: <FaGamepad className="text-2xl" />,
    color: "from-pink-500 to-rose-500",
  },
];

const TeamCard = ({ member, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="team-card relative group cursor-pointer"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${member.color} p-[2px]`}>
        <div className="relative bg-black/90 rounded-2xl p-6 h-full backdrop-blur-sm">
          {/* Glow effect */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl`}
          />

          {/* Icon */}
          <div className={`relative w-16 h-16 rounded-xl bg-gradient-to-br ${member.color} flex items-center justify-center mb-4 text-white shadow-lg`}>
            {member.icon}
          </div>

          {/* Content */}
          <div className="relative z-10">
            <h3 className="font-zentry font-bold text-2xl text-white mb-1">
              {member.name}
            </h3>
            <p className="text-white/60 text-sm font-general mb-4">
              {member.role}
            </p>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mb-4">
              {member.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs font-general uppercase tracking-wider bg-white/10 text-white/80 rounded-full border border-white/10 hover:bg-white/20 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Hover line */}
            <div
              className={`h-1 bg-gradient-to-r ${member.color} rounded-full transition-all duration-500 ${
                isHovered ? "w-full" : "w-0"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FloatingImage = () => {
  const frameRef = useRef(null);
  const teamSectionRef = useRef(null);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((yPos - centerY) / centerY) * -10;
    const rotateY = ((xPos - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };

  const handleMouseLeave = () => {
    const element = frameRef.current;

    if (element) {
      gsap.to(element, {
        duration: 0.3,
        rotateX: 0,
        rotateY: 0,
        ease: "power1.inOut",
      });
    }
  };

  // Animate team cards on scroll
  useGSAP(() => {
    gsap.fromTo(
      ".team-card",
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: teamSectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  return (
    <div id="story" className="min-h-dvh w-screen bg-black text-blue-50">
      <div className="flex size-full flex-col items-center py-10 pb-24">
        <p className="font-general text-sm uppercase md:text-[10px] text-violet-400 tracking-widest">
          Our Journey
        </p>

        <div className="relative size-full">
          <AnimatedTitle
            title="the st<b>o</b>ry of <br /> Medieval studio<b></b>"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />

          <div className="story-img-container">
            <div className="story-img-mask">
              <div className="story-img-content">
                <img
                  ref={frameRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseLeave}
                  onMouseEnter={handleMouseLeave}
                  src="/img/entrance.webp"
                  alt="Medieval Studio"
                  className="object-contain"
                />
              </div>
            </div>

            <svg
              className="invisible absolute size-0"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="flt_tag">
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="8"
                    result="blur"
                  />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                    result="flt_tag"
                  />
                  <feComposite
                    in="SourceGraphic"
                    in2="flt_tag"
                    operator="atop"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>

        {/* About Text */}
        <div className="-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end mb-20">
          <div className="flex h-full w-fit flex-col items-center md:items-start max-w-md">
            <p className="mt-3 text-center font-circular-web text-violet-50/80 md:text-start leading-relaxed">
              <strong className="text-white">We are Medieval Studio</strong>, a passionate indie game development team formed by three friends who came together during our college days with one mission:{" "}
              <em className="text-violet-300">to create valuable and unforgettable gaming experiences.</em>
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div ref={teamSectionRef} className="w-full max-w-6xl mx-auto px-6 mt-10">
          <div className="text-center mb-12">
            <p className="font-general text-sm uppercase tracking-widest text-violet-400 mb-2">The Creators</p>
            <h2 className="font-zentry font-bold text-4xl md:text-5xl text-white">Meet Our Team</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <TeamCard key={index} member={member} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingImage;
