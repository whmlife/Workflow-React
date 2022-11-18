export const commonSettings = {
  $id: {
    description: '字段名称/英文',
    title: 'ID',
    type: 'string',
    widget: 'idInput',
    rules: [{ pattern: '^#/.+$', message: 'ID 必填' }]
  },
  title: { title: '标题', type: 'string', widget: 'htmlInput' },
  description: { title: '说明', type: 'string', props: { placeholder: '填写说明' } },
  placeholder: { title: '占位符', type: 'string', props: { placeholder: '填写占位符' } },
  required: { title: '必填', type: 'boolean' },
  disabled: { title: '禁用', type: 'boolean' },
  readOnly: { title: '只读', type: 'boolean' },
  hidden: { title: '隐藏', type: 'boolean' },
  width: {
    title: '元素宽度',
    type: 'string',
    widget: 'percentSlider',
    default: '100%'
  },
  labelWidth: {
    title: '标签宽度',
    type: 'string',
    widget: 'percentSlider',
    default: '25%',
    description: '默认值25%'
  }
  // labelWidth: {
  //   description: '默认值120',
  //   max: 400,
  //   title: '标签宽度',
  //   type: 'number',
  //   widget: 'slider',
  //   props: {
  //     hideNumber: true
  //   }
  // }
}

export * from './defaultBaseConfig'

export * from './defaultSeniorConfig'

export * from './defauleLayoutConfig'
