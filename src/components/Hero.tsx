import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Play, Pause, Volume2, VolumeX, Maximize, Loader2 } from 'lucide-react';

const Hero = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);

  // URLs
  const videoUrl = "https://www.dropbox.com/scl/fi/hmabkgyhoepsszwboqlc9/NumARt_demo.mp4?rlkey=t5etm70nydquclomsh4e9ga5y&st=gyqj8vch&dl=1";
  const backImageUrl = "https://www.dropbox.com/scl/fi/pq7hiekblf09os0kanz6k/back_pic.jpg?rlkey=tbcz97dd2sjkfc5ivg14pu2ok&st=17qn39f9&dl=1";
  const apkDownloadUrl = "src/apk/NumARt.apk";

  const headingText = "Welcome to the magical world of NumARt 🪄";
  const subtitleText = "Let's play with numbers and learn amazing things together!";
  
  // Animation timing
  const headingDuration = headingText.length * 0.03;
  const subtitleDuration = subtitleText.length * 0.02;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.03, when: "beforeChildren" } }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.03, type: "spring", stiffness: 200 }
    })
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: headingDuration + 0.1, staggerChildren: 0.02 }
    }
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!showVideo) return;
      switch (e.key) {
        case ' ': e.preventDefault(); togglePlay(); break;
        case 'ArrowRight': seekVideo(5); break;
        case 'ArrowLeft': seekVideo(-5); break;
        case 'm': case 'M': toggleMute(); break;
        case 'f': case 'F': videoRef.current?.requestFullscreen(); break;
        case 'Escape': setShowVideo(false); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showVideo, isPlaying, isMuted]);

  // Video controls
  const togglePlay = () => {
    const video = videoRef.current;
    video.paused ? video.play() : video.pause();
    setIsPlaying(!video.paused);
  };

  const seekVideo = (seconds) => {
    const video = videoRef.current;
    video.currentTime = Math.min(Math.max(video.currentTime + seconds, 0), duration);
  };

  const handleVolume = (e) => {
    const newVolume = parseFloat(e.target.value);
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(!isMuted);
  };

  const handleProgress = () => {
    const video = videoRef.current;
    setCurrentTime(video.currentTime);
    setProgress((video.currentTime / video.duration) * 100);
  };

  const handleSeek = (e) => {
    const rect = e.target.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * videoRef.current.duration;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="pt-24 pb-16 bg-gradient-to-b from-purple-50 to-white overflow-hidden">
      {/* Video Modal */}
      {showVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm"
          onClick={() => { setShowVideo(false); videoRef.current.pause(); }}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="relative bg-black w-full max-w-4xl mx-4 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={videoRef}
              onTimeUpdate={handleProgress}
              onLoadedData={() => {
                setIsLoading(false);
                setDuration(videoRef.current.duration);
              }}
              onWaiting={() => setIsLoading(true)}
              onCanPlay={() => setIsLoading(false)}
              className="w-full aspect-video"
              src={videoUrl}
            />
            
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50">
                <Loader2 
                  className="w-12 h-12 text-green-600 animate-spin"
                  strokeWidth={2.5}
                  absoluteStrokeWidth
                />
              </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center gap-4 mb-2">
                <button
                  onClick={togglePlay}
                  className="text-white hover:text-green-500 transition-colors"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause 
                      size={24}
                      className="w-6 h-6"
                      strokeWidth={2.5}
                      absoluteStrokeWidth
                    />
                  ) : (
                    <Play 
                      size={24}
                      className="w-6 h-6"
                      strokeWidth={2.5}
                      absoluteStrokeWidth
                    />
                  )}
                </button>
                
                <span className="text-white text-sm font-mono">
                  {formatTime(currentTime)}
                </span>
                
                <div className="flex-1 relative group" onClick={handleSeek}>
                  <div className="h-2 bg-gray-700 rounded-full cursor-pointer">
                    <div
                      className="h-full bg-green-500 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <span className="text-white text-sm font-mono">
                  {formatTime(duration)}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    className="text-white hover:text-green-500 transition-colors"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? (
                      <VolumeX 
                        size={20}
                        className="w-5 h-5"
                        strokeWidth={2.5}
                        absoluteStrokeWidth
                      />
                    ) : (
                      <Volume2 
                        size={20}
                        className="w-5 h-5"
                        strokeWidth={2.5}
                        absoluteStrokeWidth
                      />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolume}
                    className="w-24 accent-green-500"
                    aria-label="Volume control"
                  />
                </div>

                <button
                  className="text-white hover:text-green-500 transition-colors"
                  onClick={() => videoRef.current.requestFullscreen()}
                  aria-label="Fullscreen"
                >
                  <Maximize 
                    size={20}
                    className="w-5 h-5"
                    strokeWidth={2.5}
                    absoluteStrokeWidth
                  />
                </button>
              </div>
              <div className="text-center text-gray-300 text-xs mt-2">
                Space: Play/Pause | ←→: Seek | M: Mute | F: Fullscreen | Esc: Close
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="font-smooch-sans font-bold text-5xl md:text-6xl lg:text-6xl text-purple-800 mb-6"
            >
              {Array.from(headingText).map((char, index) => (
                <motion.span key={index} variants={letterVariants} custom={index}>
                  {char}
                </motion.span>
              ))}
              
              <motion.span
                variants={subtitleVariants}
                initial="hidden"
                animate="visible"
                className="block text-green-600 mt-4 text-3xl md:text-4xl lg:text-4xl"
              >
                {Array.from(subtitleText).map((char, index) => (
                  <motion.span key={index} variants={letterVariants} custom={index}>
                    {char}
                  </motion.span>
                ))}
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: headingDuration + subtitleDuration + 0.2, duration: 0.6 }}
              className="text-gray-600 text-lg mb-8 font-comfortaa"
            >
              Watch numbers come alive through augmented reality. Make learning math fun and interactive for your kids!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: headingDuration + subtitleDuration + 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.a
                href={apkDownloadUrl}
                download="NumARt.apk"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-purple-800 text-white px-8 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-purple-900 transition-colors cursor-pointer"
              >
                <Download 
                  size={27}
                  className="w-6 h-6"
                  strokeWidth={2.5}
                  absoluteStrokeWidth
                />
                Try Free Now
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowVideo(true)}
                className="bg-white text-green-600 border-2 border-green-600 px-8 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-green-50 transition-colors"
              >
                <Play 
                  size={27}
                  className="w-6 h-6"
                  strokeWidth={2.5}
                  absoluteStrokeWidth
                />
                Watch Demo
              </motion.button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: headingDuration + subtitleDuration + 0.6, duration: 0.6 }}
              className="text-sm text-gray-500 mt-4 ml-2"
            >
              Android 9.0+ | ARCore-supported devices only
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <div className="relative">
              <motion.img
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6 }}
                src={backImageUrl}
                alt="Child interacting with AR numbers"
                className="rounded-2xl shadow-2xl"
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: headingDuration + subtitleDuration + 0.8, duration: 0.6 }}
                className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg"
              >
                <div className="text-purple-800 font-bold text-xl">1000+</div>
                <div className="text-gray-600 text-sm">Happy Students</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        .lucide {
          stroke-width: 2.5;
          stroke-linecap: round;
          stroke-linejoin: round;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          shape-rendering: geometricPrecision;
          display: inline-block;
          vertical-align: middle;
        }
        
        svg {
          color: inherit !important;
          forced-color-adjust: auto;
        }

        @media screen and (-ms-high-contrast: active) {
          .lucide {
            stroke: windowText;
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;