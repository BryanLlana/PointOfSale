import { useFirebaseStorage } from 'vuefire'
import { v4 as uuid } from 'uuid'
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { ref, computed } from 'vue'

export const useImage = () => {
  const storage = useFirebaseStorage()
  const url = ref('')

  const onFileChange = e => {
    const file = e.target.files[0]
    const fileName = `${uuid()}.jpg`
    const refFile = storageRef(storage, '/products/' + fileName)
    const uploadImage = uploadBytesResumable(refFile, file)
    uploadImage.on('state_changed', 
      () => {},
      error => console.log(error),
      () => {
        getDownloadURL(uploadImage.snapshot.ref)
          .then(urlImage => {
            url.value = urlImage
          })
      }
    )
  }

  const isImageUploaded = computed(() => {
    return url.value ? url.value : null
  })

  return {  
    onFileChange,
    url,
    isImageUploaded
  }
}