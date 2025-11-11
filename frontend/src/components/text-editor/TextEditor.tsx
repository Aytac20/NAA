import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import MenuBar from "./MenuBar";

const TextEditor = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) => {
  const editor = useEditor({
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-4",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-4",
          },
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],

    editorProps: {
      attributes: {
        class: "min-h-[245px] p-4 outline-none ",
      },
    },
  });

  return (
    <div className="border border-[#f7f7f7] p-5 rounded-[12px] gap-4 flex flex-col">
      <div className="flex gap-1 flex-col">
        {" "}
        <label className="text-[14px] ">HTML Content</label>
        <p className="text-[14px] text-[#717182]">
          Use the toolbar to format your text with bold, italic, headers, lists,
          and more.
        </p>
      </div>
      <div className="border border-[#00000019] rounded-2xl">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TextEditor;
