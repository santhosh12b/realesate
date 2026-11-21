import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion';
import { Play, RotateCw, ChevronLeft, ChevronRight, CheckCircle2, Calendar, Phone } from 'lucide-react';
import { projectData } from '../../data/projectData';

const videoList = [
  {
    id: 1,
    tag: "STORY 01 • FAMILY LIVING",
    title: "Securing a Peaceful Family Future",
    description: "Generational peace, fresh mountain breezes, and clean groundwater just 1 km from the Western Ghats foothills.",
    src: "/assets/video-1.mp4",
    poster: "/assets/video-poster-1.jpg",
    duration: "30s Film",
    keyHighlight: "1 km from Western Ghats Foothills"
  },
  {
    id: 2,
    tag: "STORY 02 • SMART INVESTMENT",
    title: "Planning Your Dream Plot & Villa",
    description: "Carefully zoned DTCP and RERA approved residential sanctuaries and high-value road-facing commercial plots.",
    src: "/assets/video-2.mp4",
    poster: "/assets/video-poster-2.jpg",
    duration: "35s Film",
    keyHighlight: "899 DTCP & RERA Approved Sites"
  },
  {
    id: 3,
    tag: "STORY 03 • PRIME LOCATION",
    title: "Highway Connectivity & Growth Hub",
    description: "Direct frontage on the Coimbatore–Mettupalayam corridor, positioned directly opposite United Public School (CBSE).",
    src: "/assets/video-3.mp4",
    poster: "/assets/video-poster-3.jpg",
    duration: "31s Film",
    keyHighlight: "Opp. United Public School (CBSE)"
  }
];

