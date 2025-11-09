"""
서울시 생활 서비스 접근성 분석을 위한 샘플 데이터 생성
실제 서울시 좌표를 기반으로 현실적인 데이터 생성
"""

import pandas as pd
import numpy as np
import json
from pathlib import Path

# 프로젝트 루트 경로
PROJECT_ROOT = Path(__file__).parent.parent
DATA_DIR = PROJECT_ROOT / "data" / "raw"
DATA_DIR.mkdir(parents=True, exist_ok=True)

# 서울시 25개 자치구 실제 중심 좌표
SEOUL_DISTRICTS = {
    "강남구": {"lat": 37.5172, "lon": 127.0473, "population": 540000, "area_km2": 39.5},
    "강동구": {"lat": 37.5301, "lon": 127.1238, "population": 432000, "area_km2": 24.6},
    "강북구": {"lat": 37.6396, "lon": 127.0257, "population": 313000, "area_km2": 23.6},
    "강서구": {"lat": 37.5509, "lon": 126.8495, "population": 601000, "area_km2": 41.4},
    "관악구": {"lat": 37.4784, "lon": 126.9516, "population": 506000, "area_km2": 29.6},
    "광진구": {"lat": 37.5384, "lon": 127.0822, "population": 355000, "area_km2": 17.1},
    "구로구": {"lat": 37.4954, "lon": 126.8874, "population": 418000, "area_km2": 20.1},
    "금천구": {"lat": 37.4519, "lon": 126.8955, "population": 238000, "area_km2": 13.0},
    "노원구": {"lat": 37.6542, "lon": 127.0568, "population": 535000, "area_km2": 35.4},
    "도봉구": {"lat": 37.6688, "lon": 127.0471, "population": 334000, "area_km2": 20.7},
    "동대문구": {"lat": 37.5744, "lon": 127.0396, "population": 348000, "area_km2": 14.2},
    "동작구": {"lat": 37.5124, "lon": 126.9393, "population": 398000, "area_km2": 16.4},
    "마포구": {"lat": 37.5663, "lon": 126.9019, "population": 376000, "area_km2": 23.9},
    "서대문구": {"lat": 37.5791, "lon": 126.9368, "population": 315000, "area_km2": 17.6},
    "서초구": {"lat": 37.4837, "lon": 127.0324, "population": 433000, "area_km2": 47.0},
    "성동구": {"lat": 37.5634, "lon": 127.0367, "population": 301000, "area_km2": 16.9},
    "성북구": {"lat": 37.5894, "lon": 127.0167, "population": 448000, "area_km2": 24.6},
    "송파구": {"lat": 37.5145, "lon": 127.1059, "population": 671000, "area_km2": 33.9},
    "양천구": {"lat": 37.5170, "lon": 126.8664, "population": 461000, "area_km2": 17.4},
    "영등포구": {"lat": 37.5264, "lon": 126.8962, "population": 380000, "area_km2": 24.6},
    "용산구": {"lat": 37.5326, "lon": 126.9900, "population": 231000, "area_km2": 21.9},
    "은평구": {"lat": 37.6027, "lon": 126.9290, "population": 483000, "area_km2": 29.7},
    "종로구": {"lat": 37.5730, "lon": 126.9794, "population": 156000, "area_km2": 23.9},
    "중구": {"lat": 37.5641, "lon": 126.9979, "population": 129000, "area_km2": 9.96},
    "중랑구": {"lat": 37.6063, "lon": 127.0925, "population": 406000, "area_km2": 18.5}
}


def generate_hospitals(num_hospitals=500):
    """병원/의원 데이터 생성"""
    hospitals = []

    for district, info in SEOUL_DISTRICTS.items():
        # 인구 비례하여 병원 수 배분 (but 강남 집중도 반영)
        base_count = int((info["population"] / 500000) * 20)

        # 강남 3구에 추가 가중치
        if district in ["강남구", "서초구", "송파구"]:
            num = int(base_count * 1.8)
        # 외곽 지역은 적게
        elif district in ["강북구", "도봉구", "금천구", "강동구"]:
            num = int(base_count * 0.6)
        else:
            num = base_count

        for i in range(num):
            # 구 중심 좌표에서 랜덤 분산
            lat = info["lat"] + np.random.normal(0, 0.02)
            lon = info["lon"] + np.random.normal(0, 0.02)

            hospital_type = np.random.choice(
                ["종합병원", "병원", "의원", "한의원"],
                p=[0.05, 0.15, 0.6, 0.2]
            )

            hospitals.append({
                "name": f"{district} {hospital_type} {i+1}",
                "type": hospital_type,
                "district": district,
                "latitude": lat,
                "longitude": lon,
                "specialty": np.random.choice([
                    "내과", "외과", "정형외과", "소아청소년과",
                    "산부인과", "안과", "이비인후과", "치과"
                ])
            })

    return pd.DataFrame(hospitals)


