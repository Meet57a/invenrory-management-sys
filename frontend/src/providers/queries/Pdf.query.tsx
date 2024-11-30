import { generatePath } from "react-router-dom";

export const PdfQuery = {
  generatePdf: async (id: string) => {
    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/v1/pdf/createPdf/" + id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  generatePdfReport: async () => {
    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/v1/pdf/createReportPdf",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};
