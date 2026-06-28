import React from "react";
import Link from "next/link";

interface MarkdownRendererProps {
  content: string;
}

/**
 * Parses inline markdown tags (**bold**, *italic*, [link](url), ![img](url))
 * and returns React elements.
 */
function parseInlineStyles(text: string): React.ReactNode {
  if (!text) return "";

  // Let's implement a simple, robust split-and-replace tokenizer
  let parts: React.ReactNode[] = [text];

  // 1. Process bold formatting
  parts = parts.flatMap((part) => {
    if (typeof part !== "string") return part;
    const split = part.split(/\*\*([^*]+)\*\*/g);
    return split.map((str, idx) => (idx % 2 === 1 ? <strong key={idx} className="font-extrabold text-brand-navy-900">{str}</strong> : str));
  });

  // 2. Process italic formatting
  parts = parts.flatMap((part) => {
    if (typeof part !== "string") return part;
    const split = part.split(/\*([^*]+)\*/g);
    return split.map((str, idx) => (idx % 2 === 1 ? <em key={idx} className="italic text-brand-navy-800">{str}</em> : str));
  });

  // 3. Process links: [anchor](url)
  parts = parts.flatMap((part) => {
    if (typeof part !== "string") return part;
    
    // Custom split token for links to avoid breaking index offsets
    const tokens: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;
    const regex = /\[([^\]]+)\]\(([^)]+)\)/g;

    while ((match = regex.exec(part)) !== null) {
      const matchIndex = match.index;
      // Add text before the link
      if (matchIndex > lastIndex) {
        tokens.push(part.substring(lastIndex, matchIndex));
      }

      const linkText = match[1];
      const linkUrl = match[2];
      const isExternal = linkUrl.startsWith("http");

      tokens.push(
        <Link
          key={matchIndex}
          href={linkUrl}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-brand-primary-700 font-extrabold hover:text-brand-primary-800 underline underline-offset-4 decoration-2"
        >
          {linkText}
        </Link>
      );

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < part.length) {
      tokens.push(part.substring(lastIndex));
    }

    return tokens.length > 0 ? tokens : [part];
  });

  return <>{parts}</>;
}

/**
 * Splits text into blocks by double newlines or structural elements
 * and maps them to styled JSX tags.
 */
