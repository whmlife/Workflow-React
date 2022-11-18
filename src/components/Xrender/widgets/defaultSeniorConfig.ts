export const defaultSeniorConfig = {
  seniorDateRange: {
    text: '日期范围',
    name: 'dateRange',
    schema: {
      title: '日期范围',
      type: 'range',
      componentType: 'dateRange',
      format: 'dateTime',
      props: {
        placeholder: ['开始时间', '结束时间']
      }
    },
    setting: {
      isCondition: { title: '分支条件选项', type: 'boolean', widget: 'switch' },
      format: {
        title: '类型',
        type: 'string',
        enum: ['dateTime', 'date'],
        enumNames: ['日期时间', '日期']
      }
    }
  }
}
