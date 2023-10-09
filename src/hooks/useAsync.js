import { useCallback, useEffect, useState } from "react";

export const useAsync = (callback, dependencies = [], type = "standard") => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [value, setValue] = useState();

  const callbackMemorized = useCallback(() => {
    setIsLoading(true);
    setError(undefined);
    setValue([]);
    callback()
      .then((data) => {
        if (type == "standard") {
          setValue(data);
        } else if (type == "firebase") {
          if (data.forEach) {
            const response = [];
            data.forEach((item) => {
              response.push({ id: item.id, ...item.data() });
            });
            setValue(response);
          } else {
            setValue({ id: data.id, ...data.data() });
          }
        }
      })
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, dependencies);
  useEffect(() => {
    callbackMemorized();
  }, [callbackMemorized]);
  return [isLoading, error, value];
};
