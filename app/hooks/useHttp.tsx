import React from "react";

function useHttp(request: Function) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [data, setData] = React.useState();

  const send = async (...args: any) => {
    setLoading(true);
    setError(false);
    const { data, ok } = (await request(...args)) as any;
    setLoading(false);

    if (!ok) {
      return setError(true);
    }

    setData(data);
  };

  return { loading, error, data, send };
}

export default useHttp;
