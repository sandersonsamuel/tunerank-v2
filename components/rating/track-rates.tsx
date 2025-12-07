"use client"

import { getTrackRates } from "@/api/hooks/queries/track-rates"
import { DataChartRateReview, TrackRatesReview } from "@/types/rate"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CircleStar, Star } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  trackId: string
}

export const TrackRates = ({ trackId }: Props) => {
  const { data: rates } = useQuery({
    queryKey: ["track-rates", trackId],
    queryFn: () => getTrackRates(trackId),
    enabled: !!trackId
  })

  if (rates) {
    return (
      <Card className="w-full max-w-[500px] text-slate-500 gap-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-center font-normal">Avaliações de outros usuários</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rates.data}>
                <XAxis
                  dataKey="rating"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  cursor={{ fill: 'transparent' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-3 shadow-sm outline-0">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col">
                              <span className="text-[0.70rem]">
                                Avaliação
                              </span>
                              <span className="font-bold text-center">
                                {payload[0].payload.rating}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[0.70rem]">
                                Avaliações
                              </span>
                              <span className="font-bold text-center">
                                {payload[0].value}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Bar
                  dataKey="count"
                  fill="var(--color-primary)"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2 items-center justify-end">
          {
            !Number.isNaN(rates.avarege) ? (
              <p className={cn("text-xl", rates.avarege < 3 ? "text-red-400" : rates.avarege >= 3 && rates.avarege < 4 ? "text-yellow-400" : rates.avarege >= 4 ? "text-blue-400" : "text-gray-400")}>{rates.avarege.toFixed(1)}</p>
            ) : (
              <p className={cn("text-sm", "text-gray-400")}>{"Seja o primeiro a avaliar"}</p>
            )
          }
          <CircleStar className={cn(rates.avarege < 3 ? "text-red-400" : rates.avarege >= 3 && rates.avarege < 4 ? "text-yellow-400" : rates.avarege >= 4 ? "text-blue-400" : "text-gray-400")} />
        </CardFooter>
      </Card>
    )
  }
}