<div class="background-blur">
    <div class="bg-colors"></div>
    <div class="blur-overlay"></div>
</div>

<style>
    /* Fondo Blur Efecto */
    .background-blur {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
    }

    .bg-colors {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            135deg,
            #a78bfa,
            #f0abfc,
            #fde098,
            #7dd3fc,
            #a78bfa
        );
        background-size: 300% 300%;
        animation: colorChange 20s ease-in-out infinite;
    }

    .dark-mode .bg-colors {
        background: linear-gradient(
            135deg,
            #424242,
            #5a5a5a,
            #757575,
            #616161,
            #424242
        );
    }

    .blur-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
    }

    .dark-mode .blur-overlay {
        background-color: rgba(0, 0, 0, 0.6);
    }

    @keyframes colorChange {
        0% {
            background-position: 0% 50%;
        }

        50% {
            background-position: 100% 50%;
        }

        100% {
            background-position: 0% 50%;
        }
    }
</style>
