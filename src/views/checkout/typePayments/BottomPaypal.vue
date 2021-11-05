<template>

    <PayPal
    amount="30.00"
    currency="USD"
    :client="paypal"
    :dev="true"
    :invoiceNumber="invoiceNumber"
    :items="items">
    </PayPal>
</template>

<script>
import PayPal from '@/views/checkout/typePayments/PayPalCheckout.vue'


import shortid from 'shortid'

export default {
  name: 'app',
  data () {
    return {
      msg: 'PayPal Checkout Component',
      credentials:{
      sandbox: "ARrBAN8iES1k4vvxfEb8HdqlqFXFKEFvI9uNdgrl0ahAPKJFJMMOapfqoZuSZBBCYTOA4E1Syn2Wq4V8", 
      production: "AVZhosFzrnZ5Mf3tiOxAD0M6NHv8pcB2IFNHAfp_h69mmbd-LElFYkJUSII3Y0FPbm7S7lxBuqWImLbl"},
      invoiceNumber: shortid.generate(),
      items: [
        {
          "name": "hat",
          "description": "Brown hat.",
          "quantity": "5",
          "price": "3",
          "currency": "USD"
        },
        {
          "name": "handbag",
          "description": "Black handbag.",
          "quantity": "1",
          "price": "15",
          "currency": "USD"
        }
      ]
    }
  },
  computed: {
    paypal: function () {
      if (this.credentials) {
        return this.credentials
      } else {
        return null
      }
    }
  },
  components: {
    PayPal
  },
  async mounted() {
    console.log("credentials:",this.credentials);
  }
}
</script>

<style>
.content-checkoutprofile .zoid-outlet{
  max-width:300px !important;
  width:100% !important;
}
</style>
