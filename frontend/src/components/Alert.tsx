import React from 'react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';

function Alert({ message, isOpen, setIsOpen }: {
  message: string;
  isOpen: boolean;
  setIsOpen: any;
}) {
  // const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <span>{message}</span>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='teal' mr={3} onClick={() => setIsOpen(false)}>
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default Alert;
