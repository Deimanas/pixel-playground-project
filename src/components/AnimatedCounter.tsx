import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface AnimatedCounterProps {
  value: string;
  label: string;
}

export const AnimatedCounter = ({ value, label }: AnimatedCounterProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  // Extract number and suffix (e.g., "230+" -> number: 230, suffix: "+")
  const numericMatch = value.match(/(\d+)(.*)/) || ["", "0", ""];
  const targetNumber = parseInt(numericMatch[1]);
  const suffix = numericMatch[2];
  
  const digits = targetNumber.toString().split("");

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-pixel text-2xl md:text-3xl text-gold flex items-center justify-center">
        {digits.map((digit, index) => {
          const isFirstDigit = index === 0;
          
          return (
            <div
              key={index}
              className="relative h-[1.2em] overflow-hidden"
              style={{ width: "0.8em" }}
            >
              <motion.div
                className="flex flex-col items-center"
                initial={{ 
                  y: isFirstDigit ? "100%" : "-100%" 
                }}
                animate={hasAnimated ? { 
                  y: 0 
                } : {}}
                transition={{
                  duration: 1.2,
                  delay: index * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {/* Fake digits for animation effect */}
                {isFirstDigit ? (
                  <>
                    {[...Array(10)].map((_, i) => (
                      <span key={`pre-${i}`} className="leading-[1.2]">
                        {(parseInt(digit) + 10 - i) % 10}
                      </span>
                    ))}
                    <span className="leading-[1.2]">{digit}</span>
                  </>
                ) : (
                  <>
                    <span className="leading-[1.2]">{digit}</span>
                    {[...Array(10)].map((_, i) => (
                      <span key={`post-${i}`} className="leading-[1.2]">
                        {(parseInt(digit) + i + 1) % 10}
                      </span>
                    ))}
                  </>
                )}
              </motion.div>
            </div>
          );
        })}
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={hasAnimated ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: digits.length * 0.15 + 0.3 }}
        >
          {suffix}
        </motion.span>
      </div>
      <p className="font-minecraft text-lg text-muted-foreground">{label}</p>
    </div>
  );
};
