"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="h-9 w-9 cursor-pointer hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:scale-110 active:scale-95"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-500 ease-in-out dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-500 ease-in-out dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
