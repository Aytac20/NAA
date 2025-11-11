import {
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Link as LinkIcon,
  Eraser,
} from "lucide-react";
import { Toggle } from "../ui/toggle";
import { Editor } from "@tiptap/react";
import { RiParagraph } from "react-icons/ri";

export default function MenuBar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  const options = [
    {
      icon: <Bold className="size-4" />,
      active: editor.isActive("bold"),
      action: () => editor.chain().focus().toggleBold().run(),
    },
    {
      icon: <Italic className="size-4" />,
      active: editor.isActive("italic"),
      action: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      icon: <Underline className="size-4" />,
      active: editor.isActive("underline"),
      action: () => editor.chain().focus().toggleUnderline().run(),
    },
    {
      icon: <Heading1 className="size-4" />,
      active: editor.isActive("heading", { level: 1 }),
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      icon: <Heading2 className="size-4" />,
      active: editor.isActive("heading", { level: 2 }),
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      icon: <Heading3 className="size-4" />,
      active: editor.isActive("heading", { level: 3 }),
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
      icon: <RiParagraph className="size-4" />,
      active:
        editor.isActive("paragraph") &&
        !editor.isActive({ textAlign: "center" }) &&
        !editor.isActive({ textAlign: "right" }),
      action: () => editor.chain().focus().setParagraph().run(),
    },
    {
      icon: <AlignLeft className="size-4" />,
      active: editor.isActive({ textAlign: "left" }),
      action: () => editor.chain().focus().setTextAlign("left").run(),
    },
    {
      icon: <AlignCenter className="size-4" />,
      active: editor.isActive({ textAlign: "center" }),
      action: () => editor.chain().focus().setTextAlign("center").run(),
    },
    {
      icon: <AlignRight className="size-4" />,
      active: editor.isActive({ textAlign: "right" }),
      action: () => editor.chain().focus().setTextAlign("right").run(),
    },
    {
      icon: <List className="size-4" />,
      active: editor.isActive("bulletList"),
      action: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      icon: <ListOrdered className="size-4" />,
      active: editor.isActive("orderedList"),
      action: () => editor.chain().focus().toggleOrderedList().run(),
    },
    {
      icon: <LinkIcon className="size-4" />,
      active: editor.isActive("link"),
      action: () => {
        const url = prompt("Enter URL");
        if (url) editor.chain().focus().setLink({ href: url }).run();
      },
    },
    {
      icon: <Eraser className="size-4" />,
      active: false,
      action: () => editor.chain().focus().unsetAllMarks().clearNodes().run(),
    },
  ];

  return (
    <div className="border-b rounded-t-md p-1 mb-2 bg-[#ececf04c] flex flex-wrap gap-1">
      {options.map((opt, i) => (
        <Toggle key={i} pressed={opt.active} onPressedChange={opt.action}>
          {opt.icon}
        </Toggle>
      ))}
    </div>
  );
}
