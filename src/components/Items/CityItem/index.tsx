// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import { ReactElement } from "react"

import { DeleteButton } from "@components/ActionButtons/DeleteButton"
import { EditButton } from "@components/ActionButtons/EditButton"
import { Item } from "@components/ListItem"

interface CityItemProps {
  city: City
  onEdit: (city: City) => void
  onDelete: (CityId: string) => Promise<void>
}

export const CityItem = ({ city, onEdit, onDelete }: CityItemProps) => {
  const isEditAuthorized = true
  const isDeleteAuthorized = true

  return (
    <Item<City> title={city?.name} description={city?.state}>
      <Item.Actions item={city}>
        {
          (isEditAuthorized && (
            <EditButton onClick={onEdit} label={city.name} />
          )) as ReactElement
        }
        {
          (isDeleteAuthorized && (
            <DeleteButton onClick={() => onDelete(city.id)} label={city.name} />
          )) as ReactElement
        }
      </Item.Actions>
    </Item>
  )
}
