import { ArrowsCounterClockwise } from '@phosphor-icons/react'
import { Heading, CardHeader } from '@chakra-ui/react'

interface HeaderProps {
  title: string
  onRefresh: () => void
}

export const Header = ({ title, onRefresh }: HeaderProps) => (
  <CardHeader display="flex" justifyContent="space-between" pb={0}>
    <Heading size="md">{title}</Heading>
    <button type="button" onClick={onRefresh} className="hover:text-gray-400">
      <ArrowsCounterClockwise
        size={20}
        color="#eee2e2"
        className="hover:opacity-75"
      />
    </button>
  </CardHeader>
)
