import { useState } from "react";

export default function useLocaleStorageState(key, defaultValue) {
    const [state,setState] = useState(() => {
        const peristedState = localStorage.getItem(key)

        if(peristedState) {
            return JSON.parse(peristedState)
        }

        return defaultValue
    })

    const setPeristedState = (value) => {
        setState(value)
        let seristedValue;
        if(typeof value === "function") {
            seristedValue = JSON.stringify(value(state))
        } else {
            seristedValue = JSON.stringify(value)

        }

        localStorage.setItem(key,seristedValue)
    }

    return [
        state,
        setPeristedState
    ]
}