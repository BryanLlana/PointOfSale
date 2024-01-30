import { defineStore } from "pinia";
import { computed } from 'vue'
import { useFirestore, useCollection } from 'vuefire'
import { addDoc, updateDoc, collection, query, orderBy } from 'firebase/firestore'

export const useProductsStore = defineStore('product', () => {
  const firestore = useFirestore()
  const categoryes = [
    { id: 1, name: 'Sudaderas' },
    { id: 2, name: 'Tenis' },
    { id: 3, name: 'Lentes' }
  ]

  const q = query(
    collection(firestore, 'products'),
    orderBy('availability', 'asc')
  )
  const products = useCollection(q)


  const createProduct = async product => {
    try {
      await addDoc(collection(firestore, 'products'), product)
    } catch (error) {
      console.log(error)
    }
  }

  const updateProduct = async (ref, product) => {
    try {
      if (product.url.value.length) {
        const { image, urlGetImage, url, ...values } = product
        await updateDoc(ref, { ...values, image: product.url.value })
      } else {
        const { image, urlGetImage, url, ...values } = product
        await updateDoc(ref, { ...values, image: urlGetImage})
      }
    } catch (error) {
      console.log(error)
    }
  }

  const categoryOptions = computed(() => {
    return [
      { label: '--Selecccione--', value: '', attrs: { disabled: true} },
      ...categoryes.map(category => {
        return {
          label: category.name,
          value: category.id
        }
      })
    ]
  })

  return {
    createProduct,
    updateProduct,
    categoryOptions,
    products
  }
})