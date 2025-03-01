import React from 'react'
import numeral from 'numeral'
function CurrencyForamt({amount}) {
const formattedAmount=numeral(amount).format("$0,0.00")

  return (
    <div>
      {formattedAmount}
    </div>
  )
}

export default CurrencyForamt
