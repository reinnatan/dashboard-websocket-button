
        const ws = new WebSocket('ws://192.168.100.113:8081');

        ws.onopen = () => {
            console.log('Connected to server');
             //update audio component
             //       const audio = new Audio('./bell.mp3'); // Replace with your file path
             //       audio.volume = 1.0; 
             //       audio.muted = true;
             //       audio.play();
        };

        ws.onmessage = (event) => {         
            const message = event.data.toString();
            if(message.includes("updateRoom")){
                const words = message.split("-");
                const canvas = document.getElementById(words[1]);

                if (canvas) {
                   const player = document.getElementById('player');
                   player.play();
                    //update component color
                    const ctx = canvas.getContext('2d');
                    ctx.fillStyle = 'aqua';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                }

            }else if(message.includes("create")){
                  const words = message.split("-");
                  const canvas = document.createElement('canvas');
                  canvas.width = 300;
                  canvas.height = 150;
                  canvas.style.border = '1px solid black'; 
                  canvas.id = words[1];

                  const buttonReset = document.createElement('button');
                  buttonReset.textContent = "Reset this room";
                  buttonReset.addEventListener('click', function(){
                    const canvas = document.getElementById(words[1]);
                    const rect = canvas.getBoundingClientRect();
                    const ctx = canvas.getContext("2d");
                    ctx.fillStyle = "white";
                    ctx.fillRect(0,0,rect.width, rect.height);

                  });


                const logDiv = document.getElementById('temproom');
                logDiv.appendChild(canvas);
                logDiv.appendChild(document.createElement("br"));
                logDiv.appendChild(buttonReset);
                logDiv.appendChild(document.createElement("br"));
                logDiv.appendChild(document.createElement("br"));
            }
            
        };

        ws.onclose = () => {
            console.log('Disconnected from server');
        };