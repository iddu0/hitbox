<script>
    import '../../cdn/jam/jam.min.css';
    import { onMount } from 'svelte';

    let announcement = "Loading...";

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
        
        try {
            const response = await fetch("https://simpleaccountantserver-production.up.railway.app/api/get-announcement");
            const data = await response.json();
            announcement = data.announcement || "No announcements available";
        } catch (error) {
            announcement = "Failed to load announcement";
        }
    });
</script>

<style>


.container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    max-width: 800px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: transparent;
    border: 2px solid #16A34A;
    border-radius: 15px;
    box-shadow: 0 0 15px rgba(0, 255, 0, 0.5);
}

    .icon {
        width: 80px;
        height: 80px;
        background: url('/mnt/data/image.png') no-repeat center;
        background-size: contain;
        margin-bottom: 10px;
    }

   

   .welcome-message {
        font-size: 1.8rem;
        margin-top: 10px;
        color: #16A34A;
        transition: transform 0.3s ease-in-out;
		font-weight: lighter;
		text-shadow: 1px 1px 2px ;
    }

    .welcome-message:hover {
        transform: scale(1.1);
    }

    .announcement {
        font-size: 1.2rem;
        margin-top: 20px;
        color: #ffcc00;
        text-shadow: 0 0 8px #ffcc00;
        font-weight: bold;
    }
</style>

   <h1 class="pikl-apptitle"><span class="jam jam-home"></span>Home</h1>

<div class="container">
    <p class="welcome-message">Welcome to Pickle Box</p>
    <p class="announcement">{announcement}</p>
</div>
