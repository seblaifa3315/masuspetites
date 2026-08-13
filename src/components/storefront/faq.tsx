"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What paper are the prints on?",
    answer:
      "All prints are produced on premium 300gsm archival matte paper with a smooth finish, ensuring vibrant colors and lasting quality.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Orders are typically processed within 2–3 business days. Standard shipping takes 5–7 business days. Express options are available at checkout.",
  },
  {
    question: "Do you accept returns?",
    answer:
      "We accept returns within 14 days of delivery for unused, undamaged prints in their original packaging. Contact us to start a return.",
  },
  {
    question: "Do you take custom orders?",
    answer:
      "Yes! Reach out through the contact form below with your idea and we'll discuss options, sizing, and pricing.",
  },
];

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: { question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <div
      style={{
        borderLeft: isOpen ? "2px solid var(--accent)" : "2px solid transparent",
        transition: "border-color 0.2s",
      }}
      className="border border-border rounded-lg overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium hover:bg-surface/50 transition-colors cursor-pointer"
      >
        {faq.question}
        <ChevronDown
          className={`w-4 h-4 text-muted shrink-0 ml-2 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        style={{
          height: isOpen ? height : 0,
          overflow: "hidden",
          transition: "height 0.25s ease",
        }}
      >
        <div ref={contentRef} className="px-5 pb-4 text-sm text-muted leading-relaxed">
          {faq.answer}
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="scroll-mt-20 py-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
        Frequently Asked Questions
      </h2>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <FAQItem
            key={i}
            faq={faq}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </section>
  );
}
