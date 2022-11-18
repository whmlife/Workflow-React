/**
 * componentType是前后端约定的组件类型，如果有添加需要告之后端, 也是移动端解析所需要的重点类型
 */

export const defaultBaseConfig = {
  // 基本输入框
  baseInput: {
    text: '输入框',
    name: 'input',
    schema: {
      title: '输入框',
      componentType: 'input',
      type: 'string'
    },
    setting: {
      isCondition: { title: '分支条件选项', type: 'boolean', widget: 'switch' },
      default: { title: '默认值', type: 'string', props: { placeholder: '填写默认值' } },
      maxLength: { title: '最长字数', type: 'number', props: { placeholder: '填写最长字数' } },
      minLength: { title: '最短字数', type: 'number', props: { placeholder: '填写最短字数' } },
      pattern: { title: '校验正则表达式', type: 'string', props: { placeholder: '填写正则表达式' } },
      props: {
        title: '选项',
        type: 'object',
        labelWidth: 80,
        properties: {
          allowClear: {
            title: '是否带清除按钮',
            description: '填写内容后才会出现x哦',
            type: 'boolean'
          },
          addonBefore: {
            title: '前tab',
            type: 'string'
          },
          addonAfter: {
            title: '后tab',
            type: 'string'
          },
          prefix: {
            title: '前缀',
            type: 'string'
          },
          suffix: {
            title: '后缀',
            type: 'string'
          }
        }
      }
    }
  },
  // textarea输入框
  baseTextArea: {
    text: '大输入框',
    name: 'textarea',
    schema: {
      title: '编辑框',
      type: 'string',
      format: 'textarea'
    },
    setting: {
      isCondition: { title: '分支条件选项', type: 'boolean', widget: 'switch' },
      default: { title: '默认值', type: 'string', props: { placeholder: '填写默认值' } },
      props: {
        title: '选项',
        type: 'object',
        // labelWidth: 80,
        properties: {
          autoSize: {
            title: '高度自动',
            type: 'boolean'
          },
          rows: {
            title: '指定高度',
            type: 'number'
          }
        }
      },
      maxLength: { title: '最长字数', type: 'number', props: { placeholder: '填写最长字数' } },
      minLength: { title: '最短字数', type: 'number', props: { placeholder: '填写最短字数' } },
      pattern: {
        title: '校验正则表达式',
        type: 'string',
        props: {
          placeholder: '填写正则表达式'
        }
      }
    }
  },
  baseDate: {
    text: '日期选择',
    name: 'date',
    schema: {
      title: '日期选择',
      type: 'string',
      format: 'date'
    },
    setting: {
      isCondition: { title: '分支条件选项', type: 'boolean', widget: 'switch' },
      format: {
        title: '格式',
        type: 'string',
        enum: ['dateTime', 'date', 'time'],
        enumNames: ['日期时间', '日期', '时间']
      }
    }
  },
  baseumber: {
    text: '数字输入框',
    name: 'number',
    schema: {
      title: '数字输入框',
      componentType: 'number',
      type: 'number'
    },
    setting: {
      isCondition: { title: '分支条件选项', type: 'boolean', widget: 'switch' },
      props: {
        title: '选项',
        type: 'object',
        labelWidth: 80,
        properties: {
          step: {
            title: '步数',
            type: 'number'
          },
          max: {
            title: '最大值',
            type: 'number'
          },
          min: {
            title: '最小值',
            type: 'number'
          }
        }
      },
      default: {
        title: '默认值',
        type: 'number',
        props: { placeholder: '填写默认值' }
      }
    }
  },
  baseCheckbox: {
    text: '是否选择',
    name: 'checkbox',
    schema: {
      title: '是否选择',
      type: 'boolean',
      componentType: 'checkbox',
      widget: 'checkbox'
    },
    setting: {
      isCondition: { title: '分支条件选项', type: 'boolean', widget: 'switch' },
      default: {
        title: '是否默认勾选',
        type: 'boolean'
      }
    }
  },
  baseSwitch: {
    text: '是否switch',
    name: 'switch',
    schema: {
      title: '是否选择',
      componentType: 'switch',
      type: 'boolean',
      widget: 'switch'
    },
    setting: {
      isCondition: { title: '分支条件选项', type: 'boolean', widget: 'switch' },
      default: {
        title: '是否默认开启',
        type: 'boolean'
      }
    }
  }
}
