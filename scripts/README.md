# PDF 텍스트 추출 스크립트

PDF 파일에서 모든 텍스트를 추출하는 파이썬 스크립트입니다.

## 설치 방법

```bash
# 의존성 패키지 설치
pip install -r requirements.txt
```

또는 개별 설치:

```bash
# 옵션 1: pdfplumber (권장)
pip install pdfplumber

# 옵션 2: PyPDF2
pip install PyPDF2
```

## 사용 방법

### 1. 화면에 텍스트 출력

```bash
python extract_pdf_text.py your_file.pdf
```

### 2. 텍스트 파일로 저장

```bash
python extract_pdf_text.py your_file.pdf output.txt
```

### 3. 다른 인코딩 사용

```bash
python extract_pdf_text.py your_file.pdf output.txt --encoding utf-8
```

## 예시

```bash
# PDF를 scripts 폴더에 복사
cp ~/Downloads/document.pdf ./

# 텍스트 추출하여 파일로 저장
python extract_pdf_text.py document.pdf document_text.txt

# 추출된 텍스트 확인
cat document_text.txt
```

## 기능

- ✅ 모든 페이지에서 텍스트 추출
- ✅ 페이지별로 구분하여 출력
- ✅ 진행 상황 표시
- ✅ 두 가지 PDF 라이브러리 지원 (pdfplumber, PyPDF2)
- ✅ 화면 출력 또는 파일 저장 옵션

## 주의사항

- 이미지로만 된 PDF(스캔본)는 텍스트 추출이 불가능합니다. OCR이 필요합니다.
- 암호화된 PDF는 사전에 암호를 해제해야 합니다.
- 복잡한 레이아웃의 PDF는 텍스트 순서가 의도와 다를 수 있습니다.

## 문제 해결

### 설치 오류 발생 시

```bash
# pip 업그레이드
pip install --upgrade pip

# 다시 설치
pip install pdfplumber
```

### 한글 깨짐 현상

```bash
# UTF-8 인코딩 명시
python extract_pdf_text.py file.pdf output.txt --encoding utf-8
```
