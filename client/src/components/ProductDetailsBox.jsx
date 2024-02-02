/* eslint-disable react/prop-types */


const ProductDetailsBox = ({product}) => {
  return (
    <div className="product-features">
              <h1 className="title">Product Features</h1>
              {product?.brand && (
                <div>
                  <span>Brand:</span>
                  <p>{product?.brand}</p>
                </div>
              )}
              {product?.modelName && (
                <div>
                  <span>Model Name:</span>
                  <p>{product?.modelName}</p>
                </div>
              )}
              {product?.screenSize && (
                <div>
                  <span>Screen Size:</span>
                  <p>{product?.screenSize}</p>
                </div>
              )}
              {product?.CPUModel && (
                <div>
                  <span>CPU Model:</span>
                  <p>{product?.CPUModel}</p>
                </div>
              )}
              {product?.ramMemory && (
                <div>
                  <span>RAM Memory:</span>
                  <p>{product?.ramMemory}</p>
                </div>
              )}
              {product?.romMemory && (
                <div>
                  <span>ROM Memory:</span>
                  <p>{product?.romMemory}</p>
                </div>
              )}
              {product?.operatingSystem && (
                <div>
                  <span>Operating System:</span>
                  <p>{product?.operatingSystem}</p>
                </div>
              )}
              {product?.specialFeature && (
                <div>
                  <span>Special Feature:</span>
                  <p>{product?.specialFeature}</p>
                </div>
              )}
              {product?.graphicsCard && (
                <div>
                  <span>Graphics Card:</span>
                  <p>{product?.graphicsCard}</p>
                </div>
              )}
              {product?.manufacturer && (
                <div>
                  <span>Manufacturer</span>
                  <p>{product?.manufacturer}</p>
                </div>
              )}
              {product?.manufacturer && (
                <div>
                  <span>Store</span>
                  <p>{product?.store}</p>
                </div>
              )}
            </div>
  )
}

export default ProductDetailsBox