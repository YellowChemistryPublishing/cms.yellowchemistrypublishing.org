// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
    { ignores: [] },
    eslint.configs.recommended,
    tseslint.configs.eslintRecommended,
    tseslint.configs.recommendedTypeChecked,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname
            }
        },
        rules: {
            "@typescript-eslint/no-inferrable-types": 0,
            "@typescript-eslint/typedef": [
                "error",
                {
                    arrayDestructuring: true,
                    arrowParameter: true,
                    memberVariableDeclaration: true,
                    objectDestructuring: true,
                    parameter: true,
                    propertyDeclaration: true,
                    variableDeclaration: true,
                    variableDeclarationIgnoreFunction: true
                }
            ],
            "@typescript-eslint/explicit-function-return-type": "error",
            "@typescript-eslint/no-non-null-assertion": 0,
            "sort-imports": ["error", { ignoreCase: true }],
        }
    }
);
