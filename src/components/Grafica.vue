<script setup >
import Chart from 'chart.js/auto'
import { onMounted, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { useVotos } from '../stores/votos';


const Voto = useVotos()
const route = useRoute()

// watch((cantidadVotos)=>{

// })

onMounted(async () => {

    setTimeout(() => {
        const data = {
            labels: Voto.candidatos,
            datasets: [{
                backgroundColor: [
                    'rgb(255, 99, 132,0.5)',
                    'rgb(75, 192, 192,0.5)',
                    'rgb(255, 205, 86,0.5)',
                    'rgb(201, 203, 207,0.5)',
                    'rgb(54, 162, 235,0.5)',
                    'rgb(255, 61, 105,0.5)',
                    'rgb(255, 61, 105,0.5)',
                ],
                data: Voto.cantidadVotos
           
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