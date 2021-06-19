# Create a payments UI component for Flipkart

The component should accept product list containing the following as input:
* Quantity
* Price of the single unit
* Whether it's eligible for cach on delivery

The component should provide UI with payment options with the below discounts applicable.
The payment options view is an accordion.

1. Cach on delivery - no discount
2. Master card - 10% upto Rs. 1500/-
3. HDFC credit card - 10% on top of existing discounts(through other bank offers) up to Rs 2000/-
4. SBI credit card - 5% on top of exsiting discounts up to Rs 1000/-
5. PhonePe - Flat 200 off for order abover 2500/-

**The image is only for reference**: https://pasteboard.co/HJJGByz.png

### Basic functionalities:
* The UI accordion with 3 tabs- phonepe, credit card, cash on delivery.
    * On click of credit card tab, give an option to select the bank and issuing authority.
    * On click of continue button alert amount to be paid
    * For Cash on Delivery, if product is not applicable, disable that particular accordion item.
* The price details section.

