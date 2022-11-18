export const config = {
  text: '下拉单选',
  name: 'DebounceSelect',
  schema: {
    title: '下拉单选',
    componentType: 'DebounceSelect',
    type: 'string',
    enum: [],
    enumNames: [],
    widget: 'DebounceSelect',
    readOnlyWidget: 'DebounceSelectRead'
  },
  setting: {
    isCondition: { title: '分支条件选项', type: 'boolean', widget: 'switch' },
    props: {
      title: '选项',
      type: 'object',
      labelWidth: 80,
      properties: {
        allowClear: {
          title: '是否带清除按钮',
          description: '填写内容后才会出现x哦',
          type: 'boolean'
        }
      }
    },
    default: { title: '默认选项的值', type: 'string' },
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
    fetchDataKey: { title: '远程列表字段', type: 'string' },
    lebalName: { title: '标签字段名', type: 'string', description: '默认是name', default: 'name' },
    valueName: { title: '值字段名', type: 'string', description: '默认是id', default: 'id' }
  }
}
