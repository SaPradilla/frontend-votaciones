<script setup >
import Chart from 'chart.js/auto'
import { onMounted, ref } from 'vue';


const props = defineProps({
    cantidadVotos: {
        type: Array,
        required: true
    },
    candidatos:{
        type: Array,
        required: true
    }

})

const data = {
    labels: props.candidatos,
    datasets: [{
        label: 'Ola',
        
        data: props.cantidadVotos
    }]
}
const config = {
    type: 'polarArea',
    data: data,
    options: {
        responsive: true,
        layout: {
            padding: 20
        }
    }

}
onMounted(() => {
    const myChart = new Chart(
        document.getElementById('myChart'),
        config)
    
})


</script>
<template>
    <div class="w-2/3">

        <canvas id="myChart"></canvas>
    </div>
</template>