import { cn } from "@/lib/utils"

type Props = {
  index: number
  rateHandler: (index: number, type: "hover" | "click") => void
  rateHover: number
  rate: number
}

export const StarRate = ({ index, rateHandler, rateHover, rate }: Props) => {

  return (
    <div className="flex -space-x-[0.9px]">
      <svg
        onMouseEnter={() => rateHandler(index - 0.5, "hover")}
        onMouseLeave={() => rateHandler(0, "hover")}
        onClick={() => rateHandler(index - 0.5, "click")}
        xmlns="http://www.w3.org/2000/svg"
        width="20" height="40" viewBox="0 0 187.5 374.999991"
        preserveAspectRatio="xMidYMid meet" version="1.0">
        <defs>
          <clipPath id="star-clip-left">
            <path d="M 3 11 L 187 11 L 187 362 L 3 362 Z M 3 11 " clipRule="nonzero" />
          </clipPath>
        </defs>
        <g clipPath="url(#star-clip-left)">
          <path width={25} height={50} className={cn("fill-slate-600 hover:fill-primary transition-colors duration-300 cursor-pointer",
            index - 0.5 <= rate && "fill-primary",
            index - 0.5 > rate && index - 0.5 > rateHover && "fill-slate-600",
            index - 0.5 < rateHover && "fill-primary",
          )} d="M 187.027344 11.65625 C 180.730469 11.65625 175.019531 15.351562 172.441406 21.097656 L 127.402344 121.449219 L 18.042969 133.273438 C 11.78125 133.953125 6.5 138.242188 4.554688 144.230469 C 2.609375 150.21875 4.359375 156.792969 9.027344 161.019531 L 90.550781 234.867188 L 68 342.527344 C 66.710938 348.691406 69.160156 355.039062 74.253906 358.738281 C 79.347656 362.441406 86.140625 362.808594 91.605469 359.675781 L 187.027344 304.960938 Z M 187.027344 11.65625 " fillOpacity="1" fillRule="nonzero" />
        </g>
      </svg>
      <svg
        onMouseEnter={() => rateHandler(index + 0.5, "hover")}
        onMouseLeave={() => rateHandler(0, "hover")}
        onClick={() => rateHandler(index, "click")}
        className="scale-x-[-1]"
        xmlns="http://www.w3.org/2000/svg"
        width="20" height="40" viewBox="0 0 187.5 374.999991"
        preserveAspectRatio="xMidYMid meet" version="1.0">
        <defs>
          <clipPath id="star-clip-right">
            <path d="M 3 11 L 187 11 L 187 362 L 3 362 Z M 3 11 " clipRule="nonzero" />
          </clipPath>
        </defs>
        <g clipPath="url(#star-clip-right)">
          <path className={cn("fill-slate-600 hover:fill-primary transition-colors duration-300 cursor-pointer",
            index <= rate && "fill-primary",
            index > rate && index > rateHover && "fill-slate-600",
            index <= rateHover && "fill-primary"
          )} d="M 187.027344 11.65625 C 180.730469 11.65625 175.019531 15.351562 172.441406 21.097656 L 127.402344 121.449219 L 18.042969 133.273438 C 11.78125 133.953125 6.5 138.242188 4.554688 144.230469 C 2.609375 150.21875 4.359375 156.792969 9.027344 161.019531 L 90.550781 234.867188 L 68 342.527344 C 66.710938 348.691406 69.160156 355.039062 74.253906 358.738281 C 79.347656 362.441406 86.140625 362.808594 91.605469 359.675781 L 187.027344 304.960938 Z M 187.027344 11.65625 " fillOpacity="1" fillRule="nonzero" />
        </g>
      </svg>
    </div>
  )
}