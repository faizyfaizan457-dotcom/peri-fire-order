import heroChicken from "@/assets/hero-chicken.jpg";
import catBurgers from "@/assets/cat-burgers.jpg";
import catLoadedFries from "@/assets/cat-loaded-fries.jpg";
import catWings from "@/assets/cat-wings.jpg";
import catShakes from "@/assets/cat-shakes.jpg";

export const IMAGES = {
  chicken: heroChicken,
  burgers: catBurgers,
  loadedFries: catLoadedFries,
  wings: catWings,
  shakes: catShakes,
};

/* ------------------------------------------------- per-dish photography */

import imgChickenQuarter from "@/assets/food/chicken-quarter.jpg";
import imgChickenHalf from "@/assets/food/chicken-half.jpg";
import imgChickenWhole from "@/assets/food/chicken-whole.jpg";
import imgWings from "@/assets/food/wings.jpg";
import imgChickenStrips from "@/assets/food/chicken-strips.jpg";
import imgPeriBreast from "@/assets/food/peri-breast.jpg";
import imgPeriBreastDouble from "@/assets/food/peri-breast-double.jpg";
import imgFriesPlainLoaded from "@/assets/food/fries-plain-loaded.jpg";
import imgFriesChickenLoaded from "@/assets/food/fries-chicken-loaded.jpg";
import imgFriesBeefLoaded from "@/assets/food/fries-beef-loaded.jpg";
import imgBurgerClassic from "@/assets/food/burger-classic.jpg";
import imgBurgerCheese from "@/assets/food/burger-cheese.jpg";
import imgBurgerBbq from "@/assets/food/burger-bbq.jpg";
import imgBurgerSmokey from "@/assets/food/burger-smokey.jpg";
import imgBurgerChipotle from "@/assets/food/burger-chipotle-cheese.jpg";
import imgBurgerCreamCheese from "@/assets/food/burger-cream-cheese.jpg";
import imgBurgerPineapple from "@/assets/food/burger-pineapple.jpg";
import imgBurgerQuayside from "@/assets/food/burger-quayside-special.jpg";
import imgLambClassic from "@/assets/food/lamb-classic.jpg";
import imgLambGuaca from "@/assets/food/lamb-guaca.jpg";
import imgVeggieBean from "@/assets/food/veggie-bean.jpg";
import imgShamiBurger from "@/assets/food/shami-burger.jpg";
import imgLambChops from "@/assets/food/lamb-chops.jpg";
import imgLambDonerChips from "@/assets/food/lamb-doner-chips.jpg";
import imgLambDonerNan from "@/assets/food/lamb-doner-nan.jpg";
import imgChickenShish from "@/assets/food/chicken-shish.jpg";
import imgSideFries from "@/assets/food/side-fries.jpg";
import imgSideOnionRings from "@/assets/food/side-onion-rings.jpg";
import imgSideFieryRice from "@/assets/food/side-fiery-rice.jpg";
import imgSideColeslaw from "@/assets/food/side-coleslaw.jpg";
import imgSideWedges from "@/assets/food/side-wedges.jpg";
import imgSideCorn from "@/assets/food/side-corn.jpg";
import imgSideEggRice from "@/assets/food/side-egg-rice.jpg";
import imgSideMushroomRice from "@/assets/food/side-mushroom-rice.jpg";
import imgSideCheesyChips from "@/assets/food/side-cheesy-chips.jpg";
import imgSideNuggets from "@/assets/food/side-nuggets.jpg";
import imgSidePopcorn from "@/assets/food/side-popcorn-chicken.jpg";
import imgSidePeriSalt from "@/assets/food/side-peri-salt.jpg";
import imgSideDips from "@/assets/food/side-dips.jpg";
import imgSidePitta from "@/assets/food/side-pitta.jpg";
import imgSideNan from "@/assets/food/side-nan.jpg";
import imgSideMozzarella from "@/assets/food/side-mozzarella-sticks.jpg";
import imgSideChilliNuggets from "@/assets/food/side-chilli-nuggets.jpg";
import imgSideSweetPotato from "@/assets/food/side-sweet-potato-fries.jpg";
import imgKidsChickenSteak from "@/assets/food/kids-chicken-steak.jpg";
import imgKidsNuggets from "@/assets/food/kids-nuggets.jpg";
import imgKidsPopcorn from "@/assets/food/kids-popcorn.jpg";
import imgDrinkCan from "@/assets/food/drink-can.jpg";
import imgDrinkBottle from "@/assets/food/drink-bottle.jpg";
import imgMilkshake from "@/assets/food/milkshake.jpg";
import imgSpecialShake from "@/assets/food/special-shake.jpg";
import imgFudgeCake from "@/assets/food/fudge-cake.jpg";
import imgCheesecake from "@/assets/food/cheesecake.jpg";
import imgApplePie from "@/assets/food/apple-pie.jpg";
import imgIceCream from "@/assets/food/ice-cream-tub.jpg";

