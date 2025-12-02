import * as yup from 'yup'

export const menuSchema = yup.object({
  label: yup.string().required('Vui lòng nhập tên menu.'),

  slug: yup
    .string()
    .required('Slug là bắt buộc.')
    .matches(
      /^[a-z0-9-]+$/,
      'Slug chỉ bao gồm chữ thường, số và dấu gạch nối.'
    ),

  parent: yup.string().nullable().notRequired(),

  url: yup.string().nullable().notRequired(),

  order: yup
    .number()
    .typeError('Order phải là số.')
    .integer('Order phải là số nguyên.')
    .min(0, 'Order không được nhỏ hơn 0.')
    .default(0),

  isActive: yup.boolean().default(true),
})
