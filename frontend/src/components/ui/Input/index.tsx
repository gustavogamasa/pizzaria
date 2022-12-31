
import { HTMLAttributes, InputHTMLAttributes } from 'react'
import styles from './styles.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}
interface TextareaProps extends HTMLAttributes<HTMLTextAreaElement>{}

export function Input({...rest}: InputProps){
    return (
        <input className={styles.input} {...rest}></input>
    )
}


export function TextArea({...rest}: TextareaProps){

    return (
        <textarea className={styles.input} {...rest}></textarea>
    )
}