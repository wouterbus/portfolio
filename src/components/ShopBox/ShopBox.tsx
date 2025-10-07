import React from 'react'
import './ShopBox.css'

const ShopBox: React.FC = () => {
  return (
    <div className="shop-box">
      <div className="shop-image-container">
        <img 
          src="/thumbnail-shop.png" 
          alt="Shop" 
          className="shop-image"
        />
      </div>
    </div>
  )
}

export default ShopBox
