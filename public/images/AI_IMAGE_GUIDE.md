# Work 썸네일 이미지 AI 생성 가이드

Work 페이지의 7개 경력 카드 썸네일 이미지를 AI로 생성하는 방법입니다.

## 📐 이미지 사양

- **크기**: 1200x900px (4:3 비율)
- **형식**: JPG
- **스타일**: 미니멀, 프로페셔널, 일관성 있는 톤앤매너

## 🎨 추천 AI 도구

### 1. Midjourney (추천!)
- 가장 고품질, 일관성 있는 결과
- Discord에서 사용
- 유료 ($10/월)
- 프롬프트: `professional minimalist [description] --ar 4:3 --style raw`

### 2. DALL-E 3 (ChatGPT Plus)
- ChatGPT Plus 구독자 사용 가능
- 사용하기 쉬움
- 프롬프트: "Create a professional minimalist thumbnail image for [description], 4:3 aspect ratio"

### 3. Ideogram (무료!)
- 무료로 사용 가능
- 품질 좋음
- https://ideogram.ai

### 4. Leonardo.ai (무료!)
- 하루 150 크레딧 무료
- 다양한 스타일
- https://leonardo.ai

## 📝 각 경력별 추천 프롬프트

### 1. B2B AX Manager (b2b-ax-manager.jpg)
```
A professional minimalist image representing AI education and workshop design.
Modern workspace with AI tools, screens showing ChatGPT/Claude interface,
people collaborating in a workshop setting. Clean, corporate aesthetic.
4:3 aspect ratio, high quality, professional photography style.
```

**키워드**: AI education, workshop, collaboration, modern office, digital learning

### 2. Marketing Campaign Operator (marketing-campaign-operator.jpg)
```
A sleek minimalist image representing marketing automation and campaign design.
Dashboard with analytics, campaign flow diagrams, n8n automation interface.
Modern, data-driven aesthetic with graphs and metrics.
4:3 aspect ratio, professional, clean design.
```

**키워드**: marketing automation, analytics dashboard, campaign management, data visualization

### 3. Overseas Camp Leader (overseas-camp-leader.jpg)
```
A warm professional image representing international youth education program.
Group of diverse students in outdoor/cultural exchange setting,
globe or world map elements, leadership concept.
Bright, friendly, educational atmosphere.
4:3 aspect ratio, high quality.
```

**키워드**: international education, youth camp, cultural exchange, leadership, global

### 4. AI Forum Planning Intern (ai-forum-planning-intern.jpg)
```
A modern professional image representing AI forum and event planning.
Conference hall setup, AI technology symbols, people networking,
event planning elements. Sophisticated tech conference aesthetic.
4:3 aspect ratio, professional photography.
```

**키워드**: AI conference, forum, event planning, technology, networking

### 5. Data Content Creator (data-content-creator.jpg)
```
A clean professional image representing data visualization and content design.
Charts, graphs, infographics, presentation slides with data.
Modern design workspace with Tableau/analytics tools.
Clean, organized, data-driven aesthetic.
4:3 aspect ratio, professional.
```

**키워드**: data visualization, infographics, presentation design, analytics, charts

### 6. Campus Town Supporter (campus-town-supporter.jpg)
```
A vibrant professional image representing startup support and campus community.
University campus setting, startup ecosystem, collaboration spaces,
young entrepreneurs working together. Energetic, innovative atmosphere.
4:3 aspect ratio, modern photography.
```

**키워드**: startup, campus, entrepreneurship, community, innovation

### 7. Volunteer Media Instructor (volunteer-media-instructor.jpg)
```
A warm educational image representing presentation skills teaching.
Classroom setting, PowerPoint presentation, teacher helping students,
educational materials. Friendly, supportive learning environment.
4:3 aspect ratio, natural lighting, educational photography.
```

**키워드**: education, teaching, presentation, PowerPoint, classroom, mentoring

## 🎯 스타일 통일 팁

**모든 이미지에 공통 적용할 키워드:**
- `professional photography`
- `clean minimal design`
- `soft natural lighting`
- `modern corporate aesthetic`
- `4:3 aspect ratio`
- `high quality 8k`

**색상 톤:**
- 밝고 깨끗한 톤
- 중성적인 배경 (흰색, 회색, 파스텔)
- 포인트 컬러는 청록색, 보라색, 주황색 계열 (프로젝트 gradient와 맞춤)

## 🔧 생성 후 작업

### 1. 이미지 다운로드 후 리사이즈
무료 도구 사용:
- **Squoosh**: https://squoosh.app/ (웹)
- **TinyPNG**: https://tinypng.com/ (압축)
- **Preview (Mac)**: 이미지 열고 Tools > Adjust Size

### 2. 파일 이름 변경
정확히 다음 이름으로 저장:
- `b2b-ax-manager.jpg`
- `marketing-campaign-operator.jpg`
- `overseas-camp-leader.jpg`
- `ai-forum-planning-intern.jpg`
- `data-content-creator.jpg`
- `campus-town-supporter.jpg`
- `volunteer-media-instructor.jpg`

### 3. 업로드 위치
```
/public/images/work/
```

## 💡 쉬운 대안

시간이 없다면:
1. **Unsplash/Pexels** 무료 고품질 사진 사용
2. **Canva** 템플릿으로 빠르게 디자인
3. **실제 활동 사진** 있다면 그것 사용

## 📌 다음 단계

이미지 생성 완료 후:
1. `/public/images/work/` 폴더에 업로드
2. 브라우저에서 `http://localhost:3000/work` 확인
3. 각 카드에 이미지가 제대로 표시되는지 확인!
