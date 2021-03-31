const optionTypes = {
    coverStyle: "coverStyle",
    blogLayoutStyle: "blogLayoutStyle",
};

const validOptions = {
    [optionTypes.coverStyle]: [
        "full",
        "condensed",
    ],
    [optionTypes.blogLayoutStyle]: [
        "vertical",
        "cards",
    ],
};

export {
    validOptions,
    optionTypes,
};
