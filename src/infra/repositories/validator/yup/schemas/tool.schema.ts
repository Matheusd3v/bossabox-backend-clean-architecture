import * as yup from "yup"

const titleValidation = yup.string();
const linkValidation = yup.string();
const descriptionValidation = yup.string();
const tagValidation = yup.string();

export const toolSchema = yup.object().shape({
    title: titleValidation.required(),
    link: linkValidation.required(),
    description: descriptionValidation.required(),
    tags: yup
        .array().of(
            tagValidation.required()
        ).min(1).required()
}); 

export const toolUpdateSchema = yup.object().shape({
    title: titleValidation.optional(),
    link: linkValidation.optional(),
    description: descriptionValidation.optional(),
    tags: yup.array().of(tagValidation.required()).optional()
})