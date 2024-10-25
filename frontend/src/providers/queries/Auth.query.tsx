export const  AuthQuery = {
  register: async (user: any) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      console.log(res.ok)
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  login: async (user: any) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      console.log(res.ok)
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};
