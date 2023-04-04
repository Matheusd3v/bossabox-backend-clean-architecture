import * as yup from "yup"

export const toolSchema = yup.object().shape({
    title: yup.string().required(),
    link: yup.string().required(),
    description: yup.string().required(),
    tags: yup
        .array().of(
            yup.string().required()
        ).min(1).required()
}); 