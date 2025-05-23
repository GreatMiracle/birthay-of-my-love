const events = [
  {
    text: "📅 <strong>17/03/2025:</strong><br>Đúng gòyyyy....Ngày đầu tiên 2 đứa mình quen nhau nezz, sượng quá trờiii... 🤭🤭🤭 ",
    img: "images/17-3.png",
    question: "Em có nhớ ngày đầu tiên 2 đứa mình quen nhau là ngày nào khum?",
    answers: [
      { text: "17/03/2025", correct: true },
      { text: "01/04/2025", correct: false },
      { text: "03/04/2025", correct: false }
    ]
  },
  {
    text: "😴💤 <strong>Khó khăn chưa nezz</strong><br>Ban đầu mới tán em, 20h45p em đã đi ngủ mất tiêu rùii 🤣🤣🤣<br> Sau này mới biết vợ mình là cú đêm hầy, toàn thức tới 2-3h sáng không àhhh <br> ",
    img: "images/3-4.png"
  },
  {
    text: "📸📨 <strong>10/04/2025:</strong><br>Lần đầu em gửi ảnh cho anh, còn ngại chẳng dám chụp mặt, chỉ thả nhẹ mỗi 'Hi' thoyyy ✌️✌️✌️ 😳",
    img: "images/H-hi.jpg",
    img1: "images/K-hi.jpg"
  },
  {
    text: "😘 <strong>Hường hôn anh rùi đó, hứ... thấy ghét 😤😤😤:</strong><br>Dạaaa anh biết rùi...Vợ hôn người ta mạnh thếrrr. Nhưng mà ngta thích lắm ý. Yêu em quá trời 😍. <br>Thoy ngta mềm lòng rùi mở cho xem phần tiếp nezzz 😍",
    img: "images/cafe.jpg", // Ảnh mặc định, sẽ bị thay thế bằng ảnh đã chụp
    troll: {
      message: "Hôn anh một cái thì anh mới cho mở tiếp 😘",
      actionText: "Hôn anh 😘",
      action: "handleTrollAction",
      secondMessage: "Hôn mỗi một cái thế thôi á? Hôn thì phải có bằng chứng chứng minh là đã hôn anh. Chụp ảnh hôn anh gửi vào đây để xem xét nếu được thì mới mở tiếp cho em 😜"
    }
  },
  {
    text: "🛫💌 <strong>14/04/2025:</strong><br>Nghỉ làm buổi chiều đi tìm chỗ gửi thư tay từ VN qua Nhật 🚴.<br> Nhớ em muốn xỉu mà chỉ mong thư đến tay em sớm nhất thoy 😢",
    video: "videos/14-4.mp4",
    findHeart: {
      message: "Yêu thương của anh tìm trái tim đặc biệt trong chữ H đi nezzz <br>Tìm trái tym anh còn được mofhhh.. tìm lá thư anh gửi nhằm nhò rỳ! 😜",
      action: "handleFindHeart"
    }
  },
  {
    text: "🌹 <strong>18/04/2025:</strong><br>Món quà đầu tiên anh dành tặng yêu thương của anh, Yêu thương nhận được quà nè...cười típ cả mắt luôn",
    video: "videos/18-4.mp4",
  },
  {
    text: "🌸 <strong>18/04/2025:</strong><br>Khi mở quà em tìm mãi mà chẳng thấy lá thư đâu! <br> Trông kìa trông kìa... nghệt cái mặt ra, đáng eo quá trời📱 ",
    video: "videos/18-4.mp4",
  },
  {
    text: "🌸 <strong>Yêu vợ nhiều lắm</strong><br>Ngày anh tỏ tình với Hường là ngày nào nào... điền để mở khóa nhé",
    dragDrop: {
      message: "Ghép các mảnh trái tim để hoàn thành đúng ngày anh tỏ tình với em nhé! 💗<br><small>(Kéo thả mảnh ghép vào ô trống format: d/m/yyyy, nhấp 'X' để xóa nếu sai nha.. nhấp nhẹ nhẹ thui)</small>",
      target: "5/5/2025",
      action: "handleDragDropComplete"
    },
    video: "videos/18-4.mp4",
  },
  {
    text: "🎂 <strong>rạng sáng 06/05/2025 Giờ Nhật Bản:</strong><br>Bản tin chiến thắng, chinh phục thành công trái tim em 💖",
    img: "images/5-5.jpg"
  },
  {
    text: "🎂 <strong>04/06/2025:</strong><br>Hôm nay là sinh nhật em yêu! Anh làm trang web này để kể lại câu chuyện của tụi mình. Anh muốn nói: Anh yêu em nhiều lắmmm, Hường vợ iêu của anh! 💖",
    img: "images/H-yeu.jpg"
  }
];

