'use client'

import Editor from "@/components/editor";
import { useAuth } from "@/components/layout/providers/auth-provider";
import { useRouter } from "next-nprogress-bar";
import { usePathname } from "next/navigation";

export default function EditClient() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();

  // if (user === "unauthorized") {
  //   router.replace(AUTH_PAGES.LOGIN(pathname));
  // }

  return (
    <div data-disable-nprogress={true}>
      <Editor />
    </div>
  )
}
