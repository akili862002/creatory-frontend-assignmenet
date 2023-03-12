<img src="./public/logo.png" height="70px" />

# Frontend Assignment 2023

This is a frontend web development project that uses Next.js, React, and Tailwind CSS. The purpose of this project is to showcase the applicant's frontend development skills.

## Demo

- [Live Demo](https://creatory-frontend-assignmenet.vercel.app/)

## Folder Structure

The project is structured as follows:

- **app**: Contains NextJS 13 pages.
- **components**: Contains the React components used in the project.
- **config**: Contains the configuration files for the project.
- **constants**: Contains the constants used in the project.
- **data**: Contains the mock data used in the API.
- **layouts**: Contains the layouts used in the project.
- **pages/api**: Contains the API routes used in the project.
- **pages/api/[...nextauth].tsx**: Contains the NextAuth configuration.
- **services**: Contains the API SDK used in the project.
- **styles**: Contains the global styles used in the project.
- **utils**: Contains the utility functions used in the project.

## Route structure

- `/` - Home page, contains routes to all other pages
- `/auth/login` - Sign in page
- `/create` - An page for creating a new user
- `/users` - A page for viewing all users

## Getting Started

### Prerequisites

To run this project, you need to have Node.js installed on your machine.

### Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory and run npm install to install the dependencies.

### Development

To run the project in development mode, run

```shell
npm run dev
```

This will start a local development server at http://localhost:3000. The server will automatically reload whenever you make changes to the code.

### Building

To build the project for production, run

```shell
npm run build
```

This will create an optimized build of the project in the ./next directory.

### Production

To start the production server, run

```shell
npm run start
```

This will start a server that serves the optimized build created by npm run build.

### Deployment

You can deploy the project to Vercel by following the steps below:

1. Create a Vercel account.
2. Link your GitHub account to Vercel.
3. Create a new project and select the repository that contains the project.
4. Make sure you add environment variables for the NEXT_PUBLIC_HOST and NEXTAUTH_SECRET
5. Click on the "Deploy" button.

### Dependencies

This project uses the following dependencies:

- **Next.js**: A React framework for building server-side rendered and static websites.
  React: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for building custom designs quickly.
- **Axios**: A Promise-based HTTP client for the browser and node.js.
- **Yup**: A JavaScript schema validation library.
- **Formik**: A library for building forms in React.
- **React-Table**: A lightweight and fast table library for React.
- **React-Query**: A library for managing remote data with React.
- **Next-Auth**: A complete authentication solution for Next.js applications.
- **Classnames**: A JavaScript utility for conditionally joining classNames together.
- **Material Ripple Effects**: A CSS library for creating ripple effects on Material Design elements.
- **Tailwind Merge**: A utility for merging Tailwind CSS classes.
- **React Hot Toast**: A lightweight toast notification library for React.
- **Headless UI React**: A set of unstyled, fully accessible UI components for React.

### Author

Nguyen Tien Dung (dung862002@gmail.com)
