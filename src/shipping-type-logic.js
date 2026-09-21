// JavaScript shipping-type-logic

const img = `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    			<path d="M3 6H15V17H3V6Z" fill="currentColor"/>
				<path d="M15 10H18L21 13V17H15V10Z" fill="currentColor"/>
				<circle cx="7" cy="17" r="2" fill="white" stroke='black'/>
				<circle cx="18" cy="17" r="2" fill="white" stroke='black'/>
			</svg>`;

export const shippingType = [{
	name: 'Economy',
	estimate: 'Estimated Arrival, Dec 20-23',
	price: 10,
	isChecked: false,
	img
},
{
	name: 'Regular',
	estimate: 'Estimated Arrival, Dec 20-22',
	price: 15,
	isChecked: false,
	img: img
},
					  {
	name: 'Cargo',
	estimate: 'Estimated Arrival, Dec 19-20',
	price: 20,
	isChecked: false,
	img
},
{
	name: 'Express',
	estimate: 'Estimated Arrival, Dec 18-19',
	price: 30,
	isChecked: false,
	img: img
}]