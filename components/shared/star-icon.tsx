interface Props extends React.HTMLAttributes<HTMLImageElement> {
  size?: "sm" | "md" | "lg"
  active?: boolean
  className?: string
}

export const StarIcon = ({ size = "md", active = false, className, ...props }: Props) => {

  const sizes = {
    sm: "6",
    md: "8",
    lg: "10"
  }

  return (
    <img src={active ? "2.svg" : "1.svg"} alt="star icon" className={`size-${sizes[size]} ${className}`} {...props} />
  )
}