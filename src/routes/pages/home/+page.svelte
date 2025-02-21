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
        animation: intenseGlow 1.5s infinite alternate;
    }

    @keyframes intenseGlow {
        0% {
            opacity: 1;
            text-shadow: 0 0 8px #ff00ff, 0 0 16px #ff00ff, 0 0 24px #8000ff;
        }
        100% {
            opacity: 0.9;
            text-shadow: 0 0 12px #ff00ff, 0 0 20px #8000ff, 0 0 28px #4b0082;
        }
    }
</style>

<h1 class="pikl-apptitle">
    <span class="jam jam-home"></span> Home
</h1>
<p class="welcome-message">Welcome to Pickle Box</p>
