import React from "react";

/* Minimal markdown subset renderer (headings, paragraphs, lists, quotes,
   **bold**, [links](url)) styled with the site tokens — no external deps. */

function inline(text: string, key: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    if (m[1] !== undefined) {
      nodes.push(
        <strong key={`${key}-b${i}`} className="font-semibold text-ink">
          {m[1]}
        </strong>,
      );
    } else {
      nodes.push(
        <a
          key={`${key}-a${i}`}
          href={m[3]}
          className="font-medium text-brand underline-offset-2 hover:underline"
        >
          {m[2]}
        </a>,
      );
    }
    last = m.index + m[0].length;
    i++;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function Markdown({ content }: { content: string }) {
  const blocks = content.trim().split(/\n{2,}/);
  return (
    <div className="space-y-5 text-base leading-relaxed text-ink-2">
      {blocks.map((block, bi) => {
        const lines = block.split("\n");
        if (block.startsWith("## ")) {
          return (
            <h2 key={bi} className="pt-4 text-2xl font-semibold tracking-tight text-ink">
              {inline(block.slice(3), `h2-${bi}`)}
            </h2>
          );
        }
        if (block.startsWith("### ")) {
          return (
            <h3 key={bi} className="text-lg font-semibold text-ink">
              {inline(block.slice(4), `h3-${bi}`)}
            </h3>
          );
        }
        if (block.startsWith("> ")) {
          return (
            <blockquote
              key={bi}
              className="border-l-2 border-brand pl-4 text-lg italic text-ink"
            >
              {inline(block.replace(/^> /gm, ""), `q-${bi}`)}
            </blockquote>
          );
        }
        if (lines.every((l) => l.startsWith("- "))) {
          return (
            <ul key={bi} className="space-y-2 pl-1">
              {lines.map((l, li) => (
                <li key={li} className="flex gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  <span>{inline(l.slice(2), `ul-${bi}-${li}`)}</span>
                </li>
              ))}
            </ul>
          );
        }
        if (lines.every((l) => /^\d+\.\s/.test(l))) {
          return (
            <ol key={bi} className="space-y-2">
              {lines.map((l, li) => (
                <li key={li} className="flex gap-3">
                  <span className="font-mono text-sm font-semibold text-brand">{li + 1}.</span>
                  <span>{inline(l.replace(/^\d+\.\s/, ""), `ol-${bi}-${li}`)}</span>
                </li>
              ))}
            </ol>
          );
        }
        return (
          <p key={bi}>{inline(block, `p-${bi}`)}</p>
        );
      })}
    </div>
  );
}
