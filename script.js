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

// 한자/한글 뜻/성향 키워드 대규모 감성 분류 알고리즘
function analyzeSentiment(meaning) {
  const t = meaning.toLowerCase();

  // 1. 은은한 네온 광원 (신성, 우주, 별, 빛, 은혜, 하늘, 신앙 관련)
  const group1 = ['하나님', '음성', '새벽', '빛', '하늘', '지키', '신', '우주', '별', '영혼', '은혜', '신앙', '천사', '구원', '기도', '성령', '믿음', '은', '효', '旻', '宇', '星', '恩', '曉'];
  // 2. 클래식 단정 명조 (지혜, 바름, 올곧음, 어짊, 슬기, 지성, 학문)
  const group2 = ['바른', '어질', '현명', '우아', '올곧', '정신', '깨끗', '마음', '고귀', '지혜', '단정', '지성', '슬기', '이치', '논리', '학자', '선비', '학문', '도덕', '예의', '智', '賢', '正', '理', '哲'];
  // 3. 3D 입체 팝 블록 (최고, 짱, 주인공, 열정, 자신감, 준수, 뛰어남)
  const group3 = ['최고', '짱', '당당', '화려', '열정', '에너지', '자신감', '주인공', '뛰어난', '빼어난', '준수', '준걸', '인기', '에이스', '리더', '중심', '목표', '성공', '俊', '秀', '傑'];
  // 4. 자연 캘리그라피 (꽃, 숲, 바람, 이슬, 계절, 순수, 식물, 향기)
  const group4 = ['맑', '순수', '꽃', '자연', '숲', '바람', '향기', '봄', '이슬', '샘', '식물', '여름', '가을', '겨울', '산', '강', '바다', '초목', '나무', '잎', '夏', '芸', '綠', '花'];
  // 5. 굵은 외곽선 라운딩 (강함, 힘, 건강, 건설, 계승, 업적, 기둥)
  const group5 = ['힘', '강', '용기', '키큰', '높은', '거대한', '든든', '건강', '우뚝', '세상', '세우', '건설', '업적', '계승', '기둥', '정복', '불굴', '승리', '建', '勳', '承', '强'];
  // 6. 자유로운 붓터치 (자유, 꿈, 도전, 파도, 날다, 솔직, 민첩, 모험)
  const group6 = ['자유', '꿈', '날아', '날다', '모험', '도전', '파도', '용맹', '민첩', '영리', '이끌', '솔직', '개척', '질주', '탐험', '날개', '비상', '敏', '率', '飛', '浪'];
  // 7. 동글통통 버블 (귀여움, 사랑, 예쁨, 아름다움, 통통, 애교, 아기)
  const group7 = ['귀여', '귀엽', '예쁜', '예쁘', '아름답', '사랑', '통통', '애교', '밝', '아기', '고울', '미소', '미인', '귀부인', '인형', '포근', '妍', '愛', '美'];
  // 8. 레트로 블록 (재미, 유쾌, 위트, 스타, 신나는, 개그, 방송, 시작)
  const group8 = ['재미', '즐겁', '유쾌', '위트', '신나는', '개그', '방송', '스타', '시작', '기원', '축제', '웃음', '해학', '엔터테인', '始', '興', '樂'];
  // 9. 묵직한 3D 입체 섀도우 (단단, 묵직, 정직, 신뢰, 진실, 바위, 길, 도리)
  const group9 = ['단단', '묵직', '정직', '신뢰', '진실', '바위', '철학', '중후', '길', '도리', '공정', '신념', '성실', '책임', '약속', '道', '允', '信', '實'];
  // 10. 원형 엠블럼 타이포 (행복, 평화, 따뜻, 완성, 조화, 축복, 상서)
  const group10 = ['행복', '평화', '따뜻', '원형', '완성', '조화', '보듬', '상서', '축복', '안정', '화목', '결실', '나눔', '包', '瑞', '和', '福'];
  // 11. 기하학 테이프 폴딩 (특별, 세련, 트렌디, 디자인, 패션, 교양, 고상)
  const group11 = ['특별', '트렌디', '감각', '디자인', '세련', '패션', '스타일리시', '교양', '고상', '빛나는', '예술', '창의', '세련된', '雅', '彬', '彩', '藝'];

  const matches = (arr) => arr.some(k => t.includes(k));

  if (matches(group1)) return { id: 1, name: '은은한 네온 광원', font: 'bold 140px "Sunflower", sans-serif' };
  if (matches(group2)) return { id: 2, name: '클래식 단정 명조', font: 'bold 120px "Song Myung", serif' };
  if (matches(group3)) return { id: 3, name: '3D 입체 팝 블록', font: '900 130px "Do Hyeon", sans-serif' };
  if (matches(group4)) return { id: 4, name: '자연 캘리그라피', font: '130px "Nanum Pen Script", cursive' };
  if (matches(group5)) return { id: 5, name: '굵은 외곽선 라운딩', font: 'bold 135px "Jua", sans-serif' };
  if (matches(group6)) return { id: 6, name: '자유로운 붓터치', font: '160px "East Sea Dokdo", cursive' };
  if (matches(group7)) return { id: 7, name: '동글통통 버블', font: 'bold 140px "Jua", sans-serif' };
  if (matches(group8)) return { id: 8, name: '레트로 블록', font: '900 130px "Black Han Sans", sans-serif' };
  if (matches(group9)) return { id: 9, name: '묵직한 3D 입체 섀도우', font: '900 135px "Do Hyeon", sans-serif' };
  if (matches(group10)) return { id: 10, name: '원형 엠블럼 타이포', font: 'bold 110px "Jua", sans-serif' };
  if (matches(group11)) return { id: 11, name: '기하학 테이프 폴딩', font: 'bold 120px "Gowun Batang", serif' };

  return { id: 12, name: '내추럴 펜 드로잉', font: '120px "Nanum Pen Script", cursive' };
}

