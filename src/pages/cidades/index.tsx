import { useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Button, HStack, useDisclosure } from "@chakra-ui/react"

import { RefreshButton } from "@components/ActionButtons/RefreshButton"
import { CityItem } from "@components/Items/CityItem"
import { ListView } from "@components/List"
import { CityModal } from "@components/Modals/CityModal"
import { PageHeader } from "@components/PageHeader"
import { apiCities } from "@services/apiCities"

const ListaCidades = () => {
  const isCreateAuthorized = true
  const isValidating = false
  const [isLoading, setIsLoading] = useState(false)
  const [cities, setCities] = useState<City[]>([])

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [cityToEdit, setCityToEdit] = useState<City>()

  async function getCities() {
    setIsLoading(true)

    try {
      const response = await apiCities.get<City[]>(
        `${process.env.NEXT_PUBLIC_GERENCIADOR_DE_LOCALIDADES_URL}/cities`
      )

      setCities(response.data)
    } catch (err) {
      console.log(err)
      toast.error("Não foi possível carregar os dados das cidades")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getCities()
  }, [])

  // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
  const mutate = async () => {
    getCities()
  }

  const onDelete = useCallback(async (cityId: string) => {
    try {
      await apiCities.delete(
        `${process.env.NEXT_PUBLIC_GERENCIADOR_DE_LOCALIDADES_URL}/cities/${cityId}`
      )

      getCities()

      toast.success("Cidade removida com sucesso!")
    } catch {
      toast.error("Não foi possível remover a cidade. Tente novamente!")
    }
  }, [])

  // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
  const onSubmit = () => {
    getCities()
  }

  const onEdit = useCallback(
    (city: City) => {
      setCityToEdit(city)
      onOpen()
    },
    [onOpen]
  )

  const handleClose = useCallback(() => {
    setCityToEdit(undefined)
    onClose()
  }, [onClose])

  const renderCityItem = useCallback(
    (city: City) => (
      <CityItem city={city} onEdit={onEdit} onDelete={onDelete} />
    ),
    [onDelete, onEdit]
  )

  return (
    <>
      <PageHeader title="Cidades Cadastradas">
        <HStack spacing={2}>
          <RefreshButton refresh={mutate} />
          {isCreateAuthorized && <Button onClick={onOpen}>Nova Cidade</Button>}
        </HStack>
      </PageHeader>

      <ListView<City>
        items={cities}
        render={renderCityItem}
        isLoading={isLoading || isValidating}
      />

      <CityModal
        isOpen={isOpen}
        onClose={handleClose}
        onSubmit={onSubmit}
        city={cityToEdit}
      />
    </>
  )
}

export default ListaCidades
