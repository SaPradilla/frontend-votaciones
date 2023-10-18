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

const labels = [
    'Santiago Pradila',
    'Matteo Agudelo',
    'Yeison ',
    'Yurany',
    'Raigoza',
    'Andry',
    'Blanco'
]
const data = {
    labels: props.candidatos,
    datasets: [{
        label: 'Ola',
        backgroundColor: [
            'rgb(255, 99, 132,0.5)',
            'rgb(75, 192, 192,0.5)',
            'rgb(255, 205, 86,0.5)',
            'rgb(201, 203, 207,0.5)',
            'rgb(54, 162, 235,0.5)',
            'rgb(255, 61, 105,0.5)',
            'rgb(255, 61, 105,0.5)',
     
        ],
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