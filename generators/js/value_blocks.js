//
// Implement Boolean values.
//
Blockly.JavaScript['value_boolean'] = (block) => {
  const value = block.getFieldValue('VALUE')
  const order = Blockly.JavaScript.ORDER_NONE
  const code = `(row) => (${value})`
  return [code, order]
}

//
// Create code to access a column by name.
//
Blockly.JavaScript['value_column'] = (block) => {
  const column = block.getFieldValue('COLUMN')
  if (! column) {
    throw new Error(`[block ${block.tbId}] empty column name`)
  }
  const code = `(row) => tbGet(${block.tbId}, row, '${column}')`
  return [code, Blockly.JavaScript.ORDER_ATOMIC]
}

//
// Create code for constant date/time block.
//
Blockly.JavaScript['value_datetime'] = (block) => {
  const value = Blockly.JavaScript.quote_(block.getFieldValue('VALUE'))
  const code = `(row) => new Date(${value})`
  return [code, Blockly.JavaScript.ORDER_ATOMIC]
}

//
// Create code for numeric constant block.
//
Blockly.JavaScript['value_number'] = (block) => {
  const value = parseFloat(block.getFieldValue('VALUE'))
  const order = (value >= 0)
        ? Blockly.JavaScript.ORDER_ATOMIC
        : Blockly.JavaScript.ORDER_UNARY_NEGATION
  const code = `(row) => (${value})`
  return [code, order]
}

//
// Create code for text constant block.
//
Blockly.JavaScript['value_text'] = (block) => {
  const value = Blockly.JavaScript.quote_(block.getFieldValue('VALUE'))
  const code = `(row) => ${value}`
  return [code, Blockly.JavaScript.ORDER_ATOMIC]
}

//
// Create code for uniform random value block.
//
Blockly.JavaScript['value_uniform'] = (block) => {
  const low = parseFloat(block.getFieldValue('VALUE_1'))
  if (Number.isNaN(low)) {
    throw new Error(`[block ${block.tbId}] low value is not a number`)
  }
  const high = parseFloat(block.getFieldValue('VALUE_2'))
  if (Number.isNaN(high)) {
    throw new Error(`[block ${block.tbId}] high value is not a number`)
  }
  const code = `(row) => tbUniform(${block.tbId}, ${low}, ${high})`
  return [code, Blockly.JavaScript.ORDER_ATOMIC]
}