/** One unique photo per dish, keyed by product id. */
export const PRODUCT_IMAGES: Record<string, string> = {
  "quarter-chicken": imgChickenQuarter,
  "half-chicken": imgChickenHalf,
  "whole-chicken": imgChickenWhole,
  wings: imgWings,
  "chicken-strips": imgChickenStrips,
  "peri-breast": imgPeriBreast,
  "double-peri-breast": imgPeriBreastDouble,
  "plain-loaded-fries": imgFriesPlainLoaded,
  "chicken-loaded-fries": imgFriesChickenLoaded,
  "beef-loaded-fries": imgFriesBeefLoaded,
  "burger-classic": imgBurgerClassic,
  "burger-cheese": imgBurgerCheese,
  "burger-bbq": imgBurgerBbq,
  "burger-smokey": imgBurgerSmokey,
  "burger-chipotle-cheese": imgBurgerChipotle,
  "burger-cream-cheese": imgBurgerCreamCheese,
  "burger-pineapple-passion": imgBurgerPineapple,
  "burger-quayside-special": imgBurgerQuayside,
  "classic-lamb": imgLambClassic,
  "guaca-lamb": imgLambGuaca,
  "veggie-bean": imgVeggieBean,
  "shami-burger": imgShamiBurger,
  "lamb-chops": imgLambChops,
  "lamb-doner-chips": imgLambDonerChips,
  "lamb-doner-nan": imgLambDonerNan,
  "chicken-shish": imgChickenShish,
  fries: imgSideFries,
  "onion-rings": imgSideOnionRings,
  "fiery-rice": imgSideFieryRice,
  coleslaw: imgSideColeslaw,
  wedges: imgSideWedges,
  corn: imgSideCorn,
  "egg-peri-rice": imgSideEggRice,
  "mushroom-peri-rice": imgSideMushroomRice,
  "cheesy-chips": imgSideCheesyChips,
  nuggets: imgSideNuggets,
  "popcorn-chicken": imgSidePopcorn,
  "peri-salt": imgSidePeriSalt,
  dips: imgSideDips,
  "toasted-pitta": imgSidePitta,
  "nan-bread": imgSideNan,
  "mozzarella-sticks": imgSideMozzarella,
  "chilli-nuggets": imgSideChilliNuggets,
  "sweet-potato-fries": imgSideSweetPotato,
  "kids-chicken-steak": imgKidsChickenSteak,
  "kids-nuggets": imgKidsNuggets,
  "kids-popcorn": imgKidsPopcorn,
  can: imgDrinkCan,
  "bottle-1-5": imgDrinkBottle,
  milkshake: imgMilkshake,
  "special-shake": imgSpecialShake,
  "fudge-cake": imgFudgeCake,
  cheesecake: imgCheesecake,
  "apple-pie": imgApplePie,
  "haagen-dazs": imgIceCream,
};

