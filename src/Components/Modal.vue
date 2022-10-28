<script setup lang="ts">
    import { doc, updateDoc } from "@firebase/firestore"

    import {onMounted, ref, toRef} from "vue"
    import { db } from "../../firebase/firebase"
    import ITasks from "../../types/ITasks"

    const props = defineProps(["modalOpen", "task"])
    const emit = defineEmits(["update"])

    const modalOpen = ref(props.modalOpen)
    const task = props.task



    const text = ref<string>(task.text)
    const description = ref<string>(task.description)
    const date = ref<string>(task.date)
    const category = ref<string>(task.category)
    const image = ref<string>(task.image)
    const isDone = ref<boolean>(task.isMade)

    const isLoading = ref(false)
    console.log(task.isDone)
    const updateTask = async () => {

        isLoading.value = true
        const updatedTask = {
            text: text.value,
            description: description.value,
            date: date.value,
            category: category.value,
            image: image.value,
            isDone: isDone.value,
        }

        const ref = doc(db, "tasks", task.id)
        await updateDoc(ref, updatedTask)
      
       
        emit("update", {
            modal: false,
            task: updatedTask
        })
        location.reload();

        isLoading.value = false
    }
</script>

<template>
    <section>
       <router-link to="/">
        <button class="px-4 py-2 bg-gray-500 text-white mb-4">Go Back To Home</button>
       </router-link>
  <div
    x-show="modalOpen"
    x-transition
    class="fixed top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90 px-4 py-5"
  >
    <div
      @click="modalOpen = false"
      class="w-full max-w-[570px] rounded-[20px] bg-white py-12 px-8 text-center md:py-[60px] md:px-[70px]"
    >
  
        <form class="flex flex-col gap-4 p-7">
                <div class="flex flex-col">
                        <label for="first-name" class="self-start block text-sm font-medium text-gray-700">Text</label>
                        <input v-model="text" type="text" name="first-name" id="first-name" autocomplete="given-name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" >
                    </div>

                

                    <div class="flex flex-col">
                        <label for="email-address" class="self-start block text-sm font-medium text-gray-700">Description</label>
                        <textarea v-model="description" type="text" name="email-address" id="email-address" autocomplete="email" class="resize-none overflow-hidden mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">

                        </textarea>
                    </div>
                    <div class="flex flex-col">
                        <label for="street-address" class="self-start block text-sm font-medium text-gray-700">Image (optional)</label>
                        <input v-model="image" type="text" name="street-address" id="street-address"  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                    </div>

                    <div class="flex flex-col">
                        <label for="country" class="self-start block text-sm font-medium text-gray-700">Category</label>
                        <select v-model="category" id="country" name="country" autocomplete="country-name" class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                            <option value="work">Work</option>
                            <option value="personal">Personal</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div class="flex flex-col">
                        <label for="country" class="self-start block text-sm font-medium text-gray-700">Due Date</label>
                        <input v-model="date" type="date" name="street-address" id="street-address" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                    </div>
   
                    <div class="flex flex-col">
                        <label for="country" class="self-start block text-sm font-medium text-gray-700">Completed: </label>
                        <input v-model="isDone" type="checkbox"  class="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                       
                    </div>
        </form> 
    
      <div class="-mx-3 flex flex-wrap">
        <div class="w-1/2 px-3">
          <button
            @click="$emit('setModal', false)"
            
            class="text-dark block w-full rounded-lg border border-[#E9EDF9] p-3 text-center text-base font-medium transition hover:border-red-600 hover:bg-red-600 hover:text-white"
          >
            Cancel
          </button>
        </div>
        <div class="w-1/2 px-3">
          <button
            class="text-black bg-primary border-primary block w-full rounded-lg border p-3 text-center text-base font-medium transition hover:bg-opacity-90 bg-blue-500 hover:text-white"
            @click="updateTask()"
            :disabled="isLoading"
            >
           Update
          </button>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<style scoped>
    button[disabled] {
        cursor: wait;
    }
</style>