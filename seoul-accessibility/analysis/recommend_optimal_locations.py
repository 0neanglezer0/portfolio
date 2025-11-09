"""
AI 기반 최적 서비스 입지 추천 알고리즘
접근성 취약 지역에 신규 시설을 배치하여 격차를 최소화
"""

import pandas as pd
import numpy as np
from pathlib import Path
import json

# 프로젝트 경로
PROJECT_ROOT = Path(__file__).parent.parent
DATA_DIR = PROJECT_ROOT / "data"
RAW_DIR = DATA_DIR / "raw"
PROCESSED_DIR = DATA_DIR / "processed"
OUTPUT_DIR = PROJECT_ROOT / "video" / "recommendations"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


def haversine_distance(lat1, lon1, lat2, lon2):
    """두 지점 간 거리 계산 (km)"""
    R = 6371
    lat1, lon1, lat2, lon2 = map(np.radians, [lat1, lon1, lat2, lon2])
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = np.sin(dlat/2)**2 + np.cos(lat1) * np.cos(lat2) * np.sin(dlon/2)**2
    c = 2 * np.arcsin(np.sqrt(a))
    return R * c


def calculate_coverage_score(facility_lat, facility_lon, district_lat, district_lon):
    """시설이 특정 지역에 제공하는 접근성 점수"""
    distance = haversine_distance(facility_lat, facility_lon, district_lat, district_lon)
    # 거리가 가까울수록 높은 점수 (역수 관계)
    # 10km 이상은 거의 0점
    if distance > 10:
        return 0
    return 100 * (1 - distance / 10)


def find_optimal_hospital_location(districts_df, hospitals_df, target_district):
    """
    특정 구에 병원을 추가할 최적 위치 찾기
    """
    print(f"\n🏥 {target_district} 최적 병원 입지 분석 중...")

    target = districts_df[districts_df['district'] == target_district].iloc[0]

    # 해당 구의 경계 내에서 그리드 포인트 생성
    # 간단하게 구 중심에서 ±0.03도 범위 (약 3km)
    lat_points = np.linspace(target['latitude'] - 0.03, target['latitude'] + 0.03, 10)
    lon_points = np.linspace(target['longitude'] - 0.03, target['longitude'] + 0.03, 10)

    best_score = -1
    best_location = None

    for lat in lat_points:
        for lon in lon_points:
            # 기존 병원들과의 거리 계산
            distances_to_existing = []
            for _, hospital in hospitals_df[hospitals_df['district'] == target_district].iterrows():
                dist = haversine_distance(lat, lon, hospital['latitude'], hospital['longitude'])
                distances_to_existing.append(dist)

            # 기존 병원과 너무 가까우면 점수 감소
            if distances_to_existing and min(distances_to_existing) < 0.5:
                continue

            # 구 중심과의 거리
            dist_to_center = haversine_distance(lat, lon, target['latitude'], target['longitude'])

            # 점수: 중심에서 적당히 떨어진 곳, 기존 병원과도 적당한 거리
            score = 100 - dist_to_center * 30

            if score > best_score:
                best_score = score
                best_location = {'latitude': lat, 'longitude': lon}

    print(f"   ✅ 최적 위치: ({best_location['latitude']:.4f}, {best_location['longitude']:.4f})")
    print(f"   ✅ 최적화 점수: {best_score:.2f}")

    return best_location


