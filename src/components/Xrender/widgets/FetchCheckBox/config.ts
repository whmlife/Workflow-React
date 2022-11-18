export const config = {
  text: '点击多选',
  name: 'FetchCheckBox',
  schema: {
    title: '点击多选',
    componentType: 'FetchCheckBox',
    type: 'array',
    enum: [],
    enumNames: [],
    widget: 'FetchCheckBox',
    readOnlyWidget: 'FetchCheckBoxRead'
  },
  setting: {
    isCondition: { title: '分支条件选项', type: 'boolean', widget: 'switch' },
    enumList: {
      title: '选项',
      type: 'array',
      widget: 'simpleList',
      className: 'frg-options-list',
      items: {
        type: 'object',
        properties: {
          value: {
            title: '',
            type: 'string',
            className: 'frg-options-input',
            props: {},
            placeholder: '字段'
          },
          label: {
            title: '',
            type: 'string',
            className: 'frg-options-input',
            props: {},
            placeholder: '名称'
          }
        }
      },
      props: {
        hideMove: true,
        hideCopy: true
      }
    },
    isOpenFetch: { title: '是否开启远程数据', type: 'boolean', widget: 'switch' },
    fetchUrl: { title: '加载地址', type: 'string' },
    fetchDataKey: { title: '远程列表字段', type: 'string', default: 'content' },
    lebalName: { title: '标签字段名', type: 'string', description: '默认是name', default: 'name' },
    valueName: { title: '值字段名', type: 'string', description: '默认是id', default: 'id' }
  }
}
