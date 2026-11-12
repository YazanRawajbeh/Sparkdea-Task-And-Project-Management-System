import { makeIsPlanned } from "./spark";



/*===Data Format===


{
    "id": "96ea4d15-fac6-449d-b0ed-724adc2e71c8",
    "title": "asdasd",
    "date": "2026-11-12"
  }


*/


export async function createPlan({ id, name, date }) {
    await makeIsPlanned(id);

    const response = await fetch(`http://localhost:3000/plans`, {

        method: "POST",

        body: JSON.stringify({
            id, name, date
        }),
        headers: {
            "Content-Type": "application/json"
        }

    })

    if (!response.ok) {
        throw new Error("Failed to make a plan")
    }
    const data = await response.json();
    return data;

}


export async function getPlans() {
    const response = await fetch(`http://localhost:3000/plans`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    if (!response.ok) {
        throw new Error("Failed to get plans")
    }
    const data = await response.json();
    return data;

}
