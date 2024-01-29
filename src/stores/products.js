import { defineStore } from "pinia";
import { computed, ref, onMounted } from 'vue'
import { useFirestore, useCollection } from 'vuefire'
import { addDoc, collection, query, orderBy } from 'firebase/firestore'

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
    categoryOptions,
    products
  }
})