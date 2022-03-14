const getCurrencyApi = async () => {
  const urlApi = 'https://economia.awesomeapi.com.br/json/all';

  const response = await fetch(urlApi);
  const data = await response.json();
  return data;
};

export default getCurrencyApi;
