<template>
    <div v-if="type == 'err'" class="absolute top-10 left-[50%] translate-x-[-50%] bg-red-600 text-white p-4 rounded-md transition-all">
        {{ msg }}
    </div>
    <div v-else class="absolute top-10 left-[50%] translate-x-[-50%] bg-green-600 text-white p-4 rounded-md transition-all">
        {{ msg }}
    </div>
</template>

<script setup>
    import { ref } from "vue"

    const props = defineProps(["msg"])
    const msg = ref(props.msg.text)
    const type = ref(props.msg.type)

    console.log(props.msg.type)

   
</script>

