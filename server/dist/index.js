"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use("/images", express_1.default.static(path_1.default.join(__dirname, "../public/images")));
app.get("/", (req, res) => {
    console.log(path_1.default.join(__dirname, "../public"));
    const foodData = [
        {
            name: "Boiled Egg",
            price: 10,
            text: "Perfectly boiled farm-fresh eggs served with salt and pepper.",
            image: "/images/egg.png",
            type: "breakfast",
        },
        {
            name: "Ramen",
            price: 25,
            text: "Authentic Japanese ramen served in a rich savory broth.",
            image: "/images/ramen.png",
            type: "lunch",
        },
        {
            name: "Grilled Chicken",
            price: 45,
            text: "Juicy grilled chicken seasoned with herbs and spices.",
            image: "/images/chicken.png",
            type: "dinner",
        },
        {
            name: "Cake",
            price: 18,
            text: "Soft sponge cake layered with creamy frosting.",
            image: "/images/cake.png",
            type: "breakfast",
        },
        {
            name: "Burger",
            price: 23,
            text: "Classic cheeseburger with lettuce and signature sauce.",
            image: "/images/burger.png",
            type: "lunch",
        },
        {
            name: "Pancake",
            price: 25,
            text: "Fluffy pancakes topped with maple syrup.",
            image: "/images/pancake.png",
            type: "dinner",
        },
        {
            name: "Masala Omelette",
            price: 15,
            text: "Spicy masala omelette with onions and green chilies.",
            image: "/images/egg.png",
            type: "breakfast",
        },
        {
            name: "Chocolate Pastry",
            price: 20,
            text: "Rich chocolate pastry with creamy layers.",
            image: "/images/cake.png",
            type: "breakfast",
        },
        {
            name: "Chicken Burger",
            price: 28,
            text: "Crispy chicken patty burger with fresh veggies.",
            image: "/images/burger.png",
            type: "lunch",
        },
        {
            name: "Veg Ramen",
            price: 22,
            text: "Vegetarian ramen packed with fresh vegetables.",
            image: "/images/ramen.png",
            type: "lunch",
        },
        {
            name: "Double Patty Burger",
            price: 35,
            text: "Loaded burger with double patty and melted cheese.",
            image: "/images/burger.png",
            type: "lunch",
        },
        {
            name: "Roast Chicken",
            price: 50,
            text: "Slow-roasted chicken served with herb seasoning.",
            image: "/images/chicken.png",
            type: "dinner",
        },
        {
            name: "Honey Pancake",
            price: 27,
            text: "Golden pancakes topped with honey drizzle.",
            image: "/images/pancake.png",
            type: "dinner",
        },
        {
            name: "Spicy Chicken",
            price: 48,
            text: "Spicy grilled chicken cooked with special spices.",
            image: "/images/chicken.png",
            type: "dinner",
        },
        {
            name: "Cream Cake",
            price: 19,
            text: "Fresh cream cake with soft sponge layers.",
            image: "/images/cake.png",
            type: "breakfast",
        },
        {
            name: "Egg Delight",
            price: 12,
            text: "Simple yet delicious egg dish for quick breakfast.",
            image: "/images/egg.png",
            type: "breakfast",
        },
        {
            name: "Classic Ramen Bowl",
            price: 30,
            text: "Hot ramen bowl with rich broth and perfectly cooked noodles.",
            image: "/images/ramen.png",
            type: "lunch",
        },
        {
            name: "Mini Chicken Platter",
            price: 40,
            text: "Grilled chicken pieces served with dipping sauce.",
            image: "/images/chicken.png",
            type: "dinner",
        },
    ];
    res.json(foodData);
});
app.listen(9000, () => {
    console.log("Server is running on port 9000");
});
//# sourceMappingURL=index.js.map