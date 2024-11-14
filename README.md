# Crystallize - NextJS - Boilerplate

> **Warning**
> This boilerplate is deprecated, check out [this Next.js eCommerce Accelerator](https://github.com/CrystallizeAPI/nextjs-furnitut) instead

The furniture boilerplate is a fully-featured eCommerce boilerplate built using Next.js and Crystallize.

> **Note**  
> Some features such as the authentication are a work in progress and will be added soon. Please check out our Remix.run boilerplate as it contains authentication.

## Getting Started

There are two ways to set up the project - one would be to directly clone the repository. Another, better one is to use the Crystallize CLI (command line interface). Open the terminal and run the following command:

```bash
npx @crystallize/cli-next@latest install ~/my-projects/my-ecommerce
```

> **Note**  
> If you're not using the CLI to install the project, the .env variables can be found under provisioning < clone < .env.dist

The CLI gives you the option to bootstrap your tenant with all the demo data the furniture store has.

## Running the project locally

To deploy locally, you’ll first need to browse into the project’s application folder (where the package.json file resides). From there, you can invoke npm to start it up.

```bash
cd application
npm run dev
```

## Accessing the development site

Once the development server is running, you will be able to browse to http://localhost:3000/en. The app is contained within the src folder that is located in the applications folder.

### src/assets

The assets folder has all the icons that are being used in the application. All of these are SVG files and you can add or remove these as required.

### src/styles

As the name suggests, this folder has all the styles being used in the application. So if you would like to change the colors and the font, the default.css file in the tailwind folder is where you would go to edit those. Additional component styles are defined in the index.css file present in this folder.

### src/translation

The translation folder contains the translation files.

### src/use-cases

This is all the “Use Cases.” Everything that is business-related, you can see that as the “Domain” folder. There is no connection to the UI nor to the framework in this folder. You will mainly find functions that do meaningful actions like `fetchSomething`, `pushSomething`, `doSomething`. For instance, it contains all the queries used to fetch data from the APIs, in addition to functions that enable you to push customers and orders to Crystallize, while the latter contains everything related to the Service API.

### src/ui

The user interface. This folder contains all the components and the pages as well as the hooks and providers.

### src/app

The app folder contains all the pages the application has. There are some predefined routes such as shop, checkout, orders, etc. However, we also have what Next.js refers to as a catch-all segment that would render a page based on whatever shape it has: product, document, or folder. This folder is really framework-specific and connected to Next.js.

## Editing components

Let’s take a deeper look at the core folder in this section.

### src/ui/checkout-forms

The first folder in core contains the forms you will see throughout the site, namely on the checkout page. This includes the user information page on checkout.

### src/ui/components/crystallize-components

The layout for components specific to Crystallize, such as the paragraph collection, the properties tables, and the file component, can be found here. You can find these components on the product and the individual story pages in the app.

### src/ui/components/curated-product

The boilerplate contains curated products that are part of curated stories. Once a user selects a curated product, they can then select different variants for it. To edit the layout there, you will edit the index file in this folder.

### src/ui/components/search

Each category in the shop contains various filters that are used to filter through products based on colors, price range, stock, etc. The filter components and the logic behind those can be edited within this folder.

### src/ui/components/product

We have various types of items in the boilerplate - product, curated product, document. On root categories, they are shown in a list view. This folder contains individual files to change the layout of these items.

### src/ui/components/payments

With the boilerplate, you get multiple payment integrations such as Stripe and QuickPay (more to come!) in addition to the “Crystal” method, which is purely for testing purposes. You can remove the integrations you don’t require from this folder.

### src/ui/components/grid/tiles

Any grid found in the demo application is made up of tiles in addition to items such as a product or a document. A tile could be one of the following: a banner, an embedded component, a slider, or a hero slider. To change the layout for any of the tiles, you can head over to this folder. Example: the entire front page is a grid made up of tiles.

## API routes

Time to take a look at the API routes. Located within the app folder, you will find API routes for cart, orders, payments, and webhooks. Let’s go through these one by one.
First, you will notice that there is `[langstore]` and `api` folders. This is because the Boilerplate is multilingual. All the routes underneath `[langstore]` can get access to the language and the store from the URL.

### [langstore]/api/cart

The files here take care of handling and placing the cart.

### [langstore]/api/orders

You can fetch orders by either the order ID or the customer identifier. The difference between the two is the former allows you to fetch a particular order, while the latter allows you to fetch every order placed by a customer. This route takes care of both scenarios.

### [langstore]/api/payment

The server-side logic for all the payment providers can also be found here.

### api/webhook

Crystallize provides you with webhook functionality. This allows you to create and customize webhooks that fire off on events such as order creation, order update, item publish, and so much more. The boilerplate takes care of use cases for when a new order is created: an email is sent to the user confirming their order. The created.tsx file here is where you can change the layout of that email.

## Contributing

As this is an open source project, contributions are welcome. A guide on how to contribute is present in the readme for the repository.
