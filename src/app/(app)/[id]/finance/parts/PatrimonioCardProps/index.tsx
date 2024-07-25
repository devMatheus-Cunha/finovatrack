import { formatCurrencyMoney } from '@/utils/formatNumber'
import { Card, CardHeader, Heading, Text } from '@chakra-ui/react'

interface PatrimonioCardProps {
  sumTotalCurrency: number | string
  primaryCurrency: string // Tipo da moeda principal (ex: 'BRL', 'USD')
  isVisibilityData: boolean
}

const PatrimonioCard: React.FC<PatrimonioCardProps> = ({
  sumTotalCurrency = 0,
  primaryCurrency,
  isVisibilityData
}) => {
  return (
    <Card width="100%" h="max-content">
      <CardHeader>
        <Heading
          size="md"
          display="flex"
          alignItems="center"
          gap={1}
          alignSelf="end"
        >
          Patrimônio atual:{' '}
          <Text
            alignSelf="end"
            fontStyle="italic"
            textDecoration="underline"
            textDecorationColor="green"
          >
            {formatCurrencyMoney(
              Number(sumTotalCurrency) || 0,
              primaryCurrency,
              isVisibilityData
            )}
          </Text>
        </Heading>
      </CardHeader>
    </Card>
  )
}

export default PatrimonioCard
