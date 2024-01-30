import { defineStore } from "pinia";
import { computed, ref } from 'vue'
import { useFirestore, useCollection, useFirebaseStorage } from 'vuefire'
import { addDoc, updateDoc, deleteDoc, collection, query, orderBy, doc, getDoc } from 'firebase/firestore'
import { ref as storageRef, deleteObject } from 'firebase/storage'

export const useProductsStore = defineStore('product', () => {
  const firestore = useFirestore()
  const storage = useFirebaseStorage()
  const categories = [
    { id: 1, name: 'Sudaderas' },
    { id: 2, name: 'Tenis' },
    { id: 3, name: 'Lentes' }
  ]
  const selectedCategory = ref(1)

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

  const deleteProduct = async id => {
    try {
      if (confirm('¿Desea eliminar este producto?')) {
        const productRef = doc(firestore, 'products', id)
        const docsnap = await getDoc(productRef)
        const { image } = docsnap.data()
        const imageRef =  storageRef(storage, image)
        await Promise.all([
          deleteDoc(productRef),
          deleteObject(imageRef)
        ])
      }
    } catch (error) {
      console.log(error)
    }
  }

  const categoryOptions = computed(() => {
    return [
      { label: '--Selecccione--', value: '', attrs: { disabled: true} },
      ...categories.map(category => {
        return {
          label: category.name,
          value: category.id
        }
      })
    ]
  })

  const filteredProducts = computed(() => {
    return products.value
      .filter(product => product.category === selectedCategory.value)
      .filter(product => product.availability > 0)
  })

  return {
    createProduct,
    updateProduct,
    deleteProduct,
    selectedCategory,
    categoryOptions,
    filteredProducts,
    products,
    categories
  }
})