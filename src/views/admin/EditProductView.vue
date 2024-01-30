<script setup>
import Link from '@/components/Link.vue'
import { useImage } from '@/composables/useImage'
import { useProductsStore } from '@/stores/products'
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useFirestore, useDocument } from 'vuefire'
import { doc } from 'firebase/firestore'
import { watch } from 'vue';
const productStore = useProductsStore()
const { onFileChange, url, isImageUploaded } = useImage()
const router = useRouter()
const route = useRoute()
const firestore = useFirestore()

const { id } = route.params
const productRef = doc(firestore, 'products', id)
const productFirestore = useDocument(productRef)
let urlGetImage = ''

const product = reactive({
  name: '',
  image: '',
  category: '',
  price: '',
  availability: ''
})

watch(productFirestore, (productFirestore) => {
  if (!productFirestore) {
    router.push({ name: 'products' })
  }
  Object.assign(product, productFirestore)
  urlGetImage = product.image
})

const handleSubmit = async data => {
  try {
    await productStore.updateProduct(productRef, { ...data, urlGetImage, url })
    router.push({ name: 'products' })
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="pb-5">
    <Link to="products">Volver</Link>
    <h1 class="text-4xl font-black my-10">Editar Producto</h1>
    
    <div class="flex justify-center bg-white shadow">
      <div class="py-7 px-7 w-full 2xl:w-2/4">
        <FormKit
          type="form"
          submit-label="Guardar Cambios"
          incomplete-message="No se pudo enviar"
          @submit="handleSubmit"
        >
          <FormKit 
            type="text"
            label="nombre"
            name="name"
            placeholder="Ejm: Camisa Basement"
            validation="required"
            :validation-messages="{required: 'El nombre es obligatorio'}"
            v-model.trim="product.name"
            :value="product.name"
          />
          <FormKit 
            type="file"
            label="Cambiar Imagen"
            name="image"
            accept=".jpg"
            multiple="false"
            @change="onFileChange"
            v-model="product.image"
          />
          <div v-if="isImageUploaded" class="pl-5 opacity-70">
            <p class="font-black">Imagen Recibida:</p>
            <img :src="url" alt="Nueva imagen Producto" class="w-[250px]"/>  
          </div>
          <div v-else class="pl-5 opacity-70">
              <p class="font-black">Imagen Actual:</p>
              <img :src="urlGetImage" :alt="'Imagen de' + product.name" class="w-[250px]" />  
          </div>
          <FormKit 
            type="select"
            label="Categoría"
            name="category"
            validation="required"
            :validation-messages="{required: 'La categoría es obligatorio'}"
            :options="productStore.categoryOptions"
            v-model.number="product.category"
          />
          <FormKit 
            type="number"
            label="Precio"
            name="price"
            validation="required"
            :validation-messages="{required: 'El precio es obligatorio'}"
            min="1"
            v-model.number="product.price"
          />
          <FormKit 
            type="number"
            label="Cantidad Disponible"
            name="availability"
            validation="required"
            :validation-messages="{required: 'La cantidad es obligatorio'}"
            min="1"
            v-model.number="product.availability"
          />
        </FormKit>
      </div>
    </div>
  </div>
</template>