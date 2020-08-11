'use strict'

const Blockly = require('blockly/blockly_compressed')

const {
  ORDER_NONE,
  valueToCode,
  Messages
} = require('./helpers')

/**
 * Lookup table for message strings.
 */
const MESSAGES = {
  arithmetic: {
    tooltip: {
      en: 'do arithmetic',
      es: 'haz la aritmética',
      ar: 'إجراء عمليات حسابيه',
      ko: '연산 실행', 
      it. 'eseguire la aritmentica'
    }
  },
  negate: {
    tooltip: {
      en: 'negate a numeric column',
      es: 'excluye una columna numerica',
      ar: 'الغاء عمود حسابي',
      ko: '숫자열 취소', 
      it: 'escludere una colonna numerica'
    }
  },
  abs: {
    tooltip: {
      en: 'absolute value of a numeric column',
      es: 'FIXME',
      ar: 'القيمه المطلقه لعمود حسابي',
      ko: '숫자열의 절대값',
      it: 'valore assoluto di una colonna numerica'
    }
  },
  compare: {
    tooltip: {
      en: 'compare two columns',
      es: 'compara dos columnas',
      ar: 'مقارنه عمودين',
      ko: '두 열을 비교',
      it: 'comparare due colonne'
    }
  },
  logical: {
    tooltip: {
      en: 'combine logical values of two columns',
      es: 'combina los valores logicos de dos columnas',
      ar: 'دمج القيم المنطقيه لعمودين',
      ko: '두 열의 논리 변수를 결합',
      it: 'combinare i valori logici di due colonne'
    }
  },
  not: {
    message0: {
      en: 'not %1',
      es: 'no %1',
      ar: 'غير %1',
      ko: '논리 부정 %1',
      it: 'no %1'
    },
    tooltip: {
      en: 'negate a logical column',
      es: 'excluye una columna numerica',
      ar: 'إلغاء عمود منطقي',
      ko: '논리 열 취소',
      it: 'escludere una colonna logica'
    }
  },
  type: {
    message0: {
      en: '%1 is %2 ?',
      es: '¿Es %1 %2 ?',
      ar: 'هل %1 هو %2؟',
      ko: '%1 은 %2 ?',
      it: '%1 è %2'
    },
    tooltip: {
      en: 'check the type of a value',
      es: 'comprueba el tipo de valor',
      ar: 'التعرف على نوع القيمه',
      ko: '값의 유형을 확인',
      it: 'controlla il tipo di valore'
    }
  },
  convert: {
    message0: {
      en: '%1 to %2',
      es: '%1 a %2',
      ar: 'من %1 إلي %2',
      ko: '%1 에서 %2',
      it: '%1 a %2'
    },
    tooltip: {
      en: 'change the datatype of a value',
      es: 'cambia el tipo de dato del valor',
      ar: 'تغيير نوع القيمه',
      ko: '값의 데이터 유형을 변경',
      it: 'cambiare il tipo di dato di un valore'
    }
  },
  datetime: {
    message0: {
      en: 'get %1 from %2',
      es: 'obten %1 de %2',
      ar: 'الحصول على %1 من %2',
      ko: '%2 에서 %1 가져오기',
      it: 'ottieni %1 da %2'
    },
    tooltip: {
      en: 'change the datatype of a value',
      es: 'cambia el tipo de dato del valor',
      ar: 'تغيير نوع القيمه',
      ko: '값의 데이터 유형을 변경',
      it: 'cambiare il tipo di dato di un valore' 
    }
  },
  conditional: {
    message0: {
      en: 'If %1 then %2 else %3',
      es: 'Si %1 entonces %2 sino %3',
      ar: 'إذا %1 افعل %2 غير ذلك %3',
      ko: '%1 이면 %2 그렇지 않으면 %3', 
      it: 'se %1 allora %2 altrimenti %3'
    },
    tooltip: {
      en: 'select value based on condition',
      es: 'selecciona el valor basandote en la condicion',
      ar: 'اختيار قيمه توافي شرط',
      ko: '조건에  값을 선택', 
      it: 'seleziona il valore in base alla condizione'
    }
  }
}

/**
 * Define operation blocks.
 * @param {string} language Two-letter language code to use for string lookups.
 */
