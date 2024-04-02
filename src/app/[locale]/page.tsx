import ChangeLanguage from "@/components/ChangeLanguage"
import { Metadata } from "next"

// Seo metadata
export const metadata: Metadata = {
  title: "",
  description: "",
}

export default function Index() {
  return <ChangeLanguage />
}
