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

// 다양한 한자 의미, 한글 뜻, 성격을 완벽히 구분하는 감성 파싱 알고리즘
function analyzeSentiment(meaning) {
  const text = meaning.toLowerCase();
  
  // 1. 너의 이름은: 신성함, 새벽, 하늘, 별, 우주, 은혜, 영혼, 신앙 관련
  if (text.includes('하나님') || text.includes('음성') || text.includes('새벽') || text.includes('빛') || text.includes('하늘') || text.includes('지키') || text.includes('신') || text.includes('우주') || text.includes('별') || text.includes('영혼') || text.includes('은혜') || text.includes('효') || text.includes('은') || text.includes('旻') || text.includes('宇')) {
    return { id: 1, name: '1. 너의 이름은 (은은한 네온 광원)', font: 'bold 140px "Sunflower", sans-serif' };
  } 
  // 2. 이탈리아: 바름, 어짊, 현명함, 품격, 정직, 지혜, 올곧음, 지성, 슬기
  else if (text.includes('바른') || text.includes('어질') || text.includes('현명') || text.includes('우아') || text.includes('올곧') || text.includes('정신') || text.includes('깨끗') || text.includes('마음') || text.includes('고귀') || text.includes('지혜') || text.includes('단정') || text.includes('지성') || text.includes('슬기') || text.includes('智') || text.includes('賢') || text.includes('正') || text.includes('理')) {
    return { id: 2, name: '2. 이탈리아 (클래식 단정 명조)', font: 'bold 120px "Song Myung", serif' };
  } 
  // 3. 짱: 최고, 준수함, 뛰어남, 팝, 자신감, 당당함, 리더, 열정
  else if (text.includes('최고') || text.includes('짱') || text.includes('당당') || text.includes('화려') || text.includes('열정') || text.includes('에너지') || text.includes('자신감') || text.includes('주인공') || text.includes('뛰어난') || text.includes('빼어난') || text.includes('준수') || text.includes('준걸') || text.includes('俊') || text.includes('秀')) {
    return { id: 3, name: '3. 짱 (3D 입체 팝 블록)', font: '900 130px "Do Hyeon", sans-serif' };
  } 
  // 4. 꽃잎이 팔랑팔랑: 자연, 숲, 꽃, 향기, 이슬, 맑음, 봄, 여름, 식물, 계절
  else if (text.includes('맑') || text.includes('순수') || text.includes('꽃') || text.includes('자연') || text.includes('숲') || text.includes('바람') || text.includes('향기') || text.includes('봄') || text.includes('이슬') || text.includes('샘') || text.includes('식물') || text.includes('여름') || text.includes('夏') || text.includes('芸')) {
    return { id: 4, name: '4. 꽃잎이 팔랑팔랑 (자연 캘리그라피)', font: '130px "Nanum Pen Script", cursive' };
  } 
  // 5. 너의 힘이: 강함, 힘, 용기, 든든함, 건설, 세우다, 업적, 계승, 우뚝
  else if (text.includes('힘') || text.includes('강') || text.includes('용기') || text.includes('키큰') || text.includes('높은') || text.includes('거대한') || text.includes('든든') || text.includes('건강') || text.includes('우뚝') || text.includes('세상') || text.includes('세우') || text.includes('건설') || text.includes('업적') || text.includes('계승') || text.includes('建') || text.includes('勳') || text.includes('承')) {
    return { id: 5, name: '5. 너의 힘이 (굵은 외곽선 라운딩)', font: 'bold 135px "Jua", sans-serif' };
  } 
  // 6. 피터팬: 자유, 날다, 모험, 도전, 파도, 솔직, 민첩, 영리, 이끌다
  else if (text.includes('자유') || text.includes('꿈') || text.includes('날아') || text.includes('날다') || text.includes('모험') || text.includes('도전') || text.includes('파도') || text.includes('용맹') || text.includes('민첩') || text.includes('영리') || text.includes('이끌') || text.includes('솔직') || text.includes('敏') || text.includes('率')) {
    return { id: 6, name: '6. 피터팬 (자유로운 붓터치)', font: '160px "East Sea Dokdo", cursive' };
  } 
  // 7. 술먹고갈래?: 귀여움, 사랑, 예쁨, 아름다움, 고울 연, 맑은, 통통, 애교
  else if (text.includes('귀여') || text.includes('귀엽') || text.includes('예쁜') || text.includes('예쁘') || text.includes('아름답') || text.includes('사랑') || text.includes('통통') || text.includes('애교') || text.includes('밝') || text.includes('아기') || text.includes('고울') || text.includes('妍')) {
    return { id: 7, name: '7. 술먹고갈래? (동글통통 버블)', font: 'bold 140px "Jua", sans-serif' };
  } 
  // 8. 라디오스타: 재미, 유쾌, 위트, 방송, 스타, 신나는, 개그, 시작
  else if (text.includes('재미') || text.includes('즐겁') || text.includes('유쾌') || text.includes('위트') || text.includes('신나는') || text.includes('개그') || text.includes('방송') || text.includes('스타') || text.includes('시작') || text.includes('기원') || text.includes('始')) {
    return { id: 8, name: '8. 라디오스타 (레트로 블록)', font: '900 130px "Black Han Sans", sans-serif' };
  } 
  // 9. 비판: 단단, 바위, 중후, 철학, 진실, 올바른 길, 도리, 허락, 공정
  else if (text.includes('단단') || text.includes('묵직') || text.includes('정직') || text.includes('신뢰') || text.includes('진실') || text.includes('바위') || text.includes('철학') || text.includes('중후') || text.includes('길') || text.includes('도리') || text.includes('공정') || text.includes('道') || text.includes('允')) {
    return { id: 9, name: '9. 비판 (묵직한 3D 입체 섀도우)', font: '900 135px "Do Hyeon", sans-serif' };
  } 
  // 10. 날: 축복, 상서로움, 원형, 행복, 평화, 따뜻함, 조화, 보듬
  else if (text.includes('행복') || text.includes('평화') || text.includes('따뜻') || text.includes('원형') || text.includes('완성') || text.includes('조화') || text.includes('보듬') || text.includes('상서') || text.includes('축복') || text.includes('瑞')) {
    return { id: 10, name: '10. 날 (원형 엠블럼 타이포)', font: 'bold 110px "Jua", sans-serif' };
  } 
  // 11. 미샤 안심: 특별, 세련, 트렌디, 패션, 교양, 고상, 채색, 빛나는
  else if (text.includes('특별') || text.includes('트렌디') || text.includes('감각') || text.includes('디자인') || text.includes('세련') || text.includes('패션') || text.includes('스타일리시') || text.includes('교양') || text.includes('고상') || text.includes('빛나는') || text.includes('雅') || text.includes('彬') || text.includes('彩')) {
    return { id: 11, name: '11. 미샤 안심 (기하학 테이프 폴딩)', font: 'bold 120px "Gowun Batang", serif' };
  } 
  // 12. 개판오분전: 기타 일상적이고 소박한 모든 단어
  else {
    return { id: 12, name: '12. 개판오분전 (내추럴 펜 드로잉)', font: '120px "Nanum Pen Script", cursive' };
  }
}

// 초기 안내 화면
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

// 카드 최종 렌더링
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

// 스파크 마스킹 모션 연출
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
  const totalFrames = 50;

  function animate() {
    progress += 1 / totalFrames;
    if (progress > 1) progress = 1;

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width * progress, canvas.height);
    ctx.clip();

    renderCardStyle(style, name, textColor, strokeColor, bgColor);
    ctx.restore();

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
      renderCardStyle(style, name, textColor, strokeColor, bgColor);
    }
  }

  animate();
}

// 이벤트 연결
renderBtn.addEventListener('click', startWritingMotion);

// PNG 저장 기능
downloadBtn.addEventListener('click', () => {
  const imageURI = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = `${nameInput.value || '박하음'}_타이포그래피.png`;
  link.href = imageURI;
  link.click();
});

// 초기화
window.addEventListener('load', () => {
  document.fonts.ready.then(() => {
    initCanvas();
  });
});
