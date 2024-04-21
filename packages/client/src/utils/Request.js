class Request {
  constructor(
    baseurl = process.env.REACT_APP_SERVER_URL || "http://localhost:3001"
  ) {
    this.baseurl = baseurl;
  }

  async get(path) {
    try {
      const response = await fetch(`${this.baseurl}${path}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }

  async post(path, data) {
    try {
      const response = await fetch(`${this.baseurl}${path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }
}

const request = new Request();
export default request;
