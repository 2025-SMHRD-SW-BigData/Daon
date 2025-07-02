// 어항 추천 로직을 담당하는 유틸 함수입니다.
import harborData from '../data/filtered_village_data.json';

/**
 * 특정 어선 유형에 맞는 어항 리스트를 추출하는 함수
 * @param {string} vesselType - 사용자가 선택한 어선 유형 (예: "권현망", "연승")
 * @returns {Array<{ name: string, region: string }>} - 추천 어항 리스트
 */
export const getRecommendedHarbors = (vesselType) => {
  return harborData
    .filter(harbor => harbor.VESSEL_TYPE.includes(vesselType))
    .map(harbor => ({
      name: harbor.FSHNG_PRT_NM,
      region: harbor.REGION,
    }));
};
