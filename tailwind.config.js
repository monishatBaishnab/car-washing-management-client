import { colors, keepTheme } from "keep-react/keepTheme";

const config = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "cws-primary-light": "#0c1555",
                "cws-primary-dark": "#081047",
                "cws-yellow": "#fbb71c",
                "cws-red": "#EA1D27",
            },
        },
    },
};

export default keepTheme(config);
