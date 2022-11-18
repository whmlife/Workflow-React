/*
 * input输入框校验检验选择
 */
import { useCallback } from 'react'
import { Radio } from 'famc'
const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' }
]
function InputValidation() {
  const handleChange = useCallback(() => {}, [])
  return <Radio.Group options={options} onChange={handleChange} optionType="button" />
}

export default InputValidation
