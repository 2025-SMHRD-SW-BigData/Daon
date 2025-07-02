// 어항 추천 로직을 담당하는 유틸 함수입니다.
import harborData from '../data/filtered_village_data_clean.json';

export const getRecommendedHarbors = (vesselType) => {
  return harborData
    .filter(harbor => Array.isArray(harbor.VESSEL_TYPE) && harbor.VESSEL_TYPE.includes(vesselType))
    .map(harbor => ({
      name: harbor.FSHNG_PRT_NM,
      region: harbor.REGION,
    }));
};
