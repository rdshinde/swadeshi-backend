const saveUserDoc = function (next) {
  this.cart.qty = this.cart.products.length;
  this.wishlist.qty = this.wishlist.products.length;
  this.updatedAt = Date.now();

  if (this.cart?.products?.some((product) => product.quantitiesInCart <= 0)) {
    const itemToDelete = this.cart?.products?.find(
      (product) => product.quantitiesInCart === 0
    );
    this.cart.products = this.cart?.products?.filter(
      (pr) => pr._id !== itemToDelete._id
    );
  }
  next();
};
module.exports = { saveUserDoc };
