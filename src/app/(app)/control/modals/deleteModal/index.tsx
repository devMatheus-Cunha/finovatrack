import React from 'react'

import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Button,
  Box,
  Icon,
  Text
} from '@chakra-ui/react'
import { WarningIcon } from '@chakra-ui/icons'

function DeleteModalContent({ onSubmit, onCancel }: any) {
  return (
    <>
      <ModalOverlay />
      <ModalContent display="flex" alignItems="center" flexDir="column" py={5}>
        <ModalBody>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Icon as={WarningIcon} boxSize={14} color="gray.400" mb={4} />
            <Text fontSize="lg" fontWeight="normal" color="gray.400" mb={5}>
              Você tem certeza que deseja deletar?
            </Text>
          </Box>
        </ModalBody>

        <ModalFooter display="flex" gap={3} pt={0}>
          <Button onClick={onCancel} type="button">
            Cancelar
          </Button>
          <Button type="submit" colorScheme="red" onClick={onSubmit}>
            Deletar
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  )
}

export default DeleteModalContent