let currentEvent = 0;
let stream = null; // Biến lưu stream từ camera
let capturedImage = null; // Biến lưu URL của ảnh đã chụp hoặc tải lên

function startCountdown() {
  const countdownElement = document.getElementById('countdown');
  const targetDate = new Date('2025-06-04T00:00:00');

  function updateCountdown() {
    const now = new Date();
    const timeDiff = targetDate - now;

    if (timeDiff <= 0) {
      countdownElement.innerHTML = "🎉 Hôm nay là sinh nhật Hường yêu! 🎂";
      return;
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    countdownElement.innerHTML = `
      <div class="countdown-text">Còn lại đến sinh nhật em yêu:</div>
      <div class="countdown-timer">
        <span>${days} ngày</span>
        <span>${hours} giờ</span>
        <span>${minutes} phút</span>
        <span>${seconds} giây</span>
      </div>
    `;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

startCountdown();

function startJourney() {
  document.getElementById('startBtn').classList.add('hidden');
  document.getElementById('journey').classList.remove('hidden');
  document.getElementById('nextBtn').classList.remove('hidden');
  showNextEvent();
  startHeartRain();
}

function showNextEvent() {
  const eventBox = document.getElementById('eventText');
  const nextBtn = document.getElementById('nextBtn');

  if (currentEvent < events.length) {
    const event = events[currentEvent];
    if (event.question) {
      let html = `<div class="question">${event.question}</div>`;
      event.answers.forEach((answer, index) => {
        html += `<button class="answer-btn" onclick="checkAnswer(${currentEvent}, ${index})">${answer.text}</button>`;
      });
      eventBox.innerHTML = html;
      nextBtn.classList.add('hidden');
    } else if (event.troll) {
      let html = `<div class="troll-message">${event.troll.message}</div>`;
      html += `<button class="troll-btn" onclick="${event.troll.action}(${currentEvent})">${event.troll.actionText}</button>`;
      eventBox.innerHTML = html;
      nextBtn.classList.add('hidden');
    } else if (event.findHeart) {
      let html = `<div class="troll-message">${event.findHeart.message}</div>`;
      html += `<div class="heart-container">`;
      const hLayout = [
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1]
      ];
      const heartPositions = [];
      hLayout.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          if (cell === 1) {
            heartPositions.push([rowIndex, colIndex]);
          }
        });
      });
      const randomIndex = Math.floor(Math.random() * heartPositions.length);
      const specialHeartPos = heartPositions[randomIndex];
      hLayout.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          if (cell === 1) {
            if (rowIndex === specialHeartPos[0] && colIndex === specialHeartPos[1]) {
              html += `<span class="heart-item special-heart" onclick="${event.findHeart.action}(${currentEvent})">💖</span>`;
            } else {
              html += `<span class="heart-item">💗</span>`;
            }
          } else {
            html += `<span></span>`;
          }
        });
      });
      html += `</div>`;
      eventBox.innerHTML = html;
      nextBtn.classList.add('hidden');
    } else if (event.dragDrop) {
      let html = `<div class="troll-message">${event.dragDrop.message}</div>`;
      html += `<div class="drag-drop-container">`;
      // Tạo ô trống (drop zones)
      html += `<div class="drop-zone-container">`;
      const target = event.dragDrop.target;
      for (let i = 0; i < target.length; i++) {
        if (target[i] === ' ') {
          html += `<span style="width: 10px;"></span>`;
        } else {
          html += `<span class="drop-zone" data-char="${target[i]}" ondragover="handleDragOver(event)" ondrop="handleDrop(event, ${currentEvent})"><span class="clear-btn" onclick="clearDropZone(this, ${currentEvent})">X</span></span>`;
        }
      }
      html += `</div>`;
      // Tạo mảnh ghép (draggable items) với data-id duy nhất
      html += `<div class="draggable-container">`;
      const chars = target.split('').filter(char => char !== ' ');
      const shuffledChars = chars.sort(() => Math.random() - 0.5);
      let idCounter = 0;
      shuffledChars.forEach(char => {
        html += `<span class="draggable-item" draggable="true" ondragstart="handleDragStart(event)" data-char="${char}" data-id="${idCounter++}">💗${char}</span>`;
      });
      html += `</div>`;
      html += `</div>`;
      eventBox.innerHTML = html;
      nextBtn.classList.add('hidden');
    } else {
      displayEventContent(event);
      currentEvent++;
      nextBtn.classList.remove('hidden');
    }
  } else {
    eventBox.innerHTML = "🎉 Hết rồi đó bé ơi!<br>Chúc em sinh nhật 4/6 thiệt vui và luôn bên anh mãi mãi nhen! 🥰";
    nextBtn.style.display = "none";
    launchFireworks();
    document.getElementById('fireworksCanvas').style.display = 'block';
    document.getElementById('fireworkText').style.display = 'block';
  }
}