const setup = (language) => {
  const msg = new Messages(MESSAGES, language, 'en')
  Blockly.defineBlocksWithJsonArray([
    // Binary arithmetic
    {
      type: 'op_arithmetic',
      message0: '%1 %2 %3',
      args0: [
        {
          type: 'input_value',
          name: 'LEFT'
        },
        {
          type: 'field_dropdown',
          name: 'OP',
          options: [
            ['+', 'add'],
            ['-', 'subtract'],
            ['\u00D7', 'multiply'],
            ['\u00F7', 'divide'],
            ['%', 'remainder'],
            ['^', 'power']
          ]
        },
        {
          type: 'input_value',
          name: 'RIGHT'
        }
      ],
      inputsInline: true,
      output: 'Number',
      style: 'op_block',
      tooltip: msg.get('arithmetic.tooltip'),
      helpUrl: './op/#arithmetic'
    },

    // Arithmetic negation
    {
      type: 'op_negate',
      message0: '- %1',
      args0: [
        {
          type: 'input_value',
          name: 'VALUE'
        }
      ],
      inputsInline: true,
      output: 'Number',
      style: 'op_block',
      tooltip: msg.get('negate.tooltip'),
      helpUrl: './op/#negate'
    },

    // Absolute value
    {
      type: 'op_abs',
      message0: 'abs %1',
      args0: [
        {
          type: 'input_value',
          name: 'VALUE'
        }
      ],
      inputsInline: true,
      output: 'Number',
      style: 'op_block',
      tooltip: msg.get('abs.tooltip'),
      helpUrl: './op/#abs'
    },

    // Comparisons
    {
      type: 'op_compare',
      message0: '%1 %2 %3',
      args0: [
        {
          type: 'input_value',
          name: 'LEFT'
        },
        {
          type: 'field_dropdown',
          name: 'OP',
          options: [
            ['=', 'equal'],
            ['\u2260', 'notEqual'],
            ['\u200F<', 'less'],
            ['\u200F\u2264', 'lessEqual'],
            ['\u200F>', 'greater'],
            ['\u200F\u2265', 'greaterEqual']
          ]
        },
        {
          type: 'input_value',
          name: 'RIGHT'
        }
      ],
      inputsInline: true,
      output: 'Boolean',
      style: 'op_block',
      tooltip: msg.get('compare.tooltip'),
      helpUrl: './op/#compare'
    },

    // Binary logical operations
    {
      type: 'op_logical',
      message0: '%1 %2 %3',
      args0: [
        {
          type: 'input_value',
          name: 'LEFT'
        },
        {
          type: 'field_dropdown',
          name: 'OP',
          options: [
            ['and', 'and'],
            ['or', 'or']
          ]
        },
        {
          type: 'input_value',
          name: 'RIGHT'
        }
      ],
      inputsInline: true,
      output: 'Boolean',
      style: 'op_block',
      tooltip: msg.get('logical.tooltip'),
      helpUrl: './op/#logical'
    },

    // Logical negation
    {
      type: 'op_not',
      message0: msg.get('not.message0'),
      args0: [
        {
          type: 'input_value',
          name: 'VALUE'
        }
      ],
      inputsInline: true,
      output: 'Boolean',
      style: 'op_block',
      tooltip: msg.get('not.tooltip'),
      helpUrl: './op/#not'
    },

    // Type checking
    {
      type: 'op_type',
      message0: msg.get('type.message0'),
      args0: [
        {
          type: 'input_value',
          name: 'VALUE'
        },
        {
          type: 'field_dropdown',
          name: 'TYPE',
          options: [
            ['date', 'isDatetime'],
            ['logical', 'isLogical'],
            ['missing', 'isMissing'],
            ['number', 'isNumber'],
            ['text', 'isText']
          ]
        }
      ],
      inputsInline: true,
      output: 'Boolean',
      style: 'op_block',
      tooltip: msg.get('type.tooltip'),
      helpUrl: './op/#type'
    },

    // Type conversion
    {
      type: 'op_convert',
      message0: msg.get('convert.message0'),
      args0: [
        {
          type: 'input_value',
          name: 'VALUE'
        },
        {
          type: 'field_dropdown',
          name: 'TYPE',
          options: [
            ['logical', 'toLogical'],
            ['datetime', 'toDatetime'],
            ['number', 'toNumber'],
            ['string', 'toText']
          ]
        }
      ],
      inputsInline: true,
      output: 'Number',
      style: 'op_block',
      tooltip: msg.get('convert.tooltip'),
      helpUrl: './op/#convert'
    },

    // Datetime conversions
    {
      type: 'op_datetime',
      message0: msg.get('datetime.message0'),
      args0: [
        {
          type: 'field_dropdown',
          name: 'TYPE',
          options: [
            ['year', 'toYear'],
            ['month', 'toMonth'],
            ['day', 'toDay'],
            ['weekday', 'toWeekDay'],
            ['hours', 'toHours'],
            ['minutes', 'toMinutes'],
            ['seconds', 'toSeconds']
          ]
        },
        {
          type: 'input_value',
          name: 'VALUE'
        }
      ],
      inputsInline: true,
      output: 'Number',
      style: 'op_block',
      tooltip: msg.get('datetime.tooltip'),
      helpUrl: './op/#datetime'
    },

    // Conditional
    {
      type: 'op_conditional',
      message0: msg.get('conditional.message0'),
      args0: [
        {
          type: 'input_value',
          name: 'COND'
        },
        {
          type: 'input_value',
          name: 'LEFT'
        },
        {
          type: 'input_value',
          name: 'RIGHT'
        }
      ],
      inputsInline: true,
      output: 'Boolean',
      style: 'op_block',
      tooltip: msg.get('conditional.tooltip'),
      helpUrl: './op/#conditional'
    }
  ])

  // Binary arithmetic
  Blockly.TidyBlocks['op_arithmetic'] = (block) => {
    const op = block.getFieldValue('OP')
    const left = valueToCode(block, 'LEFT')
    const right = valueToCode(block, 'RIGHT')
    const code = `["@op", "${op}", ${left}, ${right}]`
    return [code, ORDER_NONE]
  }

  // Arithmetic negation
  Blockly.TidyBlocks['op_negate'] = (block) => {
    const value = valueToCode(block, 'VALUE')
    const code = `["@op", "negate", ${value}]`
    return [code, ORDER_NONE]
  }

  // Absolute value
  Blockly.TidyBlocks['op_abs'] = (block) => {
    const value = valueToCode(block, 'VALUE')
    const code = `["@op", "abs", ${value}]`
    return [code, ORDER_NONE]
  }

  // Comparisons
  Blockly.TidyBlocks['op_compare'] = (block) => {
    const op = block.getFieldValue('OP')
    const left = valueToCode(block, 'LEFT')
    const right = valueToCode(block, 'RIGHT')
    const code = `["@op", "${op}", ${left}, ${right}]`
    return [code, ORDER_NONE]
  }

  // Binary logical operations
  Blockly.TidyBlocks['op_logical'] = (block) => {
    const op = block.getFieldValue('OP')
    const left = valueToCode(block, 'LEFT')
    const right = valueToCode(block, 'RIGHT')
    const code = `["@op", "${op}", ${left}, ${right}]`
    return [code, ORDER_NONE]
  }

  // Logical negation
  Blockly.TidyBlocks['op_not'] = (block) => {
    const value = valueToCode(block, 'VALUE')
    const code = `["@op", "not", ${value}]`
    return [code, ORDER_NONE]
  }

  // Type checking
  Blockly.TidyBlocks['op_type'] = (block) => {
    const type = block.getFieldValue('TYPE')
    const value = valueToCode(block, 'VALUE')
    const code = `["@op", "${type}", ${value}]`
    return [code, ORDER_NONE]
  }

  // Type conversion
  Blockly.TidyBlocks['op_convert'] = (block) => {
    const type = block.getFieldValue('TYPE')
    const value = valueToCode(block, 'VALUE')
    const code = `["@op", "${type}", ${value}]`
    return [code, ORDER_NONE]
  }

  // Datetime conversions
  Blockly.TidyBlocks['op_datetime'] = (block) => {
    const type = block.getFieldValue('TYPE')
    const value = valueToCode(block, 'VALUE')
    const code = `["@op", "datetime", "${type}", ${value}]`
    return [code, ORDER_NONE]
  }

  // Conditional
  Blockly.TidyBlocks['op_conditional'] = (block) => {
    const cond = valueToCode(block, 'COND')
    const left = valueToCode(block, 'LEFT')
    const right = valueToCode(block, 'RIGHT')
    const code = `["@op", "ifElse", ${cond}, ${left}, ${right}]`
    return [code, ORDER_NONE]
  }
}

module.exports = {
  setup
}
