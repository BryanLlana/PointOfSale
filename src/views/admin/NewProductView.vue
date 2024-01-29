<script setup>
import Link from '@/components/Link.vue'
import { useImage } from '@/composables/useImage'
const { onFileChange, url, isImageUploaded } = useImage()
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
        >
          <FormKit 
            type="text"
            label="nombre"
            name="name"
            placeholder="Ejm: Camisa Basement"
            validation="required"
            :validation-messages="{required: 'El nombre es obligatorio'}"
          />
          <FormKit 
            type="file"
            label="Imagen Producto"
            name="image"
            validation="required"
            :validation-messages="{required: 'La imagen es obligatorio'}"
            accept=".jpg"
            @change="onFileChange"
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
            :options="[1, 2, 3]"
          />
          <FormKit 
            type="number"
            label="Precio"
            name="price"
            validation="required"
            :validation-messages="{required: 'El precio es obligatorio'}"
            min="1"
          />
          <FormKit 
            type="number"
            label="Cantidad Disponible"
            name="availability"
            validation="required"
            :validation-messages="{required: 'La cantidad es obligatorio'}"
            min="1"
          />
        </FormKit>
      </div>
    </div>
  </div>
</template>