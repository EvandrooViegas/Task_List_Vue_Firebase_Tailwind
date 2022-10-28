

<script lang="ts">
  import { db } from "../../firebase/firebase"
  import {collection, DocumentData, getDocs, deleteDoc, doc} from "firebase/firestore"
  import ITasks from '../../types/ITasks'
  import Form from '../Components/Form.vue'
  //icons
  import { Icon } from '@iconify/vue';
    export default {
    data() {
      return {
        tasksCollectionRef: collection(db, "tasks"),
        tasks: [] as ITasks[] | DocumentData[],
        isLoading: true as boolean,
        isFormClosed: true
      }
    },

    methods: {
      async getTasks() {
        const data = await getDocs(this.tasksCollectionRef)
        
        return data.docs.map((doc) => ({
          ...doc.data(), 
          id: doc.id
        }))
      },

      async removeTask(id:string) {
        const taskDocRef = doc(db, "tasks", id)
        await deleteDoc(taskDocRef)
        await this.refresh()
        console.log("done")
      },

      async refresh() {
        this.isLoading = true

        const data = await this.getTasks()
        this.tasks = data

        this.isLoading = false

      }
    },

    
    async mounted() {
      this.tasks = await this.getTasks()
      this.isLoading = false

    },

    

    components: {
      Form,
      Icon
    },
  }

  

</script>

<template>

    <div v-show="isFormClosed">
      <Form 
        @refresh="refresh"
      />
    </div>



    <div class="p-2 w-full flex justify-center">
      <span v-if="isFormClosed" @click="isFormClosed = false" class="text-center cursor-pointer">
        <Icon icon="dashicons:arrow-down-alt2" />
      </span>
      


      <span v-else @click="isFormClosed = true" class="text-center cursor-pointer">
        <Icon icon="dashicons:arrow-down-alt2" />
      </span>
    </div>  

    <div v-if="isLoading" class="text-6xl text-center w-screen animate-spin">
      ⚡
    </div>
    <div class="flex flex-col" v-else>
      <div v-for="task in tasks" :key="task.id" class="group flex flex-col justify-center w-full cursor-pointer">
          <router-link :to="{name: 'Description', params: { id: task.id }}">
         <div class="flex justify-between group  p-4 items-center border-b border-gray-200 bg-gray-50 hover:bg-gray-100">
             
             <span class="py-3 px-6 text-left">
                 
                     <span class="font-semibold text-lg">{{ task.text }}</span>
                 
             </span>
             <span class="hidden sm:flex truncate w-[40%]">
               {{ task.description }}
             </span>
 
             <div>
               <span v-if="task.category == 'work'" class="py-3 px-6 text-center">
                 <span class="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">{{ task.category }}</span>
               </span>
 
               <span v-else-if="task.category == 'other'" class="py-3 px-6 text-center">
                 <span class="bg-blue-200 text-blue-600 py-1 px-3 rounded-full text-xs">{{ task.category }}</span>
               </span>
 
               <span v-else-if="task.category == 'personal'" class="py-3 px-6 text-center">
                 <span class="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">{{ task.category }}</span>
               </span>
             </div>
 
             <span class="py-3 px-6 text-left">
                 <span class="text-neutral-400">{{ task.date }}</span>
             </span>
            </div>
          </router-link>
          <span class="absolute bg-neutral-200 shadow rounded-md hidden right-10 py-3 px-6  text-center 
          group-hover:flex justify-center">
              <div class="flex item-center justify-center">
          
                  <div class="w-4 mr-2 transform hover:text-red-700 hover:scale-110" @click="removeTask(task.id)">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                  </div>
              </div>
          </span>
      
      </div>
    </div>
    

 


</template>
