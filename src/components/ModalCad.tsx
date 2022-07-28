import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

export const ModalCad = () => {
  type FormProps = {
    name: string;
    description: string;
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    handleSubmit,
    register,
    reset,
    formState: {},
  } = useForm<FormProps>();

  const onSubmit: SubmitHandler<FormProps> = (data) => {
    console.log(JSON.stringify(data));
    toast('A categoria ' + data.name + ' foi cadastrada', {
      position: 'top-left',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    reset();
  };

  return (
    <>
      <Box fontFamily={'Overpass ,sans-serif'}>
        <Button
          bg={'primary'}
          color={'white'}
          margin={'0 auto'}
          boxShadow={'dark-lg'}
          marginTop={'1em'}
          borderRadius={'90px'}
          h={'2em'}
          onClick={onOpen}
          // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
          _hover={{
            color: 'white',
            bg: 'primary',
            boxShadow: 'xl',
          }}>
          <Text mt='0.25em' noOfLines={1}>
            NOVA CATEGORIA DE PROBLEMA
          </Text>
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size={'xl'}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader
              textAlign={'center'}
              fontSize={'3xl'}
              fontFamily={'Overpass ,sans-serif'}>
              Nova Categoria de Problema
            </ModalHeader>

            <ModalBody fontFamily={'Overpass ,sans-serif'}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box w={'50%'} m={'0 auto'}>
                  <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input
                      borderRadius={'8px'}
                      size={'sm'}
                      placeholder='Nome'
                      {...register('name')}
                    />
                  </FormControl>

                  <FormControl isRequired mt={'24px'}>
                    <FormLabel>Descrição</FormLabel>
                    <Input
                      borderRadius={'8px'}
                      size={'sm'}
                      placeholder='Descrição'
                      {...register('description')}
                    />
                  </FormControl>
                </Box>

                <ModalFooter
                  justifyContent={'center'}
                  mt={'60px'}>
                  <Button
                    colorScheme=''
                    bg='InfoBackground'
                    color='black'
                    mr={'30px'}
                    onClick={onClose}
                    border={'1px'}
                    borderColor={'black'}
                    borderRadius={'50px'}
                    fontSize={'medium'}>
                    Cancelar
                  </Button>
                  <Button
                    variant='ghost'
                    bg='primary'
                    color={'white'}
                    type='submit'
                    borderRadius={'50px'}
                    boxShadow={'dark-lg'}>
                    <Text fontSize={'smaller'}>
                      REGISTRAR CATEGORIA DE<p></p> PROBLEMA
                    </Text>
                  </Button>
                </ModalFooter>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};