export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  if (!content) return null;

  // Normalize line endings
  const normalized = content.replace(/\r\n/g, "\n");

  // Separate code blocks first using regex
  const blockRegex = /(\`\`\`[\s\S]*?\`\`\`)/g;
  const rawSegments = normalized.split(blockRegex);

  const blocks: React.ReactNode[] = [];

  rawSegments.forEach((segment, segmentIdx) => {
    // Check if segment is a code block
    if (segment.startsWith("```") && segment.endsWith("```")) {
      const codeLines = segment.slice(3, -3).trim().split("\n");
      // Strip language tag from first line if present
      const language = codeLines[0].match(/^[a-zA-Z0-9]+$/) ? codeLines[0] : "";
      const codeContent = language ? codeLines.slice(1).join("\n") : codeLines.join("\n");

      blocks.push(
        <pre key={`code-${segmentIdx}`} className="bg-brand-navy-950 text-brand-navy-50 font-mono text-xs sm:text-sm p-5 rounded-3xl overflow-x-auto border border-brand-navy-900/50 shadow-inner my-6 leading-relaxed">
          <code>{codeContent}</code>
        </pre>
      );
      return;
    }

    // Segment is plain text blocks. Split by double newlines
    const segmentBlocks = segment.split(/\n\n+/);

    segmentBlocks.forEach((block, blockIdx) => {
      const trimmed = block.trim();
      if (!trimmed) return;

      const key = `block-${segmentIdx}-${blockIdx}`;

      // 1. Heading Elements
      if (trimmed.startsWith("#")) {
        const match = trimmed.match(/^(#{1,6})\s+(.*)$/);
        if (match) {
          const level = match[1].length;
          const headingText = match[2];
          
          if (level === 1) {
            blocks.push(
              <h1 key={key} className="font-display font-black text-3xl sm:text-4xl text-brand-navy-900 tracking-tight leading-tight mt-10 mb-5">
                {parseInlineStyles(headingText)}
              </h1>
            );
          } else if (level === 2) {
            blocks.push(
              <h2 key={key} id={headingText.toLowerCase().replace(/[^a-z0-9]+/g, "-")} className="font-display font-extrabold text-2xl sm:text-3xl text-brand-navy-900 tracking-tight leading-tight mt-8 mb-4 border-b border-brand-navy-50 pb-2">
                {parseInlineStyles(headingText)}
              </h2>
            );
          } else if (level === 3) {
            blocks.push(
              <h3 key={key} id={headingText.toLowerCase().replace(/[^a-z0-9]+/g, "-")} className="font-display font-extrabold text-xl sm:text-2xl text-brand-navy-900 tracking-tight mt-6 mb-3">
                {parseInlineStyles(headingText)}
              </h3>
            );
          } else {
            blocks.push(
              <h4 key={key} className="font-display font-extrabold text-lg text-brand-navy-900 mt-4 mb-2">
                {parseInlineStyles(headingText)}
              </h4>
            );
          }
          return;
        }
      }

      // 2. Blockquote
      if (trimmed.startsWith(">")) {
        const quoteContent = trimmed
          .split("\n")
          .map((line) => line.replace(/^>\s?/, ""))
          .join("\n");

        blocks.push(
          <blockquote key={key} className="pl-6 border-l-4 border-brand-primary-600 italic text-brand-navy-800 text-base sm:text-lg my-6 leading-relaxed bg-brand-navy-50/30 py-4 pr-4 rounded-r-3xl">
            {parseInlineStyles(quoteContent)}
          </blockquote>
        );
        return;
      }

      // 3. Tables
      if (trimmed.startsWith("|") && trimmed.includes("\n|")) {
        const lines = trimmed.split("\n").map((l) => l.trim());
        const headerLine = lines[0];
        const bodyLines = lines.slice(2); // Skip separator row (e.g. |---|---|)

        const parseCells = (line: string) => {
          return line
            .split("|")
            .slice(1, -1) // remove outer empty values
            .map((c) => c.trim());
        };

        const headers = parseCells(headerLine);
        const rows = bodyLines.map(parseCells);

        blocks.push(
          <div key={key} className="overflow-x-auto w-full my-8 border border-brand-navy-100 rounded-3xl shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-brand-navy-50/50 border-b border-brand-navy-100 text-xs font-black text-brand-navy-800 uppercase tracking-wider">
                  {headers.map((h, hIdx) => (
                    <th key={hIdx} className="py-4 px-5">
                      {parseInlineStyles(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-navy-50 text-sm text-brand-navy-700">
                {rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-brand-navy-50/10">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="py-4 px-5 font-medium">
                        {parseInlineStyles(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        return;
      }

      // 4. Bullet lists (unordered)
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        const items = trimmed
          .split("\n")
          .map((line) => line.replace(/^[-*]\s+/, "").trim())
          .filter(Boolean);

        blocks.push(
          <ul key={key} className="list-disc pl-6 my-6 text-brand-navy-700 text-sm sm:text-base space-y-2.5 font-medium">
            {items.map((item, iIdx) => (
              <li key={iIdx} className="leading-relaxed">
                {parseInlineStyles(item)}
              </li>
            ))}
          </ul>
        );
        return;
      }

      // 5. Numbered lists (ordered)
      if (/^\d+\.\s+/.test(trimmed)) {
        const items = trimmed
          .split("\n")
          .map((line) => line.replace(/^\d+\.\s+/, "").trim())
          .filter(Boolean);

        blocks.push(
          <ol key={key} className="list-decimal pl-6 my-6 text-brand-navy-700 text-sm sm:text-base space-y-2.5 font-medium">
            {items.map((item, iIdx) => (
              <li key={iIdx} className="leading-relaxed">
                {parseInlineStyles(item)}
              </li>
            ))}
          </ol>
        );
        return;
      }

      // 6. Markdown Images: ![alt](url)
      if (trimmed.startsWith("![") && trimmed.includes("](")) {
        const match = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
        if (match) {
          const altText = match[1];
          const url = match[2];
          blocks.push(
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={key}
              src={url}
              alt={altText}
              className="rounded-[32px] object-cover w-full max-h-[460px] my-8 shadow-md border border-brand-navy-100"
            />
          );
          return;
        }
      }

      // 7. Standard Paragraph
      blocks.push(
        <p key={key} className="leading-relaxed mb-6 font-medium text-brand-navy-700 text-base sm:text-lg">
          {parseInlineStyles(trimmed)}
        </p>
      );
    });
  });

  return <article className="markdown-body font-sans leading-relaxed">{blocks}</article>;
}
