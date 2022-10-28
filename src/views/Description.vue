<script setup lang="ts">
import { useRoute } from 'vue-router';
import { collection, getDocs, query, where } from "firebase/firestore";
import { onMounted, watch } from '@vue/runtime-core';
import { db } from '../../firebase/firebase';
import {ref, reactive} from "vue"
import ITasks from '../../types/ITasks';
import { Icon } from '@iconify/vue';
import Modal from "../Components/Modal.vue"

const router = useRoute()
const taskId = router.params.id
const task = ref<ITasks>()
const modalOpen = ref(false)


//functions
const getTask = async () => {
    const taskRef = collection(db, "tasks")

    const q = query(collection(db, "tasks"), where("id", "==", taskId));
    let res;
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {

        res = doc.data()
    });

    return res
}


onMounted(async () => {
    task.value = await getTask()
})

const setModal = (value:boolean) => {

    modalOpen.value = value
}

const handleUpdate = (value: {modal: boolean, task: any}) => {

    task.value = value.task
    modalOpen.value = value.modal
}

</script>

<template>
    
    <div v-if="modalOpen">
        <Modal 
            @setModal="(value) => setModal(value)"
            @update="(value) => handleUpdate(value)"
            :modalOpen='modalOpen' 
            :task="task"
        />
    </div>


    <section class="bg-white dark:bg-gray-900">
    <div class="container px-6 py-10 mx-auto">
        <router-link to="/">
            <button class="px-4 py-3 mb-4 rounded-md text-white bg-gray-500">Go Back To Home</button>
        </router-link>
        <h1 class="text-5xl font-semibold text-black  lg:text-4xl dark:text-white">{{ task?.text.toUpperCase() }}</h1>

        <div class="mt-8 lg:-mx-6 lg:flex lg:items-center">
            <img class="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96" :src="task?.image">

            <div class="mt-6 flex flex-col gap-5">
                <div>
                    <span class="key">Category: </span>
                    <span class="text-xl">
                        <span v-if="task?.category == 'work'" class="py-3 text-center">
                            <span class="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">{{ task.category }}</span>
                        </span>
            
                        <span v-else-if="task?.category == 'other'" class="py-3 text-center">
                            <span class="bg-blue-200 text-blue-600 py-1 px-3 rounded-full">{{ task.category }}</span>
                        </span>
            
                        <span v-else-if="task?.category == 'personal'" class="py-3  text-center">
                            <span class="p-10 bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">{{ task.category }}</span>
                        </span>
                    </span>
                </div>

                <div>
                    <span class="key">Description: </span>
                    <span class="mt-4 text-md font-semibold text-gray-800">
                        {{ task?.description }}
                    </span>
                </div>
                <div>
                    <span class="key">Date: </span>
                    <span class="text-sm text-gray-500 dark:text-gray-300 md:text-sm">
                        {{ task?.date }}
                    </span>
                </div>

                <div>
                    <span class="key">Status: </span>
                    <span  class="inline-block">
                        <span v-if="task?.isDone" class="text-center">
                            <span class="p-10 bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">Done</span>
                        </span>
                        <span v-else class=" text-center">
                            <span class="p-10 bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">In Progress</span>
                        </span>
                    </span>
                </div>

                <div @click="setModal(true)">
                    <button>
                        <Icon icon="fluent:edit-24-regular" class="bg-blue-300 text-3xl rounded-md p-2 w-10 h-10 hover:bg-blue-200"/>
                    </button>
                </div>
               
            </div>
        </div>
    </div>
</section>
</template>

