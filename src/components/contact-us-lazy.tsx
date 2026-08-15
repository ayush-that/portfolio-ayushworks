"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// The form and its dependencies are lazy-loaded when scrolled into view.
const ContactUs = dynamic(() => import("./contact-us"), { ssr: false });

const ContactUsLazy = () => {
  const holderRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = holderRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={holderRef} style={visible ? undefined : { minHeight: 480 }}>
      {visible && <ContactUs />}
    </div>
  );
};

export default ContactUsLazy;
