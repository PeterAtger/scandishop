import { ReactComponent as LOGO } from '../View/assets/site-logo.svg'
import { ReactComponent as CART } from '../View/assets/cart.svg'
import { ReactComponent as CART_FILLED } from '../View/assets/cart-fill.svg'

import IMAGE from '../View/assets/img/drumSticks.jpg'

/** 
*  Usage: render() { <img src = {APP_IMAGES.IMAGENAME}/> }
*/
const APP_IMAGES = {
    IMAGE,

}


/** 
* Usage: render() {<APP_SVG.ICONNAME/> }
*/
const APP_SVG = {
    LOGO,
    CART,
    CART_FILLED
}

export { APP_IMAGES, APP_SVG }