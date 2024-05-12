# CitySats.com

A website that helps you find buyers/sellers of bitcoin in your local
neighbourhood.

## High level overview

CitySats.com is a site similar to [leafedout.com](https://leafedout.com/),
except for buyers/sellers of bitcoin. The site is very simple, you are presented
with a customised Google map showing all the buyers/sellers of bitcoin in your
local neighbourhood. Each user on the platform has a profile that includes
reviews, the price that they are willing to buy/sell bitcoin and how much, their
location, their operating hours and contact information.

It's important to note that this site does not facilitate transactions between
users, or custody user funds.

## Maps

This site using the Google Maps API to display maps with custom markers for
buyers and sellers. The website checks the user's location on load and pinpoints
the map to the user's location.

The user must have an account to create a listing.

## Profile

The site has two profile types: buyers and sellers.

Profiles include the following details:

-   A location
-   The amount of coins that they are willing to buy/sell
-   The price at which they are willing to buy/sell
-   Contact information, such as their Wickr, WhatsApp or telegram details
-   Their hours of operation
-   Reviews and a star rating
-   An alias
-   Verification tick (should pay a small fee)

Anyone can create a profile by signing up.

## Important details

-   Users should be warned against scams by refusing PayPal
-   The site aims to support bitcoin only, no alt coins
-   Users should be strongly encouraged to check reviews and trade in cash

## Advantages over other platforms

-   No KYC
-   Easy to meet buyers/sellers in your location
-   Trades can be done face to face, with superior privacy, confidence and fewer
    restrictions
-   The website is not facilitating trades or holding user funds (both a
    security and legal advantage)
-   A feedback system enables buyers and sellers to trade with confidence
-   The government cannot claim that the website administrator is a money
    transmitter
-   It circumvents banking restrictions on purchases of bitcoin

### API
`/api/user/nearbyProfiles?lat=${location.lat}&lng=${location.lng}`

Query params:
`lat` - the latitude of the area you wish to retrieve users from
`lng` - the longitude of the area you wish to retrieve users from

Output:

```json
{
  "data": [
    {
      "_id": "",
      "contact": {
        "telegram": "",
        "email": "",
        "wickr": "",
        "signal": "",
        "whatsapp": "",
        "username": ""
      },
      "bio": "",
      "buyer": true,
      "lat": 0,
      "lng": 0,
      "markerImagePath": "buyerAndSeller.png",
      "reviews": [],
      "seller": true,
      "username": ""
    }
  ]
}
```

## Donate

### Lightning

![lightning](https://raw.githubusercontent.com/bitcoinwarrior1/CitySats/main/public/lightning.jpeg)

**lnbc1pjhhsqepp5mjgwnvg0z53shm22hfe9us289lnaqkwv8rn2s0rtekg5vvj56xnqdqqcqzzsxqyz5vqsp5gu6vh9hyp94c7t3tkpqrp2r059t4vrw7ps78a4n0a2u52678c7yq9qyyssq7zcferywka50wcy75skjfrdrk930cuyx24rg55cwfuzxs49rc9c53mpz6zug5y2544pt8y9jflnq0ltlha26ed846jh0y7n4gm8jd3qqaautqa**

### On chain

![on chain](https://raw.githubusercontent.com/bitcoinwarrior1/CitySats/main/public/onchain.jpg)

**bc1ptzvr93pn959xq4et6sqzpfnkk2args22ewv5u2th4ps7hshfaqrshe0xtp**

This is a [Next.js](https://nextjs.org/) project bootstrapped with
[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

You can start editing the page by modifying `app/page.tsx`. The page
auto-updates as you edit the file.

This project uses
[`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to
automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
    features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out
[the Next.js GitHub repository](https://github.com/vercel/next.js/) - your
feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the
[Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

Check out our
[Next.js deployment documentation](https://nextjs.org/docs/deployment) for more
details.
