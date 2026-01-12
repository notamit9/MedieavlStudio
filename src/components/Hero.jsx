import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { FaChevronDown } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import VideoPreview from "./VideoPreview";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);
  const totalVideos = 4;
  const nextVdRef = useRef(null);
  const heroContentRef = useRef(null);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setLoading(false);
    }
  }, [loadedVideos]);

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
  };

  // Animate hero content on load
  useGSAP(() => {
    if (!loading && heroContentRef.current) {
      gsap.fromTo(
        heroContentRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.3 }
      );
    }
  }, [loading]);

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVdRef.current.play(),
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    {
      dependencies: [currentIndex],
      revertOnUpdate: true,
    }
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="flex flex-col items-center gap-4">
            <div className="three-body">
              <div className="three-body__dot"></div>
              <div className="three-body__dot"></div>
              <div className="three-body__dot"></div>
            </div>
            <p className="text-violet-600 font-general text-sm uppercase tracking-widest animate-pulse">
              Loading Experience...
            </p>
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <VideoPreview>
              <div
                onClick={handleMiniVdClick}
                className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
              >
                <video
                  ref={nextVdRef}
                  src={getVideoSrc((currentIndex % totalVideos) + 1)}
                  loop
                  muted
                  id="current-video"
                  className="size-64 origin-center scale-150 object-cover object-center"
                  onLoadedData={handleVideoLoad}
                />
              </div>
            </VideoPreview>
          </div>

          <video
            ref={nextVdRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
          <video
            src={getVideoSrc(
              currentIndex === totalVideos - 1 ? 1 : currentIndex
            )}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>

        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 z-30 pointer-events-none" />

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          s<b>tu</b>dio
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div ref={heroContentRef} className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              Medieval<b></b>
            </h1>

            <p className="mb-5 max-w-md font-robert-regular text-blue-100 text-lg sm:text-xl leading-relaxed">
              Crafting Legends, Forging Worlds<br />
              <span className="text-blue-100/70 text-base">Indie Game Studio from India</span>
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#about">
                <Button
                  id="explore-btn"
                  title="Explore Our Games"
                  rightIcon={<TiLocationArrow />}
                  containerClass="bg-yellow-300 hover:bg-yellow-400 text-black flex items-center justify-center gap-1 transition-all duration-300"
                />
              </a>
              <a
                href="https://play.google.com/store/apps/dev?id=9041958043014239534&hl=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  id="playstore-btn"
                  title="Play Store"
                  containerClass="bg-transparent border-2 border-blue-100 text-blue-100 hover:bg-blue-100 hover:text-black flex items-center justify-center gap-1 transition-all duration-300"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          onClick={scrollToAbout}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 cursor-pointer animate-bounce"
        >
          <div className="flex flex-col items-center gap-2 text-blue-100/80 hover:text-blue-100 transition-colors">
            <span className="text-xs font-general uppercase tracking-widest">Scroll Down</span>
            <FaChevronDown className="text-xl" />
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        st<b>u</b>dio
      </h1>
    </div>
  );
};

export default Hero;