/** A selectable size / portion of a product. */
export interface ProductSize {
  label: string;
  price: number;
}

/** A group of choices attached to a product (spice, toppings, flavours...). */
export interface ModifierGroup {
  id: string;
  name: string;
  /** "single" = radio, "multi" = checkboxes */
  type: "single" | "multi";
  required?: boolean;
  max?: number;
  options: { id: string; name: string; price: number }[];
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  categoryId: string;
  sizes: ProductSize[];
  image?: string;
  tags?: string[];
  /** Modifier group ids applied to this product. */
  modifiers?: string[];
  /** Meal upgrade (fries + drink) surcharge, if offered. */
  mealUpgrade?: number;
  available?: boolean;
}

export interface Category {
  id: string;
  name: string;
  tagline?: string;
  image?: string;
}

/* ---------------------------------------------------------------- modifiers */

export const MODIFIER_GROUPS: Record<string, ModifierGroup> = {
  spice: {
    id: "spice",
    name: "Spice level",
    type: "single",
    required: true,
    options: [
      { id: "lemon-herbs", name: "Lemon & Herbs", price: 0 },
      { id: "mild", name: "Mild", price: 0 },
      { id: "hot", name: "Hot", price: 0 },
      { id: "x-hot", name: "X-Hot", price: 0 },
    ],
  },
  toppings: {
    id: "toppings",
    name: "Toppings & extras",
    type: "multi",
    options: [
      { id: "cheese", name: "Cheese", price: 0.8 },
      { id: "cream-cheese", name: "Cream cheese", price: 0.8 },
      { id: "jalapenos", name: "Jalapeños", price: 0.8 },
      { id: "onions", name: "Caramelised onions", price: 0.8 },
      { id: "lettuce", name: "Lettuce", price: 0.8 },
      { id: "pineapple", name: "Pineapple", price: 0.8 },
      { id: "mushrooms", name: "Mushrooms", price: 0.8 },
      { id: "egg", name: "Fried egg", price: 0.8 },
    ],
  },
  sauces: {
    id: "sauces",
    name: "Sauces",
    type: "multi",
    options: [
      { id: "peri-mayo", name: "Peri mayo", price: 0.5 },
      { id: "garlic", name: "Garlic sauce", price: 0.5 },
      { id: "bbq", name: "BBQ sauce", price: 0.5 },
      { id: "chipotle", name: "Chipotle", price: 0.5 },
      { id: "burger-sauce", name: "Burger sauce", price: 0.5 },
    ],
  },
  drink: {
    id: "drink",
    name: "Choose your drink",
    type: "single",
    options: [
      { id: "pepsi", name: "Pepsi", price: 0 },
      { id: "diet-pepsi", name: "Diet Pepsi", price: 0 },
      { id: "rio", name: "Rio", price: 0 },
      { id: "mirinda", name: "Mirinda", price: 0 },
      { id: "7up", name: "7up", price: 0 },
      { id: "tango", name: "Tango Orange", price: 0 },
      { id: "water", name: "Water", price: 0 },
    ],
  },
  canFlavour: {
    id: "canFlavour",
    name: "Flavour",
    type: "single",
    required: true,
    options: [
      { id: "pepsi", name: "Pepsi", price: 0 },
      { id: "diet-pepsi", name: "Diet Pepsi", price: 0 },
      { id: "rio", name: "Rio", price: 0 },
      { id: "mirinda", name: "Mirinda", price: 0 },
      { id: "7up", name: "7up", price: 0 },
      { id: "tango", name: "Tango Orange", price: 0 },
      { id: "water", name: "Water", price: 0 },
    ],
  },
  shakeFlavour: {
    id: "shakeFlavour",
    name: "Shake flavour",
    type: "single",
    required: true,
    options: [
      { id: "vanilla", name: "Vanilla", price: 0 },
      { id: "kinder", name: "Kinder", price: 0 },
      { id: "bounty", name: "Bounty", price: 0 },
      { id: "oreo", name: "Oreo", price: 0 },
      { id: "galaxy", name: "Galaxy", price: 0 },
      { id: "snickers", name: "Snickers", price: 0 },
      { id: "milky-way", name: "Milky Way", price: 0 },
    ],
  },
  specialShakeFlavour: {
    id: "specialShakeFlavour",
    name: "Special shake flavour",
    type: "single",
    required: true,
    options: [
      { id: "ferrero", name: "Ferrero Rocher", price: 0 },
      { id: "toblerone", name: "Toblerone", price: 0 },
    ],
  },
};

