import InputMask from "react-input-mask"

const onlyNumbers = (str) => str.replace(/[^0-9]/g, '')

export const Input = ({value, onChange}) => {

    function handleChange(event) {
        onChange({
            ...event,
            target: {
                ...event.target,
                value: onlyNumbers(event.target.value),
            }
        })
    }
    
    
    
    return (
        <>
            <InputMask 
            id="btnTel"
            mask="(99)99999-9999"
            value={value}
            onChange={handleChange}
            placeholder="(99)99999-9999"            
            />
        </>
    )
}