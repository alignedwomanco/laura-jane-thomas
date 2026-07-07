import { useRef, useState } from "react";
import { Play } from "lucide-react";

export default function IntroVideo() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    videoRef.current?.play();
  };

  return (
    <div className="relative aspect-video bg-gradient-to-b from-[#6B3E4D] to-[#3A1E2A] rounded-lg overflow-hidden group">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        controls
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src="https://pub-7ae774d14f7545f5867330470de2d758.r2.dev/UPDATED%20speaking%20video7june%20.mp4" type="video/mp4" />
      </video>
      {!playing && (
        <>
          <div className="absolute inset-0 bg-oxblood/30 pointer-events-none" />
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={handlePlay}
              className="w-16 h-16 rounded-full bg-ivory flex items-center justify-center hover:scale-110 transition-transform duration-300"
              aria-label="Play video"
            >
              <Play className="w-6 h-6 text-oxblood fill-oxblood ml-1" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}