function checkAnswer(eventIndex, answerIndex) {
  const event = events[eventIndex];
  if (event.answers[answerIndex].correct) {
    displayEventContent(event);
    currentEvent++;
    document.getElementById('nextBtn').classList.remove('hidden');
  } else {
    alert("Sai rồi, thử lại nhé!");
  }
}

function handleTrollAction(eventIndex) {
  const event = events[eventIndex];
  const eventBox = document.getElementById('eventText');
  let html = `<div class="troll-message shake">${event.troll.secondMessage}</div>`;
  html += `
    <div class="photo-options">
      <button class="troll-btn" onclick="startCamera(${eventIndex})">📸 Chụp ảnh trực tiếp</button>
      <input type="file" id="kissProof" accept="image/*" onchange="handlePhotoUpload(${eventIndex})" class="photo-input">
    </div>
    <div id="camera-container" class="hidden">
      <video id="camera-feed" autoplay playsinline></video>
      <canvas id="camera-canvas" class="hidden"></canvas>
      <div class="camera-controls">
        <button class="troll-btn" onclick="capturePhoto(${eventIndex})">Chụp ảnh</button>
        <button class="troll-btn cancel-btn" onclick="stopCamera()">Hủy</button>
      </div>
    </div>
    <div id="photo-preview" class="hidden">
      <img id="captured-photo" alt="Captured photo">
      <div class="photo-preview-controls">
        <button class="troll-btn" onclick="submitPhoto(${eventIndex})">Gửi ảnh</button>
        <button class="troll-btn cancel-btn" onclick="retakePhoto()">Chụp lại</button>
      </div>
    </div>`;
  eventBox.innerHTML = html;
}

// Bắt đầu camera
async function startCamera(eventIndex) {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const video = document.getElementById('camera-feed');
    video.srcObject = stream;
    document.getElementById('camera-container').classList.remove('hidden');
  } catch (error) {
    alert("Không thể truy cập camera: " + error.message);
    console.error("Camera error:", error);
  }
}

// Chụp ảnh từ camera
function capturePhoto(eventIndex) {
  const video = document.getElementById('camera-feed');
  const canvas = document.getElementById('camera-canvas');
  const context = canvas.getContext('2d');

  // Đặt kích thước canvas bằng kích thước video
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  // Vẽ frame hiện tại từ video lên canvas
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Hiển thị ảnh chụp và ẩn camera
  const capturedPhoto = document.getElementById('captured-photo');
  capturedPhoto.src = canvas.toDataURL('image/png');
  document.getElementById('camera-container').classList.add('hidden');
  document.getElementById('photo-preview').classList.remove('hidden');

  // Dừng camera
  stopCamera();
}

// Dừng camera
function stopCamera() {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    stream = null;
  }
  document.getElementById('camera-feed').srcObject = null;
  document.getElementById('camera-container').classList.add('hidden');
}

// Chụp lại ảnh
function retakePhoto() {
  document.getElementById('photo-preview').classList.add('hidden');
  startCamera(currentEvent);
}

// Gửi ảnh đã chụp
function submitPhoto(eventIndex) {
  const capturedPhoto = document.getElementById('captured-photo');
  if (capturedPhoto.src) {
    // Lưu ảnh đã chụp vào biến toàn cục
    capturedImage = capturedPhoto.src;
    const event = events[eventIndex];
    displayEventContent(event);
    triggerExtraHearts();
    currentEvent++;
    document.getElementById('nextBtn').classList.remove('hidden');
  } else {
    alert("Chưa có ảnh để gửi! Hãy chụp hoặc tải ảnh lên nhé 😜");
  }
}

// Xử lý ảnh tải lên
function handlePhotoUpload(eventIndex) {
  const fileInput = document.getElementById('kissProof');
  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      // Lưu ảnh đã tải lên vào biến toàn cục
      capturedImage = e.target.result;
      const event = events[eventIndex];
      displayEventContent(event);
      triggerExtraHearts();
      currentEvent++;
      document.getElementById('nextBtn').classList.remove('hidden');
    };
    reader.readAsDataURL(fileInput.files[0]);
  } else {
    alert("Chưa có ảnh bằng chứng nè! Tải ảnh lên đi em 😜");
  }
}

function handleFindHeart(eventIndex) {
  const event = events[eventIndex];
  displayEventContent(event);
  triggerExtraHearts();
  currentEvent++;
  document.getElementById('nextBtn').classList.remove('hidden');
}

