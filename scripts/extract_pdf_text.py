#!/usr/bin/env python3
"""
PDF 텍스트 추출 스크립트

Usage:
    python extract_pdf_text.py input.pdf [output.txt]

PDF 파일에서 모든 텍스트를 추출하여 출력하거나 파일로 저장합니다.
"""

import sys
import argparse
from pathlib import Path

try:
    import pdfplumber
    PDF_LIBRARY = 'pdfplumber'
except ImportError:
    try:
        from PyPDF2 import PdfReader
        PDF_LIBRARY = 'pypdf2'
    except ImportError:
        print("오류: PDF 라이브러리가 설치되지 않았습니다.")
        print("다음 중 하나를 설치해주세요:")
        print("  pip install pdfplumber")
        print("  또는")
        print("  pip install PyPDF2")
        sys.exit(1)


def extract_text_with_pdfplumber(pdf_path):
    """pdfplumber를 사용하여 PDF 텍스트 추출"""
    text_content = []

    with pdfplumber.open(pdf_path) as pdf:
        total_pages = len(pdf.pages)
        print(f"총 {total_pages}페이지 처리 중...", file=sys.stderr)

        for i, page in enumerate(pdf.pages, 1):
            print(f"페이지 {i}/{total_pages} 처리 중...", file=sys.stderr)
            text = page.extract_text()
            if text:
                text_content.append(f"{'='*60}")
                text_content.append(f"페이지 {i}")
                text_content.append(f"{'='*60}")
                text_content.append(text)
                text_content.append("")  # 빈 줄 추가

    return "\n".join(text_content)


def extract_text_with_pypdf2(pdf_path):
    """PyPDF2를 사용하여 PDF 텍스트 추출"""
    text_content = []

    reader = PdfReader(pdf_path)
    total_pages = len(reader.pages)
    print(f"총 {total_pages}페이지 처리 중...", file=sys.stderr)

    for i, page in enumerate(reader.pages, 1):
        print(f"페이지 {i}/{total_pages} 처리 중...", file=sys.stderr)
        text = page.extract_text()
        if text:
            text_content.append(f"{'='*60}")
            text_content.append(f"페이지 {i}")
            text_content.append(f"{'='*60}")
            text_content.append(text)
            text_content.append("")  # 빈 줄 추가

    return "\n".join(text_content)


def extract_pdf_text(pdf_path):
    """PDF 파일에서 텍스트 추출"""
    pdf_path = Path(pdf_path)

    if not pdf_path.exists():
        raise FileNotFoundError(f"PDF 파일을 찾을 수 없습니다: {pdf_path}")

    if not pdf_path.suffix.lower() == '.pdf':
        raise ValueError(f"PDF 파일이 아닙니다: {pdf_path}")

    print(f"PDF 라이브러리: {PDF_LIBRARY}", file=sys.stderr)
    print(f"파일: {pdf_path}", file=sys.stderr)
    print("", file=sys.stderr)

    if PDF_LIBRARY == 'pdfplumber':
        return extract_text_with_pdfplumber(pdf_path)
    else:
        return extract_text_with_pypdf2(pdf_path)


def main():
    parser = argparse.ArgumentParser(
        description='PDF 파일에서 텍스트를 추출합니다.',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
사용 예시:
  # 화면에 출력
  python extract_pdf_text.py document.pdf

  # 파일로 저장
  python extract_pdf_text.py document.pdf output.txt

  # 여러 PDF 처리
  python extract_pdf_text.py file1.pdf file1.txt
  python extract_pdf_text.py file2.pdf file2.txt
        """
    )

    parser.add_argument('pdf_file', help='추출할 PDF 파일 경로')
    parser.add_argument('output_file', nargs='?', help='출력 텍스트 파일 경로 (선택사항)')
    parser.add_argument('--encoding', default='utf-8', help='출력 파일 인코딩 (기본값: utf-8)')

    args = parser.parse_args()

    try:
        # 텍스트 추출
        extracted_text = extract_pdf_text(args.pdf_file)

        # 결과 출력 또는 저장
        if args.output_file:
            output_path = Path(args.output_file)
            output_path.write_text(extracted_text, encoding=args.encoding)
            print(f"\n추출 완료! 저장 위치: {output_path}", file=sys.stderr)
            print(f"총 {len(extracted_text)} 문자 추출됨", file=sys.stderr)
        else:
            # 화면에 출력
            print("\n" + "="*60, file=sys.stderr)
            print("추출된 텍스트:", file=sys.stderr)
            print("="*60 + "\n", file=sys.stderr)
            print(extracted_text)
            print(f"\n총 {len(extracted_text)} 문자 추출됨", file=sys.stderr)

    except Exception as e:
        print(f"\n오류 발생: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    main()