/* --------------------------------------------------------------- categories */

export const CATEGORIES: Category[] = [
  {
    id: "grilled-chicken",
    name: "Peri Peri Grilled Chicken",
    tagline: "Marinated 24 hours, fire grilled to order",
    image: heroChicken,
  },
  {
    id: "peri-chicken",
    name: "Peri Peri Chicken",
    tagline: "Breast fillets in a wrap or burger",
    image: catWings,
  },
  {
    id: "loaded-fries",
    name: "Loaded Fries",
    tagline: "Our signature — piled high",
    image: catLoadedFries,
  },
  {
    id: "burgers",
    name: "Gourmet Beef Burgers",
    tagline: "6oz · 12oz · 18oz smashed patties",
    image: catBurgers,
  },
  { id: "lamb-veggie", name: "Lamb & Veggie", tagline: "Handmade lamb patties & veggie options" },
  { id: "new-arrivals", name: "New Arrivals", tagline: "Fresh on the grill" },
  { id: "sides", name: "Sides & Extras", tagline: "Everything on the side" },
  { id: "kids", name: "Kids Meals", tagline: "Little portions, big flavour" },
  { id: "drinks", name: "Drinks", tagline: "Ice cold" },
  { id: "shakes-desserts", name: "Shakes & Desserts", tagline: "Thick shakes & sweet finishes", image: catShakes },
];

/* ----------------------------------------------------------------- products */

const one = (price: number): ProductSize[] => [{ label: "Standard", price }];

