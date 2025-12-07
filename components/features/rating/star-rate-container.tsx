"use client"

import { Dispatch, SetStateAction, useState } from "react"
import { StarItem } from "./star-rate"

type Props = {
  setRate: Dispatch<SetStateAction<number>>
  rate: number
}

export const StarRatingInput = ({ setRate, rate }: Props) => {
  const [rateHover, setRateHover] = useState(0)

  const setRateHandler = (index: number, type: "hover" | "click") => {
    if (type === "hover") {
      setRateHover(index)
    } else {
      if (rate === index) {
        setRate(0)
        setRateHover(0)
      } else {
        setRate(index)
      }
    }
  }

  return (
    <div className="flex gap-2">
      {
        Array.from({ length: 5 }, (_, index) => index + 1).map((index) => (
          <StarItem key={index} index={index} rateHandler={setRateHandler} rateHover={rateHover} rate={rate} />
        ))
      }
    </div>
  )
}