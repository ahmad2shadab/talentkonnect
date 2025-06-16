import Link from "next/link"

export function Logo({ size = "default" }: { size?: "small" | "default" | "large" }) {
  const sizeClasses = {
    small: "text-lg",
    default: "text-2xl",
    large: "text-4xl",
  }

  return (
    <Link href="/" className="flex items-center">
      <div className="flex items-center">
        <LogoIcon className={`h-${size === "small" ? "6" : size === "large" ? "10" : "8"} w-auto mr-2`} />
        <div className={`font-bold ${sizeClasses[size]}`}>
          <span className="text-primary-blue">talent</span>
          <span className="text-accent-orange">konnect</span>
        </div>
      </div>
    </Link>
  )
}

function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M8 4L16 12L24 4L28 8L20 16L28 24L24 28L16 20L8 28L4 24L12 16L4 8L8 4Z" fill="#1D3557" />
      <path d="M16 12L24 4L28 8L20 16L16 12Z" fill="#E76F51" />
      <path d="M16 20L8 28L4 24L12 16L16 20Z" fill="#E76F51" />
    </svg>
  )
}