export function ProjectVideo() {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isAutoSpinning, setIsAutoSpinning] = useState(false);

  // References to the 3 video HTML elements
  const videoRefs = [useRef(null), useRef(null), useRef(null)];

  // Continuous rotation angle in degrees (0, -120, -240, -360, etc.)
  const rotationAngle = useMotionValue(0);

  // Gesture tracking refs
  const isPointerDownRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragCapturedRef = useRef(false);
  const startXRef = useRef(0);
  const startAngleRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const totalDragDeltaRef = useRef(0);

  // Responsive orbital geometry
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate active story from rotation angle (0, 1, or 2)
  const getActiveIndexFromAngle = useCallback((ang) => {
    const step = Math.round(ang / 120);
    return ((-step % 3) + 3) % 3;
  }, []);

  // Update active index whenever rotationAngle changes
  useEffect(() => {
    return rotationAngle.on('change', (latest) => {
      const newIdx = getActiveIndexFromAngle(latest);
      if (newIdx !== activeStoryIndex) {
        setActiveStoryIndex(newIdx);
      }
    });
  }, [rotationAngle, activeStoryIndex, getActiveIndexFromAngle]);

  // Smoothly animate to a specific target angle with spring physics
  const animateToAngle = useCallback((targetAngle) => {
    // Pause any playing video when rotating
    videoRefs.forEach((ref) => ref.current?.pause());
    setPlayingIndex(null);

    animate(rotationAngle, targetAngle, {
      type: 'spring',
      stiffness: 140,
      damping: 20,
      mass: 0.8
    });
  }, [rotationAngle]);

  // Spin to next story (-120deg)
  const handleNextStory = useCallback(() => {
    const current = rotationAngle.get();
    const target = Math.round((current - 120) / 120) * 120;
    animateToAngle(target);
  }, [rotationAngle, animateToAngle]);

  // Spin to previous story (+120deg)
  const handlePrevStory = useCallback(() => {
    const current = rotationAngle.get();
    const target = Math.round((current + 120) / 120) * 120;
    animateToAngle(target);
  }, [rotationAngle, animateToAngle]);

  // Jump to specific story by index (finds shortest rotation direction)
  const goToStory = useCallback((targetIdx) => {
    const currentAngle = rotationAngle.get();
    const currentIdx = getActiveIndexFromAngle(currentAngle);
    if (targetIdx === currentIdx) return;

    // Calculate shortest angular difference (-120 or +120)
    let diff = targetIdx - currentIdx;
    if (diff === 2) diff = -1;
    if (diff === -2) diff = 1;

    const targetAngle = currentAngle - diff * 120;
    animateToAngle(targetAngle);
  }, [rotationAngle, getActiveIndexFromAngle, animateToAngle]);

  // Auto 360 Spin Showcase
  const handleAutoSpin = () => {
    if (isAutoSpinning) return;
    setIsAutoSpinning(true);
    videoRefs.forEach((ref) => ref.current?.pause());
    setPlayingIndex(null);

    const current = rotationAngle.get();
    animate(rotationAngle, current - 360, {
      duration: 2.8,
      ease: [0.25, 1, 0.5, 1],
      onComplete: () => {
        setIsAutoSpinning(false);
      }
    });
  };

  // Direct Pointer & Touch Event Handlers (High-Performance 360 Drag)
  const handlePointerDown = (e) => {
    // Only primary button or touch
    if (e.button !== undefined && e.button !== 0) return;

    // Do NOT capture or start drag if user touches interactive buttons, video controls, or links
    if (e.target.closest('button, video, a')) {
      return;
    }

    isPointerDownRef.current = true;
    isDraggingRef.current = false;
    dragCapturedRef.current = false;
    startXRef.current = e.clientX;
    startAngleRef.current = rotationAngle.get();
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
    totalDragDeltaRef.current = 0;
  };

  const handlePointerMove = (e) => {
    if (!isPointerDownRef.current) return;

    const totalDeltaX = e.clientX - startXRef.current;
    totalDragDeltaRef.current = totalDeltaX;

    // Only initiate drag once movement exceeds 8px (preserves clean taps/clicks)
    if (!isDraggingRef.current && Math.abs(totalDeltaX) > 8) {
      isDraggingRef.current = true;
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
        dragCapturedRef.current = true;
      } catch (_) {}
    }

    if (isDraggingRef.current) {
      const now = performance.now();
      const dt = now - lastTimeRef.current;
      const dx = e.clientX - lastXRef.current;

      if (dt > 0) {
        velocityRef.current = dx / dt;
      }
      lastXRef.current = e.clientX;
      lastTimeRef.current = now;

      // 1px drag = ~0.35 degrees of 3D rotation
      const sensitivity = isMobile ? 0.38 : 0.32;
      const newAngle = startAngleRef.current + totalDeltaX * sensitivity;
      rotationAngle.set(newAngle);
    }
  };

  const handlePointerUp = (e) => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;

    if (dragCapturedRef.current) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch (_) {}
      dragCapturedRef.current = false;
    }

    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      const currentAngle = rotationAngle.get();
      const totalDeltaX = totalDragDeltaRef.current;
      const velocity = velocityRef.current; // px per ms

      let targetAngle;
      if (totalDeltaX < -25 || velocity < -0.2) {
        // Dragged / Flicked Left -> Spin to Next Story
        targetAngle = Math.floor((currentAngle - 15) / 120) * 120;
      } else if (totalDeltaX > 25 || velocity > 0.2) {
        // Dragged / Flicked Right -> Spin to Previous Story
        targetAngle = Math.ceil((currentAngle + 15) / 120) * 120;
      } else {
        // Snap to nearest 120deg
        targetAngle = Math.round(currentAngle / 120) * 120;
      }

      animateToAngle(targetAngle);
      setTimeout(() => {
        totalDragDeltaRef.current = 0;
      }, 80);
    } else {
      totalDragDeltaRef.current = 0;
    }
  };

  // Play/Pause Video Toggle on Active Card
  const handleTogglePlay = (index) => {
    const currentRef = videoRefs[index]?.current;
    if (!currentRef) return;

    if (playingIndex === index && !currentRef.paused) {
      currentRef.pause();
      setPlayingIndex(null);
    } else {
      // Pause all other videos and reset their time
      videoRefs.forEach((ref, idx) => {
        if (idx !== index && ref.current) {
          ref.current.pause();
          ref.current.currentTime = 0;
        }
      });

      // Attempt to play with sound
      currentRef.muted = false;
      const playPromise = currentRef.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setPlayingIndex(index);
          })
          .catch((err) => {
            console.warn("Autoplay with audio blocked by browser policy, attempting muted fallback:", err);
            currentRef.muted = true;
            currentRef.play()
              .then(() => {
                setPlayingIndex(index);
              })
              .catch((fatalErr) => {
                console.error("Video play failed:", fatalErr);
              });
          });
      }
    }
  };

  // Card click: if card is on the side, rotate it to front; if in front and paused, start playing
  const handleCardClick = (idx) => {
    // If user was actively dragging horizontally, ignore the click
    if (Math.abs(totalDragDeltaRef.current) > 12) return;

    if (idx !== activeStoryIndex) {
      goToStory(idx);
    } else if (playingIndex !== idx) {
      handleTogglePlay(idx);
    }
  };

  // Responsive 3D Geometry
  const radiusX = isMobile ? 140 : 280;
  const radiusZ = isMobile ? 115 : 210;

  return (
    <section
      id="video"
      className="py-10 sm:py-14 lg:py-18 bg-white border-b border-border-light overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center">
        
        {/* Top Header: Badge, Title & Interactive Navigation Pills */}
        <div className="text-center space-y-1.5 sm:space-y-2 flex-shrink-0 pt-1 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 sm:py-1 rounded-full bg-sage-soft/80 border border-sage-border text-emerald text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
            <RotateCw className="w-3.5 h-3.5 text-orange-sunshine animate-spin" style={{ animationDuration: '6s' }} />
            <span>360° INTERACTIVE 3D FILMS</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald">
            Experience Mahadev Enclave
          </h2>

          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
            Drag left or right to spin through all 3 story films in continuous 360° perspective.
          </p>

          {/* Interactive Story Navigation Pills + 360 Auto-Spin Button */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-1 sm:mt-2">
            <div className="inline-flex items-center bg-warmwhite p-1 rounded-full border border-border-light shadow-sm">
              {videoList.map((video, idx) => {
                const isActive = activeStoryIndex === idx;
                return (
                  <button
                    key={video.id}
                    onClick={() => goToStory(idx)}
                    className={`relative px-3 sm:px-4 py-1 sm:py-1.5 text-xs font-semibold rounded-full transition-all duration-300 ${
                      isActive ? 'text-emerald font-bold' : 'text-charcoal-muted hover:text-emerald'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeStoryPill"
                        className="absolute inset-0 bg-white rounded-full shadow-sm border border-border-light"
                        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                      />
                    )}
                    <span className="relative z-10 whitespace-nowrap">
                      Story 0{video.id}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick 360 Spin Demo Button */}
            <button
              onClick={handleAutoSpin}
              disabled={isAutoSpinning}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-sage-soft text-emerald hover:bg-emerald hover:text-white transition-all text-xs font-semibold shadow-sm active:scale-95"
              title="Auto spin 360 degrees"
            >
              <RotateCw className={`w-3.5 h-3.5 text-orange-sunshine ${isAutoSpinning ? 'animate-spin' : ''}`} />
              <span className="hidden xs:inline">Auto Spin 360°</span>
            </button>
          </div>
        </div>

        {/* Center 3D Orbital Carousel Stage with High-Performance Touch & Drag */}
        <div className="relative w-full max-w-4xl mx-auto flex items-center justify-center my-6 sm:my-8 h-[370px] sm:h-[430px]">
          
          {/* Subtle Grounding 3D Shadow Ring */}
          <div className="absolute bottom-2 w-64 sm:w-80 h-10 rounded-full bg-emerald/10 blur-xl pointer-events-none" />

          {/* Left Navigation Arrow Button */}
          <button
            onClick={handlePrevStory}
            className="absolute left-1 sm:left-4 z-40 p-2.5 rounded-full bg-white/95 shadow-lg border border-border-light text-emerald hover:bg-emerald hover:text-white transition-all active:scale-90"
            aria-label="Previous Story"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-orange-sunshine" />
          </button>

          {/* Right Navigation Arrow Button */}
          <button
            onClick={handleNextStory}
            className="absolute right-1 sm:right-4 z-40 p-2.5 rounded-full bg-white/95 shadow-lg border border-border-light text-emerald hover:bg-emerald hover:text-white transition-all active:scale-90"
            aria-label="Next Story"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-orange-sunshine" />
          </button>

          {/* 360 Drag Viewport Container */}
          <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
            style={{
              perspective: '1200px',
              transformStyle: 'preserve-3d'
            }}
          >
            {videoList.map((video, idx) => {
              // Base angle for this card (0deg, 120deg, 240deg)
              const baseAngle = idx * 120;

              // Motion transforms mapped directly to continuous rotation angle
              const cardX = useTransform(rotationAngle, (rot) => {
                const rad = ((rot + baseAngle) * Math.PI) / 180;
                return Math.sin(rad) * radiusX;
              });

              const cardZ = useTransform(rotationAngle, (rot) => {
                const rad = ((rot + baseAngle) * Math.PI) / 180;
                return (Math.cos(rad) - 1) * radiusZ;
              });

              const cardRotateY = useTransform(rotationAngle, (rot) => {
                const rad = ((rot + baseAngle) * Math.PI) / 180;
                return -Math.sin(rad) * 26; // Smooth inward 3D tilt
              });

              const cardScale = useTransform(rotationAngle, (rot) => {
                const rad = ((rot + baseAngle) * Math.PI) / 180;
                const cosVal = (Math.cos(rad) + 1) / 2;
                return isMobile ? 0.82 + 0.18 * cosVal : 0.8 + 0.2 * cosVal;
              });

              const cardOpacity = useTransform(rotationAngle, (rot) => {
                const rad = ((rot + baseAngle) * Math.PI) / 180;
                const cosVal = (Math.cos(rad) + 1) / 2;
                return 0.45 + 0.55 * cosVal;
              });

              const cardZIndex = useTransform(rotationAngle, (rot) => {
                const rad = ((rot + baseAngle) * Math.PI) / 180;
                return Math.round(100 + 100 * Math.cos(rad));
              });

              const isCurrent = activeStoryIndex === idx;
              const isPlaying = playingIndex === idx;

              return (
                <motion.div
                  key={video.id}
                  onClick={() => handleCardClick(idx)}
                  style={{
                    x: cardX,
                    z: cardZ,
                    rotateY: cardRotateY,
                    scale: cardScale,
                    opacity: cardOpacity,
                    zIndex: cardZIndex,
                    transformStyle: 'preserve-3d'
                  }}
                  className="absolute will-change-transform cursor-pointer"
                >
                  {/* Portrait 9:16 Video Player Container */}
                  <div
                    className={`relative w-[200px] xs:w-[220px] sm:w-[250px] md:w-[270px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border-2 sm:border-4 transition-all duration-300 bg-charcoal-dark ${
                      isCurrent
                        ? 'border-orange-sunshine shadow-orange-sunshine/25 ring-4 ring-orange-sunshine/20'
                        : 'border-white/90 shadow-md hover:border-emerald'
                    }`}
                  >
                    <video
                      ref={videoRefs[idx]}
                      src={video.src}
                      poster={video.poster}
                      controls={isCurrent && isPlaying}
                      playsInline
                      preload="metadata"
                      onPointerDown={(e) => {
                        if (isPlaying) e.stopPropagation();
                      }}
                      className={`w-full h-full object-cover ${
                        isCurrent && isPlaying ? 'pointer-events-auto cursor-pointer' : 'pointer-events-none'
                      }`}
                      onPlay={() => setPlayingIndex(idx)}
                      onPause={() => {
                        if (playingIndex === idx) setPlayingIndex(null);
                      }}
                      onEnded={() => {
                        if (playingIndex === idx) setPlayingIndex(null);
                      }}
                    >
                      Your browser does not support the video tag.
                    </video>

                    {/* Play Button Overlay (when paused on front card) */}
                    {!isPlaying && isCurrent && (
                      <button
                        type="button"
                        onPointerDown={(e) => e.stopPropagation()}
                        onTouchStart={(e) => e.stopPropagation()}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTogglePlay(idx);
                        }}
                        className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-orange-sunshine text-white flex items-center justify-center shadow-2xl hover:bg-orange-hover hover:scale-110 active:scale-95 transition-all animate-play-pulse z-30 pointer-events-auto cursor-pointer"
                        aria-label={`Play ${video.title}`}
                      >
                        <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1" />
                      </button>
                    )}

                    {/* Active Playing Badge */}
                    {isPlaying && isCurrent && (
                      <div className="absolute top-2.5 right-2.5 bg-black/75 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1.5 z-20 pointer-events-none">
                        <span className="w-2 h-2 rounded-full bg-emerald-light animate-pulse" />
                        <span>Now Playing</span>
                      </div>
                    )}

                    {/* Top Duration Badge */}
                    <div className="absolute top-2.5 left-2.5 bg-emerald/90 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow pointer-events-none z-10">
                      {video.duration}
                    </div>

                    {/* Tap to view overlay on inactive cards */}
                    {!isCurrent && (
                      <div className="absolute inset-0 bg-emerald-dark/25 backdrop-blur-[0.5px] transition-opacity flex items-end p-2.5 z-10 pointer-events-none">
                        <span className="text-[10px] font-semibold text-white bg-black/60 px-2 py-0.5 rounded">
                          Tap to spin
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Details Strip & Gestures Prompt */}
        <div className="w-full max-w-xl mx-auto text-center space-y-2 flex-shrink-0">
          <AnimatePresence mode="wait">
            {(() => {
              const currentVideo = videoList[activeStoryIndex];
              return (
                <motion.div
                  key={currentVideo.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-1"
                >
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-orange-sunshine block">
                    {currentVideo.tag}
                  </span>

                  <h3 className="font-serif text-base sm:text-xl font-bold text-emerald line-clamp-1">
                    {currentVideo.title}
                  </h3>

                  <p className="text-[11px] sm:text-xs text-charcoal-muted leading-relaxed line-clamp-1 max-w-lg mx-auto">
                    {currentVideo.description}
                  </p>

                  <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-emerald bg-sage-soft/70 px-2.5 py-0.5 rounded-full mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-orange-sunshine" />
                    <span>{currentVideo.keyHighlight}</span>
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>

          {/* Gesture Hint (Swipe Left/Right) */}
          <div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-charcoal-muted/70 pt-1">
            <span>👈 Drag Left / Right to Spin 360° 👉</span>
          </div>

          {/* Quick Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#enquiry"
              className="btn-primary min-h-[42px] px-6 py-2.5 rounded text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 shadow-sm w-full sm:w-auto"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Schedule a Free Site Visit</span>
            </a>
            <a
              href={`tel:${projectData.phone.replace(/\s+/g, '')}`}
              className="btn-outline min-h-[42px] px-5 py-2.5 rounded text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 w-full sm:w-auto"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Advisor: {projectData.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
