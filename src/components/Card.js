'use client'
import { ChevronRight } from "lucide-react"
import { useState } from "react"

export default function Card({ title, description, icon, handleClick }) {
    const [isLoading, setIsLoading] = useState(false)

    const onClick = async () => {
        setIsLoading(true)
        await handleClick()
        setIsLoading(false)
    }

    const onKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            onClick()
        }
    }

    return (
        <>
            <div
                role="button"
                tabIndex={0}
                className={`
                    bg-white rounded-lg shadow-lg p-6 
                    transition-all duration-300 ease-in-out transform
                    hover:shadow-xl hover:scale-105 
                    active:scale-95
                    cursor-pointer
                    ${isLoading ? 'opacity-70' : ''}
                `}
                onClick={onClick}
                onKeyDown={onKeyDown}
            >
                <div className="flex items-center mb-4">
                    <div className="transition-colors duration-300 hover:text-orange-500">
                        {icon}
                    </div>
                    <h3 className="text-xl font-semibold ml-3 transition-colors duration-300 hover:text-orange-500">{title}</h3>
                </div>
                <p className="text-gray-600">{description}</p>
                <div className="mt-4 flex justify-end">
                    <ChevronRight className="text-primary transition-transform duration-300 group-hover:translate-x-1" />
                </div>
            </div>
        </>
    )
}