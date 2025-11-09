"""
서울시 자치구별 생활 서비스 접근성 분석
각 구의 중심에서 주요 시설까지의 평균 거리 및 접근성 점수 계산
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
PROCESSED_DIR.mkdir(parents=True, exist_ok=True)


def haversine_distance(lat1, lon1, lat2, lon2):
    """
    두 지점 간의 거리 계산 (Haversine 공식)
    결과: 킬로미터 단위
    """
    R = 6371  # 지구 반경 (km)

    lat1, lon1, lat2, lon2 = map(np.radians, [lat1, lon1, lat2, lon2])

    dlat = lat2 - lat1
    dlon = lon2 - lon1

    a = np.sin(dlat/2)**2 + np.cos(lat1) * np.cos(lat2) * np.sin(dlon/2)**2
    c = 2 * np.arcsin(np.sqrt(a))

    return R * c


def calculate_nearest_facility(district_lat, district_lon, facilities_df):
    """
    특정 위치에서 가장 가까운 시설까지의 거리 계산
    """
    if len(facilities_df) == 0:
        return None

    distances = facilities_df.apply(
        lambda row: haversine_distance(
            district_lat, district_lon,
            row['latitude'], row['longitude']
        ),
        axis=1
    )

    return distances.min()


def calculate_average_distance(district_lat, district_lon, facilities_df, top_n=5):
    """
    특정 위치에서 가장 가까운 N개 시설까지의 평균 거리
    """
    if len(facilities_df) == 0:
        return None

    distances = facilities_df.apply(
        lambda row: haversine_distance(
            district_lat, district_lon,
            row['latitude'], row['longitude']
        ),
        axis=1
    )

    # 가장 가까운 N개의 평균
    nearest_distances = distances.nsmallest(min(top_n, len(distances)))
    return nearest_distances.mean()


def calculate_facility_density(district, facilities_df, districts_df):
    """
    자치구별 시설 밀도 계산 (개수 / 면적)
    """
    district_info = districts_df[districts_df['district'] == district].iloc[0]
    area_km2 = district_info['area_km2']

    # 해당 구의 시설 개수
    num_facilities = len(facilities_df[facilities_df['district'] == district])

    return num_facilities / area_km2


def analyze_accessibility():
    """
    자치구별 접근성 종합 분석
    """
    print("📊 서울시 생활 서비스 접근성 분석 시작...\n")

    # 데이터 로드
    print("📁 데이터 로딩 중...")
    districts = pd.read_csv(RAW_DIR / "districts.csv")
    hospitals = pd.read_csv(RAW_DIR / "hospitals.csv")
    banks = pd.read_csv(RAW_DIR / "banks.csv")
    gov_offices = pd.read_csv(RAW_DIR / "gov_offices.csv")
    subway_stations = pd.read_csv(RAW_DIR / "subway_stations.csv")
    population = pd.read_csv(RAW_DIR / "population.csv")

    print(f"   ✅ 자치구: {len(districts)}개")
    print(f"   ✅ 병원: {len(hospitals)}개")
    print(f"   ✅ 은행: {len(banks)}개")
    print(f"   ✅ 행정시설: {len(gov_offices)}개")
    print(f"   ✅ 지하철역: {len(subway_stations)}개\n")

    results = []

    print("🔍 자치구별 접근성 분석 중...")
    print("-" * 80)

    for idx, row in districts.iterrows():
        district = row['district']
        lat, lon = row['latitude'], row['longitude']

        # 해당 구의 시설들만 필터링
        district_hospitals = hospitals[hospitals['district'] == district]
        district_banks = banks[banks['district'] == district]
        district_offices = gov_offices[gov_offices['district'] == district]
        district_stations = subway_stations[subway_stations['district'] == district]

        # 1. 최근접 거리 계산
        nearest_hospital = calculate_nearest_facility(lat, lon, district_hospitals)
        nearest_bank = calculate_nearest_facility(lat, lon, district_banks)
        nearest_office = calculate_nearest_facility(lat, lon, district_offices)
        nearest_station = calculate_nearest_facility(lat, lon, district_stations)

        # 2. 평균 거리 (가까운 5개 시설)
        avg_hospital_dist = calculate_average_distance(lat, lon, district_hospitals, top_n=5)
        avg_bank_dist = calculate_average_distance(lat, lon, district_banks, top_n=3)
        avg_station_dist = calculate_average_distance(lat, lon, district_stations, top_n=3)

        # 3. 시설 밀도 (개수/km²)
        hospital_density = calculate_facility_density(district, hospitals, districts)
        bank_density = calculate_facility_density(district, banks, districts)
        station_density = calculate_facility_density(district, subway_stations, districts)

        # 4. 인구 대비 시설 비율
        pop_total = row['population']
        hospital_per_10k = (len(district_hospitals) / pop_total) * 10000
        bank_per_10k = (len(district_banks) / pop_total) * 10000
        station_per_100k = (len(district_stations) / pop_total) * 100000

        results.append({
            'district': district,
            'latitude': lat,
            'longitude': lon,
            'population': pop_total,
            'area_km2': row['area_km2'],

            # 시설 개수
            'num_hospitals': len(district_hospitals),
            'num_banks': len(district_banks),
            'num_offices': len(district_offices),
            'num_stations': len(district_stations),

            # 최근접 거리 (km)
            'nearest_hospital_km': nearest_hospital,
            'nearest_bank_km': nearest_bank,
            'nearest_office_km': nearest_office,
            'nearest_station_km': nearest_station,

            # 평균 거리 (km)
            'avg_hospital_dist_km': avg_hospital_dist,
            'avg_bank_dist_km': avg_bank_dist,
            'avg_station_dist_km': avg_station_dist,

            # 시설 밀도 (개/km²)
            'hospital_density': hospital_density,
            'bank_density': bank_density,
            'station_density': station_density,

            # 인구 대비 시설 비율
            'hospital_per_10k_people': hospital_per_10k,
            'bank_per_10k_people': bank_per_10k,
            'station_per_100k_people': station_per_100k,
        })

        print(f"✓ {district:8s} | 병원: {len(district_hospitals):3d}개 | "
              f"은행: {len(district_banks):3d}개 | 지하철: {len(district_stations):2d}개")

    print("-" * 80)

    # DataFrame 생성
    results_df = pd.DataFrame(results)

    # 5. 접근성 점수 계산 (0-100점)
    print("\n📈 접근성 점수 계산 중...")

    # 점수 계산: 거리가 짧을수록, 밀도가 높을수록 높은 점수
    # Min-Max 정규화를 사용하여 0-100점으로 변환

    def normalize_inverse(series):
        """거리는 짧을수록 좋으므로 역수 정규화"""
        # NaN 값을 중간값으로 채우기
        series_filled = series.fillna(series.median())
        if series_filled.isnull().all() or len(series_filled.unique()) == 1:
            return pd.Series([50] * len(series))
        inversed = 1 / (series_filled + 0.1)  # 0으로 나누기 방지
        normalized = (inversed - inversed.min()) / (inversed.max() - inversed.min()) * 100
        return normalized.fillna(50)

    def normalize_direct(series):
        """밀도는 높을수록 좋으므로 직접 정규화"""
        series_filled = series.fillna(0)
        if series_filled.isnull().all() or len(series_filled.unique()) == 1:
            return pd.Series([50] * len(series))
        if series_filled.max() == series_filled.min():
            return pd.Series([50] * len(series))
        normalized = (series_filled - series_filled.min()) / (series_filled.max() - series_filled.min()) * 100
        return normalized.fillna(0)

    # 의료 접근성 점수
    results_df['medical_score'] = (
        normalize_inverse(results_df['avg_hospital_dist_km']) * 0.6 +
        normalize_direct(results_df['hospital_density']) * 0.4
    )

    # 금융 접근성 점수
    results_df['financial_score'] = (
        normalize_inverse(results_df['avg_bank_dist_km']) * 0.6 +
        normalize_direct(results_df['bank_density']) * 0.4
    )

    # 교통 접근성 점수
    results_df['transport_score'] = (
        normalize_inverse(results_df['avg_station_dist_km']) * 0.6 +
        normalize_direct(results_df['station_density']) * 0.4
    )

    # 행정 접근성 점수
    results_df['administrative_score'] = normalize_inverse(results_df['nearest_office_km'])

    # 종합 접근성 점수 (가중 평균)
    results_df['total_accessibility_score'] = (
        results_df['medical_score'] * 0.35 +
        results_df['financial_score'] * 0.20 +
        results_df['transport_score'] * 0.30 +
        results_df['administrative_score'] * 0.15
    ).round(2)

    # 등급 부여
    def assign_grade(score):
        if score >= 80:
            return 'A'
        elif score >= 65:
            return 'B'
        elif score >= 50:
            return 'C'
        elif score >= 35:
            return 'D'
        else:
            return 'F'

    results_df['grade'] = results_df['total_accessibility_score'].apply(assign_grade)

    # 결과 저장
    output_file = PROCESSED_DIR / "accessibility_scores.csv"
    results_df.to_csv(output_file, index=False, encoding='utf-8-sig')
    print(f"   ✅ 접근성 분석 결과 저장: {output_file}\n")

    # 결과 요약 출력
    print("=" * 80)
    print("📊 서울시 자치구별 접근성 점수 TOP 5 / BOTTOM 5")
    print("=" * 80)

    # 정렬
    sorted_df = results_df.sort_values('total_accessibility_score', ascending=False)

    print("\n🏆 접근성 최상위 5개 구:")
    print("-" * 80)
    for idx, row in sorted_df.head(5).iterrows():
        print(f"{row['district']:8s} | 종합: {row['total_accessibility_score']:5.1f}점 ({row['grade']}) | "
              f"의료: {row['medical_score']:4.1f} | 금융: {row['financial_score']:4.1f} | "
              f"교통: {row['transport_score']:4.1f}")

    print("\n⚠️  접근성 최하위 5개 구:")
    print("-" * 80)
    for idx, row in sorted_df.tail(5).iterrows():
        print(f"{row['district']:8s} | 종합: {row['total_accessibility_score']:5.1f}점 ({row['grade']}) | "
              f"의료: {row['medical_score']:4.1f} | 금융: {row['financial_score']:4.1f} | "
              f"교통: {row['transport_score']:4.1f}")

    print("\n" + "=" * 80)

    # 통계 요약
    print("\n📈 통계 요약:")
    print(f"   • 평균 접근성 점수: {results_df['total_accessibility_score'].mean():.2f}점")
    print(f"   • 최고 점수: {results_df['total_accessibility_score'].max():.2f}점 "
          f"({results_df.loc[results_df['total_accessibility_score'].idxmax(), 'district']})")
    print(f"   • 최저 점수: {results_df['total_accessibility_score'].min():.2f}점 "
          f"({results_df.loc[results_df['total_accessibility_score'].idxmin(), 'district']})")
    print(f"   • 점수 격차: {results_df['total_accessibility_score'].max() - results_df['total_accessibility_score'].min():.2f}점")

    grade_counts = results_df['grade'].value_counts().sort_index()
    print(f"\n   등급 분포:")
    for grade, count in grade_counts.items():
        print(f"      {grade}등급: {count}개 구")

    # JSON으로도 저장 (대시보드용)
    json_output = PROCESSED_DIR / "accessibility_scores.json"
    results_json = results_df.to_dict(orient='records')
    with open(json_output, 'w', encoding='utf-8') as f:
        json.dump(results_json, f, ensure_ascii=False, indent=2)
    print(f"\n   ✅ JSON 파일 저장: {json_output}")

    return results_df


if __name__ == "__main__":
    df = analyze_accessibility()
    print("\n✅ 접근성 분석 완료!")
