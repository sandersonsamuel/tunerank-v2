"use client"

import { Dispatch, SetStateAction } from "react"
import { StarRate } from "./star-rate"

type Props = {
  setRate: Dispatch<SetStateAction<number>>
  setRateHover: Dispatch<SetStateAction<number>>
  rate: number
  rateHover: number
}

export const StarRateContainer = ({ setRate, setRateHover, rate, rateHover }: Props) => {

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
          <StarRate key={index} index={index} rateHandler={setRateHandler} rateHover={rateHover} rate={rate} />
        ))
      }
    </div>
  )
}