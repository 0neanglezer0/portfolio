"""
영상용 데이터 시각화 생성
고품질 차트, 그래프, 히트맵을 PNG로 저장
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.font_manager as fm
import seaborn as sns
from pathlib import Path
import json

# 한글 폰트 설정
plt.rcParams['font.family'] = 'DejaVu Sans'
plt.rcParams['axes.unicode_minus'] = False

# 프로젝트 경로
PROJECT_ROOT = Path(__file__).parent.parent
DATA_DIR = PROJECT_ROOT / "data" / "processed"
OUTPUT_DIR = PROJECT_ROOT / "video" / "visualizations"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# 색상 팔레트
COLORS = {
    'good': '#3B82F6',      # 파란색 (좋음)
    'bad': '#EF4444',       # 빨간색 (나쁨)
    'neutral': '#6B7280',   # 회색
    'highlight': '#F59E0B', # 주황색
    'gradient_good': '#10B981',  # 초록
    'gradient_bad': '#DC2626'    # 진한 빨강
}

# 스타일 설정
sns.set_style("whitegrid")
plt.rcParams['figure.dpi'] = 300
plt.rcParams['savefig.dpi'] = 300
plt.rcParams['savefig.bbox'] = 'tight'


def load_data():
    """데이터 로드"""
    df = pd.read_csv(DATA_DIR / "accessibility_scores.csv")
    return df


def create_top_bottom_chart(df):
    """
    TOP 5 / BOTTOM 5 막대 그래프
    """
    print("\n📊 TOP 5 / BOTTOM 5 차트 생성 중...")

    # 정렬
    df_sorted = df.sort_values('total_accessibility_score', ascending=False)
    top5 = df_sorted.head(5)
    bottom5 = df_sorted.tail(5)

    # 합치기
    combined = pd.concat([top5, bottom5])

    fig, ax = plt.subplots(figsize=(12, 8))

    # 색상 설정 (상위는 파란색, 하위는 빨간색)
    colors = [COLORS['good']] * 5 + [COLORS['bad']] * 5

    # 막대 그래프
    bars = ax.barh(range(len(combined)), combined['total_accessibility_score'], color=colors)

    # 레이블 설정
    ax.set_yticks(range(len(combined)))
    ax.set_yticklabels(combined['district'], fontsize=14)
    ax.set_xlabel('Accessibility Score', fontsize=14, fontweight='bold')
    ax.set_title('Seoul District Accessibility: TOP 5 vs BOTTOM 5',
                 fontsize=18, fontweight='bold', pad=20)

    # 점수 표시
    for i, (idx, row) in enumerate(combined.iterrows()):
        score = row['total_accessibility_score']
        grade = row['grade']
        ax.text(score + 1, i, f'{score:.1f} ({grade})',
                va='center', fontsize=12, fontweight='bold')

    # 구분선
    ax.axhline(y=4.5, color='gray', linestyle='--', linewidth=2, alpha=0.5)

    # 평균선
    avg_score = df['total_accessibility_score'].mean()
    ax.axvline(x=avg_score, color=COLORS['neutral'],
               linestyle=':', linewidth=2, alpha=0.7, label=f'Average ({avg_score:.1f})')

    ax.legend(fontsize=12)
    ax.set_xlim(0, 75)
    ax.grid(axis='x', alpha=0.3)

    plt.tight_layout()
    output_file = OUTPUT_DIR / "top_bottom_chart.png"
    plt.savefig(output_file, dpi=300, bbox_inches='tight')
    print(f"   ✅ 저장: {output_file}")
    plt.close()


def create_radar_chart(df):
    """
    송파구 vs 금천구 레이더 차트
    """
    print("\n📊 레이더 차트 생성 중...")

    # 송파구와 금천구 데이터
    songpa = df[df['district'] == '송파구'].iloc[0]
    geumcheon = df[df['district'] == '금천구'].iloc[0]

    # 카테고리
    categories = ['Medical', 'Financial', 'Transport', 'Administrative']

    # 값
    songpa_values = [
        songpa['medical_score'],
        songpa['financial_score'],
        songpa['transport_score'],
        songpa['administrative_score']
    ]

    geumcheon_values = [
        geumcheon['medical_score'],
        geumcheon['financial_score'],
        geumcheon['transport_score'],
        geumcheon['administrative_score']
    ]

    # 각도 계산
    angles = np.linspace(0, 2 * np.pi, len(categories), endpoint=False).tolist()
    songpa_values += songpa_values[:1]
    geumcheon_values += geumcheon_values[:1]
    angles += angles[:1]

    # 플롯
    fig, ax = plt.subplots(figsize=(10, 10), subplot_kw=dict(projection='polar'))

    ax.plot(angles, songpa_values, 'o-', linewidth=2,
            label=f'Songpa ({songpa["total_accessibility_score"]:.1f})',
            color=COLORS['good'])
    ax.fill(angles, songpa_values, alpha=0.25, color=COLORS['good'])

    ax.plot(angles, geumcheon_values, 'o-', linewidth=2,
            label=f'Geumcheon ({geumcheon["total_accessibility_score"]:.1f})',
            color=COLORS['bad'])
    ax.fill(angles, geumcheon_values, alpha=0.25, color=COLORS['bad'])

    ax.set_xticks(angles[:-1])
    ax.set_xticklabels(categories, fontsize=12)
    ax.set_ylim(0, 100)
    ax.set_title('Accessibility Comparison: Songpa vs Geumcheon',
                 fontsize=16, fontweight='bold', pad=20)
    ax.legend(loc='upper right', bbox_to_anchor=(1.3, 1.1), fontsize=12)
    ax.grid(True)

    plt.tight_layout()
    output_file = OUTPUT_DIR / "radar_chart.png"
    plt.savefig(output_file, dpi=300, bbox_inches='tight')
    print(f"   ✅ 저장: {output_file}")
    plt.close()


def create_grade_distribution(df):
    """
    등급 분포 파이 차트
    """
    print("\n📊 등급 분포 파이 차트 생성 중...")

    grade_counts = df['grade'].value_counts().sort_index()

    # 색상 매핑
    grade_colors = {
        'A': '#10B981',  # 초록
        'B': '#3B82F6',  # 파란색
        'C': '#F59E0B',  # 주황색
        'D': '#EF4444',  # 빨간색
        'F': '#7F1D1D'   # 진한 빨강
    }

    colors = [grade_colors.get(grade, COLORS['neutral']) for grade in grade_counts.index]

    fig, ax = plt.subplots(figsize=(10, 8))

    wedges, texts, autotexts = ax.pie(
        grade_counts.values,
        labels=[f'Grade {g}' for g in grade_counts.index],
        autopct='%1.1f%%',
        startangle=90,
        colors=colors,
        textprops={'fontsize': 14, 'fontweight': 'bold'}
    )

    # 레전드에 개수 추가
    legend_labels = [f'Grade {g}: {count} districts'
                     for g, count in grade_counts.items()]
    ax.legend(legend_labels, loc='upper left', bbox_to_anchor=(1, 1), fontsize=12)

    ax.set_title('Seoul District Accessibility Grade Distribution',
                 fontsize=16, fontweight='bold', pad=20)

    plt.tight_layout()
    output_file = OUTPUT_DIR / "grade_distribution.png"
    plt.savefig(output_file, dpi=300, bbox_inches='tight')
    print(f"   ✅ 저장: {output_file}")
    plt.close()


def create_category_comparison(df):
    """
    카테고리별 점수 분포 박스플롯
    """
    print("\n📊 카테고리별 점수 분포 차트 생성 중...")

    # 데이터 준비
    categories_data = pd.DataFrame({
        'Medical': df['medical_score'],
        'Financial': df['financial_score'],
        'Transport': df['transport_score'],
        'Administrative': df['administrative_score']
    })

    # Melt for seaborn
    melted = categories_data.melt(var_name='Category', value_name='Score')

    fig, ax = plt.subplots(figsize=(12, 8))

    # 바이올린 플롯
    sns.violinplot(data=melted, x='Category', y='Score',
                   palette=[COLORS['good'], COLORS['highlight'],
                           COLORS['gradient_good'], COLORS['neutral']],
                   ax=ax)

    # 평균선 추가
    means = categories_data.mean()
    for i, (cat, mean) in enumerate(means.items()):
        ax.hlines(mean, i-0.4, i+0.4, color='red',
                 linestyle='--', linewidth=2, alpha=0.7)
        ax.text(i, mean + 2, f'{mean:.1f}', ha='center',
               fontsize=10, fontweight='bold', color='red')

    ax.set_ylabel('Score', fontsize=14, fontweight='bold')
    ax.set_xlabel('Category', fontsize=14, fontweight='bold')
    ax.set_title('Accessibility Score Distribution by Category',
                 fontsize=16, fontweight='bold', pad=20)
    ax.set_ylim(0, 100)
    ax.grid(axis='y', alpha=0.3)

    plt.tight_layout()
    output_file = OUTPUT_DIR / "category_comparison.png"
    plt.savefig(output_file, dpi=300, bbox_inches='tight')
    print(f"   ✅ 저장: {output_file}")
    plt.close()


def create_score_histogram(df):
    """
    총 접근성 점수 히스토그램
    """
    print("\n📊 점수 분포 히스토그램 생성 중...")

    fig, ax = plt.subplots(figsize=(12, 8))

    # 히스토그램
    n, bins, patches = ax.hist(df['total_accessibility_score'],
                                bins=15, edgecolor='black', alpha=0.7)

    # 색상 그라데이션
    cm = plt.cm.RdYlGn
    bin_centers = 0.5 * (bins[:-1] + bins[1:])
    col = bin_centers - min(bin_centers)
    col /= max(col)

    for c, p in zip(col, patches):
        plt.setp(p, 'facecolor', cm(c))

    # 평균선
    mean_score = df['total_accessibility_score'].mean()
    ax.axvline(mean_score, color='red', linestyle='--',
              linewidth=2, label=f'Average: {mean_score:.1f}')

    # 중앙값선
    median_score = df['total_accessibility_score'].median()
    ax.axvline(median_score, color='blue', linestyle='--',
              linewidth=2, label=f'Median: {median_score:.1f}')

    ax.set_xlabel('Total Accessibility Score', fontsize=14, fontweight='bold')
    ax.set_ylabel('Number of Districts', fontsize=14, fontweight='bold')
    ax.set_title('Distribution of Accessibility Scores Across Seoul Districts',
                 fontsize=16, fontweight='bold', pad=20)
    ax.legend(fontsize=12)
    ax.grid(axis='y', alpha=0.3)

    plt.tight_layout()
    output_file = OUTPUT_DIR / "score_histogram.png"
    plt.savefig(output_file, dpi=300, bbox_inches='tight')
    print(f"   ✅ 저장: {output_file}")
    plt.close()


def create_heatmap_table(df):
    """
    자치구별 카테고리 점수 히트맵
    """
    print("\n📊 점수 히트맵 테이블 생성 중...")

    # 상위 10개 구만 표시
    df_sorted = df.sort_values('total_accessibility_score', ascending=False).head(10)

    # 점수 데이터 추출
    heatmap_data = df_sorted[['medical_score', 'financial_score',
                               'transport_score', 'administrative_score']].values

    fig, ax = plt.subplots(figsize=(10, 12))

    im = ax.imshow(heatmap_data, cmap='RdYlGn', aspect='auto', vmin=0, vmax=100)

    # 축 설정
    ax.set_xticks(range(4))
    ax.set_xticklabels(['Medical', 'Financial', 'Transport', 'Administrative'],
                       fontsize=12, rotation=45, ha='right')
    ax.set_yticks(range(len(df_sorted)))
    ax.set_yticklabels(df_sorted['district'], fontsize=12)

    # 점수 텍스트 표시
    for i in range(len(df_sorted)):
        for j in range(4):
            text = ax.text(j, i, f'{heatmap_data[i, j]:.1f}',
                          ha="center", va="center", color="black",
                          fontsize=10, fontweight='bold')

    ax.set_title('Top 10 Districts: Category Score Heatmap',
                 fontsize=16, fontweight='bold', pad=20)

    # 컬러바
    cbar = plt.colorbar(im, ax=ax)
    cbar.set_label('Score', rotation=270, labelpad=20, fontsize=12, fontweight='bold')

    plt.tight_layout()
    output_file = OUTPUT_DIR / "heatmap_table.png"
    plt.savefig(output_file, dpi=300, bbox_inches='tight')
    print(f"   ✅ 저장: {output_file}")
    plt.close()


def create_gap_visualization(df):
    """
    격차 시각화 (최고 vs 최저)
    """
    print("\n📊 격차 시각화 생성 중...")

    max_score = df['total_accessibility_score'].max()
    min_score = df['total_accessibility_score'].min()
    gap = max_score - min_score

    max_district = df.loc[df['total_accessibility_score'].idxmax(), 'district']
    min_district = df.loc[df['total_accessibility_score'].idxmin(), 'district']

    fig, ax = plt.subplots(figsize=(12, 8))

    # 막대
    bars = ax.bar(['Highest\n(Songpa)', 'Lowest\n(Geumcheon)'],
                  [max_score, min_score],
                  color=[COLORS['good'], COLORS['bad']],
                  width=0.6, edgecolor='black', linewidth=2)

    # 점수 표시
    ax.text(0, max_score + 2, f'{max_score:.1f}',
           ha='center', fontsize=24, fontweight='bold')
    ax.text(1, min_score + 2, f'{min_score:.1f}',
           ha='center', fontsize=24, fontweight='bold')

    # 격차 화살표
    ax.annotate('', xy=(1, max_score), xytext=(1, min_score),
                arrowprops=dict(arrowstyle='<->', color='red', lw=3))
    ax.text(1.2, (max_score + min_score) / 2,
           f'Gap\n{gap:.1f}pts\n({gap/min_score*100:.1f}%)',
           fontsize=18, fontweight='bold', color='red',
           va='center')

    ax.set_ylabel('Accessibility Score', fontsize=14, fontweight='bold')
    ax.set_title('Seoul Accessibility Gap: Highest vs Lowest District',
                 fontsize=18, fontweight='bold', pad=20)
    ax.set_ylim(0, 80)
    ax.grid(axis='y', alpha=0.3)

    plt.tight_layout()
    output_file = OUTPUT_DIR / "gap_visualization.png"
    plt.savefig(output_file, dpi=300, bbox_inches='tight')
    print(f"   ✅ 저장: {output_file}")
    plt.close()


def generate_all_visualizations():
    """모든 시각화 생성"""
    print("=" * 80)
    print("🎨 영상용 데이터 시각화 생성 시작")
    print("=" * 80)

    # 데이터 로드
    df = load_data()
    print(f"\n📁 데이터 로드: {len(df)}개 자치구")

    # 시각화 생성
    create_top_bottom_chart(df)
    create_radar_chart(df)
    create_grade_distribution(df)
    create_category_comparison(df)
    create_score_histogram(df)
    create_heatmap_table(df)
    create_gap_visualization(df)

    print("\n" + "=" * 80)
    print("✅ 모든 시각화 생성 완료!")
    print(f"📁 저장 위치: {OUTPUT_DIR}")
    print("=" * 80)

    # 생성된 파일 목록
    print("\n📊 생성된 파일:")
    for file in sorted(OUTPUT_DIR.glob("*.png")):
        print(f"   • {file.name}")


if __name__ == "__main__":
    generate_all_visualizations()
