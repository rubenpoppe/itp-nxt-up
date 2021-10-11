# In The Pocket NXT.UP web case

Recipe blog created with Next.js.

- ⚛️ Reducing size with Preact
- 💾 Fetching data from DatoCMS
- ✨ Lighthouse optimized
- 🧏 Accessible
- 🚀 Deployed on Vercel
- ✅ Schema.org recipe structured data
- 🥗 Vegan friendly

## Getting started

- Create `.env` from the template
- Install dependencies
  ```bash
  npm install
  ```

### Development

```bash
npm run dev
```

### Production

```bash
npm run build
npm run start
```

## Deployment

This repository is deployed on [Vercel](https://vercel.com/). When connected with your GitHub account, add a new project by importing a repository.
Configure environment variables and you're good to go.

## Takeaways

### Why I chose DatoCMS

- Good integration with Next.js/Vercel
- My other viable option, Prismic, is quite biased towards the Apollo GraphQL client. And I had some problems when using graphql-request.
- Although DatoCMS is great, I would have liked the option of creating a list of objects without typing JSON.
  - This way I could recalculate the ingredients when changing the recipe's yield.
