// Pizza Fire — customer order tracking helper

const PF_API = "http://127.0.0.1:8000";


async function trackPizzaFireOrder(
    orderNo,
    phone
) {

    const res =
        await fetch(
            `${PF_API}/api/orders/${encodeURIComponent(
                orderNo
            )}?phone=${encodeURIComponent(
                phone
            )}`
        );


    const data =
        await res
            .json()
            .catch(
                () => ({})
            );


    if (!res.ok) {

        throw new Error(
            data.detail ||
            "Order not found"
        );

    }


    return data;

}


function pizzaFireStatusLabel(
    status
) {

    return (

        {

            new:
                "Order Placed",

            accepted:
                "Accepted",

            preparing:
                "Preparing",

            ready:
                "Ready",

            out_for_delivery:
                "Out for Delivery",

            delivered:
                "Delivered",

            rejected:
                "Rejected"

        }[status]

        ||

        status

    );

}