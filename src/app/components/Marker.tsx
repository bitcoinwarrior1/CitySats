export const Marker = (props = sampleBuyer) => {
  return (
    <a onClick={props.onClick}>
      <img src={props.image} width={"25px"} height={"25px"} alt={"image"} />
    </a>
  );
};

const sampleBuyer = {
  lat: -33.865143, // Set your default latitude
  lng: 151.2099, // Set your default longitude,
  markerId: "buyer1",
  onClick: () => {
    alert("This is a buyer!");
  },
  buyer: true,
  seller: false,
  image:
    "https://media.istockphoto.com/id/1402453901/vector/bitcoin-web-coin-internet-electronic-crypto-design-symbol-digital-pay-vector-illustration.jpg?s=612x612&w=0&k=20&c=f2sBvDTHrhQkqEkmRu8C0XZz9UFpwggMRauATUU0VQs=",
};

const sampleSeller = {
  lat: -33.87,
  lng: 151.22,
  markerId: "seller1",
  onClick: () => {
    alert("This is a seller!");
  },
  buyer: false,
  seller: true,
  image:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png",
};

const sampleBuyerAndSeller = {
  lat: -33.876,
  lng: 151.23,
  markerId: "buyerAndSeller1",
  onClick: () => {
    alert("This is a buyer and seller!");
  },
  buyer: true,
  seller: true,
  image: "https://s2.coinmarketcap.com/static/img/coins/200x200/2093.png",
};

export const coordinates = [
  sampleBuyer,
  sampleSeller,
  { ...sampleSeller, lat: -33.7, lng: 151 },
  { ...sampleBuyer, lat: -33.8, lng: 151.1 },
  { ...sampleBuyer, lat: -33.82, lng: 151.11 },
  { ...sampleBuyer, lat: -33.81, lng: 151.12 },
  { ...sampleSeller, lat: -33.85, lng: 151.13 },
  sampleBuyerAndSeller,
];
