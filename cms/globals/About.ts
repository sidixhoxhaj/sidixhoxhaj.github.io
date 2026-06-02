import type { GlobalConfig } from 'payload';

export const SKILLS = [
  { label: 'JavaScript', value: 'javascript' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'Vue.js', value: 'vuejs' },
  { label: 'React.js', value: 'react' },
  { label: 'Next.js', value: 'nextjs' },
  { label: 'Git', value: 'git' },
  { label: 'Figma', value: 'figma' },
  { label: 'jQuery', value: 'jquery' },
  { label: 'HTML5', value: 'html5' },
  { label: 'CSS3', value: 'css3' },
  { label: 'Tailwind', value: 'tailwind' },
  { label: 'Scss', value: 'saas' },
  { label: 'Supabase', value: 'supabase' },
  { label: 'Firebase', value: 'firebase' },
  { label: 'Playwright', value: 'playwright' },
  { label: 'Jest', value: 'jest' },
  { label: 'Google Tag Manager', value: 'google-tag-manager' },
  { label: 'Shopify+', value: 'shopify' },
  { label: 'Wordpress', value: 'wordpress' },
  { label: 'WooCommerce', value: 'woo-commerce' },
  { label: 'Adobe Illustrator', value: 'adobe-illustrator' },
  { label: 'Adobe Photoshop', value: 'adobe-photoshop' },
];

export const About: GlobalConfig = {
  slug: 'about',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true
    },
    {
      name: 'intro',
      type: 'richText',
      required: true
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'text',
          required: true,
        },
        {
          name: 'showLabel',
          type: 'checkbox',
          required: false
        }
      ],
    },
    {
      name: 'experiences',
      type: 'array',
      fields: [
        {
          name: 'company',
          type: 'text',
          required: true,
        },
        {
          name: 'position',
          type: 'text',
          required: true,
        },
        {
          name: 'startDate',
          type: 'date',
          required: true,
        },
        {
          name: 'endDate',
          type: 'date',
        },
        {
          name: 'responsibilities',
          type: 'richText',
          required: true,
        },
        {
          name: 'skills',
          type: 'select',
          hasMany: true,
          options: SKILLS,
        },
      ],
    },
  ],
};
