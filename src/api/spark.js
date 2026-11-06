
/*===Data Format===


{
    "text": "embeded system plan",
    "date": "2026-10-26",
    "id": "2",
    "inPlanning": false
  }


*/



export async function addSpark(spark) {

    const response = await fetch("http://localhost:3000/spark", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(spark),
    });

    if (!response.ok) {
        throw new Error("Failed to add spark")
    }

    const data = await response.json()


    return data


}


export async function getSpark() {
    const response = await fetch("http://localhost:3000/spark");

    if (!response.ok) {
        throw new Error("Failed to fetch sparks");
    }

    const data = await response.json();
    return data;
}

export async function deleteSpark(id) {

    let response = await fetch("http://localhost:3000/spark/" + id, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Failed to delete spark");

    }

    const data = await response.json();
    return data;

}

export async function makeIsPlanned(sparkId) {

    let response = await fetch(`http://localhost:3000/spark/${sparkId}`, {
        method: "PATCH",
        body: JSON.stringify({
            inPlanning: true
        }),
        headers: {
            "Content-Type": "application/json",
        }

    })
    if (!response.ok) {
        throw new Error("Failed to make spark planned");
    }
    const data = await response.json();
    return data;

}
