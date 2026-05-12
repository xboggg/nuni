import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const REVEAL_DATE = new Date("2026-05-23T20:00:00");

const AmbassadorTeaser = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const calculate = () => {
      const now = new Date();
      const diff = REVEAL_DATE.getTime() - now.getTime();
      if (diff <= 0) {
        setRevealed(true);
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    calculate();
    const timer = setInterval(calculate, 1000);
    return () => clearInterval(timer);
  }, []);

  if (revealed) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-16 bg-[#0a0a0a] overflow-hidden relative"
    >
      {/* Gold shimmer background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08),transparent_70%)]" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Poster */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="/media/ambassador-teaser.jpg"
              alt="New Brand Ambassador Teaser"
              className="w-full max-w-sm mx-auto rounded-2xl shadow-2xl shadow-yellow-900/30"
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-yellow-500/20" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <span className="inline-block text-xs font-semibold tracking-widest text-yellow-500 uppercase mb-3">
              🎭 Guess Who?
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-3 leading-tight">
              A New Era of Beauty <span className="text-yellow-400">Begins</span>
            </h2>
            <p className="text-white/60 mb-8 text-sm md:text-base leading-relaxed">
              A big name is officially part of NG Cosmetics. The reveal is coming on <span className="text-yellow-400 font-semibold">Saturday, May 23rd</span>. Stay tuned.
            </p>

            {/* Countdown */}
            <div className="grid grid-cols-4 gap-3 max-w-xs mx-auto lg:mx-0">
              {[
                { value: timeLeft.days, label: "Days" },
                { value: timeLeft.hours, label: "Hours" },
                { value: timeLeft.minutes, label: "Mins" },
                { value: timeLeft.seconds, label: "Secs" },
              ].map(({ value, label }) => (
                <div key={label} className="bg-white/5 border border-yellow-500/20 rounded-xl p-3 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-yellow-400 tabular-nums">
                    {String(value).padStart(2, "0")}
                  </div>
                  <div className="text-white/40 text-xs mt-1">{label}</div>
                </div>
              ))}
            </div>

            <p className="mt-6 text-white/30 text-xs tracking-widest uppercase">
              Powered by NG Cosmetics
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AmbassadorTeaser;
