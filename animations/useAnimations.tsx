import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap } from "../libs/gsap";

export const useAnimations = () => {
  const pathname = usePathname();

  useGSAP(
    () => {
      // Underline hover animation
      gsap.utils.toArray("[data-animate='underline']").forEach((el) => {
        const element = el as HTMLElement;

        // Create pseudo-element for the underline
        const underline = document.createElement("span");
        underline.style.cssText = `
					position: absolute;
					bottom: 0;
					left: 0;
					width: 100%;
					height: 2px;
					background-color: currentColor;
					transform-origin: left;
				`;
        element.style.position = "relative";
        element.appendChild(underline);

        // Enter animation
        element.addEventListener("mouseenter", () => {
          gsap.killTweensOf(underline);
          gsap.fromTo(
            underline,
            {
              scaleX: 1,
              transformOrigin: "left",
            },
            {
              scaleX: 0,
              duration: 0.4,
              ease: "power2.inOut",
              onComplete: () => {
                gsap.to(underline, {
                  scaleX: 1,
                  duration: 0.4,
                  transformOrigin: "right",
                  ease: "power1.inOut",
                });
              },
            }
          );
        });

        // Leave animation
        element.addEventListener("mouseleave", () => {
          gsap.killTweensOf(underline);
          gsap.set(underline, {
            scaleX: 1,
            transformOrigin: "left",
          });
        });
      });

      // Fade in animation
      gsap.utils
        .toArray(
          "[data-animate]:not([data-animate-stagger-container] [data-animate]):not([data-animate='underline'])"
        )
        .forEach((el) => {
          const trigger = el as HTMLElement;
          const start =
            trigger.getAttribute("data-animate-start") || "top center";
          const delay = trigger.getAttribute("data-animate-delay") || "0";
          gsap.to(trigger, {
            scrollTrigger: {
              trigger,
              start,
            },
            opacity: 1,
            scale: 1,
            y: 0,
            x: 0,
            duration: 0.8,
            ease: "power1.out",
            delay,
          });
        });

      // Stagger animation
      gsap.utils
        .toArray("[data-animate-stagger-container='true']")
        .forEach((el) => {
          const trigger = el as HTMLElement;
          const elements = gsap.utils.toArray("[data-animate]", trigger);
          const stagger = parseFloat(
            trigger.getAttribute("data-animate-stagger") || "0.2"
          );

          const start =
            trigger.getAttribute("data-animate-start") || "top bottom";
          const delay = trigger.getAttribute("data-animate-delay") || "0";

          gsap.to(elements, {
            scrollTrigger: {
              trigger,
              start,
            },
            opacity: 1,
            duration: 0.8,
            y: 0,
            x: 0,
            scale: 1,
            ease: "power1.out",
            stagger: isNaN(stagger) ? 0.2 : stagger,
            delay,
          });
        });
    },
    { dependencies: [pathname] }
  );
};
