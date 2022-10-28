<script lang="ts" setup>
    
    //types
    import ITasks from '../../types/ITasks'
    //components
    import Popup from './Popup.vue'
    //vue
    import {ref, reactive, watch, defineComponent} from "vue"
    //firebase
    import { collection, addDoc, updateDoc, doc } from "firebase/firestore"
    import { db } from '../../firebase/firebase'

    
    
    //firebase
    const taskCollectionRef = collection(db, "tasks")

    //others
    let newTask = {
        text: "",
        description: "",
        date: "",
        category: "",
        image: "",
        id: ""
    } as ITasks

    //defines
    const emit = defineEmits(['refresh'])
    defineComponent([Popup])

    //reactive variables
    const text = ref<string>("")
    const description = ref<string>("")
    const date = ref<string>("")
    const category = ref<string>("")
    const image = ref<string>("")

    const msg = ref({
        type: "",
        text: ""
    })
       
    async function createTask() {
        if(text.value, category.value) {
            newTask = {
                text: text.value,
                description: description.value,
                date: date.value,
                category: category.value,
                image: image.value,
                isDone: false,
            }
      
            msg.value = {
                text: "New Task added",
                type: "suc"
            }

            const res = await addDoc(taskCollectionRef, newTask)
            const ref = doc(db, "tasks", res.id)
            await updateDoc(ref, {
                id: res.id
            })
            emit('refresh')
        } else {
      
            msg.value = {
                text: "Error - Text or Category inputs are empty",
                type: "err"
            }
        }
    }

    watch(msg, () => {
        setTimeout(() => {
            msg.value = {
                text: "",
                type: ""
            }
        }, 3000)
    })
     
    
</script>


<template>
       
    <div class="w-full mt-10 mx-auto  h-full sm:mt-0">
        <div v-if="msg.text.length > 0">
            <Popup  :msg="msg"/>
        </div>
        
    <div class="w-full  md:grid md:grid-cols-3 md:gap-6">
        <div class="mt-5 w-full md:col-span-2 md:mt-0">
        <form action="#" method="POST" class="w-full">
            <div class="overflow-hidden flex-col m-auto justify-center w-screen sm:rounded-md">
                <div class="bg-white w-full px-4 py-5 sm:p-6">
                    <div class="grid grid-cols-6 gap-6 justify-center m-auto w-full">


                    <div class="col-span-6 sm:col-span-6">
                        <label for="first-name" class="block text-sm font-medium text-gray-700">Text</label>
                        <input v-model="text" type="text" name="first-name" id="first-name" autocomplete="given-name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" >
                    </div>

                

                    <div class="col-span-6 sm:col-span-6">
                        <label for="email-address" class="block text-sm font-medium text-gray-700">Description</label>
                        <textarea v-model="description" type="text" name="email-address" id="email-address" autocomplete="email" class="resize-none overflow-hidden mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">

                        </textarea>
                    </div>
                    <div class="col-span-6">
                        <label for="street-address" class="block text-sm font-medium text-gray-700">Image (optional)</label>
                        <input v-model="image" type="text" name="street-address" id="street-address" autocomplete="street-address" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                        <label for="country" class="block text-sm font-medium text-gray-700">Category</label>
                        <select v-model="category" id="country" name="country" autocomplete="country-name" class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                            <option value="work">Work</option>
                            <option value="personal">Personal</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                        <label for="country" class="block text-sm font-medium text-gray-700">Due Date</label>
                        <input v-model="date" type="date" name="street-address" id="street-address" autocomplete="street-address" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                    </div>


                    </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button @click.prevent="createTask" class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button>
                </div>
            </div>
        </form>
        </div>
    </div>
    </div>

</template>


