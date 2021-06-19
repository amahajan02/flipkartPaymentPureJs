document.addEventListener('DOMContentLoaded', (event) => {

    initPayment(productList);
});
const indFormat = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumSignificantDigits: 3 
});
const productList = {
    quantity: 1,
    price: 5600,
    cod: false
};

let discount = 0;

function createPriceNode() {
    const { quantity, price } = productList;
    const priceDetails = document.querySelector('.price-details__breakup');
    const container = createNode('div', 'price-details__breakup', priceDetails);
    createNode('span', null, container, `Price (${quantity} item${quantity > 1 ? 's' : ''})`);
    createNode('span', null, container, `${indFormat.format(quantity * price)}`);
}

function createNode(type = 'div', className, parent, textContent, id) {
    const node = document.createElement(type);
    if (className) {
        node.className = className;
    }
    if (textContent) {
        node.textContent = textContent;
    }
    if (id) {
        node.setAttribute('id', id);
    }
    parent.appendChild(node);
    return node;
}

function getDiscount() {
    const { quantity, price } = productList;
    let discount = null;
    const totalPrice = quantity * price;
    const selectedPaymentMethod = document.querySelector('input[name="paymentOp"]:checked').value;
    switch (selectedPaymentMethod) {
        case "phonePe":
            if (totalPrice > 2500) {
                discount = {
                    type: "Phone Pe",
                    amount: 200
                }
            }
            break;
        case "credit":
            const issuingAuthority = document.querySelector('#issuingAuthority').value;
            if (issuingAuthority === "Master Card") {
                discount = {
                    type: "Bank offer",
                    amount: Math.min(totalPrice / 10, 1500)
                }
            }
            const card = document.querySelector('#bankName').value;
            if (card === "HDFC") {
                let existingDiscount = 0;
                if (discount) {
                    existingDiscount = discount.amount;
                } else {
                    discount = {
                        type: 'Bank Offer',
                        amount: 0
                    }
                };
                discount.amount = existingDiscount + Math.min((totalPrice - existingDiscount) / 10, 2000);
            } else if (card === "SBI") {
                let existingDiscount = 0;
                if (discount) {
                    existingDiscount = discount.amount;
                } else {
                    discount = {
                        type: 'Bank Offer',
                        amount: 0
                    }
                };
                discount.amount = existingDiscount + Math.min((totalPrice - existingDiscount) / 20, 1000);
            }
            break;
        default:
            discount = null;
    }
    return discount;
}

function applyDiscount(discount) {
    const discountNode = document.getElementById('discount');
    if (discountNode) {
        discountNode.firstElementChild.textContent = discount.type;
        discountNode.lastElementChild.textContent = discount.amount;
    } else {
        const priceDetails = document.querySelector('.price-details__breakup');
        const container = createNode('div', 'price-details__breakup', priceDetails, null, 'discount');
        createNode('span', null, container, discount.type);
        createNode('span', 'offer_price', container, discount.amount);
    }
}

function removeDiscount() {
    const discountNode = document.getElementById('discount');
    if (discountNode) {
        discountNode.parentNode.removeChild(discountNode);
    }
}

function calculateNetAmount(discount) {
    return (productList.quantity * productList.price) - discount;
}

function updateNetAmount(amount) {
    const netAmountNode = document.getElementById('netAmount');
    netAmountNode.textContent = indFormat.format(amount);
}

function initPayment() {
    createPriceNode();
    calculateDiscount();
}

function calculateDiscount() {
    discount = getDiscount();
    if (discount) {
        applyDiscount(discount);
    } else {
        removeDiscount();
    }
    netAmount = calculateNetAmount(discount?.amount || 0);
    updateNetAmount(netAmount);
}

function alertAmount() {
    alert(`Total amount paybale is ${netAmount}`);
}

function accordionSelected(optionId) {
    const radioBtn = document.getElementById(optionId);
    radioBtn.checked = true;
    calculateDiscount();
}

