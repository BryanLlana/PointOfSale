import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useCartStore } from './cart'

export const useCouponStore = defineStore('coupon', () => {
  const cartStore = useCartStore()
  const couponInput = ref('')
  const validationMessage = ref('')
  const discountPercentage = ref(0)
  const discount = ref(0)
  const VALID_COUPONS = [
    { name: '10DESCUENTO', discount: .10 },
    { name: '20DESCUENTO', discount: .20 }
  ]

  watch(discountPercentage, () => {
    discount.value = ((cartStore.subTotal + cartStore.taxes) * discountPercentage.value).toFixed(2)
  })

  const $reset = () => {
    couponInput.value = '',
    validationMessage.value = '',
    discountPercentage.value = '',
    discount.value = ''
  }

  const applyCoupon = () => {
    if (VALID_COUPONS.some(coupon => coupon.name === couponInput.value)) {
      discountPercentage.value = VALID_COUPONS.find(coupon => coupon.name === couponInput.value).discount
      validationMessage.value = 'Descuento aplicado'
    } else {
      validationMessage.value = 'Cupón no válido'
    }

    setTimeout(3000, () => {
      validationMessage.value = ''
    })
  }

  return {
    couponInput,
    applyCoupon,
    validationMessage,
    discount,
    $reset
  }
})