const events = [
    "📅 <strong>17/03/2025:</strong><br>Ngày đầu tiên nhắn tin, em bảo em không biết gói bánh chưng. khum sao nha anh nấu còn em ăn, teamwork ferpect luông! 😍",
    "💌 <strong>01/04/2025:</strong><br>Không phải Cá tháng Tư đâu nha, anh quyết tâm tán em thật đó ❤️",
    "🍜 <strong>10/04/2025:</strong><br>Lần đầu cài máy tính cho em, hơi run mà thấy em cười là anh tan chảy luôn đó 😳",
    "🛫 <strong>14/04/2025:</strong><br>Tìm chỗ gửi thư tay từ Việt Nam qua Nhật tới em. Nhớ em muốn xỉu mà chỉ mong thư đến tay em sớm nhất 😢",
    "🌸 <strong>18/04/2025:</strong><br>Món quà đầu tiên anh dành tặng yêu thương của anh, khi mở quà em tìm mãi mà chẳng thấy lá thư đâu! 📱 (vì anh quên bỏ huhu)",
    "🎂 <strong>13/05/2025:</strong><br>Hôm nay là sinh nhật em. Anh làm trang web này để kể lại câu chuyện của tụi mình và nói: Anh yêu em nhiều lắmmm! 💖"
  ];
  
  let currentEvent = 0;
  
  function startJourney() {
    document.querySelector('button').classList.add('hidden');
    document.getElementById('journey').classList.remove('hidden');
    showNextEvent();
    startHeartRain(); // bắt đầu trái tim rơi
  }
  function showNextEvent() {
    if (currentEvent < events.length) {
      document.getElementById('eventText').innerHTML = events[currentEvent];
      currentEvent++;
    } else {
      document.getElementById('eventText').innerHTML = "🎉 Hết rồi đó bé ơi!<br>Chúc em sinh nhật thiệt vui và luôn bên anh mãi mãi nhen! 🥰";
      document.getElementById('nextBtn').style.display = "none";
      launchFireworks();
      document.getElementById('fireworkText').style.opacity = 1; // 🔥 Hiển thị chữ pháo hoa
    }
  }
  
  // Trái tim rơi
  function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerText = "💖";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 10 + 20 + "px";
    document.body.appendChild(heart);
  
    setTimeout(() => {
      heart.remove();
    }, 5000);
  }
  
  function startHeartRain() {
    setInterval(createHeart, 300);
  }
  
  // 🎆 Pháo hoa đơn giản
  function launchFireworks() {
    const canvas = document.getElementById("fireworksCanvas");
    const ctx = canvas.getContext("2d");
  
    // full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    const particles = [];
  
    function createFirework(x, y) {
      for (let i = 0; i < 100; i++) {
        particles.push({
          x: x,
          y: y,
          radius: Math.random() * 2 + 1,
          color: `hsl(${Math.random() * 360}, 100%, 60%)`,
          angle: Math.random() * 2 * Math.PI,
          speed: Math.random() * 5 + 1,
          alpha: 1
        });
      }
    }
  
    function animateFireworks() {
      ctx.fillStyle = "rgba(0,0,0,0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  
      particles.forEach((p, index) => {
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        p.alpha -= 0.01;
  
        if (p.alpha <= 0) particles.splice(index, 1);
  
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
  
      requestAnimationFrame(animateFireworks);
    }
  
    // Bắn pháo hoa ở nhiều điểm
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height / 2;
        createFirework(x, y);
      }, i * 1000);
    }
  
    animateFireworks();
  }
  