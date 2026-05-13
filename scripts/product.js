// Read product id from URL query string, e.g. product.html?id=2
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

async function loadProductDetail() {
    const errorContainer = document.getElementById('error-container');

    if (!productId) {
        errorContainer.textContent = 'No product selected. Go back and click a product.';
        return;
    }

    try {
        const response = await fetch(`json-files/product-${productId}.json`);

        if (!response.ok) throw new Error(`Product not found (id: ${productId})`);

        const product = await response.json();
        renderProduct(product);

    } catch (error) {
        errorContainer.textContent = `Something went wrong: ${error.message}`;
    }
}

function renderProduct(product) {
    const container = document.getElementById('product-detail');

    const img = document.createElement('img');
    img.src = product.imageURL;
    img.alt = product.title;
    img.className = 'detail-img';

    const info = document.createElement('div');
    info.className = 'detail-info';

    const title = document.createElement('h1');
    title.textContent = product.title;

    const price = document.createElement('p');
    price.className = 'detail-price';
    price.textContent = `$${product.price}`;

    const description = document.createElement('p');
    description.className = 'detail-description';
    description.textContent = product.description;

    const meta = document.createElement('ul');
    meta.className = 'detail-meta';

    [
        `Category: ${product.category}`,
        `Origin: ${product.origin}`,
        `In stock: ${product.stock} units`
    ].forEach(text => {
        const li = document.createElement('li');
        li.textContent = text;
        meta.appendChild(li);
    });

    info.append(title, price, description, meta);
    container.append(img, info);

    // Update page title to match product
    document.title = product.title;
}

loadProductDetail();
