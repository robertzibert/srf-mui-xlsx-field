import React from 'react'
import { Field } from 'simple-react-form'
import XLSX from 'xlsx-browserify-shim'
import File from 'simple-react-form-material-ui/lib/file'
/* global FileReader */

export default class XlsxField extends React.Component {

  parseXls ({file, onProgress, onReady, onError}) {
    const reader = new FileReader()

    reader.onload = e => {
      const data = e.target.result
      const woorkBook = XLSX.read(data, {type: 'binary'})
      const firstSheetName = woorkBook.SheetNames[0]
      const sheetCells = woorkBook.Sheets[firstSheetName]
      const information = XLSX.utils.sheet_to_json(sheetCells)
      this.props.onChange(information)
    }
    reader.readAsBinaryString(file)
  }

  render () {
    return (
      <Field
        fieldName={this.props.fieldName}
        upload={this.parseXls.bind(this)}
        onChange={this.props.onChange}
        type={File} />
    )
  }
}