function displayEventContent(event) {
  const eventBox = document.getElementById('eventText');
  let html = `<div class="event-text">${event.text}</div>`;
  html += `<div class="event-images ${event.img1 ? 'two-images' : ''}">`;
  if (event.video) {
    html += `<video src="${event.video}" class="event-video" controls autoplay></video>`;
  } else if (event.img) {
    // Kiểm tra nếu là sự kiện troll (eventIndex 3) và có ảnh đã chụp thì sử dụng ảnh đó
    if (currentEvent === 3 && capturedImage) {
      html += `<img src="${capturedImage}" alt="Captured image" class="event-image">`;
    } else {
      html += `<img src="${event.img}" alt="Image 1" class="event-image">`;
    }
  }
  if (event.img1) {
    html += `<div class="heart-icon">H ❤️ K</div><img src="${event.img1}" alt="Image 2" class="event-image">`;
  }
  html += `</div>`;
  eventBox.innerHTML = html;
}

// Xử lý kéo thả (Drag-and-Drop)
function handleDragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.dataset.char);
  event.dataTransfer.setData('data-id', event.target.dataset.id);
  event.target.classList.add('dragging');
}

function handleDragOver(event) {
  event.preventDefault();
}

function handleDrop(event, eventIndex) {
  event.preventDefault();
  const char = event.dataTransfer.getData('text/plain');
  const droppedId = event.dataTransfer.getData('data-id');
  const dropZone = event.target.closest('.drop-zone');
  const correctChar = dropZone.dataset.char;

  if (dropZone.classList.contains('drop-zone')) {
    // Nếu ô đã có ký tự, xóa trước khi thả ký tự mới
    if (dropZone.classList.contains('filled')) {
      clearDropZone(dropZone.querySelector('.clear-btn'), eventIndex, false);
    }
    dropZone.innerHTML = `<span class="char">${char}</span><span class="clear-btn" onclick="clearDropZone(this, ${eventIndex})">X</span>`;
    dropZone.classList.add('filled');
    dropZone.dataset.usedId = droppedId; // Lưu data-id của mảnh ghép đã thả
    if (char === correctChar) {
      dropZone.classList.add('correct');
      dropZone.classList.remove('wrong');
    } else {
      dropZone.classList.add('wrong');
      dropZone.classList.remove('correct');
    }
    // Chỉ mờ mảnh ghép cụ thể được thả
    const draggableItem = document.querySelector(`.draggable-item[data-id="${droppedId}"]`);
    if (draggableItem) {
      draggableItem.classList.add('used');
      draggableItem.style.opacity = '0.3';
      draggableItem.setAttribute('draggable', 'false');
    }
    checkDragDropComplete(eventIndex);
  }
}

// Xóa ký tự khỏi ô trống
function clearDropZone(clearBtn, eventIndex, reset = true) {
  const dropZone = clearBtn.parentElement;
  const char = dropZone.querySelector('.char')?.textContent;
  const usedId = dropZone.dataset.usedId; // Lấy data-id của mảnh ghép đã thả

  // Xóa nội dung ô trống
  dropZone.innerHTML = `<span class="clear-btn" onclick="clearDropZone(this, ${eventIndex})">X</span>`;
  dropZone.classList.remove('filled', 'correct', 'wrong');
  delete dropZone.dataset.usedId; // Xóa data-used-id sau khi xóa

  // Hiển thị lại mảnh ghép chính xác dựa trên data-id
  const draggableItem = document.querySelector(`.draggable-item[data-id="${usedId}"].used`);
  if (draggableItem) {
    draggableItem.classList.remove('used');
    draggableItem.style.opacity = '1';
    draggableItem.setAttribute('draggable', 'true');
  }

  // Kiểm tra lại trạng thái ghép
  if (reset) {
    checkDragDropComplete(eventIndex);
  }
}

function checkDragDropComplete(eventIndex) {
  const event = events[eventIndex];
  const dropZones = document.querySelectorAll('.drop-zone');
  let allFilled = true;
  let allCorrect = true;

  dropZones.forEach(zone => {
    if (!zone.classList.contains('filled')) {
      allFilled = false;
    }
    if (!zone.classList.contains('correct')) {
      allCorrect = false;
    }
  });

  if (allFilled && allCorrect) {
    handleDragDropComplete(eventIndex);
  }
}

function handleDragDropComplete(eventIndex) {
  const event = events[eventIndex];
  displayEventContent(event);
  triggerExtraHearts();
  currentEvent++;
  document.getElementById('nextBtn').classList.remove('hidden');
}

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

function triggerExtraHearts() {
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const heart = document.createElement("div");
      heart.classList.add("heart");
      heart.innerText = "💖";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.fontSize = Math.random() * 15 + 30 + "px";
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 2000);
    }, i * 50);
  }
}

function startHeartRain() {
  setInterval(createHeart, 300);
}

function launchFireworks() {
  const canvas = document.getElementById("fireworksCanvas");
  const ctx = canvas.getContext("2d");

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