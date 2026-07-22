export const DEFAULT_ANNUAL_INTEREST_RATE = 2.4

export function calculateMonthlyInterestProjection(
  principal: number,
  annualRatePercent = DEFAULT_ANNUAL_INTEREST_RATE
) {
  if (principal <= 0 || annualRatePercent <= 0) return 0

  return Number((principal * (annualRatePercent / 100 / 12)).toFixed(2))
}

export function calculateDailyInterestProjection(
  principal: number,
  annualRatePercent = DEFAULT_ANNUAL_INTEREST_RATE
) {
  if (principal <= 0 || annualRatePercent <= 0) return 0

  return Number((principal * (annualRatePercent / 100 / 365)).toFixed(2))
}
