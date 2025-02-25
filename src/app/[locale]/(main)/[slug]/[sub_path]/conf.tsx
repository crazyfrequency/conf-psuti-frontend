'use client'

import { useCurrentLocale } from "@/locales/client";
import { useTheme } from "next-themes";
import { useRef, useState } from "react";

export default function Conf() {
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const { resolvedTheme } = useTheme();
  const locale = useCurrentLocale();

  return (
    <div>
      
    </div>
  );
}
