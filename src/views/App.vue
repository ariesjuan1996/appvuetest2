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
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.paypal-button {
  display: block;
  max-width: 150px;
  margin: 0 auto;
}
</style>
