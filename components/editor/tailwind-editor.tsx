"use client";

import { EditorContent, EditorRoot, JSONContent } from "novel";
import { useState } from "react";
import { defaultExtensions } from "./extensions";

interface TailwindEditorProps {
  initialValue?: JSONContent;
  onChange: (value: string) => void;
}

export default function TailwindEditor({
  initialValue,
  onChange,
}: TailwindEditorProps) {
  const [content, setContent] = useState<JSONContent | undefined>(initialValue);

  return (
    <div className="relative w-full max-w-screen-md mx-auto">
      <EditorRoot>
        <EditorContent
          initialContent={content}
          extensions={defaultExtensions}
          onUpdate={({ editor }) => {
            setContent(editor.getJSON());
            onChange(editor.getHTML());
          }}
          className="min-h-[500px] w-full bg-neutral-950 p-4 border border-neutral-800 rounded-xl glass shadow-none 
          prose prose-p:text-neutral-300 prose-headings:font-display prose-headings:text-white prose-a:text-primary-400
          focus-visible:outline-none focus:ring-1 focus:ring-primary-500/50 transition-all font-sans"
        />
      </EditorRoot>
    </div>
  );
}
