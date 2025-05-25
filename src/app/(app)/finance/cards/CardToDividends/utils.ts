export const formattedDividendsData = (dividendsData: any[]) => {
  const formatData = dividendsData
    ? dividendsData?.reduce(
        (acc: any, curr: any) => {
          const month = new Date(curr.paidOn).toLocaleString('default', {
            month: 'short'
          })
          const existingMonth = acc.find((item: any) => item.name === month)
          if (existingMonth) {
            existingMonth.value += curr.amountInEuro
          } else {
            acc.push({
              name: month,
              value: curr.amountInEuro,
              fill: 'hsl(var(--chart-1))'
            })
          }
          return acc
        },
        [] as { name: string; value: number; fill: string }[]
      )
    : []

  return formatData.sort((a: any, b: any) => {
    const monthA = new Date(Date.parse(a.name + ' 1, 2000')).getMonth()
    const monthB = new Date(Date.parse(b.name + ' 1, 2000')).getMonth()
    return monthA - monthB
  })
}

export const chartConfig = {
  value: {
    label: 'Valor Mês',
    color: 'hsl(var(--chart-1))'
  }
}