def generate_banks(num_banks=400):
    """은행/ATM 데이터 생성"""
    banks = []

    for district, info in SEOUL_DISTRICTS.items():
        # 강남권에 은행 집중
        base_count = int((info["population"] / 500000) * 15)

        if district in ["강남구", "서초구", "송파구", "중구", "종로구"]:
            num = int(base_count * 2.0)
        elif district in ["강북구", "도봉구", "금천구"]:
            num = int(base_count * 0.5)
        else:
            num = base_count

        for i in range(num):
            lat = info["lat"] + np.random.normal(0, 0.02)
            lon = info["lon"] + np.random.normal(0, 0.02)

            bank_type = np.random.choice(
                ["시중은행", "지방은행", "ATM"],
                p=[0.4, 0.3, 0.3]
            )

            banks.append({
                "name": f"{district} {bank_type} {i+1}",
                "type": bank_type,
                "district": district,
                "latitude": lat,
                "longitude": lon,
                "bank_name": np.random.choice([
                    "KB국민은행", "신한은행", "우리은행", "하나은행",
                    "NH농협", "IBK기업은행"
                ])
            })

    return pd.DataFrame(banks)


def generate_gov_offices():
    """행정시설 데이터 생성 (주민센터, 구청)"""
    offices = []

    for district, info in SEOUL_DISTRICTS.items():
        # 구청 1개
        offices.append({
            "name": f"{district} 구청",
            "type": "구청",
            "district": district,
            "latitude": info["lat"],
            "longitude": info["lon"]
        })

        # 주민센터 (동) - 구마다 10-20개
        num_dongs = np.random.randint(10, 21)
        for i in range(num_dongs):
            lat = info["lat"] + np.random.normal(0, 0.025)
            lon = info["lon"] + np.random.normal(0, 0.025)

            offices.append({
                "name": f"{district} {i+1}동 주민센터",
                "type": "주민센터",
                "district": district,
                "latitude": lat,
                "longitude": lon
            })

    return pd.DataFrame(offices)


def generate_subway_stations():
    """지하철역 데이터 생성"""
    stations = []

    # 주요 역들 (실제 좌표 근사치)
    major_stations = [
        {"name": "강남역", "line": "2호선", "lat": 37.4979, "lon": 127.0276, "district": "강남구"},
        {"name": "역삼역", "line": "2호선", "lat": 37.5005, "lon": 127.0365, "district": "강남구"},
        {"name": "선릉역", "line": "2호선", "lat": 37.5047, "lon": 127.0490, "district": "강남구"},
        {"name": "삼성역", "line": "2호선", "lat": 37.5087, "lon": 127.0634, "district": "강남구"},
        {"name": "잠실역", "line": "2호선", "lat": 37.5133, "lon": 127.1000, "district": "송파구"},
        {"name": "강남구청역", "line": "7호선", "lat": 37.5174, "lon": 127.0416, "district": "강남구"},
        {"name": "신림역", "line": "2호선", "lat": 37.4843, "lon": 126.9298, "district": "관악구"},
        {"name": "서울대입구역", "line": "2호선", "lat": 37.4813, "lon": 126.9527, "district": "관악구"},
        {"name": "홍대입구역", "line": "2호선", "lat": 37.5572, "lon": 126.9236, "district": "마포구"},
        {"name": "신촌역", "line": "2호선", "lat": 37.5556, "lon": 126.9369, "district": "서대문구"},
        {"name": "시청역", "line": "1호선", "lat": 37.5660, "lon": 126.9771, "district": "중구"},
        {"name": "을지로입구역", "line": "2호선", "lat": 37.5660, "lon": 126.9826, "district": "중구"},
        {"name": "종로3가역", "line": "1호선", "lat": 37.5711, "lon": 126.9918, "district": "종로구"},
        {"name": "광화문역", "line": "5호선", "lat": 37.5719, "lon": 126.9762, "district": "종로구"},
        {"name": "노원역", "line": "4호선", "lat": 37.6555, "lon": 127.0613, "district": "노원구"},
        {"name": "수유역", "line": "4호선", "lat": 37.6383, "lon": 127.0253, "district": "강북구"},
        {"name": "구로디지털단지역", "line": "2호선", "lat": 37.4853, "lon": 126.9015, "district": "구로구"},
        {"name": "영등포구청역", "line": "5호선", "lat": 37.5245, "lon": 126.8959, "district": "영등포구"},
    ]

    stations.extend(major_stations)

    # 각 구마다 추가 역 생성
    for district, info in SEOUL_DISTRICTS.items():
        # 면적에 비례하여 역 수 결정
        num_stations = int((info["area_km2"] / 30) * 5) + 1

        for i in range(num_stations):
            lat = info["lat"] + np.random.normal(0, 0.03)
            lon = info["lon"] + np.random.normal(0, 0.03)

            stations.append({
                "name": f"{district} {i+1}역",
                "line": np.random.choice([
                    "1호선", "2호선", "3호선", "4호선", "5호선",
                    "6호선", "7호선", "8호선", "9호선"
                ]),
                "latitude": lat,
                "longitude": lon,
                "district": district
            })

    return pd.DataFrame(stations)


