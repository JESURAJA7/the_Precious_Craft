// const baseURL = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;
const baseURL = "http://localhost:5055/api/v1";

// console.log("baseUrl", baseURL);

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();

    throw new Error(error.message || "Failed to fetch data");
  }

  return response.json();
};

export { baseURL, handleResponse };
