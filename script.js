const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');

const nameInput = document.getElementById('nameInput');
const meaningInput = document.getElementById('meaningInput');
const textColorInput = document.getElementById('textColor');
const strokeColorInput = document.getElementById('strokeColor');
const bgColorInput = document.getElementById('bgColor');
const detectedStyleText = document.getElementById('detectedStyle');

const renderBtn = document.getElementById('renderBtn');
const downloadBtn = document.getElementById('downloadBtn');

let animationId = null;

// 12가지 통합 감성 분석 알고리즘
function analyzeSentiment(meaning) {
  const text = meaning.toLowerCase();
  
  if (text.includes('하나님') || text.includes('음성') || text.includes('새벽') || text.includes('빛') || text.includes('하늘') || text.includes('지키') || text.includes('신') || text.includes('우주') || text.includes('별') || text.includes('영혼') || text.includes('은혜')) {
    return { id: 1, name: '1. 너의 이름은 (은은한 네온 광원)', font: 'bold 140px "Sunflower", sans-serif' };
  } else if (text.includes('바른') || text.includes('어질') || text.includes('현명') || text.includes('우아') || text.includes('올곧') || text.includes('정신') || text.includes('깨끗') || text.includes('마음') || text.includes('고귀') || text.includes('지혜') || text.includes('단정')) {
    return { id: 2, name: '2. 이탈리아 (클래식 단정 명조)', font: 'bold 120px "Song Myung", serif' };
  } else if (text.includes('최고') || text.includes('짱') || text.includes('당당') || text.includes('화려') || text.includes('열정') || text.includes('에너지') || text.includes('자신감') || text.includes('주인공')) {
    return { id: 3, name: '3. 짱 (3D 입체 팝 블록)', font: '900 130px "Do Hyeon", sans-serif' };
  } else if (text.includes('맑') || text.includes('순수') || text.includes('꽃') || text.includes('자연') || text.includes('숲') || text.includes('바람') || text.includes('향기') || text.includes('봄') || text.includes('이슬') || text.includes('샘') || text.includes('식물')) {
    return { id: 4, name: '4. 꽃잎이 팔랑팔랑 (자연 캘리그라피)', font: '130px "Nanum Pen Script", cursive' };
  } else if (text.includes('힘') || text.includes('강') || text.includes('용기') || text.includes('키큰') || text.includes('높은') || text.includes('거대한') || text.includes('든든') || text.includes('건강') || text.includes('우뚝') || text.includes('세상')) {
    return { id: 5, name: '5. 너의 힘이 (굵은 외곽선 라운딩)', font: 'bold 135px "Jua", sans-serif' };
  } else if (text.includes('자유') || text.includes('꿈') || text.includes('날아') || text.includes('날다') || text.includes('모험') || text.includes('도전') || text.includes('파도') || text.includes('용맹')) {
    return { id: 6, name: '6. 피터팬 (자유로운 붓터치)', font: '160px "East Sea Dokdo", cursive' };
  } else if (text.includes('귀여') || text.includes('귀엽') || text.includes('예쁜') || text.includes('예쁘') || text.includes('아름답') || text.includes('사랑') || text.includes('통통') || text.includes('애교') || text.includes('밝') || text.includes('아기')) {
    return { id: 7, name: '7. 술먹고갈래? (동글통통 버블)', font: 'bold 140px "Jua", sans-serif' };
  } else if (text.includes('재미') || text.includes('즐겁') || text.includes('유쾌') || text.includes('위트') || text.includes('신나는') || text.includes('개그') || text.includes('방송') || text.includes('스타')) {
    return { id: 8, name: '8. 라디오스타 (레트로 블록)', font: '900 130px "Black Han Sans", sans-serif' };
  } else if (text.includes('단단') || text.includes('묵직') || text.includes('정직') || text.includes('신뢰') || text.includes('진실') || text.includes('바위') || text.includes('철학') || text.includes('중후')) {
    return { id: 9, name: '9. 비판 (묵직한 3D 입체 섀도우)', font: '900 135px "Do Hyeon", sans-serif' };
  } else if (text.includes('행복') || text.includes('평화') || text.includes('따뜻') || text.includes('원형') || text.includes('완성') || text.includes('조화') || text.includes('보듬')) {
    return { id: 10, name: '10. 날 (원형 엠블럼 타이포)', font: 'bold 110px "Jua", sans-serif' };
  } else if (text.includes('특별') || text.includes('트렌디') || text.includes('감각') || text.includes('디자인') || text.includes('세련') || text.includes('패션') || text.includes('스타일리시')) {
    return { id: 11, name: '11. 미샤 안심 (기하학 테이프 폴딩)', font: 'bold 120px "Gowun Batang", serif' };
  } else {
    return { id: 12, name: '12. 개판오분전 (내추럴 펜 드로잉)', font: '120px "Nanum Pen Script", cursive' };
  }
}

// 처음 접속 시 대기 화면 안내 문구
function initCanvas() {
  const bgColor = bgColorInput.value || '#0f172a';
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = 'bold 22px sans-serif';
  ctx.fillStyle = '#64748b';
  ctx.fillText('✨ 이름과 뜻을 입력하고', canvas.width / 2, canvas.height / 2 - 20);
  ctx.fillText('[타이포그래피 생성하기]를 눌러주세요!', canvas.width / 2, canvas.height / 2 + 20);
}

