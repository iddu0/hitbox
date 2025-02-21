<script>
    import '../../cdn/jam/jam.min.css';
    import { onMount } from 'svelte';

    onMount(async () => {
        if ("serviceWorker" in navigator) {
          const registrations = await navigator.serviceWorker.getRegistrations();
          if (registrations.length <= 0) {
            navigator.serviceWorker.register("/sw.js", { scope: "/~uv/" })
              .then(() => location.reload());
          } else {
            navigator.serviceWorker.register("/sw.js", { scope: "/~uv/" });
          }
        }
    });
</script>

<style>
    :global(body) {
        background-color: #1b3a2b;
        color: #ffffff;
        font-family: Arial, sans-serif;
        text-align: center;
        margin: 0;
        padding: 0;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .pikl-apptitle {
        font-size: 2.5rem;
        font-weight: bold;
    }

    .welcome-message {
        font-size: 1.5rem;
        margin-top: 10px;
        animation: flicker 1.5s infinite alternate;
    }

    @keyframes flicker {
        0% {
            opacity: 1;
            text-shadow: 0 0 5px #ff6600, 0 0 10px #ff3300, 0 0 15px #ff0000;
        }
        100% {
            opacity: 0.8;
            text-shadow: 0 0 10px #ff3300, 0 0 15px #ff0000, 0 0 20px #990000;
        }
    }
</style>

<h1 class="pikl-apptitle">
    <span class="jam jam-home"></span> Home
</h1>
<p class="welcome-message">Welcome to Pickle Box</p>