export const PRODUCTS: Product[] = [
  // Peri Peri Grilled Chicken
  {
    id: "quarter-chicken",
    name: "¼ Fire Grilled Chicken",
    description: "Quarter chicken, flame grilled with your choice of peri peri basting.",
    categoryId: "grilled-chicken",
    sizes: one(4.5),
    image: heroChicken,
    modifiers: ["spice", "sauces"],
    mealUpgrade: 2.5,
    tags: ["halal", "grilled"],
  },
  {
    id: "half-chicken",
    name: "½ Fire Grilled Chicken",
    description: "Half chicken basted and grilled over open flame.",
    categoryId: "grilled-chicken",
    sizes: one(6.99),
    image: heroChicken,
    modifiers: ["spice", "sauces"],
    mealUpgrade: 2.5,
    tags: ["bestseller"],
  },
  {
    id: "whole-chicken",
    name: "Whole Fire Grilled Chicken",
    description: "A full bird — perfect for sharing.",
    categoryId: "grilled-chicken",
    sizes: one(11.49),
    image: heroChicken,
    modifiers: ["spice", "sauces"],
    mealUpgrade: 2.5,
  },
  {
    id: "wings",
    name: "Fire Grilled Chicken Wings",
    description: "Grilled wings tossed in peri peri.",
    categoryId: "grilled-chicken",
    sizes: [
      { label: "3 wings", price: 2.99 },
      { label: "5 wings", price: 4.49 },
      { label: "10 wings", price: 9.49 },
    ],
    image: catWings,
    modifiers: ["spice", "sauces"],
    mealUpgrade: 2.5,
    tags: ["bestseller"],
  },
  {
    id: "chicken-strips",
    name: "8 Chicken Strips",
    description: "Eight grilled chicken strips with your choice of basting.",
    categoryId: "grilled-chicken",
    sizes: one(6.49),
    modifiers: ["spice", "sauces"],
    mealUpgrade: 2.5,
  },

  // Peri Peri Chicken
  {
    id: "peri-breast",
    name: "Peri Peri Chicken Breast",
    description: "Grilled breast fillet in a burger or wrap with salad.",
    categoryId: "peri-chicken",
    sizes: [
      { label: "Regular", price: 4.49 },
      { label: "Meal", price: 6.99 },
    ],
    image: catWings,
    modifiers: ["spice", "toppings", "sauces"],
    tags: ["bestseller"],
  },
  {
    id: "double-peri-breast",
    name: "Double Peri Peri Chicken Breast",
    description: "Two grilled breast fillets, salad and sauce.",
    categoryId: "peri-chicken",
    sizes: [
      { label: "Regular", price: 7.49 },
      { label: "Meal", price: 9.99 },
    ],
    modifiers: ["spice", "toppings", "sauces"],
  },

  // Loaded fries
  {
    id: "plain-loaded-fries",
    name: "Plain Loaded Fries",
    description: "Fries loaded with cheese sauce and peri drizzle.",
    categoryId: "loaded-fries",
    sizes: one(4.79),
    image: catLoadedFries,
    modifiers: ["spice", "toppings", "sauces"],
  },
  {
    id: "chicken-loaded-fries",
    name: "Chicken Loaded Fries",
    description: "Fries, grilled peri chicken, cheese sauce, jalapeños and peri drizzle.",
    categoryId: "loaded-fries",
    sizes: one(8.99),
    image: catLoadedFries,
    modifiers: ["spice", "toppings", "sauces"],
    tags: ["signature"],
  },
  {
    id: "beef-loaded-fries",
    name: "Beef Loaded Fries",
    description: "Fries, seasoned beef, cheese sauce and peri drizzle.",
    categoryId: "loaded-fries",
    sizes: one(8.99),
    image: catLoadedFries,
    modifiers: ["spice", "toppings", "sauces"],
    tags: ["signature"],
  },

  // Burgers — 6oz / 12oz / 18oz
  ...[
    { id: "classic", name: "Classic Burger", description: "Beef patty, salad and burger sauce." },
    { id: "cheese", name: "Cheese Burger", description: "Beef patty with melted cheese." },
    { id: "bbq", name: "BBQ Burger", description: "Beef patty, cheese, onions and BBQ sauce." },
    { id: "smokey", name: "Smokey Burger", description: "Beef patty with smokey sauce and cheese." },
    { id: "chipotle-cheese", name: "Chipotle Cheese Burger", description: "Beef patty, cheese and chipotle mayo." },
    { id: "cream-cheese", name: "Cream Cheese Burger", description: "Beef patty with cream cheese and jalapeños." },
    { id: "pineapple-passion", name: "Pineapple Passion Burger", description: "Beef patty, cheese and grilled pineapple." },
    {
      id: "quayside-special",
      name: "Quayside Special Burger",
      description: "Our house burger — beef, cheese, onions and Quayside sauce.",
    },
  ].map((b) => ({
    id: `burger-${b.id}`,
    name: b.name,
    description: b.description,
    categoryId: "burgers",
    sizes: [
      { label: "6oz", price: 5.49 },
      { label: "12oz", price: 8.24 },
      { label: "18oz", price: 11.49 },
    ],
    image: catBurgers,
    modifiers: ["toppings", "sauces"],
    mealUpgrade: 2.5,
    ...(b.id === "quayside-special" ? { tags: ["signature"] } : {}),
  })),

  // Lamb & Veggie
  {
    id: "classic-lamb",
    name: "Classic Lamb",
    description: "Handmade lamb patty with salad and sauce.",
    categoryId: "lamb-veggie",
    sizes: [
      { label: "Regular", price: 5.99 },
      { label: "Meal", price: 8.49 },
    ],
    modifiers: ["toppings", "sauces"],
  },
  {
    id: "guaca-lamb",
    name: "Guaca Lamb",
    description: "Lamb patty with guacamole, salad and sauce.",
    categoryId: "lamb-veggie",
    sizes: [
      { label: "Regular", price: 5.99 },
      { label: "Meal", price: 8.49 },
    ],
    modifiers: ["toppings", "sauces"],
  },
  {
    id: "veggie-bean",
    name: "Veggie / Spicy Bean",
    description: "Spicy bean patty with salad and sauce.",
    categoryId: "lamb-veggie",
    sizes: one(3.49),
    modifiers: ["toppings", "sauces"],
    tags: ["veggie"],
  },

  // New arrivals
  { id: "shami-burger", name: "Shami Burger", categoryId: "new-arrivals", sizes: one(4.49), modifiers: ["toppings", "sauces"], tags: ["new"] },
  {
    id: "lamb-chops",
    name: "Lamb Chops with Salad & Chips",
    categoryId: "new-arrivals",
    sizes: one(9.99),
    modifiers: ["spice", "sauces"],
    tags: ["new"],
  },
  { id: "lamb-doner-chips", name: "Lamb Doner with Salad & Chips", categoryId: "new-arrivals", sizes: one(10.8), modifiers: ["sauces"], tags: ["new"] },
  { id: "lamb-doner-nan", name: "Lamb Doner in Nan", categoryId: "new-arrivals", sizes: one(8.99), modifiers: ["sauces"], tags: ["new"] },
  {
    id: "chicken-shish",
    name: "Chicken Shish with Chips",
    categoryId: "new-arrivals",
    sizes: one(9.99),
    modifiers: ["spice", "sauces"],
    tags: ["new"],
  },

  // Sides
  { id: "fries", name: "Fries", categoryId: "sides", sizes: [{ label: "Regular", price: 2 }, { label: "Large", price: 3.5 }] },
  { id: "onion-rings", name: "Onion Rings", categoryId: "sides", sizes: [{ label: "Regular", price: 2.5 }, { label: "Large", price: 4.5 }] },
  { id: "fiery-rice", name: "Fiery Rice", categoryId: "sides", sizes: [{ label: "Regular", price: 1.49 }, { label: "Large", price: 2.99 }] },
  { id: "coleslaw", name: "Coleslaw", categoryId: "sides", sizes: [{ label: "Regular", price: 1.49 }, { label: "Large", price: 2.99 }] },
  { id: "wedges", name: "Potato Wedges", categoryId: "sides", sizes: [{ label: "Regular", price: 2.99 }, { label: "Large", price: 4.99 }] },
  { id: "corn", name: "Corn on the Cob", categoryId: "sides", sizes: [{ label: "Regular", price: 2.49 }, { label: "Large", price: 4.99 }] },
  { id: "egg-peri-rice", name: "Egg Peri Rice", categoryId: "sides", sizes: one(3.99) },
  { id: "mushroom-peri-rice", name: "Mushrooms Peri Rice", categoryId: "sides", sizes: one(3.99) },
  { id: "cheesy-chips", name: "Cheesy Chips", categoryId: "sides", sizes: one(4.49) },
  { id: "nuggets", name: "Chicken Nuggets", categoryId: "sides", sizes: [{ label: "5 pieces", price: 2.99 }, { label: "10 pieces", price: 5.99 }] },
  { id: "popcorn-chicken", name: "Chicken Popcorn", categoryId: "sides", sizes: one(4.99) },
  { id: "peri-salt", name: "Peri Salt", categoryId: "sides", sizes: one(0.5) },
  { id: "dips", name: "Dips", categoryId: "sides", sizes: one(0.5), modifiers: ["sauces"] },
  { id: "toasted-pitta", name: "Toasted Pitta", categoryId: "sides", sizes: one(0.99) },
  { id: "nan-bread", name: "Nan Bread", categoryId: "sides", sizes: one(1.2) },
  { id: "mozzarella-sticks", name: "Mozzarella Sticks", categoryId: "sides", sizes: one(5.99) },
  { id: "chilli-nuggets", name: "Chilli Nuggets", categoryId: "sides", sizes: one(4.49) },
  { id: "sweet-potato-fries", name: "Sweet Potato Fries", categoryId: "sides", sizes: one(4.99) },

  // Kids
  {
    id: "kids-chicken-steak",
    name: "Kids Chicken Steak Burger",
    description: "Choose the meal option to add fries and a drink.",
    categoryId: "kids",
    sizes: [{ label: "On its own", price: 3.5 }, { label: "Meal", price: 5.99 }],
    modifiers: ["drink"],
  },
  {
    id: "kids-nuggets",
    name: "Kids 5 Chicken Nuggets",
    categoryId: "kids",
    sizes: [{ label: "On its own", price: 3.5 }, { label: "Meal", price: 5.99 }],
    modifiers: ["drink"],
  },
  {
    id: "kids-popcorn",
    name: "Kids Popcorn Chicken",
    categoryId: "kids",
    sizes: [{ label: "On its own", price: 3.5 }, { label: "Meal", price: 5.99 }],
    modifiers: ["drink"],
  },

  // Drinks
  { id: "can", name: "Can", categoryId: "drinks", sizes: one(1.2), modifiers: ["canFlavour"] },
  { id: "bottle-1-5", name: "1.5L Bottle", categoryId: "drinks", sizes: one(3.5), modifiers: ["canFlavour"] },

  // Shakes & desserts
  {
    id: "milkshake",
    name: "Milkshake",
    description: "Thick shake blended with real chocolate.",
    categoryId: "shakes-desserts",
    sizes: one(4.99),
    image: catShakes,
    modifiers: ["shakeFlavour"],
    tags: ["bestseller"],
  },
  {
    id: "special-shake",
    name: "Quayside Special Shake",
    description: "Our premium shake — Ferrero Rocher or Toblerone.",
    categoryId: "shakes-desserts",
    sizes: one(5.99),
    image: catShakes,
    modifiers: ["specialShakeFlavour"],
    tags: ["signature"],
  },
  { id: "fudge-cake", name: "Chocolate Fudge Cake", categoryId: "shakes-desserts", sizes: one(3.49) },
  { id: "cheesecake", name: "Strawberry Cheesecake", categoryId: "shakes-desserts", sizes: one(3.49) },
  { id: "apple-pie", name: "American Apple Pie", categoryId: "shakes-desserts", sizes: one(1.99) },
  { id: "haagen-dazs", name: "Haagen-Dazs", categoryId: "shakes-desserts", sizes: one(6.49) },
];

