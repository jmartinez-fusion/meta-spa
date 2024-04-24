import { type FC, useState } from 'react'
import { Checkbox, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import c from 'classnames'
import { type CheckboxOption, type CheckBoxOptionProps } from 'components/CheckBoxList/types'
import styles from './checkBoxOption.module.scss'

const showOption = (
  subOptions: CheckboxOption[] | undefined,
  checked: boolean,
  disabled: boolean
): boolean => !subOptions && disabled && !checked
const isCheckedOption = (selectedOptionIds: string[], id: string | undefined): boolean =>
  !!(id && selectedOptionIds.includes(id))

const CheckBoxOption: FC<CheckBoxOptionProps> = ({
  option,
  selectedOptionIds = [],
  handleChange,
  disabled = false,
}) => {
  const { id, subOptions } = option
  const checked = isCheckedOption(selectedOptionIds, id)
  const [expanded, setExpanded] = useState(true)

  const handleAccordionChange = (): void => {
    setExpanded((prevExpanded) => !prevExpanded)
  }

  if (
    showOption(subOptions, checked, disabled) ||
    subOptions?.every((subOption) =>
      showOption(subOption.subOptions, isCheckedOption(selectedOptionIds, subOption.id), disabled)
    )
  ) {
    return null
  }

  return (
    <div className={styles.wrapper}>
      <Accordion expanded={expanded}>
        <AccordionSummary
          onClick={subOptions ? handleAccordionChange : undefined}
          expandIcon={subOptions ? <ExpandMoreIcon /> : null}
        >
          <div className={styles.option}>
            {id && (
              <Checkbox
                disabled={disabled}
                checked={checked}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleChange(id)
                }}
              />
            )}
            <div
              className={c(styles.label, !id && styles.mainLabel)}
              onClick={(e) => {
                if (id) {
                  e.preventDefault()
                  e.stopPropagation()
                  handleChange(id)
                }
              }}
            >
              {option.label}
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className={styles.subOptions}>
            {subOptions?.map((subOption: CheckboxOption, i: number) => (
              <CheckBoxOption
                key={`${option.id}_${subOption.id}_option_${i}`}
                option={subOption}
                selectedOptionIds={selectedOptionIds}
                disabled={disabled}
                handleChange={handleChange}
              />
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default CheckBoxOption
