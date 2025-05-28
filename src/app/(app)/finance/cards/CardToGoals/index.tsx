'use client'

import React from 'react'
import { blueShades } from '@/utils/colors'
import { Card } from '@/components'

const goals = [
  {
    name: 'Comprr Casa',
    current: 16814.61,
    target: 42000,
    color: blueShades.blue500
  },
  {
    name: 'Renda fixa',
    current: 16400.00,
    target: 30000,
    color: blueShades.blue700
  },
  {
    name: 'Investimentos',
    current:  1206.29,
    target: 10000,
    color: blueShades.blue300
  }
]

const CardToGoals = () => {
  return (
    <Card
      title="Seus Objetivos"
      className="max-w-md min-h-[320px] mb-2 lg:mb-4"
    >
      <div className="flex flex-row justify-between items-end gap-2 w-full px-1">
        {goals.map((goal) => {
          const percent = Math.min((goal.current / goal.target) * 100, 100)
          return (
            <div
              key={goal.name}
              className="flex flex-col items-center flex-1 bg-gray-800/70 rounded-xl shadow-lg p-2 border border-gray-700 min-w-[70px] max-w-[90px] w-full"
            >
              <span className="text-[10px] text-gray-300 mb-1 font-medium whitespace-nowrap">
                {goal.target.toLocaleString('pt-PT', {
                  style: 'currency',
                  currency: 'EUR'
                })}
              </span>
              <div className="relative flex flex-col justify-end h-32 w-6 bg-gray-900 rounded-lg overflow-hidden shadow-inner border border-gray-700">
                <div
                  className={`absolute bottom-0 left-0 w-full rounded-b-lg transition-all duration-700 ${goal.color} shadow-lg`}
                  style={{ height: `${percent}%` }}
                />
                <span className="absolute top-1 left-1/2 -translate-x-1/2 text-[10px] text-white font-bold drop-shadow">
                  {percent.toFixed(0)}%
                </span>
              </div>
              <span className="text-[10px] text-gray-200 mt-1 font-semibold whitespace-nowrap">
                {goal.current.toLocaleString('pt-PT', {
                  style: 'currency',
                  currency: 'EUR'
                })}
              </span>
              <span className="text-[10px] text-gray-400 mt-1 text-center max-w-[60px]">
                {goal.name}
              </span>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
export default CardToGoals