def generate_population_data():
    """인구 통계 데이터 생성"""
    population = []

    for district, info in SEOUL_DISTRICTS.items():
        # 연령대별 인구 분포
        total_pop = info["population"]

        # 강남권은 청년층 비율 높음
        if district in ["강남구", "서초구", "송파구", "마포구"]:
            age_dist = {
                "0-19": 0.15,
                "20-39": 0.35,
                "40-59": 0.35,
                "60+": 0.15
            }
        # 외곽은 고령층 비율 높음
        elif district in ["강북구", "도봉구", "노원구", "은평구"]:
            age_dist = {
                "0-19": 0.12,
                "20-39": 0.22,
                "40-59": 0.38,
                "60+": 0.28
            }
        else:
            age_dist = {
                "0-19": 0.13,
                "20-39": 0.28,
                "40-59": 0.37,
                "60+": 0.22
            }

        for age_group, ratio in age_dist.items():
            population.append({
                "district": district,
                "age_group": age_group,
                "population": int(total_pop * ratio),
                "ratio": ratio
            })

    return pd.DataFrame(population)


def save_datasets():
    """모든 데이터셋 생성 및 저장"""
    print("🏥 병원 데이터 생성 중...")
    hospitals = generate_hospitals()
    hospitals.to_csv(DATA_DIR / "hospitals.csv", index=False, encoding="utf-8-sig")
    print(f"   ✅ {len(hospitals)}개 병원 데이터 저장")

    print("\n🏦 은행 데이터 생성 중...")
    banks = generate_banks()
    banks.to_csv(DATA_DIR / "banks.csv", index=False, encoding="utf-8-sig")
    print(f"   ✅ {len(banks)}개 은행 데이터 저장")

    print("\n🏛️ 행정시설 데이터 생성 중...")
    offices = generate_gov_offices()
    offices.to_csv(DATA_DIR / "gov_offices.csv", index=False, encoding="utf-8-sig")
    print(f"   ✅ {len(offices)}개 행정시설 데이터 저장")

    print("\n🚇 지하철역 데이터 생성 중...")
    stations = generate_subway_stations()
    stations.to_csv(DATA_DIR / "subway_stations.csv", index=False, encoding="utf-8-sig")
    print(f"   ✅ {len(stations)}개 지하철역 데이터 저장")

    print("\n👥 인구 통계 데이터 생성 중...")
    population = generate_population_data()
    population.to_csv(DATA_DIR / "population.csv", index=False, encoding="utf-8-sig")
    print(f"   ✅ {len(population)}개 인구 통계 데이터 저장")

    # 자치구 정보 저장
    print("\n📍 자치구 정보 저장 중...")
    districts_df = pd.DataFrame([
        {
            "district": name,
            "latitude": info["lat"],
            "longitude": info["lon"],
            "population": info["population"],
            "area_km2": info["area_km2"]
        }
        for name, info in SEOUL_DISTRICTS.items()
    ])
    districts_df.to_csv(DATA_DIR / "districts.csv", index=False, encoding="utf-8-sig")
    print(f"   ✅ {len(districts_df)}개 자치구 정보 저장")

    print("\n" + "="*60)
    print("✅ 모든 샘플 데이터 생성 완료!")
    print(f"📁 저장 위치: {DATA_DIR}")
    print("="*60)

    # 통계 출력
    print("\n📊 데이터 요약:")
    print(f"   • 병원/의원: {len(hospitals):,}개")
    print(f"   • 은행/ATM: {len(banks):,}개")
    print(f"   • 행정시설: {len(offices):,}개")
    print(f"   • 지하철역: {len(stations):,}개")
    print(f"   • 자치구: {len(districts_df)}개")
    print(f"   • 총 서울시 인구: {sum(info['population'] for info in SEOUL_DISTRICTS.values()):,}명")


if __name__ == "__main__":
    save_datasets()
