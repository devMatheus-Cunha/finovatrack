import React from 'react'

interface Goal {
  name: string
  current: number
  target: number
  color: string
}

interface GoalsListProps {
  goals: Goal[]
  currency: string
  isVisibilityData: boolean
  formatCurrencyMoney: (
    value: number,
    currency: string,
    isVisibilityData: boolean
  ) => string
}

const GoalsList: React.FC<GoalsListProps> = ({
  goals,
  currency,
  isVisibilityData,
  formatCurrencyMoney
}) => (
  <div className="flex flex-row justify-center items-end gap-2 w-full">
    <div className="flex flex-col gap-2 w-full">
      {goals.map((goal) => {
        const percent = Math.min(
          (Number(goal.current || 0) / goal.target) * 100,
          100
        )
        return (
          <div
            key={goal.name}
            className="flex flex-row items-center justify-between bg-gray-800/50 rounded-xl shadow-lg p-2 border border-gray-700 w-full min-h-[60px] gap-2"
          >
            <div className="flex flex-col items-start flex-1">
              <span className="text-[10px] text-gray-400 font-medium mb-1">
                {goal.name}
              </span>
              <span className="text-[15px] text-gray-300 font-semibold">
                {formatCurrencyMoney(
                  goal.current || 0,
                  currency,
                  isVisibilityData
                )}
              </span>
              <span className="text-[10px] text-gray-400">
                Meta:{' '}
                {formatCurrencyMoney(goal.target, currency, isVisibilityData)}
              </span>
            </div>
            <div className="relative flex flex-col justify-end h-10 w-24 bg-gray-800/50 rounded-lg overflow-hidden shadow-inner border border-gray-700 mx-2">
              <div
                className={`absolute bottom-0 left-0 h-full rounded-b-lg transition-all duration-700 ${goal.color} shadow-lg`}
                style={{ width: `${percent}%` }}
              />
              <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[10px] text-white font-bold drop-shadow">
                {percent.toFixed(0)}%
              </span>
            </div>
          </div>
        )
      })}
    </div>
  </div>
)

export default GoalsList
