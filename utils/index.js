const DocsObj = {
  title: "Swadeshi-Ecomm-App",
  description: "This is backend for E-commenrce app.",
  author: "Rishikesh Shinde",
  features: [
    "Auth-Management",
    "Products-Management",
    "Cart-Management",
    "Wishlist-Management",
  ],
  apiEndpoints: [
    {
      api: "/",
      method: "GET",
      description:
        "This endpoint is used for details about backend functionality.",
    },
    {
      api: "/products",
      method: "GET",
      description:
        "This endpoint is used for fetching all products listed on DB.",
    },
    {
      api: "/products",
      method: "POST",
      body: {
        productDetails: "productDetails",
      },
      description: "This endpoint is used for adding product on DB.",
    },
    {
      api: "/auth/login",
      method: "POST",
      body: {
        userData: { emai: "email", password: "password" },
      },
      description: "This endpoint is used for login of user.",
    },
  ],
};

module.exports = { DocsObj };
