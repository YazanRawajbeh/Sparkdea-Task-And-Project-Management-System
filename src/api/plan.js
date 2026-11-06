


export async function makeAPlan(sparkId) {


    const response = await fetch(`http://localhost:3000/plan`, {

        method: "POST",

        body: JSON.stringify({
            id: sparkId
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
