import React from 'react'

const Payment = () => {
  return (
    <div>
        <script async
  src="https://js.stripe.com/v3/buy-button.js">
</script>

<stripe-buy-button
  buy-button-id="buy_btn_1RwKoXSCI0fjC4XjlMtLh14e"
  publishable-key="pk_test_51PEDC6SCI0fjC4XjRSkbf33QZSGfqs55LkXXWKzTbROJ5JfYAoQaHkl1Sy8tjui6g1GuwKyQ60ug2HtLCfqyWrCl00u6YWffCJ"
>
</stripe-buy-button>
    </div>
  )
}

export default Payment