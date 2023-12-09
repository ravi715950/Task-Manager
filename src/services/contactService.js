import { httpAxios } from "@/helper/httpHelper";

export async function addContact(formData) {
  const result = await httpAxios
    .post("/api/contact", formData)
    .then((response) => response.data);
  return result;
}


export async function getAllContacts() {
    const result = await httpAxios
      .get("/api/contact")
      .then((response) => response.data);
    return result;
  }