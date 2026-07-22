import test from 'node:test'
import assert from 'node:assert/strict'
import { calculateProjection } from './index'

test('calculates projections with effective daily compounding and monthly contributions', () => {
  const startDate = new Date(2026, 6, 23)

  const result = calculateProjection({
    principal: 33527.48,
    annualRate: 2.4,
    startDate,
    goalDate: { year: 2026, month: 11 },
    monthlyDividends: 9.35,
    financialPlanningYear: [
      {
        id: 'plan-2026',
        year: '2026',
        investments: '0',
        reserve: '0',
        monthlyContributions: '600',
        receivables: '0',
        downPayment: '0',
        homePurchases: '0',
        otherDeductions: '0',
        periodContributions: '6'
      }
    ]
  })

  const finalProjection = result[result.length - 1]

  assert.ok(finalProjection)
  assert.ok(Math.abs(finalProjection.endValue - 37556.6) < 1)
  assert.ok(Math.abs(finalProjection.interestGenerated - 373.02) < 1)
})
