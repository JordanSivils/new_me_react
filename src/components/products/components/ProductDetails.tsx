import Button from "../../ui/Button/Button"
import buttonStyles from "../../ui/Button/Button.module.css"
import detailsStyles from "../../../styles/Details.module.css"
import { useEffect, useState } from "react"
import type { PartialProduct } from "../../../api/products/productTypes"
import { productApi } from "../../../api/products/api/productsApi"
import { useAuth } from "@clerk/react-router"
import Loading from "../../loading/Loading"
type ProductDetailsProps = {
    productId: string
    onClose: () => void
}

const ProductDetails = ({ productId, onClose}: ProductDetailsProps) => {
    const { getToken } = useAuth();
    const [product, setProduct] = useState<PartialProduct | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(false)
                const res = await productApi.getProductById(getToken, productId);
                setProduct(res.data)
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [getToken])


    return (
        <div className={`flex-col ${detailsStyles.detailsContainer}`}>
            <div className={`flex-col ${detailsStyles.detailsGroup}`}>
                <div className="flex-col">
                    <h3>{product?.description}</h3>
                    <p>SKU: {product?.sku}</p>
                </div>
                <div className={`flex-col ${detailsStyles.labelAndDetail}`}>
                    <h5>Available</h5>
                    <p>{product?.available}</p>
                </div>
                {product?.suppliers &&
                <div className={`flex-col ${detailsStyles.labelAndDetail}`}>
                    <h5>Suppliers</h5>
                    {product.suppliers.map(supplier => (
                    <p>{supplier.name}</p>
                    ))}
                </div>
                }
                {product?.brand && 
                    <div className={`flex-col ${detailsStyles.labelAndDetail}`}>
                        <h5>Brand</h5>
                        <p>{product.brand.name}</p>
                    </div>
                }
                {product?.category &&
                    <div className={`flex-col ${detailsStyles.labelAndDetail}`}>
                        <h5>Category</h5>
                        <p>{product.category.name}</p>
                    </div>
                }
                <Button onClick={onClose} children="Done" type="button" className={buttonStyles.createFill} />
                {loading && <Loading />}
            </div>
        </div>
    )
}

export default ProductDetails