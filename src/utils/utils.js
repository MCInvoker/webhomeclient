export const getUrlParams = (key) => {
  // 获取当前页面的 URL
  const url = new URL(window.location.href);

  // 获取 URL 中的 search 参数
  const searchParams = new URLSearchParams(url.search);

  // 获取 page_id 参数的值
  const params = searchParams.get(key);

  return params;
};
