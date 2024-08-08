"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3004;
const api = process.env.API_KEY;
function getWeather(a) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(`http://api.weatherapi.com/v1/current.json?key=${api}&q=${a}&aqi=no`);
            return {
                Condition: response.data.current.condition.text,
                Temperature: response.data.current.temp_c,
            };
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    });
}
app.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const weather = yield getWeather(req.params.id);
        res.json(weather);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
