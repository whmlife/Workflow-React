interface FormDataType {
  [key: string]: any
}

interface FormateFormDataReturn {
  uId: string
  value: any
  realValue: string
}
/**
 * 把formData转成后端需要的[uId:"", value:""]
 *
 */
export function formateFormData(formData: FormDataType): FormateFormDataReturn[] {
  console.log(formData, 'formateFormData')
  let data: FormateFormDataReturn[] = []
  for (let key in formData) {
    data.push({
      uId: key,
      value: Array.isArray(formData[key]) ? formData[key] : [formData[key]],
      realValue: JSON.stringify(formData[key])
    })
  }
  return data
}
