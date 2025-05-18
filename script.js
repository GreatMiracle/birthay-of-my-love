const events = [
  {
    text: "📅 <strong>17/03/2025:</strong><br>Ngày đầu tiên 2 đứa mình quen nhau nezz, sượng quá trờiii...🫣 ",
    img: "images/17-3.png"
  },
  {
    text: "💌 <strong>Khó khăn chưa nezz</strong><br>Ban đầu mới tán em, 20h45p em đã đi ngủ mất tiêu rùii 🤣🤣🤣<br> Sau này mới biết vợ mình là cú đêm hầy, toàn thức tới 2-3h sáng thoai <br> ",
    img: "images/3-4.png"
  },
  {
    text: "🍜 <strong>10/04/2025:</strong><br>Lần đầu cài máy tính cho em, hơi run mà thấy em cười là anh tan chảy luôn đó 😳",
    img: "images/H-hi.jpg",
    img1: "images/K-hi.jpg"
  },
  {
    text: "🛫 <strong>14/04/2025:</strong><br>Tìm chỗ gửi thư tay từ Việt Nam qua Nhật tới em. Nhớ em muốn xỉu mà chỉ mong thư đến tay em sớm nhất 😢",
    img: "images/letter.jpg"
  },
  {
    text: "🌸 <strong>18/04/2025:</strong><br>Món quà đầu tiên anh dành tặng yêu thương của anh, khi mở quà em tìm mãi mà chẳng thấy lá thư đâu! 📱 (vì anh quên bỏ huhu)",
    img: "images/gift.jpg"
  },
  {
    text: "🎂 <strong>13/05/2025:</strong><br>Hôm nay là sinh nhật em. Anh làm trang web này để kể lại câu chuyện của tụi mình và nói: Anh yêu em nhiều lắmmm! 💖",
    img: "images/birthday.jpg"
  }
];


let currentEvent = 0;

function startJourney() {
  document.getElementById('startBtn').classList.add('hidden'); // Ẩn nút "Nhấn vào đây"
  document.getElementById('journey').classList.remove('hidden'); // Hiện hành trình
  document.getElementById('nextBtn').classList.remove('hidden'); // Bật nút "Tiếp theo"
  showNextEvent();
  startHeartRain(); // Bắt đầu hiệu ứng trái tim
}

function showNextEvent() {
  const eventBox = document.getElementById('eventText');

  if (currentEvent < events.length) {
    const event = events[currentEvent];
    eventBox.innerHTML = `
  <div class="event-text">${event.text}</div>
  <div class="event-images ${event.img1 ? 'two-images' : ''}">
    <img src="${event.img}" alt="Image 1" class="event-image">
    ${event.img1 ? `<div class="heart-icon">H ❤️ K</div><img src="${event.img1}" alt="Image 2" class="event-image">` : ''}
  </div>
`;
    currentEvent++;
  } else {
    // Khi hết sự kiện: hiện lời chúc, ẩn nút tiếp theo
    eventBox.innerHTML = "🎉 Hết rồi đó bé ơi!<br>Chúc em sinh nhật thiệt vui và luôn bên anh mãi mãi nhen! 🥰";
    document.getElementById('nextBtn').style.display = "none";
    launchFireworks();
    document.getElementById('fireworksCanvas').style.display = 'block';
    document.getElementById('fireworkText').style.display = 'block';
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
const bgMusic = document.getElementById('bg-music');
const toggleMusicBtn = document.getElementById('toggleMusic');

// Tự động phát nhạc sau khi người dùng tương tác (yêu cầu bởi một số trình duyệt)
document.addEventListener("click", () => {
  if (bgMusic.paused) {
    bgMusic.play().catch((e) => console.warn("Autoplay prevented:", e));
  }
}, { once: true });

function toggleMusic() {
  if (bgMusic.paused) {
    bgMusic.play();
    toggleMusicBtn.textContent = '🔈';
  } else {
    bgMusic.pause();
    toggleMusicBtn.textContent = '🔇';
  }
}

function changeTrack(trackSrc) {
  bgMusic.src = trackSrc;
  bgMusic.play();
  toggleMusicBtn.textContent = '🔈';
}
