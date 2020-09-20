import fetch from "isomorphic-unfetch";
import {Client, defaultExchanges, subscriptionExchange, Provider} from "urql";
import {SubscriptionClient} from "subscriptions-transport-ws";
import ws from "isomorphic-ws";
import {ReactNode} from "react";
import jwt from "jsonwebtoken";

const WithGraphQL = ({
                         session,
                         children,
                     }: {
    session: any;
    children: ReactNode;
}) => {
    const userIdInString = session ? (session.id ? session.id.toString() : 'annon') : 'anon';
    const secret = "9Pe9~NrznDBGv\\t6UuneQbn5m^8R=EAn4nnA:Ey}"

    const payload = {
        "https://hasura.io/jwt/claims": {
            "X-Hasura-User-Id": userIdInString,
            "x-hasura-default-role": "user",
            "x-hasura-allowed-roles": ["user"]
        }
    }

    if (session) {
        //@ts-ignore
        payload.iat = session.iat
    }

    const newToken = jwt.sign(payload, secret)

    const subscriptionClient = new SubscriptionClient(
        "wss://tectrik-api.herokuapp.com/v1/graphql",
        {
            reconnect: true,
            connectionParams: {
                headers: session ? {Authorization: `Bearer ${newToken}`} : undefined
            },
        },
        ws
    );

    const client = new Client({
        url: process.env.NEXT_PUBLIC_API_URL || "https://tectrik-api.herokuapp.com/v1/graphql",
        fetch,
        fetchOptions: {
            headers: session ? {Authorization: `Bearer ${newToken}`} : undefined

        },
        requestPolicy: "cache-and-network",
        exchanges: [
            ...defaultExchanges,
            subscriptionExchange({
                forwardSubscription(operation) {
                    return subscriptionClient.request(operation);
                },
            }),
        ],
    });

    return <Provider value={client}>{children}</Provider>;
};

export default WithGraphQL;
