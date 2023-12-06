<script setup >
import Chart from 'chart.js/auto'
import { onMounted, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { useCandidatos } from '../stores/candidatos';

const Candidatos = useCandidatos()

const route = useRoute()

const props = defineProps({
    cantidadVotos: {
        type: Array,
        required: true
    },
    candidatos: {
        type: Array,
        required: true
    }

})


// watch((cantidadVotos)=>{

// })

onMounted(async () => {

    setTimeout(() => {
        const data = {
            labels: props.candidatos,
            datasets: [{
                // backgroundColor: [
                //     'rgb(255, 99, 132,0.5)',
                //     'rgb(75, 192, 192,0.5)',
                //     'rgb(255, 205, 86,0.5)',
                //     'rgb(201, 203, 207,0.5)',
                //     'rgb(54, 162, 235,0.5)',
                //     'rgb(255, 61, 105,0.5)',
                //     'rgb(255, 61, 105,0.5)',
                // ],
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
        const myChart = new Chart(
            document.getElementById('myChart'),
            config)
    }, 1000)


})


</script>
<template>
    <div class=" w-1/2">
        <canvas id="myChart"></canvas>
    </div>
</template>