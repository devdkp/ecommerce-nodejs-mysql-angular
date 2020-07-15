"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
require('dotenv').config();
const auth_1 = __importDefault(require("./routes/auth"));
const shop_1 = __importDefault(require("./routes/shop"));
const app = express_1.default();
const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send('Welcome to crownstack!');
});
// Get static files and folder
app.use(express_1.default.static('public'));
//Middleware set
app.use(express_1.default.json());
app.use(cors_1.default());
app.use('/api/auth', auth_1.default);
app.use('/api/shop', shop_1.default);
app.listen(process.env.PORT, err => {
    if (err)
        return console.error(err);
    else
        console.log(`Server is running on ${process.env.PORT}`);
});
db_1.default.connect((err) => {
    if (err)
        throw err;
    console.log('Connected!');
});
//# sourceMappingURL=app.js.map