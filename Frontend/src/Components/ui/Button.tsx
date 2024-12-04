import { PlusIcon } from "../../icons/PlusIcon";
import { ShareIcon } from "../../icons/ShareIcon";

export interface ButtonProps {
    variant : "primary" | "secondary";
    size : "sm" | "md" | "lg" ;
    text : String;
    startIcon : any;
    endIcon ?: any;
    onClick : () => void;
}

const variantStyle = {
    "primary" : "bg-brain-500 text-white",
    "secondary" : "bg-brain-300 text-brain-400"
}

const sizeStyles = {
    "sm" : "py-1 px-2 text-sm",
    "md" : "py-2 px-4 text-md",
    "lg" : "py-3 px-5 text-xl"
}

const defaultStyle : String = "rounded-md flex gap-3 items-center font-medium";

export const Button = (props : ButtonProps) => {
    let startIcon;
    if (props.startIcon === 'plus') {
        startIcon = <PlusIcon size={`${props.size}`}/>
    }

    if (props.startIcon === 'share') {
        startIcon = <ShareIcon size={`${props.size}`}/>
    }
    return <button className={`${variantStyle[props.variant]} ${sizeStyles[props.size]} ${defaultStyle}`}><div>{startIcon}</div> {props.text}</button>
}