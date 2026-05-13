async function loadPageData() {
    try {
        const [productsRes, sectionsRes] = await Promise.all([
            fetch('json-files/products.json'),
            fetch('json-files/sections.json')
        ]);

        // Check HTTP status manually, because fetch() doesn't throw on 404
        if (!productsRes.ok) throw new Error('Failed to load products');
        if (!sectionsRes.ok) throw new Error('Failed to load sections');

        const products = await productsRes.json();
        const sections = await sectionsRes.json();

        renderProducts(products);
        renderSections(sections);

    } catch (error) {
        // Insert error into DOM
        const container = document.getElementById('error-container');
        container.textContent = `Something went wrong: ${error.message}`;
    }
}

function renderProducts(products) {
    const grid = document.getElementById('products-grid');

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';

        const img = document.createElement('img');
        img.src = product.imageURL;
        img.alt = product.title;

        const title = document.createElement('h3');
        title.textContent = product.title;

        const price = document.createElement('p');
        price.textContent = `$${product.price}`;

        card.append(img, title, price);
        grid.appendChild(card);
    })
}

function renderSections(data) {
    // Render header text
    document.getElementById('store-header').textContent = data.headerText;

    // Render banner
    const banner = document.getElementById('banner');
    banner.src = data.bannerImage;

    // Render info sections
    const infoContainer = document.getElementById('info-sections');
    data.infoSections.forEach(section => {
        const block = document.createElement('div');

        const heading = document.createElement('h2');
        heading.textContent = section.title;

        const text = document.createElement('p');
        text.textContent = section.content;

        block.append(heading, text);
        infoContainer.appendChild(block);
    });
}

loadPageData();
