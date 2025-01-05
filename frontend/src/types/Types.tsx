export type pageTypes = {
  title?: string;
}

export type productType = {
  name: string;
  price: number | string;
  image: string;
  _id?: string;
}

export type locationStateType = {
  title?: string;
  currentProduct?: productType;
}