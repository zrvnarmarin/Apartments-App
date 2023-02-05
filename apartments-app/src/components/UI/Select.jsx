import React, { useState, useEffect } from 'react'
import styles from '../../styles/select.module.css'

const Select = ({ value, options, onChange }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [highlightedIndex, setHighlightedIndex] = useState(0)
    console.log(value.label)

    const clearOptions = e => onChange(undefined)
    const selectOption = option => {
        if (option !== value) onChange(option) 
    }
    const isOptionSelected = option =>  { return option === value }

    useEffect(() => {
        if (isOpen) setHighlightedIndex(0)
    }, [isOpen])

  return (
    <div onBlur={() => setIsOpen(false)} onClick={() => setIsOpen(prev => !prev)} tabIndex={0} className={styles.container}>
        <span className={styles.value}>{value.label}</span>
        <button onClick={(e) => {
            e.stopPropagation()
            // clearOptions()
        }} type='button' className={styles["clear-btn"]}>&times;</button>
        <div className={styles.divider}></div>
        <div className={styles.caret}></div>
        <ul className={`${styles.options} ${isOpen ? styles.show : ''}`}>
            {options.map((option, index) => 
                <li onClick={(e) => {
                    e.stopPropagation()
                    // selectOption(option)
                    setIsOpen(false)
                }} onMouseEnter={() => setHighlightedIndex(index)}
                    key={index} 
                    className={`
                        ${styles.option} 
                        ${isOptionSelected(option) ? styles.selected : ''}
                        ${index === highlightedIndex ? styles.highlighted : ''}
                    `}
                    >
                        {option.label}
                    </li>    
            )}
        </ul>
    </div>
  )
}

export default Select;