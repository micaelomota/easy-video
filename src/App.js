import { useRef, useState } from "react";
import "./App.css";

function VideoCard() {
  const videoRef = useRef(null); // Reference to the video element
  const [isPaused, setIsPaused] = useState(false); // State to track if video is paused
  const [startX, setStartX] = useState(null); // Initial X position on mouse down/touch start
  const [startTime, setStartTime] = useState(null); // Initial video time at start

  // Handle mouse down / touch start
  const handlePointerDown = (e) => {
    const video = videoRef.current;
    setIsPaused(video.paused);
    video.pause(); // Pause the video on click/hold
    const xPosition =
      e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
    setStartX(xPosition);
    setStartTime(video.currentTime);
  };

  // Handle mouse move / touch move
  const handlePointerMove = (e) => {
    if (startX !== null) {
      const video = videoRef.current;
      const xPosition =
        e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
      const deltaX = xPosition - startX;
      const duration = video.duration || 0;

      // Calculate the time change, assuming each 100 pixels = 1 second of video
      const timeChange = (deltaX / 100) * duration * 0.1; // Adjust the multiplier as needed
      video.currentTime = Math.min(
        Math.max(startTime + timeChange, 0),
        duration
      );
    }
  };

  // Handle mouse up / touch end
  const handlePointerUp = () => {
    if (isPaused && videoRef.current) {
      videoRef.current.pause(); // Keep it paused if it was already paused before
    } else {
      videoRef.current.play(); // Resume playback
    }
    setStartX(null);
    setStartTime(null);
  };

  return (
    <video
      ref={videoRef}
      loop
      autoPlay
      playsInline
      muted
      style={{
        objectFit: "cover",
        aspectRatio: 9 / 16,
        width: "100%",
        cursor: "grab",
      }}
      onMouseDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onMouseUp={handlePointerUp}
      onMouseLeave={handlePointerUp} // Reset if mouse leaves the video
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
    >
      <source
        src="https://github.com/micaelomota/easy-video/raw/refs/heads/gh-pages/easy-video.mp4"
        type="video/mp4"
      />
    </video>
  );
}

function App() {
  return (
    <div className="">
      <div className="grid grid-cols-3 gap-5">
        <VideoCard />
        <VideoCard />
        <VideoCard />

        <VideoCard />
        <VideoCard />
        <VideoCard />

        <VideoCard />
        <VideoCard />
        <VideoCard />
      </div>
    </div>
  );
}

export default App;
