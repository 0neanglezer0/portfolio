# 이력서 파일 가이드

About 페이지에 이력서 다운로드 버튼이 있습니다.
이 버튼이 작동하려면 이력서 PDF 파일을 추가해야 합니다.

## 필요한 파일

- **파일 위치**: `/public/resume.pdf`
- **파일명**: `resume.pdf` (정확히 이 이름이어야 합니다)
- **형식**: PDF

## 이력서 파일 추가 방법

1. 이력서를 PDF 형식으로 준비합니다.
2. 파일 이름을 `resume.pdf`로 변경합니다.
3. 이 파일을 `/public/` 폴더에 복사합니다.

```bash
# 예시 (터미널에서)
cp ~/Downloads/my-resume.pdf /home/user/portfolio/public/resume.pdf
```

## 이력서 작성 도구

### 온라인 도구
- **Canva Resume**: https://www.canva.com/resumes/
- **Notion Resume**: Notion에서 작성 후 PDF로 내보내기
- **Google Docs**: 문서 작성 후 PDF로 다운로드

### AI 도구 활용
- **Claude/ChatGPT**: 이력서 내용 작성 도움
- **Gamma**: 이력서 디자인 자동 생성

### 디자인 템플릿
- **Figma Resume Templates**: 무료 템플릿 활용
- **Overleaf (LaTeX)**: 전문적인 이력서 작성

## 이력서 내용 체크리스트

✅ 개인 정보 (이름, 연락처, 이메일)
✅ 학력
✅ 경력 (회사명, 직책, 기간, 주요 업무)
✅ 주요 프로젝트 및 성과
✅ 보유 스킬 및 도구
✅ 자격증 및 수상 경력 (있을 경우)

## 파일 크기

- **권장**: 2MB 이하
- **최대**: 5MB 이하

## 파일 이름 변경이 필요한 경우

만약 다른 파일명을 사용하고 싶다면, About 페이지의 코드를 수정하세요:

```tsx
// app/about/page.tsx 파일의 52-63번째 줄
<a
  href="/resume.pdf"  // 이 부분을 원하는 파일명으로 변경
  download
  className="..."
>
```

## 없을 경우

이력서 파일이 없으면 다운로드 버튼을 클릭해도 파일이 다운로드되지 않습니다.
404 에러가 발생합니다.
