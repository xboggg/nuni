import { useState, useRef, useCallback, ReactNode } from "react";
import { motion, useAnimation } from "framer-motion";
import { RefreshCw } from "lucide-react";

interface PullToRefreshProps {
  children: ReactNode;
  onRefresh: () => Promise<void>;
  threshold?: number;
}

const PullToRefresh = ({ children, onRefresh, threshold = 80 }: PullToRefreshProps) => {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const isDragging = useRef(false);
  const controls = useAnimation();

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (containerRef.current && containerRef.current.scrollTop === 0) {
      startY.current = e.touches[0].clientY;
      isDragging.current = true;
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current || isRefreshing) return;

    const currentY = e.touches[0].clientY;
    const diff = currentY - startY.current;

    if (diff > 0) {
      // Apply resistance
      const resistance = 0.4;
      setPullDistance(diff * resistance);
    }
  }, [isRefreshing]);

  const handleTouchEnd = useCallback(async () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    if (pullDistance >= threshold && !isRefreshing) {
      setIsRefreshing(true);
      
      // Haptic feedback
      if ('vibrate' in navigator) {
        navigator.vibrate([20]);
      }

      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
      }
    }

    // Animate back
    controls.start({ y: 0 });
    setPullDistance(0);
  }, [pullDistance, threshold, isRefreshing, onRefresh, controls]);

  const progress = Math.min(pullDistance / threshold, 1);
  const shouldTrigger = pullDistance >= threshold;

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative"
    >
      {/* Pull indicator */}
      <motion.div
        animate={{ 
          opacity: pullDistance > 10 ? 1 : 0,
          y: pullDistance > 10 ? 0 : -20
        }}
        className="absolute left-1/2 -translate-x-1/2 -top-2 z-10 flex flex-col items-center"
        style={{ transform: `translateX(-50%) translateY(${pullDistance}px)` }}
      >
        <motion.div
          animate={{ 
            rotate: isRefreshing ? 360 : progress * 180,
            scale: shouldTrigger ? 1.2 : 1
          }}
          transition={{ 
            rotate: isRefreshing ? { duration: 1, repeat: Infinity, ease: "linear" } : { duration: 0.2 },
            scale: { duration: 0.2 }
          }}
          className={`p-3 rounded-full shadow-lg ${
            shouldTrigger ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground'
          }`}
        >
          <RefreshCw size={20} />
        </motion.div>
        <span className="text-xs text-muted-foreground mt-2 font-medium">
          {isRefreshing ? 'Refreshing...' : shouldTrigger ? 'Release to refresh' : 'Pull to refresh'}
        </span>
      </motion.div>

      {/* Content */}
      <motion.div
        animate={controls}
        style={{ transform: `translateY(${pullDistance}px)` }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default PullToRefresh;
