import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaInstagram, FaGooglePlay, FaGamepad } from "react-icons/fa";
import Button from "./Button";

const navItems = [
  { name: "Instagram", url: "https://www.instagram.com/medieval_studio", icon: <FaInstagram /> },
  { name: "PlayStore", url: "https://play.google.com/store/apps/dev?id=9041958043014239534&hl=en", icon: <FaGooglePlay /> },
  { name: "itch.io", url: "https://not-amit.itch.io/", icon: <FaGamepad /> },
  { name: "About", url: "#about", icon: null },
  { name: "Contact", url: "#contact", icon: null },
];

const NavBar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  // Animate mobile menu
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMobileMenuOpen) {
        gsap.to(mobileMenuRef.current, {
          x: 0,
          duration: 0.4,
          ease: "power3.out",
        });
        // Animate menu items
        gsap.fromTo(
          ".mobile-nav-item",
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.3, stagger: 0.1, delay: 0.2 }
        );
      } else {
        gsap.to(mobileMenuRef.current, {
          x: "100%",
          duration: 0.3,
          ease: "power3.in",
        });
      }
    }
  }, [isMobileMenuOpen]);

  // Close mobile menu on scroll
  useEffect(() => {
    if (isMobileMenuOpen && currentScrollY > 100) {
      closeMobileMenu();
    }
  }, [currentScrollY, isMobileMenuOpen]);

  return (
    <>
      <div
        ref={navContainerRef}
        className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
      >
        <header className="absolute top-1/2 w-full -translate-y-1/2">
          <nav className="flex size-full items-center justify-between p-4">
            <div className="flex items-center gap-7">
              <a href="#" className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-violet-500 flex items-center justify-center">
                  <span className="text-white font-zentry font-bold text-lg">M</span>
                </div>
                <span className="hidden sm:block font-zentry text-white font-bold text-xl">Medieval</span>
              </a>

              <Button
                id="product-button"
                title="WELCOME"
                rightIcon={<TiLocationArrow />}
                containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
              />
            </div>

            <div className="flex h-full items-center">
              {/* Desktop Navigation */}
              <div className="hidden md:block">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.url}
                    target={item.url.startsWith("http") ? "_blank" : "_self"}
                    rel={item.url.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="nav-hover-btn"
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              {/* Audio Button */}
              <button
                onClick={toggleAudioIndicator}
                className="ml-10 flex items-center space-x-0.5"
              >
                <audio
                  ref={audioElementRef}
                  className="hidden"
                  src="/audio/loop.mp3"
                  loop
                />
                {[1, 2, 3, 4].map((bar) => (
                  <div
                    key={bar}
                    className={clsx("indicator-line", {
                      active: isIndicatorActive,
                    })}
                    style={{
                      animationDelay: `${bar * 0.1}s`,
                    }}
                  />
                ))}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="ml-4 md:hidden text-white text-2xl p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <HiX /> : <HiMenuAlt3 />}
              </button>
            </div>
          </nav>
        </header>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={clsx(
          "fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={closeMobileMenu}
      />

      {/* Mobile Menu Panel */}
      <div
        ref={mobileMenuRef}
        className="fixed top-0 right-0 h-full w-72 bg-gradient-to-b from-violet-900 to-black z-50 md:hidden transform translate-x-full"
        style={{ transform: "translateX(100%)" }}
      >
        <div className="flex flex-col h-full p-6">
          {/* Close Button */}
          <button
            onClick={closeMobileMenu}
            className="self-end text-white text-2xl p-2 hover:bg-white/10 rounded-lg transition-colors mb-8"
            aria-label="Close menu"
          >
            <HiX />
          </button>

          {/* Menu Items */}
          <div className="flex flex-col gap-4">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.url}
                target={item.url.startsWith("http") ? "_blank" : "_self"}
                rel={item.url.startsWith("http") ? "noopener noreferrer" : undefined}
                onClick={closeMobileMenu}
                className="mobile-nav-item flex items-center gap-3 text-white text-lg font-general uppercase py-3 px-4 rounded-lg hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-violet-500/50"
              >
                {item.icon && <span className="text-violet-400">{item.icon}</span>}
                {item.name}
              </a>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="mt-auto">
            <div className="border-t border-white/10 pt-6">
              <p className="text-white/50 text-sm font-general">Medieval Studio</p>
              <p className="text-white/30 text-xs mt-1">Crafting Legends, Forging Worlds</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
