'use client'

import Editor from "@/components/editor";
import { useAuth } from "@/components/layout/providers/auth-provider";
import { AUTH_PAGES } from "@/constants/pages.constants";
import { useRouter } from "next-nprogress-bar";
import { usePathname } from "next/navigation";

export default function EditClient() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();

  if (user === "unauthorized") {
    router.replace(AUTH_PAGES.LOGIN(pathname));
  }

  return (
    <div>
      <Editor />
    </div>
  )
}
