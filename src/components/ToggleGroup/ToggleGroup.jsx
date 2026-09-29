function ToggleGroup({ name, label, options, value, onChange}) {
    return (
        <fieldset className="font-body">
            <legend className="text-[0.9375rem] md:text-xl font-bold leading-tight text-blue-400 mb-4">{label}</legend>
            <div className="flex flex-row gap-2 justify-between">
                {options.map((option) => (
                    <label key={option.value} className="flex-1">
                        <input
                            type="radio"
                            name={name}
                            value={option.value}
                            checked={value === option.value}
                            onChange={() => onChange(option.value)}
                            className="peer sr-only"
                        />
                        <span className="block py-2.5  cursor-pointer rounded-[1.625rem] text-center font-bold bg-blue-300/60 text-grey-50 hover:bg-blue-300 peer-checked:hover:bg-blue-800 peer-checked:bg-blue-800 text-[0.9375rem] md:text-[1.625rem] leading-tight peer-focus-visible:focus-ring peer-focus-visible:focus-ring-blue-800">
                            {option.label}
                        </span>
                    </label>
                ))}
            </div>
        </fieldset>
    );
}

export default ToggleGroup;