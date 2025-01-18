'use client'

import { TResponseResult } from "@/api/error";
import { useCurrentLocale } from "@/locales/client";
import { TConf } from "@/types/conf.types";
import { useTheme } from "next-themes";
import { useRef, useState } from "react";

export default function Conf({
  response
}: Readonly<{
  response: TResponseResult<TConf>
}>) {
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const { resolvedTheme } = useTheme();
  const locale = useCurrentLocale();

  return (
    <div>

    </div>
  );
}