def simulate_new_hospital(districts_df, hospitals_df, target_district, new_location):
    """
    신규 병원 추가 시 접근성 개선 시뮬레이션
    """
    print(f"\n📊 {target_district} 신규 병원 효과 시뮬레이션 중...")

    target = districts_df[districts_df['district'] == target_district].iloc[0]

    # BEFORE: 현재 접근성
    current_hospitals = hospitals_df[hospitals_df['district'] == target_district]

    if len(current_hospitals) == 0:
        current_avg_dist = 10.0  # 병원 없으면 가정값
    else:
        distances = [haversine_distance(target['latitude'], target['longitude'],
                                        row['latitude'], row['longitude'])
                    for _, row in current_hospitals.iterrows()]
        current_avg_dist = np.mean(sorted(distances)[:min(5, len(distances))])

    # AFTER: 신규 병원 추가
    new_hospital_dist = haversine_distance(
        target['latitude'], target['longitude'],
        new_location['latitude'], new_location['longitude']
    )

    all_distances = distances + [new_hospital_dist] if len(current_hospitals) > 0 else [new_hospital_dist]
    new_avg_dist = np.mean(sorted(all_distances)[:min(5, len(all_distances))])

    # 점수 계산
    def dist_to_score(dist):
        if dist == 0:
            return 100
        return 100 / (1 + dist * 5)

    current_score = dist_to_score(current_avg_dist)
    new_score = dist_to_score(new_avg_dist)
    improvement = ((new_score - current_score) / current_score * 100) if current_score > 0 else 100

    # 수혜 인구 (해당 구 인구)
    beneficiary_population = target['population']

    # 접근성 개선 인구 (3km 이내 인구)
    improved_pop = beneficiary_population * 0.4  # 가정: 40%가 접근성 개선

    result = {
        'district': target_district,
        'new_location': new_location,
        'current_hospitals': len(current_hospitals),
        'current_avg_distance_km': round(current_avg_dist, 2),
        'new_avg_distance_km': round(new_avg_dist, 2),
        'distance_reduction_km': round(current_avg_dist - new_avg_dist, 2),
        'current_score': round(current_score, 2),
        'new_score': round(new_score, 2),
        'improvement_percent': round(improvement, 1),
        'beneficiary_population': int(beneficiary_population),
        'improved_accessibility_population': int(improved_pop)
    }

    print(f"\n   📈 시뮬레이션 결과:")
    print(f"      • 현재 병원 수: {result['current_hospitals']}개")
    print(f"      • 평균 거리: {result['current_avg_distance_km']}km → {result['new_avg_distance_km']}km")
    print(f"      • 거리 단축: {result['distance_reduction_km']}km")
    print(f"      • 접근성 점수: {result['current_score']} → {result['new_score']} (+{result['improvement_percent']}%)")
    print(f"      • 수혜 인구: {result['beneficiary_population']:,}명")
    print(f"      • 접근성 개선 인구: {result['improved_accessibility_population']:,}명")

    return result


def find_optimal_locations_for_multiple_facilities(districts_df, accessibility_df, facility_type='hospital', num_facilities=5):
    """
    접근성 점수 기반으로 여러 시설의 최적 입지 찾기
    """
    print(f"\n🎯 {facility_type.upper()} {num_facilities}개 최적 배치 분석 중...")

    # 접근성 점수 낮은 순으로 정렬
    if facility_type == 'hospital':
        score_column = 'medical_score'
    elif facility_type == 'bank':
        score_column = 'financial_score'
    elif facility_type == 'subway':
        score_column = 'transport_score'
    else:
        score_column = 'total_accessibility_score'

    low_accessibility = accessibility_df.nsmallest(num_facilities, score_column)

    recommendations = []

    for _, row in low_accessibility.iterrows():
        district = row['district']
        score = row[score_column]

        # 해당 구의 중심 좌표
        district_info = districts_df[districts_df['district'] == district].iloc[0]

        recommendation = {
            'district': district,
            'current_score': round(score, 2),
            'population': int(district_info['population']),
            'recommended_location': {
                'latitude': district_info['latitude'],
                'longitude': district_info['longitude']
            },
            'priority': len(recommendations) + 1,
            'expected_improvement': round((100 - score) * 0.3, 1)  # 30% 개선 가정
        }

        recommendations.append(recommendation)

    print(f"\n   ✅ TOP {num_facilities} 우선순위 지역:")
    for rec in recommendations:
        print(f"      {rec['priority']}. {rec['district']} (현재 {rec['current_score']}점 → 예상 +{rec['expected_improvement']}점)")

    return recommendations


