import type { Config } from "tailwindcss";
export default { content:["./app/**/*.tsx","./components/**/*.tsx"],theme:{extend:{colors:{ivory:"#FFF9F4",blush:"#F4DCE0",rose:"#D5A1AA",burgundy:"#76283F",gold:"#B69A59",warm:"#FFFEFC"},
fontFamily:{script:["var(--f-script)"],serif:["var(--f-serif)"],display:["var(--f-display)"],arabic:["var(--f-arabic)"],sans:["var(--f-serif)"]}}},plugins:[]} satisfies Config;
