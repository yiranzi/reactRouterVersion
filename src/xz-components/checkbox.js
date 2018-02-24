import React from 'react'
import {Form, FormCell, CellBody, CellHeader, Checkbox} from 'react-weui'

export default class MyCheckbox extends React.Component {
  constructor (props) {
    super(props)
    let checkboxValue = []
    const {defaultValue} = this.props
    if (defaultValue) {
      for (let i = 0; i < defaultValue.length; i++) {
        checkboxValue.push(defaultValue[i])
      }
    }

    this.state = {
      checkboxValue: checkboxValue
    }
  }
  handleChange (event) {
    const _this = this
    let {checkboxValue} = this.state
    let {value, checked} = event.target

    var index = checkboxValue.indexOf(value)

    if (checked) {
      checkboxValue.push(value)
    } else {
      checkboxValue.splice(index, 1)
    }

    checkboxValue = checkboxValue.sort()

    this.setState({
      checkboxValue: checkboxValue
    }, () => {
      _this.props.onChange(checkboxValue.join(''))
    })
  }
  render () {
    const {name, defaultValue, options, disabled} = this.props
    return (
      <Form checkbox >
        {options.map((item, index) => {
          return (
            <FormCell checkbox key={index}>
              <CellHeader>
                {disabled && (
                  <Checkbox
                    name={name}
                    value={item.value}
                    defaultChecked={defaultValue && defaultValue.indexOf(item.value) >= 0}
                    disabled
                  />
                )}
                {!disabled && (
                  <Checkbox
                    name={name}
                    value={item.value}
                    onClick={(e) => { this.handleChange(e) }}
                    defaultChecked={defaultValue && defaultValue.indexOf(item.value) >= 0}
                  />
                )}
              </CellHeader>
              <CellBody>{item.label}</CellBody>
            </FormCell>
          )
        })}
        <style global jsx>{`
          .weui-cells {
            font-size: 14px !important;
            background-color: transparent !important;
          }
          .weui-cells:before {
            border-top: none !important;
          }
          .weui-cells:after {
            border-bottom: none !important;
          }
          .weui-cell {
            padding: 10px 0 !important;
            align-items: flex-start !important;
          }
          .weui-cell:before {
            border-top: none !important;
          }
          .weui-cells_checkbox .weui-icon-checked {
            position: relative;
          }
          /*复选框方框样式*/
          .weui-cells_checkbox .weui-icon-checked {
            width: 20px;
            height: 20px;
          }
          /*复选框方框未选中样式*/
          .weui-cells_checkbox .weui-icon-checked:before {
            content: '' !important;
            height: 100%;
            width: 100%;
            font-size: 16px;
            border: 1px solid #e5e5e5;
            box-sizing: border-box;
            position: absolute;
            top: 0;
            left: 0;
          }
          .weui-check__label:active {
            background-color: transparent !important;
          }
          /*复选框方框选中样式*/
          .weui-cells_checkbox .weui-check:checked+.weui-icon-checked:before {
            content: '\\EA08' !important;
            height: 100%;
            width: 100%;
            background-color: #117ee9;
            font-size: 16px;
            color: #fff !important;
            border: 1px solid #117ee9;
            box-sizing: border-box;
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .weui-cell__bd {
            margin-left: 1rem;
          }
          [class^="weui-icon-"]:before, [class*=" weui-icon-"]:before {
            margin: 0 !important;
          }
        `}</style>
      </Form>
    )
  }
}
