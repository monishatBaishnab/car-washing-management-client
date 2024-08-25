import { keepTheme } from "keep-react/keepTheme";

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
            keyframes: {
                fadeInDown: {
                    "0%": {
                        opacity: "0",
                        transform: "translateY(-20px)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translateY(0)",
                    }
                },
            },
            animation: {
                fadeInDown: "fadeInDown 0.3s ease-out",
            },
        },
    },
};

export default keepTheme(config);
