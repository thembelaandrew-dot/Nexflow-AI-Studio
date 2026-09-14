import { useEffect, useState } from 'react';
import { Global3DState } from './state';

/**
 * SVG displacement and turbulence filter definition.
 * Disabled completely on touch devices and low/medium quality tiers.
 */
export default function RefractiveFilter() {
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
    // Strictly keep only for desktop 'high' tier
    if (Global3DState.quality === 'high' && !isTouch && !Global3DState.isMobile) {
      setShouldMount(true);
    }
  }, []);

  // Completely disabled on touch devices / low-medium quality tier
  if (!shouldMount) return null;

  return (
    <svg className="hidden pointer-events-none fixed" width="0" height="0" aria-hidden="true">
      <defs>
        <filter id="nexaflow-refraction-filter" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            id="fe-turbulence"
            type="fractalNoise"
            baseFrequency="0.012"
            numOctaves={2}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={18}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
