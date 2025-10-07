import React, { useState, useEffect } from 'react'
import './CoffeeBox.css'

const CoffeeBox: React.FC = () => {
  const [coffeeAmount, setCoffeeAmount] = useState<number>(0)

  useEffect(() => {
    // Base amount: 4,207.68 liters
    const baseAmount = 4207.68
    
    // Daily increment: 0.72 liters
    const dailyIncrement = 0.72
    
    // Calculate days since a reference date (you can adjust this)
    // Using January 1, 2009 as reference date
    const referenceDate = new Date('2009-01-01')
    const currentDate = new Date()
    const daysSinceReference = Math.floor((currentDate.getTime() - referenceDate.getTime()) / (1000 * 60 * 60 * 24))
    
    // Calculate total coffee consumed
    const totalCoffee = baseAmount + (daysSinceReference * dailyIncrement)
    
    setCoffeeAmount(totalCoffee)
  }, [])

  const formatNumber = (num: number): string => {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }

  return (
    <div className="coffee-box">
      <div className="coffee-content">
        <div className="coffee-icon">☕</div>
        <div className="coffee-stats">
          <div className="coffee-amount">
            {formatNumber(coffeeAmount)} liters
          </div>
          <div className="coffee-label">
            Coffee consumed since 2009
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoffeeBox
