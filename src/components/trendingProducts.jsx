import ProductCard from "./productCard";

export default function TrendingProducts() {
    return (
        <div>
            <h2>Trending Products</h2>
            <ProductCard name="iPhone" price="65,000" image="https://picsum.photos/id/1/200/300" />

            <ProductCard name="dell" price="35,000" image="https://picsum.photos/id/2/200/300" />

            <ProductCard name="msi" price="15,000" image="https://picsum.photos/id/3/200/300" />
        </div>
    )
}
