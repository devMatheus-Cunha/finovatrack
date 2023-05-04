import { useQuery, useQueryClient } from '@tanstack/react-query';

interface IData {
  value: number;
}

const useIsVisibilityDatas = () => {
const queryClient = useQueryClient()
 let initialData: boolean = true

 if (typeof localStorage !== 'undefined') {
  initialData = localStorage.getItem("isVisibilityData") === "true" ? true : false
}
 

 const {
    data: isVisibilityData,
 } = useQuery(["is_visibility_data"], {
  initialData: initialData
 });

 const handleToggleVisibilityData = () => {
  const [queryKey, data] = queryClient.getQueriesData(["is_visibility_data"]).flat(Infinity)
  queryClient.setQueryData([queryKey], !data)
  localStorage.setItem('isVisibilityData', String(!data));
 }


  return { isVisibilityData, handleToggleVisibilityData};
};

export default useIsVisibilityDatas;
