import "./App.css";

function VideoCard() {
  return (
    <video
      loop
      style={{ objectFit: "cover", aspectRatio: 9 / 16 }}
      autoPlay
      muted
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
      </div>
    </div>
  );
}

export default App;
