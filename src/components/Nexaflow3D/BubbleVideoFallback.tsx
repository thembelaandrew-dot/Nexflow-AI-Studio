import { BubbleWarbleWrapper } from './BubbleWarbleWrapper';

export function BubbleVideoFallback() {
  return (
    <div className="fixed inset-0 z-0 w-full h-full bg-[#02050c] overflow-hidden pointer-events-none">
      <BubbleWarbleWrapper>
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/nexaflow-bubble-poster.jpg"
          className="w-full h-full object-cover"
        >
          <source src="/nexaflow-bubble-loop-colorfixed.mp4" type="video/mp4" />
          <source src="/nexaflow-bubble-loop.mp4" type="video/mp4" />
        </video>
      </BubbleWarbleWrapper>
    </div>
  );
}
export default BubbleVideoFallback;
