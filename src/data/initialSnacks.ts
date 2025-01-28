import { Snack } from "../types/Snack";

export const initialLikes: Snack[] = [
  {
    id: "1",
    name: "Meat Pizza",
    description: "Delicious meat pizza",
    type: "salty",
    like: true,
  },
  {
    id: "2",
    name: "Tapioca Waffles",
    description: "Tasty gluten-free variation",
    type: "sweet",
    like: true,
  },
  {
    id: "3",
    name: "Takoyaki",
    description: "Dough filled with octopus",
    type: "salty",
    like: true,
  },
  {
    id: "4",
    name: "Popcorn",
    description: "Crunchy snack",
    type: "salty",
    like: true,
  },
  {
    id: "5",
    name: "Fruit Salad",
    description: "Healthy fruit mix",
    type: "sweet",
    like: true,
  },
  {
    id: "6",
    name: "Oatmeal Cookies",
    description: "Delicious oatmeal cookies",
    type: "sweet",
    like: true,
  },
];

export const initialDislikes: Snack[] = [
  {
    id: "7",
    name: "Daifuku",
    description: "Japanese rice cake",
    type: "sweet",
    like: false,
  },
  {
    id: "8",
    name: "Taiyaki",
    description: "Fish-shaped cake",
    type: "sweet",
    like: false,
  },
  {
    id: "9",
    name: "Cupcake",
    description: "Sweet cupcake",
    type: "sweet",
    like: false,
  },
  {
    id: "10",
    name: "Pineapple Pizza",
    description: "Pizza with pineapple",
    type: "sweet",
    like: false,
  },
];