// 선택된 스타일에 따른 최종 글자 렌더링
function renderCardStyle(style, name, textColor, strokeColor, bgColor) {
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = style.font;

  if (style.id === 1) {
    ctx.shadowColor = strokeColor;
    ctx.shadowBlur = 40;
    ctx.fillStyle = textColor;
    ctx.fillText(name, canvas.width / 2, canvas.height / 2);

  } else if (style.id === 2) {
    ctx.shadowBlur = 0;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 4;
    ctx.strokeText(name, canvas.width / 2, canvas.height / 2);
    ctx.fillStyle = textColor;
    ctx.fillText(name, canvas.width / 2, canvas.height / 2);

  } else if (style.id === 3) {
    ctx.shadowBlur = 0;
    for (let i = 18; i > 0; i--) {
      ctx.fillStyle = strokeColor;
      ctx.fillText(name, canvas.width / 2 - i, canvas.height / 2 + i);
    }
    ctx.fillStyle = textColor;
    ctx.fillText(name, canvas.width / 2, canvas.height / 2);

  } else if (style.id === 4) {
    ctx.shadowBlur = 0;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 6;
    ctx.strokeText(name, canvas.width / 2, canvas.height / 2);
    ctx.fillStyle = textColor;
    ctx.fillText(name, canvas.width / 2, canvas.height / 2);

  } else if (style.id === 5) {
    ctx.shadowBlur = 0;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 22;
    ctx.lineJoin = 'round';
    ctx.strokeText(name, canvas.width / 2, canvas.height / 2);
    ctx.fillStyle = textColor;
    ctx.fillText(name, canvas.width / 2, canvas.height / 2);

  } else if (style.id === 6) {
    ctx.shadowBlur = 0;
    ctx.fillStyle = strokeColor;
    ctx.fillText(name, canvas.width / 2 + 6, canvas.height / 2 + 6);
    ctx.fillStyle = textColor;
    ctx.fillText(name, canvas.width / 2, canvas.height / 2);

  } else if (style.id === 7) {
    ctx.shadowBlur = 0;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 28;
    ctx.lineCap = 'round';
    ctx.strokeText(name, canvas.width / 2, canvas.height / 2);
    ctx.fillStyle = textColor;
    ctx.fillText(name, canvas.width / 2, canvas.height / 2);

  } else if (style.id === 8) {
    ctx.shadowBlur = 0;
    ctx.fillStyle = strokeColor;
    ctx.fillText(name, canvas.width / 2 - 12, canvas.height / 2);
    ctx.fillStyle = textColor;
    ctx.fillText(name, canvas.width / 2, canvas.height / 2);

  } else if (style.id === 9) {
    ctx.shadowBlur = 0;
    ctx.fillStyle = strokeColor;
    ctx.fillText(name, canvas.width / 2 + 14, canvas.height / 2 + 14);
    ctx.fillStyle = textColor;
    ctx.fillText(name, canvas.width / 2, canvas.height / 2);

  } else if (style.id === 10) {
    ctx.shadowBlur = 0;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 220, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = textColor;
    ctx.fillText(name, canvas.width / 2, canvas.height / 2);

  } else if (style.id === 11) {
    ctx.shadowBlur = 0;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 12;
    ctx.strokeText(name, canvas.width / 2, canvas.height / 2);
    ctx.fillStyle = textColor;
    ctx.fillText(name, canvas.width / 2, canvas.height / 2);

  } else {
    ctx.shadowBlur = 0;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 3;
    ctx.strokeText(name, canvas.width / 2, canvas.height / 2);
    ctx.fillStyle = textColor;
    ctx.fillText(name, canvas.width / 2, canvas.height / 2);
  }
}

// 생성하기 버튼 클릭 시 작동하는 글로우 모션 애니메이션
function startWritingMotion() {
  if (animationId) cancelAnimationFrame(animationId);

  const name = nameInput.value.trim() || '박하음';
  const meaning = meaningInput.value.trim() || '하나님의 음성을 듣는 사람';
  const textColor = textColorInput.value;
  const strokeColor = strokeColorInput.value;
  const bgColor = bgColorInput.value;

  const style = analyzeSentiment(meaning);
  detectedStyleText.innerText = style.name;

  let progress = 0;
  const totalFrames = 50; // 모션 진행 속도 (약 1초)

  function animate() {
    progress += 1 / totalFrames;
    if (progress > 1) progress = 1;

    // 1. 배경을 지우기
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. 왼쪽에서 오른쪽으로 써지는 마스킹(Clip) 처리
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width * progress, canvas.height);
    ctx.clip();

    // 스타일에 맞춘 타이포 그래피 렌더링
    renderCardStyle(style, name, textColor, strokeColor, bgColor);
    ctx.restore();

    // 3. 써지는 선두 지점에 빛나는 스파크(빛창) 효과
    if (progress < 1) {
      const sparkX = canvas.width * progress;
      ctx.save();
      ctx.shadowColor = strokeColor;
      ctx.shadowBlur = 30;
      ctx.fillStyle = strokeColor;
      ctx.beginPath();
      ctx.arc(sparkX, canvas.height / 2, 16, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(sparkX, canvas.height / 2, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      animationId = requestAnimationFrame(animate);
    } else {
      // 모션 완료 후 완벽 고정
      renderCardStyle(style, name, textColor, strokeColor, bgColor);
    }
  }

  animate();
}

// 이벤트 연결
renderBtn.addEventListener('click', startWritingMotion);

// 다운로드 기능
downloadBtn.addEventListener('click', () => {
  const imageURI = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = `${nameInput.value || '박하음'}_타이포그래피.png`;
  link.href = imageURI;
  link.click();
});

// 페이지 초기 접속 시 빈 배경 안내창 출력
window.addEventListener('load', () => {
  document.fonts.ready.then(() => {
    initCanvas();
  });
});

