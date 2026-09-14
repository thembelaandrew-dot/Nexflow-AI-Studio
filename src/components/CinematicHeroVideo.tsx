import CinematicBackgroundVideo from './CinematicBackgroundVideo';

export default function CinematicHeroVideo() {
  return (
    <CinematicBackgroundVideo
      mp4Src="https://res.cloudinary.com/utmx65fl/video/upload/v1789371635/nexaflow-hero-bg-loop.mp4"
      webmSrc="https://res.cloudinary.com/utmx65fl/video/upload/v1789371635/nexaflow-hero-bg-loop.webm"
      posterSrc="https://res.cloudinary.com/utmx65fl/video/upload/v1789371635/nexaflow-hero-bg-loop.jpg"
      variant="hero"
      topFade={false}
      bottomFade={true}
      vignette={true}
      overlayOpacity={0.4}
    />
  );
}
