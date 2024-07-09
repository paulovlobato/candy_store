# Candy Store

Project done for Zimpler

## Installation

To get started with the project, follow these steps:

1. Clone this repository to your local machine.

### Backend
1. Navigate to the project directory's `backend`.
3. Install the required dependencies by running `pnpm install`.
4. Run the server with `node server.js`

### Frontend
1. Navigate to the project directory's `frontend`.
3. Install the required dependencies by running `pnpm install`.
4. Run the server with `npm run dev`

## Usage

Once the application is running, you can access the Candy Store by opening your web browser and navigating to `http://localhost:3000`.


## About the stack
This project utilizes all the bells and whistles available in the market.

- [PNPM](https://pnpm.io/) - Because, why wouldn't you? It's faster than NPM and Yarn
- [dotenv](https://www.npmjs.com/package/dotenv) - For loading environment variables
- [GraphQL](https://graphql.org/) - Because it's way better than traditional REST HTTP requests (even though a fallback endpoint was also added)
- [ExpressJS](https://expressjs.com/) - Just wanted to quickstart the BE as soon as possible to focus on FE
- [NextJS](https://nextjs.org/) - Been using Server Components throughout all the project, enjoy!
- [Tailwindcss](https://tailwindcss.com/) - Because I like it

### Additional notes
Regarding sorting and filtering, this is obviously not an optimal solution. We're simply filtering, sorting and slicing an array of 2000 items.

In a real-life scenario, this would need to be it's own database that could be updated via cloud events, instead of doing this nasty thing that I did. Don't do that at home, kids.

Database was not implementing due to obvious time and effort constraints, but functionality is present there, either way.
