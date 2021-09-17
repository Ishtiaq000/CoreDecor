function CategorizeProducts(products) {
  const permittedValues = products.map((value) => value.category);
  const categoryList = [...new Set(permittedValues)];
  // console.log(categoryList);

  var categorizedProducts = {};
  categoryList.map(
    (category) =>
      (categorizedProducts[category] = products.filter(
        (product) => product.category === category
      ))
  );

  return categorizedProducts;
}

export default CategorizeProducts;