def analyze_accessibility_improvement_scenarios():
    """
    여러 시나리오의 접근성 개선 효과 분석
    """
    print("=" * 80)
    print("🤖 AI 기반 최적 입지 추천 알고리즘")
    print("=" * 80)

    # 데이터 로드
    districts = pd.read_csv(RAW_DIR / "districts.csv")
    hospitals = pd.read_csv(RAW_DIR / "hospitals.csv")
    accessibility = pd.read_csv(PROCESSED_DIR / "accessibility_scores.csv")

    print(f"\n📁 데이터 로드:")
    print(f"   • 자치구: {len(districts)}개")
    print(f"   • 병원: {len(hospitals)}개")
    print(f"   • 접근성 데이터: {len(accessibility)}개 구")

    # ========================================
    # 시나리오 1: 금천구에 종합병원 추가
    # ========================================
    print("\n" + "=" * 80)
    print("📍 시나리오 1: 금천구 종합병원 신규 건립")
    print("=" * 80)

    geumcheon_location = find_optimal_hospital_location(districts, hospitals, '금천구')
    geumcheon_result = simulate_new_hospital(districts, hospitals, '금천구', geumcheon_location)

    # ========================================
    # 시나리오 2: 강북구에 종합병원 추가
    # ========================================
    print("\n" + "=" * 80)
    print("📍 시나리오 2: 강북구 종합병원 신규 건립")
    print("=" * 80)

    gangbuk_location = find_optimal_hospital_location(districts, hospitals, '강북구')
    gangbuk_result = simulate_new_hospital(districts, hospitals, '강북구', gangbuk_location)

    # ========================================
    # 시나리오 3: 전체 최적화 (병원 5개)
    # ========================================
    print("\n" + "=" * 80)
    print("📍 시나리오 3: 의료 접근성 개선을 위한 병원 5개 최적 배치")
    print("=" * 80)

    hospital_recommendations = find_optimal_locations_for_multiple_facilities(
        districts, accessibility, facility_type='hospital', num_facilities=5
    )

    # ========================================
    # 시나리오 4: 전체 최적화 (은행 5개)
    # ========================================
    print("\n" + "=" * 80)
    print("📍 시나리오 4: 금융 접근성 개선을 위한 은행 5개 최적 배치")
    print("=" * 80)

    bank_recommendations = find_optimal_locations_for_multiple_facilities(
        districts, accessibility, facility_type='bank', num_facilities=5
    )

    # ========================================
    # 결과 저장
    # ========================================
    results = {
        'scenario_1_geumcheon_hospital': geumcheon_result,
        'scenario_2_gangbuk_hospital': gangbuk_result,
        'scenario_3_hospital_recommendations': hospital_recommendations,
        'scenario_4_bank_recommendations': bank_recommendations,
        'summary': {
            'total_scenarios': 4,
            'total_recommendations': len(hospital_recommendations) + len(bank_recommendations),
            'expected_total_beneficiaries': (
                geumcheon_result['improved_accessibility_population'] +
                gangbuk_result['improved_accessibility_population']
            )
        }
    }

    # JSON 저장
    output_file = OUTPUT_DIR / "optimal_locations.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

    print(f"\n✅ 결과 저장: {output_file}")

    # 요약 리포트 저장
    report = f"""# AI 최적 입지 추천 분석 리포트

## 시나리오 1: 금천구 종합병원 신규 건립

**현황:**
- 현재 병원 수: {geumcheon_result['current_hospitals']}개
- 평균 거리: {geumcheon_result['current_avg_distance_km']}km
- 현재 접근성 점수: {geumcheon_result['current_score']}

**개선 효과:**
- 신규 병원 위치: ({geumcheon_result['new_location']['latitude']:.4f}, {geumcheon_result['new_location']['longitude']:.4f})
- 평균 거리 단축: {geumcheon_result['distance_reduction_km']}km
- 접근성 점수: {geumcheon_result['new_score']} (+{geumcheon_result['improvement_percent']}%)
- 수혜 인구: {geumcheon_result['improved_accessibility_population']:,}명

---

## 시나리오 2: 강북구 종합병원 신규 건립

**현황:**
- 현재 병원 수: {gangbuk_result['current_hospitals']}개
- 평균 거리: {gangbuk_result['current_avg_distance_km']}km
- 현재 접근성 점수: {gangbuk_result['current_score']}

**개선 효과:**
- 신규 병원 위치: ({gangbuk_result['new_location']['latitude']:.4f}, {gangbuk_result['new_location']['longitude']:.4f})
- 평균 거리 단축: {gangbuk_result['distance_reduction_km']}km
- 접근성 점수: {gangbuk_result['new_score']} (+{gangbuk_result['improvement_percent']}%)
- 수혜 인구: {gangbuk_result['improved_accessibility_population']:,}명

---

## 시나리오 3: 병원 5개 최적 배치 우선순위

"""

    for rec in hospital_recommendations:
        report += f"""
### {rec['priority']}. {rec['district']}
- 현재 점수: {rec['current_score']}
- 예상 개선: +{rec['expected_improvement']}점
- 인구: {rec['population']:,}명
"""

    report += f"""
---

## 시나리오 4: 은행 5개 최적 배치 우선순위

"""

    for rec in bank_recommendations:
        report += f"""
### {rec['priority']}. {rec['district']}
- 현재 점수: {rec['current_score']}
- 예상 개선: +{rec['expected_improvement']}점
- 인구: {rec['population']:,}명
"""

    report += f"""
---

## 종합 요약

- 총 분석 시나리오: {results['summary']['total_scenarios']}개
- 총 추천 위치: {results['summary']['total_recommendations']}개
- 예상 총 수혜 인구: {results['summary']['expected_total_beneficiaries']:,}명

**핵심 메시지:**
AI 알고리즘을 활용하여 접근성 취약 지역을 식별하고,
신규 시설의 최적 입지를 제안함으로써
서울 시민의 생활 서비스 접근성을 효과적으로 개선할 수 있습니다.
"""

    report_file = OUTPUT_DIR / "recommendation_report.md"
    with open(report_file, 'w', encoding='utf-8') as f:
        f.write(report)

    print(f"✅ 리포트 저장: {report_file}")

    print("\n" + "=" * 80)
    print("✅ AI 최적 입지 분석 완료!")
    print("=" * 80)

    return results


if __name__ == "__main__":
    analyze_accessibility_improvement_scenarios()
