import { useState, useEffect, useRef } from 'react';

export function useResizeObserver() {
  const [size, setSize] = useState({ width: undefined, height: undefined });
  const ref = useRef(null);

  useEffect(() => {
    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        })
      })
    })

    if (observeTarget) {
      resizeObserver.observe(observeTarget);
    }

    return () => {
      console.log('Cleaning up observer for:', observeTarget);
      resizeObserver.disconnect();
  }
  }, [ref.current]) // Empty array ensures the effect is only run on mount and unmount

  return [ref, size]
}