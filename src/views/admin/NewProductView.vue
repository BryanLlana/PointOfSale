<script setup>
import Link from '@/components/Link.vue'
import { useImage } from '@/composables/useImage'
import { useProductsStore } from '@/stores/products'
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
const { onFileChange, url, isImageUploaded } = useImage()
const productStore = useProductsStore()
const router = useRouter()

const product = reactive({
  name: '',
  image: '',
  category: '',
  price: '',
  availability: ''
})

const handleSubmit = async data => {
  const { image, ...values } = data
  
  try {
    await productStore.createProduct({
      ...values,
      image: url.value
    })
    router.push({ name: 'products' })
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="pb-5">
    <Link to="products">Volver</Link>
    <h1 class="text-4xl font-black my-10">Nuevo Producto</h1>
    
    <div class="flex justify-center bg-white shadow">
      <div class="py-7 px-7 w-full 2xl:w-2/4">
        <FormKit
          type="form"
          submit-label="Agregar Producto"
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
          />
          <FormKit 
            type="file"
            label="Imagen Producto"
            name="image"
            validation="required"
            :validation-messages="{required: 'La imagen es obligatorio'}"
            accept=".jpg"
            @change="onFileChange"
            v-model="product.image"
          />
          <div v-if="isImageUploaded" class="pl-5 opacity-70">
            <p class="font-black">Imagen Recibida: </p>
            <img :src="url" alt="Imagen Subida" class="w-[250px]">
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