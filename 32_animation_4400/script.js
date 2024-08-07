function loadCSS(url) {
  return new Promise((resolve, reject) => {
    const link = document.createElement("link");
    link.href = url;
    link.rel = "stylesheet";
    link.onload = () => resolve();
    link.onerror = () => reject(`Failed to load CSS file: ${url}`);
    document.head.appendChild(link);
  });
}

// Function to dynamically load JS
function loadJS(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = url;
    script.onload = () => resolve();
    script.onerror = () => reject(`Failed to load JS file: ${url}`);
    document.body.appendChild(script);
  });
}

// Function to initialize AOS
async function initializeAOS() {
  try {
    await loadCSS("https://cdn.jsdelivr.net/npm/aos@2.3.1/dist/aos.css");
    await loadJS("https://cdn.jsdelivr.net/npm/aos@2.3.1/dist/aos.js");

    document.addEventListener("DOMContentLoaded", () => {
      const setAOSAttributes = (selector, animation) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element) => {
          element.setAttribute("data-aos", animation);

          // Check for duration class and set data-aos-duration
          const durationClass = Array.from(element.classList).find((cls) =>
            cls.startsWith("duration-")
          );
          if (durationClass) {
            const duration = durationClass.split("-")[1];
            element.setAttribute("data-aos-duration", duration);
          }
        });
      };

      setAOSAttributes(".fade-up", "fade-up");
      setAOSAttributes(".fade-down", "fade-down");
      setAOSAttributes(".fade-right", "fade-right");
      setAOSAttributes(".fade-left", "fade-left");
      setAOSAttributes(".fade-up-right", "fade-up-right");
      setAOSAttributes(".fade-up-left", "fade-up-left");
      setAOSAttributes(".fade-down-right", "fade-down-right");
      setAOSAttributes(".fade-down-left", "fade-down-left");
      setAOSAttributes(".flip-right", "flip-right");
      setAOSAttributes(".flip-left", "flip-left");
      setAOSAttributes(".flip-up", "flip-up");
      setAOSAttributes(".flip-down", "flip-down");
      setAOSAttributes(".zoom-in", "zoom-in");
      setAOSAttributes(".zoom-out", "zoom-out");
      setAOSAttributes(".zoom-in-up", "zoom-in-up");
      setAOSAttributes(".zoom-in-down", "zoom-in-down");
      setAOSAttributes(".zoom-in-right", "zoom-in-right");
      setAOSAttributes(".zoom-in-left", "zoom-in-left");
      setAOSAttributes(".zoom-out-up", "zoom-out-up");
      setAOSAttributes(".zoom-out-down", "zoom-out-down");
      setAOSAttributes(".zoom-out-right", "zoom-out-right");
      setAOSAttributes(".zoom-out-left", "zoom-out-left");

      AOS.init({
        offset: 200,
        duration: 600,
        easing: "ease-in-out",
        once: false,
      });

      // Add custom scroll event to reset animations
      window.addEventListener("scroll", () => {
        const animatedElements = document.querySelectorAll("[data-aos]");
        animatedElements.forEach((element) => {
          if (
            element.getBoundingClientRect().top < window.innerHeight &&
            element.getBoundingClientRect().bottom > 0
          ) {
            element.classList.add("aos-init", "aos-animate");
          } else {
            element.classList.remove("aos-init", "aos-animate");
          }
        });
      });
    });
  } catch (error) {
    console.error("Failed to load AOS library:", error);
  }
}

initializeAOS();