export function productById(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}

export function productsByCategory(categoryId: string) {
  return PRODUCTS.filter((p) => p.categoryId === categoryId);
}

export function searchProducts(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      CATEGORIES.find((c) => c.id === p.categoryId)?.name.toLowerCase().includes(q),
  ).slice(0, 12);
}

export const BESTSELLERS = ["half-chicken", "chicken-loaded-fries", "burger-quayside-special", "wings", "peri-breast", "milkshake"]
  .map((id) => productById(id))
  .filter((p): p is Product => Boolean(p));

/** Cross-sell suggestions — configurable per category. */
export const CROSS_SELL: Record<string, string[]> = {
  burgers: ["fries", "can", "milkshake"],
  "grilled-chicken": ["fiery-rice", "can", "coleslaw"],
  "loaded-fries": ["can", "milkshake"],
  "peri-chicken": ["fries", "can"],
  "shakes-desserts": ["fudge-cake"],
  default: ["fries", "can", "dips"],
};

export const ALLERGENS = [
  "Egg",
  "Lupin",
  "Sulphur dioxide",
  "Fish",
  "Soya",
  "Crustaceans",
  "Peanuts",
  "Celery",
  "Tree nuts",
  "Mustard",
  "Molluscs",
  "Sesame",
  "Wheat / Gluten",
];
