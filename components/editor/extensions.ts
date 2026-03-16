import { StarterKit } from "@tiptap/starter-kit";

// @ts-ignore
export const defaultExtensions = [
  StarterKit.configure({
    heading: {
      HTMLAttributes: {
        class: "font-display font-bold text-white mb-4 mt-8",
      },
      levels: [1, 2, 3],
    },
    codeBlock: {
      HTMLAttributes: {
        class: "bg-neutral-900 border border-neutral-800 rounded-lg p-4 font-mono text-sm text-neutral-300",
      },
    },
    bulletList: {
      HTMLAttributes: {
        class: "list-disc list-outside leading-loose -mt-2 mb-8 pl-8 text-neutral-300",
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: "list-decimal list-outside leading-loose -mt-2 mb-8 pl-8 text-neutral-300",
      },
    },
    blockquote: {
      HTMLAttributes: {
        class: "border-l-4 border-primary-500 pl-4 py-1 flex italic text-neutral-400 my-6 bg-neutral-900/30 rounded-r-lg",
      },
    },
  }),
];
