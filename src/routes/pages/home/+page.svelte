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
    width: 90%;
    max-width: 1200px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid #00ff00;
    border-radius: 15px;
    box-shadow: 0 0 15px rgba(0, 255, 0, 0.5);
    margin-top: auto; 
    margin-bottom: 20px; 
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
        animation: intenseGlow 1.5s infinite alternate;
        transition: transform 0.3s ease-in-out;
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

    @keyframes intenseGlow {
        0% {
            opacity: 1;
            text-shadow: 0 0 8px #00ff00, 0 0 16px #00cc00, 0 0 24px #009900;
        }
        100% {
            opacity: 0.9;
            text-shadow: 0 0 12px #00cc00, 0 0 20px #009900, 0 0 28px #006600;
        }
    }


.pikl-apptitle {
    position: absolute;
    top: 10px;
    left: 10px;
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    font-weight: bold;
    color: #00ff00;
}

.pikl-apptitle .jam-home {
    margin-right: 8px;
    font-size: 1.8rem;
}



</style>

   <h1 class="pikl-apptitle"><span class="jam jam-home"></span>Home</h1>

<div class="container">
    <div class="icon"></div>
    <h1 class="pikl-apptitle">PickleBox</h1>
    <p class="welcome-message">Welcome to Pickle Box</p>
    <p class="announcement">{announcement}</p>
</div>
