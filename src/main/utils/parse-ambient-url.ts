export const parseAmbientUrl = (value: string) => {
  const url = process.env.NODE_ENV === "development" ? "http://localhost:3000/" : "https://promogate.app/";
  const path = value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f,.'‘’"“”+]/g, "").replace(/[\s]/g, "-");

  return `${url}${path}`;
};