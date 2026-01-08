"use client";
import { Post } from "#site/content";
import { ClassValue } from "clsx";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

const TOC_STYLES: ClassValue = "el-focus-styles rounded-sm text-muted-foreground hover:text-ring";

const PostTableOfContent = ({ toc }: { toc: Post["toc"] }) => {
  const [tocValue, setTocValue] = useState("");

  const renderTocItems = (items: Post["toc"]) => {
    return (
      <ol role="list" className="mt-2 list-disc space-y-2 ps-4">
        {items.map((item) => (
          <li key={item.url} className="text-base" role="listitem">
            <a href={item.url} className={TOC_STYLES} aria-label={`Go to ${item.title}`}>
              {item.title}
            </a>
            {item.items.length > 0 && renderTocItems(item.items)}
          </li>
        ))}
      </ol>
    );
  };

  return (
    <Accordion type="single" collapsible className="w-full" onValueChange={setTocValue}>
      <AccordionItem value="post-toc">
        <AccordionTrigger className="el-focus-styles rounded-sm bg-muted p-2 font-serif text-base">
          <p>
            Table of Contents{" "}
            <span className="text-muted-foreground">(Click to {tocValue ? "Close" : "Open"})</span>
          </p>
        </AccordionTrigger>
        <AccordionContent className="p-2">
          <ol role="list" className="list-decimal space-y-2 pl-4">
            {toc.map((tocItem) => (
              <li key={tocItem.url} className="text-base" role="listitem">
                <a href={tocItem.url} className={TOC_STYLES} aria-label={`Go to ${tocItem.title}`}>
                  {tocItem.title}
                </a>
                {tocItem.items.length > 0 && renderTocItems(tocItem.items)}
              </li>
            ))}
          </ol>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PostTableOfContent;
