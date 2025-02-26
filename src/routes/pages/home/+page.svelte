<script>
    import { onMount } from 'svelte';
    import '../../cdn/jam/jam.min.css';

    let announcement = "Loading...";
    let timeMessage = "";
    let currentTime = new Date();
    let hours = currentTime.getHours();
    let date = currentTime.toDateString();

    if (hours < 18) {
        timeMessage = "Good Evening";
    } else {
        timeMessage = "Good Night";
    }

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

        pulseOutline(); 
    });

    function pulseOutline() {
        const announcementBox = document.querySelector(".announcement-container");
        let glow = 0.5;
        let increasing = true;

        setInterval(() => {
            if (increasing) {
                glow += 0.1;
                if (glow >= 1) increasing = false;
            } else {
                glow -= 0.1;
                if (glow <= 0.5) increasing = true;
            }

            announcementBox.style.boxShadow = `0 0 15px rgba(0, 255, 0, ${glow})`;
        }, 200);
    }
</script>

<style>
    body {
        margin: 0;
        padding: 0;
        background: black;
        color: white;
        font-family: Arial, sans-serif;
        text-align: center;
    }

    .dynamic-border {
        position: fixed;
        top: 10px;
        left: 10px;
        right: 10px;
        bottom: 10px;
        border: 2px solid #16A34A;
        border-radius: 15px;
        box-shadow: 0 0 15px rgba(0, 255, 0, 0.5);
        pointer-events: none; 
    }

    .title-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
    }

    .pickelbox {
        font-size: 3rem;
        font-weight: bold;
        color: #16A34A;
        text-shadow: 0 0 10px #16A34A;
    }

    .welcome-message {
        font-size: 1.5rem;
        color: white;
        margin-top: 5px;
        text-align: center;
    }

    .announcement-container {
        position: fixed;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        width: 60%;
        padding: 10px 15px;
        border: 2px solid #16A34A;
        border-radius: 10px;
        box-shadow: 0 0 15px rgba(0, 255, 0, 0.5);
        text-align: center;
        word-wrap: break-word;
        background: black;
    }

    .announcement {
        font-size: 1.2rem;
        color: #ffcc00;
        text-shadow: 0 0 8px #ffcc00;
        font-weight: bold;
        text-align: center;
    }

    .left-container {
        position: absolute;
        bottom: 10px;
        left: 10px;
        padding: 10px 20px;
        border-radius: 10px;
    }

    .time-message {
        font-size: 1.5rem;
        margin-bottom: 5px;
    }

    .date {
        font-size: 1.2rem;
        color: #ffcc00;
    }

    button {
        margin-top: 20px;
        padding: 10px;
        background: #16A34A;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1rem;
    }

    button:hover {
        background: #128039;
    }
</style>

<div class="dynamic-border"></div>

<h1 class="pikl-apptitle"><span class="jam jam-home"></span> Home</h1>

<div class="title-container">
    <div class="pickelbox">PickelBox</div>
    <p class="welcome-message">Welcome to PickelBox</p>
</div>

<div class="left-container">
    <p class="time-message">{timeMessage}</p>
    <p class="date">{date}</p>
</div>

<div class="announcement-container">
    <p class="announcement">{announcement}</p>
</div>