// 대기 화면 렌더링
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

// 완성된 카드 렌더링
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

// 획 필치 감성의 실시간 써내려가는 드로잉 모션
function startWritingMotion() {
  if (animationId) cancelAnimationFrame(animationId);

  // 입력값이 없을 때만 기본 예시 사용
  const name = nameInput.value.trim() || '박하음';
  const meaning = meaningInput.value.trim() || '하나님의 음성을 듣는 사람';
  const textColor = textColorInput.value;
  const strokeColor = strokeColorInput.value;
  const bgColor = bgColorInput.value;

  const style = analyzeSentiment(meaning);
  detectedStyleText.innerText = style.name;

  let progress = 0;
  const totalFrames = 60; // 드로잉 필치감을 위해 속도 최적화

  function animate() {
    progress += 1 / totalFrames;
    if (progress > 1) progress = 1;

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.beginPath();
    // 가로 및 곡선 가속 연산으로 손글씨 필치감 구현
    ctx.rect(0, 0, canvas.width * progress, canvas.height);
    ctx.clip();

    renderCardStyle(style, name, textColor, strokeColor, bgColor);
    ctx.restore();

    if (progress < 1) {
      const sparkX = canvas.width * progress;
      ctx.save();
      ctx.shadowColor = strokeColor;
      ctx.shadowBlur = 35;
      ctx.fillStyle = strokeColor;
      ctx.beginPath();
      ctx.arc(sparkX, canvas.height / 2, 18, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(sparkX, canvas.height / 2, 7, 0, Math.PI * 2);
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

downloadBtn.addEventListener('click', () => {
  const imageURI = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = `${nameInput.value || '박하음'}_타이포그래피.png`;
  link.href = imageURI;
  link.click();
});

window.addEventListener('load', () => {
  document.fonts.ready.then(() => {
    initCanvas();
  });
});
