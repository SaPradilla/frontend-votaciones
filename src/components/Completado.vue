<template>
    <div class="contenedor-compleado">
        
        <h1 class=" text-5xl text-green-500 font-bold">¡Gracias por Votar!</h1>
        <div class="wrapper"> 
            <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
            <h2 class=" mt-44 text-green-600 text-center absolute font-semibold text-4xl">Voto Registrado</h2>
        </div>
    </div>
</template>

<style>
* {
    padding: 0;
    margin: 0
}
.contenedor-completado{
    display: flex;
    justify-content: center;
    align-items: center;
}
.wrapper {
    height: 40vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.checkmark__circle {
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    stroke-width: 2;
    stroke-miterlimit: 10;
    stroke: #22c55e;
    ;
    fill: none;
    animation: stroke 0.9s cubic-bezier(0.65, 0, 0.45, 1) forwards
}

.checkmark {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    display: block;
    stroke-width: 2;
    stroke: #fff;
    stroke-miterlimit: 10;
    margin: 10% auto;
    box-shadow: inset 0px 0px 0px #22c55e;
    ;
    animation: fill .7s ease-in-out .7s forwards, scale .3s ease-in-out .9s both
}

.checkmark__check {
    transform-origin: 50% 50%;
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
    animation: stroke 0.4s cubic-bezier(0.65, 0, 0.45, 1) 0.9s forwards
}

@keyframes stroke {
    100% {
        stroke-dashoffset: 0
    }
}

@keyframes scale {

    0%,
    100% {
        transform: none
    }

    50% {
        transform: scale3d(1.1, 1.1, 1)
    }
}

@keyframes fill {
    100% {
        box-shadow: inset 0px 0px 0px 30px #22c55e;
    }
}</style>