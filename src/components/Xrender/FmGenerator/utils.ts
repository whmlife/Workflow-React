export interface FormateScheamReturnType {
  uId: string
  type: string
  title: string
  isCondition?: boolean | 0 | 1
  componentProps: any
}

export interface PropertiesComponentType {
  type: string
  title: string
  isCondition?: boolean | 0 | 1
  format: string
  properties: PropertiesType
  componentType: string
}

interface PropertiesType {
  [key: string]: PropertiesComponentType
}
export interface GeneratorSchemaType {
  properties: PropertiesType
}

/**
 * 对表单设计器的组件（除布局组件）进行类型处理，后端需要的类型字符串，
 * 对时间的类型dataRange就将componentType和format加‘_’拼接,和date和textarea直接用format属性
 * @enum
 */
function dealComponentType(params: PropertiesComponentType): string {
  let typeString = params.format
    ? `${params.componentType ? `${params.componentType}_${params.format}` : `${params.format}`} `
    : `${params.componentType}`

  return typeString
}
/**
 * 对表单设计器导出的数据进行处理，导出后端需要的格式
 * @enum
 */
export function formateScheam<T extends GeneratorSchemaType>(schema: T): FormateScheamReturnType[] {
  let schemaArray: FormateScheamReturnType[] = []
  findComponet(schema.properties)
  function findComponet(properties: PropertiesType) {
    if (!properties) {
      return
    }
    for (let key in properties) {
      if (properties[key].type !== 'object') {
        // 过滤出非布局的组件
        schemaArray.push({
          uId: key,
          type: dealComponentType(properties[key]),
          title: properties[key].title,
          isCondition: properties[key].isCondition ? 1 : 0,
          componentProps: JSON.stringify(properties[key]) // 流程设置时候条件分支用的数据可以直接中Xrender.FmFormRender渲染
        })
      }
      if (properties[key].type === 'object') {
        // 过滤出布局的组件继续向下找
        findComponet(properties[key].properties)
      }
    }
  }
  return schemaArray
}
