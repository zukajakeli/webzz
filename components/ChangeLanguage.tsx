"use client"
import styled from "@emotion/styled"
import { Button } from "@mui/material"
import { useLocale, useTranslations } from "next-intl"
import { useRouter } from "next/navigation"

const StyledButton = styled(Button)``

function ChangeLanguage() {
  const router = useRouter()
  // const t = useTranslations("Homepage")
  const locale = useLocale()
  return (
    <StyledButton
      variant="contained"
      onClick={() => {
        router.push(`/${locale === "he" ? "en" : "he"}`)
      }}
    >
      {/* {t("hello")} */}
      hello
    </StyledButton>
  )
}

export default ChangeLanguage
